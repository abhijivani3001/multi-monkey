import React, { useCallback, useEffect, useState } from 'react';
import generateRandomText  from '@/utils/generateRandomWords';
import { VscDebugRestart } from 'react-icons/vsc';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useTypingModeContext } from '@/context/TypingMode/TypingModeContext';
import { useIsTypingContext } from '@/context/IsTyping/IsTypingContext';
import { postScore } from '@/api/score/score.api';
import { IScore } from '@/interfaces/score';
import { useAuthContext } from '@/context/Auth/AuthContext';
import toast from 'react-hot-toast';
import { typingModes } from '@/constants/typingMode.constant';

const TextArea = () => {
  const { typingMode } = useTypingModeContext();
  const { isTyping, setIsTyping } = useIsTypingContext();
  const { isAuth, user } = useAuthContext();

  // main:
  const [words, setWords] = useState<JSX.Element[]>([]);
  const [currIdx, setCurrIdx] = useState(0); // position of current word
  const [currPos, setCurrPos] = useState(0); // position of current char in word
  const [rawWords, setRawWords] = useState<string[]>([]); // generated words array
  const [lastTypedCharPosition, setLastTypedCharPosition] = useState<number[]>(
    []
  ); // index position of word before user switched to the next word

  // user typing:
  const [typedChars, setTypedChars] = useState<string>('');
  const [typedWords, setTypedWords] = useState<string[]>([]);

  // timer in seconds:
  const [timeLeft, setTimeLeft] = useState<number>(
    typeof typingMode.value === 'number' ? typingMode.value : 10
  );

  // score:
  const [totalCharsTyped, setTotalCharsTyped] = useState<number>(0); // including spaces, special characters, numbers, etc.
  const [uncorrectedErrors, setUncorrectedErrors] = useState<number>(0); // wrong characters typed
  const [uncorrectedErrorsIndexes, setUncorrectedErrorsIndexes] = useState<
    number[][]
  >([]); // indexes of wrong characters typed
  const [rawWpmOfEachSecond, setRawWpmOfEachSecond] = useState<number[]>([]); // wpm of (all typed characters / 5) for each second
  const [netWpmOfEachSecond, setNetWpmOfEachSecond] = useState<number[]>([]); // wpm of (all typed characters / 5 - uncorrected errors) for each second
  const [accuracy, setAccuracy] = useState(0); // (correct words / total words typed) * 100

  const updateClassName = (className: string, newBorderClass: string) => {
    return className
      .split(' ')
      .filter((cls: string) => !cls.startsWith('border-'))
      .concat(newBorderClass)
      .join(' ');
  };

  const isAllowedKey = (key: string) => {
    // Regular expression for allowed characters (alphanumeric and special characters)
    const regex = /^[a-zA-Z0-9~`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]$/;
    return regex.test(key);
  };


const generateWords = () => {
  let wordsToBeGenerated = 100;
  if (typingMode.type === typingModes.WORDS_MODE) {
    wordsToBeGenerated = typingMode.value;
  }

  let arr = generateRandomText(wordsToBeGenerated, typingMode.enableNumbers, typingMode.enablePunctuation);
  
  if (typeof arr === 'string') arr = (arr as string).split(' ');

  setRawWords(arr);

  const ans = arr.map((word, index) => (
    <span key={index}>
      {word.split('').map((letter, letterIndex) => (
        <span
          key={letterIndex}
          className={`${
            index === 0 && letterIndex === 0 ? 'border-b-white' : ''
          }`}
        >
          {letter}
        </span>
      ))}{' '}
    </span>
  ));
  setWords(ans);

  setCurrIdx(0);
  setCurrPos(0);
  setLastTypedCharPosition([]);
  setTimeLeft(typeof typingMode.value === 'number' ? typingMode.value : 10); // reset timer
  setIsTyping(false); // stop typing
  setTotalCharsTyped(0);
  setUncorrectedErrors(0);
  setUncorrectedErrorsIndexes([]);
  setRawWpmOfEachSecond([]);
  setNetWpmOfEachSecond([]);
  setAccuracy(0);
  setTypedChars('');
  setTypedWords([]);
};

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const keyPressed = e.key;

      if (timeLeft === 0) return;

      // ----- space event -----
      if (keyPressed === ' ') {
        setLastTypedCharPosition((prev) => [...prev, currPos]);

        setTotalCharsTyped((prev) => prev + 1);

        const newIdx = currIdx + 1;

        setCurrIdx((prevIdx) => {
          const newIdx = prevIdx + 1;
          setCurrPos(0); // Reset current character position to start of the next word
          return newIdx;
        });

        setWords((prevWords) => {
          return prevWords.map((wordElement, index) => {
            if (index !== newIdx) {
              if (index === newIdx - 1) {
                // update styles for prev word - remove border style
                const prevWord = wordElement.props.children[0];
                const updatedPrevWord = rawWords[index]
                  .split('')
                  .map((_letter, letterIndex) => {
                    return React.cloneElement(prevWord[letterIndex], {
                      className: updateClassName(
                        prevWord[letterIndex].props.className,
                        'border-none'
                      ),
                    });
                  });
                return <span key={index}>{updatedPrevWord} </span>;
              }
              return wordElement;
            }

            // Update styles for the newly selected word
            const updatedWord = rawWords[index]
              .split('')
              .map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className={letterIndex === 0 ? 'border-b-white' : ''}
                >
                  {letter}
                </span>
              ));
            return <span key={index}>{updatedWord} </span>;
          });
        });

        setTypedWords((prev) => [...prev, typedChars]);
        setTypedChars('');
        return;
      }

      // ----- backspace event -----
      if (keyPressed === 'Backspace') {
        if (currIdx === 0 && currPos === 0) {
          return;
        }

        setTotalCharsTyped((prev) => prev - 1);

        if (currPos > 0) {
          setWords((prevWords) => {
            return prevWords.map((wordElement, index) => {
              if (currIdx !== index) {
                return wordElement;
              }

              const currWord = wordElement.props.children[0];

              const updatedWord = rawWords[index]
                .split('')
                .map((letter, letterIndex) => {
                  if (currPos === letterIndex + 1) {
                    return (
                      <span key={letterIndex} className='border-b-white'>
                        {letter}
                      </span>
                    );
                  }
                  return React.cloneElement(currWord[letterIndex], {
                    // update styles
                    className: updateClassName(
                      currWord[letterIndex].props.className,
                      'border-none'
                    ),
                  });
                });

              return (
                <span className='' key={index}>
                  {updatedWord}{' '}
                </span>
              );
            });
          });

          if (
            uncorrectedErrorsIndexes.length > 0 &&
            uncorrectedErrorsIndexes[uncorrectedErrorsIndexes.length - 1][0] ===
              currIdx &&
            uncorrectedErrorsIndexes[uncorrectedErrorsIndexes.length - 1][1] ===
              currPos - 1
          ) {
            setUncorrectedErrors((prev) => prev - 1);
            setUncorrectedErrorsIndexes((prev) => prev.slice(0, -1));
          }

          setCurrPos((prevPos) => prevPos - 1);
          setTypedChars((prev) => prev.slice(0, -1));

          return;
        }

        // currPos===0
        setWords((prevWords) => {
          return prevWords.map((wordElement, index) => {
            if (index === currIdx - 1) {
              const currWord = wordElement.props.children[0];

              const updatedWord = rawWords[index]
                .split('')
                .map((letter, letterIndex) => {
                  if (
                    letterIndex ===
                    lastTypedCharPosition[lastTypedCharPosition.length - 1]
                  ) {
                    return (
                      <span key={letterIndex} className='border-b-white'>
                        {letter}
                      </span>
                    );
                  }
                  return React.cloneElement(currWord[letterIndex], {
                    // update styles
                    className: updateClassName(
                      currWord[letterIndex].props.className,
                      'border-none'
                    ),
                  });
                });

              return (
                <span className='' key={index}>
                  {updatedWord}
                  <span
                    className={`${
                      lastTypedCharPosition[
                        lastTypedCharPosition.length - 1
                      ] === rawWords[index].length
                        ? 'border-b-white'
                        : ''
                    }`}
                  >
                    {' '}
                  </span>
                </span>
              );
            }
            if (index === currIdx) {
              const currWord = wordElement.props.children[0];

              const updatedWord = rawWords[index]
                .split('')
                .map((_letter, letterIndex) => {
                  return React.cloneElement(currWord[letterIndex], {
                    // update styles
                    className: updateClassName(
                      currWord[letterIndex].props.className,
                      'border-none'
                    ),
                  });
                });

              return (
                <span className='' key={index}>
                  {updatedWord}{' '}
                </span>
              );
            }
            return wordElement;
          });
        });

        setCurrPos(lastTypedCharPosition[lastTypedCharPosition.length - 1]);
        setCurrIdx((prevIdx) => prevIdx - 1);
        setLastTypedCharPosition((prevArr) => prevArr.slice(0, -1));
        setTypedWords((prev) => prev.slice(0, -1));

        return;
      }

      // ----- other keys -----
      const isOtherKey = e.ctrlKey || e.altKey || e.metaKey; // Check for ctrl, alt, meta key combinations with other keys

      if (isOtherKey || !isAllowedKey(keyPressed)) {
        return;
      }

      // extra characters typed more than original size of word
      if (currPos === rawWords[currIdx].length) {
        return;
      }

      if (!isTyping && isAllowedKey(keyPressed)) {
        setIsTyping(true); // Start the timer on first valid key press
      }

      // ----- update character(alphanumeric or special characters) -----
      setWords((prevWords) => {
        return prevWords.map((wordElement, index) => {
          if (currIdx !== index) {
            if (index === currIdx - 1) {
              // update styles for prev word - remove border style
              const prevWord = wordElement.props.children[0];
              const updatedPrevWord = rawWords[index]
                .split('')
                .map((_letter, letterIndex) => {
                  return React.cloneElement(prevWord[letterIndex], {
                    className: updateClassName(
                      prevWord[letterIndex].props.className,
                      'border-none'
                    ),
                  });
                });
              return <span key={index}>{updatedPrevWord} </span>;
            }
            return wordElement;
          }

          const currWord = wordElement.props.children[0];

          const updatedWord = rawWords[index]
            .split('')
            .map((letter, letterIndex) => {
              if (currPos === letterIndex - 1) {
                return (
                  <span key={letterIndex} className='border-b-white'>
                    {letter}
                  </span>
                );
              }

              if (currPos !== letterIndex) {
                return React.cloneElement(currWord[letterIndex], {
                  // update styles
                  className: updateClassName(
                    currWord[letterIndex].props.className,
                    'border-none'
                  ),
                });
              }

              return (
                <span
                  key={letterIndex}
                  className={`${
                    letter === keyPressed ? 'text-white' : 'text-red-500'
                  }`}
                >
                  {letter}
                </span>
              );
            });

          return (
            <span key={index}>
              {updatedWord}
              <span
                className={`${
                  currPos === wordElement.props.children[0].length - 1
                    ? 'border-b-white'
                    : ''
                }`}
              >
                {' '}
              </span>
            </span>
          );
        });
      });

      if (keyPressed !== rawWords[currIdx][currPos]) {
        setUncorrectedErrors((prev) => prev + 1);
        setUncorrectedErrorsIndexes((prev) => [...prev, [currIdx, currPos]]);
      }

      setTotalCharsTyped((prev) => prev + 1);
      setTypedChars((prev) => prev + keyPressed);
      setCurrPos((prevPos) => prevPos + 1);
    },
    [
      currIdx,
      currPos,
      isTyping,
      lastTypedCharPosition,
      rawWords,
      setIsTyping,
      timeLeft,
      typedChars,
      uncorrectedErrorsIndexes,
    ]
  );

  useEffect(() => {
    generateWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingMode]);

  useEffect(() => {
    setTimeLeft(typeof typingMode.value === 'number' ? typingMode.value : 10);
  }, [typingMode]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isTyping) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isTyping, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      const minutes =
        (typeof typingMode.value === 'number' ? typingMode.value : 10) / 60;

      let missedChars = 0;
      for (let i = 0; i < currIdx; i++) {
        missedChars += rawWords[i].length;
        missedChars -= typedWords[i].length;
      }

      const rawWpm = Math.round(totalCharsTyped / 5 / minutes);
      setRawWpmOfEachSecond((prev) => [...prev, rawWpm]);

      const netWpm = Math.max(
        0,
        Math.round(
          (totalCharsTyped / 5 - (uncorrectedErrors + missedChars)) / minutes
        )
      );
      setNetWpmOfEachSecond((prev) => [...prev, netWpm]);

      const calculatedAccuracy = Math.round(
        ((totalCharsTyped - (uncorrectedErrors + missedChars)) /
          totalCharsTyped) *
          100
      );
      setAccuracy(calculatedAccuracy);

      if (isAuth && user) {
        addScore({
          userId: user._id,
          rawWpm,
          netWpm,
          accuracy: calculatedAccuracy,
          mode: {
            type: typingMode.type,
            value: typingMode.value,
            enableNumbers: typingMode.enableNumbers,
            enablePunctuation: typingMode.enablePunctuation,
          },
          date: new Date(),
          totalCharacters: totalCharsTyped,
          correctCharacters: totalCharsTyped - uncorrectedErrors - missedChars,
          incorrectCharacters: uncorrectedErrors,
          missedCharacters: missedChars,
          isHighScore: false,
          typedString: typedWords.join(' '),
        });
      } else {
        toast('You need to login to save your score', { icon: 'ℹ️' });
      }

      setIsTyping(false);
    }
  }, [
    currIdx,
    isAuth,
    rawWords,
    setIsTyping,
    timeLeft,
    totalCharsTyped,
    typedWords,
    typingMode.type,
    typingMode.value,
    uncorrectedErrors,
    user,
  ]);

  const addScore = async ({
    userId,
    rawWpm,
    netWpm,
    accuracy,
    mode,
    date,
    totalCharacters,
    correctCharacters,
    incorrectCharacters,
    missedCharacters,
    isHighScore,
    typedString,
  }: IScore) => {
    try {
      await postScore({
        userId,
        rawWpm,
        netWpm,
        accuracy,
        mode,
        date,
        totalCharacters,
        correctCharacters,
        incorrectCharacters,
        missedCharacters,
        isHighScore,
        typedString,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center w-full h-[60vh] mx-auto'>
        <div>
          {timeLeft !== 0 && (
            <div>
              <div className='mb-2 min-h-10'>
                {isTyping && (
                  <p className='text-sky-400 text-4xl'>{timeLeft}</p>
                )}
              </div>
              <div className='line-clamp-3 font-roboto relative text-slate-500 text-4xl leading-snug'>
                <div>{words}</div>
              </div>
            </div>
          )}

          {!isTyping && timeLeft === 0 && (
            <div className='flex justify-between items-center gap-6 flex-wrap'>
              <div className='flex justify-center items-center flex-col gap-1 px-10 py-6 border border-slate-700 rounded-xl bg-slate-900 shadow-lg'>
                <p className='text-sky-400 text-6xl font-semibold'>
                  {rawWpmOfEachSecond[rawWpmOfEachSecond.length - 1] || 0}
                </p>
                <p className='text-slate-400 text-sm'>Raw WPM</p>
              </div>
              <div className='flex justify-center items-center flex-col gap-1 px-10 py-6 border border-slate-700 rounded-xl bg-slate-900 shadow-lg'>
                <p className='text-sky-400 text-6xl font-semibold'>
                  {netWpmOfEachSecond[netWpmOfEachSecond.length - 1] || 0}
                </p>
                <p className='text-slate-400 text-sm'>Net WPM</p>
              </div>
              <div className='flex justify-center items-center flex-col gap-1 px-10 py-6 border border-slate-700 rounded-xl bg-slate-900 shadow-lg'>
                <p className='text-sky-400 text-6xl font-semibold'>
                  {accuracy}
                  <span className='text-3xl ml-1'>%</span>
                </p>
                <p className='text-slate-400 text-sm'>Accuracy</p>
              </div>
            </div>
          )}

          <div className='flex justify-center items-center mt-8'>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.currentTarget.blur(); // remove focus from the button
                      generateWords();
                    }}
                    className='outline-none border-none focus:ring-0 focus:outline-none'
                  >
                    <VscDebugRestart className='text-slate-500 font-semibold h-6 w-6 hover:text-slate-100 transition' />
                  </button>
                </TooltipTrigger>

                <TooltipContent className='bg-slate-900 text-slate-100 outline-none border-none shadow-lg mb-2 text-lg px-4'>
                  <p>Restart Test</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextArea;
