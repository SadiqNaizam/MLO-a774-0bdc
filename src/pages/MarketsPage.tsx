import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GlassmorphismTradingCard from '@/components/GlassmorphismTradingCard';
import { Home, BarChart2, CandlestickChart, Wallet, PiggyBank, Search, Star, TrendingUp, TrendingDown, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const initialCoins = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 60500.75, change24h: 2.5, marketCap: '1.19T', volume24h: '30.5B', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', isFavorite: true },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3050.12, change24h: -1.2, marketCap: '366.2B', volume24h: '15.2B', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', isFavorite: false },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 150.45, change24h: 5.8, marketCap: '69.5B', volume24h: '3.1B', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png', isFavorite: true },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB', price: 580.20, change24h: 0.5, marketCap: '85.1B', volume24h: '1.5B', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png', isFavorite: false },
  { id: 'ripple', name: 'XRP', symbol: 'XRP', price: 0.52, change24h: -0.8, marketCap: '28.7B', volume24h: '1.1B', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png', isFavorite: false },
];

const MarketsPage = () => {
  console.log('MarketsPage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, spot, futures, favorites
  const [coins, setCoins] = useState(initialCoins);

  const toggleFavorite = (id: string) => {
    setCoins(coins.map(coin => coin.id === id ? { ...coin, isFavorite: !coin.isFavorite } : coin));
  };

  const filteredCoins = coins.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'favorites') return matchesSearch && coin.isFavorite;
    // Add spot/futures logic if distinct lists are available
    return matchesSearch;
  });

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-semibold text-center">Markets</h1>
      </header>

      <div className="p-4">
        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="Search coins (e.g. Bitcoin, BTC)"
            className="w-full bg-gray-800 border-gray-700 focus:ring-blue-500 focus:border-blue-500 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}/>
        </div>
        <div className="flex space-x-2 mb-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-gray-600 bg-gray-800 hover:bg-gray-700">
                        Filters <SlidersHorizontal size={16} className="ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-white border-gray-700">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700"/>
                    <DropdownMenuItem>Market Cap</DropdownMenuItem>
                    <DropdownMenuItem>Price Change</DropdownMenuItem>
                    <DropdownMenuItem>Volume</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
             <GlassmorphismTradingCard
                pair="Global Market Cap"
                price={2.34} // Trillion
                changePercent={1.8}
                volume="100B 24h Vol"
                className="bg-white/10 backdrop-blur-md border-white/5 text-white flex-grow text-sm p-3"
             />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-4">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="spot" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Spot</TabsTrigger>
            <TabsTrigger value="futures" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Futures</TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center">
              <Star size={14} className="mr-1" /> Favorites
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-grow px-4 pb-4">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-gray-800/50">
              <TableHead className="text-gray-400 w-10"></TableHead>
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400 text-right">Price</TableHead>
              <TableHead className="text-gray-400 text-right">24h Change</TableHead>
              <TableHead className="text-gray-400 text-right hidden md:table-cell">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoins.map((coin) => (
              <TableRow 
                key={coin.id} 
                className="border-gray-700 hover:bg-gray-700/50 cursor-pointer"
                onClick={() => navigate(`/trading?pair=${coin.symbol}_USDT`)}
              >
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); toggleFavorite(coin.id); }} className="hover:bg-gray-600">
                    <Star size={18} className={coin.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'} />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2 md:h-8 md:w-8 md:mr-3">
                       <AvatarImage src={coin.icon} alt={coin.name} />
                       <AvatarFallback>{coin.symbol.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <div>
                        {coin.name}
                        <span className="text-gray-400 text-xs ml-1 hidden md:inline">{coin.symbol}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">${coin.price.toLocaleString()}</TableCell>
                <TableCell className={`text-right font-medium ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">${coin.marketCap}</TableCell>
              </TableRow>
            ))}
             {filteredCoins.length === 0 && (
                <TableRow className="border-gray-700">
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                        No coins match your criteria.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Bottom Tab Navigation */}
      <footer className="border-t border-gray-700 bg-gray-800 p-2 mt-auto">
        <Tabs defaultValue="markets" className="w-full">
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

export default MarketsPage;