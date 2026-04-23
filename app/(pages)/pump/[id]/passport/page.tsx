'use client'

import { usePassportStore } from '@/app/storage/useStoragePump'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import PumpFormModal from './widget'
import { useEffect, useState } from 'react'
import { IPassportPump } from './passport'
import IClose from '@/app/assets/close.png'
import Image from 'next/image'

interface Metric {
	label: string
	value: string | number
	unit?: string
}

const page = () => {
	const pathname = usePathname()
	const router = useRouter()

	const getIp = () => {
		const arr_path = pathname.split('/')
		return Number(arr_path[2])
	}

	const passports = usePassportStore(state => state.passports)
	const delete_rpc = usePassportStore(state => state.deletePRC)

	const passport_pump = passports.passport_pump.find(el => el.id === getIp())
	const passport_prc = passports.passport_prc.find(el => el.id === getIp())

	if (!passport_pump) {
		return router.push('/pump')
	}

	const technicalData = [
		{ label: 'Марка насоса', value: passport_pump.specification.mark },
		{
			label: 'Интервал перфорации',
			value: passport_pump.specification.interval,
			unit: 'м',
		},
		{
			label: 'Прием насоса',
			value: passport_pump.specification.reception,
			unit: 'м',
		},
		{
			label: 'Уровень жидкости (дин)',
			value: passport_pump.specification.liquid_level_1,
			unit: 'м',
		},
		{
			label: 'Уровень жидкости (стат)',
			value: passport_pump.specification.liquid_level_2,
			unit: 'м',
		},
		{
			label: 'Кол-во штанг',
			value: passport_pump.specification.count,
			unit: 'шт',
		},
		{
			label: 'Вязкость',
			value: passport_pump.specification.viscosity,
			unit: 'мПа·с',
		},
	]

	const productData = [
		{
			label: 'Плотность',
			value: passport_pump.property.density,
			unit: 'кг/м³',
		},
		{
			label: 'Газосодержание',
			value: passport_pump.property.gas,
			unit: 'м³/т',
		},
		{
			label: 'Мех. примеси',
			value: passport_pump.property.impurities,
			unit: 'мг/л',
		},
		{
			label: 'Минерализация',
			value: passport_pump.property.mineralization,
			unit: 'мг/л',
		},
		{
			label: 'Средняя обводненность (7 сут)',
			value: passport_pump.property.average_water_content,
			unit: '%',
		},
		{
			label: 'Средний суточный Qж (7 сут)',
			value: passport_pump.property.average_gf,
			unit: 'м³/сут',
		},
		{
			label: 'Средний суточный Qн (7 сут)',
			value: passport_pump.property.average_gn,
			unit: 'т/сут',
		},
	]

	const [open, setOpen] = useState<boolean>(false)

	const closeWidget = () => {
		setOpen(false)
	}
	const openWidget = () => {
		setOpen(true)
	}

	const delData = (id: number) => {
		delete_rpc(getIp(), id)
	}

	return (
		<div className='min-h-screen  p-6 text-slate-100 font-sans ml-74 w-full'>
			<div className='max-w-6xl mx-auto mb-8 border-b border-slate-800 pb-6'>
				<h1 className='text-2xl font-bold tracking-tight text-black'>
					Параметры скважинного оборудования
				</h1>
			</div>

			<div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<div className='bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm'>
						<h2 className='text-lg font-semibold mb-4 text-blue-300'>
							Характеристики насоса
						</h2>
						<div className='space-y-4'>
							{technicalData.map((item, i) => (
								<div
									key={i}
									className='flex justify-between items-center border-b border-slate-800/50 pb-2'
								>
									<span className='text-slate-100 text-sm '>{item.label}</span>
									<span className='font-mono font-medium text-slate-100'>
										{item.value}
										<span className='text-slate-100 text-xs ml-1'>
											{item.unit}
										</span>
									</span>
								</div>
							))}
						</div>
					</div>
					<Link href={`${pathname}/update`}>
						<button className='bg-slate-900/50 border border-slate-800 rounded-xl p-3 backdrop-blur-sm mt-5 w-full text-slate-100 cursor-pointer hover:bg-slate-950/50 duration-400'>
							Редактировать
						</button>
					</Link>
				</div>

				<div>
					<div className='bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm'>
						<h2 className='text-lg font-semibold mb-4 text-emerald-300'>
							Свойства продукции
						</h2>
						<div className='space-y-4'>
							{productData.map((item, i) => (
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
					<button
						className='bg-slate-900/50 border border-slate-800 rounded-xl p-3 backdrop-blur-sm mt-5 w-full text-slate-100 cursor-pointer hover:bg-slate-950/50 duration-400'
						onClick={openWidget}
					>
						Добавить ПРС
					</button>
				</div>
			</div>

			<div className='max-w-6xl mx-auto mt-6 w-full'>
				<table className='text-left bg-slate-900/50 rounded-2xl p-6 backdrop-blur-sm w-full'>
					<thead>
						<tr className=' text-slate-100  uppercase text-xs tracking-wider w-full'>
							<th className='px-6 py-4 border-slate-700'>№</th>
							<th className='px-6 py-4 border-slate-700'>Дата</th>
							<th className='px-6 py-4 border-slate-700'>Модель износа</th>
							<th className='px-6 py-4  border-slate-700'>Износ, %</th>
							<th className='px-6 py-4  border-slate-700'>Удалить</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-slate-800'>
						{passport_prc
							? passport_prc.data.map(el => (
									<tr className='transition-colors' key={el.id + el.data}>
										<td className='px-6 py-3 text-slate-100 font-mono'>
											{el.id}
										</td>
										<td className='px-6 py-3 text-slate-100 font-mono'>
											{el.data}
										</td>
										<td className='px-6 py-3 text-slate-100 font-mono'>
											{el.model}
										</td>
										<td className='px-6 py-3 text-slate-100 font-mono'>
											{el.iznos || 0}
										</td>
										<td className='px-6 py-3 text-slate-200'>
											<Image src={IClose} className='w-8 ml-4 cursor-pointer hover:scale-105 duration-200' alt='...' onClick={() => delData(el.id)} />
										</td>
									</tr>
								))
							: ''}
					</tbody>
				</table>
			</div>

			<PumpFormModal isOpen={open} onClose={closeWidget} />
		</div>
	)
}

export default page
