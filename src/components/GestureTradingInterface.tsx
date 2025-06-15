import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GestureTradingInterfaceProps {
  onBuy?: () => void;
  onSell?: () => void;
  className?: string;
  buyButtonText?: string;
  sellButtonText?: string;
}

const GestureTradingInterface: React.FC<GestureTradingInterfaceProps> = ({
  onBuy,
  onSell,
  className,
  buyButtonText = "Buy / Long",
  sellButtonText = "Sell / Short",
}) => {
  console.log("Rendering GestureTradingInterface");

  // For actual gesture support, you'd integrate libraries like react-use-gesture or Hammer.js.
  // This is a simplified version with large buttons.

  return (
    <div className={cn("p-4 space-y-4", className)}>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Tap or swipe (gesture functionality illustrative).
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="default"
          className="h-24 text-lg bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center"
          onClick={onBuy}
        >
          <ArrowUpCircle className="w-8 h-8 mb-1" />
          {buyButtonText}
        </Button>
        <Button
          variant="default"
          className="h-24 text-lg bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center"
          onClick={onSell}
        >
          <ArrowDownCircle className="w-8 h-8 mb-1" />
          {sellButtonText}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Hint: Advanced gesture controls (e.g., swipe up/down for market orders) could be implemented here.
      </p>
    </div>
  );
};

export default GestureTradingInterface;