"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePassportStore } from "@/app/storage/useStorageBake";
import { IParams } from "./passport";

export const tableConfig = [
  {
    id: 1,
    description: "Расход продукта через установку",
    symbol: "Q",
    unit: "м3/час",
    apiField: "flow_product_m3",
  },

  {
    id: 2,
    description: "Плотность нефти",
    symbol: "ρ",
    unit: "т/м3",
    apiField: "density_oil",
  },

  {
    id: 3,
    description: "Обводненность продукта",
    symbol: "W",
    unit: "%",
    apiField: "water_cut",
  },

  {
    id: 4,
    description: "Плотность эмульсии",
    symbol: "ρ",
    unit: "т/м3",
    apiField: "density_emulsion",
  },

  {
    id: 5,
    description: "Расход продукта через установку",
    symbol: "G",
    unit: "т/час",
    apiField: "flow_product_t",
  },

  {
    id: 6,
    description: "Давление продукта на входе",
    symbol: "Pвх",
    unit: "МПа",
    apiField: "press_product_in",
  },

  {
    id: 7,
    description: "Давление продукта на выходе",
    symbol: "Pвых",
    unit: "МПа",
    apiField: "press_product_out",
  },

  {
    id: 8,
    description: "Температура продукта на входе",
    symbol: "tвх",
    unit: "°C",
    apiField: "temp_product_in",
  },

  {
    id: 9,
    description: "Температура продукта на выходе",
    symbol: "tвых",
    unit: "°C",
    apiField: "temp_product_out",
  },

  {
    id: 10,
    description: "Средняя температура продукта",
    symbol: "tcp",
    unit: "°C",
    apiField: "temp_product_avg",
  },

  {
    id: 11,
    description: "Разность температур",
    symbol: "Δt",
    unit: "°C",
    apiField: "temp_delta",
  },

  {
    id: 12,
    description: "Теплоемкость нагреваемого продукта",
    symbol: "Cн",
    unit: "Ккал/кг·°C",
    apiField: "heat_capacity",
  },

  {
    id: 13,
    description: "Теплопроизводительность установки",
    symbol: "Q",
    unit: "Гкал/час",
    apiField: "heat_power_fact",
  },

  {
    id: 14,
    description: "Давление воздуха",
    symbol: "Pвоз",
    unit: "кПа",
    apiField: "press_air",
  },

  {
    id: 15,
    description: "Давление газа перед горелкой",
    symbol: "Pгаз",
    unit: "кПа",
    apiField: "press_gas",
  },

  {
    id: 16,
    description: "Температура уходящих газов",
    symbol: "tyг",
    unit: "°C",
    apiField: "temp_flue_gas",
  },

  // Состав газов вынесем отдельной группой для отступа

  {
    id: "17.1",
    description: "Состав уходящих газов: CO2",
    symbol: "CO2",
    unit: "%",
    apiField: "gas_co2",
  },

  {
    id: "17.2",
    description: "Состав уходящих газов: O2",
    symbol: "O2",
    unit: "%",
    apiField: "gas_o2",
  },

  {
    id: "17.3",
    description: "Состав уходящих газов: CO",
    symbol: "CO",
    unit: "ppm",
    apiField: "gas_co_ppm",
  },

  {
    id: "17.4",
    description: "Состав уходящих газов: NO",
    symbol: "NO",
    unit: "ppm",
    apiField: "gas_no_ppm",
  },

  {
    id: 18,
    description: "Коэффициент избытка воздуха",
    symbol: "αт",
    unit: "-",
    apiField: "air_excess_ratio",
  },

  {
    id: 19,
    description: "Потери в окр. среду при номин. нагрузке",
    symbol: "q5ном",
    unit: "%",
    apiField: "losses_env_nom",
  },

  {
    id: 20,
    description: "Температура наружного воздуха",
    symbol: "tнв",
    unit: "°C",
    apiField: "temp_env",
  },

  {
    id: 21,
    description: "Коэф. полезного действия при сгорании",
    symbol: "η",
    unit: "%",
    apiField: "efficiency_combust",
  },

  {
    id: 22,
    description: "Номинальная производительность",
    symbol: "Qн",
    unit: "Гкал/час",
    apiField: "heat_power_nom",
  },

  {
    id: 23,
    description: "Теплотворная способность топлива",
    symbol: "Qн",
    unit: "Ккал/кг",
    apiField: "fuel_heat_value",
  },

  // Тепловой баланс

  {
    id: "24.1",
    description: "Тепловой баланс: Потери с дымовыми газами",
    symbol: "q2",
    unit: "%",
    apiField: "balance_q2",
  },

  {
    id: "24.2",
    description: "Тепловой баланс: Потери с хим. недожогом",
    symbol: "q3",
    unit: "%",
    apiField: "balance_q3",
  },

  {
    id: "24.3",
    description: "Тепловой баланс: Потери в окруж. среду",
    symbol: "q5",
    unit: "%",
    apiField: "balance_q5",
  },

  {
    id: 25,
    description: 'КПД "Брутто" установки',
    symbol: "η",
    unit: "%",
    apiField: "efficiency_brutto",
  },

  {
    id: 26,
    description: "Расход газа",
    symbol: "B",
    unit: "нм3/час",
    apiField: "flow_gas",
  },

  {
    id: 27,
    description: "Удельный расход условного топлива",
    symbol: "by",
    unit: "кг.у.т./Гкал",
    apiField: "specific_fuel_equiv",
  },

  {
    id: 28,
    description: "Удельный расход натурального топлива",
    symbol: "bн",
    unit: "нм3/Гкал",
    apiField: "specific_fuel_nat",
  },
];

