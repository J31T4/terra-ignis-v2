import React from 'react';

/**
 * FlameDivider — thin SVG wave between sections that reads as a row of flames.
 *   flip=false: red flames hanging from the top (white section above, red below)
 *   flip=true : red flames rising from the bottom (red section above, white below)
 * Decorative only — hidden from screen readers, static under reduced motion.
 */
export const FlameDivider: React.FC<{ flip?: boolean; className?: string }> = ({
  flip = false,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-[0] ${flip ? '-mt-px' : '-mb-px'} ${className}`}
    >
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        className={`block w-full h-[42px] sm:h-[52px] ${flip ? 'rotate-180' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,52 L0,26
             C 18,26 24,6 30,6 C 36,6 40,22 48,22 C 56,22 62,2 70,2
             C 78,2 82,20 90,20 C 98,20 104,10 112,10
             C 120,10 124,24 132,24 C 140,24 146,4 154,4
             C 162,4 168,21 176,21 C 184,21 190,12 198,12
             C 206,12 212,25 220,25 C 228,25 234,3 242,3
             C 250,3 256,19 264,19 C 272,19 278,9 286,9
             C 294,9 300,24 308,24 C 316,24 322,5 330,5
             C 338,5 344,22 352,22 C 360,22 366,11 374,11
             C 382,11 388,25 396,25 C 404,25 410,2 418,2
             C 426,2 432,20 440,20 C 448,20 454,10 462,10
             C 470,10 476,24 484,24 C 492,24 498,4 506,4
             C 514,4 520,21 528,21 C 536,21 542,12 550,12
             C 558,12 564,25 572,25 C 580,25 586,3 594,3
             C 602,3 608,19 616,19 C 624,19 630,9 638,9
             C 646,9 652,24 660,24 C 668,24 674,5 682,5
             C 690,5 696,22 704,22 C 712,22 718,11 726,11
             C 734,11 740,25 748,25 C 756,25 762,2 770,2
             C 778,2 784,20 792,20 C 800,20 806,10 814,10
             C 822,10 828,24 836,24 C 844,24 850,4 858,4
             C 866,4 872,21 880,21 C 888,21 894,12 902,12
             C 910,12 916,25 924,25 C 932,25 938,3 946,3
             C 954,3 960,19 968,19 C 976,19 982,9 990,9
             C 998,9 1004,24 1012,24 C 1020,24 1026,5 1034,5
             C 1042,5 1048,22 1056,22 C 1064,22 1070,11 1078,11
             C 1086,11 1092,25 1100,25 C 1108,25 1114,2 1122,2
             C 1130,2 1136,20 1144,20 C 1152,20 1158,10 1166,10
             C 1174,10 1180,24 1188,24 C 1196,24 1202,4 1210,4
             C 1218,4 1224,21 1232,21 C 1240,21 1246,12 1254,12
             C 1262,12 1268,25 1276,25 C 1284,25 1290,3 1298,3
             C 1306,3 1312,19 1320,19 C 1328,19 1334,9 1342,9
             C 1350,9 1356,24 1364,24 C 1372,24 1378,5 1386,5
             C 1394,5 1400,22 1408,22 C 1416,22 1424,11 1432,11
             C 1438,11 1440,18 1440,26 L1440,52 Z"
          fill="#C8102E"
        />
      </svg>
    </div>
  );
};
