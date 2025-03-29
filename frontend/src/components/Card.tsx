import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
}

const Card: React.FC<CardProps> = ({ title, icon, children, variant = 'default' }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'border-l-4 border-primary-500';
      case 'success':
        return 'border-l-4 border-success';
      case 'warning':
        return 'border-l-4 border-warning';
      case 'info':
        return 'border-l-4 border-info';
      default:
        return '';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${getVariantClasses()}`}>
      <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <h3 className="font-semibold text-neutral-800">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

export default Card;