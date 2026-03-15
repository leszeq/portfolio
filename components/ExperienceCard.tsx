import { motion } from 'framer-motion';
import React from 'react';
import { urlFor } from '../sanity';
import { Experience } from '../typings';
import Image from 'next/image';

type Props = {
	experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
	return (
		<article className='flex flex-col rounded-none items-center space-y-7 flex-shrink-0 w-[350px] md:w-[500px] xl:w-[700px] snap-center bg-white border border-arch-accent/20 p-10 hover:shadow-lg cursor-pointer transition-all duration-500 overflow-hidden'>
			<div className='px-0 md:px-10 text-center'>
				<h4 className='text-2xl md:text-3xl font-serif text-arch-text uppercase tracking-widest'>{experience?.jobTitle}</h4>
				{/* Company/Degree text removed for package display */}
				{/* <div className='flex space-x-2 my-2'>
					{experience.technologies.map((technology) => (
						<img
							key={technology?._id}
							className='h-10 w-10 rounded-full'
							// src={urlFor(technology?.image).url()}
							alt={'photo for technology'}
							
						/>
					))}
				</div> */}

				<ul className='list-none space-y-4 text-sm md:text-base font-light text-arch-text/80 text-center mt-8 max-h-96 overflow-y-scroll pr-5 scrollbar-thin scrollbar-track-arch-bg scrollbar-thumb-arch-text/20'>
					{experience.points.map((point, i) => (
						<li key={i} className='mx-auto'>
							{point}
						</li>
					))}
				</ul>
			</div>
		</article>
	);
}
