import React from 'react';
import { Sprout } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary-600 text-white p-1 rounded">
        <Sprout size={22} />
      </div>
      <span className="font-bold text-lg">AgriSmart</span>
    </div>
  );
};

export default Logo;