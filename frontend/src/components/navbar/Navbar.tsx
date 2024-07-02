import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='z-30 w-full sticky top-0 backdrop-blur-lg'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto px-8 py-4 md:p-4 my-auto'>
        <Link
          to={'/'}
          className='flex focus:outline-none items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src='/logos/logo-base-1200x1200.png'
            className='h-8 w-8 md:h-12 md:w-12 object-contain'
          />
          <span className='hidden md:block self-center text-3xl my-auto font-semibold whitespace-nowrap'>
            <span className='text-white'>Multi</span>
            <span className='bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent'>
              Monkey
            </span>
          </span>
        </Link>
        <div className='flex md:order-2 gap-4 text-slate-400'>
          <Link
            to={'/profile'}
            className='relative w-full hover:text-slate-100'
          >
            username
          </Link>
          <div className='relative w-full'>logout</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
