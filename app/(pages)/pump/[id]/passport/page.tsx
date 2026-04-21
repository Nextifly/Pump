import Link from 'next/link'

interface Metric {
	label: string
	value: string | number
	unit?: string
}

const page = () => {
	const technicalData: Metric[] = [
		{ label: 'Марка насоса', value: 'ЭЦН-5-50' },
		{ label: 'Интервал перфорации', value: '1200–1250', unit: 'м' },
		{ label: 'Прием насоса', value: 1210, unit: 'м' },
		{ label: 'Уровень жидкости (дин)', value: 850, unit: 'м' },
		{ label: 'Уровень жидкости (стат)', value: 780, unit: 'м' },
		{ label: 'Кол-во штанг', value: 45, unit: 'шт' },
		{ label: 'Вязкость', value: 1.2, unit: 'мПа·с' },
	]

	const productData: Metric[] = [
		{ label: 'Плотность', value: 870, unit: 'кг/м³' },
		{ label: 'Газосодержание', value: 15.5, unit: 'м³/т' },
		{ label: 'Мех. примеси', value: 50, unit: 'мг/л' },
		{ label: 'Минерализация', value: 12000, unit: 'мг/л' },
		{ label: 'Средняя обводненность (7 сут)', value: 45.2, unit: '%' },
		{ label: 'Средний суточный Qж (7 сут)', value: 120.5, unit: 'м³/сут' },
		{ label: 'Средний суточный Qн (7 сут)', value: 65.3, unit: 'т/сут' },
	]

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
										{item.value}{' '}
										<span className='text-slate-100 text-xs ml-1'>
											{item.unit}
										</span>
									</span>
								</div>
							))}
						</div>
					</div>
					<button className='bg-slate-900/50 border border-slate-800 rounded-xl p-3 backdrop-blur-sm mt-5 w-full text-slate-100 cursor-pointer hover:bg-slate-950/50 duration-400'>
						Редактировать
					</button>
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
					<button className='bg-slate-900/50 border border-slate-800 rounded-xl p-3 backdrop-blur-sm mt-5 w-full text-slate-100 cursor-pointer hover:bg-slate-950/50 duration-400'>
						Добавить ПРС
					</button>
				</div>
			</div>
		</div>
	)
}

export default page
