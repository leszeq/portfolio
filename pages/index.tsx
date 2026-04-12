import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import About from '../components/About';
import ContactMe from '../components/ContactMe';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Offer from '../components/Offer';
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
	const schemaData = {
		'@context': 'https://schema.org',
		'@type': 'ArchitecturalFirm',
		'name': 'Fidura Studio',
		'url': 'https://fidurastudio.pl',
		'description': 'Profesjonalne projektowanie i aranżacja wnętrz. Tworzymy przestrzenie, które inspirują.',
		'contactPoint': {
			'@type': 'ContactPoint',
			'telephone': '+48888449002',
			'email': 'arch.nataliaf@gmail.com',
			'contactType': 'customer service'
		},
		'address': {
			'@type': 'PostalAddress',
			'addressCountry': 'PL'
		}
	};

	return (
		<div className='w-full scrollbar scrollbar-track-arch-bg scrollbar-thumb-arch-text/20'>
			<Head>
				<title>Projektowanie Wnętrz | Natalia Fidura STUDIO</title>
				<meta name='description' content='Profesjonalne projektowanie i aranżacja wnętrz. Kompleksowe usługi od koncepcji po wizualizacje. Tworzenie przestrzeni, które inspirują – Natalia Fidura Studio.' />
				<meta name='keywords' content='projektowanie wnętrz, architekt wnętrz, aranżacja wnętrz, projektowanie domów, architekt, wizualizacje wnętrz, Natalia Fidura, Fidura Studio' />
				
				{/* Open Graph (Facebook/Social) */}
				<meta property='og:title' content='Projektowanie Wnętrz | Natalia Fidura STUDIO' />
				<meta property='og:description' content='Profesjonalne projektowanie i aranżacja wnętrz. Tworzymy przestrzenie, które inspirują. Zobacz nasze realizacje i ofertę.' />
				<meta property='og:url' content='https://fidurastudio.pl' />
				<meta property='og:type' content='website' />
				<meta property='og:site_name' content='Fidura Studio' />
				{/* W przyszłości, gdy zdefiniujesz default_seo_image w Sanity, można tu wrzucić og:image */}

				<link rel='canonical' href='https://fidurastudio.pl' />
				
				{/* JSON-LD Structured Data Schema */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
				/>
			</Head>
			{/* Header */}
			<Header socials={socials} />

			{/*Hero*/}
			<section id='hero'>
				<Hero pageInfo={pageInfo} socials={socials} />
			</section>

			{/*About*/}
			<section id='about'>
				<About pageInfo={pageInfo} />
			</section>

			{/*Oferta*/}
			<section id='oferta'>
				<Offer />
			</section>
			{/*Projects*/}
			<section id='projects'>
				<Projects projects={projects} />
			</section>

			{/*Contact Me*/}
			<section id='contact'>
				<ContactMe experiences={experiences} />
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
