import React, { useState, useEffect, useCallback } from 'react';
import { CLOUD_BASES, CLOUD_DETAILS, CLOUD_FACES, CLOUD_COMPANIONS } from '../constants/cloudParts';
import { PixelArtDisplay } from './PixelArtDisplay';

type CloudPart = string[];

interface Cloud {
  baseIndex: number;
  detailIndex: number;
  faceIndex: number;
  companionIndex: number;
}

const getRandomIndex = <T,>(arr: T[]): number => {
  return Math.floor(Math.random() * arr.length);
};

const combineParts = (base: CloudPart, ...overlays: CloudPart[]): CloudPart => {
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

const PartSelector = ({ title, parts, selectedIndex, onSelect }: { title: string, parts: CloudPart[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-xl mb-3 font-bold text-gray-700 dark:text-gray-300">{title}</h3>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {parts.map((part, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-1 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-sky-500 ${
            selectedIndex === index ? 'bg-sky-200 dark:bg-sky-800' : 'bg-gray-200 dark:bg-gray-800'
          }`}
          aria-label={`${title} ${index + 1}`}
        >
           <div className={`border-2 rounded-sm transition-colors ${selectedIndex === index ? 'border-sky-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}>
            <PixelArtDisplay part={part} size="sm" />
          </div>
        </button>
      ))}
    </div>
  </div>
);


