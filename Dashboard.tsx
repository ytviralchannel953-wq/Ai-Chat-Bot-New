import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Wallet, Target, Clock, AlertTriangle } from 'lucide-react';

const data = [
  { name: 'Mon', profit: 120 },
  { name: 'Tue', profit: 80 },
  { name: 'Wed', profit: 240 },
  { name: 'Thu', profit: 190 },
  { name: 'Fri', profit: 390 },
  { name: 'Sat', profit: 580 },
  { name: 'Sun', profit: 450 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet className="w-16 h-16 text-emerald-400" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Bankroll</h3>
          <p className="text-2xl font-bold text-white mt-1">$2,450.00</p>
          <span className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3" /> +12.5% this week
          </span>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target className="w-16 h-16 text-blue-400" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Win Rate</h3>
          <p className="text-2xl font-bold text-white mt-1">64.2%</p>
          <span className="text-xs text-slate-500 mt-2">Based on last 50 picks</span>
        </div>

         <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="w-16 h-16 text-orange-400" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Active Bets</h3>
          <p className="text-2xl font-bold text-white mt-1">3</p>
          <span className="text-xs text-orange-400 mt-2">Pending outcomes</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" /> 
          Performance History
        </h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Bets List (Mock) */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h3 className="text-slate-200 font-semibold mb-4">Live Tickets</h3>
        <div className="space-y-3">
          {[
            { match: "Lakers vs Warriors", pick: "Lakers -3.5", odds: -110, status: "Winning" },
            { match: "Chiefs vs Bills", pick: "Over 48.5", odds: -105, status: "Pending" },
            { match: "Arsenal vs Liverpool", pick: "Draw", odds: +240, status: "Losing" },
          ].map((bet, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
              <div>
                <p className="text-sm font-medium text-slate-200">{bet.match}</p>
                <p className="text-xs text-slate-500">{bet.pick} @ {bet.odds > 0 ? `+${bet.odds}` : bet.odds}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-medium border ${
                bet.status === 'Winning' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                bet.status === 'Losing' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                'bg-slate-700/20 text-slate-400 border-slate-700'
              }`}>
                {bet.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
