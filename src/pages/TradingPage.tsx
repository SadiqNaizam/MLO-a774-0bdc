import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdvancedChartComponent from '@/components/AdvancedChartComponent'; // Assuming this exists
import OrderBookDepthVisualizer, { OrderBookEntry } from '@/components/OrderBookDepthVisualizer';
import NeumorphicInteractiveElement from '@/components/NeumorphicInteractiveElement';
import LeverageSliderWithRisk from '@/components/LeverageSliderWithRisk';
import GestureTradingInterface from '@/components/GestureTradingInterface';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Home, BarChart2, CandlestickChart, Wallet, PiggyBank, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for OrderBook
const mockBids: OrderBookEntry[] = Array.from({ length: 20 }, (_, i) => ({ price: 60500 - i * 10, size: Math.random() * 5, total: Math.random() * 50 })).sort((a,b) => b.price - a.price);
const mockAsks: OrderBookEntry[] = Array.from({ length: 20 }, (_, i) => ({ price: 60510 + i * 10, size: Math.random() * 5, total: Math.random() * 50 })).sort((a,b) => a.price - b.price);

const orderFormSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  price: z.coerce.number().optional(), // Optional for market orders
  orderType: z.enum(["market", "limit"]).default("market"),
  tradeType: z.enum(["buy", "sell"]).default("buy"),
});

const TradingPage = () => {
  console.log('TradingPage loaded');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPair = queryParams.get('pair') || 'BTC_USDT';
  const [currentPair, setCurrentPair] = useState(initialPair.replace('_', '/'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: "", description: "", onConfirm: () => {} });


  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      amount: 0,
      orderType: "market",
      tradeType: "buy",
    },
  });

  const onSubmit = (values: z.infer<typeof orderFormSchema>) => {
    setDialogContent({
        title: `Confirm ${values.tradeType === 'buy' ? 'Buy' : 'Sell'} Order`,
        description: `Are you sure you want to place a ${values.orderType} ${values.tradeType === 'buy' ? 'buy' : 'sell'} order for ${values.amount} of ${currentPair}${values.orderType === 'limit' ? ' at $' + values.price : ''}?`,
        onConfirm: () => {
            console.log("Order submitted:", values);
            toast.success(`Trade Executed! ${values.tradeType === 'buy' ? 'Bought' : 'Sold'} ${values.amount} ${currentPair.split('/')[0]}.`);
            setIsDialogOpen(false);
            form.reset();
        }
    });
    setIsDialogOpen(true);
  };
  
  const handleGestureBuy = () => {
    form.setValue("tradeType", "buy");
    // Potentially prefill amount or trigger market buy directly
    toast.info("Gesture Buy: Ready to confirm or fill order form.");
    // For direct execution: onSubmit({amount: 0.001, orderType: 'market', tradeType: 'buy'});
  };

  const handleGestureSell = () => {
    form.setValue("tradeType", "sell");
    toast.info("Gesture Sell: Ready to confirm or fill order form.");
  };


  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
       <header className="p-3 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
        <h1 className="text-lg font-semibold">{currentPair} Trading</h1>
        <Button variant="ghost" size="icon" onClick={() => toast.info("Trading pair information and settings could be shown here.")}>
            <Info size={20} />
        </Button>
      </header>

      <ScrollArea className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-gray-700 h-full"> {/* Use gap-px with bg for borders */}
          {/* Left Column: Chart & Order Book */}
          <div className="lg:col-span-2 bg-gray-900 flex flex-col">
            <div className="h-[300px] md:h-[400px] lg:h-[calc(60vh-4rem)] border-b border-gray-700">
              <AdvancedChartComponent pair={currentPair} />
            </div>
            <div className="flex-grow p-2 min-h-[200px] lg:h-[calc(40vh-4rem)]">
              <OrderBookDepthVisualizer bids={mockBids} asks={mockAsks} className="h-full bg-gray-800 text-xs"/>
            </div>
          </div>

          {/* Right Column: Trading Controls */}
          <div className="lg:col-span-1 bg-gray-800 p-3 space-y-3 flex flex-col">
            <Tabs defaultValue="spot" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                <TabsTrigger value="spot" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Spot</TabsTrigger>
                <TabsTrigger value="futures" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Futures</TabsTrigger>
              </TabsList>
              <TabsContent value="spot" className="mt-3">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <Tabs defaultValue="market" onValueChange={(val) => form.setValue("orderType", val as "market" | "limit")} >
                      <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                        <TabsTrigger value="market" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Market</TabsTrigger>
                        <TabsTrigger value="limit" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Limit</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    {form.watch("orderType") === "limit" && (
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Price ({currentPair.split('/')[1]})</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter price" {...field} className="bg-gray-700 border-gray-600 focus:border-blue-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Amount ({currentPair.split('/')[0]})</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter amount" {...field} className="bg-gray-700 border-gray-600 focus:border-blue-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex space-x-2">
                        <Button type="submit" onClick={() => form.setValue("tradeType", "buy")} className="w-full bg-green-600 hover:bg-green-700">Buy {currentPair.split('/')[0]}</Button>
                        <Button type="submit" onClick={() => form.setValue("tradeType", "sell")} className="w-full bg-red-600 hover:bg-red-700">Sell {currentPair.split('/')[0]}</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="futures" className="mt-3 space-y-3">
                <LeverageSliderWithRisk defaultValue={10} maxLeverage={125} className="bg-gray-700 border-gray-600" />
                <p className="text-xs text-gray-400 text-center">Futures trading form similar to Spot, with added leverage and position management.</p>
                 <Button className="w-full bg-yellow-500 hover:bg-yellow-600">Open Long</Button>
                 <Button className="w-full bg-purple-500 hover:bg-purple-600">Open Short</Button>
              </TabsContent>
            </Tabs>
             <div className="mt-auto pt-3">
                <GestureTradingInterface onBuy={handleGestureBuy} onSell={handleGestureSell} className="bg-gray-700/50 p-2 rounded-md" />
            </div>
          </div>
        </div>
      </ScrollArea>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription className="text-gray-400">{dialogContent.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-600 hover:bg-gray-700">Cancel</Button>
            <Button onClick={dialogContent.onConfirm} className="bg-blue-600 hover:bg-blue-700">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bottom Tab Navigation */}
      <footer className="border-t border-gray-700 bg-gray-800 p-2 mt-auto sticky bottom-0 z-10">
        <Tabs defaultValue="trading" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-14 bg-gray-800">
            <TabsTrigger value="home" onClick={() => navigate('/')} className="flex-col text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full">
              <Home size={20} /> <span className="text-xs mt-1">Home</span>
            </TabsTrigger>
            <TabsTrigger value="markets" onClick={() => navigate('/markets')} className="flex-col text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full">
              <BarChart2 size={20} /> <span className="text-xs mt-1">Markets</span>
            </TabsTrigger>
            <TabsTrigger value="trading" onClick={() => navigate('/trading')} className="flex-col text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full">
              <CandlestickChart size={20} /> <span className="text-xs mt-1">Trade</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" onClick={() => navigate('/wallet')} className="flex-col text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full">
              <Wallet size={20} /> <span className="text-xs mt-1">Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="earn" onClick={() => navigate('/earn')} className="flex-col text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full">
              <PiggyBank size={20} /> <span className="text-xs mt-1">Earn</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </footer>
    </div>
  );
};

export default TradingPage;