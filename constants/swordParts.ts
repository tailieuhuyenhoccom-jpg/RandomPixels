type SwordPart = string[];

// S: silver, #: dark silver, $: outline, w: shine
// b: brown, B: dark brown, n: light brown
// 3,4: red gem
// x: black (for skull)
// 0,Y: gold
export const BLADES: SwordPart[] = [
  // 1. Classic Longsword - Mỏng hơn, gốc kiếm tốt hơn
  [
    '   $   ',
    '  $#$  ',
    ' $#wS$ ',
    ' $#S#$ ',
    ' $#S#$ ',
    ' $#S#$ ',
    ' $#S#$ ',
    ' $#S#$ ',
    ' $#S#$ ',
    ' $#S#$ ',
    ' $#S#$ ',
    ' $#S#$ ',
    ' $#S#$ ',
    '  $S$  ',
    ' $S#S$ ', 
  ],
  // 2. Slender Broadsword - Mỏng hơn, gốc kiếm tốt hơn
  [
    '   $   ',
    '  $#$  ',
    ' $#wS#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    '  $S#S$  ',
    ' $S#S#S$ ',
  ],
  // 3. Katana - Dài hơn một chút
  [
    '         $ ',
    '        $#$',
    '       $#wS',
    '      $#SwS',
    '     $#SwS$',
    '    $#SwSS$',
    '   $#SwSS$ ',
    '  $#SwSS$  ',
    ' $#SwSS$   ',
    ' $SSwSS$   ',
    ' $SSwSS$   ',
    '  $SSwS$   ',
    '   $S#S$   ',
  ],
  // 4. Dagger - Mỏng hơn
  [
    '  $  ',
    ' $#$ ',
    '$#wS$',
    '$#S#$',
    '$#S#$',
    ' $S$ ',
    ' $S$ ',
  ],
  // 5. Greatsword - Mỏng hơn
  [
    '   $   ',
    '  $#$  ',
    ' $#wS#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    ' $#S#S#$ ',
    '  $S#S$  ',
    '   $S$   ',
    ' $S#S#S$ ',
  ],
  // 6. Chipped Blade - Mỏng hơn
  [
    '   $   ',
    '  $#$  ',
    ' $# S$ ',
    ' $#S#$ ',
    ' $# S#$',
    '$#SwS #',
    ' $#S#S$ ',
    ' $ S wS$',
    '$#S#S S#',
    ' $# S S$',
    ' $#S#S#$ ',
    '  $#S#$  ',
    '   $S$   ',
    '  $S#S$  ',
  ],
   // 7. Serrated Edge - Mỏng hơn
  [
    '   $   ',
    '  $#$  ',
    '$ $#$ $',
    ' $#wS$ ',
    '$ $#S$ $',
    ' $#S#$ ',
    '$ $#S$ $',
    ' $#S#$ ',
    '$ $#S$ $',
    ' $#S#$ ',
    '$ $#S$ $',
    ' $#S#$ ',
    '  $S$  ',
    ' $S#S$ ',
  ],
  // 8. Crystal Blade - Mỏng hơn
  [
    '   w   ',
    '  w#w  ',
    ' w#w#w ',
    ' w#S#w ',
    'w#S#S#w',
    'w#S#S#w',
    'w#S#S#w',
    'w#S#S#w',
    'w#S#S#w',
    'w#S#S#w',
    'w#S#S#w',
    ' w#S#w ',
    '  w#w  ',
    ' w#S#S#w ',
  ],
    // 9. Golden Blade - Mỏng hơn và màu sắc nhất quán
  [
    '   $   ',
    '  $0$  ',
    ' $0wY$ ',
    ' $0YYY0$ ',
    ' $0YwY0$ ',
    ' $0YYY0$ ',
    ' $0YwY0$ ',
    ' $0YYY0$ ',
    ' $0YwY0$ ',
    ' $0YYY0$ ',
    ' $0YwY0$ ',
    ' $0YYY0$ ',
    '  $YYY$  ',
    '   $Y$   ',
    '  $YYYYY$  ',
  ],
   // 10. Rapier - Gốc kiếm tốt hơn
  [
    '    $    ',
    '    $    ',
    '   $#$   ',
    '   $w$   ',
    '   $S$   ',
    '   $S$   ',
    '   $S$   ',
    '   $S$   ',
    '   $S$   ',
    '   $S$   ',
    '   $S$   ',
    '   $S$   ',
    '   $S$   ',
    '   $#$   ',
    '  $S#S$  ',
  ],
];

