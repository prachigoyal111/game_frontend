import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { getRecharges } from '../../api/recharges';

export default function RechargesList() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    getRecharges().then(r=>setItems(r.data||[])).catch(()=>setItems([]));
  }, []);
  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Recharges</h1>
        <Link to="/recharges/new"><Button>Add Recharge</Button></Link>
      </div>
      <Table headers={["ID","Member","Amount","Date"]}>
        {items.map((r)=> (
          <tr key={r.id} className="border-t">
            <td className="px-3 py-2">{r.id}</td>
            <td className="px-3 py-2">{r.memberId}</td>
            <td className="px-3 py-2">₹ {Number(r.amount||0).toFixed(2)}</td>
            <td className="px-3 py-2">{r.dateTime ? new Date(r.dateTime).toLocaleString() : ''}</td>
          </tr>
        ))}
        {items.length===0 && <tr><td className="px-3 py-6 text-center text-gray-500" colSpan={4}>No recharges</td></tr>}
      </Table>
    </div>
  );
}
