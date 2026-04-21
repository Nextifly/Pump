'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { usePassportStore } from '@/app/storage/useStorage'

export default function EditPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const passports = usePassportStore(state => state.passports)
  const updatePassport = usePassportStore(state => state.update) // Убедитесь, что в сторе метод называется update

  const originalData = passports.find(p => p.id === id)
  
  // Используем только один стейт для всех данных формы
  const [formData, setFormData] = useState(originalData)

  if (!formData) return <div>Насос не найден</div>

  // Универсальный обработчик изменений
  const handleChange = (section: 'specification' | 'property', key: string, value: string) => {
    setFormData(prev => ({
      ...prev!,
      [section]: {
        ...prev![section],
        // Если это "Марка насоса", сохраняем как строку, иначе преобразуем в число
        [key]: key === 'mark' ? value : Number(value)
      }
    }))
  }

  const handleSave = () => {
    updatePassport(formData)
    router.push(`/pump/${id}/passport`)
  }

  // Конфиги (теперь они связаны с разделами данных)
  const technicalData = [
    { name: 'Марка насоса', key: 'mark' },
    { name: 'Интервал перфорации', key: 'interval' },
    { name: 'Прием насоса', key: 'reception' },
    { name: 'Уровень жидкости (дин)', key: 'liquid_level_1' },
    { name: 'Уровень жидкости (стат)', key: 'liquid_level_2' },
    { name: 'Кол-во штанг', key: 'count' },
    { name: 'Вязкость', key: 'viscosity' },
  ]

  const productData = [
    { name: 'Плотность', key: 'density' },
    { name: 'Газосодержание', key: 'gas' },
    { name: 'Мех. примеси', key: 'impurities' },
    { name: 'Минерализация', key: 'mineralization' },
    { name: 'Средняя обводненность (7 сут)', key: 'average_water_content' },
    { name: 'Средний суточный Qж (7 сут)', key: 'average_gf' },
    { name: 'Средний суточный Qн (7 сут)', key: 'average_gn' },
  ]

  return (
    <div className='p-10 text-slate-100 min-h-screen ml-74 w-full'>
      <h1 className='text-2xl mb-6 text-black'>
        Редактирование {formData.specification.mark}
      </h1>
      
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Секция Характеристики */}
        <div className='bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm'>
          <h2 className='text-lg font-semibold mb-4 text-blue-300'>Характеристики насоса</h2>
          <div className='space-y-4'>
            {technicalData.map(el => (
              <div key={el.key} className='flex justify-between items-center border-b border-slate-800/50 pb-2'>
                <span className='text-slate-100 text-sm'>{el.name}</span>
                <input
                  type={el.key === 'mark' ? 'text' : 'number'}
                  className='bg-slate-900/50 border border-slate-700 p-2 rounded outline-none text-white'
                  value={formData.specification[el.key as keyof typeof formData.specification]}
                  onChange={e => handleChange('specification', el.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Секция Свойства */}
        <div className='bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm'>
          <h2 className='text-lg font-semibold mb-4 text-emerald-300'>Свойства продукции</h2>
          <div className='space-y-4'>
            {productData.map(el => (
              <div key={el.key} className='flex justify-between items-center border-b border-slate-800/50 pb-2'>
                <span className='text-slate-100 text-sm'>{el.name}</span>
                <input
                  type='number'
                  className='bg-slate-900/50 border border-slate-700 p-2 rounded outline-none text-white'
                  value={formData.property[el.key as keyof typeof formData.property]}
                  onChange={e => handleChange('property', el.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleSave}
        className='mt-8  text-white font-bold py-3 px-10 w-full max-w-6xl mx-auto block bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm cursor-pointer duration-200 hover:bg-slate-950/50'
      >
        Сохранить изменения
      </button>
    </div>
  )
}