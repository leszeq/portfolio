import React from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { PageInfo } from '../typings';
import Link from 'next/link';
import BackgroundCircles from './BackgroundCircles';
import { urlFor } from '../sanity';
import Image from 'next/image';

type Props = {
	pageInfo: PageInfo;
};

export default function Hero({ pageInfo }: Props) {
	const [text, count] = useTypewriter({
		words: [
			`Hi, my name is ${pageInfo?.name}`,
			'A girl who loves architecture',
			'And here is my portfolio',
		],
		loop: true,
		delaySpeed: 2000,
	});
	return (
		<div className='h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
			<BackgroundCircles />
			<img
				className='relative rounded-full h-32 w-32 mx-auto object-cover'
				src={urlFor(pageInfo?.heroImage).url()}
				alt='photo me dom betonowy'
			/>
			<div className='z-20'>
				<h2 className=' text-sm uppercase text-gray-500 pb-2 tracking-[15px]'>
					{pageInfo?.role}
				</h2>
				<h1 className=' text-5xl lg:text-6xl font-semibold px-10'>
					<span className='mr-3'>{text}</span>
					<Cursor cursorColor='pink' />
				</h1>
				<div className='pt-5'>
					<Link href='#about'>
						<button className='heroButton'>About</button>
					</Link>
					<Link href='#experience'>
						<button className='heroButton'>Education</button>
					</Link>
					<Link href='#skills'>
						<button className='heroButton'>Skills</button>
					</Link>
					<Link href='#projects'>
						<button className='heroButton'>Projects</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
