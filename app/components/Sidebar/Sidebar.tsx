import Image from "next/image" 
import Link from 'next/link'

import Logo from "@/app/assets/logo.png"
import PumpIcon from "@/app/assets/pump.png"
import BakeIcon from "@/app/assets/bake.png"
import StatusIcon from "@/app/assets/status.png"


const Sidebar = () => {
	return (
		<aside className='min-w-74 w-74 h-screen bg-[#6286AD] p-3 fixed'>
			<Link href="/"><Image src={Logo} alt="logo" className='w-full h-94 bg-transparent' /></Link>
			<ul className='mt-5 flex flex-col gap-2'>
				<Link href="#bake" className='flex gap-2 items-center border-y-black border-y-2 py-2 text-[18px] uppercase font-bold'><Image src={BakeIcon} alt='icon' className='size-6' /> Печи подогрева нефти</Link>
				<Link href="/pump" className='flex gap-2 items-center border-y-black border-b-2 pb-2 text-[18px] uppercase font-bold'><Image src={PumpIcon} alt='icon' className='size-6' /> Насосы</Link>
				<Link href="#status" className='flex gap-2 items-center border-y-black border-b-2 pb-2 text-[18px] uppercase font-bold'><Image src={StatusIcon} alt='icon' className='size-6' /> Состояние</Link>
			</ul>
		</aside>
	)
}

export default Sidebar