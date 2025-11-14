import { CircleQuestionMark, ArrowRight } from 'lucide-react';

import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import type { RouterConfig } from '@react-types/shared';

import {
  AnimatedTooltip,
  Section,
  SectionDescription,
  SectionHeading,
  FAQ,
} from '@/shared/components/ui';
import { ProjectCard, ServiceCard, Stats } from '@/app/[locale]/(root)/components';
import { developers, getProjects, getServices } from './content';

import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Link } from '@heroui/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'en' | 'ro' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations('HomePage');

  return (
    <div className='mb-32 space-y-16 xl:mb-44 xl:space-y-16 2xl:mb-64'>
      <Section
        isAnimated={false}
        className='flex min-h-[calc(100vh_-_80px)] flex-col items-center sm:justify-center'>
        <div className='flex w-full flex-col justify-center'>
          <div className='mt-20 flex flex-col items-center gap-6 pb-[calc(80px_+_10vh)] xl:mt-10 2xl:mt-0'>
            <div className='flex flex-col items-center sm:gap-3'>
              <h1 className='font-headline text-center text-3xl font-bold sm:text-5xl xl:text-6xl'>
                {t('hero.title.part1')}
              </h1>
              <span className='sm:bg-primary-100 text-2xl font-bold text-nowrap sm:w-min sm:rounded-2xl sm:p-4 sm:text-4xl xl:text-5xl'>
                {t('hero.title.part2')}
              </span>
            </div>
            <p className='text-default-700 max-w-2xl text-center'>{t('hero.description')}</p>
            <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
              <Button as={Link} href='/#projects' variant='faded' size='lg' radius='lg'>
                {t('viewWork')}
              </Button>
              <Button as={Link} href='/contact-us' size='lg' color='primary' radius='lg'>
                {t('startProject')} <ArrowRight className='size-[1em]' />
              </Button>
            </div>
          </div>
        </div>
        <div className='flex w-full items-center justify-center'>
          <Stats />
        </div>
      </Section>
      <div className='space-y-32 xl:space-y-44 2xl:space-y-64'>
        <Section>
          <div className='flex w-full flex-col items-center gap-16'>
            <div className='flex flex-col items-center gap-6'>
              <Chip size='md' variant='bordered' className='py-4 shadow' radius='full'>
                {t('services.badge')}
              </Chip>
              <SectionHeading>{t('services.title')}</SectionHeading>
              <SectionDescription>{t('services.description')}</SectionDescription>
            </div>
            <div className='mx-auto grid w-full max-w-sm grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-5 lg:grid-rows-6'>
              {getServices(t).map((service, i) => (
                <ServiceCard
                  key={i}
                  title={service.title}
                  description={service.description}
                  strongPoints={service.strongPoints}
                  icon={service.icon}
                  illustration={service.illustration}
                  href={service.href as string & RouterConfig['href']}
                  className={service.className}
                  classNames={service.classNames}
                />
              ))}
            </div>
          </div>
        </Section>
        <Section>
          <div className='flex w-full flex-col items-center gap-6'>
            <Chip size='md' variant='bordered' className='py-4 shadow' radius='full'>
              {t('people.badge')}
            </Chip>
            <SectionHeading>{t('people.title')}</SectionHeading>
            <div className='flex flex-row items-center justify-center'>
              <AnimatedTooltip items={developers} />
            </div>
            <SectionDescription>{t('people.description')}</SectionDescription>
            <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
              <Button
                as={Link}
                href='/about-us'
                variant='ghost'
                size='lg'
                color='primary'
                radius='lg'>
                {t('fullStory')}
              </Button>
              <Button
                as={Link}
                href='/contact-us'
                variant='flat'
                color='primary'
                size='lg'
                radius='lg'>
                {t('contactUs')}
              </Button>
            </div>
          </div>
        </Section>
        <Section>
          <div className='relative flex w-full flex-col items-center gap-6 lg:items-start lg:gap-16'>
            <span id='projects' className='invisible absolute -top-10' />
            <Chip size='md' variant='bordered' className='py-4 shadow lg:hidden' radius='full'>
              {t('projects.badge')}
            </Chip>
            <div className='flex w-full flex-col items-center gap-6 lg:items-start lg:gap-4'>
              <SectionHeading>{t('projects.title')}</SectionHeading>
              <div className='flex flex-col items-center gap-6 lg:w-full lg:flex-row lg:items-end lg:justify-between'>
                <SectionDescription className='lg:text-start'>
                  {t('projects.description')}
                </SectionDescription>
                <Button
                  as={Link}
                  href='/about-us'
                  variant='ghost'
                  size='md'
                  color='default'
                  className='hidden'
                  radius='full'>
                  {t('viewProjects')}
                </Button>
              </div>
            </div>
            <div className='mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-16'>
              {getProjects(t).map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  projectLink={project.link}
                  // detailsLink={project.link}
                  badges={[]}
                />
              ))}
            </div>
          </div>
        </Section>
        <Section>
          <div className='flex w-full flex-col items-center gap-16'>
            <div className='flex flex-col items-center gap-6'>
              <Chip
                size='md'
                variant='bordered'
                className='flex size-11 max-w-none min-w-auto items-center justify-center rounded-full'>
                <CircleQuestionMark className='size-8' />
              </Chip>
              <SectionHeading>{t('faq.title')}</SectionHeading>
              <SectionDescription>{t('faq.description')}</SectionDescription>
            </div>
            <div className='mx-auto w-full max-w-5xl'>
              <FAQ />
            </div>
          </div>
        </Section>
        <Section className='shadow-primary-200 bg-primary flex max-w-5xl flex-col items-center gap-8 rounded-3xl p-16 shadow-lg'>
          <SectionHeading className='text-2x text-background sm:text-3xl xl:text-4xl'>
            {t('faq.finalHook.title')}
          </SectionHeading>
          <Button
            as={Link}
            href='/contact-us'
            variant='faded'
            color='primary'
            size='lg'
            radius='lg'>
            {t('faq.finalHook.button')}
          </Button>
        </Section>
      </div>
    </div>
  );
}
