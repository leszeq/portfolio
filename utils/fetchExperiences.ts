import { groq } from 'next-sanity';
import { sanityClient } from '../sanity';
import { Experience } from '../typings';

const query = groq`
*[_type == "experience"] {
	...,
	technologies[]-> 
}
`;

export const fetchExperiences = async () => {
	const experiences: Experience[] = await sanityClient.fetch(query);
  
	// Nowe pole z sformatowanymi datami
	return experiences.map(exp => ({
	  ...exp,
	  dateStartedFormatted: new Date(exp.dateStarted)
		.toDateString()
		.replace(/^\S+\s/, ''), // np. "Jan 2024"
	  dateEndedFormatted: new Date(exp.dateEnded)
		.toDateString()
		.replace(/^\S+\s/, '')
	}));
};
