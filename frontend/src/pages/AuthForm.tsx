import AuthSocialButton from '@/components/AuthSocialButton';
import Input from '@/components/inputs/Input';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { BsGithub, BsGoogle } from 'react-icons/bs';

type AuthFormVariant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<AuthFormVariant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'
    );
  }, [setVariant]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/register', {
        email,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log('ERROR:', error);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:my-10 my-4 lg:py-0'>
        <div className='flex items-center mb-6 text-2xl font-semibold text-gray-100'>
          <img
            className='w-10 h-10 mr-2'
            src='/logos/logo-base-1200x1200.png'
            alt='logo'
          />
          {variant === 'LOGIN' && <span>Login</span>}
          {variant === 'REGISTER' && <span>Register</span>}
        </div>
        <div className='w-full rounded-lg shadow-xl border md:mt-0 sm:max-w-lg xl:p-0 bg-gray-900 border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-100'>
              {variant === 'LOGIN' && <span>Sign in to your account</span>}
              {variant === 'REGISTER' && <span>Create your account</span>}
            </h1>
            <form onSubmit={submitHandler} className='space-y-4 md:space-y-6'>
              {variant === 'REGISTER' && (
                <Input
                  id='name'
                  type='text'
                  label='Name'
                  placeholder='John'
                  required={true}
                  disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              {variant === 'REGISTER' && (
                <Input
                  id='username'
                  type='text'
                  label='Username'
                  placeholder='john123'
                  required={true}
                  disabled={isLoading}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
              <Input
                id='email'
                type='email'
                label='Email'
                placeholder='name@company.com'
                disabled={isLoading}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id='password'
                type='password'
                label='Password'
                placeholder='••••••••'
                disabled={isLoading}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />

              {variant === 'REGISTER' && (
                <Input
                  id='confirm-password'
                  type='password'
                  label='Confirm Password'
                  placeholder='••••••••'
                  disabled={isLoading}
                  required={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}

              {variant === 'LOGIN' && (
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='remember'
                        aria-describedby='remember'
                        type='checkbox'
                        className='w-4 h-4 border rounded focus:ring-1 border-gray-600 focus:outline-none focus:border'
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label htmlFor='remember' className='text-gray-300'>
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href='#'
                    className='text-sm font-medium text-gray-300 hover:underline text-primary-500'
                  >
                    Forgot password?
                  </a>
                </div>
              )}
              {variant === 'LOGIN' && (
                <button type='submit' className='btn w-full'>
                  Sign in
                </button>
              )}
              {variant === 'REGISTER' && (
                <button type='submit' className='btn w-full'>
                  Sign up
                </button>
              )}

              {/* google auth */}
              <div className='mt-6'>
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-700' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='bg-gray-900 px-2 text-gray-500'>
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className='mt-6 flex gap-2'>
                  <AuthSocialButton icon={BsGithub} onclick={() => {}} />
                  <AuthSocialButton icon={BsGoogle} onclick={() => {}} />
                </div>
              </div>

              {/* change variant */}
              <p className='text-sm font-light text-gray-400'>
                <span className='mr-1.5'>
                  {variant === 'REGISTER'
                    ? 'Already have an account?'
                    : "Don't have an account yet?"}
                </span>
                <button
                  onClick={toggleVariant}
                  className='font-medium text-primary-600 hover:underline text-primary-500'
                >
                  {variant === 'REGISTER' ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
