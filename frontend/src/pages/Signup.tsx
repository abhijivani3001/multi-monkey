import Input from '@/components/inputs/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const schema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, { message: 'Username is required' })
      .max(255),
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(255, { message: 'Password must be at most 255 characters long' }),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Password confirmation must be at least 8 characters long',
      })
      .max(255, {
        message: 'Password confirmation must be at most 255 characters long',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupForm = z.infer<typeof schema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      console.log(data);
      // Simulate an error if needed
      // throw new Error();
    } catch (error) {
      setError('username', {
        type: 'manual',
        message: 'Username is already taken',
      });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center px-6 pt-2 pb-6 mx-auto'>
      <div className='flex items-center mb-4 text-2xl font-semibold text-slate-100'>
        <img
          className='w-10 h-10 mr-2'
          src='/logos/logo-base-1200x1200.png'
          alt='logo'
        />
        <span>Sign up</span>
      </div>
      <div className='w-full rounded-lg shadow-xl border md:mt-0 sm:max-w-lg xl:p-0 bg-slate-900 border-slate-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-slate-100'>
            Create your account
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 md:space-y-6'
          >
            <Input
              {...register('username')}
              id='username'
              type='text'
              label='Username'
              placeholder='john123'
            />
            {errors.username && (
              <span className='text-sm text-rose-500'>
                {errors.username.message}
              </span>
            )}
            <Input
              {...register('email')}
              id='email'
              type='email'
              label='Email'
              placeholder='name@company.com'
            />
            {errors.email && (
              <span className='text-sm text-rose-500'>
                {errors.email.message}
              </span>
            )}
            <Input
              {...register('password')}
              id='password'
              type='password'
              label='Password'
              placeholder='••••••••'
            />
            {errors.password && (
              <span className='text-sm text-rose-500'>
                {errors.password.message}
              </span>
            )}
            <Input
              {...register('confirmPassword')}
              id='confirmPassword'
              type='password'
              label='Confirm Password'
              placeholder='••••••••'
            />
            {errors.confirmPassword && (
              <span className='text-sm text-rose-500'>
                {errors.confirmPassword.message}
              </span>
            )}

            <button
              type='submit'
              disabled={isSubmitting}
              className='btn w-full'
            >
              {isSubmitting ? 'Loading...' : 'Sign up'}
            </button>

            <p className='text-sm font-light text-slate-400'>
              <span className='mr-1.5'>Already have an account?</span>
              <Link
                to='/login'
                className='font-medium text-primary-600 hover:underline text-primary-500'
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
