import React from 'react';
import { BarChart2, Droplet, CloudRain, AlertCircle, TrendingUp } from 'lucide-react';
import StatsCard from '../components/ui/StatsCard';
import Card from '../components/ui/Card';
import WeatherWidget from '../components/weather/WeatherWidget';
import CropStatusCard from '../components/crops/CropStatusCard';

const Dashboard: React.FC = () => {
  // Mock data
  const weatherForecast = [
    { day: 'Mon', temperature: 28, condition: 'sunny', precipitation: 0 },
    { day: 'Tue', temperature: 27, condition: 'sunny', precipitation: 10 },
    { day: 'Wed', temperature: 25, condition: 'cloudy', precipitation: 20 },
    { day: 'Thu', temperature: 23, condition: 'rainy', precipitation: 80 },
    { day: 'Fri', temperature: 25, condition: 'cloudy', precipitation: 30 },
  ] as const;

  const cropStatuses = [
    {
      name: 'Wheat',
      growthStage: 'Ripening',
      health: 'excellent',
      daysTillHarvest: 21,
      irrigationStatus: 'optimal',
      sunlightStatus: 'optimal',
    },
    {
      name: 'Corn',
      growthStage: 'Vegetative',
      health: 'good',
      daysTillHarvest: 65,
      irrigationStatus: 'needs-water',
      sunlightStatus: 'optimal',
    },
    {
      name: 'Soybeans',
      growthStage: 'Flowering',
      health: 'fair',
      daysTillHarvest: 42,
      irrigationStatus: 'optimal',
      sunlightStatus: 'needs-more',
    },
  ] as const;

  const marketPrices = [
    { crop: 'Wheat', price: '8.25', change: '+0.15', trend: 'up' },
    { crop: 'Corn', price: '5.77', change: '-0.23', trend: 'down' },
    { crop: 'Soybeans', price: '14.20', change: '+0.42', trend: 'up' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening on your farm today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Crop Yield Forecast" 
          value="92 t" 
          change={{ value: "12%", type: "increase" }}
          icon={<BarChart2 size={24} className="text-primary-600" />}
          trend={[30, 40, 45, 50, 55, 60, 65]}
        />
        <StatsCard 
          title="Soil Moisture" 
          value="28%" 
          change={{ value: "5%", type: "decrease" }}
          icon={<Droplet size={24} className="text-blue-600" />}
          trend={[65, 60, 55, 50, 45, 40, 35]}
        />
        <StatsCard 
          title="Rainfall (Monthly)" 
          value="115 mm" 
          change={{ value: "Normal", type: "neutral" }}
          icon={<CloudRain size={24} className="text-blue-600" />}
          trend={[20, 30, 40, 50, 60, 40, 30]}
        />
        <StatsCard 
          title="Alerts" 
          value="2" 
          change={{ value: "Action needed", type: "increase" }}
          icon={<AlertCircle size={24} className="text-amber-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeatherWidget 
            location="Austin, TX"
            currentTemperature={28}
            currentCondition="sunny"
            forecast={weatherForecast}
          />
        </div>
        <div>
          <Card title="Market Prices" subtitle="Live commodity prices">
            <div className="divide-y">
              {marketPrices.map((item, index) => (
                <div key={index} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                  <span className="font-medium">{item.crop}</span>
                  <div className="flex items-center">
                    <span className="font-medium">${item.price}</span>
                    <span className={`ml-2 text-sm ${item.trend === 'up' ? 'text-success-500' : 'text-error-500'}`}>
                      {item.change}
                      <TrendingUp className={`h-4 w-4 inline ml-1 ${item.trend === 'up' ? '' : 'transform rotate-180'}`} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                View all prices →
              </a>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Crop Status</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700">
            View all crops
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cropStatuses.map((crop, index) => (
            <CropStatusCard key={index} crop={crop} />
          ))}
        </div>
      </div>

      <div>
        <Card 
          title="Recommendations" 
          subtitle="AI-powered suggestions to optimize your farm"
        >
          <ul className="divide-y">
            <li className="py-3 flex items-start">
              <span className="bg-blue-100 text-blue-700 p-1 rounded mr-3">
                <Droplet size={18} />
              </span>
              <div>
                <p className="font-medium">Increase irrigation for corn fields</p>
                <p className="text-sm text-gray-600 mt-1">
                  Soil moisture levels are 10% below optimal. Consider adding 15mm of water over the next 2 days.
                </p>
              </div>
            </li>
            <li className="py-3 flex items-start">
              <span className="bg-amber-100 text-amber-700 p-1 rounded mr-3">
                <AlertCircle size={18} />
              </span>
              <div>
                <p className="font-medium">Potential pest infestation in Soybeans</p>
                <p className="text-sm text-gray-600 mt-1">
                  Early signs of aphids detected. Inspect field section B3 and consider targeted treatment.
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;