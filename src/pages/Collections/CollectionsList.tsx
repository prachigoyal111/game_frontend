import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { getCollections } from '../../api/collections';

export default function CollectionsList() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    getCollections().then(r=>setItems(r.data||[])).catch(()=>setItems([]));
  }, []);
  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Collections</h1>
        <Link to="/collections/new"><Button>Add Collection</Button></Link>
      </div>
      <Table headers={["ID","Date","Amount","Actions"]}>
        {items.map((c)=> (
          <tr key={c.id} className="border-t">
            <td className="px-3 py-2">{c.id}</td>
            <td className="px-3 py-2">{c.date ? new Date(c.date).toLocaleDateString() : ''}</td>
            <td className="px-3 py-2">₹ {Number(c.amount||0).toFixed(2)}</td>
            <td className="px-3 py-2">
              <Link to={`/collections/${c.id}/edit`} className="text-blue-600">Edit</Link>
            </td>
          </tr>
        ))}
        {items.length===0 && <tr><td className="px-3 py-6 text-center text-gray-500" colSpan={4}>No collections</td></tr>}
      </Table>
    </div>
  );
}
