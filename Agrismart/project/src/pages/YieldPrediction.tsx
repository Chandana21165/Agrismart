import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { BarChart2, ArrowRight, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const YieldPrediction: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [area, setArea] = useState(100);
  const [soilQuality, setSoilQuality] = useState('good');
  const [irrigationType, setIrrigationType] = useState('drip');
  const [fertilizer, setFertilizer] = useState('balanced');
  const [results, setResults] = useState<null | any>(null);

  // Mock data for chart
  const historicalYields = {
    wheat: [3.2, 3.5, 3.8, 3.6, 3.9],
    corn: [7.2, 6.8, 7.5, 7.8, 8.2],
    soybeans: [2.8, 3.0, 2.9, 3.1, 3.2],
  };

  const years = ['2020', '2021', '2022', '2023', '2024'];

  const calculateYield = () => {
    // This would actually call an ML model API in a real application
    
    // Mock yield calculation
    let baseYield = 0;
    switch (selectedCrop) {
      case 'wheat':
        baseYield = 4.2; // tons per hectare
        break;
      case 'corn':
        baseYield = 9.0;
        break;
      case 'soybeans':
        baseYield = 3.5;
        break;
      default:
        baseYield = 4.0;
    }
    
    // Apply modifiers
    const soilModifier = soilQuality === 'excellent' ? 1.2 : soilQuality === 'good' ? 1.0 : 0.8;
    const irrigationModifier = irrigationType === 'drip' ? 1.15 : irrigationType === 'sprinkler' ? 1.05 : 0.9;
    const fertilizerModifier = fertilizer === 'premium' ? 1.1 : fertilizer === 'balanced' ? 1.0 : 0.9;
    
    const predictedYield = baseYield * soilModifier * irrigationModifier * fertilizerModifier;
    const totalYield = predictedYield * area;
    
    // Calculate optimization potential
    const optimizedYield = baseYield * 1.2 * 1.15 * 1.1 * area;
    const yieldGap = optimizedYield - totalYield;
    const yieldGapPercentage = (yieldGap / totalYield) * 100;
    
    // Generate factors
    const factors = [];
    if (soilQuality !== 'excellent') {
      factors.push({
        factor: 'Soil Quality',
        impact: 'medium',
        recommendation: 'Consider soil amendments like compost or lime to improve structure and nutrient availability.',
        potentialGain: '+10-20%'
      });
    }
    
    if (irrigationType !== 'drip') {
      factors.push({
        factor: 'Irrigation System',
        impact: 'high',
        recommendation: 'Upgrade to drip irrigation for more efficient water use and reduced disease pressure.',
        potentialGain: '+10-15%'
      });
    }
    
    if (fertilizer !== 'premium') {
      factors.push({
        factor: 'Fertilizer Program',
        impact: 'medium',
        recommendation: 'Implement a precision fertility program based on soil tests and crop requirements.',
        potentialGain: '+5-10%'
      });
    }
    
    setResults({
      predictedYield: predictedYield.toFixed(2),
      totalYield: totalYield.toFixed(1),
      yieldPerHectare: predictedYield.toFixed(2),
      optimizationPotential: yieldGapPercentage.toFixed(1),
      factors: factors,
      historicalComparison: {
        vsLastYear: ((predictedYield / historicalYields[selectedCrop as keyof typeof historicalYields][4]) - 1) * 100,
        vs5YearAvg: ((predictedYield / (historicalYields[selectedCrop as keyof typeof historicalYields].reduce((a, b) => a + b, 0) / 5)) - 1) * 100
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Yield Prediction</h1>
        <p className="text-gray-500 mt-1">Get AI-powered yield forecasts and optimization recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Prediction Parameters">
            <form className="space-y-4">
              <div>
                <label htmlFor="crop" className="label">Crop Type</label>
                <select 
                  id="crop" 
                  value={selectedCrop} 
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="input"
                >
                  <option value="wheat">Wheat</option>
                  <option value="corn">Corn</option>
                  <option value="soybeans">Soybeans</option>
                </select>
              </div>

              <div>
                <label htmlFor="area" className="label">Field Area (hectares)</label>
                <input 
                  type="number" 
                  id="area" 
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="soilQuality" className="label">Soil Quality</label>
                <select 
                  id="soilQuality" 
                  value={soilQuality} 
                  onChange={(e) => setSoilQuality(e.target.value)}
                  className="input"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div>
                <label htmlFor="irrigationType" className="label">Irrigation Type</label>
                <select 
                  id="irrigationType" 
                  value={irrigationType} 
                  onChange={(e) => setIrrigationType(e.target.value)}
                  className="input"
                >
                  <option value="drip">Drip Irrigation</option>
                  <option value="sprinkler">Sprinkler</option>
                  <option value="flood">Flood Irrigation</option>
                  <option value="none">None (Rainfed)</option>
                </select>
              </div>

              <div>
                <label htmlFor="fertilizer" className="label">Fertilizer Program</label>
                <select 
                  id="fertilizer" 
                  value={fertilizer} 
                  onChange={(e) => setFertilizer(e.target.value)}
                  className="input"
                >
                  <option value="premium">Premium (Precision)</option>
                  <option value="balanced">Balanced NPK</option>
                  <option value="basic">Basic</option>
                </select>
              </div>

              <Button 
                type="button" 
                variant="primary" 
                fullWidth 
                onClick={calculateYield}
              >
                Calculate Yield Prediction
              </Button>
            </form>
          </Card>

          <div className="mt-6">
            <Card title="Historical Yields" subtitle={`${selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} yields (tons/ha)`}>
              <div className="h-48 flex items-end space-x-2">
                {historicalYields[selectedCrop as keyof typeof historicalYields].map((yield_, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-primary-500 rounded-t"
                      style={{ height: `${(yield_ / 10) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">{years[index]}</span>
                    <span className="text-xs font-medium">{yield_}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-2">
          {results ? (
            <div className="space-y-6">
              <Card 
                title="Yield Prediction Results" 
                subtitle="Based on your inputs and historical data"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h3 className="text-sm text-primary-700">Predicted Yield</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold text-primary-700">{results.predictedYield}</span>
                      <span className="ml-1 text-primary-600">t/ha</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-700">Total Yield</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold text-gray-800">{results.totalYield}</span>
                      <span className="ml-1 text-gray-600">tons</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-700">Optimization Potential</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold text-amber-600">+{results.optimizationPotential}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Historical Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${results.historicalComparison.vsLastYear >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {results.historicalComparison.vsLastYear >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">vs. Last Year</p>
                        <p className="text-sm font-medium">
                          {results.historicalComparison.vsLastYear >= 0 ? '+' : ''}
                          {results.historicalComparison.vsLastYear.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${results.historicalComparison.vs5YearAvg >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {results.historicalComparison.vs5YearAvg >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">vs. 5-Year Average</p>
                        <p className="text-sm font-medium">
                          {results.historicalComparison.vs5YearAvg >= 0 ? '+' : ''}
                          {results.historicalComparison.vs5YearAvg.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Yield Limiting Factors" subtitle="Optimization opportunities">
                {results.factors.length > 0 ? (
                  <div className="space-y-4">
                    {results.factors.map((factor: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className={`p-2 rounded-full flex-shrink-0 ${
                          factor.impact === 'high' ? 'bg-red-50 text-red-700' : 
                          factor.impact === 'medium' ? 'bg-amber-50 text-amber-700' : 
                          'bg-blue-50 text-blue-700'
                        }`}>
                          <AlertCircle size={20} />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <h4 className="font-medium">{factor.factor}</h4>
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              factor.impact === 'high' ? 'bg-red-100 text-red-800' : 
                              factor.impact === 'medium' ? 'bg-amber-100 text-amber-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {factor.impact} impact
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{factor.recommendation}</p>
                          <p className="text-sm font-medium text-green-600 mt-1">Potential yield gain: {factor.potentialGain}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-green-50 text-green-700 flex-shrink-0">
                      <TrendingUp size={20} />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">Optimal Conditions</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your current farming practices are well optimized. Continue monitoring conditions and maintain your excellent practices.
                      </p>
                    </div>
                  </div>
                )}
              </Card>

              <Card 
                title="Economic Analysis" 
                subtitle="Estimated financial outcomes"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Current Practices</h4>
                      <p className="text-2xl font-semibold mt-1">
                        $
                        {(
                          results.totalYield * 
                          (selectedCrop === 'wheat' ? 250 : selectedCrop === 'corn' ? 180 : 450)
                        ).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Estimated gross revenue</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">With Optimization</h4>
                      <p className="text-2xl font-semibold mt-1 text-green-600">
                        $
                        {(
                          results.totalYield * 
                          (1 + parseFloat(results.optimizationPotential) / 100) * 
                          (selectedCrop === 'wheat' ? 250 : selectedCrop === 'corn' ? 180 : 450)
                        ).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Potential gross revenue</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-green-800">Potential Revenue Increase</h4>
                      <p className="font-bold text-green-800">
                        $
                        {(
                          results.totalYield * 
                          (parseFloat(results.optimizationPotential) / 100) * 
                          (selectedCrop === 'wheat' ? 250 : selectedCrop === 'corn' ? 180 : 450)
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <ArrowRight size={16} className="mr-1 text-green-600" />
                      <span className="text-green-700">
                        {results.optimizationPotential}% yield increase with recommended practices
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-12 text-center">
              <div>
                <div className="bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                  <BarChart2 size={28} className="text-primary-600" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Predict Your Crop Yields</h3>
                <p className="mt-2 text-gray-500">
                  Enter your field parameters on the left and our AI model will predict expected yields and provide optimization recommendations.
                </p>
                <div className="mt-6">
                  <img 
                    src="https://images.pexels.com/photos/5980751/pexels-photo-5980751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Wheat field" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;