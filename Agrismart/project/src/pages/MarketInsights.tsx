import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Calendar } from 'lucide-react';

const MarketInsights: React.FC = () => {
  const [timeframe, setTimeframe] = useState('week');
  
  // Mock market data
  const marketData = {
    commodities: [
      { name: 'Wheat', price: 8.25, change: 1.85, trend: 'up' },
      { name: 'Corn', price: 5.77, change: -0.23, trend: 'down' },
      { name: 'Soybeans', price: 14.20, change: 2.97, trend: 'up' },
      { name: 'Rice', price: 17.50, change: 0.85, trend: 'up' },
      { name: 'Barley', price: 6.40, change: -0.15, trend: 'down' },
    ],
    insights: [
      {
        title: 'Wheat prices rising due to drought concerns',
        description: 'Prolonged dry conditions in major wheat producing regions are driving up prices. Consider timing your sales carefully.',
        impact: 'positive',
        source: 'USDA Weekly Report'
      },
      {
        title: 'Corn futures trending down after bumper crop predictions',
        description: 'Updated forecasts suggest a larger than expected corn harvest this season, pushing prices lower.',
        impact: 'negative',
        source: 'Commodity Futures Trading Commission'
      },
      {
        title: 'Potential trade agreement to boost soybean exports',
        description: 'Upcoming trade negotiations could reduce tariffs on soybeans, potentially opening new markets.',
        impact: 'positive',
        source: 'International Trade Commission'
      }
    ],
    priceHistory: {
      wheat: [7.8, 7.9, 8.0, 8.1, 7.9, 8.0, 8.25],
      corn: [6.1, 6.0, 5.9, 5.85, 5.8, 5.75, 5.77],
      soybeans: [13.2, 13.4, 13.5, 13.7, 13.9, 14.1, 14.2]
    },
    forecast: {
      wheat: { shortTerm: 'increase', longTerm: 'stable', confidence: 'high' },
      corn: { shortTerm: 'decrease', longTerm: 'increase', confidence: 'medium' },
      soybeans: { shortTerm: 'increase', longTerm: 'increase', confidence: 'high' }
    }
  };

  const recommendations = [
    {
      crop: 'Wheat',
      action: 'Hold',
      reasoning: 'Prices trending upward. Consider selling in 2-3 weeks when drought concerns may peak market prices.',
      timing: 'Mid-July',
      confidence: 'high'
    },
    {
      crop: 'Corn',
      action: 'Forward Contract',
      reasoning: 'Prices expected to decline further. Lock in current prices with forward contracts if possible.',
      timing: 'Immediate',
      confidence: 'medium'
    },
    {
      crop: 'Soybeans',
      action: 'Hold',
      reasoning: 'Strong upward trend with potential for additional gains from trade agreements.',
      timing: 'Late August',
      confidence: 'high'
    }
  ];

  const renderTrendIcon = (trend: string, size = 20) => {
    return trend === 'up' 
      ? <TrendingUp size={size} className="text-green-500" /> 
      : <TrendingDown size={size} className="text-red-500" />;
  };

  const renderPriceChange = (change: number) => {
    const isPositive = change > 0;
    return (
      <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
        {isPositive ? <TrendingUp size={16} className="ml-1" /> : <TrendingDown size={16} className="ml-1" />}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Market Insights</h1>
        <p className="text-gray-500 mt-1">Stay updated with market trends and get AI-powered selling recommendations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketData.commodities.slice(0, 3).map((commodity, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium">{commodity.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Current market price</p>
              </div>
              {renderTrendIcon(commodity.trend, 24)}
            </div>
            <div className="mt-3">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${commodity.price.toFixed(2)}</span>
                <span className="ml-2 text-sm">per bushel</span>
              </div>
              <div className="mt-1">
                {renderPriceChange(commodity.change)}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card 
            title="Price Trends" 
            subtitle="7-day price movement"
            footer={
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 text-xs rounded-full ${timeframe === 'week' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setTimeframe('week')}
                  >
                    Week
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded-full ${timeframe === 'month' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setTimeframe('month')}
                  >
                    Month
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded-full ${timeframe === 'quarter' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setTimeframe('quarter')}
                  >
                    Quarter
                  </button>
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-800">
                  View detailed charts
                </button>
              </div>
            }
          >
            <div className="h-72 flex flex-col">
              <div className="flex-1 relative">
                {/* This would be an actual chart component in a real application */}
                <div className="absolute inset-0">
                  <div className="h-full flex items-end space-x-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-primary-500 opacity-80"
                        style={{ 
                          height: `${20 + Math.random() * 60}%`,
                          backgroundColor: i % 7 === 6 ? '#4d9921' : '' 
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Price lines */}
                  <div className="absolute inset-0 flex flex-col justify-between py-5">
                    <div className="border-b border-gray-200 relative">
                      <span className="absolute -top-3 right-0 text-xs text-gray-500">$18.00</span>
                    </div>
                    <div className="border-b border-gray-200 relative">
                      <span className="absolute -top-3 right-0 text-xs text-gray-500">$15.00</span>
                    </div>
                    <div className="border-b border-gray-200 relative">
                      <span className="absolute -top-3 right-0 text-xs text-gray-500">$12.00</span>
                    </div>
                    <div className="border-b border-gray-200 relative">
                      <span className="absolute -top-3 right-0 text-xs text-gray-500">$9.00</span>
                    </div>
                    <div className="border-b border-gray-200 relative">
                      <span className="absolute -top-3 right-0 text-xs text-gray-500">$6.00</span>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute top-2 left-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-primary-500 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">Wheat</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-amber-500 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">Corn</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">Soybeans</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-8 flex items-center border-t border-gray-200 mt-4 pt-2">
                <div className="grid grid-cols-7 w-full text-center">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={i} className="text-xs text-gray-500">{day}</div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Market Insights" subtitle="Recent developments">
            <div className="space-y-4">
              {marketData.insights.map((insight, index) => (
                <div key={index} className={index > 0 ? 'pt-4 border-t border-gray-100' : ''}>
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full ${insight.impact === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {insight.impact === 'positive' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">{insight.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{insight.source}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{insight.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-primary-600 hover:text-primary-800">
                View all insights →
              </button>
            </div>
          </Card>
        </div>
      </div>

      <Card 
        title="Price Forecasts" 
        subtitle="AI-powered market predictions"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(marketData.forecast).map(([crop, forecast], index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-medium capitalize">{crop}</h3>
                <div className={`text-xs px-2 py-0.5 rounded-full ${
                  forecast.confidence === 'high' ? 'bg-green-100 text-green-800' : 
                  forecast.confidence === 'medium' ? 'bg-amber-100 text-amber-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {forecast.confidence} confidence
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Short-term (30 days)</p>
                  <div className="flex items-center mt-1">
                    {forecast.shortTerm === 'increase' ? 
                      <TrendingUp size={16} className="text-green-500 mr-1" /> : 
                      <TrendingDown size={16} className="text-red-500 mr-1" />
                    }
                    <span className="text-sm font-medium capitalize">{forecast.shortTerm}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Long-term (90 days)</p>
                  <div className="flex items-center mt-1">
                    {forecast.longTerm === 'increase' ? 
                      <TrendingUp size={16} className="text-green-500 mr-1" /> : 
                      forecast.longTerm === 'decrease' ?
                      <TrendingDown size={16} className="text-red-500 mr-1" /> :
                      <span className="h-4 w-4 bg-gray-400 rounded-full mr-1"></span>
                    }
                    <span className="text-sm font-medium capitalize">{forecast.longTerm}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                <div 
                  className={`h-full rounded-full ${
                    forecast.shortTerm === 'increase' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: forecast.confidence === 'high' ? '80%' : forecast.confidence === 'medium' ? '60%' : '40%' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                  Forecast Strength
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card 
        title="Selling Recommendations" 
        subtitle="AI-powered timing suggestions for your crops"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimal Timing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recommendations.map((rec, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                        {rec.crop === 'Wheat' ? 'W' : rec.crop === 'Corn' ? 'C' : 'S'}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{rec.crop}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium">{rec.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{rec.reasoning}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm">{rec.timing}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rec.confidence === 'high' ? 'bg-green-100 text-green-800' : 
                      rec.confidence === 'medium' ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {rec.confidence.charAt(0).toUpperCase() + rec.confidence.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Global Market Factors">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-full mr-3">
                <DollarSign size={18} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Currency Fluctuations</h4>
                <p className="text-sm text-gray-600 mt-1">
                  The USD has weakened against major currencies, potentially increasing export competitiveness.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-50 p-2 rounded-full mr-3">
                <BarChart2 size={18} className="text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Supply Chain Disruptions</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Ongoing shipping delays are affecting global commodity deliveries, potentially creating short-term price volatility.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-50 p-2 rounded-full mr-3">
                <TrendingUp size={18} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Emerging Market Demand</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Increasing food demand in Southeast Asia is creating new export opportunities for wheat and soybeans.
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Price Alerts Setup">
          <p className="text-sm text-gray-600 mb-4">
            Set price alerts to be notified when your commodities reach target prices.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                    W
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Wheat</p>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-sm mr-1">Alert at:</span>
                  <span className="font-medium">$8.75</span>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span className="text-gray-500">Current: $8.25</span>
                <span className="text-green-600">+$0.50 (+6.1%)</span>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    C
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Corn</p>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-sm mr-1">Alert at:</span>
                  <span className="font-medium">$6.00</span>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span className="text-gray-500">Current: $5.77</span>
                <span className="text-green-600">+$0.23 (+4.0%)</span>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            
            <button className="text-sm text-primary-600 hover:text-primary-800 w-full text-center mt-2">
              + Add new price alert
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketInsights;