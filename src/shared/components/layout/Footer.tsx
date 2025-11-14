import { Logo } from '../ui/Logo';
import { Heart } from 'lucide-react';
import { Link } from '@heroui/link';
import { useTranslations } from 'next-intl';
import type { RouterConfig } from '@react-types/shared';

export function Footer() {
  const t = useTranslations('Footer');

  const quickAccessItems = [
    {
      href: '/',
      label: t('quickAccess.home'),
    },
    {
      href: '/about-us',
      label: t('quickAccess.aboutUs'),
    },
    {
      href: '/contact-us',
      label: t('quickAccess.contactUs'),
    },
  ];
  const services = [
    {
      href: '/services/web-development',
      label: t('services.webDevelopment.title'),
    },
    {
      href: '/services/mobile-development',
      label: t('services.mobileDevelopment.title'),
    },
    {
      href: '/services/uiux-design',
      label: t('services.uiuxDesign.title'),
    },
    {
      href: '/services/consulting',
      label: t('services.consulting.title'),
    },
  ];

  return (
    <footer className='bg-default-100 flex min-h-96 flex-col gap-8 p-6 xl:p-12'>
      <div className='grid grow grid-cols-1 gap-8 xl:grid-cols-4'>
        <div className='flex flex-col items-start'>
          <div className='-ml-3'>
            <Logo />
          </div>
          <p className='text-default-700'>
            {t('tagline')} <Heart className='mb-1 inline size-[1em] fill-current' />
          </p>
        </div>
        <div className='space-y-3'>
          <h2 className='font-headline font-semibold'>{t('quickAccess.title')}</h2>
          <div className='space-y-2'>
            {quickAccessItems.map((item, index) => {
              return (
                <Link
                  href={item.href as string & RouterConfig['href']}
                  key={index}
                  underline='hover'
                  color='foreground'
                  className='block'>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className='space-y-3'>
          <h2 className='font-headline font-semibold'>{t('services.title')}</h2>
          <div className='space-y-2'>
            {services.map((service, index) => {
              return (
                <Link
                  href={service.href as string & RouterConfig['href']}
                  key={index}
                  underline='hover'
                  color='foreground'
                  className='block'>
                  {service.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className='text-default-600 text-small flex w-full flex-col sm:flex-row sm:justify-between sm:gap-4'>
        <span>{t('copyright')}</span>
        <Link color='foreground' size='sm' className='text-default-600' href='/privacy-policy'>
          {t('privacyPolicy')}
        </Link>
      </div>
    </footer>
  );
}
