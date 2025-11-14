'use client';
import { FormEvent, PropsWithChildren, useState } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Form } from '@heroui/form';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { RadioGroup, Radio, RadioProps } from '@heroui/radio';
import { Send } from 'lucide-react';
import { ClassNameValue } from 'tailwind-merge';
import { cn } from '@/shared/utils/cn';
import * as z from 'zod';
import { addToast } from '@heroui/toast';
import { sendMail } from '../helpers/sender';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const initialFormState = {
  access_key: 'b437479c-c908-4d3e-83f7-f4552ebe5bf1',
  fromScratch: '',
  projectSize: '',
  timeline: '',
  email: '',
};

export function ContactForm({ className }: { className?: ClassNameValue }) {
  const t = useTranslations('ContactUsPage.contactForm');
  const [formData, setFormData] = useState({ ...initialFormState });
  const [isLoading, setIsLoading] = useState(false);

  const emailSchema = z.email(t('formErrors.email.invalid'));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const submissionData = {
      ...formData,
      subject: `Project Inquiry: ${formData.projectSize} (${formData.timeline})`,
      message: `From Scratch: ${formData.fromScratch}\nProject Size: ${formData.projectSize}\nTimeline: ${formData.timeline}`,
    };

    const success = await sendMail(submissionData);
    if (success) {
      addToast({
        color: 'success',
        title: t('formToast.success.title'),
        description: t('formToast.success.description'),
      });
      setFormData({ ...initialFormState });
    } else {
      addToast({
        color: 'danger',
        title: t('formToast.failure.title'),
        description: t('formToast.failure.description'),
      });
    }

    setIsLoading(false);
  }

  const isEmailValid = emailSchema.safeParse(formData.email).success;
  const canSubmit =
    formData.fromScratch && formData.projectSize && formData.timeline && isEmailValid;

  return (
    <Card className={cn('shadow-default-500 w-full rounded-3xl p-3 shadow sm:p-6', className)}>
      <CardBody>
        <Form onSubmit={onSubmit} className='space-y-8'>
          <QuestionContainer
            isAnimated={false}
            isCompleted={!!formData.fromScratch}
            title={t('questions.fromScratch.title')}>
            <RadioGroup
              orientation='horizontal'
              classNames={{ wrapper: 'gap-3' }}
              value={formData.fromScratch}
              onValueChange={(value) => setFormData({ ...formData, fromScratch: value })}>
              <CustomRadio value='yes'>{t('questions.fromScratch.options.yes')}</CustomRadio>
              <CustomRadio value='no'>{t('questions.fromScratch.options.no')}</CustomRadio>
            </RadioGroup>
          </QuestionContainer>

          {formData.fromScratch && (
            <QuestionContainer
              isCompleted={!!formData.projectSize}
              title={t('questions.projectSize.title')}>
              <RadioGroup
                orientation='horizontal'
                classNames={{ wrapper: 'gap-3' }}
                value={formData.projectSize}
                onValueChange={(value) => setFormData({ ...formData, projectSize: value })}>
                <CustomRadio value='small'>{t('questions.projectSize.options.small')}</CustomRadio>
                <CustomRadio value='complex'>
                  {t('questions.projectSize.options.complex')}
                </CustomRadio>
              </RadioGroup>
            </QuestionContainer>
          )}

          {formData.projectSize && (
            <QuestionContainer
              isCompleted={!!formData.timeline}
              title={t('questions.timeline.title')}>
              <RadioGroup
                orientation='horizontal'
                classNames={{ wrapper: 'gap-3' }}
                value={formData.timeline}
                onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                <CustomRadio value='short'>{t('questions.timeline.options.short')}</CustomRadio>
                <CustomRadio value='long'>{t('questions.timeline.options.long')}</CustomRadio>
              </RadioGroup>
            </QuestionContainer>
          )}

          {formData.timeline && (
            <QuestionContainer isCompleted={isEmailValid} title={t('questions.contactInfo.title')}>
              <Input
                variant='faded'
                radius='lg'
                name='email'
                type='email'
                label={t('formLabels.email')}
                size='sm'
                className='max-w-96'
                value={formData.email}
                isInvalid={!!(formData.email && !isEmailValid)}
                errorMessage={() =>
                  !isEmailValid && (
                    <ul>
                      <li>{t('formErrors.email.invalid')}</li>
                    </ul>
                  )
                }
                onValueChange={(value) => setFormData({ ...formData, email: value })}
              />
            </QuestionContainer>
          )}

          {formData.timeline && (
            <div className='flex justify-end'>
              <Button
                isLoading={isLoading}
                isDisabled={!canSubmit}
                color='primary'
                endContent={<Send className='size-[1.25em]' />}
                radius='lg'
                variant='faded'
                type='submit'>
                {t('sendMessage')}
              </Button>
            </div>
          )}
        </Form>
      </CardBody>
    </Card>
  );
}

function QuestionContainer({
  isAnimated = true,
  title,
  isCompleted,
  children,
}: PropsWithChildren<{ title: string; isCompleted: boolean; isAnimated?: boolean }>) {
  return (
    <motion.div
      {...(isAnimated && {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: 'easeOut' },
      })}
      className='relative w-full space-y-3 sm:ml-3'>
      <div
        className={cn(
          'bg-default-500 absolute right-0 -left-6 hidden h-full w-1 rounded-md transition-all duration-300 ease-in sm:block',
          {
            'bg-primary-500': isCompleted,
          },
        )}></div>
      <h3 className='text-lg font-bold'>{title}</h3>
      {children}
    </motion.div>
  );
}

function CustomRadio(props: RadioProps) {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'group bg-default-200 hover:bg-default-300 m-0 inline-flex cursor-pointer items-center justify-center',
          'rounded-2xl border-2 border-transparent px-3 py-1.5 transition-colors',
          'data-[selected=true]:bg-primary-500',
        ),
        wrapper: 'hidden',
        labelWrapper: 'm-0',
        label: cn('text-sm font-medium', 'group-data-[selected=true]:text-white'),
      }}>
      {children}
    </Radio>
  );
}
