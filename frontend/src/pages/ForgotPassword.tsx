import Input from '@/components/inputs/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { LogIn as LogInIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Zod schema for validation
const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
});

type ForgotPasswordForm = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New state for success message

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(schema),
  });

  // Mock function to simulate sending a recovery email
  const sendRecoveryEmail = async (email: string) => {
    console.log(email);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    setIsSubmitting(true);
    try {
      await sendRecoveryEmail(data.email); // Mock API call
      setIsSuccess(true);
      toast.success('Recovery email sent successfully');
    } catch (error) {
      toast.error('Failed to send recovery email');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col w-full items-center justify-center pt-4 pb-6 mx-auto h-[80%]'>
      <div className='flex items-center gap-3 mb-4 text-xl md:text-2xl font-semibold text-slate-100'>
        <LogInIcon className='h-5 w-5 md:h-6 md:w-6' strokeWidth='2.5' />
        <span>Forgot Password</span>
      </div>
      <div className='w-full rounded-lg shadow-xl border md:mt-0 sm:max-w-lg xl:p-0 bg-slate-900 border-slate-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          {isSuccess ? (
            <div className='text-center'>
              <h2 className='text-lg font-bold text-slate-100'>
                Recovery link sent successfully!
              </h2>
              <p className='text-slate-400'>
                Please check your email for the recovery link.
              </p>
              <Link
                to={'/login'}
                className='mt-4 inline-block text-blue-500 hover:underline'
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 md:space-y-6'
            >
              <div className='space-y-2 md:space-y-3'>
                <Input
                  {...register('email')}
                  id='email'
                  type='email'
                  label='Email'
                  placeholder='name@company.com'
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span className='text-red-500 text-sm'>
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className='space-y-2'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting
                      ? 'bg-gray-500'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white font-medium rounded-lg px-4 py-2`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Recovery Email'}
                </button>
              </div>

              <div className='space-y-3'>
                <p className='text-sm font-light text-slate-400'>
                  <span className='mr-1.5'>Remember your password?</span>
                  <Link
                    to={'/login'}
                    className='font-medium text-blue-500 hover:underline'
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
