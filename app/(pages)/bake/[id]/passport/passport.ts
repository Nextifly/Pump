export interface IPassportBake {
	name: string
	specification: ISpecification
	property: IProperty
}

interface ISpecification {
	mark: string
	interval: number
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
	mineralization: number
	average_water_content: number
	average_gf: number
	average_gn: number
}

const passport_bake: IPassportBake[] = [
	{
		name: "10A-1",
		specification: {
			mark: "ЭЦН-5-50",
			interval: 56,
			reception: 56,
			liquid_level_1: 84,
			liquid_level_2: 56,
			count: 56,
			viscosity: 56,
		},
		property: {
			density: 56,
			gas: 56,
			impurities: 56,
			mineralization: 56,
			average_water_content: 56,
			average_gf: 56,
			average_gn: 56,
		},
	},
	{
		name: "10A-2",
		specification: {
			mark: "ЭЦН-5-50 ",
			interval: 56,
			reception: 56,
			liquid_level_1: 56,
			liquid_level_2: 56,
			count: 56,
			viscosity: 56,
		},
		property: {
			density: 56,
			gas: 56,
			impurities: 56,
			mineralization: 56,
			average_water_content: 56,
			average_gf: 56,
			average_gn: 56,
		},
	},
]

export default passport_bake