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
import { Experience, PageInfo, Project, Social } from '../typings';
import { fetchExperiences } from '../utils/fetchExperiences';
import { fetchPageInfo } from '../utils/fetchPageInfo';
import { fetchProject } from '../utils/fetchProjects';
import { fetchSocial } from '../utils/fetchSocials';

type Props = {
	pageInfo: PageInfo;
	experiences: Experience[];
	projects: Project[];
	socials: Social[];
};

const Home = ({ pageInfo, experiences, projects, socials }: Props) => {
	return (
		<div className='w-full scrollbar scrollbar-track-arch-bg scrollbar-thumb-arch-text/20'>
			<Head>
				<title>{`${pageInfo?.name || 'My'} - portfolio`}</title>
			</Head>
			{/* Header */}
			<Header />

			{/*Hero*/}
			<section id='hero'>
				<Hero pageInfo={pageInfo} />
			</section>

			{/*About*/}
			<section id='about'>
				<About pageInfo={pageInfo} />
			</section>

			{/*Oferta (dawniej Experience)*/}
			<section id='oferta'>
				<WorkExperience experiences={experiences} />
			</section>
			{/*Projects*/}
			<section id='projects'>
				<Projects projects={projects} />
			</section>

			{/*Contact Me*/}
			<section id='contact'>
				<ContactMe />
			</section>

			<Link href='#hero'>
				<footer className='py-12 w-full cursor-pointer flex justify-center'>
					<span className='text-xs uppercase tracking-[5px] text-arch-accent hover:text-arch-text transition-colors duration-300'>
						Wróć na górę
					</span>
				</footer>
			</Link>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const pageInfo: PageInfo = await fetchPageInfo();
	const experiences: Experience[] = await fetchExperiences();
	const projects: Project[] = await fetchProject();
	const socials: Social[] = await fetchSocial();

	return {
		props: {
			pageInfo,
			experiences,
			projects,
			socials,
		},
		// Next.js will attempt to re-generate the page:
		// When a request comes in
		// - At most one every 10 seconds
		revalidate: 10,
	};
};
