import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import About from '../components/About';
import ContactMe from '../components/ContactMe';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import WorkExperience from '../components/WorkExperience';
import { Experience, PageInfo, Project, Skill, Social } from '../typings';
import { fetchExperiences } from '../utils/fetchExperiences';
import { fetchPageInfo } from '../utils/fetchPageInfo';
import { fetchProject } from '../utils/fetchProjects';
import { fetchSkills } from '../utils/fetchSkills';
import { fetchSocial } from '../utils/fetchSocials';

type Props = {
	pageInfo: PageInfo;
	experiences: Experience[];
	skills: Skill[];
	projects: Project[];
	socials: Social[];
};

const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {
	return (
		<div className='bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>
			<Head>
				<title>{pageInfo?.name} - portfolio</title>
			</Head>
			{/* Header */}
			<Header socials={socials} />

			{/*Hero*/}
			<section id='hero' className='snap-start'>
				<Hero pageInfo={pageInfo} />
			</section>

			{/*About*/}
			<section id='about' className='snap-center'>
				<About pageInfo={pageInfo} />
			</section>

			{/*Experience*/}
			<section id='experience' className='snap-center'>
				<WorkExperience experiences={experiences} />
			</section>
			{/*Skills*/}
			<section id='skills' className='snap-start'>
				<Skills skills={skills} />
			</section>

			{/*Projects*/}
			<section id='projects' className='snap-start'>
				<Projects projects={projects} />
			</section>

			{/*Contact Me*/}
			<section id='contact' className='snap-start'>
				<ContactMe />
			</section>

			<Link href='#hero'>
				<footer className='sticky bottom-5 w-full cursor-pointer'>
					<div className='flex items-center justify-center'>
						<motion.img
							initial={{
								opacity: 0,
							}}
							animate={{
								scale: [1, 2, 2, 3, 1],
								opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
								borderRadius: ['20%', '20%', '50%', '80%', '20%'],
							}}
							transition={{
								duration: 2.5,
							}}
							className='h-5 w-5 rounded-full filter grayscale hover:grayscale-0 cursor-pointer animate-bounce'
							src='https://www.rafeeg.app/api/Modules/Dashboard/Resources/assets/metronic/plugins/keenthemes-icons/svg/031-bold-double-arrow-up.svg'
							alt='footer photo'
						/>
					</div>
				</footer>
			</Link>
		</div>
	);
};

console.log('test');

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const pageInfo: PageInfo = await fetchPageInfo();
	const experiences: Experience[] = await fetchExperiences();
	const skills: Skill[] = await fetchSkills();
	const projects: Project[] = await fetchProject();
	const socials: Social[] = await fetchSocial();

	return {
		props: {
			pageInfo,
			experiences,
			skills,
			projects,
			socials,
		},
		// Next.js will attempt to re-generate the page:
		// When a request comes in
		// - At most one every 10 seconds
		revalidate: 10,
	};
};