export const PixelCloudGenerator: React.FC = () => {
    const [baseIndex, setBaseIndex] = useState(0);
    const [detailIndex, setDetailIndex] = useState(0);
    const [faceIndex, setFaceIndex] = useState(0);
    const [companionIndex, setCompanionIndex] = useState(0);

    const [currentCloud, setCurrentCloud] = useState<CloudPart | null>(null);
    const [savedClouds, setSavedClouds] = useState<Cloud[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('pixel-clouds');
            if (saved) {
                setSavedClouds(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Failed to load saved clouds:", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('pixel-clouds', JSON.stringify(savedClouds));
        } catch (error) {
            console.error("Failed to save clouds:", error);
        }
    }, [savedClouds]);


    const generateRandomCloud = useCallback(() => {
        setBaseIndex(getRandomIndex(CLOUD_BASES));
        setDetailIndex(getRandomIndex(CLOUD_DETAILS));
        setFaceIndex(getRandomIndex(CLOUD_FACES));
        setCompanionIndex(getRandomIndex(CLOUD_COMPANIONS));
    }, []);

    useEffect(() => {
        generateRandomCloud();
    }, [generateRandomCloud]);

    const buildCloud = useCallback((cloud: Cloud) => {
        return combineParts(
            CLOUD_BASES[cloud.baseIndex], 
            CLOUD_DETAILS[cloud.detailIndex], 
            CLOUD_FACES[cloud.faceIndex], 
            CLOUD_COMPANIONS[cloud.companionIndex]
        );
    }, []);

    useEffect(() => {
        const finalCloud = buildCloud({baseIndex, detailIndex, faceIndex, companionIndex});
        setCurrentCloud(finalCloud);
    }, [baseIndex, detailIndex, faceIndex, companionIndex, buildCloud]);

    const handleSaveCloud = () => {
        const newCloud: Cloud = { baseIndex, detailIndex, faceIndex, companionIndex };
        
        const isDuplicate = savedClouds.some(
          (c) =>
            c.baseIndex === newCloud.baseIndex &&
            c.detailIndex === newCloud.detailIndex &&
            c.faceIndex === newCloud.faceIndex &&
            c.companionIndex === newCloud.companionIndex
        );

        if (!isDuplicate) {
          setSavedClouds([...savedClouds, newCloud]);
        } else {
            alert("Mây này đã được lưu rồi!");
        }
    };

    const handleDeleteCloud = (indexToDelete: number) => {
        setSavedClouds(savedClouds.filter((_, index) => index !== indexToDelete));
    };

    const handleLoadCloud = (cloud: Cloud) => {
        setBaseIndex(cloud.baseIndex);
        setDetailIndex(cloud.detailIndex);
        setFaceIndex(cloud.faceIndex);
        setCompanionIndex(cloud.companionIndex);
    };

    const getCanvasForCloud = (parts: CloudPart, pixelSize: number): HTMLCanvasElement | null => {
        const canvasColorMap: { [key: string]: string } = {
            'w': '#ffffff', 'c': '#9ca3af', 'C': '#4b5563', 'x': '#374151',
            'y': '#fde047', 'Y': '#eab308', 's': '#38bdf8', 'N': '#0284c7',
            'k': '#f472b6', '$': '#111827',
            '3': '#ef4444', '8': '#f97316', 'g': '#22c55e', '0': '#facc15', 'v': '#a78bfa',
            'b': '#a16207', 'B': '#854d0e', 'n': '#b45309',
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
        if (!currentCloud) return;
        const canvas = getCanvasForCloud(currentCloud, 20);
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = 'pixel-cloud.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadAll = () => {
        if (savedClouds.length === 0) return;

        const PIXEL_SIZE_SMALL = 4;
        const PADDING = 20;
        const ITEMS_PER_ROW = 10;

        const cloudsData = savedClouds.map(cloud => {
            const combinedParts = buildCloud(cloud);
            return getCanvasForCloud(combinedParts, PIXEL_SIZE_SMALL);
        }).filter((c): c is HTMLCanvasElement => c !== null);

        if (cloudsData.length === 0) return;
        
        const maxWidth = Math.max(0, ...cloudsData.map(c => c.width));
        const maxHeight = Math.max(0, ...cloudsData.map(c => c.height));

        const cellWidth = maxWidth + PADDING;
        const cellHeight = maxHeight + PADDING;

        const numRows = Math.ceil(savedClouds.length / ITEMS_PER_ROW);
        const numCols = Math.min(savedClouds.length, ITEMS_PER_ROW);

        const mainCanvas = document.createElement('canvas');
        mainCanvas.width = numCols * cellWidth - PADDING;
        mainCanvas.height = numRows * cellHeight - PADDING;
        const ctx = mainCanvas.getContext('2d');
        if (!ctx) return;
        
        ctx.fillStyle = '#7dd3fc'; // Sky blue background
        ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

        cloudsData.forEach((cloudCanvas, index) => {
            const gridX = index % ITEMS_PER_ROW;
            const gridY = Math.floor(index / ITEMS_PER_ROW);
            const canvasX = gridX * cellWidth;
            const canvasY = gridY * cellHeight;
            const xOffset = (maxWidth - cloudCanvas.width) / 2;
            const yOffset = (maxHeight - cloudCanvas.height) / 2;
            ctx.drawImage(cloudCanvas, canvasX + xOffset, canvasY + yOffset);
        });

        const link = document.createElement('a');
        link.download = 'pixel-clouds_collection.png';
        link.href = mainCanvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <section className="bg-sky-200 dark:bg-slate-800 rounded-lg p-4 mb-8 min-h-[250px] flex items-center justify-center">
                {currentCloud && (
                    <PixelArtDisplay part={currentCloud} />
                )}
            </section>

            <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                <button
                    onClick={generateRandomCloud}
                    className="col-span-2 sm:col-span-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                >
                    Tạo Mây Mới
                </button>
                 <button
                    onClick={handleSaveCloud}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                >
                    Lưu Mây
                </button>
                <button
                    onClick={handleDownloadSingle}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                >
                    Tải PNG
                </button>
            </section>

             <div>
                <PartSelector title="Thân Mây" parts={CLOUD_BASES} selectedIndex={baseIndex} onSelect={setBaseIndex} />
                <PartSelector title="Chi Tiết" parts={CLOUD_DETAILS} selectedIndex={detailIndex} onSelect={setDetailIndex} />
                <PartSelector title="Khuôn Mặt" parts={CLOUD_FACES} selectedIndex={faceIndex} onSelect={setFaceIndex} />
                <PartSelector title="Bạn Đồng Hành" parts={CLOUD_COMPANIONS} selectedIndex={companionIndex} onSelect={setCompanionIndex} />
             </div>

             {savedClouds.length > 0 && (
                <section className="mt-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold">Mây Đã Lưu</h2>
                    <button
                    onClick={handleDownloadAll}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                    Tải Tất Cả
                    </button>
                </div>
                <div className="bg-sky-200 dark:bg-slate-800 rounded-lg p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {savedClouds.map((cloud, index) => {
                       const finalCloud = buildCloud(cloud);
                       return (
                        <div key={index} className="relative group cursor-pointer" onClick={() => handleLoadCloud(cloud)}>
                            <div className="aspect-square flex items-center justify-center bg-sky-300 dark:bg-slate-700 rounded-md p-1">
                                <PixelArtDisplay part={finalCloud} size="sm" />
                            </div>
                            <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCloud(index);
                            }}
                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Xóa mây"
                            >
                            &times;
                            </button>
                        </div>
                       )
                    })}
                </div>
                </section>
            )}
        </div>
    );
};