export const GUARDS: SwordPart[] = [
    // 1. Classic Crossguard
    [
        '$$$$$$$$$$$',
        '$nbBBBBBnB$',
        ' $nbBBBnB$ ',
    ],
    // 2. Curved Guard
    [
        '$$       $$',
        '$nb$   $bn$',
        ' $nb$ $bn$ ',
        '  $nb$bn$  ',
        '   $bbbB$   ',
    ],
    // 3. Winged Guard
    [
        '$nb$     $bn$',
        '$BBnb$ $bnBB$',
        ' $BBnb$bnBB$ ',
        '  $BBbbbBB$  ',
        '   $BnbnB$   ',
    ],
    // 4. Spiked Guard
    [
        '$   $ $   $',
        ' $ nbBnB$ ',
        ' $nbBBBBnB$',
        '  $nbBBnB$ ',
    ],
    // 5. Ornate Guard
    [
        '  $nb   bn$  ',
        ' $nBb   bBn$ ',
        '$nBBb   bBBn$',
        ' $nBBBBBBn$ ',
        '  $nBBBBn$  ',
    ],
    // 6. Simple Bar
    [
        '$$$$$$$$$$$',
        '$nbbbbbbbn$',
    ],
    // 7. Round Guard
    [
        '    $$$    ',
        '  $$nBnb$$  ',
        ' $nBBBBBBn$ ',
        '$$nBBBBBBn$$',
        ' $nBBBBBBn$ ',
        '  $$nBnb$$  ',
        '    $$$    ',
    ],
    // 8. Imperial Guard
    [
        '$$nBB$ $BBn$$',
        ' $nBB$ $BBn$ ',
        '  $nB$ $Bn$  ',
        '   $B b B$   ',
    ],
    // 9. Minimalist
    [
        '   $$$$$   ',
        '   $nBn$   ',
    ],
    // 10. Beast Guard
    [
        '$nb$ $ $bn$',
        '$BBnb$bnBB$',
        ' $nBBnBBn$ ',
        '  $nbBnB$  ',
        '   $$ $$   ',
    ],
];

export const HILTS: SwordPart[] = [
    // 1. Simple Brown
    [
        '   $bbb$   ',
        '   $nBn$   ',
        '   $nBn$   ',
        '   $bbb$   ',
    ],
    // 2. Wrapped
    [
        '   $bnb$   ',
        '   $nbn$   ',
        '   $bnB$   ',
        '   $nBn$   ',
        '   $bnb$   ',
    ],
    // 3. Long Hilt
    [
        '   $nBn$   ',
        '   $bbb$   ',
        '   $nBn$   ',
        '   $bbb$   ',
        '   $nBn$   ',
        '   $bbb$   ',
    ],
    // 4. Tapered
    [
        '   $bbb$   ',
        '  $nBBnB$  ',
        '   $bbb$   ',
    ],
    // 5. Ornate Hilt
    [
        '   $nbn$   ',
        '  $nbBnb$  ',
        '   $nbn$   ',
        '  $nbBnb$  ',
        '   $nbn$   ',
    ],
    // 6. Ridged
    [
        '  $bbbbb$  ',
        '   $nBn$   ',
        '  $bbbbb$  ',
        '   $nBn$   ',
        '  $bbbbb$  ',
    ],
    // 7. Thick Hilt
    [
        '  $bbbbb$  ',
        '  $nBBBB$  ',
        '  $nBBBB$  ',
        '  $bbbbb$  ',
    ],
    // 8. Darkwood
    [
        '   $BBB$   ',
        '   $nbn$   ',
        '   $nbn$   ',
        '   $BBB$   ',
    ],
    // 9. Short and Stubby
    [
        '  $bbbbb$  ',
        '  $nBBnB$  ',
    ],
    // 10. Leather Straps
    [
        '   $b$b$   ',
        '   $n$n$   ',
        '   $b$b$   ',
        '   $n$n$   ',
        '   $b$b$   ',
    ],
];

export const POMMELS: SwordPart[] = [
    // 1. Round Pommel
    [
        '   $bbb$   ',
        '  $nbBnb$  ',
        '   $bbb$   ',
    ],
    // 2. Diamond
    [
        '    $b$    ',
        '   $nbn$   ',
        '  $nbBnb$  ',
        '   $nbn$   ',
        '    $b$    ',
    ],
    // 3. Skull
    [
        '   $ww$   ',
        '  $wxxw$  ',
        '  $wxwx$  ',
        '   $$$   ',
    ],
    // 4. Spiked
    [
        '    $b$    ',
        '$ $nbnB$ $',
        ' $$nbnB$$ ',
        '  $$bB$$  ',
    ],
    // 5. Flat Cap
    [
        ' $$$$$$$ ',
        ' $nbbbn$ ',
    ],
    // 6. Ornate Cap
    [
        '   $ b $   ',
        '  $nbBnb$  ',
        ' $nbbbbbn$ ',
    ],
    // 7. Minimal
    [
        '   $bbb$   ',
    ],
    // 8. Gemstone
    [
        '   $343$   ',
        '  $3w4w3$  ',
        '   $343$   ',
    ],
    // 9. Claw
    [
        '  $     $  ',
        '   $   $   ',
        '  $nbBnb$  ',
        '   $bbb$   ',
    ],
    // 10. Ring
    [
        '   $bbb$   ',
        '  $b   b$  ',
        '  $b   b$  ',
        '   $bbb$   ',
    ],
];