type CloudPart = string[];

// w: white (main body)
// c: light grey (shadow)
// C: dark grey (shadow)
// x: darker grey (storm/eyes)
// y, Y: yellow (lightning/sun)
// s, N: blue (rain)
// k: pink (cheeks)
// 3,8,g,0,v: rainbow colors (red, orange, green, yellow, violet)
// $: black (mouth/eyes)

export const CLOUD_BASES: CloudPart[] = [
  // 1. Classic Fluffy
  [
    '     wwwwww     ',
    '   wwwwwwwwww   ',
    '  wwwwwwwwwwww  ',
    ' wwwwwwwwwwwwww ',
    'wwwwccccwwwwwwww',
    'wwccwwccccwwccww',
    ' wwwwccccwwwwww ',
    '  wwccccwwwwww  ',
  ],
  // 2. Long Stratus
  [
    '                ',
    '                ',
    ' wwwwwwwwwwwwwwww ',
    'wwwwwwwwwwwwwwwwww',
    'wwccccwwccccwwccww',
    ' wwwwwwwwwwwwwwww ',
    '                ',
    '                ',
  ],
  // 3. Tall Cumulus
  [
    '      wwww      ',
    '    wwwwwwww    ',
    '   wwwwwwwwww   ',
    '  wwwwwwwwwwww  ',
    ' wwwwwwwwwwwwww ',
    'wwwwccccwwwwwwww',
    'wwccwwccccwwccww',
    ' wwwwccccwwwwww ',
  ],
  // 4. Heart-shaped
  [
    '  wwww    wwww  ',
    ' wwwwww  wwwwww ',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwwccccwwwwwwww',
    ' wwccwwccccwwcc ',
    '  wwwwccccwwww  ',
    '   wwccccww   ',
  ],
  // 5. Small Puffs
  [
    '                ',
    '  www    wwww   ',
    ' wwww   wwwwww  ',
    ' wccw   wwccww  ',
    '         wwww   ',
    '        wccw    ',
    '                ',
    '                ',
  ],
  // 6. Dark Storm Cloud
  [
    '     cccccc     ',
    '   cccccccccc   ',
    '  ccCxCxxxCccc  ',
    ' cccxxxxxxxcccc ',
    'cccxxxxxxxxxxxx',
    'ccxxxxxxxxxxccxx',
    ' cccxxxxxxxxccc ',
    '  ccxxxxxxxxcc  ',
  ],
  // 7. Wispy Cirrus
  [
    '                ',
    '  ww      ww    ',
    '   www   wwww   ',
    '    wwwwwwww    ',
    '     wccccw     ',
    '    wwwwwwww    ',
    '   www  wwww    ',
    '  ww     ww     ',
  ],
  // 8. Ring Cloud
  [
    '    wwwwwwww    ',
    '  ww        ww  ',
    ' w    wwww    w ',
    ' w   wccccw   w ',
    ' w    wwww    w ',
    '  ww        ww  ',
    '    wwwwwwww    ',
    '   wccw  wccw   ',
  ],
  // 9. Flat Bottom
  [
    '      wwww      ',
    '   wwwwwwwwww   ',
    '  wwwwwwwwwwww  ',
    ' wwwwwwwwwwwwww ',
    'wwwwwwwwwwwwwwww',
    'cccccccccccccccc',
    ' CCCCCCCCCCCCCC ',
    '   xxxxxxxxxx   ',
  ],
  // 10. Lumpy & Bumpy
  [
    '   ww  wwww  ww ',
    '  wwwwwwwwwwww  ',
    ' wwwwwwwwwwwwww ',
    'wwwwwwwwwwwwwwww',
    'wccwwwccccwwwwcw',
    ' wwwccwccwwwwww ',
    '  wwwwccccww w  ',
    '   ww      ww   ',
  ],
];

export const CLOUD_DETAILS: CloudPart[] = [
  // 1. No Details
  [' '],
  // 2. Rain
  [
    '                ',
    '                ',
    '                ',
    '                ',
    '                ',
    ' s N s N s N s N ',
    'N s N s N s N s ',
    ' s N s N s N s N ',
  ],
  // 3. Lightning
  [
    '                ',
    '                ',
    '       y        ',
    '      yy        ',
    '     yYy        ',
    '    yY yy       ',
    '     yYy        ',
    '      y         ',
  ],
  // 4. Sun Peeking
  [
    '  yyy           ',
    ' yYYYy          ',
    'yYYwYYy         ',
    'yYYYYYy         ',
    ' yYYYy          ',
    '  yyy           ',
    '                ',
    '                ',
  ],
  // 5. Rainbow
  [
    '                ',
    '   333333333    ',
    '  88888888888   ',
    ' ggggggggggggg  ',
    '000000000000000 ',
    'vvvvvvvvvvvvvvvvv',
    '                ',
    '                ',
  ],
  // 6. Snow
  [
    '                ',
    '                ',
    '                ',
    '                ',
    '                ',
    ' w   w   w   w  ',
    '  w   w   w   w ',
    ' w   w   w   w  ',
  ],
  // 7. Stars
  [
    '   y   w        ',
    '  y y w y       ',
    ' yyyyy w        ',
    '  y y   y       ',
    ' w     y y w    ',
    'y y   yyyyy w y ',
    ' w     y y   w  ',
    '        y       ',
  ],
  // 8. Moon
  [
    '          cCc   ',
    '         cwwCc  ',
    '        cwcwwc  ',
    '        cwwwwc  ',
    '        cwwwwc  ',
    '         cwwCc  ',
    '          cCc   ',
    '                ',
  ],
  // 9. Windy Lines
  [
    '                ',
    ' cccc           ',
    '      cccc      ',
    '           cccc ',
    ' cccc           ',
    '      cccc      ',
    '           cccc ',
    '                ',
  ],
  // 10. Airplane
  [
    '                ',
    '                ',
    '        cc      ',
    '       cwwc     ',
    '  ccccwwwwwwcccc',
    '   ccww3wwcc    ',
    '     cwwc       ',
    '      cc        ',
  ],
];

