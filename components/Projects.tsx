import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '../sanity';
import { Project } from '../typings';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
	projects: Project[];
};

function Projects({ projects }: Props) {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						onClick={() => setSelectedProject(project)}
						className='group cursor-pointer flex flex-col'
					>
						<div className='relative w-full aspect-[4/5] overflow-hidden bg-arch-accent/5 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-700'>
							{project?.image && (
								<img
									src={urlFor(project.image).url()}
									alt={project.seoName || project.title}
									className='w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0'
								/>
							)}
							<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center'>
								<span className='opacity-0 group-hover:opacity-100 text-white text-xs uppercase tracking-[4px] border border-white/40 px-6 py-3 backdrop-blur-sm transition-all duration-700 transform translate-y-4 group-hover:translate-y-0'>
									Zobacz szczegóły
								</span>
							</div>
						</div>
						<h4 className='text-xl font-serif tracking-widest mb-2 uppercase text-arch-text group-hover:text-arch-accent transition-colors duration-500'>
							{project?.title}
						</h4>
						<p className='text-xs font-light text-arch-text/60 line-clamp-2 uppercase tracking-tighter'>
							{project?.summary}
						</p>
					</motion.div>
				))}
			</div>

			{/* Project Detail Modal */}
			<AnimatePresence>
				{selectedProject && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-arch-bg/80 overflow-y-auto'
					>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 50, opacity: 0 }}
							transition={{ type: 'spring', damping: 25, stiffness: 200 }}
							className='bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl'
						>
							{/* Close Button */}
							<button 
								onClick={() => setSelectedProject(null)}
								className='absolute top-6 right-6 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-all text-arch-text hover:text-arch-accent'
							>
								<XMarkIcon className='h-6 w-6' />
							</button>

							<div className='flex flex-col'>
								{/* Sticky Header Info */}
								<div className='p-8 md:p-12 border-b border-arch-accent/10'>
									<div className='max-w-3xl'>
										<h3 className='text-3xl md:text-5xl font-serif text-arch-text uppercase tracking-widest mb-6'>
											{selectedProject.title}
										</h3>
										<p className='text-sm md:text-base text-arch-text/80 leading-relaxed font-light'>
											{selectedProject.fullDescription || selectedProject.summary}
										</p>
									</div>
								</div>

								{/* Gallery */}
								<div className='p-8 md:p-12 space-y-12 bg-arch-bg/20'>
									{/* Main Image again in detail? Optional. Let's show gallery */}
									<div className='grid grid-cols-1 gap-8'>
										{selectedProject.gallery?.map((img, idx) => (
											<motion.div
												key={idx}
												initial={{ opacity: 0, y: 30 }}
												whileInView={{ opacity: 1, y: 0 }}
												transition={{ delay: idx * 0.1 }}
												viewport={{ once: true }}
											>
												<img
													src={urlFor(img).url()}
													alt={`${selectedProject.seoName || selectedProject.title} preview ${idx + 1}`}
													className='w-full h-auto shadow-lg'
												/>
											</motion.div>
										))}
										
										{/* Fallback if no gallery */}
										{(!selectedProject.gallery || selectedProject.gallery.length === 0) && (
											<div className='flex flex-col items-center py-20 opacity-30'>
												<span className='text-xs uppercase tracking-[5px]'>Brak dodatkowych zdjęć</span>
											</div>
										)}
									</div>
								</div>
								
								{/* Footer Action */}
								<div className='p-12 flex flex-col items-center bg-white'>
									<button 
										onClick={() => setSelectedProject(null)}
										className='text-xs uppercase tracking-[5px] text-arch-accent hover:text-arch-text transition-colors'
									>
										Zwiń realizację
									</button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Projects;
