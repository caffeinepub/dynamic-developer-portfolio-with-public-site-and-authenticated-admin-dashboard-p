import { useEffect, useState } from 'react';

interface TypingWordProps {
  words: string[];
  className?: string;
}

export default function TypingWord({ words, className = '' }: TypingWordProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Calculate the longest word for stable width
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), '');

  useEffect(() => {
    // If reduced motion is preferred, just show the first word
    if (prefersReducedMotion) {
      setCurrentText(words[0]);
      return;
    }

    const currentWord = words[currentWordIndex];

    // Handle pausing after typing is complete
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000); // Pause for 2 seconds before deleting
      return () => clearTimeout(pauseTimeout);
    }

    // Handle typing and deleting
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            // Finished typing, pause before deleting
            setIsPaused(true);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Finished deleting, move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    ); // Faster deletion than typing

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, prefersReducedMotion]);

  return (
    <span className={`inline-block ${className}`}>
      {/* Invisible text to reserve space based on longest word */}
      <span className="invisible absolute" aria-hidden="true">
        {longestWord}
      </span>
      {/* Visible animated text */}
      <span className="relative">
        {currentText}
        <span
          className={`typing-caret ml-0.5 inline-block h-[1em] w-[2px] bg-primary ${
            prefersReducedMotion ? 'opacity-0' : ''
          }`}
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
