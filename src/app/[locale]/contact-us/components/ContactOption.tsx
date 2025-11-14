import { Chip } from '@heroui/chip';
import { ReactNode } from 'react';

export function ContactOption({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon: ReactNode;
}) {
  return (
    <div className='shadow-default-500 flex w-full items-center gap-4 rounded-2xl p-4 shadow sm:gap-6'>
      <Chip
        size='md'
        radius='lg'
        variant='light'
        className='flex size-12 shrink-0 items-center justify-center'>
        {icon}
      </Chip>
      <div className='flex min-w-0 flex-col'>
        <h3 className='font-headline font-semibold text-nowrap sm:text-lg'>{title}</h3>
        <p className='text-default-700 text-sm break-all sm:text-base'>{content}</p>
      </div>
    </div>
  );
}
