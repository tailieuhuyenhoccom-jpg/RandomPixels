import React, { useState, useEffect, useCallback } from 'react';
import { CANDIES, PATTERNS, SHINES, STICKS } from '../constants/lollipopParts';
import { PixelArtDisplay } from './PixelArtDisplay';

type LollipopPart = string[];

interface Lollipop {
  candyIndex: number;
  patternIndex: number;
  shineIndex: number;
  stickIndex: number;
}

const getRandomIndex = <T,>(arr: T[]): number => {
  return Math.floor(Math.random() * arr.length);
};

const overlayParts = (base: LollipopPart, ...overlays: LollipopPart[]): LollipopPart => {
    let currentCanvas = [...base];
    
    overlays.forEach(overlay => {
        if (!overlay || (overlay.length === 1 && overlay[0].trim() === '')) {
            return; // Skip empty overlays
        }

        const baseHeight = currentCanvas.length;
        const baseWidth = baseHeight > 0 ? Math.max(0, ...currentCanvas.map(r => r.length)) : 0;
        const overlayHeight = overlay.length;
        const overlayWidth = overlayHeight > 0 ? Math.max(0, ...overlay.map(r => r.length)) : 0;

        const finalHeight = Math.max(baseHeight, overlayHeight);
        const finalWidth = Math.max(baseWidth, overlayWidth);
        
        const baseOffsetX = Math.floor((finalWidth - baseWidth) / 2);
        const baseOffsetY = Math.floor((finalHeight - baseHeight) / 2);

        const overlayOffsetX = Math.floor((finalWidth - overlayWidth) / 2);
        const overlayOffsetY = Math.floor((finalHeight - overlayHeight) / 2);

        const newCanvas: string[][] = Array.from({ length: finalHeight }, () => Array(finalWidth).fill(' '));

        for (let y = 0; y < baseHeight; y++) {
            for (let x = 0; x < currentCanvas[y].length; x++) {
                if (currentCanvas[y][x] !== ' ') {
                    newCanvas[y + baseOffsetY][x + baseOffsetX] = currentCanvas[y][x];
                }
            }
        }

        for (let y = 0; y < overlayHeight; y++) {
            for (let x = 0; x < overlay[y].length; x++) {
                if (overlay[y][x] !== ' ') {
                    newCanvas[y + overlayOffsetY][x + overlayOffsetX] = overlay[y][x];
                }
            }
        }
        currentCanvas = newCanvas.map(row => row.join(''));
    });
    
    return currentCanvas;
};


const combinePartsVertically = (parts: LollipopPart[]): LollipopPart => {
  const allRows = parts.flat();
  if (allRows.length === 0) {
    return [];
  }

  const maxCharWidth = Math.max(0, ...allRows.map(row => row.length));

  return allRows.map(row => {
    const padding = maxCharWidth - row.length;
    const leftPadding = Math.floor(padding / 2);
    const rightPadding = padding - leftPadding;
    return ' '.repeat(leftPadding) + row + ' '.repeat(rightPadding);
  });
};


const PartSelector = ({ title, parts, selectedIndex, onSelect }: { title: string, parts: LollipopPart[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-xl mb-3 font-bold text-gray-700 dark:text-gray-300">{title}</h3>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {parts.map((part, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-1 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-pink-500 ${
            selectedIndex === index ? 'bg-pink-200 dark:bg-pink-800' : 'bg-gray-200 dark:bg-gray-800'
          }`}
          aria-label={`${title} ${index + 1}`}
        >
           <div className={`border-2 rounded-sm transition-colors ${selectedIndex === index ? 'border-pink-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}>
            <PixelArtDisplay part={part} size="sm" />
          </div>
        </button>
      ))}
    </div>
  </div>
);


