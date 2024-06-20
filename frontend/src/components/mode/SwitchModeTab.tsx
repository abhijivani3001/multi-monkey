import { MdAccessTimeFilled } from 'react-icons/md';
import VerticalDivider from '../divider/VerticalDivider';
import { RxLetterCaseCapitalize } from 'react-icons/rx';
import { FaQuoteLeft } from 'react-icons/fa';
import { AtSign, Hash } from 'lucide-react';
import { useTypingModeContext } from '@/context/TypingModeContext';

const SwitchModeTab = () => {
  const { typingMode, setTypingMode } = useTypingModeContext();
  console.log(typingMode);

  return (
    <>
      <div className='my-4 bg-slate-900 text-slate-500 w-fit mx-auto px-6 py-2 rounded-lg shadow-md'>
        <div className='hidden md:flex justify-center items-center gap-6'>
          {/* difficulty */}
          <div className='flex justify-center items-center gap-6'>
            <button className='btn2'>
              <div>
                <AtSign className='h-4 w-4' />
              </div>
              <div>punctuation</div>
            </button>
            <button className='btn2'>
              <div>
                <Hash className='h-4 w-4' />
              </div>
              <div>numbers</div>
            </button>
          </div>
          <VerticalDivider />

          {/* different modes */}
          <div className='flex justify-center items-center gap-6'>
            <button
              className={`btn2 ${
                typingMode.mode === 'time' ? 'text-sky-400' : ''
              }`}
              onClick={() => {
                setTypingMode({ mode: 'time' });
              }}
            >
              <div>
                <MdAccessTimeFilled />
              </div>
              <div>time</div>
            </button>
            <button
              className={`btn2 ${
                typingMode.mode === 'words' ? 'text-sky-400' : ''
              }`}
              onClick={() => {
                setTypingMode({ mode: 'words' });
              }}
            >
              <div>
                <RxLetterCaseCapitalize className='h-5 w-5' />
              </div>
              <div>words</div>
            </button>
            <button
              className={`btn2 ${
                typingMode.mode === 'quote' ? 'text-sky-400' : ''
              }`}
              onClick={() => {
                setTypingMode({ mode: 'quote' });
              }}
            >
              <div>
                <FaQuoteLeft />
              </div>
              <div>quote</div>
            </button>
          </div>
          <VerticalDivider />

          {/* numeric values */}
          <div className='flex justify-center items-center gap-4'>
            <button className='btn2'>15</button>
            <button className='btn2'>30</button>
            <button className='btn2'>60</button>
            <button className='btn2'>120</button>
          </div>
        </div>

        <div className='md:hidden'>
          <div>
            <button className='btn2'>Test settings</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwitchModeTab;
