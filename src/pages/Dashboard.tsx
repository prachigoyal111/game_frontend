import { useEffect, useState } from 'react';
import client from '../api/client';
import { format } from '../utils/date';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Dashboard() {
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [todayTotal, setTodayTotal] = useState<number>(0);
  const [recentTx, setRecentTx] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [membersRes, dailyRes, txRes] = await Promise.all([
        client.get('/members'),
        client.get(`/collections/day/${format(new Date())}`),
        client.get('/transactions'),
      ]);
      setTotalMembers(Array.isArray(membersRes.data) ? membersRes.data.length : 0);
      setTodayTotal(typeof dailyRes.data === 'number' ? dailyRes.data : 0);
      const list = Array.isArray(txRes.data) ? txRes.data : [];
      setRecentTx(list.slice(-5).reverse());
    };
    fetchData().catch(() => {});
  }, []);

  return (
    <div className="grid gap-8">
      <section className="relative overflow-hidden rounded-2xl text-white bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-500 p-8">
        <div className="relative z-10 grid gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Welcome to the Gaming Club</h1>
          <p className="text-white/90 max-w-2xl">Manage members, recharges, games, and track daily collections — all in one colorful, fast interface.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/members/new"><Button className="bg-white text-indigo-700 hover:bg-white/90">Register Member</Button></Link>
            <Link to="/recharges/new"><Button className="bg-black/20 border border-white/30 hover:bg-black/30">Add Recharge</Button></Link>
            <Link to="/transactions/new"><Button className="bg-black/20 border border-white/30 hover:bg-black/30">New Transaction</Button></Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white shadow-sm">
          <div className="text-gray-500 text-sm">Total Members</div>
          <div className="text-3xl font-bold">{totalMembers}</div>
        </div>
        <div className="p-5 rounded-xl bg-white shadow-sm">
          <div className="text-gray-500 text-sm">Today's Recharges</div>
          <div className="text-3xl font-bold text-emerald-600">₹ {todayTotal.toFixed(2)}</div>
        </div>
        <div className="p-5 rounded-xl bg-white shadow-sm">
          <div className="text-gray-500 text-sm">Recent Transactions</div>
          <div className="text-3xl font-bold">{recentTx.length}</div>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <div className="px-5 py-4 border-b font-semibold">Last 5 Transactions</div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2">ID</th>
                <th className="py-2">Member</th>
                <th className="py-2">Game</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTx.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="py-2">{t.id}</td>
                  <td className="py-2">{t.memberId}</td>
                  <td className="py-2">{t.gameId}</td>
                  <td className="py-2">₹ {Number(t.amount || 0).toFixed(2)}</td>
                  <td className="py-2">{t.dateTime ? new Date(t.dateTime).toLocaleString() : ''}</td>
                </tr>
              ))}
              {recentTx.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">No transactions yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
