import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CropRecommendation from './pages/CropRecommendation';
import DiseaseDetection from './pages/DiseaseDetection';
import WeatherForecast from './pages/WeatherForecast';
import YieldPrediction from './pages/YieldPrediction';
import MarketInsights from './pages/MarketInsights';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="crop-recommendation" element={<CropRecommendation />} />
        <Route path="disease-detection" element={<DiseaseDetection />} />
        <Route path="weather-forecast" element={<WeatherForecast />} />
        <Route path="yield-prediction" element={<YieldPrediction />} />
        <Route path="market-insights" element={<MarketInsights />} />
      </Route>
    </Routes>
  );
}

export default App;