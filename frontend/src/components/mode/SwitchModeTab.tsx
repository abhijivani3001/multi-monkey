import VerticalDivider from '../divider/VerticalDivider';

const SwitchModeTab = () => {
  return (
    <>
      <div className='my-4 bg-slate-900 text-slate-500 w-fit mx-auto px-6 py-2 rounded-lg shadow-md'>
        <div className='hidden md:flex justify-center items-center gap-6'>
          {/* difficulty */}
          <div className='flex justify-center items-center gap-4'>
            <button>punctuation</button>
            <button>numbers</button>
          </div>
          <VerticalDivider />
          <div className='flex justify-center items-center gap-4'>
            <button>time</button>
            <button>words</button>
            <button>quote</button>
          </div>
          <VerticalDivider />
          <div className='flex justify-center items-center gap-4'>
            <button>15</button>
            <button>30</button>
            <button>60</button>
            <button>120</button>
          </div>
        </div>

        <div className='md:hidden'>
          <div>
            <button>Test settings</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwitchModeTab;
