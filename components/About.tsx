import React from 'react';
import { motion } from 'framer-motion';
import { PageInfo } from '../typings';
import { urlFor } from '../sanity';

type Props = {
	pageInfo: PageInfo;
};

export default function About({ pageInfo }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className='flex flex-col relative min-h-screen text-left max-w-7xl px-6 md:px-12 justify-center mx-auto items-center py-24'
		>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center'>
				{/* Image Column */}
				<motion.div
					initial={{ x: -100, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ duration: 1.2 }}
					viewport={{ once: true }}
					className='w-full h-[50vh] md:h-[70vh] relative'
				>
					{pageInfo?.profilePic && (
						<img
							src={urlFor(pageInfo?.profilePic).url()}
							alt='Profile'
							className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700'
						/>
					)}
				</motion.div>

				{/* Text Column */}
				<div className='space-y-8 md:space-y-12'>
					<h3 className='uppercase tracking-[15px] text-arch-accent text-sm'>
						O nas
					</h3>
					<h4 className='text-3xl md:text-5xl font-serif leading-tight'>
						Kreujemy przestrzenie, <br />
						<span className='italic font-light text-arch-accent'>które inspirują.</span>
					</h4>
					<p className='text-sm md:text-base leading-relaxed text-arch-text/80 font-light max-w-lg'>
						{pageInfo?.backgroundInformation}
					</p>
					
					<div className='pt-8'>
						<a href='#contact' className='inline-block border-b border-arch-text pb-1 uppercase tracking-widest text-xs hover:text-arch-accent hover:border-arch-accent transition-all'>
							Skontaktuj się z nami
						</a>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
