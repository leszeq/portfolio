import React, { useState } from 'react';
import { PhoneIcon, MapPinIcon, EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
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
	const { 
		register, 
		handleSubmit, 
		reset,
		formState: { errors, isSubmitting } 
	} = useForm<Inputs>();

	const [isSuccess, setIsSuccess] = useState(false);
	const [submitError, setSubmitError] = useState('');

	const onSubmit: SubmitHandler<Inputs> = async (formData) => {
		setSubmitError('');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Wystąpił błąd podczas wysyłania.');
			}

			// Sukces!
			setIsSuccess(true);
			reset();
			
			// Opcjonalnie zresetowanie statusu po paru sekundach
			setTimeout(() => setIsSuccess(false), 8000);
			
		} catch (error: any) {
			setSubmitError(error.message || 'Nie udało się wysłać wiadomości, spróbuj ponownie.');
		}
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
					{isSuccess ? (
						<div className='flex flex-col items-center justify-center h-full space-y-6 text-center border border-arch-accent/20 p-12 bg-white/50 backdrop-blur-sm'>
							<CheckCircleIcon className='h-16 w-16 text-arch-accent' />
							<h4 className='text-2xl font-serif text-arch-text'>Wiadomość została wysłana!</h4>
							<p className='text-sm text-arch-text/70 font-light'>
								Dziękuję za skontaktowanie się ze mną. Odpowiem najszybciej jak to możliwe.
							</p>
						</div>
					) : (
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex flex-col space-y-6 w-full'
						>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='flex flex-col'>
									<input
										{...register('name', { required: 'Imię i nazwisko jest wymagane.' })}
										placeholder='Imię i nazwisko'
										className={`contactInput ${errors.name ? 'border-red-400' : ''}`}
										type='text'
									/>
									{errors.name && <span className='text-red-500 text-xs mt-1'>{errors.name.message}</span>}
								</div>
								
								<div className='flex flex-col'>
									<input
										{...register('email', { 
											required: 'Adres e-mail jest wymagany.',
											pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Niepoprawny format adresu e-mail.' }
										})}
										placeholder='Adres E-mail'
										className={`contactInput ${errors.email ? 'border-red-400' : ''}`}
										type='email'
									/>
									{errors.email && <span className='text-red-500 text-xs mt-1'>{errors.email.message}</span>}
								</div>
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
							<div className='flex flex-col'>
								<textarea
									{...register('message', { required: 'Wiadomość nie może być pusta.' })}
									placeholder='Wiadomość / Krótki opis inwestycji'
									className={`contactInput min-h-[150px] ${errors.message ? 'border-red-400' : ''}`}
								/>
								{errors.message && <span className='text-red-500 text-xs mt-1'>{errors.message.message}</span>}
							</div>

							{/* Consent Checkbox */}
							<div className='flex flex-col mt-4'>
								<label className='flex items-start space-x-3 cursor-pointer group'>
									<input
										type='checkbox'
										{...register('consent', { required: 'Zgoda na przetwarzanie danych osobowych jest wymagana.' })}
										className={`w-5 h-5 mt-0.5 shrink-0 border rounded-none bg-transparent appearance-none transition-all cursor-pointer relative checked:after:content-["✓"] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
											${errors.consent ? 'border-red-400 checked:bg-red-500' : 'border-arch-accent/30 checked:bg-arch-accent checked:border-transparent'}`}
									/>
									<span className='text-[11px] font-light text-arch-text/80 group-hover:text-arch-accent transition-colors leading-relaxed'>
										Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką prywatności.
									</span>
								</label>
								{errors.consent && <span className='text-red-500 text-xs mt-1 ml-8'>{errors.consent.message}</span>}
							</div>

							{submitError && (
								<div className='p-4 bg-red-50 border border-red-200 text-red-600 text-sm'>
									{submitError}
								</div>
							)}

							<button 
								disabled={isSubmitting}
								className='mt-8 self-start px-12 py-4 bg-arch-text text-arch-bg text-sm uppercase tracking-widest hover:bg-arch-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'
							>
								{isSubmitting ? 'Wysyłanie...' : 'Wyślij Wiadomość'}
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}

export default ContactMe;
