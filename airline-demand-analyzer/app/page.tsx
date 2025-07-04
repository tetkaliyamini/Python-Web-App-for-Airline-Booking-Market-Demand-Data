"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts"
import {
  Plane,
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  Loader2,
  RefreshCw,
  Download,
  Search,
  Bell,
  BarChart3,
  Settings,
  Zap,
  Target,
  Globe,
  Clock,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
} from "lucide-react"

// Enhanced mock data generator with more realistic patterns
const generateMockData = (timeRange = "12months") => {
  const routes = [
    { from: "Sydney", to: "Melbourne", code: "SYD-MEL", distance: 713, popularity: 95 },
    { from: "Sydney", to: "Brisbane", code: "SYD-BNE", distance: 732, popularity: 88 },
    { from: "Melbourne", to: "Perth", code: "MEL-PER", distance: 2130, popularity: 75 },
    { from: "Brisbane", to: "Gold Coast", code: "BNE-OOL", distance: 78, popularity: 82 },
    { from: "Sydney", to: "Perth", code: "SYD-PER", distance: 3278, popularity: 70 },
    { from: "Melbourne", to: "Adelaide", code: "MEL-ADL", distance: 654, popularity: 65 },
    { from: "Sydney", to: "Cairns", code: "SYD-CNS", distance: 1958, popularity: 60 },
    { from: "Brisbane", to: "Darwin", code: "BNE-DRW", distance: 1718, popularity: 45 },
  ]

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const weeks = Array.from({ length: 52 }, (_, i) => `W${i + 1}`)
  const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)

  const timeData = timeRange === "52weeks" ? weeks : timeRange === "30days" ? days : months

  return {
    demandTrends: timeData.map((period, index) => ({
      period,
      bookings: Math.floor(Math.random() * 5000) + 2000 + Math.sin(index * 0.5) * 1000,
      avgPrice: Math.floor(Math.random() * 200) + 150 + Math.cos(index * 0.3) * 50,
      occupancy: Math.floor(Math.random() * 30) + 70,
      satisfaction: Math.floor(Math.random() * 20) + 80,
      cancellations: Math.floor(Math.random() * 10) + 2,
    })),
    popularRoutes: routes
      .map((route) => ({
        ...route,
        bookings: Math.floor(Math.random() * 1000) + 200,
        avgPrice: Math.floor(Math.random() * 300) + 100 + route.distance * 0.05,
        growth: (Math.random() * 40 - 20).toFixed(1),
        onTimePerf: Math.floor(Math.random() * 20) + 80,
        loadFactor: Math.floor(Math.random() * 30) + 70,
      }))
      .sort((a, b) => b.bookings - a.bookings),
    priceAnalysis: routes.slice(0, 6).map((route) => ({
      route: route.code,
      currentPrice: Math.floor(Math.random() * 200) + 150,
      lastMonth: Math.floor(Math.random() * 200) + 150,
      lastYear: Math.floor(Math.random() * 200) + 150,
      change: (Math.random() * 20 - 10).toFixed(1),
      volatility: Math.floor(Math.random() * 30) + 10,
    })),
    seasonalData: [
      { season: "Summer", demand: 85, avgPrice: 280, satisfaction: 88 },
      { season: "Autumn", demand: 65, avgPrice: 220, satisfaction: 92 },
      { season: "Winter", demand: 45, avgPrice: 180, satisfaction: 85 },
      { season: "Spring", demand: 75, avgPrice: 240, satisfaction: 90 },
    ],
    realTimeMetrics: {
      activeBookings: Math.floor(Math.random() * 1000) + 500,
      avgResponseTime: Math.floor(Math.random() * 500) + 200,
      systemLoad: Math.floor(Math.random() * 40) + 30,
      alertsCount: Math.floor(Math.random() * 5),
    },
  }
}

