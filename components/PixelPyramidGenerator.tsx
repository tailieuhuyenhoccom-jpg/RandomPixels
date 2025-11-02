import React, { useState, useEffect, useCallback } from 'react';
import { TOPS, MIDDLES, BASES, SCENERIES } from '../constants/pyramidParts';
import { PixelArtDisplay } from './PixelArtDisplay';

type PyramidPart = string[];

interface Pyramid {
  topIndex: number;
  middleIndex: number;
  baseIndex: number;
  sceneryIndex: number;
}

const getRandomIndex = <T,>(arr: T[]): number => {
  return Math.floor(Math.random() * arr.length);
};

const combinePartsVertically = (parts: PyramidPart[]): PyramidPart => {
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

const PartSelector = ({ title, parts, selectedIndex, onSelect }: { title: string, parts: PyramidPart[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-xl mb-3 font-bold text-gray-700 dark:text-gray-300">{title}</h3>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {parts.map((part, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-1 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-amber-500 ${
            selectedIndex === index ? 'bg-amber-200 dark:bg-amber-800' : 'bg-gray-200 dark:bg-gray-800'
          }`}
          aria-label={`${title} ${index + 1}`}
        >
           <div className={`border-2 rounded-sm transition-colors ${selectedIndex === index ? 'border-amber-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}>
            <PixelArtDisplay part={part} size="sm" />
          </div>
        </button>
      ))}
    </div>
  </div>
);


