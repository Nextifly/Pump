'use client'

import React from 'react'
import IBack from '@/app/assets/back.png'
import Image from 'next/image'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	ChartData,
	ChartOptions,
	ChartDataset,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'
import data from './efficiency_full_export.json'
import { usePathname, useRouter } from 'next/navigation'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
)

// --- Типизация данных ---

interface GranularityData {
	x: string[]
	[key: `yTop_${number}`]: number[]
	[key: `yBtm_${number}`]: number[]
}

interface PumpInfo {
	utilization: {
		[key: string]: GranularityData
	}
}

interface PumpData {
	[key: string]: PumpInfo
}

// Приводим JSON к явному типу
const typedData = data as PumpData

// --- Вспомогательные компоненты ---

const getUtilizationColor = (level: number, isTop: boolean): string => {
	const k = isTop ? 0.5 : 0.25
	const opacity = k * level
	// ... логика цветов осталась прежней
	if (level >= 0.85) return `rgba(0, 0, 255, ${opacity})`
	if (level >= 0.75) return `rgba(0, 192, 192, ${opacity})`
	if (level >= 0.65) return `rgba(0, 255, 0, ${opacity})`
	if (level >= 0.55) return `rgba(192, 192, 0, ${opacity})`
	return `rgba(255, 0, 0, ${opacity})`
}

