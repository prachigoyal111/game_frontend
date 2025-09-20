import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/Select';
import Button from '../../components/Button';
import { getMembers } from '../../api/members';
import { getGames } from '../../api/games';
import { createTransaction } from '../../api/transactions';

export default function TransactionForm() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [memberId, setMemberId] = useState('');
  const [gameId, setGameId] = useState('');

  useEffect(() => {
    getMembers().then(r=>setMembers(r.data||[])).catch(()=>setMembers([]));
    getGames().then(r=>setGames(r.data||[])).catch(()=>setGames([]));
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createTransaction({ memberId, gameId });
    navigate('/');
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl grid gap-4 p-6 bg-white/70 backdrop-blur rounded-xl shadow-sm">
      <h1 className="text-xl font-semibold">New Transaction</h1>
      <Select label="Member" value={memberId} onChange={e=>setMemberId(e.target.value)} required>
        <option value="" disabled>Select a member</option>
        {members.map(m => (
          <option key={m.id} value={m.id}>{m.name} ({m.phone})</option>
        ))}
      </Select>
      <Select label="Game" value={gameId} onChange={e=>setGameId(e.target.value)} required>
        <option value="" disabled>Select a game</option>
        {games.map(g => (
          <option key={g.id} value={g.id}>{g.name} (₹ {Number(g.price||0).toFixed(2)})</option>
        ))}
      </Select>
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={()=>navigate('/')}>Cancel</Button>
      </div>
    </form>
  );
}
