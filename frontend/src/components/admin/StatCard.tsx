import React from 'react';
import { useTranslation } from 'next-i18next';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  percentage?: number;
  isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  percentage, 
  isPositive = true 
}) => {
  const { t } = useTranslation('common');
  
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
  };
  
  const iconColorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    red: 'bg-red-500 text-white',
    purple: 'bg-purple-500 text-white',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className={`w-10 h-10 rounded-full ${iconColorClasses[color]} flex items-center justify-center`}>
          <i className={`fas fa-${icon}`}></i>
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          
          {percentage !== undefined && (
            <div className="flex items-center mt-2">
              <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                <i className={`fas fa-arrow-${isPositive ? 'up' : 'down'} mr-1`}></i>
                {percentage}%
              </span>
              <span className="text-gray-500 text-xs ml-2">vs. mês anterior</span>
            </div>
          )}
        </div>
        
        <div className={`px-2 py-1 rounded-md text-xs ${colorClasses[color]}`}>
          {t('admin.lastUpdated')}: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
