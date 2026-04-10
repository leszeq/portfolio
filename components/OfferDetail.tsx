import React from 'react';
import { motion } from 'framer-motion';

export default function OfferDetail() {
	const packages = [
		{
			title: '1. Pakiet podstawowy',
			description: 'Idealny dla osób, które potrzebują funkcjonalnego układu pomieszczeń w formie rzutów 2D. Obejmuje propozycję rozmieszczenia ścian działowych oraz aranżację mebli, ale nie zawiera wizualizacji ani szczegółowej dokumentacji technicznej.',
			points: [
				'Pakiet podstawowy',
				'Układ w postaci rzutów 2D',
				'Propozycja układu ścian działowych i aranżacja mebli - 40 zł /m2',
				'Przykład: 56,1 m2 × 40 zł = 2 244 zł'
			],
			price: '40 zł / m2'
		},
		{
			title: '2. Pakiet koncepcyjny',
			description: 'Świetny wybór dla osób, które chcą zobaczyć wstępną wizję swojego wnętrza w postaci wizualizacji 3D, ale nie potrzebują pełnej dokumentacji wykonawczej. Pozwala określić stylistykę i funkcjonalność, jednak brakuje w nim szczegółowych rysunków technicznych.',
			points: [
				'Formularz z pytaniami do klienta online',
				'Brief z wytycznymi do klienta',
				'Kosztorys + lista zakupowa',
				'Inwentaryzacja',
				'Aranżacja w postaci wizualizacji w 3D - 3 warianty',
				'Możliwość do 3 poprawek',
				'Układ rzutów 2D (ściany i meble na podstawie wizualizacji) - 110 zł / m2',
				'Przykład: 56,1 m2 × 110 zł = 6 171 zł'
			],
			price: '110 zł / m2'
		},
		{
			title: '3. Pakiet kompleksowy',
			description: 'Kompletna dokumentacja techniczna, która pozwala na bezproblemową realizację projektu. Ekipa remontowa otrzymuje precyzyjne wytyczne, co minimalizuje ryzyko błędów i kosztownych poprawek.',
			points: [
				'Zawiera pakiet koncepcyjny +',
				'Komplet rysunków technicznych dla wykonawców',
				'Rzut sufitów podwieszanych z oświetleniem',
				'Rzut przyłączy wodno-kanalizacyjnych',
				'Rozmieszczenie punktów instalacji elektrycznej',
				'Rzut podłogi i kolorystyka ścian',
				'Szczegółowe rysunki mebli na wymiar - 169 zł / m2 (pow. 40m2)',
				'Przykład: 56,1 m2 × 169 zł = 9 480,90 zł',
				'Nadzór autorski i zamawianie materiałów – rozliczane indywidualnie'
			],
			price: '169 zł / m2'
		}
	];

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full'>
			{packages.map((pkg, i) => (
				<motion.div
					key={i}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: i * 0.1 }}
					className='bg-white border border-arch-accent/20 p-8 flex flex-col hover:shadow-xl transition-all duration-300'
				>
					<h5 className='text-lg font-bold text-arch-text uppercase tracking-widest mb-4'>
						{pkg.title}
					</h5>
					<p className='text-xs text-arch-text/70 mb-6 font-light leading-relaxed h-24 overflow-hidden'>
						{pkg.description}
					</p>
					
					<div className='flex-grow'>
						<ul className='space-y-3'>
							{pkg.points.map((point, idx) => (
								<li key={idx} className='text-[11px] text-arch-text/90 font-light flex items-start'>
									<span className='mr-2 text-arch-accent'>■</span>
									{point}
								</li>
							))}
						</ul>
					</div>
					
					<div className='mt-8 pt-6 border-t border-arch-accent/10'>
						<p className='text-arch-accent font-serif text-xl'>{pkg.price}</p>
					</div>
				</motion.div>
			))}
		</div>
	);
}
