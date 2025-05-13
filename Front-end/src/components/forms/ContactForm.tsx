import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import debounce from 'lodash/debounce';

// Enhanced form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s-]{10,}$/.test(val),
      { message: 'Invalid phone number' }
    ),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(700)
    .refine(
      (val) => {
        const negativeWords = ['hate', 'terrible', 'awful'];
        return !negativeWords.some((word) => val.toLowerCase().includes(word));
      },
      { message: 'Please use positive language' }
    ),
});

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
    message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = '' }) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    mode: 'onChange', // Enable real-time validation
  });

  const { errors, isSubmitting } = useFormState({ control: form.control });

  // Focus on first invalid field on submit failure
  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      const firstErrorField = Object.keys(errors)[0] as keyof ContactFormData;
      form.setFocus(firstErrorField);
    }
  }, [form.formState.isSubmitSuccessful, errors, form]);

  // Create debounced submit function
  const debouncedSubmit = React.useMemo(
    () =>
      debounce(async (data: ContactFormData) => {
        try {
          await onSubmit(data);
          toast({
            title: 'Success',
            description: 'Your message has been sent successfully!',
          });
          form.reset();
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to send your message. Please try again.',
            variant: 'destructive',
          });
        }
      }, 300),
    [onSubmit, toast, form]
  );

  // Submit handler
  const handleSubmit = React.useCallback(
    (data: ContactFormData) => {
      debouncedSubmit(data);
    },
    [debouncedSubmit]
  );

  // Animation variants for fields
  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
    error: {
      x: [0, -10, 10, -10, 0],
      transition: { duration: 0.3 },
    },
  };

  // Button loading animation
  const buttonVariants = {
    idle: { scale: 1 },
    loading: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={`max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      role="form"
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title" className="text-2xl font-semibold text-blue-600 mb-6">
        Contact Us
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
          noValidate // Prevent browser validation
        >
          {['name', 'email', 'phone', 'message'].map((fieldName, index) => (
            <motion.div
              key={fieldName}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
            >
              <FormField
                control={form.control}
                name={fieldName as keyof ContactFormData}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{fieldName}</FormLabel>
                    <FormControl>
                      {fieldName === 'message' ? (
                        <div className="relative">
                          <Textarea
                            placeholder={`Your ${fieldName}`}
                            rows={isMobile ? 4 : 5}
                            {...field}
                            className="focus:ring-blue-600 resize-y"
                            disabled={isSubmitting}
                            aria-invalid={!!errors[fieldName]}
                            aria-describedby={`${fieldName}-error`}
                          />
                          <div className="text-sm text-blue-600 mt-1">
                            {field.value.length}/700
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          animate={errors[fieldName] ? 'error' : 'idle'}
                          variants={fieldVariants}
                        >
                          <Input
                            type={fieldName === 'email' ? 'email' : fieldName === 'phone' ? 'tel' : 'text'}
                            placeholder={`Your ${fieldName}`}
                            {...field}
                            className="focus:ring-blue-600"
                            disabled={isSubmitting}
                            aria-invalid={!!errors[fieldName]}
                            aria-describedby={`${fieldName}-error`}
                          />
                        </motion.div>
                      )}
                    </FormControl>
                    <AnimatePresence>
                      {errors[fieldName] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FormMessage id={`${fieldName}-error`} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </FormItem>
                )}
              />
            </motion.div>
          ))}
          <motion.div
            variants={buttonVariants}
            animate={isSubmitting ? 'loading' : 'idle'}
          >
            <Button
              type="submit"
              disabled={isSubmitting || !form.formState.isValid}
              className="w-full bg-blue-600 hover:bg-blue-600 text-white flex items-center justify-center"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
      <div aria-live="polite" className="sr-only">
        {isSubmitting ? 'Submitting form...' : form.formState.isSubmitSuccessful ? 'Form submitted successfully.' : ''}
      </div>
    </motion.div>
  );
};

export default React.memo(ContactForm);