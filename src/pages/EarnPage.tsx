import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import GlassmorphismTradingCard from '@/components/GlassmorphismTradingCard'; // Re-purposed for APY display
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, BarChart2, CandlestickChart, Wallet, PiggyBank, Percent, Zap, Lock, TrendingUp, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

interface EarnProduct {
  id: string;
  name: string;
  asset: string;
  apy: number;
  term?: string; // e.g., "30 Days", "Flexible"
  type: 'Staking' | 'Savings' | 'Launchpad' | 'Yield Farming';
  minInvestment?: number;
  iconUrl?: string;
  details: string;
  currentProgress?: number; // For staked products
}

const earnProducts: EarnProduct[] = [
  { id: 'eth-stake', name: 'Ethereum Staking', asset: 'ETH', apy: 5.2, term: 'Flexible', type: 'Staking', minInvestment: 0.01, iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', details: 'Stake your ETH and earn rewards. Compounded daily. Unstake anytime with a short processing period.' },
  { id: 'usdt-savings', name: 'USDT Savings', asset: 'USDT', apy: 8.0, term: '30 Days Locked', type: 'Savings', minInvestment: 100, iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png', details: 'Lock your USDT for 30 days to earn a high fixed APY. Principal and interest paid at term end.', currentProgress: 66 },
  { id: 'newcoin-launch', name: 'Project Nova Launchpad', asset: 'NOVA', apy: 0, term: 'Subscription', type: 'Launchpad', minInvestment: 10, iconUrl: 'https://via.placeholder.com/64/FFA500/000000?Text=NVA', details: 'Subscribe with stablecoins to get an allocation of new NOVA tokens before public listing.' },
  { id: 'btc-yield', name: 'BTC Yield Farm', asset: 'BTC', apy: 3.5, term: 'Flexible', type: 'Yield Farming', minInvestment: 0.001, iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', details: 'Provide liquidity to BTC pairs on integrated DeFi protocols and earn farming rewards.' },
];


const EarnPage = () => {
  console.log('EarnPage loaded');
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<EarnProduct | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleProductSelect = (product: EarnProduct) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    setInvestmentAmount('');
  };

  const handleInvest = () => {
    if (!selectedProduct || !investmentAmount) {
        toast.error("Please enter an amount.");
        return;
    }
    const amount = parseFloat(investmentAmount);
    if (amount <= 0) {
        toast.error("Amount must be positive.");
        return;
    }
    if (selectedProduct.minInvestment && amount < selectedProduct.minInvestment) {
        toast.error(`Minimum investment is ${selectedProduct.minInvestment} ${selectedProduct.asset}.`);
        return;
    }
    // Simulate investment
    toast.success(`Successfully invested ${amount} ${selectedProduct.asset} in ${selectedProduct.name}!`);
    setIsDialogOpen(false);
  };

  const filteredProducts = earnProducts.filter(p => {
    if (activeTab === 'all') return true;
    return p.type.toLowerCase().replace(' ', '') === activeTab;
  });

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
        <h1 className="text-xl font-semibold">Earn Center</h1>
        <Button variant="ghost" size="icon" onClick={() => toast.info("View your active Earn subscriptions here.")}>
            <TrendingUp size={22} />
        </Button>
      </header>
      
      <div className="p-4">
        <GlassmorphismTradingCard
            pair="Featured: ETH Staking"
            price={selectedProduct?.apy || 5.2} // Show APY as 'price'
            changePercent={selectedProduct?.apy || 5.2} // Show APY
            volume={selectedProduct?.term || "Flexible Term"}
            onClick={() => handleProductSelect(earnProducts.find(p => p.id === 'eth-stake')!)}
            className="bg-white/10 backdrop-blur-md border-white/5 text-white mb-4"
        />
         <Input 
            type="search" 
            placeholder="Search earn products (e.g. Staking, ETH)..." 
            className="w-full bg-gray-800 border-gray-700 focus:ring-blue-500 focus:border-blue-500 mb-4"
        />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 bg-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="staking" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Staking</TabsTrigger>
            <TabsTrigger value="savings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Savings</TabsTrigger>
            <TabsTrigger value="launchpad" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white hidden md:flex">Launchpad</TabsTrigger>
            <TabsTrigger value="yieldfarming" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white hidden md:flex">Yield</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>


      <ScrollArea className="flex-grow px-4 pb-4 space-y-4">
        {filteredProducts.map(product => (
          <Card key={product.id} className="bg-gray-800 border-gray-700 overflow-hidden shadow-lg hover:shadow-blue-500/30 transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between p-4">
              <div>
                <CardTitle className="text-md flex items-center">
                    {product.type === 'Staking' && <Lock size={16} className="mr-2 text-blue-400"/>}
                    {product.type === 'Savings' && <Percent size={16} className="mr-2 text-green-400"/>}
                    {product.type === 'Launchpad' && <Zap size={16} className="mr-2 text-yellow-400"/>}
                    {product.type === 'Yield Farming' && <TrendingUp size={16} className="mr-2 text-purple-400"/>}
                    {product.name}
                </CardTitle>
                <CardDescription className="text-xs text-gray-400">{product.asset} - {product.term}</CardDescription>
              </div>
              <div className="text-right">
                 <p className="text-lg font-bold text-green-400">{product.apy > 0 ? `${product.apy.toFixed(1)}% APY` : "Variable"}</p>
                 {product.iconUrl && <img src={product.iconUrl} alt={product.asset} className="w-8 h-8 rounded-full inline-block ml-2 border border-gray-600"/>}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-300 mb-3 leading-relaxed h-10 overflow-hidden text-ellipsis">{product.details.substring(0,100)}...</p>
              {product.currentProgress !== undefined && (
                <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Term Progress</span>
                        <span>{product.currentProgress}%</span>
                    </div>
                    <Progress value={product.currentProgress} className="h-2 [&>*]:bg-blue-500 bg-gray-700" />
                </div>
              )}
              <Button onClick={() => handleProductSelect(product)} className="w-full bg-blue-600 hover:bg-blue-700">
                {product.type === 'Launchpad' ? 'Subscribe' : 'Invest Now'}
              </Button>
            </CardContent>
          </Card>
        ))}
        {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 py-8">No products match your current filter.</p>
        )}
      </ScrollArea>

      {selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {selectedProduct.iconUrl && <img src={selectedProduct.iconUrl} alt={selectedProduct.asset} className="w-6 h-6 rounded-full mr-2"/>}
                Invest in {selectedProduct.name}
              </DialogTitle>
              <DialogDescription className="text-gray-400">{selectedProduct.details}</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <div className="flex justify-between items-baseline">
                <p className="text-sm text-gray-300">Asset:</p>
                <p className="font-semibold">{selectedProduct.asset}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-sm text-gray-300">APY:</p>
                <p className="font-semibold text-green-400">{selectedProduct.apy > 0 ? `${selectedProduct.apy.toFixed(1)}%` : "Variable Yield"}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-sm text-gray-300">Term:</p>
                <p className="font-semibold">{selectedProduct.term}</p>
              </div>
               {selectedProduct.minInvestment && (
                <div className="flex justify-between items-baseline">
                    <p className="text-sm text-gray-300">Min. Investment:</p>
                    <p className="font-semibold">{selectedProduct.minInvestment} {selectedProduct.asset}</p>
                </div>
               )}
              <div>
                <Label htmlFor="investment-amount" className="text-sm text-gray-300">Amount to Invest ({selectedProduct.asset})</Label>
                <Input
                  id="investment-amount"
                  type="number"
                  placeholder="0.00"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="bg-gray-700 border-gray-600 mt-1 focus:border-blue-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-600 hover:bg-gray-700">Cancel</Button>
              <Button onClick={handleInvest} className="bg-green-600 hover:bg-green-700">Confirm Investment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Bottom Tab Navigation */}
      <footer className="border-t border-gray-700 bg-gray-800 p-2 mt-auto sticky bottom-0 z-10">
        <Tabs defaultValue="earn" className="w-full">
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

export default EarnPage;