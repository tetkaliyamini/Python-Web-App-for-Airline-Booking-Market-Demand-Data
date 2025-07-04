# Airline Booking Market Demand Analyzer

A comprehensive web application for analyzing airline booking trends and market demand patterns, specifically designed to help hostel businesses understand travel demand and optimize their operations.

## 🚀 Features

- **Real-time Data Analysis**: Process and analyze airline booking trends
- **AI-Powered Insights**: Generate actionable business insights using OpenAI
- **Interactive Visualizations**: Charts and graphs for demand trends, pricing, and seasonal patterns
- **Route Analysis**: Identify popular travel routes and growth opportunities
- **Seasonal Forecasting**: Understand peak and off-peak travel periods
- **Price Trend Analysis**: Monitor pricing patterns and market changes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts for data visualization
- **AI Integration**: Vercel AI SDK with OpenAI
- **Icons**: Lucide React

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18.0 or higher
- npm or yarn package manager
- OpenAI API key (optional - app works with mock insights if not provided)

## 🔧 Installation & Setup

### 1. Clone or Download the Project

If you're using v0, click the "Download Code" button in the top right corner of the Block view, or copy the code files manually.

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Variables Setup

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Optional: OpenAI API Key for AI insights
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Other environment variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

**Note**: The app will work without an OpenAI API key by providing mock insights. To get real AI-generated insights:

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your \`.env.local\` file

### 4. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Use

### 1. **Dashboard Overview**
- View key metrics: total bookings, average prices, top routes, and peak seasons
- Get a quick snapshot of the airline market performance

### 2. **Apply Filters**
- **Route Filter**: Select specific routes or view all routes
- **Time Period**: Choose from 3, 6, or 12-month analysis periods
- **Generate Insights**: Click to get AI-powered business recommendations

### 3. **Explore Data Tabs**

#### **Demand Trends**
- Monthly booking volumes and price trends
- Identify peak and off-peak periods
- Understand seasonal fluctuations

#### **Popular Routes**
- Top-performing routes by booking volume
- Route performance metrics with growth indicators
- Average pricing by route

#### **Price Analysis**
- Current vs. previous month pricing
- Price change indicators
- Route-specific pricing trends

#### **Seasonal Data**
- Quarterly demand distribution
- Seasonal pricing patterns
- Peak season identification

### 4. **AI Insights**
- Click "Generate AI Insights" for personalized business recommendations
- Get actionable advice for hostel operations
- Understand market opportunities and threats

## 📊 Understanding the Data

### Mock Data Structure
The application uses realistic mock data that simulates:

- **Australian Routes**: Major city pairs (Sydney-Melbourne, Brisbane-Gold Coast, etc.)
- **Booking Volumes**: Realistic passenger numbers and trends
- **Pricing Data**: Market-representative ticket prices
- **Seasonal Patterns**: Authentic Australian travel seasonality
- **Growth Metrics**: Route performance indicators

### Key Metrics Explained

- **Total Bookings**: Aggregate passenger volume across all routes
- **Average Price**: Mean ticket price across selected time period
- **Top Route**: Highest volume route by passenger count
- **Peak Season**: Season with highest demand percentage

## 🔄 Customization Options

### Adding Real Data Sources

To integrate with real APIs, modify the data fetching in \`app/page.tsx\`:

\`\`\`typescript
// Replace generateMockData() with real API calls
const fetchRealData = async () => {
  // Example: Amadeus API, Skyscanner API, etc.
  const response = await fetch('/api/real-airline-data')
  return response.json()
}
\`\`\`

### Modifying Routes and Cities

Update the routes array in \`generateMockData()\`:

\`\`\`typescript
const routes = [
  { from: "Your City", to: "Destination", code: "ABC-XYZ" },
  // Add more routes as needed
]
\`\`\`

### Customizing AI Insights

Modify the prompt in \`app/api/generate-insights/route.ts\` to focus on different business aspects:

\`\`\`typescript
const prompt = \`
Your custom analysis prompt here...
Focus on specific metrics or business questions...
\`
\`\`\`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting service

## 🔍 Troubleshooting

### Common Issues

1. **OpenAI API Error**
   - Ensure your API key is correctly set in \`.env.local\`
   - Check your OpenAI account has sufficient credits
   - The app provides fallback mock insights if API fails

2. **Charts Not Displaying**
   - Ensure all dependencies are installed
   - Check browser console for JavaScript errors
   - Verify Recharts is properly imported

3. **Data Not Loading**
   - Check browser network tab for failed requests
   - Ensure development server is running
   - Verify mock data generation is working

### Performance Optimization

- Data is generated client-side for demo purposes
- In production, implement server-side caching
- Consider using React.memo for chart components
- Implement data pagination for large datasets

## 📈 Future Enhancements

### Potential Features
- **Real-time Data Integration**: Connect to live airline APIs
- **Advanced Filtering**: Date ranges, airline-specific filters
- **Export Functionality**: PDF reports, CSV data export
- **User Authentication**: Save preferences and custom dashboards
- **Predictive Analytics**: Machine learning for demand forecasting
- **Multi-region Support**: Expand beyond Australian routes
- **Mobile App**: React Native version for mobile access

### API Integration Options
- **Amadeus Travel API**: Comprehensive travel data
- **Skyscanner API**: Flight search and pricing
- **IATA API**: Official airline industry data
- **Google Travel Partner API**: Travel insights and trends

## 🤝 Contributing

This project was built as a demonstration for hostel business analysis. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for demonstration purposes. Modify and use as needed for your business requirements.

## 📞 Support

For questions about implementation or customization:
- Review the code comments for detailed explanations
- Check the troubleshooting section above
- Modify the mock data to match your specific needs

---

**Built with ❤️ for the travel and hospitality industry**
