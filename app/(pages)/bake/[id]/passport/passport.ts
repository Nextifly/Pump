export interface IParams {
	id: number
	flow_product_m3: number
	density_oil: number
	water_cut: number
	density_emulsion: number
	flow_product_t: number
	press_product_in: number
	press_product_out: number
	temp_product_in: number
	temp_product_out: number
	temp_product_avg: number
	temp_delta: number
	heat_capacity: number
	heat_power_fact: number
	press_air: number
	press_gas: number
	temp_flue_gas: number
	gas_co2: number
	gas_o2: number
	gas_co_ppm: number
	gas_no_ppm: number
	air_excess_ratio: number
	losses_env_nom: number
	temp_env: number
	efficiency_combust: number
	heat_power_nom: number
	fuel_heat_value: number
	balance_q2: number
	balance_q3: number
	balance_q5: number
	efficiency_brutto: number
	flow_gas: number
	specific_fuel_equiv: number
	specific_fuel_nat: number
}

// Интерфейс для одного объекта режима (включает ID)
export interface ModeEntry {
	name: string
	values: IParams[]
}

const mockModesData: ModeEntry[] = [
	{
		name: 'PTB-10A-1',
		values: [
			{
				id: 1,
				flow_product_m3: 160,
				density_oil: 0.97,
				water_cut: 83,
				density_emulsion: 0.995,
				flow_product_t: 159.2,
				press_product_in: 0.9,
				press_product_out: 0.8,
				temp_product_in: 30,
				temp_product_out: 53,
				temp_product_avg: 42,
				temp_delta: 23,
				heat_capacity: 0.904,
				heat_power_fact: 3.31,
				press_air: 1.2,
				press_gas: 30,
				temp_flue_gas: 426,
				gas_co2: 6.29,
				gas_o2: 9.8,
				gas_co_ppm: 25.0,
				gas_no_ppm: 0.01612, // В документе тут путаница в ед.изм., взял число
				air_excess_ratio: 1.88,
				losses_env_nom: 3.0,
				temp_env: 15,
				efficiency_combust: 66.34, // Примерное число, т.к. в доке плохо видно
				heat_power_nom: 10,
				fuel_heat_value: 8406,
				balance_q2: 29.13,
				balance_q3: 0.0,
				balance_q5: 4.53,
				efficiency_brutto: 66.34,
				flow_gas: 594,
				specific_fuel_equiv: 215.5,
				specific_fuel_nat: 179.3,
			},
			{
				id: 2,
				flow_product_m3: 160,
				density_oil: 0.97,
				water_cut: 83,
				density_emulsion: 0.995,
				flow_product_t: 159.2,
				press_product_in: 0.9,
				press_product_out: 0.8,
				temp_product_in: 30,
				temp_product_out: 53,
				temp_product_avg: 42,
				temp_delta: 23,
				heat_capacity: 0.904,
				heat_power_fact: 3.31,
				press_air: 1.2,
				press_gas: 30,
				temp_flue_gas: 426,
				gas_co2: 6.29,
				gas_o2: 9.8,
				gas_co_ppm: 25.0,
				gas_no_ppm: 0.01612, // В документе тут путаница в ед.изм., взял число
				air_excess_ratio: 1.88,
				losses_env_nom: 3.0,
				temp_env: 15,
				efficiency_combust: 66.34, // Примерное число, т.к. в доке плохо видно
				heat_power_nom: 10,
				fuel_heat_value: 8406,
				balance_q2: 29.13,
				balance_q3: 0.0,
				balance_q5: 4.53,
				efficiency_brutto: 66.34,
				flow_gas: 594,
				specific_fuel_equiv: 215.5,
				specific_fuel_nat: 179.3,
			},
			{
				id: 3,
				flow_product_m3: 160,
				density_oil: 0.97,
				water_cut: 83,
				density_emulsion: 0.995,
				flow_product_t: 159.2,
				press_product_in: 0.9,
				press_product_out: 0.8,
				temp_product_in: 30,
				temp_product_out: 53,
				temp_product_avg: 42,
				temp_delta: 23,
				heat_capacity: 0.904,
				heat_power_fact: 3.31,
				press_air: 1.2,
				press_gas: 30,
				temp_flue_gas: 426,
				gas_co2: 6.29,
				gas_o2: 9.8,
				gas_co_ppm: 25.0,
				gas_no_ppm: 0.01612, // В документе тут путаница в ед.изм., взял число
				air_excess_ratio: 1.88,
				losses_env_nom: 3.0,
				temp_env: 15,
				efficiency_combust: 66.34, // Примерное число, т.к. в доке плохо видно
				heat_power_nom: 10,
				fuel_heat_value: 8406,
				balance_q2: 29.13,
				balance_q3: 0.0,
				balance_q5: 4.53,
				efficiency_brutto: 66.34,
				flow_gas: 594,
				specific_fuel_equiv: 215.5,
				specific_fuel_nat: 179.3,
			},
		],
	},
	{
		name: 'PTB-10A-2',
		values: [
			{
				id: 1,
				flow_product_m3: 160,
				density_oil: 0.97,
				water_cut: 83,
				density_emulsion: 0.995,
				flow_product_t: 159.2,
				press_product_in: 0.9,
				press_product_out: 0.8,
				temp_product_in: 30,
				temp_product_out: 53,
				temp_product_avg: 42,
				temp_delta: 23,
				heat_capacity: 0.904,
				heat_power_fact: 3.31,
				press_air: 1.2,
				press_gas: 30,
				temp_flue_gas: 426,
				gas_co2: 6.29,
				gas_o2: 9.8,
				gas_co_ppm: 25.0,
				gas_no_ppm: 0.01612, // В документе тут путаница в ед.изм., взял число
				air_excess_ratio: 1.88,
				losses_env_nom: 3.0,
				temp_env: 15,
				efficiency_combust: 66.34, // Примерное число, т.к. в доке плохо видно
				heat_power_nom: 10,
				fuel_heat_value: 8406,
				balance_q2: 29.13,
				balance_q3: 0.0,
				balance_q5: 4.53,
				efficiency_brutto: 66.34,
				flow_gas: 594,
				specific_fuel_equiv: 215.5,
				specific_fuel_nat: 179.3,
			},
			{
				id: 2,
				flow_product_m3: 160,
				density_oil: 0.97,
				water_cut: 83,
				density_emulsion: 0.995,
				flow_product_t: 159.2,
				press_product_in: 0.9,
				press_product_out: 0.8,
				temp_product_in: 30,
				temp_product_out: 53,
				temp_product_avg: 42,
				temp_delta: 23,
				heat_capacity: 0.904,
				heat_power_fact: 3.31,
				press_air: 1.2,
				press_gas: 30,
				temp_flue_gas: 426,
				gas_co2: 6.29,
				gas_o2: 9.8,
				gas_co_ppm: 25.0,
				gas_no_ppm: 0.01612, // В документе тут путаница в ед.изм., взял число
				air_excess_ratio: 1.88,
				losses_env_nom: 3.0,
				temp_env: 15,
				efficiency_combust: 66.34, // Примерное число, т.к. в доке плохо видно
				heat_power_nom: 10,
				fuel_heat_value: 8406,
				balance_q2: 29.13,
				balance_q3: 0.0,
				balance_q5: 4.53,
				efficiency_brutto: 66.34,
				flow_gas: 594,
				specific_fuel_equiv: 215.5,
				specific_fuel_nat: 179.3,
			},
			{
				id: 3,
				flow_product_m3: 160,
				density_oil: 0.97,
				water_cut: 83,
				density_emulsion: 0.995,
				flow_product_t: 159.2,
				press_product_in: 0.9,
				press_product_out: 0.8,
				temp_product_in: 30,
				temp_product_out: 53,
				temp_product_avg: 42,
				temp_delta: 23,
				heat_capacity: 0.904,
				heat_power_fact: 3.31,
				press_air: 1.2,
				press_gas: 30,
				temp_flue_gas: 426,
				gas_co2: 6.29,
				gas_o2: 9.8,
				gas_co_ppm: 25.0,
				gas_no_ppm: 0.01612, // В документе тут путаница в ед.изм., взял число
				air_excess_ratio: 1.88,
				losses_env_nom: 3.0,
				temp_env: 15,
				efficiency_combust: 66.34, // Примерное число, т.к. в доке плохо видно
				heat_power_nom: 10,
				fuel_heat_value: 8406,
				balance_q2: 29.13,
				balance_q3: 0.0,
				balance_q5: 4.53,
				efficiency_brutto: 66.34,
				flow_gas: 594,
				specific_fuel_equiv: 215.5,
				specific_fuel_nat: 179.3,
			},
		],
	},
	{
		name: 'PTB-10A-3',
		values: [
			{
				id: 1,
				flow_product_m3: 160,
				density_oil: 0.97,
				water_cut: 83,
				density_emulsion: 0.995,
				flow_product_t: 159.2,
				press_product_in: 0.9,
				press_product_out: 0.8,
				temp_product_in: 30,
				temp_product_out: 53,
				temp_product_avg: 42,
				temp_delta: 23,
				heat_capacity: 0.904,
				heat_power_fact: 3.31,
				press_air: 1.2,
				press_gas: 30,
				temp_flue_gas: 426,
				gas_co2: 6.29,
				gas_o2: 9.8,
				gas_co_ppm: 25.0,
				gas_no_ppm: 0.01612, // В документе тут путаница в ед.изм., взял число
				air_excess_ratio: 1.88,
				losses_env_nom: 3.0,
				temp_env: 15,
				efficiency_combust: 66.34, // Примерное число, т.к. в доке плохо видно
				heat_power_nom: 10,
				fuel_heat_value: 8406,
				balance_q2: 29.13,
				balance_q3: 0.0,
				balance_q5: 4.53,
				efficiency_brutto: 66.34,
				flow_gas: 594,
				specific_fuel_equiv: 215.5,
				specific_fuel_nat: 179.3,
			},
			{
				id: 2,
				flow_product_m3: 160,
				density_oil: 0.97,
				water_cut: 83,
				density_emulsion: 0.995,
				flow_product_t: 159.2,
				press_product_in: 0.9,
				press_product_out: 0.8,
				temp_product_in: 30,
				temp_product_out: 53,
				temp_product_avg: 42,
				temp_delta: 23,
				heat_capacity: 0.904,
				heat_power_fact: 3.31,
				press_air: 1.2,
				press_gas: 30,
				temp_flue_gas: 426,
				gas_co2: 6.29,
				gas_o2: 9.8,
				gas_co_ppm: 25.0,
				gas_no_ppm: 0.01612, // В документе тут путаница в ед.изм., взял число
				air_excess_ratio: 1.88,
				losses_env_nom: 3.0,
				temp_env: 15,
				efficiency_combust: 66.34, // Примерное число, т.к. в доке плохо видно
				heat_power_nom: 10,
				fuel_heat_value: 8406,
				balance_q2: 29.13,
				balance_q3: 0.0,
				balance_q5: 4.53,
				efficiency_brutto: 66.34,
				flow_gas: 594,
				specific_fuel_equiv: 215.5,
				specific_fuel_nat: 179.3,
			},
			{
				id: 3,
				flow_product_m3: 160,
				density_oil: 0.97,
				water_cut: 83,
				density_emulsion: 0.995,
				flow_product_t: 159.2,
				press_product_in: 0.9,
				press_product_out: 0.8,
				temp_product_in: 30,
				temp_product_out: 53,
				temp_product_avg: 42,
				temp_delta: 23,
				heat_capacity: 0.904,
				heat_power_fact: 3.31,
				press_air: 1.2,
				press_gas: 30,
				temp_flue_gas: 426,
				gas_co2: 6.29,
				gas_o2: 9.8,
				gas_co_ppm: 25.0,
				gas_no_ppm: 0.01612, // В документе тут путаница в ед.изм., взял число
				air_excess_ratio: 1.88,
				losses_env_nom: 3.0,
				temp_env: 15,
				efficiency_combust: 66.34, // Примерное число, т.к. в доке плохо видно
				heat_power_nom: 10,
				fuel_heat_value: 8406,
				balance_q2: 29.13,
				balance_q3: 0.0,
				balance_q5: 4.53,
				efficiency_brutto: 66.34,
				flow_gas: 594,
				specific_fuel_equiv: 215.5,
				specific_fuel_nat: 179.3,
			},
		],
	},
]

export default mockModesData
