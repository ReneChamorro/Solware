import React from 'react'
import { Lightbulb, Users, Target, Leaf } from 'lucide-react'
import BlurText from './effectsComponents/BlurText'
import { useTranslation } from 'react-i18next'

const ValuesMission: React.FC = () => {
	const { t } = useTranslation()
	const values = [
		{
			icon: <Lightbulb className="h-6 w-6" />,
			title: t('valuesMission.values.innovation.title'),
			description: t('valuesMission.values.innovation.description'),
			color: 'bg-amber-100 dark:bg-amber-900/30',
			iconColor: 'text-amber-600 dark:text-amber-400',
			hoverColor: 'group-hover:text-amber-500 dark:group-hover:text-amber-300',
			cardHover: 'hover:shadow-amber-500/20 dark:hover:shadow-amber-500/20',
		},
		{
			icon: <Users className="h-6 w-6" />,
			title: t('valuesMission.values.commitment.title'),
			description: t('valuesMission.values.commitment.description'),
			color: 'bg-blue-100 dark:bg-blue-900/30',
			iconColor: 'text-blue-600 dark:text-blue-400',
			hoverColor: 'group-hover:text-blue-500 dark:group-hover:text-blue-300',
			cardHover: 'hover:shadow-blue-500/20 dark:hover:shadow-blue-500/20',
		},
		{
			icon: <Target className="h-6 w-6" />,
			title: t('valuesMission.values.adaptability.title'),
			description: t('valuesMission.values.adaptability.description'),
			color: 'bg-purple-100 dark:bg-purple-900/30',
			iconColor: 'text-purple-600 dark:text-purple-400',
			hoverColor: 'group-hover:text-purple-500 dark:group-hover:text-purple-300',
			cardHover: 'hover:shadow-purple-500/20 dark:hover:shadow-purple-500/20',
		},
		{
			icon: <Leaf className="h-6 w-6" />,
			title: t('valuesMission.values.sustainability.title'),
			description: t('valuesMission.values.sustainability.description'),
			color: 'bg-green-100 dark:bg-green-900/30',
			iconColor: 'text-green-600 dark:text-green-400',
			hoverColor: 'group-hover:text-green-500 dark:group-hover:text-green-300',
			cardHover: 'hover:shadow-green-500/20 dark:hover:shadow-green-500/20',
		},
	]

	return (
		<section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<BlurText
						text={t('valuesMission.title')}
						delay={150}
						animateBy="words"
						direction="top"
						className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
					/>
					<BlurText
						text={t('valuesMission.description')}
						delay={200}
						animateBy="words"
						direction="bottom"
						className="text-xl text-gray-600 dark:text-gray-300"
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div
						className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
              rounded-2xl p-8 sm:p-10 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
					>
						<div className="prose prose-lg dark:prose-invert max-w-none text-justify">
							<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{t('valuesMission.paragraph1')}</p>
							<div className="text-gray-700 dark:text-gray-300 leading-relaxed">
								{t('valuesMission.paragraph2').split('\n').map((line, index) => (
									<p key={index} className="mb-2 last:mb-0">{line}</p>
								))}
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{values.map((value, index) => (
							<div
								key={index}
								className={`group bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
                  rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${value.cardHover}`}
							>
								<div
									className={`w-12 h-12 ${value.color} rounded-lg flex items-center justify-center 
                  mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
								>
									{React.cloneElement(value.icon, {
										className: `transition-colors duration-300 ${value.iconColor} ${value.hoverColor}`,
									})}
								</div>
								<h3
									className="text-lg font-semibold text-gray-900 dark:text-white mb-2 
                  transition-colors duration-300"
								>
									{value.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
									{value.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ValuesMission
