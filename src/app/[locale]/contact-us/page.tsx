import { Mail, Phone } from 'lucide-react';

import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { Section, SectionDescription, SectionHeading } from '@/shared/components/ui';
import { ContactForm } from './components/ContactForm';
import { ContactOption } from './components';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'en' | 'ro' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactUsPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ContactUsPage({ params }: PageProps<'/[locale]/contact-us'>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations('ContactUsPage');

  return (
    <Section
      isAnimated={false}
      className='mb-32 flex min-h-[calc(100vh_-_80px)] justify-center xl:mb-44 2xl:mb-64'>
      <div className='flex w-full max-w-3xl flex-col items-center gap-12 pt-36 xl:pt-44 2xl:pt-56'>
        {/* Header Section - Centered */}
        <div className='flex flex-col items-center gap-3 text-center'>
          <SectionHeading className='text-primary'>{t('title')}</SectionHeading>
          <SectionDescription>{t('description')}</SectionDescription>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* Contact Options - Centered Below Form */}
        <div className='flex w-full flex-col gap-6 sm:flex-row sm:justify-center sm:gap-12'>
          <ContactOption
            title={t('contactOptions.email')}
            content='support@devegion.com'
            icon={<Mail className='size-8' />}
          />
          <ContactOption
            title={t('contactOptions.phone')}
            content='+40 733 051 566'
            icon={<Phone className='size-8' />}
          />
        </div>
      </div>
    </Section>
  );
}
