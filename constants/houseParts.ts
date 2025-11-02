type HousePart = string[];

// 3,4: red/brick
// b,B,n: brown/wood
// c,C: grey/stone
// g,G,u,U: green/plants
// y,Y,0: yellow/light/gold
// 5: blue/window
// w: white
// $: black/outline
// z,Z: flowers

export const ROOFS: HousePart[] = [
  // 1. Red Tiled Roof
  [
    '      $      ',
    '     $34$     ',
    '    $3434$    ',
    '   $343434$   ',
    '  $34343434$  ',
    ' $3434343434$ ',
    '$$$$$$$$$$$$$$',
  ],
  // 2. Brown Thatched Roof
  [
    '      Y      ',
    '     yYy     ',
    '    yYnNy    ',
    '   yYnBnNy   ',
    '  yYnBnBnNy  ',
    ' yYnBnBnBnNy ',
    '$bBbBbBbBbBbB$',
  ],
  // 3. Grey Modern Roof
  [
    '  $$$$$$$$$$  ',
    ' $cCcCcCcCcC$ ',
    ' $cCcCcCcCcC$ ',
  ],
  // 4. Steep A-Frame
  [
    '      $      ',
    '     $B$     ',
    '    $bBb$    ',
    '   $BbNbB$   ',
    '  $bBnNnBb$  ',
    ' $BbNnNnNbB$ ',
    '$bBnNnNnNnBb$',
  ],
  // 5. Blue Slanted Roof
  [
    '         $$$',
    '        $56$',
    '       $565$',
    '      $5656$',
    '     $56565$',
    '    $565656$',
    '   $5656565$',
    '$$$$$$$$$$$$',
  ],
  // 6. Green Roof with Chimney
  [
    '     $C$     ',
    '     $c$  $  ',
    '    $gGg$ $G$ ',
    '   $gGgGg$gGg$',
    '  $gGgGgGgGgG$',
    ' $gGgGgGgGgGgG$',
    '$$$$$$$$$$$$$$$',
  ],
  // 7. Pagoda Style
  [
    '      $      ',
    '     $3$     ',
    '  $ $343$ $  ',
    ' $343434343$ ',
    '$$$$$$$$$$$$$',
  ],
  // 8. Rounded Roof
  [
    '   $$$$$$   ',
    '  $bBBBBb$  ',
    ' $bBnNnNbB$ ',
    '$bBnNnNnNnBb$',
    '$$$$$$$$$$$$$$',
  ],
  // 9. Golden Ornate Roof
  [
    '     $Y$     ',
    '    $0Y0$    ',
    ' $0Y0Y0Y0Y0$ ',
    '$0Y0Y0Y0Y0Y0Y0$',
    '$$$$$$$$$$$$$$$',
  ],
  // 10. Simple Wooden Roof
  [
    '     $     ',
    '    $bB$    ',
    '   $bBnB$   ',
    '  $bBnNbB$  ',
    ' $bBnNnNbB$ ',
    '$$$$$$$$$$$$',
  ]
];

export const WALLS: HousePart[] = [
  // 1. Brick with Window
  [
    '$343434343434$',
    '$43 w5w 43434$',
    '$34 w5w 34343$',
    '$43 www 43434$',
    '$343434343434$',
  ],
  // 2. Wooden with Door
  [
    '$bBnNbBnNbBnN$',
    '$Bb         bB$',
    '$nN  $BB$   Nn$',
    '$bB  $nY$   bB$',
    '$nN  $BB$   Nn$',
    '$BbBbBbBbBbBbB$',
  ],
  // 3. Stone Walls
  [
    '$cCcCcCcCcCcC$',
    '$Cc c $ w $ Cc$',
    '$c C c $ $ c C$',
    '$Cc c $ w $ Cc$',
    '$cCcCcCcCcCcC$',
  ],
  // 4. Large Glass Window
  [
    '$bBBBBBBBBBBb$',
    '$B5555555555B$',
    '$B5555555555B$',
    '$B5555555555B$',
    '$bBBBBBBBBBBb$',
  ],
  // 5. Log Cabin Style
  [
    ' $bBBBBBBBBb$ ',
    '$n--------------n$',
    '$B w5w    $B$ B$',
    '$n----- $n$----n$',
    ' $bBBBBBB$B$b$ ',
  ],
  // 6. Stucco with Balcony
  [
    '$yyyyyyyyyyyy$',
    '$yY $bBb$  yYy$',
    '$yY $nNn$  yYy$',
    '$yY $bBb$  yYy$',
    '$yYyYyYyYyYyYy$',
  ],
  // 7. Two Story Windows
  [
    '$343 w5w 4343$',
    '$434 www 3434$',
    '$343434343434$',
    '$434 w5w 4343$',
    '$343 www 3434$',
  ],
  // 8. Simple Cottage
  [
    '$wwwwwwwwwwww$',
    '$w $B$  w5w ww$',
    '$w $n$  w5w ww$',
    '$w $B$  www ww$',
    '$wwwwwwwwwwww$',
  ],
  // 9. Modern Concrete
  [
    '$cCcCcCcCcCcC$',
    '$C         c C$',
    '$c  55555  C c$',
    '$C         c C$',
    '$cCcCcCcCcCcC$',
  ],
  // 10. House with Ivy
  [
    '$3g3G3g3G3g3G$',
    '$G3 wgw 3g3G3g$',
    '$gG wGw GgGgGg$',
    '$G3 www 3g3G3g$',
    '$gGgGgGgGgGgG$',
  ]
];

