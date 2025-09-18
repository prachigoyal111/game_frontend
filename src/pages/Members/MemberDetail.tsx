import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Tabs from '../../components/Tabs';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { getMember, getMemberRecharges, getMemberTransactions } from '../../api/members';

export default function MemberDetail() {
  const { id } = useParams();
  const [member, setMember] = useState<any>(null);
  const [recharges, setRecharges] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    getMember(id).then(r=>setMember(r.data)).catch(()=>{});
    getMemberRecharges(id).then(r=>setRecharges(r.data||[])).catch(()=>setRecharges([]));
    getMemberTransactions(id).then(r=>setTransactions(r.data||[])).catch(()=>setTransactions([]));
  }, [id]);

  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{member?.name || 'Member'}</h1>
          <div className="text-sm text-gray-600">Phone: {member?.phone} • Balance: ₹ {Number(member?.balance||0).toFixed(2)}</div>
        </div>
        <div className="flex gap-2">
          <Link to="/recharges/new"><Button>Add Recharge</Button></Link>
          <Link to="/transactions/new"><Button>Create Transaction</Button></Link>
        </div>
      </div>
      <Tabs
        tabs={[
          {
            key: 'recharges',
            label: 'Recharges',
            content: (
              <Table headers={["ID","Amount","Date"]}>
                {recharges.map(r=> (
                  <tr key={r.id} className="border-t">
                    <td className="px-3 py-2">{r.id}</td>
                    <td className="px-3 py-2">₹ {Number(r.amount||0).toFixed(2)}</td>
                    <td className="px-3 py-2">{r.dateTime ? new Date(r.dateTime).toLocaleString() : ''}</td>
                  </tr>
                ))}
                {recharges.length===0 && <tr><td className="px-3 py-6 text-center text-gray-500" colSpan={3}>No recharges</td></tr>}
              </Table>
            )
          },
          {
            key: 'transactions',
            label: 'Transactions',
            content: (
              <Table headers={["ID","Game","Amount","Date"]}>
                {transactions.map(t=> (
                  <tr key={t.id} className="border-t">
                    <td className="px-3 py-2">{t.id}</td>
                    <td className="px-3 py-2">{t.gameId}</td>
                    <td className="px-3 py-2">₹ {Number(t.amount||0).toFixed(2)}</td>
                    <td className="px-3 py-2">{t.dateTime ? new Date(t.dateTime).toLocaleString() : ''}</td>
                  </tr>
                ))}
                {transactions.length===0 && <tr><td className="px-3 py-6 text-center text-gray-500" colSpan={4}>No transactions</td></tr>}
              </Table>
            )
          }
        ]}
      />
    </div>
  );
}
