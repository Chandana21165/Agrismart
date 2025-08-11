import React, { ReactNode } from 'react';
import Card from './Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon?: ReactNode;
  trend?: number[];
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  trend
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center">
              {change.type === 'increase' && (
                <span className="text-success-500 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  {change.value}
                </span>
              )}
              
              {change.type === 'decrease' && (
                <span className="text-error-500 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {change.value}
                </span>
              )}
              
              {change.type === 'neutral' && (
                <span className="text-gray-500 text-sm">{change.value}</span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className="bg-primary-50 p-3 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-4 h-10">
          <div className="flex items-end justify-between h-full">
            {trend.map((point, index) => (
              <div 
                key={index}
                className="bg-primary-500 rounded-sm w-1"
                style={{ 
                  height: `${Math.max(15, Math.min(100, point))}%`, 
                  opacity: 0.7 + (index / trend.length) * 0.3
                }}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default StatsCard;