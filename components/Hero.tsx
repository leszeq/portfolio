import React from 'react';
import { motion } from 'framer-motion';
import { PageInfo, Social } from '../typings';
import { urlFor } from '../sanity';
import Link from 'next/link';

type Props = {
	pageInfo: PageInfo;
	socials?: Social[];
};

export default function Hero({ pageInfo, socials }: Props) {
	return (
		<div className='relative h-screen flex flex-col items-center justify-center text-center overflow-hidden'>
			{/* High-impact background image */}
			<div className='absolute inset-0 z-0 bg-black'>
				{pageInfo?.heroImage ? (
					<img
						src={urlFor(pageInfo?.heroImage).url()}
						alt='Modern Interior Design'
						className='w-full h-full object-cover filter brightness-[0.25] transition-transform duration-1000'
					/>
				) : (
					<div className='w-full h-full bg-[#E5E5E5]' /> // Fallback placeholder
				)}
			</div>

			{/* Minimalist Hero Overlay Text */}
			<div className='relative z-10 flex flex-col items-center justify-center px-4 w-full h-full bg-black/30'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.2, delay: 0.4 }}
					className='space-y-8 max-w-4xl drop-shadow-md text-arch-bg flex flex-col items-center'
				>
					<h1 className='text-6xl sm:text-7xl md:text-9xl font-serif text-center leading-tight mx-auto'>
						<span className='font-bold'>FIDURA</span>
						<br />
						<span className='text-5xl sm:text-6xl md:text-7xl font-light tracking-wide'>STUDIO</span>
					</h1>
					<p className='text-arch-bg/90 text-sm md:text-base font-light tracking-widest pt-2 max-w-2xl text-center leading-relaxed'>
						Tworzę przestrzenie, które łączą estetykę z funkcjonalnością, odpowiadając na realne potrzeby ludzi.
					</p>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1.2, delay: 1 }}
						className='pt-10 flex flex-col sm:flex-row gap-4'
					>
						<Link href='#oferta'>
							<button className='px-10 py-4 w-full sm:w-auto uppercase tracking-widest text-xs border border-arch-bg/70 text-arch-bg hover:bg-arch-bg hover:text-arch-text transition-all duration-500 rounded-full'>
								Poznaj ofertę
							</button>
						</Link>
						<Link href='#contact'>
							<button className='px-10 py-4 w-full sm:w-auto uppercase tracking-widest text-xs border border-arch-bg text-black bg-arch-bg/90 hover:bg-transparent hover:text-arch-bg transition-all duration-500 rounded-full'>
								Skontaktuj się
							</button>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
