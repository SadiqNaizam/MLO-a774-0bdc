import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlassmorphismTradingCardProps {
  pair: string; // e.g., "BTC/USDT"
  price: number;
  changePercent: number; // e.g., 2.5 for +2.5%, -1.2 for -1.2%
  volume?: string; // e.g., "2.5M USDT"
  onClick?: () => void;
  className?: string;
}

const GlassmorphismTradingCard: React.FC<GlassmorphismTradingCardProps> = ({
  pair,
  price,
  changePercent,
  volume,
  onClick,
  className,
}) => {
  console.log(`Rendering GlassmorphismTradingCard for pair: ${pair}`);
  const isPositiveChange = changePercent >= 0;

  return (
    <div
      className={cn(
        "p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl",
        "bg-white/30 backdrop-blur-lg border border-white/20", // Glassmorphism effect
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={onClick ? 0 : -1}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{pair}</h3>
        <div
          className={cn(
            "flex items-center text-sm font-medium px-2 py-1 rounded-md",
            isPositiveChange ? "bg-green-100/50 text-green-700" : "bg-red-100/50 text-red-700"
          )}
        >
          {isPositiveChange ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {changePercent.toFixed(2)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">
        ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      {volume && <div className="text-xs text-gray-600">Vol: {volume}</div>}
    </div>
  );
};

export default GlassmorphismTradingCard;