export const CLOUD_FACES: CloudPart[] = [
  // 1. No Face
  [' '],
  // 2. Happy
  [
    '                ',
    '                ',
    '   xx    xx     ',
    '   xx    xx     ',
    '                ',
    '   $        $   ',
    '    $$$$$$$$    ',
    '                ',
  ],
  // 3. Sad
  [
    '                ',
    '                ',
    '   xx    xx     ',
    '   xx    xx     ',
    '                ',
    '    $$$$$$$$    ',
    '   $        $   ',
    '                ',
  ],
  // 4. Angry
  [
    '                ',
    '  xx      xx    ',
    '   xx    xx     ',
    '    xx  xx      ',
    '                ',
    '    $$$$$$$$    ',
    '                ',
    '                ',
  ],
  // 5. Sleeping
  [
    '                ',
    '                ',
    '                ',
    '  xxxx   xxxx   ',
    '                ',
    '      $$$$      ',
    '                ',
    '                ',
  ],
  // 6. Winking
  [
    '                ',
    '                ',
    '  xxxx    xx    ',
    '  xxxx    xx    ',
    '                ',
    '     $      $   ',
    '      $$$$$$    ',
    '                ',
  ],
  // 7. Surprised
  [
    '                ',
    '                ',
    '   xx    xx     ',
    '   xx    xx     ',
    '                ',
    '     $$$$$$     ',
    '    $      $    ',
    '     $$$$$$     ',
  ],
  // 8. Kawaii ^-^
  [
    '                ',
    '                ',
    '  x  x   x  x   ',
    '   xx     xx    ',
    '                ',
    '      $  $      ',
    '     $ $$ $     ',
    '                ',
  ],
  // 9. Blushing
  [
    '                ',
    '                ',
    '   xx    xx     ',
    '  k xx  xx k    ',
    ' kk xx  xx kk   ',
    '      $$      ',
    '     $$$$     ',
    '                ',
  ],
  // 10. Dizzy
  [
    '                ',
    '                ',
    '   x  x   x  x  ',
    '    xx     xx   ',
    '   x  x   x  x  ',
    '                ',
    '      $$$$      ',
    '                ',
  ],
];

export const CLOUD_COMPANIONS: CloudPart[] = [
  // 1. No Companion
  [' '],
  // 2. Small Bird
  [
    '                ',
    '                ',
    '   YY      ',
    '  Y$$Y     ',
    ' Y$N$Y     ',
    '  Y$Y      ',
    '   Y       ',
    '                ',
  ],
  // 3. Sun
  [
    '           yyy  ',
    '          yYYYy ',
    '         yYYYYYy',
    '         yYYYYYy',
    '          yYYYy ',
    '           yyy  ',
    '                ',
    '                ',
  ],
  // 4. Moon & Stars
  [
    ' cCc       w    ',
    'cwwCc     w w   ',
    'cwwwwc     w  y ',
    ' cwwCc       y y',
    '  cCc      yyyyy',
    '            y y ',
    '             y  ',
    '                ',
  ],
  // 5. Little Clouds
  [
    ' www            ',
    'wcccw  ww       ',
    '      wccw      ',
    '                ',
    '           www  ',
    '          wcccw ',
    '                ',
    '                ',
  ],
  // 6. Paper Plane
  [
    '                ',
    '                ',
    '    w           ',
    '   wcw          ',
    '  wcccw         ',
    ' wcwcw          ',
    'wcccw           ',
    '                ',
  ],
  // 7. UFO
  [
    '                ',
    '     cCc        ',
    '    CxxxC       ',
    '   cxxgxxC      ',
    '  CxxxxxxxC     ',
    '      y         ',
    '                ',
    '                ',
  ],
  // 8. Kite
  [
    '             3  ',
    '            343 ',
    '           34w43',
    '          s 343 s',
    '         N s3s N',
    '        s Ns N s',
    '         s Ns   ',
    '          s     ',
  ],
  // 9. Hot Air Balloon
  [
    '    33333       ',
    '   34gGg43      ',
    '  3gGgGgGg3     ',
    ' 34gGgGgG43     ',
    '  3gGgGgGg3     ',
    '   344443       ',
    '    nbBn        ',
    '                ',
  ],
  // 10. Little Dragon
  [
    '                ',
    '           g    ',
    '          ggG   ',
    '   gggg  gGgGg  ',
    '  gGgGgggGgGwwg ',
    ' gGgGgGgGgGw$wg ',
    '  gGgGgggggGg   ',
    '   gggg  gg     ',
  ],
];