export const PixelPyramidGenerator: React.FC = () => {
  const [topIndex, setTopIndex] = useState(0);
  const [middleIndex, setMiddleIndex] = useState(0);
  const [baseIndex, setBaseIndex] = useState(0);
  const [sceneryIndex, setSceneryIndex] = useState(0);
  const [currentPyramid, setCurrentPyramid] = useState<PyramidPart>([]);
  const [savedPyramids, setSavedPyramids] = useState<Pyramid[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixel-pyramids');
      if (saved) {
        const parsedData = JSON.parse(saved);
        if (Array.isArray(parsedData) && parsedData.every(item => 'topIndex' in item)) {
            setSavedPyramids(parsedData);
        } else {
            localStorage.removeItem('pixel-pyramids');
        }
      }
    } catch (error) {
      console.error("Failed to load saved pyramids:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pixel-pyramids', JSON.stringify(savedPyramids));
    } catch (error) {
      console.error("Failed to save pyramids:", error);
    }
  }, [savedPyramids]);

  const generateRandomPyramid = useCallback(() => {
    setTopIndex(getRandomIndex(TOPS));
    setMiddleIndex(getRandomIndex(MIDDLES));
    setBaseIndex(getRandomIndex(BASES));
    setSceneryIndex(getRandomIndex(SCENERIES));
  }, []);

  const buildPyramid = useCallback((pyramid: Pyramid) => {
    return combinePartsVertically([
        TOPS[pyramid.topIndex],
        MIDDLES[pyramid.middleIndex],
        BASES[pyramid.baseIndex],
        SCENERIES[pyramid.sceneryIndex],
    ]);
  }, []);

  useEffect(() => {
    const combined = buildPyramid({ topIndex, middleIndex, baseIndex, sceneryIndex });
    setCurrentPyramid(combined);
  }, [topIndex, middleIndex, baseIndex, sceneryIndex, buildPyramid]);

  useEffect(() => {
    generateRandomPyramid();
  }, [generateRandomPyramid]);

  const handleSavePyramid = () => {
    const newPyramid: Pyramid = { topIndex, middleIndex, baseIndex, sceneryIndex };
    const isDuplicate = savedPyramids.some(t => 
        t.topIndex === newPyramid.topIndex &&
        t.middleIndex === newPyramid.middleIndex &&
        t.baseIndex === newPyramid.baseIndex &&
        t.sceneryIndex === newPyramid.sceneryIndex
    );
    if (!isDuplicate) {
      setSavedPyramids([...savedPyramids, newPyramid]);
    } else {
        alert("Kim tự tháp này đã được lưu rồi!");
    }
  };

  const handleDeletePyramid = (indexToDelete: number) => {
    setSavedPyramids(savedPyramids.filter((_, index) => index !== indexToDelete));
  };

  const handleLoadPyramid = (pyramid: Pyramid) => {
    setTopIndex(pyramid.topIndex);
    setMiddleIndex(pyramid.middleIndex);
    setBaseIndex(pyramid.baseIndex);
    setSceneryIndex(pyramid.sceneryIndex);
  };
  
  const getCanvasForPyramid = (pyramidParts: PyramidPart, pixelSize: number): HTMLCanvasElement | null => {
    const canvasColorMap: { [key: string]: string } = {
        'g': '#22c55e', 'G': '#166534', 'y': '#fde047', 'Y': '#eab308', '0': '#facc15',
        'b': '#a16207', 'B': '#854d0e', 'w': '#ffffff', 'c': '#9ca3af', 'C': '#4b5563',
        's': '#38bdf8', 'N': '#0284c7', 'o': '#3b82f6', 'O': '#1d4ed8', 
        'a': '#fcd34d', 'A': '#f59e0b', '$': '#0f172a', 'x': '#374151',
        '3': '#ef4444', '4': '#b91c1c', '8': '#f97316', '9': '#c2410c',
    };

    const allRows = pyramidParts;
    if (allRows.length === 0) return null;
    
    const maxCharWidth = allRows.length > 0 ? allRows[0].length : 0;
    const totalCharHeight = allRows.length;
    
    const canvas = document.createElement('canvas');
    canvas.width = maxCharWidth * pixelSize;
    canvas.height = totalCharHeight * pixelSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    allRows.forEach((rowStr, rowIndex) => {
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
    const combinedParts = combinePartsVertically([
        TOPS[topIndex],
        MIDDLES[middleIndex],
        BASES[baseIndex],
        SCENERIES[sceneryIndex],
    ]);
    const canvas = getCanvasForPyramid(combinedParts, 20);
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pixel-pyramid.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  const handleDownloadAll = () => {
    if (savedPyramids.length === 0) return;

    const PIXEL_SIZE_SMALL = 4;
    const PADDING = 20;
    const PYRAMIDS_PER_ROW = 10;

    const pyramidsData = savedPyramids.map(pyramid => {
        const combinedParts = combinePartsVertically([
            TOPS[pyramid.topIndex], 
            MIDDLES[pyramid.middleIndex], 
            BASES[pyramid.baseIndex], 
            SCENERIES[pyramid.sceneryIndex],
        ]);
        return getCanvasForPyramid(combinedParts, PIXEL_SIZE_SMALL);
    }).filter((c): c is HTMLCanvasElement => c !== null);

    if (pyramidsData.length === 0) return;
    
    const maxPyramidWidth = Math.max(0, ...pyramidsData.map(c => c.width));
    const maxPyramidHeight = Math.max(0, ...pyramidsData.map(c => c.height));

    const cellWidth = maxPyramidWidth + PADDING;
    const cellHeight = maxPyramidHeight + PADDING;

    const numRows = Math.ceil(savedPyramids.length / PYRAMIDS_PER_ROW);
    const numCols = Math.min(savedPyramids.length, PYRAMIDS_PER_ROW);

    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = numCols * cellWidth - PADDING;
    mainCanvas.height = numRows * cellHeight - PADDING;
    const ctx = mainCanvas.getContext('2d');
    if (!ctx) return;

    pyramidsData.forEach((pyramidCanvas, index) => {
        const gridX = index % PYRAMIDS_PER_ROW;
        const gridY = Math.floor(index / PYRAMIDS_PER_ROW);
        const canvasX = gridX * cellWidth;
        const canvasY = gridY * cellHeight;
        const xOffset = (maxPyramidWidth - pyramidCanvas.width) / 2;
        const yOffset = (maxPyramidHeight - pyramidCanvas.height) / 2;
        ctx.drawImage(pyramidCanvas, canvasX + xOffset, canvasY + yOffset);
    });

    const link = document.createElement('a');
    link.download = 'pixel-pyramids_collection.png';
    link.href = mainCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <section className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-8 min-h-[300px] flex items-center justify-center">
        <PixelArtDisplay part={currentPyramid} />
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        <button onClick={generateRandomPyramid} className="col-span-2 sm:col-span-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tạo Ngẫu Nhiên</button>
        <button onClick={handleSavePyramid} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Lưu KTT</button>
        <button onClick={handleDownloadSingle} className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tải PNG</button>
      </section>

      <div>
        <PartSelector title="Đỉnh" parts={TOPS} selectedIndex={topIndex} onSelect={setTopIndex} />
        <PartSelector title="Thân" parts={MIDDLES} selectedIndex={middleIndex} onSelect={setMiddleIndex} />
        <PartSelector title="Đế" parts={BASES} selectedIndex={baseIndex} onSelect={setBaseIndex} />
        <PartSelector title="Cảnh Quan" parts={SCENERIES} selectedIndex={sceneryIndex} onSelect={setSceneryIndex} />
      </div>

      {savedPyramids.length > 0 && (
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">KTT Đã Lưu</h2>
            <button
              onClick={handleDownloadAll}
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-sm"
            >
              Tải Tất Cả
            </button>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {savedPyramids.map((pyramid, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => handleLoadPyramid(pyramid)}>
                <div className="bg-gray-300 dark:bg-gray-700 rounded-md p-1">
                    <PixelArtDisplay part={buildPyramid(pyramid)} size="sm" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePyramid(index);
                  }}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold leading-none pb-1"
                  aria-label="Xóa kim tự tháp"
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