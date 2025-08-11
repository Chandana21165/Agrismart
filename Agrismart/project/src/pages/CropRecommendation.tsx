import React, { useState } from 'react';
import { SlidersHorizontal, CheckCircle, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const CropRecommendation: React.FC = () => {
  const [soilType, setSoilType] = useState('clay-loam');
  const [rainfall, setRainfall] = useState(800);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(65);
  const [ph, setPh] = useState(6.5);
  const [nitrogen, setNitrogen] = useState(40);
  const [phosphorus, setPhosphorus] = useState(35);
  const [potassium, setPotassium] = useState(30);
  const [results, setResults] = useState<null | any[]>(null);

  // Mock crop recommendation data
  const recommendCrops = () => {
    // In a real application, this would call an AI model via API
    const mockRecommendations = [
      {
        crop: 'Wheat',
        confidence: 92,
        suitability: 'high',
        waterRequirement: 'medium',
        growthPeriod: '110-130 days',
        expectedYield: '3.5-4.5 tons/ha',
        marketTrend: 'stable',
      },
      {
        crop: 'Maize',
        confidence: 85,
        suitability: 'high',
        waterRequirement: 'medium-high',
        growthPeriod: '90-120 days',
        expectedYield: '5.0-7.0 tons/ha',
        marketTrend: 'increasing',
      },
      {
        crop: 'Barley',
        confidence: 78,
        suitability: 'medium',
        waterRequirement: 'low-medium',
        growthPeriod: '80-110 days',
        expectedYield: '2.5-3.5 tons/ha',
        marketTrend: 'stable',
      }
    ];
    
    setResults(mockRecommendations);
  };

  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case 'high':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'medium':
        return <CheckCircle size={20} className="text-yellow-500" />;
      case 'low':
        return <AlertTriangle size={20} className="text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Crop Recommendation</h1>
        <p className="text-gray-500 mt-1">Get AI-powered suggestions for crops best suited to your conditions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Input Parameters">
            <form className="space-y-4">
              <div>
                <label htmlFor="soilType" className="label">Soil Type</label>
                <select 
                  id="soilType" 
                  value={soilType} 
                  onChange={(e) => setSoilType(e.target.value)}
                  className="input"
                >
                  <option value="sandy">Sandy</option>
                  <option value="loamy">Loamy</option>
                  <option value="clay">Clay</option>
                  <option value="clay-loam">Clay Loam</option>
                  <option value="silty">Silty</option>
                </select>
              </div>

              <div>
                <label htmlFor="rainfall" className="label">Annual Rainfall (mm)</label>
                <input 
                  type="range" 
                  id="rainfall" 
                  min="200" 
                  max="2000" 
                  step="10" 
                  value={rainfall}
                  onChange={(e) => setRainfall(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">200mm</span>
                  <span className="text-xs font-medium">{rainfall}mm</span>
                  <span className="text-xs text-gray-500">2000mm</span>
                </div>
              </div>

              <div>
                <label htmlFor="temperature" className="label">Average Temperature (°C)</label>
                <input 
                  type="range" 
                  id="temperature" 
                  min="5" 
                  max="40" 
                  step="0.5" 
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">5°C</span>
                  <span className="text-xs font-medium">{temperature}°C</span>
                  <span className="text-xs text-gray-500">40°C</span>
                </div>
              </div>

              <div>
                <label htmlFor="humidity" className="label">Humidity (%)</label>
                <input 
                  type="range" 
                  id="humidity" 
                  min="30" 
                  max="100" 
                  step="1" 
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">30%</span>
                  <span className="text-xs font-medium">{humidity}%</span>
                  <span className="text-xs text-gray-500">100%</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Soil Nutrients</h4>
                  <button 
                    type="button" 
                    className="text-xs text-primary-600 flex items-center"
                    onClick={() => {
                      /* In a real app, this would open advanced options */
                    }}
                  >
                    <SlidersHorizontal size={14} className="mr-1" />
                    Advanced
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="ph" className="label">pH Level</label>
                    <input 
                      type="range" 
                      id="ph" 
                      min="3" 
                      max="9" 
                      step="0.1" 
                      value={ph}
                      onChange={(e) => setPh(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Acidic (3)</span>
                      <span className="text-xs font-medium">{ph}</span>
                      <span className="text-xs text-gray-500">Alkaline (9)</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="nitrogen" className="label">Nitrogen (kg/ha)</label>
                    <input 
                      type="number" 
                      id="nitrogen" 
                      value={nitrogen}
                      onChange={(e) => setNitrogen(Number(e.target.value))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label htmlFor="phosphorus" className="label">Phosphorus (kg/ha)</label>
                    <input 
                      type="number" 
                      id="phosphorus" 
                      value={phosphorus}
                      onChange={(e) => setPhosphorus(Number(e.target.value))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label htmlFor="potassium" className="label">Potassium (kg/ha)</label>
                    <input 
                      type="number" 
                      id="potassium" 
                      value={potassium}
                      onChange={(e) => setPotassium(Number(e.target.value))}
                      className="input"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="button" 
                variant="primary" 
                fullWidth 
                onClick={recommendCrops}
              >
                Get Recommendations
              </Button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {results ? (
            <div className="space-y-6">
              <Card 
                title="Recommended Crops" 
                subtitle="Based on your environmental conditions and soil analysis"
              >
                {results.map((crop, index) => (
                  <div key={index} className={`${index > 0 ? 'mt-6 pt-6 border-t border-gray-100' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="text-xl font-medium">{crop.crop}</h3>
                        <div className="ml-3 bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                          {crop.confidence}% match
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getSuitabilityIcon(crop.suitability)}
                        <span className="ml-1 text-sm capitalize">{crop.suitability} suitability</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-500">Water Requirement</p>
                        <p className="text-sm font-medium capitalize">{crop.waterRequirement}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Growth Period</p>
                        <p className="text-sm font-medium">{crop.growthPeriod}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Expected Yield</p>
                        <p className="text-sm font-medium">{crop.expectedYield}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Market Trend</p>
                        <p className="text-sm font-medium capitalize">{crop.marketTrend}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Card>

              <Card
                title="Optimization Recommendations"
                subtitle="How to improve your growing conditions"
              >
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                      <Droplet size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Irrigation Suggestions</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Based on the selected crops and your current rainfall patterns, we recommend implementing a drip irrigation system to maintain consistent soil moisture.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-50 p-2 rounded-full mr-3">
                      <CheckCircle size={18} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Soil Amendments</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your soil's potassium levels are slightly below optimal for wheat. Consider applying a balanced NPK fertilizer with higher K content before planting.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-50 p-2 rounded-full mr-3">
                      <AlertTriangle size={18} className="text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Climate Considerations</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        The temperature range in your region may lead to heat stress during flowering stage. Consider early planting to avoid peak summer temperatures.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-12 text-center">
              <div>
                <img 
                  src="https://images.pexels.com/photos/2255799/pexels-photo-2255799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Crops in a field" 
                  className="w-48 h-48 mx-auto object-cover rounded-full"
                />
                <h3 className="mt-6 text-xl font-medium text-gray-900">Get Your Crop Recommendations</h3>
                <p className="mt-2 text-gray-500">
                  Enter your field conditions on the left and our AI model will suggest the best crops to plant for optimal yield.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;