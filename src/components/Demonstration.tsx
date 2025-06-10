import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTranslation } from 'react-i18next'

const Demonstration = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const titleRef = useScrollReveal({ variant: 'fade-up', delay: 100 }) as React.RefObject<HTMLHeadingElement>
	const descriptionRef = useScrollReveal({ variant: 'fade-up', delay: 200 }) as React.RefObject<HTMLParagraphElement>
	const videoRef = useScrollReveal({ variant: 'fade-up', delay: 300 }) as React.RefObject<HTMLDivElement>

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-300">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Back button */}
				<button
					onClick={() => navigate('/')}
					className="mb-8 inline-flex items-center text-gray-600 dark:text-gray-300 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
				>
					<ChevronLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
					{t('demonstration.button')}
				</button>

				{/* Title Section */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h1
						ref={titleRef}
						className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative transition-colors duration-300"
					>
						{t('demonstration.title')}
						<span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
					</h1>
					<p ref={descriptionRef} className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
						{t('demonstration.description')}
					</p>
				</div>

				{/* Video Section */}
				<div
					ref={videoRef}
					className="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300"
				>
					<div className="aspect-w-16 aspect-h-9 relative">
						<video
							src="https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/videos//Video_Solware.mp4"
							className="w-full h-full object-cover"
							controls
							preload="metadata"
							playsInline
							controlsList="nodownload"
							poster="URL_DE_TU_THUMBNAIL"
						/>
					</div>

					{/* Video Description */}
					<div className="p-6 sm:p-8">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
							{t('demonstration.video.title')}
						</h2>
						<p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
							{t('demonstration.video.description')}
						</p>

						{/* Key Points */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{[
								t('demonstration.video.points.0'),
								t('demonstration.video.points.1'),
								t('demonstration.video.points.2'),
								t('demonstration.video.points.3'),
							].map((point, index) => (
								<div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
									<div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500" />
									<span>{point}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Demonstration
