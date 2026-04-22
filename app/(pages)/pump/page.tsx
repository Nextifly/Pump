'use client'

import { WINCC_API } from '@/app/utils/api'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IData {
	id: number
	tok: number
	freq: number
	speed: number
}

const page = () => {
	const [data, setData] = useState<IData[]>()

	const router = useRouter()

	const handleSubmit = (id: number) => {
		router.push(`/pump/${id}`)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await Promise.all([
					await WINCC_API.post('/values', {
						variableNames: [
							'2432.tok_dvigatel',
							'2432.output_frequency',
							'2432.speed_skv',
						],
					}),
					await WINCC_API.post('/values', {
						variableNames: [
							'5875.tok_dvigatel',
							'5875.output_frequency',
							'5875.speed_skv',
						],
					}),
					await WINCC_API.post('/values', {
						variableNames: [
							'6416.tok_dvigatel',
							'6416.output_frequency',
							'6416.speed_skv',
						],
					}),
					await WINCC_API.post('/values', {
						variableNames: [
							'5004.tok_dvigatel',
							'5004.output_frequency',
							'5004.speed_skv',
						],
					}),
					await WINCC_API.post('/values', {
						variableNames: [
							'5831.tok_dvigatel',
							'5831.output_frequency',
							'5831.speed_skv',
						],
					}),
				])
        console.log(response[0].data[0].value)
				setData([
					{
						id: 2432,
						tok: response[0].data[0].value,
						freq: response[0].data[1].value,
						speed: response[0].data[2].value,
					},
					{
						id: 5875,
						tok: response[1].data[0].value,
						freq: response[1].data[1].value,
						speed: response[1].data[2].value,
					},
					{
						id: 6416,
						tok: response[2].data[0].value,
						freq: response[2].data[1].value,
						speed: response[2].data[2].value,
					},
					{
						id: 5004,
						tok: response[3].data[0].value,
						freq: response[3].data[1].value,
						speed: response[3].data[2].value,
					},
					{
						id: 5831,
						tok: response[4].data[0].value,
						freq: response[4].data[1].value,
						speed: response[4].data[2].value,
					},
				])
			} catch (error) {
				console.error('Ошибка загрузки:', error)
			}
		}
		fetchData()
		const interval = setInterval(fetchData, 5000)
		return () => clearInterval(interval)
	}, [])

	return data ? (
		<div className='ml-74 w-full p-6'>
			<div className='bg-white rounded-lg shadow-lg border border-gray-400 overflow-hidden'>
				<table className='w-full text-left border-collapse'>
					<thead>
						<tr className='bg-slate-800 text-white uppercase text-xs tracking-wider'>
							<th className='px-6 py-4'>№ Скважины</th>
							<th className='px-6 py-4'>Выходной ток, А</th>
							<th className='px-6 py-4'>Выходная частота, Гц</th>
							<th className='px-6 py-4'>Скорость двигателя, Об/мин</th>
							<th className='px-6 py-4 text-right'>Ост. Ресурс (мес)</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-200'>
						{data.map((row, index) => (
							<tr
								key={index}
								className='hover:bg-gray-100 transition-colors text-gray-800 cursor-pointer'
								onClick={() => handleSubmit(row.id)}
							>
								<td className='px-6 py-4 font-bold text-slate-900'>{row.id}</td>
								<td className='px-6 py-4'>{row.tok}</td>
								<td className='px-6 py-4'>{row.freq}</td>
								<td className='px-6 py-4 text-gray-600 italic'>{row.speed}</td>
								<td className='px-6 py-4 text-right'>
									<div className='flex items-center justify-end gap-3'>
										<div className='w-24 bg-gray-200 rounded-full h-2.5 overflow-hidden'>
											<div
												className={`h-2.5 ${15 > 10 ? 'bg-green-600' : 'bg-red-500'}`}
												style={{ width: `${(15 / 24) * 100}%` }}
											></div>
										</div>
										<span className='font-bold w-6'>{15}</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	) : (
		<></>
	)
}

export default page
