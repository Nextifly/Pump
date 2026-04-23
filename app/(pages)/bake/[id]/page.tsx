'use client'

import { WINCC_API } from '@/app/utils/api'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react';

import IClose from '@/app/assets/close.png'
import Image from 'next/image'

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
  { id: 10, description: 'Давление нефти на выходе', unit: 'МПа', apiField: 'press_oil_out' },
  { id: 11, description: 'Температура нефти на выходе', unit: '°C', apiField: 'temp_oil_out' },
  { id: 12, description: 'Расход нефти', unit: 'м³/ч', apiField: 'flow_oil' },
  { id: 13, description: 'Расход газа', unit: 'нм³/ч', apiField: 'flow_gas' },
  { id: 14, description: 'Давление газа после клапана', unit: 'кПа', apiField: 'press_gas_after' },
  { id: 15, description: 'Давление газа до клапана', unit: 'кПа', apiField: 'press_gas_before' },
];

const FullParameterTable = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

		const pathname = usePathname()
	
		const getName = () => {
			const arr_path = pathname.split('/')
			return arr_path[2]
		}

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(getName())
        if (getName() == "PTB-10A-1") {
          const data = await WINCC_API.post('/values', {
            variableNames: [
              "OilPressureOnComINDB_OutV_111", // Заменить
              "OilPressureOnComINDB_OutV_111", // Заменить
              "OilPressureOnComINDB_OutV_111",
              "MainOB_RTDOilComIn_111",
              "AirPressureDB_OutV",
              "MainOB_GasVihlop111",
              "MainOB_GasVihlop222",
              "MainOB_RTDOilOutHeater111",
              "MainOB_RTDOilOutHeater222",
              "OilPressureOnComOUTDB_OutV_111",
              "MainOB_RTDOilComOut111",
              "MainOB_FlowPereshet_111",
              "MainOB_FlowPereshet_111", // Заменить
              "AirPressureAftMainValveDB_OutV",
              "AirPressureB4MainValveDB_OutV",
            ]
          });
          setData({
          temp_zmeevik_1: 0,
          temp_zmeevik_2: 0,
          press_oil_in: data.data[2].value,
          temp_oil_in: data.data[3].value,
          press_air: data.data[4].value,
          temp_gas_1: data.data[5].value,
          temp_gas_2: data.data[6].value,
          temp_flow_1: data.data[7].value,
          temp_flow_2: data.data[8].value,
          press_oil_out: data.data[9].value,
          temp_oil_out: data.data[10].value,
          flow_oil: data.data[11].value,
          flow_gas: 0,
          press_gas_after: data.data[13].value,
          press_gas_before: data.data[14].value,
        })};
        if (getName() == "PTB-10A-2") {
          const data = await WINCC_API.post('/values', {
            variableNames: [
              "OilPressureOnComINDB_OutV_1", // Заменить
              "OilPressureOnComINDB_OutV_1", // Заменить
              "OilPressureOnComINDB_OutV_1",
              "MainOB_RTDOilComIn_1",
              "AirPressureDB_OutV_1",
              "MainOB_GasVihlop3",
              "MainOB_GasVihlop4",
              "MainOB_RTDOilOutHeater3",
              "MainOB_RTDOilOutHeater4",
              "OilPressureOnComOUTDB_OutV_1",
              "MainOB_RTDOilComOut4",
              "MainOB_FlowPereshet_1",
              "MainOB_FlowPereshet_1", // Заменить
              "AirPressureAftMainValveDB_OutV_1",
              "AirPressureB4MainValveDB_OutV_1",
            ]
          });
          setData({
          temp_zmeevik_1: 0,
          temp_zmeevik_2: 0,
          press_oil_in: data.data[2].value,
          temp_oil_in: data.data[3].value,
          press_air: data.data[4].value,
          temp_gas_1: data.data[5].value,
          temp_gas_2: data.data[6].value,
          temp_flow_1: data.data[7].value,
          temp_flow_2: data.data[8].value,
          press_oil_out: data.data[9].value,
          temp_oil_out: data.data[10].value,
          flow_oil: data.data[11].value,
          flow_gas: 0,
          press_gas_after: data.data[13].value,
          press_gas_before: data.data[14].value,
        });
        }
        if (getName() == "PTB-10A-3") {
          const data = await WINCC_API.post('/values', {
            variableNames: [
              "OilPressureOnComINDB_OutV_3", // Заменить
              "OilPressureOnComINDB_OutV_3", // Заменить
              "OilPressureOnComINDB_OutV_3",
              "MainOB_RTDOilComIn_3",
              "AirPressureDB_OutV_3",
              "MainOB_GasVihlop53",
              "MainOB_GasVihlop63",
              "MainOB_RTDOilOutHeater53",
              "MainOB_RTDOilOutHeater63",
              "OilPressureOnComOUTDB_OutV_3",
              "MainOB_RTDOilComOut53",
              "MainOB_FlowPereshet_3",
              "MainOB_FlowPereshet_3", // Заменить
              "AirPressureAftMainValveDB_OutV_3",
              "AirPressureB4MainValveDB_OutV_3",
            ]
          });
          setData({
          temp_zmeevik_1: 0,
          temp_zmeevik_2: 0,
          press_oil_in: data.data[2].value,
          temp_oil_in: data.data[3].value,
          press_air: data.data[4].value,
          temp_gas_1: data.data[5].value,
          temp_gas_2: data.data[6].value,
          temp_flow_1: data.data[7].value,
          temp_flow_2: data.data[8].value,
          press_oil_out: data.data[9].value,
          temp_oil_out: data.data[10].value,
          flow_oil: data.data[11].value,
          flow_gas: 0,
          press_gas_after: data.data[13].value,
          press_gas_before: data.data[14].value,
        });
        }
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

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
                <th className="px-6 py-4 border-b border-slate-700">Удалить</th>
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