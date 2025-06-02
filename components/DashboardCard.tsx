// components/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  hoverColor: string;
}

const Card: React.FC<CardProps> = ({ title, value, description, icon: Icon, color, hoverColor }) => {
  return (
    <div
      className={`${color} ${hoverColor} p-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
          <p className="text-white text-2xl font-bold mb-2">{value}</p>
          <p className="text-white text-sm opacity-90">{description}</p>
        </div>
        <Icon className="w-12 h-12 text-white opacity-80" />
      </div>
    </div>
  );
};

export default Card;
