'use client'

import { useRouter } from 'next/navigation';

interface IData {
	id: number
	current: number
	freq: number
	speed: number
	resource: number
}

const page = () => {
	const data: IData[] = [
		{ id: 1245, current: 45, freq: 50, speed: 2800, resource: 12 },
		{ id: 2176, current: 48, freq: 48, speed: 2750, resource: 17 },
	]

	const router = useRouter()

  const handleSubmit = (id: number) => {
    router.push(`/pump/${id}`)
  }

	return (
		<div className="ml-74 w-full p-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-400 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white uppercase text-xs tracking-wider">
                <th className="px-6 py-4">№ Скважины</th>
                <th className="px-6 py-4">Выходной ток, А</th>
                <th className="px-6 py-4">Выходная частота, Гц</th>
                <th className="px-6 py-4">Скорость двигателя, Об/мин</th>
                <th className="px-6 py-4 text-right">Ост. Ресурс (мес)</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors text-gray-800 cursor-pointer" onClick={() => handleSubmit(row.id)}>
                  <td className="px-6 py-4 font-bold text-slate-900">{row.id}</td>
                  <td className="px-6 py-4">{row.current}</td>
                  <td className="px-6 py-4">{row.freq}</td>
                  <td className="px-6 py-4 text-gray-600 italic">{row.speed}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-2.5 ${row.resource > 10 ? 'bg-green-600' : 'bg-red-500'}`} 
                          style={{ width: `${(row.resource / 24) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-bold w-6">{row.resource}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
	)
}

export default page
