import React from 'react';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Experience } from '../typings';

type Inputs = {
	name: string;
	email: string;
	subject: string;
	message: string;
	location: string;
	area: string;
	services: string[];
	consent: boolean;
};

type Props = {
	experiences?: Experience[];
};

function ContactMe({ experiences }: Props) {
	const { register, handleSubmit } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (formData) => {
		const servicesText = formData.services && formData.services.length > 0
			? `%0AInteresujące usługi: ${formData.services.join(', ')}`
			: '';

		const locationAreaText = `%0ALokalizacja: ${formData.location || 'Brak'}%0AMetraż: ${formData.area || 'Brak'}`;

		window.location.href = `mailto:arch.nataliaf@gmail.com?subject=${formData.subject}&body=Hej, tu ${formData.name}.%0A%0A${formData.message}%0A${servicesText}${locationAreaText}%0A%0A(Kontakt: ${formData.email})`;
	};

	return (
		<div className='relative min-h-screen flex flex-col items-center justify-center max-w-7xl px-6 md:px-12 mx-auto py-24'>
			<div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-16'>
				{/* Info Column */}
				<div className='flex flex-col space-y-8'>
					<div>
						<h3 className='uppercase tracking-[15px] text-arch-accent text-sm mb-4'>
							Kontakt
						</h3>
						<h4 className='text-3xl md:text-5xl font-serif leading-tight'>
							Porozmawiajmy o <br />
							<span className='italic font-light text-arch-accent'>Twoim projekcie</span>
						</h4>
					</div>

					<div className='space-y-6 pt-8 font-light text-arch-text'>
						<div className='flex items-center space-x-4'>
							<PhoneIcon className='text-arch-accent h-5 w-5' />
							<p className='text-lg'>+48 888 449 002</p>
						</div>
						<div className='flex items-center space-x-4'>
							<EnvelopeIcon className='text-arch-accent h-5 w-5' />
							<p className='text-lg'>arch.nataliaf@gmail.com</p>
						</div>

					</div>
				</div>

				{/* Form Column */}
				<div className='flex flex-col justify-center'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col space-y-6 w-full'
					>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<input
								{...register('name')}
								placeholder='Imię i nazwisko'
								className='contactInput'
								type='text'
							/>
							<input
								{...register('email')}
								placeholder='Adres E-mail'
								className='contactInput'
								type='email'
							/>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<input
								{...register('location')}
								placeholder='Lokalizacja inwestycji'
								className='contactInput'
								type='text'
							/>
							<input
								{...register('area')}
								placeholder='Metraż (m2)'
								className='contactInput'
								type='text'
							/>
						</div>

						{/* Services Checkboxes */}
						<div className='space-y-4'>
							<p className='text-sm uppercase tracking-widest text-arch-accent font-medium'>Interesujące mnie usługi:</p>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								{[
									'Konsultacja',
									'Projekt Wnętrz - Pakiet Podstawowy',
									'Projekt Wnętrz - Pakiet Koncepcyjny',
									'Projekt Wnętrz - Pakiet Kompleksowy',
									'Wizualizacja'
								].map((service) => (
									<label key={service} className='flex items-center space-x-3 cursor-pointer group'>
										<input
											type='checkbox'
											value={service}
											{...register('services')}
											className='w-5 h-5 border border-arch-accent/30 rounded-none bg-transparent checked:bg-arch-accent appearance-none checked:border-transparent transition-all cursor-pointer relative checked:after:content-["✓"] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2'
										/>
										<span className='text-[11px] font-light text-arch-text/80 group-hover:text-arch-accent transition-colors uppercase tracking-wider'>
											{service}
										</span>
									</label>
								))}
							</div>
						</div>

						<input
							{...register('subject')}
							placeholder='Temat'
							className='contactInput'
							type='text'
						/>
						<textarea
							{...register('message')}
							placeholder='Wiadomość / Krótki opis inwestycji'
							className='contactInput min-h-[150px]'
						/>

						{/* Consent Checkbox */}
						<label className='flex items-start space-x-3 cursor-pointer group mt-4'>
							<input
								type='checkbox'
								{...register('consent', { required: true })}
								className='w-5 h-5 mt-0.5 shrink-0 border border-arch-accent/30 rounded-none bg-transparent checked:bg-arch-accent appearance-none checked:border-transparent transition-all cursor-pointer relative checked:after:content-["✓"] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2'
							/>
							<span className='text-[11px] font-light text-arch-text/80 group-hover:text-arch-accent transition-colors leading-relaxed'>
								Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką prywatności.
							</span>
						</label>

						<button className='mt-8 self-start px-12 py-4 bg-arch-text text-arch-bg text-sm uppercase tracking-widest hover:bg-arch-accent transition-all duration-300'>
							Wyślij Wiadomość
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ContactMe;
