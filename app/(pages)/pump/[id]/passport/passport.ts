export interface IPassport1 {
	passport_pump: IPassportPump[]
	passport_prc: IPassportPRC[]
}

export interface IPassportPRC {
	id: number
	data: IPassportPRCData[]
}
export interface IPassportPRCData {
	id: number
	data: string
	model: string
	iznos: number
	check: boolean
}
export interface IPassportPRCData1 {
	id: number
	data: {
		id: number
		data: string
		model: string
		iznos: number
		check: boolean
		count: number;
		reception: number;
	}
}

export interface IPassportPump {
	id: number
	specification: ISpecification
	property: IProperty
}

interface ISpecification {
	mark: string
	interval: string
	reception: number
	liquid_level_1: number
	liquid_level_2: number
	count: number
	viscosity: number
}

interface IProperty {
	density: number
	gas: number
	impurities: number
	mineralization: number | string
	average_water_content: number
	average_gf: number
	average_gn: number
}

const passport_pump: IPassport1 = {
	passport_pump: [
		{
			id: 2432,
			specification: {
				mark: 'ТР-10-600',
				interval: '267.0-273.5',
				reception: 260,
				liquid_level_1: 239,
				liquid_level_2: 244,
				count: 31,
				viscosity: 541,
			},
			property: {
				density: 0.9292,
				gas: 5.29,
				impurities: 1.0,
				mineralization: 'н/д',
				average_water_content: 44.1,
				average_gf: 5.7,
				average_gn: 3.0,
			},
		},
		{
			id: 5875,
			specification: {
				mark: 'ТР-28-600',
				interval: '434-436 437-441',
				reception: 429,
				liquid_level_1: 400,
				liquid_level_2: 228,
				count: 51,
				viscosity: 411,
			},
			property: {
				density: 0.9211,
				gas: 9.08,
				impurities: 0.0,
				mineralization: 'н/д',
				average_water_content: 95.0,
				average_gf: 27.1,
				average_gn: 1.27,
			},
		},
		{
			id: 6416,
			specification: {
				mark: 'ТР-28-600',
				interval: '323-327 332-337',
				reception: 300,
				liquid_level_1: 211,
				liquid_level_2: 272,
				count: 35,
				viscosity: 378,
			},
			property: {
				density: 0.9282,
				gas: 5.97,
				impurities: 0.0,
				mineralization: 'н/д',
				average_water_content: 92.0,
				average_gf: 21.4,
				average_gn: 1.61,
			},
		},
		{
			id: 5004,
			specification: {
				mark: 'ТР-42-600 ',
				interval: '321-326,5',
				reception: 312,
				liquid_level_1: 259,
				liquid_level_2: 82,
				count: 34,
				viscosity: 541,
			},
			property: {
				density: 0.9292,
				gas: 5.29,
				impurities: 0.0,
				mineralization: 'н/д',
				average_water_content: 93.7,
				average_gf: 42.6,
				average_gn: 2.51,
			},
		},
		{
			id: 5831,
			specification: {
				mark: 'ТР-16-600',
				interval: '450.0-455.0',
				reception: 420,
				liquid_level_1: 380,
				liquid_level_2: 0,
				count: 52,
				viscosity: 411,
			},
			property: {
				density: 0.9211,
				gas: 9.08,
				impurities: 0.0,
				mineralization: 'н/д',
				average_water_content: 77.0,
				average_gf: 15.0,
				average_gn: 3.24,
			},
		},
	],
	passport_prc: [],
}


export default passport_pump
