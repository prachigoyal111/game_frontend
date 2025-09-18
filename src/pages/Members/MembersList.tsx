import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { getMembers, deleteMember } from '../../api/members';
import { useToast } from '../../shared/toast/ToastContext';
import { getErrorMessage } from '../../utils/http';

export default function MembersList() {
  const { show } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const load = () => getMembers()
    .then(r => setItems(r.data || []))
    .catch((e) => { setItems([]); show({ type:'error', message: getErrorMessage(e) }); });
  useEffect(() => { load(); }, []);
  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Members</h1>
        <Link to="/members/new"><Button>Add Member</Button></Link>
      </div>
      <Table headers={["Name","Phone","Balance","Actions"]}>
        {items.map((m) => (
          <tr key={m.id} className="border-t">
            <td className="px-3 py-2">{m.name}</td>
            <td className="px-3 py-2">{m.phone}</td>
            <td className="px-3 py-2">₹ {Number(m.balance || 0).toFixed(2)}</td>
            <td className="px-3 py-2 flex gap-2">
              <Link to={`/members/${m.id}`} className="text-blue-600">View</Link>
              <Link to={`/members/${m.id}/edit`} className="text-blue-600">Edit</Link>
              <button className="text-red-600" onClick={async () => {
                try { await deleteMember(m.id); show({ type:'success', message:'Member deleted' }); load(); }
                catch(e) { show({ type:'error', message: getErrorMessage(e) }); }
              }}>Delete</button>
            </td>
          </tr>
        ))}
        {items.length === 0 && (
          <tr><td className="px-3 py-6 text-center text-gray-500" colSpan={4}>No members</td></tr>
        )}
      </Table>
    </div>
  );
}
