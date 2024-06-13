import { Link } from 'react-router-dom';

const Navbar = () => {
  const isShortcutLabelShown = true;

  return (
    <nav className='border-gray-800 bg-gray-900 z-30 w-full shadow-lg sticky top-0'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto p-4 my-auto'>
        <Link
          to={'/'}
          className='flex focus:outline-none items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src='/logos/logo-base-1200x1200.png'
            className='h-12 w-12 object-contain'
          />
          <span className='hidden md:block self-center text-3xl my-auto font-semibold whitespace-nowrap text-gray-100'>
            Starter
            <span className='bg-gradient-to-r from-indigo-400 to-sky-300 bg-clip-text text-transparent'>
              Project
            </span>
          </span>
        </Link>
        <div className='flex md:order-2 md:w-[22rem]'>
          <div className='relative w-full'>
            <div className='absolute inset-y-0 start-0 flex items-center justify-between w-full ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span className='sr-only'>Search icon</span>

              {/* short-cut label */}
              {isShortcutLabelShown && (
                <div className='hidden text-sm md:flex items-center gap-1 mr-2'>
                  <div className='text-gray-400 border rounded-lg border-gray-500 px-2 py-0 leading-6 bg-gray-800 bg-opacity-40'>
                    Ctrl
                  </div>
                  <div className='text-gray-400 my-auto'>+</div>
                  <div className='text-gray-400 border rounded-lg border-gray-500 px-2 py-0 leading-6 bg-gray-800 bg-opacity-40'>
                    Shift
                  </div>
                  <div className='text-gray-400 my-auto'>+</div>
                  <div className='text-gray-400 border rounded-lg border-gray-500 px-2 py-0 leading-6 bg-gray-800 bg-opacity-40'>
                    E
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type='text'
                id='search-navbar'
                // ref={searchInputRef}
                className='block w-full p-2 ps-10 pe-5 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none'
                placeholder='Search'
                // onChange={handleSearch}
                // onFocus={handleFocusBlur}
                // onBlur={handleFocusBlur}
                autoComplete='off'
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
