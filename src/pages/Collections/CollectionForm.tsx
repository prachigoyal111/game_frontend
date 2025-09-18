import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DateInput from '../../components/DateInput';
import NumberInput from '../../components/NumberInput';
import Button from '../../components/Button';
import { createCollection, getCollection, updateCollection } from '../../api/collections';
import { format } from '../../utils/date';

export default function CollectionForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(format(new Date()));
  const [amount, setAmount] = useState<number | ''>('');

  useEffect(() => {
    if (isEdit && id) {
      getCollection(id).then(r => {
        const c = r.data;
        setDate(c.date ? format(new Date(c.date)) : format(new Date()));
        setAmount(typeof c.amount === 'number' ? c.amount : '');
      }).catch(()=>{});
    }
  }, [id, isEdit]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: any = { date: new Date(date).toISOString(), amount: Number(amount) };
    if (isEdit && id) await updateCollection(id, payload);
    else await createCollection(payload);
    navigate('/collections');
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg grid gap-4">
      <h1 className="text-xl font-semibold">{isEdit ? 'Edit Collection' : 'New Collection'}</h1>
      <DateInput label="Date" value={date} onChange={e=>setDate(e.target.value)} required />
      <NumberInput label="Amount" value={amount} onChange={e=>setAmount(e.target.value === '' ? '' : Number(e.target.value))} min={0.01} step={0.01} required />
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={()=>navigate('/collections')}>Cancel</Button>
      </div>
    </form>
  );
}
