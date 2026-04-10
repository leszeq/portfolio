import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Social } from '../typings';
import { SocialIcon } from 'react-social-icons';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
	socials?: Social[];
};

export default function Header({ socials }: Props) {
	const [scrolled, setScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isMenuOpen]);

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-arch-bg/95 backdrop-blur-sm py-4 shadow-sm' : 'bg-transparent py-8'
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
							<span className='font-bold'>FIDURA</span> <span className='text-base/8 font-light tracking-wide'>STUDIO</span>
						</h1>
					</Link>
				</motion.div>

				{/* Navigation Links and Socials */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className='hidden md:flex flex-row items-center text-xs tracking-widest text-arch-text uppercase'
				>
					<div className='flex items-center space-x-10 pr-8 border-r border-arch-text/20 mr-8'>
						<Link href='#oferta'>
							<p className='cursor-pointer hover:text-arch-accent transition-colors duration-300'>Oferta</p>
						</Link>
						<Link href='#projects'>
							<p className='cursor-pointer hover:text-arch-accent transition-colors duration-300'>Realizacje</p>
						</Link>
						<Link href='#contact'>
							<p className='cursor-pointer border-b border-arch-text pb-1 hover:text-arch-accent hover:border-arch-accent transition-all duration-300'>
								Kontakt
							</p>
						</Link>
					</div>

					{/* Socials */}
					<div className='flex items-center space-x-4'>
						{socials?.map((social) => (
							<SocialIcon
								key={social._id}
								url={social.url}
								fgColor='currentColor'
								bgColor='transparent'
								className='hover:-translate-y-1 transition-transform duration-300 w-8 h-8 opacity-80 hover:opacity-100 hover:text-arch-accent'
								style={{ height: 35, width: 35 }}
							/>
						))}
					</div>
				</motion.div>

				{/* Mobile Menu Button */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='md:hidden flex items-center'
				>
					<button
						onClick={toggleMenu}
						className='text-arch-text p-2'
						aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
					>
						{isMenuOpen ? (
							<XMarkIcon className='h-8 w-8 transition-transform duration-300' />
						) : (
							<Bars3Icon className='h-8 w-8 transition-transform duration-300' />
						)}
					</button>
				</motion.div>
			</div>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '100%' }}
						transition={{ type: 'spring', damping: 25, stiffness: 200 }}
						className='fixed inset-0 h-screen w-full bg-arch-bg z-[60] flex flex-col items-center justify-center'
					>
						<button
							onClick={toggleMenu}
							className='absolute top-8 right-6 md:right-12 p-2 text-arch-text'
						>
							<XMarkIcon className='h-8 w-8' />
						</button>

						<nav className='flex flex-col items-center space-y-8 text-2xl font-serif tracking-widest uppercase text-arch-text'>
							<Link href='#hero' onClick={toggleMenu}>
								<span className='hover:text-arch-accent transition-colors'>Start</span>
							</Link>
							<Link href='#oferta' onClick={toggleMenu}>
								<span className='hover:text-arch-accent transition-colors'>Oferta</span>
							</Link>
							<Link href='#projects' onClick={toggleMenu}>
								<span className='hover:text-arch-accent transition-colors'>Realizacje</span>
							</Link>
							<Link href='#contact' onClick={toggleMenu}>
								<span className='hover:text-arch-accent transition-colors'>Kontakt</span>
							</Link>
						</nav>

						<div className='mt-16 flex space-x-6'>
							{socials?.map((social) => (
								<SocialIcon
									key={social._id}
									url={social.url}
									fgColor='currentColor'
									bgColor='transparent'
									style={{ height: 45, width: 45 }}
									className='hover:text-arch-accent transition-colors'
								/>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
