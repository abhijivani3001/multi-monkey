import { useAuthContext } from '@/context/Auth/AuthContext';
import { LogOut, User2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setIsAuth } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    // await account.deleteSession('current');

    localStorage.removeItem('token');
    setIsAuth(false);
    navigate('/login', { replace: true });
    toast.success('Logged out successfully');
  };

  return (
    <nav className='z-30 w-full sticky top-0 backdrop-blur-lg'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto px-8 py-4 md:p-4 my-auto'>
        <Link
          to={'/'}
          className='flex focus:outline-none items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src='/logos/logo-base-1200x1200.png'
            className='h-10 w-10 md:h-12 md:w-12 object-contain'
          />
          <span className='hidden md:block font-poppins self-center text-3xl md:text-4xl my-auto font-semibold whitespace-nowrap'>
            <span className='text-white'>multi</span>
            <span className='bg-gradient-to-r from-blue-300 to-sky-300 bg-clip-text text-transparent'>
              monkey
            </span>
          </span>
        </Link>
        <div className='flex md:order-2 gap-4 text-slate-400'>
          <Link
            to={'/profile'}
            className='relative w-full hover:text-slate-100'
          >
            <User2 className='h-6 w-6' />
          </Link>
          <button
            onClick={logoutHandler}
            className='relative w-full hover:text-slate-100'
          >
            <LogOut className='h-6 w-6' />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
