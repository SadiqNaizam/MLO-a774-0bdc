import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface LeverageSliderWithRiskProps {
  minLeverage?: number;
  maxLeverage?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onCommit?: (value: number) => void;
  className?: string;
}

const LeverageSliderWithRisk: React.FC<LeverageSliderWithRiskProps> = ({
  minLeverage = 1,
  maxLeverage = 100,
  step = 1,
  defaultValue = 10,
  onChange,
  onCommit,
  className,
}) => {
  const [currentLeverage, setCurrentLeverage] = useState(defaultValue);

  console.log("Rendering LeverageSliderWithRisk, current leverage:", currentLeverage);

  const handleValueChange = (value: number[]) => {
    setCurrentLeverage(value[0]);
    if (onChange) {
      onChange(value[0]);
    }
  };

  const handleValueCommit = (value: number[]) => {
    if (onCommit) {
      onCommit(value[0]);
    }
    console.log("Leverage committed:", value[0]);
  };

  const getRiskLevel = (leverage: number): { level: string; color: string } => {
    if (leverage <= 10) return { level: 'Low', color: 'bg-green-500' };
    if (leverage <= 25) return { level: 'Medium', color: 'bg-yellow-500' };
    if (leverage <= 50) return { level: 'High', color: 'bg-orange-500' };
    return { level: 'Very High', color: 'bg-red-600' };
  };

  const risk = getRiskLevel(currentLeverage);

  return (
    <div className={cn("space-y-4 p-4 border rounded-lg bg-card text-card-foreground", className)}>
      <div className="flex justify-between items-center">
        <Label htmlFor="leverage-slider" className="text-sm font-medium">
          Leverage: <span className="font-bold text-primary">{currentLeverage}x</span>
        </Label>
        <Badge variant="outline" className={cn("text-xs font-semibold text-white", risk.color)}>
          Risk: {risk.level}
        </Badge>
      </div>
      <Slider
        id="leverage-slider"
        min={minLeverage}
        max={maxLeverage}
        step={step}
        defaultValue={[defaultValue]}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{minLeverage}x</span>
        <span>{maxLeverage}x</span>
      </div>
      {currentLeverage > 50 && (
        <p className="text-xs text-destructive text-center mt-2">
          Warning: High leverage increases both potential profits and losses significantly.
        </p>
      )}
    </div>
  );
};

export default LeverageSliderWithRisk;