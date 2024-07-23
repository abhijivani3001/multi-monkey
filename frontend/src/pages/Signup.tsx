import { signupUser } from '@/api/users/user.api';
import Input from '@/components/inputs/Input';
import { IUserError, IUserResponse } from '@/interfaces/response/user.response';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRoundPlus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string().trim().min(1, { message: 'Name is required' }).max(255),
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    const res: IUserResponse = await signupUser({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    if (res.success) {
      toast.success(res.message);

      // clear field values
      reset();
    } else {
      const { field, value, message } = res as IUserError;

      if (
        field &&
        value &&
        ['name', 'email', 'password', 'confirmPassword'].includes(
          field as keyof SignupForm
        )
      ) {
        setError(field as keyof SignupForm, {
          type: 'manual',
          message: message,
        });
      }
      toast.error(message);
    }
  };

  return (
    <div className='flex flex-col w-full items-center justify-center pt-4 pb-6 mx-auto'>
      <div className='flex items-center gap-3 mb-4 text-xl md:text-2xl font-semibold text-slate-100'>
        <UserRoundPlus className='h-5 w-5 md:h-6 md:w-6' strokeWidth='2.5' />
        <span>Sign up</span>
      </div>
      <div className='w-full rounded-lg shadow-xl border md:mt-0 sm:max-w-lg xl:p-0 bg-slate-900 border-slate-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 md:space-y-6'
          >
            <div className='space-y-2 md:space-y-3'>
              <Input
                {...register('name')}
                id='name'
                type='text'
                label='Name'
                placeholder='John Doe'
              />
              <span className={`${errors.name ? 'error-msg' : ''}`}>
                {errors.name ? errors.name.message : <>&nbsp;</>}
              </span>
              <Input
                {...register('email')}
                id='email'
                type='email'
                label='Email'
                placeholder='name@company.com'
              />
              <span className={`${errors.email ? 'error-msg' : ''}`}>
                {errors.email ? errors.email.message : <>&nbsp;</>}
              </span>
              <Input
                {...register('password')}
                id='password'
                type='password'
                label='Password'
                placeholder='••••••••'
              />
              <span className={`${errors.password ? 'error-msg' : ''}`}>
                {errors.password ? errors.password.message : <>&nbsp;</>}
              </span>
              <Input
                {...register('confirmPassword')}
                id='confirmPassword'
                type='password'
                label='Confirm Password'
                placeholder='••••••••'
              />
              <span className={`${errors.confirmPassword ? 'error-msg' : ''}`}>
                {errors.confirmPassword ? (
                  errors.confirmPassword.message
                ) : (
                  <>&nbsp;</>
                )}
              </span>
            </div>

            <div className='space-y-3'>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`${isSubmitting ? 'btn-disabled' : 'btn'} w-full`}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
