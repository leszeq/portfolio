import React from 'react';
import { motion } from 'framer-motion';
import { urlFor } from '../sanity';
import { Project } from '../typings';
import Image from 'next/image';

type Props = {
	projects: Project[];
};

function Projects({ projects }: Props) {
	return (
		<div className='relative min-h-screen py-32 px-6 md:px-12 max-w-7xl mx-auto'>
			<div className='flex flex-col items-center justify-center mb-24'>
				<h3 className='uppercase tracking-[15px] text-arch-accent text-sm mb-6'>
					Realizacje
				</h3>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16'>
				{projects?.map((project) => (
					<motion.div
						key={project._id}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true, margin: '-100px' }}
						className='group cursor-pointer flex flex-col'
					>
						<div className='relative w-full aspect-[4/5] overflow-hidden bg-arch-accent/10 mb-6'>
							{project?.image && (
								<img
									src={urlFor(project.image).url()}
									alt={project.title}
									className='w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0'
								/>
							)}
						</div>
						<h4 className='text-xl font-serif tracking-wide mb-2 uppercase'>
							{project?.title}
						</h4>
						<p className='text-sm font-light text-arch-text/70 line-clamp-3 mb-4'>
							{project?.summary}
						</p>
						<a
							href={project?.linkToBuild}
							target='_blank'
							rel='noreferrer'
							className='text-xs uppercase tracking-widest text-arch-accent group-hover:text-arch-text transition-colors'
						>
							Zobacz detale &rarr;
						</a>
					</motion.div>
				))}
			</div>
		</div>
	);
}

export default Projects;