const pumpAlerts: Record<string, { date: string, message: string }[]> = {
  "5004": [
    { "date": "28 июля 2026г 03:12:58", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." },
    { "date": "28 июля 2026г 14:55:07", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 6% для замедления износа эластомера." },
    { "date": "28 июля 2026г 19:22:41", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 4% для замедления износа эластомера." },
    { "date": "28 июля 2026г 08:47:59", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 7% для замедления износа эластомера." },
    { "date": "28 июля 2026г 22:11:03", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." },
    { "date": "28 июля 2026г 11:39:26", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 6% для замедления износа эластомера." },
    { "date": "28 июля 2026г 17:03:12", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 4% для замедления износа эластомера." },
    { "date": "28 июля 2026г 00:58:44", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." }
  ],

  "5831": [
    { "date": "28 июля 2026г 06:14:22", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 4% для замедления износа эластомера." },
    { "date": "28 июля 2026г 12:33:51", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." },
    { "date": "28 июля 2026г 18:49:09", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 6% для замедления износа эластомера." },
    { "date": "28 июля 2026г 21:07:44", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 7% для замедления износа эластомера." },
    { "date": "28 июля 2026г 04:55:18", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." },
    { "date": "28 июля 2026г 09:27:03", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 4% для замедления износа эластомера." },
    { "date": "28 июля 2026г 15:42:37", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 6% для замедления износа эластомера." },
    { "date": "28 июля 2026г 23:18:55", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." }
  ],

  "5875": [
    { "date": "28 июля 2026г 01:33:14", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 7% для замедления износа эластомера." },
    { "date": "28 июля 2026г 10:22:48", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 6% для замедления износа эластомера." },
    { "date": "28 июля 2026г 16:41:29", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." },
    { "date": "28 июля 2026г 22:57:03", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 7% для замедления износа эластомера." },
    { "date": "28 июля 2026г 07:19:56", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 4% для замедления износа эластомера." },
    { "date": "28 июля 2026г 13:58:11", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 6% для замедления износа эластомера." },
    { "date": "28 июля 2026г 20:44:33", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." },
    { "date": "28 июля 2026г 05:08:27", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 7% для замедления износа эластомера." }
  ],

  "6416": [
    { "date": "28 июля 2026г 02:44:51", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 4% для замедления износа эластомера." },
    { "date": "28 июля 2026г 09:11:36", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." },
    { "date": "28 июля 2026г 14:27:03", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 4% для замедления износа эластомера." },
    { "date": "28 июля 2026г 18:33:57", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 6% для замедления износа эластомера." },
    { "date": "28 июля 2026г 23:51:22", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." },
    { "date": "28 июля 2026г 07:03:49", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 4% для замедления износа эластомера." },
    { "date": "28 июля 2026г 12:58:14", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 6% для замедления износа эластомера." },
    { "date": "28 июля 2026г 20:22:40", "message": "Риск ускоренного износа пары ротор-статор. Высокая обводненность. Рекомендуется снизить обороты на 5% для замедления износа эластомера." }
  ],

  "2432": [
    { "date": "28 июля 2026г 04:12:07", "message": "Наблюдается повышение тока без роста оборотов. Риск подклинивания пары из-за механических примесей." },
    { "date": "28 июля 2026г 19:44:55", "message": "Наблюдается повышение тока без роста оборотов. Риск подклинивания пары из-за механических примесей." }
  ]
}

};

interface PumpInfoConfig {
  runtimeHours: number;
  resource1: string;
  resource2: string;
  ost1: string;
  ost2: string;
  pogr1: string;
  pogr2: string;
  // Поле utilization удалено отсюда
}

export interface PumpConfig {
  [key: string]: PumpInfoConfig;
}

export const PUMP_CONFIG: PumpConfig = {
  "5004": { runtimeHours: 936, resource1: "С вероятностью 90% остаток", resource2: "С вероятностью 60% остаток ресурса составляет", ost1: "77%", ost2: "80%", pogr1: "(+-5%)", pogr2: "(+-3%)" },
  "6416": { runtimeHours: 2304, resource1: "С вероятностью 90% остаток", resource2: "С вероятностью 60% остаток ресурса составляет", ost1: "38%", ost2: "41%", pogr1: "(+-5%)", pogr2: "(+-3%)" },
  "5831": { runtimeHours: 2400, resource1: "С вероятностью 90% остаток", resource2: "С вероятностью 60% остаток ресурса составляет", ost1: "52", ost2: "60%", pogr1: "(+-5%)", pogr2: "(+-3%)" },
  "2432": { runtimeHours: 1944, resource1: "С вероятностью 90% остаток", resource2: "С вероятностью 60% остаток ресурса составляет", ost1: "50%", ost2: "52%", pogr1: "(+-5%)", pogr2: "(+-3%)" },
  "5875": { runtimeHours: 1440, resource1: "С вероятностью 90% остаток ресурса составляет", resource2: "С вероятностью 60% остаток ресурса составляет", ost1: "73%", ost2: "79%", pogr1: "(+-5%)", pogr2: "(+-3%)" },
};

export default function PumpPredictPage() {
	const pathname = usePathname()
	// Безопасное получение ключа (обычно pathname начинается с /)
	const activeName = pathname?.split('/')[2] || ''
	const pumpInfo = typedData[activeName]

	if (!pumpInfo) {
		return (
			<div className='p-10 text-red-500'>
				Данные для насоса {activeName} не найдены.
			</div>
		)
	}

	const chartOptions = (labels: string[]): ChartOptions<'scatter'> => ({
		responsive: true,
		maintainAspectRatio: false,
		plugins: { legend: { display: false } },
		scales: {
			x: {
				type: 'linear' as const,
				title: { display: true, text: 'Дни наработки' },
				ticks: {
					callback: (value: number | string) => {
						const index = Math.round(Number(value))
						return labels[index] || ''
					},
				},
			},
			y: {
				title: { display: true, text: 'Процент износа' },
			},
		},
	})

	const getScatterData = (granularity: string): ChartData<'scatter'> => {
		const metric = pumpInfo.utilization[granularity]
		const datasets: ChartDataset<'scatter'>[] = []

		;[0.9, 0.8, 0.7, 0.6, 0.5].forEach(level => {
			datasets.push({
				label: `${level * 100}% Top`,
				data: metric.x.map((_, i) => ({
					x: i,
					y: metric[`yTop_${level}`]?.[i] ?? 0,
				})),
				backgroundColor: getUtilizationColor(level, true),
				borderWidth: 0,
				pointRadius: 4,
				type: 'scatter',
			})
			datasets.push({
				label: `${level * 100}% Bottom`,
				data: metric.x.map((_, i) => ({
					x: i,
					y: metric[`yBtm_${level}`]?.[i] ?? 0,
				})),
				backgroundColor: getUtilizationColor(level, false),
				borderWidth: 0,
				pointRadius: 4,
				type: 'scatter',
			})
		})
		return { datasets }
	}

	const path = usePathname()

	const getIp = () => {
		const arr_path = path.split('/')
		return arr_path[2]
	}

	const router = useRouter()

	const handleBack = () => {
		router.push('/pump/' + getIp())
	}

	const currentAlerts = pumpAlerts[activeName] || [];

	return (
		<div className='p-5 ml-94 w-full relative'>
			<div
				className='absolute -left-15 top-6 size-9 cursor-pointer'
				onClick={handleBack}
			>
				<Image src={IBack} alt='...' />
			</div>
			<h1 className='text-2xl font-bold mb-6 text-gray-800'>
				Насос: {activeName}
			</h1>

			{/* --- СЕКЦИЯ ДАННЫХ И ПРОГНОЗА --- */}
      <div className='flex flex-wrap gap-4 mb-6'>
        {/* Карточка наработки */}
        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center'>
          <div className='text-gray-500 text-sm'>Наработка</div>
          <div className='text-xl font-bold text-gray-800'>{PUMP_CONFIG[activeName].runtimeHours} часов</div>
        </div>

        {/* Карточка остатка ресурса */}
        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1 min-w-75'>
          <div className='text-gray-500 text-sm mb-3'>Остаток ресурса</div>
          <div className='space-y-3'>
            <div className='text-sm text-gray-700 flex items-center gap-2'>
              {PUMP_CONFIG[activeName].resource1}
              <span className='px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded shadow-inner'>{PUMP_CONFIG[activeName].ost1}</span>
              {PUMP_CONFIG[activeName].pogr1}
            </div>
            <div className='text-sm text-gray-700 flex items-center gap-2'>
              {PUMP_CONFIG[activeName].resource2}
              <span className='px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded shadow-inner'>{PUMP_CONFIG[activeName].ost2}</span>
              {PUMP_CONFIG[activeName].pogr2}
            </div>
          </div>
        </div>
      </div>

			<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
				<MetricSection title='Utilization' color='#e67e22'>
					<ChartWrapper title='Дневная агрегация (1d)'>
						<Scatter
							data={getScatterData('1d')}
							options={chartOptions(pumpInfo.utilization['1d'].x)}
						/>
					</ChartWrapper>
				</MetricSection>
			</div>

			{/* --- НОВАЯ СЕКЦИЯ ОПОВЕЩЕНИЙ --- */}
      {currentAlerts.length > 0 && (
        <div className='mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-h-52 overflow-auto w-[50%]'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800 flex items-center'> Журнал событий
          </h2>
          <div className='space-y-3'>
            {currentAlerts.map((alert, idx) => (
              <div
                key={idx}
                className='flex flex-col md:flex-row gap-2 md:gap-4 p-4 rounded-lg bg-orange-50/50 border border-orange-100'
              >
                <span className='text-xs font-mono font-bold text-orange-600 whitespace-nowrap bg-orange-100 px-2 py-1 rounded'>
                  {alert.date}
                </span>
                <p className='text-sm text-gray-700 leading-relaxed'>
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
		</div>
	)
}

interface MetricSectionProps {
	title: string
	color: string
	children: React.ReactNode
}

const MetricSection = ({ title, color, children }: MetricSectionProps) => (
	<div className='mb-10'>
		<div
			className='text-xl font-semibold mb-4 pb-2 border-b-[3px]'
			style={{ borderColor: color, color: color }}
		>
			{title}
		</div>
		<div className='flex flex-wrap gap-6 flex-col'>{children}</div>
	</div>
)

interface ChartWrapperProps {
	title: string
	children: React.ReactNode
}

const ChartWrapper = ({ title, children }: ChartWrapperProps) => (
	<div className='flex-1 w-240 max-h-100 bg-white p-4 rounded-lg border border-gray-100 shadow-sm'>
		<div className='text-center font-medium text-gray-700 mb-3'>{title}</div>
		{children}
	</div>
)
