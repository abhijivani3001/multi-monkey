import { generate } from 'random-words';
import { useEffect, useState } from 'react';

const Home = () => {
  const [words, setWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [started, setStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [typedWords, setTypedWords] = useState<number>(0);

  // Generate words on initial mount
  useEffect(() => {
    generateWords();
  }, []);

  // Function to generate 1000 random words
  const generateWords = () => {
    let arr = generate(1000);
    if (typeof arr === 'string') arr = arr.split(' ');
    setWords(arr);
  };

  // Event handler for typing in the input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  // Reset the typing race
  const resetRace = () => {
    setWords([]);
    setInputValue('');
    setStarted(false);
    setFinished(false);
    setStartTime(0);
    setEndTime(0);
    setTypedWords(0);
    generateWords();
  };

  const focusTextArea = () => {};

  return (
    <div>
      <div className='flex flex-col justify-center items-center flex-1 h-[80vh]'>
        <div
          onClick={focusTextArea}
          className='line-clamp-3 font-roboto bg-slate-800 text-slate-500 w-[80vw] text-4xl leading-snug'
        >
          {words.map((word) => word + ' ')}
        </div>
      </div>
    </div>
  );
};

export default Home;
