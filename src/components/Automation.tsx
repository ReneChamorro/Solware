import React from 'react';
import { Bot, Zap, BarChart2, FileSpreadsheet, Clock, Database } from 'lucide-react';
import Carousel from './Carousel';
import BlurText from './BlurText';

const Automation = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300" id="automatizacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurText
            text="Automatización Empresarial"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          />
          <BlurText
            text="Transformamos procesos manuales en flujos de trabajo eficientes y automatizados"
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-xl text-gray-600 dark:text-gray-300"
          />
        </div>

        <div>
          <Carousel items={automations} />
        </div>
      </div>
    </section>
  );
};

export default Automation;