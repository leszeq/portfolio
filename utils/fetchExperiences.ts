import { Experience } from '../typings';

export const fetchExperiences = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getExperience`)
	const data = await res.json()
	const experiences: Experience[] = data.experiences
  
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