export const FOUNDATIONS: HousePart[] = [
  // 1. Simple Stone
  [
    '$cCcCcCcCcCcCcC$',
    '$CcCcCcCcCcCcCc$',
  ],
  // 2. Brick Porch
  [
    '  $bBnNnNbB$  ',
    ' $3434343434$ ',
    '$3434343434343$',
  ],
  // 3. Wooden Deck
  [
    '$bBnNbBnNbBnNbB$',
    '  $nNn$  $nNn$  ',
  ],
  // 4. Tall Stone
  [
    '$cCcCcCcCcCcCcC$',
    '$CcCcCcCcCcCcCc$',
    '$cCcCcCcCcCcCcC$',
    '$CcCcCcCcCcCcCc$',
  ],
  // 5. Concrete Steps
  [
    '      $CC$      ',
    '    $cCCCCc$    ',
    '  $cCCCCCCCCc$  ',
    ' $cCCCCCCCCCCc$ ',
  ],
  // 6. Grassy Hill
  [
    '     uUuU     ',
    '   gGuUuUuGg   ',
    '  gGgUuUuUgGg  ',
    'gGgGuuUuuUgGgGg',
  ],
  // 7. Minimalist Base
  [
    '$$$$$$$$$$$$$$$$',
  ],
  // 8. Ornate Marble
  [
    '  $wWwWwWwWw$  ',
    ' $wcwcwcwcwcwc$ ',
    '$wcwcwcwcwcwcwc$',
  ],
  // 9. Overgrown Foundation
  [
    '$cGcCcGcCgCcCcC$',
    '$CgcCcGgCcCcCcC$',
    'gGgGgGgGgGgGgGg',
  ],
  // 10. Water Moat
  [
    '$cCcCcCcCcCcCcC$',
    '$56565656565656$',
    '$65656565656565$',
  ]
];

export const YARDS: HousePart[] = [
  // 1. Picket Fence
  [
    ' uUu w uUu w uUu w ',
    'uUuUu w uUu w uUuUw',
    '$$$$$$$$$$$$$$$$$$$',
  ],
  // 2. Flower Garden
  [
    'zZ u U zZ u Uu',
    'Uu u zZ uU u zZ',
    ' uUu Uu u Uu u',
  ],
  // 3. Cobblestone Path
  [
    'uUu cC uUuUu',
    'uU cCC c uUu',
    'u cCCC cC uU',
    'uU cC u c uU',
  ],
  // 4. Single Tree
  [
    '      gGg      uUu',
    'uUu  gGhhhGg  uUu',
    'uUu gghhhhhgg uUu',
    'uUu   bBnB    uUu',
    'uUu   bBnb    uUu',
  ],
  // 5. Pond
  [
    ' uUuUuUuUuUu ',
    'uUu 56565 uUu',
    'uUuU 565 UuUu',
    ' uUuUuUuUuUu ',
  ],
  // 6. Empty Lawn
  [
    'uUuUuUuUuUuUuUu',
    'UuUuUuUuUuUuUuU',
    'uUuUuUuUuUuUuUu',
  ],
  // 7. Vegetable Patch
  [
    'uU F u 3 u G u',
    '$$$$$$$$$$$$$$$',
    'uU g u Y u 4 u',
    '$$$$$$$$$$$$$$$',
  ],
  // 8. Rocky Garden
  [
    '  c C u cC u ',
    ' uC cC c u C c',
    'cC c u C cC u ',
    'zZ c uU c Zz u',
  ],
  // 9. Tall Fence
  [
    'bBb bBb bBb bBb',
    'nNn nNn nNn nNn',
    'bBb bBb bBb bBb',
    '$$$$$$$$$$$$$$$$',
  ],
  // 10. Path to Door
  [
    'uUuUuU cC UuUuU',
    'UuUuUu cC uUuUu',
    'uUuUuU cC UuUuU',
    'UuUuUu cC uUuUu',
  ]
];
