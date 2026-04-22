'use client'

import { WINCC_API } from '@/app/utils/api'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react';

// Тип для описания строки таблицы
interface TableRow {
  id: number;
  description: string;
  unit: string;
  apiField: string; // Ключ, который будет искаться в ответе от API
}

// Конфигурация таблицы на основе вашего скриншота
const tableConfig: TableRow[] = [
  { id: 1, description: 'Температура змеевика 1', unit: '°C', apiField: 'temp_zmeevik_1' },
  { id: 2, description: 'Температура змеевика 2', unit: '°C', apiField: 'temp_zmeevik_2' },
  { id: 3, description: 'Давление нефти на входе', unit: 'МПа', apiField: 'press_oil_in' },
  { id: 4, description: 'Температура нефти на входе', unit: '°C', apiField: 'temp_oil_in' },
  { id: 5, description: 'Давление воздуха', unit: 'кПа', apiField: 'press_air' },
  { id: 6, description: 'Температура дымовых газов 1', unit: '°C', apiField: 'temp_gas_1' },
  { id: 7, description: 'Температура дымовых газов 2', unit: '°C', apiField: 'temp_gas_2' },
  { id: 8, description: 'Температура потока 1', unit: '°C', apiField: 'temp_flow_1' },
  { id: 9, description: 'Температура потока 2', unit: '°C', apiField: 'temp_flow_2' },
  { id: 10, description: 'Температура потока 3', unit: '°C', apiField: 'temp_flow_3' },
  { id: 11, description: 'Температура потока 4', unit: '°C', apiField: 'temp_flow_4' },
  { id: 12, description: 'Давление нефти на выходе', unit: 'МПа', apiField: 'press_oil_out' },
  { id: 13, description: 'Температура нефти на выходе', unit: '°C', apiField: 'temp_oil_out' },
  { id: 14, description: 'Расход нефти', unit: 'м³/ч', apiField: 'flow_oil' },
  { id: 15, description: 'Расход газа', unit: 'нм³/ч', apiField: 'flow_gas' },
  { id: 16, description: 'Давление газа после клапана', unit: 'кПа', apiField: 'press_gas_after' },
  { id: 17, description: 'Давление газа до клапана', unit: 'кПа', apiField: 'press_gas_before' },
];

const FullParameterTable = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

		const pathname = usePathname()
	
		const getName = () => {
			const arr_path = pathname.split('/')
			return arr_path[2]
		}

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await WINCC_API.post('/values');
  //       setData(result);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Ошибка загрузки данных:", err);
  //     }
  //   };

  //   fetchData();
  //   const interval = setInterval(fetchData, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="min-h-screen  p-6 text-slate-100 ml-74 w-full">
      <div className="max-w-5xl mx-auto">

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-100 uppercase text-xs tracking-wider w-full">
                <th className="px-6 py-4 border-b border-slate-700">№</th>
                <th className="px-6 py-4 border-b border-slate-700">Описание</th>
                <th className="px-6 py-4 border-b border-slate-700">Значение</th>
                <th className="px-6 py-4 border-b border-slate-700">Ед. изм.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {tableConfig.map((row) => (
                <tr key={row.id} className="transition-colors">
                  <td className="px-6 py-3 text-slate-200 font-mono">{row.id}</td>
                  <td className="px-6 py-3 text-slate-200 text-sm">{row.description}</td>
                  <td className="px-6 py-3 font-mono font-bold text-white">
                    {loading ? '...' : (data[row.apiField] ?? '-')}
                  </td>
                  <td className="px-6 py-3 text-slate-200">{row.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
				<div className='flex w-full justify-between gap-4'>
					<Link href='#' className='w-[50%]'>
						<button className='bg-slate-900/50 border border-slate-800 rounded-xl p-3 backdrop-blur-sm mt-5 text-slate-100 cursor-pointer hover:bg-slate-950/50 duration-400 w-full'>
							Предиктивный блок
						</button>
					</Link>
					<Link href={`/bake/${getName()}/passport`} className='w-[50%]'>
						<button className='bg-slate-900/50 border border-slate-800 rounded-xl p-3 backdrop-blur-sm mt-5 w-full text-slate-100 cursor-pointer hover:bg-slate-950/50 duration-400'>
							Паспорт печи
						</button>
					</Link>
				</div>
      </div>
    </div>
  );
};

export default FullParameterTable;