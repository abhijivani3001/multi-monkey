import { generate } from 'random-words';

const generateRandomText = (
  wordCount: number,
  enableNumbers: boolean = false,
  enablePunctuation: boolean = false
): string[] => {
  let words: any = Array.isArray(generate(wordCount)) ? generate(wordCount) : [generate(wordCount)];
  
  // Function to generate random numbers
  const generateRandomNumber = (): string => Math.floor(Math.random() * 10).toString();
  
  // Function to generate random punctuation
  const generateRandomPunctuation = (): string => {
    const punctuationMarks: string[] = ['!', '.', ',', '?', ';', ':'];
    return punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
  };
  
  // Enhance words with numbers and punctuation
  words = words.map((word: string) => {
    if (enableNumbers && Math.random() < 0.5) { // 50% chance to add a number
      word += generateRandomNumber();
    }
    if (enablePunctuation && Math.random() < 0.5) { // 50% chance to add punctuation
      word += generateRandomPunctuation();
    }
    return word;
  });

  return words;
};

export default generateRandomText;