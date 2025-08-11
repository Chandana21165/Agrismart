import React from 'react';
import { Cloud, CloudRain, Sun, CloudLightning } from 'lucide-react';
import Card from '../ui/Card';

interface ForecastDay {
  day: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  precipitation: number;
}

interface WeatherWidgetProps {
  location: string;
  currentTemperature: number;
  currentCondition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  forecast: ForecastDay[];
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ 
  location, 
  currentTemperature, 
  currentCondition, 
  forecast 
}) => {
  const getWeatherIcon = (condition: string, size = 24) => {
    switch (condition) {
      case 'sunny':
        return <Sun size={size} className="text-amber-500" />;
      case 'cloudy':
        return <Cloud size={size} className="text-gray-500" />;
      case 'rainy':
        return <CloudRain size={size} className="text-blue-500" />;
      case 'stormy':
        return <CloudLightning size={size} className="text-purple-500" />;
      default:
        return <Sun size={size} className="text-amber-500" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{location}</h3>
          <div className="flex items-center mt-1">
            <span className="text-3xl font-semibold">{currentTemperature}°C</span>
            <div className="ml-2">
              {getWeatherIcon(currentCondition, 30)}
            </div>
          </div>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700">
          View Details
        </button>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-2 text-center">
        {forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-xs text-gray-500">{day.day}</span>
            <div className="my-2">
              {getWeatherIcon(day.condition, 20)}
            </div>
            <span className="text-sm font-medium">{day.temperature}°</span>
            <span className="text-xs text-blue-500 mt-1">{day.precipitation}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeatherWidget;