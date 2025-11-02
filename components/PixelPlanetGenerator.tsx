import React, { useState, useEffect, useCallback } from 'react';
import { PLANET_BASES, PLANET_DETAILS, PLANET_RINGS, PLANET_MOONS } from '../constants/planetParts';
import { PixelArtDisplay } from './PixelArtDisplay';

type PlanetPart = string[];

interface Planet {
  baseIndex: number;
  detailIndex: number;
  ringIndex: number;
  moonIndex: number;
}

const getRandomIndex = <T,>(arr: T[]): number => {
  return Math.floor(Math.random() * arr.length);
};

const combineParts = (base: PlanetPart, ...overlays: PlanetPart[]): PlanetPart => {
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

const PartSelector = ({ title, parts, selectedIndex, onSelect }: { title: string, parts: PlanetPart[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-xl mb-3 font-bold text-gray-700 dark:text-gray-300">{title}</h3>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {parts.map((part, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-1 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-purple-500 ${
            selectedIndex === index ? 'bg-purple-200 dark:bg-purple-800' : 'bg-gray-200 dark:bg-gray-800'
          }`}
          aria-label={`${title} ${index + 1}`}
        >
           <div className={`border-2 rounded-sm transition-colors ${selectedIndex === index ? 'border-purple-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}>
            <PixelArtDisplay part={part} size="sm" />
          </div>
        </button>
      ))}
    </div>
  </div>
);


