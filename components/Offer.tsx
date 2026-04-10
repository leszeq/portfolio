import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OfferDetail from './OfferDetail';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Offer() {
	const [isProjectActive, setIsProjectActive] = useState(false);

	const categories = [
		{
			id: 'consultation',
			title: 'Konsultacja',
			description: 'Profesjonalne wsparcie w doborze układu funkcjonalnego, kolorystyki lub materiałów bez konieczności zamawiania pełnego projektu.',
			expandable: false
		},
		{
			id: 'design',
			title: 'Projekt Wnętrz',
			description: 'Kompleksowe podejście do Twojej przestrzeni – od układu funkcjonalnego, przez wizualizacje 3D, aż po dokumentację techniczną.',
			expandable: true
		},
		{
			id: 'visualization',
			title: 'Wizualizacja',
			description: 'Fotorealistyczne przedstawienie Twoich marzeń o wnętrzu, pozwalające poczuć klimat i stylizację pomieszczeń przed zakupem materiałów.',
			expandable: false
		}
	];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className='min-h-screen flex relative overflow-hidden flex-col text-left max-w-7xl px-6 md:px-12 justify-center mx-auto items-center py-24'
		>
			<h3 className='absolute top-24 uppercase tracking-[15px] text-arch-accent text-sm'>
				Oferta
			</h3>

			<div className='w-full space-y-4 mt-24'>
				{categories.map((cat) => (
					<div key={cat.id} className='w-full'>
						<div
							onClick={() => cat.expandable && setIsProjectActive(!isProjectActive)}
							className={`group relative p-8 md:p-12 border border-arch-accent/10 flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 cursor-pointer ${
								cat.expandable && isProjectActive ? 'bg-arch-accent/5 border-arch-accent/30' : 'bg-white hover:bg-arch-bg'
							}`}
						>
							<div className='space-y-4 max-w-2xl'>
								<h4 className='text-2xl md:text-4xl font-serif uppercase tracking-widest text-arch-text'>
									{cat.title}
								</h4>
								<p className='text-sm md:text-base font-light text-arch-text/70 leading-relaxed'>
									{cat.description}
								</p>
							</div>

							{cat.expandable && (
								<div className='mt-6 md:mt-0 flex items-center space-x-4'>
									<span className='text-[10px] uppercase tracking-[3px] text-arch-accent font-medium'>
										{isProjectActive ? 'Zwiń szczegóły' : 'Zobacz pakiety'}
									</span>
									<motion.div
										animate={{ rotate: isProjectActive ? 180 : 0 }}
										transition={{ duration: 0.3 }}
									>
										<ChevronDownIcon className='h-6 w-6 text-arch-accent' />
									</motion.div>
								</div>
							)}
							
							{/* Hover effect underline */}
							<div className='absolute bottom-0 left-0 w-0 h-[2px] bg-arch-accent transition-all duration-700 group-hover:w-full' />
						</div>

						{/* Expandable Section */}
						{cat.expandable && (
							<AnimatePresence>
								{isProjectActive && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
										className='overflow-hidden'
									>
										<div className='pb-12'>
											<div className='mt-12 text-center'>
												<span className='text-[10px] uppercase tracking-[5px] text-arch-accent/60'>
													Wybierz poziom dopasowany do Twoich potrzeb
												</span>
												<h4 className='text-2xl md:text-3xl font-serif mt-4 text-arch-text'>Pakiety projektowe</h4>
											</div>
											<OfferDetail />
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						)}
					</div>
				))}
			</div>
		</motion.div>
	);
}
