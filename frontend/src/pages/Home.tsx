import { generate } from 'random-words';
import { useEffect, useState } from 'react';

const Home = () => {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    let arr = generate(100);
    if (typeof arr === 'string') arr = arr.split(' ');
    setWords(arr);
  }, []);

  return (
    <>
      <div>
        {words.map((word, index) => (
          <span key={index}>{word} </span>
        ))}
      </div>
    </>
  );
};

export default Home;