export const PixelPlanetGenerator: React.FC = () => {
    const [baseIndex, setBaseIndex] = useState(0);
    const [detailIndex, setDetailIndex] = useState(0);
    const [ringIndex, setRingIndex] = useState(0);
    const [moonIndex, setMoonIndex] = useState(0);
    const [currentPlanet, setCurrentPlanet] = useState<PlanetPart>([]);
    const [savedPlanets, setSavedPlanets] = useState<Planet[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('pixel-planets');
            if (saved) {
                setSavedPlanets(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Failed to load saved planets:", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('pixel-planets', JSON.stringify(savedPlanets));
        } catch (error) {
            console.error("Failed to save planets:", error);
        }
    }, [savedPlanets]);


    const generateRandomPlanet = useCallback(() => {
        setBaseIndex(getRandomIndex(PLANET_BASES));
        setDetailIndex(getRandomIndex(PLANET_DETAILS));
        setRingIndex(getRandomIndex(PLANET_RINGS));
        setMoonIndex(getRandomIndex(PLANET_MOONS));
    }, []);

    useEffect(() => {
        generateRandomPlanet();
    }, [generateRandomPlanet]);

    const buildPlanet = useCallback((planet: Planet) => {
        return combineParts(
            PLANET_BASES[planet.baseIndex],
            PLANET_DETAILS[planet.detailIndex],
            PLANET_RINGS[planet.ringIndex],
            PLANET_MOONS[planet.moonIndex]
        );
    }, []);

    useEffect(() => {
        const combined = buildPlanet({ baseIndex, detailIndex, ringIndex, moonIndex });
        setCurrentPlanet(combined);
    }, [baseIndex, detailIndex, ringIndex, moonIndex, buildPlanet]);

    const handleSavePlanet = () => {
        const newPlanet: Planet = { baseIndex, detailIndex, ringIndex, moonIndex };
        
        const isDuplicate = savedPlanets.some(
          (p) =>
            p.baseIndex === newPlanet.baseIndex &&
            p.detailIndex === newPlanet.detailIndex &&
            p.ringIndex === newPlanet.ringIndex &&
            p.moonIndex === newPlanet.moonIndex
        );

        if (!isDuplicate) {
          setSavedPlanets([...savedPlanets, newPlanet]);
        } else {
            alert("Hành tinh này đã được lưu rồi!");
        }
    };

    const handleDeletePlanet = (indexToDelete: number) => {
        setSavedPlanets(savedPlanets.filter((_, index) => index !== indexToDelete));
    };

    const handleLoadPlanet = (planet: Planet) => {
        setBaseIndex(planet.baseIndex);
        setDetailIndex(planet.detailIndex);
        setRingIndex(planet.ringIndex);
        setMoonIndex(planet.moonIndex);
    };

    const getCanvasForPlanet = (planetParts: PlanetPart, pixelSize: number, withBackground: boolean = false): HTMLCanvasElement | null => {
         const canvasColorMap: { [key: string]: string } = {
            'p': '#a855f7', 'P': '#7e22ce', 'e': '#10b981', 'E': '#047857',
            'o': '#3b82f6', 'O': '#1d4ed8', 'm': '#ef4444', 'M': '#b91c1c',
            'd': '#d97706', 'D': '#92400e', 'c': '#9ca3af', 'C': '#4b5563',
            'w': '#ffffff', 'i': '#bae6fd', 'I': '#94a3b8', 'S': '#cbd5e1',
            'q': '#f97316', 'Q': '#c2410c', 'j': '#fde047', 'J': '#ffffff',
            'g': '#22c55e', 'G': '#15803d',
            'l': '#a3e635',
            'L': '#65a30d',
            '8': '#f97316',
            '9': '#c2410c'
        };
        
        if (planetParts.length === 0) return null;
    
        const maxCharWidth = planetParts.length > 0 ? planetParts[0].length : 0;
        const totalCharHeight = planetParts.length;
        
        const canvas = document.createElement('canvas');
        canvas.width = maxCharWidth * pixelSize;
        canvas.height = totalCharHeight * pixelSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        if (withBackground) {
          ctx.fillStyle = '#111827'; // Dark space background
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        planetParts.forEach((rowStr, rowIndex) => {
            rowStr.split('').forEach((pixel, colIndex) => {
                if (canvasColorMap[pixel]) {
                    ctx.fillStyle = canvasColorMap[pixel];
                    ctx.fillRect(colIndex * pixelSize, rowIndex * pixelSize, pixelSize, pixelSize);
                }
            });
        });
        return canvas;
    };
    
    const handleDownloadSingle = () => {
        if (!currentPlanet) return;
        const canvas = getCanvasForPlanet(currentPlanet, 20, false); // Set withBackground to false for transparent PNG
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = 'pixel-planet.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadAll = () => {
        if (savedPlanets.length === 0) return;

        const PIXEL_SIZE = 4;
        const PADDING = 10;
        const ITEMS_PER_ROW = 10;

        const planetsData = savedPlanets.map(p => {
            const finalPlanet = buildPlanet(p);
            return getCanvasForPlanet(finalPlanet, PIXEL_SIZE, false); // Get transparent canvases first
        }).filter((c): c is HTMLCanvasElement => c !== null);

        const maxItemWidth = Math.max(0, ...planetsData.map(t => t.width));
        const maxItemHeight = Math.max(0, ...planetsData.map(t => t.height));

        const cellWidth = maxItemWidth + PADDING * 2;
        const cellHeight = maxItemHeight + PADDING * 2;

        const numRows = Math.ceil(savedPlanets.length / ITEMS_PER_ROW);
        const numCols = Math.min(savedPlanets.length, ITEMS_PER_ROW);

        const canvas = document.createElement('canvas');
        canvas.width = numCols * cellWidth;
        canvas.height = numRows * cellHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.fillStyle = '#111827'; // Fill the collection canvas with the background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        planetsData.forEach((planetCanvas, index) => {
            const gridX = index % ITEMS_PER_ROW;
            const gridY = Math.floor(index / ITEMS_PER_ROW);

            const canvasX = gridX * cellWidth + PADDING;
            const canvasY = gridY * cellHeight + PADDING;

            const xOffset = (maxItemWidth - planetCanvas.width) / 2;
            const yOffset = (maxItemHeight - planetCanvas.height) / 2;
            
            ctx.drawImage(planetCanvas, canvasX + xOffset, canvasY + yOffset);
        });

        const link = document.createElement('a');
        link.download = 'pixel-planets_collection.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div>
            <section className="bg-gray-800 rounded-lg p-4 mb-8 min-h-[250px] flex items-center justify-center">
                {currentPlanet && (
                    <PixelArtDisplay part={currentPlanet} />
                )}
            </section>

            <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                <button
                    onClick={generateRandomPlanet}
                    className="col-span-2 sm:col-span-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                >
                    Tạo Ngẫu Nhiên
                </button>
                 <button
                    onClick={handleSavePlanet}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                >
                    Lưu Hành tinh
                </button>
                <button
                    onClick={handleDownloadSingle}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                >
                    Tải PNG
                </button>
            </section>

            <div>
                <PartSelector title="Thân" parts={PLANET_BASES} selectedIndex={baseIndex} onSelect={setBaseIndex} />
                <PartSelector title="Chi Tiết" parts={PLANET_DETAILS} selectedIndex={detailIndex} onSelect={setDetailIndex} />
                <PartSelector title="Vành Đai" parts={PLANET_RINGS} selectedIndex={ringIndex} onSelect={setRingIndex} />
                <PartSelector title="Mặt Trăng" parts={PLANET_MOONS} selectedIndex={moonIndex} onSelect={setMoonIndex} />
             </div>

             {savedPlanets.length > 0 && (
                <section className="mt-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold">Hành tinh Đã Lưu</h2>
                    <button
                    onClick={handleDownloadAll}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                    Tải Tất Cả
                    </button>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {savedPlanets.map((planet, index) => {
                       const finalPlanet = buildPlanet(planet);
                       return (
                        <div key={index} className="relative group cursor-pointer" onClick={() => handleLoadPlanet(planet)}>
                            <div className="aspect-square flex items-center justify-center bg-gray-700 rounded-md p-1">
                                <PixelArtDisplay part={finalPlanet} size="sm" />
                            </div>
                            <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePlanet(index);
                            }}
                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Xóa hành tinh"
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