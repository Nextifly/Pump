import React, { useState } from 'react'
import { usePassportStore } from '@/app/storage/useStoragePump' // Укажите ваш путь
import { usePathname } from 'next/navigation'

interface Props {
	isOpen: boolean
	onClose: () => void
}

const PumpFormModal = ({ isOpen, onClose }: Props) => {
	const addEntry = usePassportStore(state => state.addPRC)
	const data = usePassportStore(state => state.passports.passport_prc)

	const pathname = usePathname()

	const getIp = () => {
		const arr_path = pathname.split('/')
		return Number(arr_path[2])
	}

	// Локальное состояние формы
	const [formData, setFormData] = useState({
		data: '',
		model: '',
		iznos: 0,
		check: false,
		count: 0,
		reception: 0,
	})

	if (!isOpen) return null

	const handleSubmit = () => {
		addEntry({
			id: getIp(),
			data: {
				...formData,
				id: Math.floor(Math.random() * 90000) + 10000,
			},
		})

		setFormData({
			data: '',
			model: '',
			iznos: 0,
			check: false,
			count: 0,
			reception: 0,
		})

		onClose()
	}

	return (
		<div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50'>
			<div className='bg-slate-900/50 border border-slate-700 p-6 rounded-xl w-full max-w-sm shadow-2xl'>
				<h2 className='text-white text-lg font-bold mb-4 border-b border-slate-700 pb-2'>
					Добавить запись (ПРС)
				</h2>

				<div className='space-y-4'>
					<div>
						<label className='text-slate-400 text-xs uppercase'>Дата</label>
						<input
							type='date'
							className='w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1'
							onChange={e => setFormData({ ...formData, data: e.target.value })}
						/>
					</div>

					<div>
						<label className='text-slate-400 text-xs uppercase'>
							Модель насоса
						</label>
						<input
							type='text'
							className='w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1'
							onChange={e =>
								setFormData({ ...formData, model: e.target.value })
							}
						/>
					</div>

					<div>
						<label className='text-slate-400 text-xs uppercase'>
							Износ (%)
						</label>
						<input
							type='number'
							disabled={formData.check ? true : false}
							className='w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1'
							onChange={e =>
								setFormData({ ...formData, iznos: Number(e.target.value) })
							}
						/>
					</div>

					<div>
						<label className='text-slate-400 text-xs uppercase'>
							Кол-во штанг (шт)
						</label>
						<input
							type='number'
							className='w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1'
							onChange={e =>
								setFormData({ ...formData, count: Number(e.target.value) })
							}
						/>
					</div>

					<div>
						<label className='text-slate-400 text-xs uppercase'>
							Приём насоса (м)
						</label>
						<input
							type='number'
							className='w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1'
							onChange={e =>
								setFormData({ ...formData, reception: Number(e.target.value) })
							}
						/>
					</div>

					<label className='flex items-center gap-2 text-slate-300'>
						<input
							type='checkbox'
							className='accent-blue-500'
							onChange={e =>
								setFormData({ ...formData, check: e.target.checked })
							}
						/>
						Новый насос
					</label>
				</div>

				<div className='mt-6 flex gap-3'>
					<button
						onClick={onClose}
						className='flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded'
					>
						Отмена
					</button>
					<button
						onClick={handleSubmit}
						className='flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded'
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	)
}

export default PumpFormModal