const Page = () => {
  const pathname = usePathname();

  // Получаем сегмент пути (имя режима)
  const activeName = pathname.split("/")[2];

  // Получаем все данные из стора
  const passports = usePassportStore((state) => state.passports);
  console.log(activeName);
  console.log(passports);
  // Находим данные, соответствующие текущему пути
  const activePassport = passports.find((p) => p.name === activeName);

  // Если данных еще нет или они не найдены
  if (!activePassport) {
    return (
      <div className="p-10 text-slate-400 ml-84">
        Данные не найдены или загружаются...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-slate-100 w-full ml-74">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-100 uppercase tracking-wider text-xs">
                <th className="px-4 py-4 border-b border-slate-700">№</th>
                <th className="px-4 py-4 border-b border-slate-700">
                  Наименование
                </th>
                <th className="px-4 py-4 border-b border-slate-700 text-center">
                  Обозн.
                </th>
                <th className="px-4 py-4 border-b border-slate-700">
                  Ед. изм.
                </th>
                <th className="px-4 py-4 border-b border-slate-700 text-center">
                  Режим 1
                </th>
                <th className="px-4 py-4 border-b border-slate-700 text-center">
                  Режим 2
                </th>
                <th className="px-4 py-4 border-b border-slate-700 text-center">
                  Режим 3
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {tableConfig.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 text-slate-100 font-mono text-xs">
                    {row.id}
                  </td>
                  <td className="px-4 py-3 text-slate-100 text-sm">
                    {row.description}
                  </td>
                  <td className="px-4 py-3 text-slate-100 text-center text-sm">
                    {row.symbol}
                  </td>
                  <td className="px-4 py-3 text-slate-100 text-xs">
                    {row.unit}
                  </td>

                  {/* Рендерим данные из стора */}
                  {activePassport.values.map((mode: IParams, index) => (
                    <td
                      key={index}
                      className="px-4 py-3 text-white text-center font-mono text-sm"
                    >
                      {mode[row.apiField as keyof IParams] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex w-full justify-between gap-4 mt-6">
          <Link href={`/bake/${activeName}/passport/update`} className="w-full">
            <button className="bg-slate-900/50 border rounded-xl p-3 backdrop-blur-sm w-full text-blue-100 cursor-pointer hover:bg-slate-950/50 border-black hover:text-white duration-300 font-medium shadow-lg">
              Редактировать
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
