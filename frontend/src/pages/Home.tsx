import { generate } from 'random-words';
import React, { useCallback, useEffect, useState } from 'react';

const Home = () => {
  const [words, setWords] = useState<JSX.Element[]>([]);
  const [currIdx, setCurrIdx] = useState(0); // number of word
  const [currPos, setCurrPos] = useState(0); // number of char in word
  const [rawWords, setRawWords] = useState<string[]>([]);

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
      // const newCurrPos = currPos + 1;
      if (e.altKey || e.ctrlKey || e.shiftKey) {
        return;
      }

      const keyPressed = e.key;

      // space event
      if (keyPressed === ' ') {
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
            return <span>{updatedWord} </span>;
          });
        });
        return;
      }

      // backspace event
      if (keyPressed === 'Backspace') {
        return;
      }

      // update character
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
                    letter === keyPressed ? 'text-white' : 'text-red-400'
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
    [currIdx, currPos, rawWords]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div>
      index: {currIdx}
      <div></div>
      pos: {currPos}
      <div className='flex justify-center items-center flex-1 h-[80vh]'>
        <div className='line-clamp-3 font-roboto relative bg-slate-800 text-slate-500 w-[90vw] md:w-[85vw] text-4xl leading-snug'>
          <div>{words}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
