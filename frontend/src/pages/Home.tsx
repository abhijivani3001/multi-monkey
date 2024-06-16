import { generate } from 'random-words';
import { useCallback, useEffect, useState } from 'react';

const Home = () => {
  const [words, setWords] = useState<JSX.Element[]>([]);
  const [currIdx, setCurrIdx] = useState(0); // number of word
  const [currPos, setCurrPos] = useState(0); // number of char in word
  const [rawWords, setRawWords] = useState<string[]>([]);

  useEffect(() => {
    generateWords();
  }, []);

  const generateWords = () => {
    let arr = generate(100);
    if (typeof arr === 'string') arr = arr.split(' ');

    setRawWords(arr);

    const ans = arr.map((word, index) => (
      <span key={index} className='word'>
        {word.split('').map((letter, letterIndex) => (
          <span key={letterIndex}>{letter}</span>
        ))}{' '}
      </span>
    ));
    setWords(ans);
  };

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.shiftKey) {
        return;
      }

      const key = e.key;

      if (key === ' ') {
        setCurrIdx((prevIdx) => {
          const newIdx = prevIdx + 1;
          setCurrPos(0); // Reset current character position to start of the next word
          return newIdx;
        });
        return;
      }

      // setCurrPos((prevPos) => {
      //   const newPos = prevPos + 1;
      //   const ans = rawWords.map((word, index) => (
      //     <span key={index} className='word'>
      //       {word.split('').map((letter, letterIndex) => (
      //         <span
      //           key={letterIndex}
      //           className={`${
      //             index === currIdx && prevPos === letterIndex
      //               ? letter === key
      //                 ? 'text-white'
      //                 : 'text-rose-400'
      //               : ''
      //           }`}
      //         >
      //           {letter}
      //         </span>
      //       ))}{' '}
      //     </span>
      //   ));

      //   setWords(ans);

      //   return newPos;
      // });

      setWords((prevWords) => {
        return prevWords.map((wordElement, index) => {
          if (currIdx !== index) {
            return wordElement;
          }

          const updatedWord = rawWords[index]
            .split('')
            .map((letter, letterIndex) => {
              return (
                <span
                  key={letterIndex}
                  className={`${
                    currPos === letterIndex
                      ? letter === key
                        ? 'text-white'
                        : 'text-red-400'
                      : ''
                  }`}
                >
                  {letter}
                </span>
              );
            });

          return <span key={index}>{updatedWord} </span>;
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
      {currIdx}
      <div></div>
      {currPos}
      <div className='flex justify-center items-center flex-1 h-[80vh]'>
        <div className='line-clamp-3 font-roboto relative bg-slate-800 text-slate-500 w-[90vw] md:w-[85vw] text-4xl leading-snug'>
          <div>{words}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