export default function InteractiveAirlineDemandAnalyzer() {
  const [data, setData] = useState<any>(null)
  const [selectedRoute, setSelectedRoute] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("12months")
  const [insights, setInsights] = useState<string>("")
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isRealTimeMode, setIsRealTimeMode] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedMetric, setSelectedMetric] = useState("bookings")
  const [animationSpeed, setAnimationSpeed] = useState(1000)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])
  const [isAutoRefresh, setIsAutoRefresh] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState(5)
  const [selectedRouteDetails, setSelectedRouteDetails] = useState<any>(null)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([])
  const [chartType, setChartType] = useState("line")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentDataPoint, setCurrentDataPoint] = useState(0)

  // Real-time data refresh
  useEffect(() => {
    const loadData = () => {
      setData(generateMockData(selectedPeriod))
    }

    loadData()

    if (isAutoRefresh) {
      const interval = setInterval(loadData, refreshInterval * 1000)
      return () => clearInterval(interval)
    }
  }, [selectedPeriod, isAutoRefresh, refreshInterval])

  // Animated data playback
  useEffect(() => {
    if (isPlaying && data) {
      const interval = setInterval(() => {
        setCurrentDataPoint((prev) => (prev >= data.demandTrends.length - 1 ? 0 : prev + 1))
      }, animationSpeed)
      return () => clearInterval(interval)
    }
  }, [isPlaying, data, animationSpeed])

  // Notification system
  const addNotification = useCallback((message: string) => {
    setNotifications((prev) => [...prev.slice(-4), message])
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1))
    }, 5000)
  }, [])

  const generateInsights = async () => {
    if (!data) return

    setIsGeneratingInsights(true)
    addNotification("Generating AI insights...")

    try {
      const response = await fetch("/api/generate-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          filters: { route: selectedRoute, period: selectedPeriod, priceRange },
        }),
      })

      const result = await response.json()
      setInsights(result.insights)
      addNotification("AI insights generated successfully!")
    } catch (error) {
      console.error("Error generating insights:", error)
      setInsights("Unable to generate insights at this time.")
      addNotification("Failed to generate insights")
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  const exportData = () => {
    const csvData = data.popularRoutes
      .map((route: any) => `${route.code},${route.bookings},${route.avgPrice},${route.growth}`)
      .join("\n")

    const blob = new Blob([`Route,Bookings,Price,Growth\n${csvData}`], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "airline-data.csv"
    a.click()
    addNotification("Data exported successfully!")
  }

  const filteredRoutes =
    data?.popularRoutes.filter(
      (route: any) =>
        route.code.toLowerCase().includes(searchTerm.toLowerCase()) &&
        route.avgPrice >= priceRange[0] &&
        route.avgPrice <= priceRange[1],
    ) || []

  const toggleRouteComparison = (routeCode: string) => {
    setSelectedRoutes(
      (prev) => (prev.includes(routeCode) ? prev.filter((r) => r !== routeCode) : [...prev, routeCode].slice(0, 3)), // Max 3 routes
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
            <div className="absolute inset-0 h-12 w-12 mx-auto border-4 border-blue-200 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-600 mb-2">Loading Interactive Dashboard...</p>
          <Progress value={75} className="w-64 mx-auto" />
        </div>
      </div>
    )
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Floating Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification, index) => (
          <Alert key={index} className="animate-slide-in-right shadow-lg border-l-4 border-l-blue-500">
            <Bell className="h-4 w-4" />
            <AlertDescription>{notification}</AlertDescription>
          </Alert>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header with Real-time Controls */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Plane className="h-10 w-10 text-blue-600 mr-3 animate-bounce" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interactive Airline Analytics
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Real-time analysis of airline booking trends with AI-powered insights and interactive visualizations
          </p>

          {/* Real-time Status Bar */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Updated: {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>{data.realTimeMetrics.activeBookings} Active</span>
            </div>
          </div>
        </div>

        {/* Interactive Control Panel */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Interactive Controls
              </CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch checked={isAutoRefresh} onCheckedChange={setIsAutoRefresh} />
                  <span className="text-sm">Auto Refresh</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => setData(generateMockData(selectedPeriod))}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search and Filters */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search routes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Routes</SelectItem>
                    {filteredRoutes.map((route: any) => (
                      <SelectItem key={route.code} value={route.code}>
                        {route.from} → {route.to}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Controls */}
              <div className="space-y-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="52weeks">Last 52 Weeks</SelectItem>
                    <SelectItem value="12months">Last 12 Months</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <span className="text-sm">Animate Data</span>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-4">
                <label className="text-sm font-medium">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex items-center space-x-2">
                  <Switch checked={comparisonMode} onCheckedChange={setComparisonMode} />
                  <span className="text-sm">Compare Routes</span>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-4">
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="scatter">Scatter Plot</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-2">
                  <Button onClick={generateInsights} disabled={isGeneratingInsights} className="flex-1">
                    {isGeneratingInsights ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Target className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" onClick={exportData}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Key Metrics with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Users,
              label: "Total Bookings",
              value: data.demandTrends.reduce((sum: number, item: any) => sum + item.bookings, 0).toLocaleString(),
              change: "+12.5%",
              color: "blue",
            },
            {
              icon: DollarSign,
              label: "Avg Price",
              value: `$${Math.round(data.demandTrends.reduce((sum: number, item: any) => sum + item.avgPrice, 0) / data.demandTrends.length)}`,
              change: "+5.2%",
              color: "green",
            },
            {
              icon: MapPin,
              label: "Top Route",
              value: data.popularRoutes[0].code,
              change: data.popularRoutes[0].growth + "%",
              color: "purple",
            },
            {
              icon: TrendingUp,
              label: "Satisfaction",
              value: "87%",
              change: "+2.1%",
              color: "orange",
            },
          ].map((metric, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div
                    className={`p-3 rounded-full bg-${metric.color}-100 group-hover:bg-${metric.color}-200 transition-colors`}
                  >
                    <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <Badge
                        variant={metric.change.startsWith("+") ? "default" : "destructive"}
                        className="animate-pulse"
                      >
                        {metric.change.startsWith("+") ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insights with Enhanced Styling */}
        {insights && (
          <Card className="mb-8 shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                AI-Powered Market Insights
                <Badge className="ml-2 animate-pulse">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border-l-4 border-l-blue-500">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">{insights}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Interactive Charts */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="trends" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Demand Trends
            </TabsTrigger>
            <TabsTrigger value="routes" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Route Analysis
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Price Intelligence
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Seasonal Patterns
            </TabsTrigger>
            <TabsTrigger value="realtime" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Real-time Monitor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Interactive Demand Trends</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bookings">Bookings</SelectItem>
                        <SelectItem value="avgPrice">Average Price</SelectItem>
                        <SelectItem value="occupancy">Occupancy</SelectItem>
                        <SelectItem value="satisfaction">Satisfaction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  {chartType === "area" ? (
                    <AreaChart data={data.demandTrends}>
                      <defs>
                        <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey={selectedMetric}
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorBookings)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  ) : chartType === "scatter" ? (
                    <ScatterChart data={data.demandTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bookings" name="Bookings" />
                      <YAxis dataKey="avgPrice" name="Price" />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Scatter name="Routes" data={data.demandTrends} fill="#8884d8" />
                    </ScatterChart>
                  ) : (
                    <LineChart data={data.demandTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={selectedMetric}
                        stroke="#8884d8"
                        strokeWidth={3}
                        dot={{ fill: "#8884d8", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#8884d8", strokeWidth: 2 }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Interactive Route Performance</CardTitle>
                  <CardDescription>Click on bars to view detailed route information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={filteredRoutes.slice(0, 8)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="code" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="bookings"
                        fill="#8884d8"
                        onClick={(data) => setSelectedRouteDetails(data)}
                        className="cursor-pointer hover:opacity-80"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Route Comparison Tool</CardTitle>
                  <CardDescription>Select routes to compare performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {filteredRoutes.map((route: any) => (
                      <div
                        key={route.code}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          selectedRoutes.includes(route.code)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => toggleRouteComparison(route.code)}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full ${selectedRoutes.includes(route.code) ? "bg-blue-500" : "bg-gray-300"}`}
                          ></div>
                          <div>
                            <p className="font-semibold">
                              {route.from} → {route.to}
                            </p>
                            <p className="text-sm text-gray-600">{route.bookings} bookings</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${route.avgPrice}</p>
                          <Badge variant={Number.parseFloat(route.growth) > 0 ? "default" : "destructive"}>
                            {route.growth}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Dynamic Price Analysis</CardTitle>
                  <CardDescription>Real-time price movements and volatility indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.priceAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="route" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="currentPrice" fill="#8884d8" name="Current Price" />
                      <Bar dataKey="lastMonth" fill="#82ca9d" name="Last Month" />
                      <Bar dataKey="lastYear" fill="#ffc658" name="Last Year" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Price Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.priceAnalysis.slice(0, 4).map((item: any, index: number) => (
                      <div key={item.route} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.route}</p>
                          <p className="text-sm text-gray-600">Volatility: {item.volatility}%</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.currentPrice}</p>
                          <div className="flex items-center">
                            {Number.parseFloat(item.change) > 0 ? (
                              <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
                            )}
                            <span
                              className={`text-sm ${Number.parseFloat(item.change) > 0 ? "text-red-500" : "text-green-500"}`}
                            >
                              {Math.abs(Number.parseFloat(item.change))}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="seasonal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Interactive Seasonal Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data.seasonalData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ season, demand }) => `${season}: ${demand}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="demand"
                      >
                        {data.seasonalData.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            className="hover:opacity-80 cursor-pointer"
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Seasonal Performance Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.seasonalData.map((season: any, index: number) => (
                      <div
                        key={season.season}
                        className="p-4 rounded-lg border-l-4"
                        style={{ borderLeftColor: COLORS[index] }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{season.season}</h3>
                          <Badge style={{ backgroundColor: COLORS[index], color: "white" }}>
                            {season.demand}% Demand
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Average Price</p>
                            <p className="font-semibold">${season.avgPrice}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Satisfaction</p>
                            <p className="font-semibold">{season.satisfaction}%</p>
                          </div>
                        </div>
                        <Progress value={season.demand} className="mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="realtime">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Active Bookings</p>
                      <p className="text-3xl font-bold text-green-800">{data.realTimeMetrics.activeBookings}</p>
                    </div>
                    <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-green-600 mt-1">75% of daily target</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Response Time</p>
                      <p className="text-3xl font-bold text-blue-800">{data.realTimeMetrics.avgResponseTime}ms</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-blue-600 mt-1">Excellent performance</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">System Load</p>
                      <p className="text-3xl font-bold text-purple-800">{data.realTimeMetrics.systemLoad}%</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={data.realTimeMetrics.systemLoad} className="h-2" />
                    <p className="text-xs text-purple-600 mt-1">Optimal range</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Active Alerts</p>
                      <p className="text-3xl font-bold text-orange-800">{data.realTimeMetrics.alertsCount}</p>
                    </div>
                    <div className="h-12 w-12 bg-orange-200 rounded-full flex items-center justify-center">
                      <Bell className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge variant={data.realTimeMetrics.alertsCount > 3 ? "destructive" : "default"}>
                      {data.realTimeMetrics.alertsCount > 3 ? "High" : "Normal"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Activity Feed */}
            <Card className="mt-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Live Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg animate-fade-in">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          New booking: {data.popularRoutes[i % data.popularRoutes.length]?.code} - $
                          {Math.floor(Math.random() * 200) + 150}
                        </p>
                        <p className="text-xs text-gray-500">{Math.floor(Math.random() * 60)} seconds ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Route Details Modal */}
        <Dialog open={!!selectedRouteDetails} onOpenChange={() => setSelectedRouteDetails(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Route Details: {selectedRouteDetails?.code}</DialogTitle>
              <DialogDescription>
                Comprehensive analysis for {selectedRouteDetails?.from} → {selectedRouteDetails?.to}
              </DialogDescription>
            </DialogHeader>
            {selectedRouteDetails && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Performance Metrics</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Bookings:</span>
                        <span className="font-semibold">{selectedRouteDetails.bookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Price:</span>
                        <span className="font-semibold">${selectedRouteDetails.avgPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth Rate:</span>
                        <Badge variant={Number.parseFloat(selectedRouteDetails.growth) > 0 ? "default" : "destructive"}>
                          {selectedRouteDetails.growth}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800">Operational Data</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Distance:</span>
                        <span className="font-semibold">{selectedRouteDetails.distance} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>On-time Performance:</span>
                        <span className="font-semibold">{selectedRouteDetails.onTimePerf}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Load Factor:</span>
                        <span className="font-semibold">{selectedRouteDetails.loadFactor}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
