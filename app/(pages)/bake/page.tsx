'use client'

import { useRouter } from 'next/navigation';

interface IData {
	name: string
	temp1: number
	temp2: number
	pressure_oil: number
	temp_oil: number
  pressure_void: number
  expenditure_oil: number
  temp_exit_oil: number
}

const page = () => {
	const data: IData[] = [
		{ name: "10A-1",  temp1: 0.0, temp2: 0.0, pressure_oil: 1.1, temp_oil: 25.4, pressure_void: 2.5, expenditure_oil: 19.7, temp_exit_oil: -49.1},
		{ name: "10A-2",  temp1: 0.0, temp2: 0.0, pressure_oil: 1.1, temp_oil: 25.4, pressure_void: 2.5, expenditure_oil: 19.7, temp_exit_oil: -49.1},
		{ name: "10A-3",  temp1: 0.0, temp2: 0.0, pressure_oil: 1.1, temp_oil: 25.4, pressure_void: 2.5, expenditure_oil: 19.7, temp_exit_oil: -49.1},
	]

	const router = useRouter()

  const handleSubmit = (name: string) => {
    router.push(`/bake/${name}`)
  }

	return (
		<div className="ml-74 w-full p-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-400 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white uppercase text-xs tracking-wider">
                <th className="px-6 py-4">Наименование печи</th>
                <th className="px-6 py-4">T змеевика 1, °C</th>
                <th className="px-6 py-4">T змеевика 2, °C</th>
                <th className="px-6 py-4">P входа нефти, МПа</th>
                <th className="px-6 py-4">T входа нефти, °C</th>
                <th className="px-6 py-4">P воздуха, кПа</th>
                <th className="px-6 py-4">Расход нефти, м³/ч</th>
                <th className="px-6 py-4">T выхода нефти, °C</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors text-gray-800 cursor-pointer" onClick={() => handleSubmit(row.name)}>
                  <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                  <td className="px-6 py-4">{row.temp1}</td>
                  <td className="px-6 py-4">{row.temp2}</td>
                  <td className="px-6 py-4">{row.pressure_oil}</td>
                  <td className="px-6 py-4">{row.temp_oil}</td>
                  <td className="px-6 py-4">{row.pressure_void}</td>
                  <td className="px-6 py-4">{row.expenditure_oil}</td>
                  <td className="px-6 py-4">{row.temp_exit_oil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
	)
}

export default page