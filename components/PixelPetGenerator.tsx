import React, { useState, useEffect, useCallback } from 'react';
import { PET_BODIES, PET_FACES, PET_FEATURES } from '../constants/petParts';
import { PixelArtDisplay } from './PixelArtDisplay';

type PetPart = string[];

interface Pet {
  body: PetPart;
  face: PetPart;
  feature: PetPart;
}

const getRandomItem = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const combineParts = (base: PetPart, ...overlays: PetPart[]): PetPart => {
    let currentCanvas = [...base];
    
    overlays.forEach(overlay => {
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


export const PixelPetGenerator: React.FC = () => {
    const [body, setBody] = useState<PetPart | null>(null);
    const [face, setFace] = useState<PetPart | null>(null);
    const [feature, setFeature] = useState<PetPart | null>(null);
    const [currentPet, setCurrentPet] = useState<PetPart | null>(null);
    const [savedPets, setSavedPets] = useState<Pet[]>([]);

     // Load saved pets from localStorage on initial render
    useEffect(() => {
        try {
            const saved = localStorage.getItem('pixel-pets');
            if (saved) {
                setSavedPets(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Failed to load saved pets:", error);
        }
    }, []);

    // Save pets to localStorage whenever the list changes
    useEffect(() => {
        try {
            localStorage.setItem('pixel-pets', JSON.stringify(savedPets));
        } catch (error) {
            console.error("Failed to save pets:", error);
        }
    }, [savedPets]);


    const generateRandomPet = useCallback(() => {
        setBody(getRandomItem(PET_BODIES));
        setFace(getRandomItem(PET_FACES));
        setFeature(getRandomItem(PET_FEATURES));
    }, []);

    useEffect(() => {
        generateRandomPet();
    }, [generateRandomPet]);

    useEffect(() => {
        if (!body || !face || !feature) return;
        
        const finalPet = combineParts(body, face, feature);
        setCurrentPet(finalPet);

    }, [body, face, feature]);

    const handleSavePet = () => {
        if (!body || !face || !feature) return;
        const newPet: Pet = { body, face, feature };
        
        const isDuplicate = savedPets.some(
          (savedPet) =>
            JSON.stringify(savedPet.body) === JSON.stringify(newPet.body) &&
            JSON.stringify(savedPet.face) === JSON.stringify(newPet.face) &&
            JSON.stringify(savedPet.feature) === JSON.stringify(newPet.feature)
        );

        if (!isDuplicate) {
          setSavedPets([...savedPets, newPet]);
        } else {
            alert("Thú cưng này đã được lưu rồi!");
        }
    };

    const handleDeletePet = (indexToDelete: number) => {
        setSavedPets(savedPets.filter((_, index) => index !== indexToDelete));
    };

    const handleLoadPet = (pet: Pet) => {
        setBody(pet.body);
        setFace(pet.face);
        setFeature(pet.feature);
    };

    const canvasColorMap: { [key: string]: string } = {
        't': '#2dd4bf', 'T': '#0d9488', 'v': '#a78bfa', 'V': '#7c3aed',
        'k': '#f472b6', 'K': '#db2777', 'a': '#fcd34d', 'A': '#f59e0b',
        'w': '#ffffff',
        's': '#38bdf8',
        // FIX: Renamed 'S' to 'N' to align with the key change in PixelArtDisplay.tsx.
        'N': '#0284c7',
        'x': '#374151'
    };
    
    const downloadPet = (petParts: PetPart, filename: string, pixelSize: number) => {
        const PADDING = 10;
        const maxCharWidth = Math.max(0, ...petParts.map(row => row.length));
        const totalCharHeight = petParts.length;

        const canvas = document.createElement('canvas');
        canvas.width = maxCharWidth * pixelSize + PADDING * 2;
        canvas.height = totalCharHeight * pixelSize + PADDING * 2;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        petParts.forEach((rowStr, rowIndex) => {
            rowStr.split('').forEach((pixel, colIndex) => {
                if (canvasColorMap[pixel]) {
                    ctx.fillStyle = canvasColorMap[pixel];
                    ctx.fillRect(
                        PADDING + colIndex * pixelSize,
                        PADDING + rowIndex * pixelSize,
                        pixelSize,
                        pixelSize
                    );
                }
            });
        });

        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const handleDownloadSingle = () => {
        if (!currentPet) return;
        downloadPet(currentPet, 'pixel-pet.png', 20);
    };

    const handleDownloadAll = () => {
        if (savedPets.length === 0) return;

        const PIXEL_SIZE = 4;
        const PADDING = 10;
        const ITEMS_PER_ROW = 10;

        const petsData = savedPets.map(p => {
            const finalPet = combineParts(p.body, p.face, p.feature);
            const width = Math.max(0, ...finalPet.map(row => row.length));
            const height = finalPet.length;
            return { parts: finalPet, width, height };
        });

        const maxItemWidth = Math.max(0, ...petsData.map(t => t.width));
        const maxItemHeight = Math.max(0, ...petsData.map(t => t.height));

        const cellWidth = maxItemWidth * PIXEL_SIZE + PADDING * 2;
        const cellHeight = maxItemHeight * PIXEL_SIZE + PADDING * 2;

        const numRows = Math.ceil(savedPets.length / ITEMS_PER_ROW);
        const numCols = Math.min(savedPets.length, ITEMS_PER_ROW);

        const canvas = document.createElement('canvas');
        canvas.width = numCols * cellWidth;
        canvas.height = numRows * cellHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        petsData.forEach((petData, index) => {
            const gridX = index % ITEMS_PER_ROW;
            const gridY = Math.floor(index / ITEMS_PER_ROW);

            const canvasX = gridX * cellWidth;
            const canvasY = gridY * cellHeight;

            const xOffset = (maxItemWidth - petData.width) * PIXEL_SIZE / 2;
            const yOffset = (maxItemHeight - petData.height) * PIXEL_SIZE / 2;

            petData.parts.forEach((rowStr, rowIndex) => {
                rowStr.split('').forEach((pixel, colIndex) => {
                    if (canvasColorMap[pixel]) {
                        ctx.fillStyle = canvasColorMap[pixel];
                        ctx.fillRect(
                            canvasX + PADDING + xOffset + colIndex * PIXEL_SIZE,
                            canvasY + PADDING + yOffset + rowIndex * PIXEL_SIZE,
                            PIXEL_SIZE,
                            PIXEL_SIZE
                        );
                    }
                });
            });
        });

        const link = document.createElement('a');
        link.download = 'pixel-pets.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <p className="text-center text-gray-600 dark:text-gray-400 -mt-4 mb-8">Nhấn nút để tạo một thú cưng pixel ngẫu nhiên!</p>

            <section className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-8 min-h-[250px] flex items-center justify-center">
                {currentPet && (
                    <PixelArtDisplay part={currentPet} />
                )}
            </section>

            <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                <button
                    onClick={generateRandomPet}
                    className="col-span-2 sm:col-span-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                >
                    Tạo Thú Cưng Mới
                </button>
                 <button
                    onClick={handleSavePet}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                >
                    Lưu Thú Cưng
                </button>
                <button
                    onClick={handleDownloadSingle}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full"
                >
                    Tải PNG
                </button>
            </section>

             {savedPets.length > 0 && (
                <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold">Thú Cưng Đã Lưu</h2>
                    <button
                    onClick={handleDownloadAll}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                    Tải Tất Cả
                    </button>
                </div>
                <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {savedPets.map((pet, index) => {
                       const finalPet = combineParts(pet.body, pet.face, pet.feature);
                       return (
                        <div key={index} className="relative group cursor-pointer" onClick={() => handleLoadPet(pet)}>
                            <div className="aspect-square flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-md p-1">
                                <PixelArtDisplay part={finalPet} size="sm" />
                            </div>
                            <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePet(index);
                            }}
                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Xóa thú cưng"
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