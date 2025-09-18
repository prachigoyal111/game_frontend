import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { getAdminUsers, deleteAdminUser } from '../../api/adminUsers';

export default function AdminUsersList() {
  const [items, setItems] = useState<any[]>([]);
  const load = () => getAdminUsers().then(r => setItems(r.data || [])).catch(() => setItems([]));
  useEffect(() => { load(); }, []);
  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Users</h1>
        <Link to="/admin-users/new"><Button>Add Admin</Button></Link>
      </div>
      <Table headers={["Username","Actions"]}>
        {items.map((u) => (
          <tr key={u.id} className="border-t">
            <td className="px-3 py-2">{u.username}</td>
            <td className="px-3 py-2 flex gap-2">
              <Link to={`/admin-users/${u.id}/edit`} className="text-blue-600">Edit</Link>
              <button className="text-red-600" onClick={async ()=>{ await deleteAdminUser(u.id); load(); }}>Delete</button>
            </td>
          </tr>
        ))}
        {items.length === 0 && (
          <tr><td className="px-3 py-6 text-center text-gray-500" colSpan={2}>No admins</td></tr>
        )}
      </Table>
    </div>
  );
}
