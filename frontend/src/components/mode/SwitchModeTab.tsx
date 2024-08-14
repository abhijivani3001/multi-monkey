import { MdAccessTimeFilled } from 'react-icons/md';
import VerticalDivider from '../divider/VerticalDivider';
import { RxLetterCaseCapitalize } from 'react-icons/rx';
import { AtSign, Hash } from 'lucide-react';
import { useTypingModeContext } from '@/context/TypingMode/TypingModeContext';
import { useIsTypingContext } from '@/context/IsTyping/IsTypingContext';

const SwitchModeTab = () => {
  const { typingMode, setTypingMode } = useTypingModeContext();
  const { isTyping } = useIsTypingContext();

  const timeModeValues = [15, 30, 60, 120];
  const wordsModeValues = [10, 25, 50, 100];

  return (
    <>
      <div className='min-h-20 flex justify-center items-center'>
        {!isTyping && (
          <div className='my-4 bg-slate-900 text-slate-500 w-fit mx-auto px-6 py-2 rounded-lg shadow-md'>
            <div className='hidden lg:flex justify-center items-stretch gap-6'>
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
                    typingMode.type === 'time' ? 'text-sky-400' : ''
                  }`}
                  onClick={() => {
                    setTypingMode({ type: 'time', value: timeModeValues[0] });
                  }}
                >
                  <div>
                    <MdAccessTimeFilled />
                  </div>
                  <div>time</div>
                </button>
                <button
                  className={`btn2 ${
                    typingMode.type === 'words' ? 'text-sky-400' : ''
                  }`}
                  onClick={() => {
                    setTypingMode({ type: 'words', value: wordsModeValues[0] });
                  }}
                >
                  <div>
                    <RxLetterCaseCapitalize className='h-5 w-5' />
                  </div>
                  <div>words</div>
                </button>
              </div>
              <VerticalDivider />

              {/* numeric values */}
              <div className='flex justify-center items-center gap-4'>
                {typingMode.type === 'time' &&
                  timeModeValues.map((item) => (
                    <button
                      key={item}
                      className={`btn2 ${
                        item === typingMode.value ? 'text-sky-400' : ''
                      }`}
                      onClick={(e) => {
                        e.currentTarget.blur();
                        setTypingMode({ ...typingMode, value: item });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                {typingMode.type === 'words' &&
                  wordsModeValues.map((item) => (
                    <button
                      key={item}
                      className={`btn2 ${
                        item === typingMode.value ? 'text-sky-400' : ''
                      }`}
                      onClick={(e) => {
                        e.currentTarget.blur();
                        setTypingMode({ ...typingMode, value: item });
                      }}
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>

            <div className='lg:hidden'>
              <div>
                <button className='btn2'>Test settings</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SwitchModeTab;
