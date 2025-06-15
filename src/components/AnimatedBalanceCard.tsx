import React from 'react';
import CountUp from 'react-countup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedBalanceCardProps {
  title?: string;
  balance: number;
  previousBalance?: number; // For CountUp start value if needed
  currencySymbol?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  icon?: React.ElementType;
}

const AnimatedBalanceCard: React.FC<AnimatedBalanceCardProps> = ({
  title = "Current Balance",
  balance,
  previousBalance,
  currencySymbol = "$",
  decimals = 2,
  duration = 1.5,
  className,
  icon: Icon,
}) => {
  console.log(`Rendering AnimatedBalanceCard: ${title}, Balance: ${balance}`);
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currencySymbol}
          <CountUp
            start={previousBalance !== undefined ? previousBalance : 0}
            end={balance}
            decimals={decimals}
            duration={duration}
            separator=","
          />
        </div>
        {/* Add more details like percentage change if needed */}
      </CardContent>
    </Card>
  );
};

export default AnimatedBalanceCard;