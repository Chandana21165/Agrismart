import React from 'react';
import { Sun, CloudRain, Wind, CloudLightning, Thermometer, Droplet } from 'lucide-react';
import Card from '../components/ui/Card';

const WeatherForecast: React.FC = () => {
  // Mock data
  const forecast = [
    {
      date: 'Today',
      day: 'Tue',
      temperature: { high: 30, low: 18 },
      condition: 'sunny',
      precipitation: 0,
      humidity: 45,
      windSpeed: 12,
      description: 'Clear sky',
      hourly: [
        { time: '6am', temp: 18, condition: 'sunny' },
        { time: '9am', temp: 23, condition: 'sunny' },
        { time: '12pm', temp: 28, condition: 'sunny' },
        { time: '3pm', temp: 30, condition: 'sunny' },
        { time: '6pm', temp: 25, condition: 'sunny' },
        { time: '9pm', temp: 20, condition: 'clear' },
      ]
    },
    {
      date: 'Tomorrow',
      day: 'Wed',
      temperature: { high: 28, low: 19 },
      condition: 'partly-cloudy',
      precipitation: 10,
      humidity: 55,
      windSpeed: 10,
      description: 'Partly cloudy'
    },
    {
      date: 'Thu',
      day: 'Thu',
      temperature: { high: 25, low: 18 },
      condition: 'cloudy',
      precipitation: 30,
      humidity: 65,
      windSpeed: 8,
      description: 'Mostly cloudy'
    },
    {
      date: 'Fri',
      day: 'Fri',
      temperature: { high: 22, low: 17 },
      condition: 'rainy',
      precipitation: 80,
      humidity: 75,
      windSpeed: 15,
      description: 'Heavy rain'
    },
    {
      date: 'Sat',
      day: 'Sat',
      temperature: { high: 20, low: 15 },
      condition: 'rainy',
      precipitation: 65,
      humidity: 80,
      windSpeed: 18,
      description: 'Rain showers'
    },
    {
      date: 'Sun',
      day: 'Sun',
      temperature: { high: 23, low: 14 },
      condition: 'partly-cloudy',
      precipitation: 25,
      humidity: 60,
      windSpeed: 12,
      description: 'Partly cloudy'
    },
    {
      date: 'Mon',
      day: 'Mon',
      temperature: { high: 26, low: 16 },
      condition: 'sunny',
      precipitation: 0,
      humidity: 50,
      windSpeed: 10,
      description: 'Sunny'
    }
  ];

  const getWeatherIcon = (condition: string, size = 24) => {
    switch (condition) {
      case 'sunny':
      case 'clear':
        return <Sun size={size} className="text-amber-500" />;
      case 'partly-cloudy':
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

  // Weather alerts
  const alerts = [
    {
      type: 'Frost Warning',
      description: 'Potential frost conditions expected this weekend. Protect sensitive crops.',
      severity: 'moderate',
    },
    {
      type: 'Heavy Rain Alert',
      description: 'Heavy rainfall expected on Friday. Potential for localized flooding in low-lying areas.',
      severity: 'high',
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Weather Forecast</h1>
        <p className="text-gray-500 mt-1">7-day forecast and agricultural weather insights for your farm.</p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div 
              key={index} 
              className={`rounded-lg p-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-l-4 border-red-500' : 
                alert.severity === 'moderate' ? 'bg-amber-50 border-l-4 border-amber-500' : 
                'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle 
                    className={`h-5 w-5 ${
                      alert.severity === 'high' ? 'text-red-400' : 
                      alert.severity === 'moderate' ? 'text-amber-400' : 
                      'text-blue-400'
                    }`} 
                  />
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${
                    alert.severity === 'high' ? 'text-red-800' : 
                    alert.severity === 'moderate' ? 'text-amber-800' : 
                    'text-blue-800'
                  }`}>
                    {alert.type}
                  </h3>
                  <div className={`mt-1 text-sm ${
                    alert.severity === 'high' ? 'text-red-700' : 
                    alert.severity === 'moderate' ? 'text-amber-700' : 
                    'text-blue-700'
                  }`}>
                    <p>{alert.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Today's detailed weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center">
                  <h2 className="text-2xl font-semibold">Today</h2>
                  <span className="ml-2 text-sm text-gray-500">Tue, Jun 15</span>
                </div>
                <p className="text-gray-500 mt-1">{forecast[0].description}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="mr-4">
                  {getWeatherIcon(forecast[0].condition, 48)}
                </div>
                <div>
                  <span className="text-4xl font-semibold">{forecast[0].temperature.high}°</span>
                  <span className="text-gray-500 ml-2">{forecast[0].temperature.low}°</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <Droplet size={16} className="mr-1" />
                  <span className="text-xs">Precipitation</span>
                </div>
                <span className="text-lg font-medium">{forecast[0].precipitation}%</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <Thermometer size={16} className="mr-1" />
                  <span className="text-xs">Humidity</span>
                </div>
                <span className="text-lg font-medium">{forecast[0].humidity}%</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <Wind size={16} className="mr-1" />
                  <span className="text-xs">Wind</span>
                </div>
                <span className="text-lg font-medium">{forecast[0].windSpeed} km/h</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <Sun size={16} className="mr-1" />
                  <span className="text-xs">UV Index</span>
                </div>
                <span className="text-lg font-medium">High</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Hourly Forecast</h3>
              <div className="grid grid-cols-6 gap-2">
                {forecast[0].hourly.map((hour, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs text-gray-500">{hour.time}</p>
                    <div className="my-2">
                      {getWeatherIcon(hour.condition, 20)}
                    </div>
                    <p className="text-sm font-medium">{hour.temp}°</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Agriculture Insights">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Field Work Suitability</h4>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full w-4/5"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Excellent conditions for field operations</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Irrigation Need</h4>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-amber-500 rounded-full w-3/5"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Moderate need for irrigation</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Pest Pressure</h4>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full w-4/5"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">High pest activity likely due to warm conditions</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Disease Risk</h4>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-amber-500 rounded-full w-2/5"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Moderate risk due to humidity changes</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 7-day forecast */}
      <Card title="7-Day Forecast">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className={`p-3 rounded-lg ${index === 0 ? 'bg-primary-50' : 'bg-gray-50'}`}>
              <p className={`text-sm font-medium ${index === 0 ? 'text-primary-700' : ''}`}>{day.day}</p>
              <div className="my-2">
                {getWeatherIcon(day.condition, 28)}
              </div>
              <p className="text-sm font-medium">{day.temperature.high}°</p>
              <p className="text-xs text-gray-500">{day.temperature.low}°</p>
              <div className="mt-2 flex items-center">
                <Droplet size={12} className="text-blue-500 mr-1" />
                <span className="text-xs">{day.precipitation}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weather impact analysis */}
      <Card title="Weather Impact Analysis">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Wheat</h3>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="text-sm text-gray-700">
                Current conditions are favorable for wheat development. The warm days and cool nights will promote good grain filling.
              </p>
              <div className="mt-3 flex items-center">
                <div className="w-1/2">
                  <p className="text-xs text-gray-500">Risk Level</p>
                  <p className="text-sm font-medium text-green-600">Low</p>
                </div>
                <div className="w-1/2">
                  <p className="text-xs text-gray-500">Action Needed</p>
                  <p className="text-sm font-medium">None</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Corn</h3>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <p className="text-sm text-gray-700">
                The upcoming rain may delay pollination. Consider adjusting fertilizer application schedule to avoid runoff.
              </p>
              <div className="mt-3 flex items-center">
                <div className="w-1/2">
                  <p className="text-xs text-gray-500">Risk Level</p>
                  <p className="text-sm font-medium text-amber-600">Moderate</p>
                </div>
                <div className="w-1/2">
                  <p className="text-xs text-gray-500">Action Needed</p>
                  <p className="text-sm font-medium">Delay fertilizing</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Soybeans</h3>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <p className="text-sm text-gray-700">
                Increased humidity may elevate disease pressure. Monitor fields for early signs of fungal diseases.
              </p>
              <div className="mt-3 flex items-center">
                <div className="w-1/2">
                  <p className="text-xs text-gray-500">Risk Level</p>
                  <p className="text-sm font-medium text-amber-600">Moderate</p>
                </div>
                <div className="w-1/2">
                  <p className="text-xs text-gray-500">Action Needed</p>
                  <p className="text-sm font-medium">Scouting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Import at top of file
const Cloud = ({ size = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  );
};

const AlertTriangle = ({ size = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/>
      <path d="M12 17h.01"/>
    </svg>
  );
};

export default WeatherForecast;