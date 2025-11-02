import React from 'react';

interface PixelArtDisplayProps {
  part: string[];
  size?: 'sm' | 'lg';
}

const colorMap: { [key: string]: string } = {
  // Tree Canopy colors
  'g': 'bg-green-500', 
  'G': 'bg-green-700', 
  'h': 'bg-green-900', // darker green
  'H': 'bg-green-400', // lighter green
  'l': 'bg-lime-400', 
  'L': 'bg-lime-600', 
  'f': 'bg-pink-400', 
  'F': 'bg-red-500',   
  'y': 'bg-yellow-300', 
  // Tree Trunk colors
  'b': 'bg-yellow-800', 
  'B': 'bg-yellow-900',
  'n': 'bg-yellow-700', // lighter brown
  'X': 'bg-yellow-400', // Scar color
  // Tree Root colors
  'r': 'bg-orange-900',
  'R': 'bg-stone-700', 
  // Ground Cover colors
  'u': 'bg-green-600',    // grass
  'U': 'bg-green-800',    // grass shadow
  'm': 'bg-red-500',        // mushroom
  'M': 'bg-red-700',        // mushroom shadow
  'w': 'bg-white',          // mushroom spot / cloud / rocket part / shine
  'z': 'bg-yellow-400',   // flower
  'Z': 'bg-pink-500',     // flower center / dark pink
  'c': 'bg-gray-400',       // rock / stick
  'C': 'bg-gray-600',       // rock shadow / dark stick
  
  // Rocket colors (using non-conflicting keys)
  '1': 'bg-gray-400',   // silver
  '2': 'bg-gray-600',   // dark silver
  '7': 'bg-gray-900',   // black/window
  '3': 'bg-red-500',
  '4': 'bg-red-700',
  '5': 'bg-blue-500',
  '6': 'bg-blue-700',
  '8': 'bg-orange-500',
  '9': 'bg-orange-700',
  '0': 'bg-yellow-400',
  '!': 'bg-yellow-300', // brighter yellow

  // Lollipop colors
  'Y': 'bg-yellow-500', // darker yellow
  'a': 'bg-amber-300',
  'A': 'bg-amber-500',
  'v': 'bg-violet-400',
  'V': 'bg-violet-600',

  // Sword Colors
  'S': 'bg-slate-300',   // silver/steel
  '#': 'bg-slate-500',   // dark silver/steel shadow
  '$': 'bg-slate-900',   // outline

  // Pet Colors
  't': 'bg-teal-400', 
  'T': 'bg-teal-600', 
  'k': 'bg-pink-400',
  'K': 'bg-pink-600',
  's': 'bg-sky-400',
  'N': 'bg-sky-600',
  'x': 'bg-gray-700',

  // Planet Colors
  'p': 'bg-purple-500', 'P': 'bg-purple-700', 
  'e': 'bg-emerald-500', 'E': 'bg-emerald-700',
  'o': 'bg-blue-500', 'O': 'bg-blue-700',
  'd': 'bg-amber-600', 'D': 'bg-amber-800',
  'i': 'bg-sky-200', 'I': 'bg-slate-400', 
  'q': 'bg-orange-500', 'Q': 'bg-orange-700',
  'j': 'bg-yellow-300', 'J': 'bg-white',

  ' ': 'bg-transparent',
};


export const PixelArtDisplay: React.FC<PixelArtDisplayProps> = ({ part, size = 'lg' }) => {
  const isEmpty = part && part.length === 1 && part[0].trim() === '';

  if (isEmpty) {
    const containerSize = size === 'lg' ? 'w-48 h-48' : 'w-12 h-12';
    const iconSize = size === 'lg' ? 'w-24 h-24' : 'w-8 h-8';

    return (
      <div className={`flex items-center justify-center ${containerSize}`}>
        <svg className={`${iconSize} text-gray-400 dark:text-gray-500`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12ZM17.66 6.34L6.34 17.66L4.93 16.24L16.24 4.93L17.66 6.34Z" />
        </svg>
      </div>
    );
  }
  
  const pixelSize = size === 'lg'
    ? 'min-[375px]:w-2 min-[375px]:h-2 w-1.5 h-1.5'
    : 'w-1 h-1';

  return (
    <div className="flex flex-col items-center">
      {part.map((row, rowIndex) => (
        <div key={rowIndex} className="flex leading-none">
          {row.split('').map((pixel, pixelIndex) => {
            const colorClass = colorMap[pixel] || 'bg-transparent';
            return (
              <div
                key={`${rowIndex}-${pixelIndex}`}
                className={`${pixelSize} ${colorClass}`}
                aria-hidden="true"
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