export const PixelLollipopGenerator: React.FC = () => {
  const [candyIndex, setCandyIndex] = useState(0);
  const [patternIndex, setPatternIndex] = useState(0);
  const [shineIndex, setShineIndex] = useState(0);
  const [stickIndex, setStickIndex] = useState(0);
  const [currentLollipop, setCurrentLollipop] = useState<LollipopPart>([]);
  const [savedLollipops, setSavedLollipops] = useState<Lollipop[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixel-lollipops');
      if (saved) {
        setSavedLollipops(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load saved lollipops:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pixel-lollipops', JSON.stringify(savedLollipops));
    } catch (error) {
      console.error("Failed to save lollipops:", error);
    }
  }, [savedLollipops]);

  const generateRandomLollipop = useCallback(() => {
    setCandyIndex(getRandomIndex(CANDIES));
    setPatternIndex(getRandomIndex(PATTERNS));
    setShineIndex(getRandomIndex(SHINES));
    setStickIndex(getRandomIndex(STICKS));
  }, []);

  useEffect(() => {
    generateRandomLollipop();
  }, [generateRandomLollipop]);

  const buildLollipop = useCallback((lollipop: Lollipop) => {
    const head = overlayParts(
        CANDIES[lollipop.candyIndex], 
        PATTERNS[lollipop.patternIndex], 
        SHINES[lollipop.shineIndex]
    );
    return combinePartsVertically([head, STICKS[lollipop.stickIndex]]);
  }, []);

  useEffect(() => {
    const combined = buildLollipop({ candyIndex, patternIndex, shineIndex, stickIndex });
    setCurrentLollipop(combined);
  }, [candyIndex, patternIndex, shineIndex, stickIndex, buildLollipop]);


  const handleSaveLollipop = () => {
    const newLollipop: Lollipop = { candyIndex, patternIndex, shineIndex, stickIndex };
    const isDuplicate = savedLollipops.some(l => 
        l.candyIndex === newLollipop.candyIndex &&
        l.patternIndex === newLollipop.patternIndex &&
        l.shineIndex === newLollipop.shineIndex &&
        l.stickIndex === newLollipop.stickIndex
    );
    if (!isDuplicate) {
      setSavedLollipops([...savedLollipops, newLollipop]);
    } else {
        alert("Kẹo mút này đã được lưu rồi!");
    }
  };

  const handleDeleteLollipop = (indexToDelete: number) => {
    setSavedLollipops(savedLollipops.filter((_, index) => index !== indexToDelete));
  };

  const handleLoadLollipop = (lollipop: Lollipop) => {
    setCandyIndex(lollipop.candyIndex);
    setPatternIndex(lollipop.patternIndex);
    setShineIndex(lollipop.shineIndex);
    setStickIndex(lollipop.stickIndex);
  };
  
  const getCanvasForLollipop = (parts: LollipopPart, pixelSize: number): HTMLCanvasElement | null => {
    const canvasColorMap: { [key: string]: string } = {
        // Pinks
        'f': '#f472b6', // pink-400
        'Z': '#ec4899', // pink-500
        // Reds
        '3': '#ef4444', // red-500
        '4': '#b91c1c', // red-700
        // Blues
        '5': '#3b82f6', // blue-500
        '6': '#1d4ed8', // blue-700
        // Yellows
        '0': '#facc15', // yellow-400
        'Y': '#eab308', // yellow-500
        // Greens
        'g': '#22c55e', // green-500
        'G': '#15803d', // green-700
        // Violets
        'v': '#a78bfa', // violet-400
        'V': '#7c3aed', // violet-600
        // Ambers
        'a': '#fcd34d', // amber-300
        'A': '#f59e0b', // amber-500
        // Oranges
        '8': '#f97316', // orange-500
        '9': '#c2410c', // orange-700
        // Greys / Stick colors
        'c': '#9ca3af', // gray-400
        'C': '#4b5563', // gray-600
        // Browns / Stick colors
        'b': '#a16207', // yellow-800
        'B': '#854d0e', // yellow-900
        'n': '#b45309', // yellow-700
        // White
        'w': '#ffffff',
    };

    if (parts.length === 0) return null;
    
    const maxCharWidth = parts.length > 0 ? parts[0].length : 0;
    const totalCharHeight = parts.length;
    
    const canvas = document.createElement('canvas');
    canvas.width = maxCharWidth * pixelSize;
    canvas.height = totalCharHeight * pixelSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    parts.forEach((rowStr, rowIndex) => {
        rowStr.split('').forEach((pixel, colIndex) => {
            if (canvasColorMap[pixel]) {
                ctx.fillStyle = canvasColorMap[pixel];
                ctx.fillRect(colIndex * pixelSize, rowIndex * pixelSize, pixelSize, pixelSize);
            }
        });
    });
    return canvas;
  }

  const handleDownloadSingle = () => {
    const canvas = getCanvasForLollipop(currentLollipop, 20);
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pixel-lollipop.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  const handleDownloadAll = () => {
    if (savedLollipops.length === 0) return;

    const PIXEL_SIZE_SMALL = 4;
    const PADDING = 20;
    const ITEMS_PER_ROW = 10;

    const lollipopsData = savedLollipops.map(lollipop => {
        const combinedParts = buildLollipop(lollipop);
        return getCanvasForLollipop(combinedParts, PIXEL_SIZE_SMALL);
    }).filter((c): c is HTMLCanvasElement => c !== null);

    if (lollipopsData.length === 0) return;
    
    const maxWidth = Math.max(0, ...lollipopsData.map(c => c.width));
    const maxHeight = Math.max(0, ...lollipopsData.map(c => c.height));

    const cellWidth = maxWidth + PADDING;
    const cellHeight = maxHeight + PADDING;

    const numRows = Math.ceil(savedLollipops.length / ITEMS_PER_ROW);
    const numCols = Math.min(savedLollipops.length, ITEMS_PER_ROW);

    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = numCols * cellWidth - PADDING;
    mainCanvas.height = numRows * cellHeight - PADDING;
    const ctx = mainCanvas.getContext('2d');
    if (!ctx) return;

    lollipopsData.forEach((lollipopCanvas, index) => {
        const gridX = index % ITEMS_PER_ROW;
        const gridY = Math.floor(index / ITEMS_PER_ROW);
        const canvasX = gridX * cellWidth;
        const canvasY = gridY * cellHeight;
        const xOffset = (maxWidth - lollipopCanvas.width) / 2;
        const yOffset = (maxHeight - lollipopCanvas.height) / 2;
        ctx.drawImage(lollipopCanvas, canvasX + xOffset, canvasY + yOffset);
    });

    const link = document.createElement('a');
    link.download = 'pixel-lollipops_collection.png';
    link.href = mainCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <section className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-8 min-h-[300px] flex items-center justify-center">
        <PixelArtDisplay part={currentLollipop} />
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        <button onClick={generateRandomLollipop} className="col-span-2 sm:col-span-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tạo Ngẫu Nhiên</button>
        <button onClick={handleSaveLollipop} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Lưu Kẹo Mút</button>
        <button onClick={handleDownloadSingle} className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tải PNG</button>
      </section>

      <div>
        <PartSelector title="Kẹo" parts={CANDIES} selectedIndex={candyIndex} onSelect={setCandyIndex} />
        <PartSelector title="Họa Tiết" parts={PATTERNS} selectedIndex={patternIndex} onSelect={setPatternIndex} />
        <PartSelector title="Óng Ánh" parts={SHINES} selectedIndex={shineIndex} onSelect={setShineIndex} />
        <PartSelector title="Que" parts={STICKS} selectedIndex={stickIndex} onSelect={setStickIndex} />
      </div>

      {savedLollipops.length > 0 && (
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Kẹo Mút Đã Lưu</h2>
            <button
              onClick={handleDownloadAll}
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-sm"
            >
              Tải Tất Cả
            </button>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {savedLollipops.map((lollipop, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => handleLoadLollipop(lollipop)}>
                <div className="bg-gray-300 dark:bg-gray-700 rounded-md p-1">
                    <PixelArtDisplay part={buildLollipop(lollipop)} size="sm" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLollipop(index);
                  }}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold leading-none pb-1"
                  aria-label="Xóa kẹo mút"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
