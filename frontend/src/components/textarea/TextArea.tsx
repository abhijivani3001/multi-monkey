import { generate } from 'random-words';
import React, { useCallback, useEffect, useState } from 'react';
import { VscDebugRestart } from 'react-icons/vsc';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const TextArea = () => {
  const [words, setWords] = useState<JSX.Element[]>([]);
  const [currIdx, setCurrIdx] = useState(0); // number of word
  const [currPos, setCurrPos] = useState(0); // number of char in word
  const [rawWords, setRawWords] = useState<string[]>([]);
  const [lastTypedCharPosition, setLastTypedCharPosition] = useState<number[]>(
    []
  );

  useEffect(() => {
    generateWords();
  }, []);

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
    let arr = generate(100);
    if (typeof arr === 'string') arr = arr.split(' ');

    setRawWords(arr);

    const ans = arr.map((word, index) => (
      <span key={index}>
        {word.split('').map((letter, letterIndex) => (
          <span
            key={letterIndex}
            className={`${
              index === 0 && letterIndex === 0 ? 'border-b-2' : ''
            }`}
          >
            {letter}
          </span>
        ))}{' '}
      </span>
    ));
    setWords(ans);
  };

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const keyPressed = e.key;

      // space event
      if (keyPressed === ' ') {
        setLastTypedCharPosition((prev) => [...prev, currPos]);

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
                  className={letterIndex === 0 ? 'border-b-2' : ''}
                >
                  {letter}
                </span>
              ));
            return <span key={index}>{updatedWord} </span>;
          });
        });
        return;
      }

      // backspace event
      if (keyPressed === 'Backspace') {
        if (currIdx === 0 && currPos === 0) {
          return;
        }

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
                      <span key={letterIndex} className='border-b-2'>
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
          setCurrPos((prevPos) => prevPos - 1);
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
                      <span key={letterIndex} className='border-b-2'>
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
                        ? 'border-b-2'
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
        return;
      }

      // other keys
      const isOtherKey = e.ctrlKey || e.altKey || e.metaKey; // Check for ctrl, alt, meta key combinations with other keys

      if (isOtherKey || !isAllowedKey(keyPressed)) {
        return;
      }

      // extra characters typed more than original size of word
      if (currPos === rawWords[currIdx].length) {
        return;
      }

      // update character(alphanumeric or special characters)
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
                  <span key={letterIndex} className='border-b-2'>
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
                    ? 'border-b-2'
                    : ''
                }`}
              >
                {' '}
              </span>
            </span>
          );
        });
      });

      setCurrPos((prevPos) => prevPos + 1);
    },
    [currIdx, currPos, lastTypedCharPosition, rawWords]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <>
      <div className='flex justify-center items-center flex-1 h-[60vh] mx-auto'>
        <div>
          <div className='line-clamp-3 font-roboto relative bg-slate-800 text-slate-500  w-[90vw] md:w-[85vw] max-w-screen-2xl text-4xl leading-snug'>
            <div>{words}</div>
          </div>
          <div className='flex justify-center items-center mt-8'>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button>
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
