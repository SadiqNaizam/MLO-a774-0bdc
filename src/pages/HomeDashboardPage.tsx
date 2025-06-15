import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModularDashboardWidget from '@/components/ModularDashboardWidget';
import AnimatedBalanceCard from '@/components/AnimatedBalanceCard';
import GlassmorphismTradingCard from '@/components/GlassmorphismTradingCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, BarChart2, CandlestickChart, Wallet, PiggyBank, Settings, Bell, UserCircle, Search, TrendingUp, Newspaper, Zap } from 'lucide-react';

const HomeDashboardPage = () => {
  console.log('HomeDashboardPage loaded');
  const navigate = useNavigate();

  const marketMovers = [
    { pair: 'BTC/USDT', price: 60500.75, changePercent: 2.5, volume: '1.2B USDT' },
    { pair: 'ETH/USDT', price: 3050.12, changePercent: -1.2, volume: '800M USDT' },
    { pair: 'SOL/USDT', price: 150.45, changePercent: 5.8, volume: '500M USDT' },
  ];

  const trendingCryptos = [
    { name: 'Notcoin', symbol: 'NOT', price: 0.015, change: 15.2, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/29900.png' },
    { name: 'Pepe', symbol: 'PEPE', price: 0.000012, change: 8.1, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/24478.png' },
    { name: 'DogWifHat', symbol: 'WIF', price: 2.55, change: -3.5, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28785.png' },
  ];
  
  const newsItems = [
    { id: 1, title: "Bitcoin Halving Impact Analysis", source: "CryptoNews Daily", time: "2h ago", sentiment: "Positive" },
    { id: 2, title: "Ethereum ETF Approval Odds Increase", source: "BlockTimes", time: "5h ago", sentiment: "Speculative" },
    { id: 3, title: "New DeFi Protocol Launch Raises Concerns", source: "Decrypt", time: "1d ago", sentiment: "Negative" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center">
          <UserCircle size={28} className="text-blue-500 mr-2" />
          <span className="font-semibold text-lg">Hello, User!</span>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/settings">
                <NavigationMenuLink className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-gray-700"}>
                  <Settings size={20} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/notifications">
                <NavigationMenuLink className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-gray-700"}>
                  <Bell size={20} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <ScrollArea className="flex-grow p-4 md:p-6 space-y-6">
        <AnimatedBalanceCard
          title="Total Portfolio Value"
          balance={78540.50}
          previousBalance={75000}
          currencySymbol="$"
          className="bg-gray-800 border-gray-700 shadow-xl"
          icon={Wallet}
        />

        <div className="relative mb-6">
          <Input 
            type="search" 
            placeholder="Search assets, news, or features..." 
            className="w-full bg-gray-800 border-gray-700 focus:ring-blue-500 focus:border-blue-500 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}/>
        </div>

        <ModularDashboardWidget title="Market Movers" icon={TrendingUp} className="bg-gray-800 border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketMovers.map(mover => (
              <GlassmorphismTradingCard
                key={mover.pair}
                pair={mover.pair}
                price={mover.price}
                changePercent={mover.changePercent}
                volume={mover.volume}
                onClick={() => navigate(`/trading?pair=${mover.pair.replace('/', '_')}`)}
                className="bg-white/10 backdrop-blur-md border-white/5 text-white"
              />
            ))}
          </div>
        </ModularDashboardWidget>

        <ModularDashboardWidget title="Quick Actions" icon={Zap} className="bg-gray-800 border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button onClick={() => navigate('/trading')} className="bg-blue-600 hover:bg-blue-700 w-full">Trade Now</Button>
            <Button onClick={() => navigate('/wallet/deposit')} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10 w-full">Deposit</Button>
            <Button onClick={() => navigate('/earn')} className="bg-green-600 hover:bg-green-700 w-full">Earn Crypto</Button>
            <Button onClick={() => navigate('/markets')} variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/10 w-full">View Markets</Button>
          </div>
        </ModularDashboardWidget>

        <ModularDashboardWidget title="Trending Cryptocurrencies" icon={TrendingUp} className="bg-gray-800 border-gray-700">
          <div className="space-y-3">
            {trendingCryptos.map(crypto => (
              <Card key={crypto.symbol} className="bg-gray-700/50 border-gray-600 flex items-center p-3 hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => navigate(`/trading?pair=${crypto.symbol}_USDT`)}>
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={crypto.icon || `https://via.placeholder.com/32?text=${crypto.symbol}`} alt={crypto.name} />
                  <AvatarFallback>{crypto.symbol.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold">{crypto.name} ({crypto.symbol})</p>
                  <p className="text-xs text-gray-400">${crypto.price.toFixed(5)}</p>
                </div>
                <p className={`text-sm font-medium ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(1)}%
                </p>
              </Card>
            ))}
          </div>
        </ModularDashboardWidget>
        
        <ModularDashboardWidget title="Curated News & Insights" icon={Newspaper} className="bg-gray-800 border-gray-700">
          <div className="space-y-3">
            {newsItems.map(item => (
              <div key={item.id} className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 cursor-pointer">
                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{item.source} - {item.time}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    item.sentiment === "Positive" ? "bg-green-500/20 text-green-400" : 
                    item.sentiment === "Negative" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>{item.sentiment}</span>
                </div>
              </div>
            ))}
          </div>
        </ModularDashboardWidget>

        <ModularDashboardWidget title="AI-Powered Recommendations" icon={Zap} className="bg-gray-800 border-gray-700">
          <p className="text-gray-400 text-sm">Based on your activity, consider exploring these options:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">Stake ETH for up to 5% APY.</li>
            <li className="hover:text-blue-400 cursor-pointer">Diversify with emerging AI tokens.</li>
            <li className="hover:text-blue-400 cursor-pointer">Set price alerts for BTC.</li>
          </ul>
        </ModularDashboardWidget>

      </ScrollArea>

      {/* Bottom Tab Navigation */}
      <footer className="border-t border-gray-700 bg-gray-800 p-2">
        <Tabs defaultValue="home" className="w-full">
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

export default HomeDashboardPage;