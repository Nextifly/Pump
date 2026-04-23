'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { usePassportStore } from '@/app/storage/useStorageBake';
import { IParams } from '../passport'
import { tableConfig } from '../page'

const page = () => {
  const pathname = usePathname();
  
  // 1. Получаем имя из пути (безопасно)
  const activeName = useMemo(() => pathname.split('/')[2], [pathname]);

  // 2. Получаем все паспорта из стора (без хуков в селекторе)
  const passports = usePassportStore(state => state.passports);

  // 3. Находим нужный объект
  const activePassport = useMemo(() => 
    passports.find(el => el.name === activeName), 
    [passports, activeName]
  );

  // 4. Локальное состояние для формы
  const [formData, setFormData] = useState<IParams[] | null>(null);

  // 5. ЭФФЕКТ: Синхронизируем состояние, если данные загрузились или сменился путь
  useEffect(() => {
    if (activePassport) {
      setFormData(activePassport.values);
    }
  }, [activePassport]);

  // Обработчик изменений
  const handleInputChange = (modeIndex: number, field: keyof IParams, value: string) => {
    if (!formData) return;
    
    setFormData(prev => {
      if (!prev) return prev;
      const updated = [...prev];
      updated[modeIndex] = {
        ...updated[modeIndex],
        [field]: value === '' ? 0 : Number(value)
      };
      return updated;
    });
  };

  const router = useRouter()

  // Сохранение
  const handleSave = () => {
    if (formData) {
      usePassportStore.getState().updateValues(activeName, formData);
      router.push(`/bake/${activeName}/passport`)
    }
  };

  if (!formData) return <div>Загрузка или данные не найдены...</div>;

  return (

    <div className="min-h-screen p-6 text-slate-100 w-full font-sans ml-74">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-xl font-bold">Редактирование режимов</h1>

          <button 

            onClick={handleSave}

            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition"

          >

            Сохранить изменения

          </button>

        </div>


        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">

          <table className="w-full text-left border-collapse">

            <thead>

              <tr className="bg-slate-800/50 text-slate-100 uppercase text-xs tracking-wider">

                <th className="px-4 py-4 border-b border-slate-700">№</th>

                <th className="px-4 py-4 border-b border-slate-700">Наименование</th>

                <th className="px-4 py-4 border-b border-slate-700 text-center">Обозн.</th>

                <th className="px-4 py-4 border-b border-slate-700">Ед. изм.</th>

                {[1, 2, 3].map(i => (

                  <th key={i} className="px-4 py-4 border-b border-slate-700 text-center">Режим {i}</th>

                ))}

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-800">

              {tableConfig.map((row) => (

                <tr key={row.id}>

                  <td className="px-4 py-2 text-slate-100 font-mono text-xs">{row.id}</td>

                  <td className="px-4 py-2 text-slate-100 text-sm">{row.description}</td>

                  <td className="px-4 py-2 text-slate-100 text-center text-sm">{row.symbol}</td>

                  <td className="px-4 py-2 text-slate-100 text-xs">{row.unit}</td>

                  

                  {/* ДИНАМИЧЕСКИЙ РЕНДЕРИНГ КОЛОНОК */}

                  {formData.map((mode, index) => (

                    <td key={index} className="px-2 py-1">

                      <input

                        type="number" // Тип number для чисел

                        className="w-full bg-slate-800/50 border border-slate-900/50 p-2 rounded outline-none text-white focus:border-blue-500"

                        value={mode[row.apiField as keyof IParams] ?? ''}

                        onChange={(e) => handleInputChange(index, row.apiField as keyof IParams, e.target.value)}

                      />

                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
};

export default page