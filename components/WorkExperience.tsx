import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { Experience } from '../typings';

type Props = { experiences: Experience[] };

function WorkExperience({ experiences }: Props) {
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
			<div className='w-full flex space-x-8 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-arch-bg scrollbar-thumb-arch-text/20 mt-16'>
				{experiences?.map((experience) => (
					<ExperienceCard key={experience._id} experience={experience} />
				))}
			</div>
		</motion.div>
	);
}

export default WorkExperience;
