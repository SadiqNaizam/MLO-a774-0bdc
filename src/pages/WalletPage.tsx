import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssetAllocationPieChart, { AssetAllocationDataPoint } from '@/components/AssetAllocationPieChart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, BarChart2, CandlestickChart, Wallet, PiggyBank, ArrowDownToLine, ArrowUpFromLine, Copy, History, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const assetData: AssetAllocationDataPoint[] = [
  { name: 'Bitcoin (BTC)', value: 45, color: '#f7931a' },
  { name: 'Ethereum (ETH)', value: 30, color: '#627eea' },
  { name: 'Solana (SOL)', value: 15, color: '#9945ff' },
  { name: 'USDT', value: 10, color: '#26a17b' },
];

const assets = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.75, fiatValue: 45375.56, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 10.2, fiatValue: 31110.24, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', balance: 50.5, fiatValue: 7590.23, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png' },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', balance: 2500, fiatValue: 2500.00, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png' },
];

const transactions = [
  { id: 't1', type: 'Deposit', asset: 'BTC', amount: '+0.1', date: '2024-07-20', status: 'Completed' },
  { id: 't2', type: 'Withdrawal', asset: 'ETH', amount: '-2.0', date: '2024-07-18', status: 'Pending' },
  { id: 't3', type: 'Trade', asset: 'SOL/USDT', amount: '+10 SOL', date: '2024-07-15', status: 'Completed' },
  { id: 't4', type: 'Earn Reward', asset: 'USDT', amount: '+5.25 USDT', date: '2024-07-12', status: 'Completed' },
];


const WalletPage = () => {
  console.log('WalletPage loaded');
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [selectedAssetForTx, setSelectedAssetForTx] = useState<{name: string, symbol: string} | null>(null);

  const totalFiatValue = assets.reduce((sum, asset) => sum + asset.fiatValue, 0);

  const handleDeposit = (asset: {name: string, symbol: string}) => {
    setSelectedAssetForTx(asset);
    setDepositDialogOpen(true);
  };

  const handleWithdraw = (asset: {name: string, symbol: string}) => {
    setSelectedAssetForTx(asset);
    setWithdrawDialogOpen(true);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard!");
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
       <header className="p-4 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
        <h1 className="text-xl font-semibold">My Wallet</h1>
        <Button variant="ghost" size="icon" onClick={() => navigate('/wallet/add-address')}>
            <PlusCircle size={22} />
        </Button>
      </header>

      <ScrollArea className="flex-grow p-4 space-y-6">
        <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardHeader>
                <CardTitle className="text-lg">Total Portfolio Value</CardTitle>
                <CardDescription className="text-gray-400">Estimated value of all your assets.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-blue-400">${totalFiatValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </CardContent>
        </Card>
        
        <AssetAllocationPieChart data={assetData} title="Asset Allocation" className="bg-gray-800 border-gray-700 p-4 rounded-lg shadow-lg" height={280}/>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>My Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assets.map(asset => (
              <Card key={asset.id} className="bg-gray-700/50 border-gray-600 p-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                           <AvatarImage src={asset.icon} alt={asset.name} />
                           <AvatarFallback>{asset.symbol.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{asset.name} ({asset.symbol})</p>
                            <p className="text-xs text-gray-400">{asset.balance} {asset.symbol}</p>
                        </div>
                    </div>
                    <p className="font-medium text-right">${asset.fiatValue.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2 mt-1">
                    <Button size="sm" variant="outline" className="flex-1 border-green-500 text-green-500 hover:bg-green-500/10" onClick={() => handleDeposit(asset)}>
                        <ArrowDownToLine size={14} className="mr-1"/> Deposit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10" onClick={() => handleWithdraw(asset)}>
                        <ArrowUpFromLine size={14} className="mr-1"/> Withdraw
                    </Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center"><History size={20} className="mr-2" /> Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Asset</TableHead>
                  <TableHead className="text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-400 hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-gray-400 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map(tx => (
                  <TableRow key={tx.id} className="border-gray-700 hover:bg-gray-700/50">
                    <TableCell className={tx.type === 'Deposit' || tx.type === 'Earn Reward' ? 'text-green-400' : 'text-red-400'}>{tx.type}</TableCell>
                    <TableCell>{tx.asset}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell className="hidden md:table-cell">{tx.date}</TableCell>
                    <TableCell className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                            tx.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                            tx.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                            {tx.status}
                        </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </ScrollArea>

      {/* Deposit Dialog */}
      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Deposit {selectedAssetForTx?.symbol}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Scan the QR code or copy the address below to deposit {selectedAssetForTx?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=YOUR_${selectedAssetForTx?.symbol}_DEPOSIT_ADDRESS`} alt={`${selectedAssetForTx?.symbol} Deposit QR Code`} className="mx-auto mb-4 p-2 bg-white rounded-md"/>
            <p className="text-sm text-gray-300 mb-1">Your {selectedAssetForTx?.symbol} Deposit Address:</p>
            <div className="flex items-center justify-center bg-gray-700 p-2 rounded-md">
                <p className="text-xs md:text-sm break-all mr-2">YOUR_{selectedAssetForTx?.symbol}_DEPOSIT_ADDRESS</p>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(`YOUR_${selectedAssetForTx?.symbol}_DEPOSIT_ADDRESS`)}>
                    <Copy size={16}/>
                </Button>
            </div>
            <p className="text-xs text-yellow-400 mt-3">Ensure you only send {selectedAssetForTx?.symbol} to this address. Sending other assets may result in permanent loss.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setDepositDialogOpen(false)} className="bg-blue-600 hover:bg-blue-700">Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Withdraw {selectedAssetForTx?.symbol}</DialogTitle>
            <DialogDescription className="text-gray-400">Enter withdrawal details for {selectedAssetForTx?.name}.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
                <Label htmlFor="withdraw-address" className="text-sm">Withdrawal Address</Label>
                <Input id="withdraw-address" placeholder={`Enter ${selectedAssetForTx?.symbol} address`} className="bg-gray-700 border-gray-600 mt-1" />
            </div>
            <div>
                <Label htmlFor="withdraw-amount" className="text-sm">Amount</Label>
                <Input id="withdraw-amount" type="number" placeholder="0.00" className="bg-gray-700 border-gray-600 mt-1" />
            </div>
            <div>
              <Label className="text-sm mb-2 block text-center">2FA Code</Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="bg-gray-700 border-gray-600 text-white" />
                    <InputOTPSlot index={1} className="bg-gray-700 border-gray-600 text-white" />
                    <InputOTPSlot index={2} className="bg-gray-700 border-gray-600 text-white" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="bg-gray-700 border-gray-600 text-white" />
                    <InputOTPSlot index={4} className="bg-gray-700 border-gray-600 text-white" />
                    <InputOTPSlot index={5} className="bg-gray-700 border-gray-600 text-white" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)} className="border-gray-600 hover:bg-gray-700">Cancel</Button>
            <Button onClick={() => { toast.success(`Withdrawal for ${selectedAssetForTx?.symbol} initiated.`); setWithdrawDialogOpen(false); setOtp(''); }} className="bg-red-600 hover:bg-red-700">Confirm Withdrawal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bottom Tab Navigation */}
      <footer className="border-t border-gray-700 bg-gray-800 p-2 mt-auto sticky bottom-0 z-10">
        <Tabs defaultValue="wallet" className="w-full">
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

export default WalletPage;