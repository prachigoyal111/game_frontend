import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import NumberInput from '../../components/NumberInput';
import Button from '../../components/Button';
import { createGame, getGame, updateGame } from '../../api/games';

export default function GameForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      getGame(id).then(r => {
        const g = r.data;
        setName(g.name || '');
        setPrice(typeof g.price === 'number' ? g.price : '');
        setDescription(g.description || '');
      }).catch(()=>{});
    }
  }, [id, isEdit]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: any = { name, price: Number(price), description };
    if (isEdit && id) await updateGame(id, payload);
    else await createGame(payload);
    navigate('/games');
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg grid gap-4">
      <h1 className="text-xl font-semibold">{isEdit ? 'Edit Game' : 'New Game'}</h1>
      <TextInput label="Name" value={name} onChange={e=>setName(e.target.value)} required />
      <NumberInput label="Price" value={price} onChange={e=>setPrice(e.target.value === '' ? '' : Number(e.target.value))} required />
      <TextInput label="Description (optional)" value={description} onChange={e=>setDescription(e.target.value)} />
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={()=>navigate('/games')}>Cancel</Button>
      </div>
    </form>
  );
}
