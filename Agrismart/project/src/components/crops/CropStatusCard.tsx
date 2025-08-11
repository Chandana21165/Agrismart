import React from 'react';
import Card from '../ui/Card';
import { Droplet, Sun, Wind } from 'lucide-react';

interface CropStatus {
  name: string;
  growthStage: string;
  health: 'excellent' | 'good' | 'fair' | 'poor';
  daysTillHarvest: number;
  irrigationStatus: 'optimal' | 'needs-water' | 'over-watered';
  sunlightStatus: 'optimal' | 'needs-more' | 'too-much';
}

interface CropStatusCardProps {
  crop: CropStatus;
}

const CropStatusCard: React.FC<CropStatusCardProps> = ({ crop }) => {
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-green-400';
      case 'fair': return 'bg-yellow-400';
      case 'poor': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const getIrrigationIcon = (status: string) => {
    switch (status) {
      case 'optimal': 
        return <Droplet size={18} className="text-blue-500" />;
      case 'needs-water': 
        return <Droplet size={18} className="text-amber-500" />;
      case 'over-watered': 
        return <Droplet size={18} className="text-red-500" />;
      default: 
        return <Droplet size={18} className="text-gray-500" />;
    }
  };

  const getSunlightIcon = (status: string) => {
    switch (status) {
      case 'optimal': 
        return <Sun size={18} className="text-amber-500" />;
      case 'needs-more': 
        return <Sun size={18} className="text-blue-500" />;
      case 'too-much': 
        return <Sun size={18} className="text-red-500" />;
      default: 
        return <Sun size={18} className="text-gray-500" />;
    }
  };

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium">{crop.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{crop.growthStage}</p>
        </div>
        <div className={`h-3 w-3 rounded-full ${getHealthColor(crop.health)}`}></div>
      </div>

      <div className="mt-4 flex items-center">
        <div className="text-sm">
          <span className="text-gray-500">Harvest in:</span> 
          <span className="ml-1 font-medium">{crop.daysTillHarvest} days</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
          {getIrrigationIcon(crop.irrigationStatus)}
          <span className="text-xs">Water</span>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
          {getSunlightIcon(crop.sunlightStatus)}
          <span className="text-xs">Light</span>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
          <Wind size={18} className="text-gray-500" />
          <span className="text-xs">Wind</span>
        </div>
      </div>
    </Card>
  );
};

export default CropStatusCard;