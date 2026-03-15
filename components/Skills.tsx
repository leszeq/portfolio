import { motion } from 'framer-motion';
import React from 'react';
import Skill from './Skill';
import { Skill as SkillType } from '../typings';
import skill from '../sanity/schemas/skill';

type Props = {
	skills: SkillType[];
};

function Skills({ skills }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className='flex relative flex-col text-center md:text-left xl:flex-row max-w-7xl px-6 md:px-12 min-h-[70vh] justify-center mx-auto items-center py-32'
		>
			<h3 className='absolute top-24 uppercase tracking-[15px] text-arch-accent text-sm'>
				Umiejętności
			</h3>
			<h3 className='absolute top-36 uppercase tracking-[3px] text-arch-text/60 text-xs'>
				Najeedź aby zobaczyć poziom biegłości
			</h3>

			<div className='grid grid-cols-4 gap-5'>
				{skills?.slice(0, skills.length / 2).map((skill) => (
					<Skill key={skill._id} skill={skill} />
				))}
				{skills?.slice(skills.length / 2, skills.length).map((skill) => (
					<Skill key={skill._id} skill={skill} directionLeft />
				))}
			</div>
		</motion.div>
	);
}

export default Skills;
