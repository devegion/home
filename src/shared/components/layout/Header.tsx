'use client';

import { Logo } from '../ui/Logo';
import { ChevronDown, ChevronUp, Languages, Laptop, Tablet, PenTool, Compass } from 'lucide-react';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { Divider } from '@heroui/divider';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { Locale, useLocale, useTranslations } from 'next-intl';

import { Key, useState, useTransition } from 'react';
import { cn } from '@/shared/utils/cn';
import type { RouterConfig } from '@react-types/shared';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const t = useTranslations('Header');

  const navItems = [
    {
      label: t('projects'),
      href: '/#projects',
      subItems: [],
    },
    {
      label: t('services.title'),
      aria: t('services.aria'),
      subItems: [
        {
          label: t('services.webDevelopment.title'),
          // description: t('services.webDevelopment.description'),
          href: '/services/web-development',
          icon: <Laptop />,
        },
        {
          label: t('services.mobileDevelopment.title'),
          // description: t('services.mobileDevelopment.description'),
          href: '/services/mobile-development',
          icon: <Tablet />,
        },
        {
          label: t('services.uiuxDesign.title'),
          // description: t('services.uiuxDesign.description'),
          href: '/services/uiux-design',
          icon: <PenTool />,
        },
        {
          label: t('services.consulting.title'),
          // description: t('services.consulting.description'),
          href: '/services/consulting',
          icon: <Compass />,
        },
      ],
    },
    {
      label: t('aboutUs'),
      href: '/about-us',
      subItems: [],
    },
  ];

  function onSelectionChange(event: Key) {
    const nextLocale = event as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      disableAnimation={true}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      height='5rem'
      maxWidth='xl'
      shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? t('closeNavbarMenu') : t('openNavbarMenu')}
          className='md:hidden'
        />
        <NavbarBrand>
          <Link
            onPress={() => {
              setIsMenuOpen(false);
            }}
            color='foreground'
            href='/'>
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 md:flex' justify='center'>
        {navItems.map((navItem, index) => {
          return navItem.href ?
              <NavbarItem key={index}>
                <Button
                  disableRipple
                  radius='lg'
                  variant='light'
                  className='font-semibold'
                  href={navItem.href}
                  as={Link}>
                  {navItem.label}
                </Button>
              </NavbarItem>
            : <Dropdown
                key={index}
                showArrow
                shouldBlockScroll={false}
                onOpenChange={setIsDropdownOpen}>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      radius='lg'
                      variant='light'
                      className='font-semibold'
                      endContent={
                        isDropdownOpen ?
                          <ChevronUp className='mt-0.5 size-4' />
                        : <ChevronDown className='mt-0.5 size-4' />
                      }>
                      {navItem.label}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu classNames={{ list: 'p-1' }} aria-label={navItem.aria}>
                  <DropdownSection
                    classNames={{
                      group: 'space-y-2',
                      base: 'data-[hover=true]:bg-inherit transition-all duration-200 data-[hover=true]:transition-all data-[hover=true]:duration-200',
                    }}>
                    <>
                      {navItem.subItems.map((subItem) => {
                        return (
                          <DropdownItem
                            href={subItem.href as RouterConfig['href']}
                            startContent={
                              <div className='group rounded-md p-1 transition-all duration-200 group-hover:shadow'>
                                {subItem.icon}
                              </div>
                            }
                            key={subItem.label}>
                            {subItem.label}
                          </DropdownItem>
                        );
                      })}
                    </>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>;
        })}
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden md:flex'>
          <Button
            disableRipple
            as={Link}
            color='primary'
            href='/contact-us'
            variant='shadow'
            radius='lg'>
            {t('callToAction')}
          </Button>
        </NavbarItem>
        <Divider className='hidden h-10 md:block' orientation='vertical' />
        <Dropdown showArrow classNames={{ content: 'min-w-auto' }} shouldBlockScroll={false}>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                aria-label={isMenuOpen ? t('closeLanguageSelector') : t('openLanguageSelector')}
                disableRipple
                radius='lg'
                variant='flat'
                isIconOnly>
                <Languages className='size-5' />
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            onAction={onSelectionChange}
            classNames={{ list: 'flex-row' }}
            aria-label={t('languagesArea')}>
            <DropdownItem className={cn({ 'bg-default-200': locale === 'en' })} key='en'>
              EN
            </DropdownItem>
            <DropdownItem className={cn({ 'bg-default-200': locale === 'ro' })} key='ro'>
              RO
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {navItems.map((navItem, index) => {
          return (
            <NavbarMenuItem key={index}>
              {navItem.href ?
                <Link
                  onPress={() => {
                    setIsMenuOpen(false);
                  }}
                  className='w-full'
                  href={navItem.href as string & RouterConfig['href']}
                  size='lg'>
                  {navItem.label}
                </Link>
              : <Accordion disableAnimation={true} className='px-0'>
                  <AccordionItem
                    classNames={{ trigger: 'py-0', title: 'text-large' }}
                    title={navItem.label}>
                    <div className='ml-2 flex w-full flex-col gap-2'>
                      {navItem.subItems.map((subItem) => {
                        return (
                          <Link
                            onPress={() => {
                              setIsMenuOpen(false);
                            }}
                            href={subItem.href as string & RouterConfig['href']}
                            key={subItem.label}>
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionItem>
                </Accordion>
              }
            </NavbarMenuItem>
          );
        })}
        <NavbarMenuItem className='w-full'>
          <Button
            onPress={() => {
              setIsMenuOpen(false);
            }}
            disableRipple
            as={Link}
            className='mt-6 w-full'
            color='primary'
            href='/contact-us'
            variant='shadow'
            radius='lg'>
            {t('callToAction')}
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
