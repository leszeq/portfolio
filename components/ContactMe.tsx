import React from 'react';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useForm, SubmitHandler } from 'react-hook-form';
import pageInfo from '../sanity/schemas/pageInfo';
import { url } from 'inspector';
import { urlFor } from '../sanity';

type Inputs = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

type Props = {};

function ContactMe({}: Props) {
	const { register, handleSubmit } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (formData) => {
		window.location.href = `mailto:arch.nataliaf@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email}) `;
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
						<div className='flex items-center space-x-4'>
							<MapPinIcon className='text-arch-accent h-5 w-5' />
							<p className='text-lg max-w-[250px]'>
								Nagoszewka Druga 14, 07-300 Ostrów Mazowiecka, Poland
							</p>
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
