import { useEffect, useState } from 'react';
import DateInput from '../../components/DateInput';
import { format } from '../../utils/date';
import { getDailyTotal } from '../../api/collections';

export default function CollectionsDaily() {
  const [date, setDate] = useState<string>(format(new Date()));
  const [total, setTotal] = useState<number>(0);

  const load = (d: string) => getDailyTotal(d).then(r=>setTotal(typeof r.data==='number'? r.data : 0)).catch(()=>setTotal(0));

  useEffect(() => { load(date); }, []);

  return (
    <div className="max-w-lg grid gap-4">
      <h1 className="text-xl font-semibold">Daily Collections</h1>
      <DateInput label="Date" value={date} onChange={(e)=>{ const d=e.target.value; setDate(d); load(d); }} />
      <div className="p-4 border rounded bg-white">
        <div className="text-gray-500 text-sm">Total for {date}</div>
        <div className="text-2xl font-semibold">₹ {total.toFixed(2)}</div>
      </div>
    </div>
  );
}
