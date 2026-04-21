'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface Metric {
	label: string
	value: string | number
	unit?: string
	status?: 'normal' | 'error' | 'neutral'
}

const page = () => {
	const [id, setId] = useState<number>()
	const path = usePathname()

	const getIp = () => {
		const arr_path = path.split("/")
		return arr_path[2]
	}

	const telemetryData: Metric[] = [
		{ label: 'Давление трубное', value: 1.6, unit: 'кг/см²' },
		{ label: 'Затрубное давление', value: 0.0, unit: 'кг/см²' },
		{ label: 'Температура на устье', value: 112, unit: '°C' },
		{ label: 'Мгновенный расход СКЖ', value: 3.44, unit: 'т/сут' },
		{ label: 'Суммарная масса', value: 13171.7, unit: 'т' },
		{ label: 'Накоп. расх. пред. сутки', value: 9.9, unit: 'т' },
		{ label: 'Состояние ЭКМ', value: 'Не в норме', status: 'error' },
		{ label: 'Положение двери шкафа АСУ', value: 'Закрыт', status: 'normal' },
		{ label: 'Работа ПЛК от', value: 'От сети 220V', status: 'normal' },
		{ label: 'Контроль питания', value: 'В норме', status: 'normal' },
	]

	const vfdData: Metric[] = [
		{ label: 'Тип частотника', value: 'CanWorld360' },
		{ label: 'Выходная частота', value: 26.875, unit: 'Гц' },
		{ label: 'Ток двигателя', value: 13.0, unit: 'A' },
		{ label: 'Нагрузка двигателя', value: -8.9, unit: '%' },
		{ label: 'Расход эл. энергии', value: 25984, unit: 'кВт' },
		{ label: 'Напр. звене пост. тока', value: 559.0, unit: 'В' },
		{ label: 'Температура ЧРП', value: 44.0, unit: '°C' },
		{ label: 'Скорость двигателя', value: 809, unit: 'об/мин' },
	]

	const getStatusClass = (status?: string) => {
		switch (status) {
			case 'error':
				return 'text-red-400 bg-red-400/10 px-2 py-0.5 rounded'
			case 'normal':
				return 'text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded'
			default:
				return 'text-slate-200'
		}
	}

	return (
		<div className='w-full ml-74 p-6 font-sans'>
			<div className='max-w-6xl mx-auto mb-8 flex justify-between items-end border-b border-slate-800 pb-4'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>
						Номер скважины: <span className='text-blue-400'>{getIp()}</span>
					</h1>
				</div>
			</div>

			<div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<div className='bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm'>
						<h2 className='text-lg font-semibold mb-4 text-blue-300'>
							Параметры телеметрии
						</h2>
						<div className='space-y-4'>
							{telemetryData.map((item, i) => (
								<div
									key={i}
									className='flex justify-between items-center border-b border-slate-800/50 pb-2'
								>
									<span className='text-slate-100 text-sm '>{item.label}</span>
									<span
										className={`font-mono font-medium ${getStatusClass(item.status)}`}
									>
										{item.value}{' '}
										<span className='text-slate-100 text-xs ml-1'>
											{item.unit}
										</span>
									</span>
								</div>
							))}
						</div>
					</div>
					<Link href='#'>
						<button className='bg-slate-900/50 border border-slate-800 rounded-xl p-3 backdrop-blur-sm mt-5 w-full text-slate-100 cursor-pointer hover:bg-slate-950/50 duration-400'>
							Предиктивный блок
						</button>
					</Link>
				</div>

				<div>
					<div className='bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm h-[calc(100%-70px)]'>
						<h2 className='text-lg font-semibold mb-4 text-emerald-300'>
							Параметры ЧРП
						</h2>
						<div className='space-y-4'>
							{vfdData.map((item, i) => (
								<div
									key={i}
									className='flex justify-between items-center border-b border-slate-800/50 pb-2'
								>
									<span className='text-slate-100 text-sm'>{item.label}</span>
									<span className='font-mono font-medium text-slate-100'>
										{item.value}{' '}
										<span className='text-slate-100 text-xs ml-1'>
											{item.unit}
										</span>
									</span>
								</div>
							))}
						</div>
					</div>
					<Link href={`/pump/${getIp()}/passport`}><button className='bg-slate-900/50 border border-slate-800 rounded-xl p-3 backdrop-blur-sm mt-5 w-full text-slate-100 cursor-pointer hover:bg-slate-950/50 duration-400' onClick={getIp}>Паспорт скважины</button></Link>
				</div>
			</div>
		</div>
	)
}

export default page
