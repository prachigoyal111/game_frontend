import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import NumberInput from '../../components/NumberInput';
import Button from '../../components/Button';
import { createMember, getMember, updateMember } from '../../api/members';

export default function MemberForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [balance, setBalance] = useState<number | ''>('');

  useEffect(() => {
    if (isEdit && id) {
      getMember(id).then(r => {
        const m = r.data;
        setName(m.name || '');
        setPhone(m.phone || '');
        setBalance(typeof m.balance === 'number' ? m.balance : '');
      }).catch(() => {});
    }
  }, [id, isEdit]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: any = { name, phone };
    if (balance !== '') payload.balance = Number(balance);
    if (isEdit && id) await updateMember(id, payload);
    else await createMember(payload);
    navigate('/members');
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg grid gap-4">
      <h1 className="text-xl font-semibold">{isEdit ? 'Edit Member' : 'New Member'}</h1>
      <TextInput label="Name" value={name} onChange={e=>setName(e.target.value)} required />
      <TextInput label="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required />
      <NumberInput label="Balance (optional)" value={balance} onChange={e=>setBalance(e.target.value === '' ? '' : Number(e.target.value))} />
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={()=>navigate('/members')}>Cancel</Button>
      </div>
    </form>
  );
}
