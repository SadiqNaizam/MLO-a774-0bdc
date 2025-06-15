import React from 'react';
import { cn } from '@/lib/utils';

interface OrderBookEntry {
  price: number;
  size: number;
  total?: number; // Cumulative size
}

interface OrderBookDepthVisualizerProps {
  bids: OrderBookEntry[]; // Should be sorted descending by price
  asks: OrderBookEntry[]; // Should be sorted ascending by price
  maxDepthToShow?: number; // Max number of bids/asks to show
  className?: string;
}

const OrderBookDepthVisualizer: React.FC<OrderBookDepthVisualizerProps> = ({
  bids,
  asks,
  maxDepthToShow = 10,
  className,
}) => {
  console.log("Rendering OrderBookDepthVisualizer");

  // Normalize sizes for bar width (very basic normalization)
  const allSizes = [...bids.map(b => b.size), ...asks.map(a => a.size)];
  const maxSize = Math.max(...allSizes, 1); // Avoid division by zero

  const renderOrders = (orders: OrderBookEntry[], type: 'bid' | 'ask') => {
    const relevantOrders = type === 'bid' ? orders.slice(0, maxDepthToShow) : orders.slice(0, maxDepthToShow);
    return relevantOrders.map((order, index) => (
      <div
        key={`${type}-${order.price}-${index}`}
        className="relative flex justify-between items-center text-xs py-0.5 px-1 my-px overflow-hidden"
      >
        <div
          className={cn(
            "absolute top-0 bottom-0 h-full",
            type === 'bid' ? "bg-green-500/20 right-0" : "bg-red-500/20 left-0"
          )}
          style={{ width: `${(order.size / maxSize) * 100}%` }}
        />
        <span className={cn("z-10", type === 'ask' ? 'text-red-600' : 'text-green-600')}>
          {order.price.toFixed(2)}
        </span>
        <span className="z-10 text-gray-700">{order.size.toFixed(4)}</span>
        {/* <span className="z-10 text-gray-500 w-1/3 text-right">{(order.total || order.size).toFixed(4)}</span> */}
      </div>
    ));
  };

  return (
    <div className={cn("bg-gray-50 p-3 rounded-lg shadow text-xs", className)}>
      <div className="flex justify-between mb-1 font-semibold text-gray-500 px-1">
        <span>Price (USDT)</span>
        <span>Size (BTC)</span>
        {/* <span>Total (BTC)</span> */}
      </div>
      <div className="grid grid-cols-1">
        {/* Asks (sells) - typically shown above bids */}
        <div className="mb-1 flex flex-col-reverse">
            {asks.length > 0 ? renderOrders(asks, 'ask') : <p className="text-center text-gray-400 py-2">No asks</p>}
        </div>
        {/* Current Market Price Placeholder */}
        <div className="text-center py-1 my-1 border-y border-gray-300 font-bold text-sm text-blue-600">
            Market Spread Placeholder
        </div>
        {/* Bids (buys) */}
        <div>
            {bids.length > 0 ? renderOrders(bids, 'bid') : <p className="text-center text-gray-400 py-2">No bids</p>}
        </div>
      </div>
       <p className="text-center text-gray-400 mt-2 text-xs italic">
        Note: This is a simplified visual representation.
      </p>
    </div>
  );
};

export default OrderBookDepthVisualizer;