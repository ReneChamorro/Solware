import { Users, Rocket, Heart } from 'lucide-react'
import BlurText from './effectsComponents/BlurText'
import { useTranslation } from 'react-i18next'


const AboutUs = () => {
	const { t } = useTranslation()

	return (
		<section
			id="quienes-somos"
			className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-dark text-justify"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<BlurText
						text={t('about.title')}
						delay={150}
						animateBy="words"
						direction="top"
						className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
					/>
					<BlurText
						text={t('about.subtitle')}
						delay={200}
						animateBy="words"
						direction="bottom"
						className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
					/>
				</div>

				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('about.story.title')}</h3>
						<p className="text-gray-600 dark:text-gray-300 text-justify">{t('about.story.text')}</p>

						<div className="space-y-4">
							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('about.points.local.title')}</h4>
									<p className="text-gray-600 dark:text-gray-300">{t('about.points.local.text')}</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('about.points.innovation.title')}</h4>
									<p className="text-gray-600 dark:text-gray-300">{t('about.points.innovation.text')}</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('about.points.commitment.title')}</h4>
									<p className="text-gray-600 dark:text-gray-300">{t('about.points.commitment.text')}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="relative flex justify-center">
						<div className="w-[320px] h-[568px] rounded-2xl overflow-hidden shadow-xl bg-gray-900">
							<video className="w-full h-full object-cover" autoPlay loop muted playsInline>
								<source
									src="https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/videos//Abouts_Us_Video.mp4"
									type="video/mp4"
								/>
								Tu navegador no soporta el elemento de video.
							</video>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutUs
