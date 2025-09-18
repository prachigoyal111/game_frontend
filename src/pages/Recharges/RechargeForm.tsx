import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/Select';
import NumberInput from '../../components/NumberInput';
import Button from '../../components/Button';
import { getMembers } from '../../api/members';
import { createRecharge } from '../../api/recharges';

export default function RechargeForm() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<any[]>([]);
  const [memberId, setMemberId] = useState('');
  const [amount, setAmount] = useState<number | ''>('');

  useEffect(() => {
    getMembers().then(r=>setMembers(r.data||[])).catch(()=>setMembers([]));
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createRecharge({ memberId, amount: Number(amount) });
    navigate('/recharges');
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg grid gap-4">
      <h1 className="text-xl font-semibold">New Recharge</h1>
      <Select label="Member" value={memberId} onChange={e=>setMemberId(e.target.value)} required>
        <option value="" disabled>Select a member</option>
        {members.map(m => (
          <option key={m.id} value={m.id}>{m.name} ({m.phone})</option>
        ))}
      </Select>
      <NumberInput label="Amount" value={amount} onChange={e=>setAmount(e.target.value === '' ? '' : Number(e.target.value))} min={0.01} step={0.01} required />
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={()=>navigate('/recharges')}>Cancel</Button>
      </div>
    </form>
  );
}
