'use client';

import { animate, useInView, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Divider } from '@heroui/divider';
import { useTranslations } from 'next-intl';

interface AnimatedNumberProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
}

function AnimatedNumber({ from = 0, to, duration = 1, suffix = '' }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true }); // trigger once per page load
  const count = useMotionValue(from);
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    });
    return controls.stop;
  }, [inView, count, to, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const t = useTranslations('HomePage');

  return (
    <div className='flex max-w-xl grow flex-col items-center justify-around gap-12 sm:h-12 sm:max-w-3xl sm:flex-row sm:gap-8 lg:max-w-4xl'>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-primary text-4xl font-bold'>
          <AnimatedNumber from={0} to={5} suffix={'+'} />
        </div>
        <div className='text-default-500 text-center'>{t('hero.stats.experience')}</div>
      </div>
      <Divider className='block w-20 sm:hidden' />
      <Divider orientation='vertical' className='hidden sm:block' />
      <div className='flex flex-col items-center justify-center'>
        <div className='text-primary text-4xl font-bold'>
          <AnimatedNumber from={0} to={20} suffix={'+'} />
        </div>
        <div className='text-default-500 text-center'>{t('hero.stats.projects')}</div>
      </div>
      <Divider className='block w-20 sm:hidden' />
      <Divider orientation='vertical' className='hidden sm:block' />
      <div className='flex flex-col items-center justify-center'>
        <div className='text-primary text-4xl font-bold'>
          <AnimatedNumber from={0} to={100} suffix={'%'} />
        </div>
        <div className='text-default-500 text-center'>{t('hero.stats.clients')}</div>
      </div>
    </div>
  );
}
