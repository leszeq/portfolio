import React from 'react';
import { motion } from 'framer-motion';
import { PageInfo } from '../typings';
import { urlFor } from '../sanity';

type Props = {
	pageInfo: PageInfo;
};

export default function Hero({ pageInfo }: Props) {
	return (
		<div className='relative h-screen flex flex-col items-center justify-center text-center overflow-hidden'>
			{/* High-impact background image */}
			<div className='absolute inset-0 z-0 bg-arch-bg flex items-center justify-center'>
				{pageInfo?.heroImage ? (
					<img
						src={urlFor(pageInfo?.heroImage).url()}
						alt='Modern Interior Design'
						className='w-full h-full object-contain scale-[0.95] filter brightness-[0.85] transition-transform duration-1000'
					/>
				) : (
					<div className='w-full h-full bg-[#E5E5E5]' /> // Fallback placeholder
				)}
			</div>

			{/* Minimalist Hero Overlay Text */}
			<div className='relative z-10 flex flex-col items-center justify-center px-4 w-full h-full bg-black/40'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.2, delay: 0.4 }}
					className='space-y-6 max-w-4xl drop-shadow-lg'
				>
					<h2 className='text-sm uppercase text-arch-bg/80 tracking-[10px] sm:tracking-[15px]'>
						{pageInfo?.role || 'Architektura & Wnętrza'}
					</h2>
					<h1 className='text-5xl sm:text-6xl md:text-8xl font-serif text-arch-bg leading-tight mx-auto'>
						Architektura<br />
						<span className='italic font-light'>Wnętrz</span>
					</h1>
					<p className='text-arch-bg/80 text-sm md:text-base font-light tracking-widest pt-4'>
						ELEVATED, FUNCTIONAL DESIGN FOR MODERN LIVING.
					</p>
				</motion.div>
			</div>
		</div>
	);
}
