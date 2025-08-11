import React, { useState } from 'react';
import { Upload, X, CheckCircle2, AlertTriangle, Leaf } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const DiseaseDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [results, setResults] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const analyzeImage = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results - in a real app this would come from an API
      setResults({
        disease: "Powdery Mildew",
        confidence: 92.7,
        severity: "moderate",
        description: "Powdery mildew is a fungal disease that affects a wide range of plants. It appears as a white to gray powdery growth on leaf surfaces, stems, and sometimes fruit.",
        treatment: [
          "Apply fungicides containing sulfur or potassium bicarbonate",
          "Improve air circulation around plants by proper spacing",
          "Remove and destroy infected plant parts",
          "Avoid overhead watering to keep foliage dry"
        ],
        prevention: [
          "Plant resistant varieties when available",
          "Ensure proper plant spacing for good air circulation",
          "Apply preventative fungicides during humid weather",
          "Rotate crops to break disease cycles"
        ]
      });
      setLoading(false);
    }, 1500);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResults(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Plant Disease Detection</h1>
        <p className="text-gray-500 mt-1">Upload an image of your plant to detect diseases and get treatment recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          {!selectedImage ? (
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center ${dragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload size={40} className="mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">Upload a Plant Image</h3>
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop an image file here, or click to select a file
              </p>
              <div className="mt-6">
                <label className="btn btn-primary cursor-pointer">
                  Select Image
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="mt-4 text-xs text-gray-400">
                Supported formats: JPG, PNG. Max size: 10MB
              </p>
            </div>
          ) : (
            <div>
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Uploaded plant" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button 
                  onClick={resetAnalysis}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                >
                  <X size={18} />
                </button>
              </div>
              
              {!results && (
                <div className="mt-4">
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={analyzeImage}
                    disabled={loading}
                  >
                    {loading ? 'Analyzing...' : 'Analyze Image'}
                  </Button>
                  {loading && (
                    <div className="mt-4 text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-r-transparent"></div>
                      <p className="mt-2 text-sm text-gray-500">
                        Analyzing image with AI model...
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>

        {results ? (
          <Card title="Analysis Results">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="text-xl font-medium">{results.disease}</h3>
                  <div className="ml-3 bg-amber-50 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    {results.confidence.toFixed(1)}% confidence
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1 capitalize">
                  <span className="font-medium">{results.severity}</span> severity detected
                </p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                <AlertTriangle size={24} />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-gray-600">
                {results.description}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Recommended Treatment</h4>
              <ul className="space-y-2">
                {results.treatment.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Prevention</h4>
              <ul className="space-y-2">
                {results.prevention.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Leaf size={18} className="text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="h-full flex items-center justify-center text-center p-6">
              <div>
                <div className="bg-primary-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                  <Leaf size={30} className="text-primary-500" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Disease Detection</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Upload a clear image of your plant leaves or stems and our AI will identify potential diseases and provide treatment recommendations.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <img 
                        src="https://images.pexels.com/photos/7728088/pexels-photo-7728088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Plant leaf" 
                        className="h-16 w-full object-cover rounded"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Leaf spots</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <img 
                        src="https://images.pexels.com/photos/8801223/pexels-photo-8801223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Plant stem" 
                        className="h-16 w-full object-cover rounded"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Stem rot</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <img 
                        src="https://images.pexels.com/photos/7016425/pexels-photo-7016425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Fruit disease" 
                        className="h-16 w-full object-cover rounded"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Fruit disease</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card title="Recent Disease Detections">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 15, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tomato</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Early Blight</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Moderate</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Treated
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 12, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wheat</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rust</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Severe</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Treated
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 10, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Corn</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gray Leaf Spot</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mild</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Monitoring
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;