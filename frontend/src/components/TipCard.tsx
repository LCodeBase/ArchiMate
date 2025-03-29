import React from 'react';
import { TipIcon } from './Icons';

interface TipCardProps {
  tips: string[];
  title?: string;
  className?: string;
}

const TipCard: React.FC<TipCardProps> = ({
  tips,
  title = 'Dicas e Recomendações',
  className = ''
}) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className={`bg-blue-50 border border-blue-100 rounded-lg p-4 ${className}`}>
      <div className="flex items-center mb-3">
        <TipIcon size={20} color="#3b82f6" className="mr-2" />
        <h3 className="font-medium text-blue-800">{title}</h3>
      </div>

      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 text-xs font-medium mr-2 mt-0.5">
              {index + 1}
            </span>
            <span className="text-sm text-blue-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipCard;