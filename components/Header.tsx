import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
				scrolled ? 'bg-arch-bg/95 backdrop-blur-sm py-4 shadow-sm' : 'bg-transparent py-8'
			}`}
		>
			<div className='max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center'>
				{/* Logo / Brand Name */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<Link href='#hero'>
						<h1 className='text-xl md:text-2xl font-serif tracking-widest uppercase cursor-pointer text-arch-text'>
							FID STUDIO
						</h1>
					</Link>
				</motion.div>

				{/* Navigation Links */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className='hidden md:flex flex-row items-center space-x-10 text-xs tracking-widest text-arch-text uppercase'
				>
					<Link href='#about'>
						<p className='cursor-pointer hover:text-arch-accent transition-colors duration-300'>O nas</p>
					</Link>
					<Link href='#oferta'>
						<p className='cursor-pointer hover:text-arch-accent transition-colors duration-300'>Oferta</p>
					</Link>
					<Link href='#projects'>
						<p className='cursor-pointer hover:text-arch-accent transition-colors duration-300'>Portfolio</p>
					</Link>
					<Link href='#contact'>
						<p className='cursor-pointer border-b border-arch-text pb-1 hover:text-arch-accent hover:border-arch-accent transition-all duration-300'>
							Kontakt
						</p>
					</Link>
				</motion.div>
			</div>
		</header>
	);
}
