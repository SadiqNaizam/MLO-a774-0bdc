import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface AssetAllocationDataPoint {
  name: string; // e.g., 'Bitcoin', 'Ethereum'
  value: number; // e.g., 40 (for 40%)
  color: string; // e.g., '#FFBB28'
}

interface AssetAllocationPieChartProps {
  data: AssetAllocationDataPoint[];
  title?: string;
  className?: string;
  height?: number;
}

const AssetAllocationPieChart: React.FC<AssetAllocationPieChartProps> = ({
  data,
  title = "Asset Allocation",
  className,
  height = 300,
}) => {
  console.log("Rendering AssetAllocationPieChart with data:", data);

  if (!data || data.length === 0) {
    return (
      <div className={cn("p-4 text-center text-muted-foreground", className)} style={{ height }}>
        No allocation data available.
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      {title && <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Custom label
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetAllocationPieChart;