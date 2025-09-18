import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { getTransactions } from '../../api/transactions';

export default function TransactionsList() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    getTransactions().then(r=>setItems(r.data||[])).catch(()=>setItems([]));
  }, []);
  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Transactions</h1>
        <Link to="/transactions/new"><Button>Add Transaction</Button></Link>
      </div>
      <Table headers={["ID","Member","Game","Amount","Date"]}>
        {items.map((t)=> (
          <tr key={t.id} className="border-t">
            <td className="px-3 py-2">{t.id}</td>
            <td className="px-3 py-2">{t.memberId}</td>
            <td className="px-3 py-2">{t.gameId}</td>
            <td className="px-3 py-2">₹ {Number(t.amount||0).toFixed(2)}</td>
            <td className="px-3 py-2">{t.dateTime ? new Date(t.dateTime).toLocaleString() : ''}</td>
          </tr>
        ))}
        {items.length===0 && <tr><td className="px-3 py-6 text-center text-gray-500" colSpan={5}>No transactions</td></tr>}
      </Table>
    </div>
  );
}
