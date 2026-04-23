'use client'

import React from 'react'
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
import { usePathname } from 'next/navigation'

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
    x: string[];
    [key: `yTop_${number}`]: number[];
    [key: `yBtm_${number}`]: number[];
}

interface PumpInfo {
    utilization: {
        [key: string]: GranularityData;
    };
}

interface PumpData {
    [key: string]: PumpInfo;
}

// Приводим JSON к явному типу
const typedData = data as PumpData;

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
                title: { display: true, text: 'Время' },
                ticks: {
                    callback: (value: number | string) => {
                        const index = Math.round(Number(value));
                        return labels[index] || '';
                    },
                },
            },
            y: {
                title: { display: true, text: 'Utilization' },
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

    return (
        <div className='p-5 ml-74 w-full'>
            <h1 className='text-2xl font-bold mb-6 text-gray-800'>
                Насос: {activeName}
            </h1>

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
        </div>
    )
}

interface MetricSectionProps {
    title: string;
    color: string;
    children: React.ReactNode;
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
    title: string;
    children: React.ReactNode;
}

const ChartWrapper = ({ title, children }: ChartWrapperProps) => (
    <div className='flex-1 w-240 max-h-100 bg-white p-4 rounded-lg border border-gray-100 shadow-sm'>
        <div className='text-center font-medium text-gray-700 mb-3'>{title}</div>
        {children}
    </div>
)