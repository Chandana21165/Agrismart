import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, Sprout, Thermometer, CloudRain, BarChart, TrendingUp, Settings, HelpCircle } from 'lucide-react';
import Logo from '../ui/Logo';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 md:translate-x-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Logo />
          <button 
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            <li>
              <NavLink to="/" end className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Home size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/crop-recommendation" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Sprout size={20} />
                <span>Crop Recommendation</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/disease-detection" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Thermometer size={20} />
                <span>Disease Detection</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/weather-forecast" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <CloudRain size={20} />
                <span>Weather Forecast</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/yield-prediction" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <BarChart size={20} />
                <span>Yield Prediction</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/market-insights" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <TrendingUp size={20} />
                <span>Market Insights</span>
              </NavLink>
            </li>
          </ul>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <ul className="space-y-1">
              <li>
                <a href="#" className="sidebar-link">
                  <Settings size={20} />
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a href="#" className="sidebar-link">
                  <HelpCircle size={20} />
                  <span>Help & Support</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-primary-50 rounded-lg p-4">
            <h5 className="text-sm font-medium text-primary-800 mb-2">Pro Tip</h5>
            <p className="text-xs text-primary-700">
              Add soil sensors to your farm to get real-time data and more accurate predictions.
            </p>
            <button className="mt-3 text-xs font-medium text-primary-700 hover:text-primary-800">
              Learn more →
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;