import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { createAdminUser, getAdminUser, updateAdminUser } from '../../api/adminUsers';

export default function AdminUserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      getAdminUser(id).then(r => {
        const u = r.data;
        setUsername(u.username || '');
        setPassword('');
      }).catch(()=>{});
    }
  }, [id, isEdit]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: any = { username, password };
    if (isEdit && id) await updateAdminUser(id, payload);
    else await createAdminUser(payload);
    navigate('/admin-users');
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg grid gap-4">
      <h1 className="text-xl font-semibold">{isEdit ? 'Edit Admin' : 'New Admin'}</h1>
      <TextInput label="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
      <TextInput label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={()=>navigate('/admin-users')}>Cancel</Button>
      </div>
    </form>
  );
}
