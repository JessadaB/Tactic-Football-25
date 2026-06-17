const ATTRIBUTES = {
  technical: ["finishing", "passing", "firstTouch", "dribbling", "crossing", "tackling", "heading", "longShots", "technique"],
  mental: ["decisions", "vision", "workRate", "positioning", "composure", "leadership", "aggression", "teamwork", "anticipation", "concentration", "flair", "bravery"],
  physical: ["pace", "stamina", "strength", "agility", "balance", "jumping", "naturalFitness", "acceleration"],
};

const ATTRIBUTE_DESIGN = {
  scale: "All visible player attributes use a 1-20 range.",
  currentAbility: "Hidden 1-200 value that weights first-team strength and match form.",
  potentialAbility: "Hidden 1-200 value that drives long-term growth ceiling.",
  injuryProneness: "Hidden 1-20 risk value checked against fatigue, intensity and weather.",
};

const SQUAD_GROUPS = {
  senior: "Senior",
  sub: "Subs",
  u21: "U21",
  u18: "U18",
};

const WEATHER = {
  clear: { tempo: 1, technical: 1, injury: 1, notes: "Clean technical conditions." },
  rain: { tempo: 0.93, technical: 0.92, injury: 1.16, notes: "Passing and first touch degrade." },
  wind: { tempo: 0.9, technical: 0.9, injury: 1.05, notes: "Crosses and long shots become volatile." },
  heat: { tempo: 0.86, technical: 0.97, injury: 1.22, notes: "Stamina drains faster." },
  snow: { tempo: 0.82, technical: 0.88, injury: 1.18, notes: "Heavy surface slows ball speed and player acceleration." },
};

const PITCH_CONDITIONS = {
  dry: { ballDrag: 0.965, passAccuracy: 1, bounce: 0.92, stamina: 1, notes: "Dry grass keeps the ball predictable." },
  wet: { ballDrag: 0.982, passAccuracy: 0.93, bounce: 1.06, stamina: 1.04, notes: "Wet grass speeds skids but hurts short-pass touch." },
  longGrass: { ballDrag: 0.935, passAccuracy: 0.96, bounce: 0.78, stamina: 1.08, notes: "Long grass slows ground passes and increases running load." },
  worn: { ballDrag: 0.948, passAccuracy: 0.9, bounce: 1.14, stamina: 1.06, notes: "Worn turf creates uneven bounces and loose touches." },
};

const PREMIER_LEAGUE_TEAMS = [
  ["Arsenal", 88, 105_000_000, 2_850_000, "https://crests.football-data.org/57.png"],
  ["Aston Villa", 80, 62_000_000, 1_850_000, "https://crests.football-data.org/58.png"],
  ["Bournemouth", 74, 40_000_000, 1_150_000, "https://crests.football-data.org/1044.png"],
  ["Brentford", 73, 38_000_000, 1_100_000, "https://crests.football-data.org/402.png"],
  ["Brighton & Hove Albion", 78, 58_000_000, 1_450_000, "https://crests.football-data.org/397.png"],
  ["Burnley", 66, 26_000_000, 780_000, "https://crests.football-data.org/328.png"],
  ["Chelsea", 84, 112_000_000, 3_000_000, "https://crests.football-data.org/61.png"],
  ["Crystal Palace", 76, 46_000_000, 1_320_000, "https://crests.football-data.org/354.png"],
  ["Everton", 72, 34_000_000, 1_180_000, "https://crests.football-data.org/62.png"],
  ["Fulham", 74, 42_000_000, 1_250_000, "https://crests.football-data.org/63.png"],
  ["Leeds United", 70, 36_000_000, 920_000, "https://crests.football-data.org/341.png"],
  ["Liverpool", 90, 118_000_000, 3_050_000, "https://crests.football-data.org/64.png"],
  ["Manchester City", 93, 140_000_000, 3_500_000, "https://crests.football-data.org/65.png"],
  ["Manchester United", 83, 98_000_000, 3_100_000, "https://crests.football-data.org/66.png"],
  ["Newcastle United", 82, 92_000_000, 2_250_000, "https://crests.football-data.org/67.png"],
  ["Nottingham Forest", 75, 50_000_000, 1_350_000, "https://crests.football-data.org/351.png"],
  ["Sunderland", 68, 30_000_000, 820_000, "https://crests.football-data.org/71.png"],
  ["Tottenham Hotspur", 84, 96_000_000, 2_550_000, "https://crests.football-data.org/73.png"],
  ["West Ham United", 76, 48_000_000, 1_500_000, "https://crests.football-data.org/563.png"],
  ["Wolverhampton Wanderers", 72, 37_000_000, 1_120_000, "https://crests.football-data.org/76.png"],
];

const LALIGA_TEAMS = [
  ["Athletic Club", 82, 72_000_000, 1_850_000, "https://crests.football-data.org/77.png"],
  ["Atletico Madrid", 86, 98_000_000, 2_500_000, "https://crests.football-data.org/78.png"],
  ["CA Osasuna", 73, 34_000_000, 980_000, "https://crests.football-data.org/79.png"],
  ["Deportivo Alaves", 70, 28_000_000, 820_000, "https://crests.football-data.org/263.png"],
  ["Elche CF", 68, 24_000_000, 760_000, "https://crests.football-data.org/285.png"],
  ["FC Barcelona", 91, 120_000_000, 3_150_000, "https://crests.football-data.org/81.png"],
  ["Getafe CF", 72, 32_000_000, 940_000, "https://crests.football-data.org/82.png"],
  ["Girona FC", 78, 54_000_000, 1_320_000, "https://crests.football-data.org/298.png"],
  ["Levante UD", 69, 26_000_000, 790_000, "https://crests.football-data.org/88.png"],
  ["Rayo Vallecano", 72, 31_000_000, 920_000, "https://crests.football-data.org/87.png"],
  ["RC Celta", 75, 42_000_000, 1_120_000, "https://crests.football-data.org/558.png"],
  ["RCD Espanyol", 71, 30_000_000, 900_000, "https://crests.football-data.org/80.png"],
  ["RCD Mallorca", 73, 36_000_000, 980_000, "https://crests.football-data.org/89.png"],
  ["Real Betis", 80, 62_000_000, 1_650_000, "https://crests.football-data.org/90.png"],
  ["Real Madrid", 95, 150_000_000, 3_700_000, "https://crests.football-data.org/86.png"],
  ["Real Oviedo", 68, 24_000_000, 740_000, "https://crests.football-data.org/275.png"],
  ["Real Sociedad", 82, 68_000_000, 1_800_000, "https://crests.football-data.org/92.png"],
  ["Sevilla FC", 76, 48_000_000, 1_430_000, "https://crests.football-data.org/559.png"],
  ["Valencia CF", 75, 45_000_000, 1_300_000, "https://crests.football-data.org/95.png"],
  ["Villarreal CF", 83, 76_000_000, 1_900_000, "https://crests.football-data.org/94.png"],
];

const CHAMPIONSHIP_TEAMS = [
  ["Birmingham City", 70, 35_000_000, 820_000, "https://crests.football-data.org/332.png"],
  ["Blackburn Rovers", 68, 28_000_000, 720_000, "https://crests.football-data.org/59.png"],
  ["Bristol City", 68, 30_000_000, 760_000, "https://crests.football-data.org/387.png"],
  ["Charlton Athletic", 64, 20_000_000, 540_000, "https://crests.football-data.org/348.png"],
  ["Coventry City", 69, 32_000_000, 780_000, "https://crests.football-data.org/1076.png"],
  ["Derby County", 66, 24_000_000, 650_000, "https://crests.football-data.org/342.png"],
  ["Hull City", 66, 25_000_000, 650_000, "https://crests.football-data.org/322.png"],
  ["Ipswich Town", 74, 46_000_000, 1_020_000, "https://crests.football-data.org/349.png"],
  ["Leicester City", 76, 58_000_000, 1_450_000, "https://crests.football-data.org/338.png"],
  ["Middlesbrough", 70, 34_000_000, 820_000, "https://crests.football-data.org/343.png"],
  ["Millwall", 66, 23_000_000, 620_000, "https://crests.football-data.org/384.png"],
  ["Norwich City", 70, 36_000_000, 880_000, "https://crests.football-data.org/68.png"],
  ["Oxford United", 63, 18_000_000, 500_000, "https://tmssl.akamaized.net/images/wappen/head/988.png"],
  ["Portsmouth", 65, 22_000_000, 590_000, "https://crests.football-data.org/325.png"],
  ["Preston North End", 66, 24_000_000, 630_000, "https://tmssl.akamaized.net/images/wappen/head/466.png"],
  ["Queens Park Rangers", 66, 24_000_000, 640_000, "https://crests.football-data.org/69.png"],
  ["Sheffield United", 73, 44_000_000, 1_000_000, "https://crests.football-data.org/356.png"],
  ["Sheffield Wednesday", 66, 24_000_000, 650_000, "https://crests.football-data.org/345.png"],
  ["Southampton", 74, 48_000_000, 1_080_000, "https://crests.football-data.org/340.png"],
  ["Stoke City", 67, 27_000_000, 700_000, "https://crests.football-data.org/70.png"],
  ["Swansea City", 67, 26_000_000, 690_000, "https://crests.football-data.org/72.png"],
  ["Watford", 68, 30_000_000, 790_000, "https://crests.football-data.org/346.png"],
  ["West Bromwich Albion", 70, 34_000_000, 850_000, "https://crests.football-data.org/74.png"],
  ["Wrexham", 68, 30_000_000, 730_000, "https://tmssl.akamaized.net/images/wappen/head/1112.png"],
];

const SERIE_A_TEAMS = [
  ["Atalanta", 84, 76_000_000, 1_900_000, "https://crests.football-data.org/102.png"],
  ["Bologna", 78, 54_000_000, 1_250_000, "https://crests.football-data.org/103.png"],
  ["Cagliari", 70, 28_000_000, 760_000, "https://crests.football-data.org/104.png"],
  ["Como 1907", 74, 42_000_000, 1_020_000, "https://tmssl.akamaized.net/images/wappen/head/1047.png"],
  ["Cremonese", 68, 24_000_000, 680_000, "https://tmssl.akamaized.net/images/wappen/head/223.png"],
  ["Fiorentina", 80, 62_000_000, 1_550_000, "https://crests.football-data.org/99.png"],
  ["Genoa", 72, 34_000_000, 900_000, "https://crests.football-data.org/107.png"],
  ["Hellas Verona", 70, 28_000_000, 780_000, "https://crests.football-data.org/450.png"],
  ["Inter Milan", 88, 96_000_000, 2_600_000, "https://crests.football-data.org/108.png"],
  ["Juventus", 84, 86_000_000, 2_350_000, "https://crests.football-data.org/109.png"],
  ["Lazio", 80, 64_000_000, 1_700_000, "https://crests.football-data.org/110.png"],
  ["Lecce", 69, 26_000_000, 720_000, "https://tmssl.akamaized.net/images/wappen/head/1005.png"],
  ["AC Milan", 84, 82_000_000, 2_250_000, "https://crests.football-data.org/98.png"],
  ["Napoli", 83, 74_000_000, 2_000_000, "https://crests.football-data.org/113.png"],
  ["Parma", 70, 30_000_000, 780_000, "https://crests.football-data.org/112.png"],
  ["Pisa SC", 67, 22_000_000, 640_000, "https://tmssl.akamaized.net/images/wappen/head/4171.png"],
  ["Roma", 82, 70_000_000, 1_900_000, "https://crests.football-data.org/100.png"],
  ["Sassuolo", 72, 34_000_000, 900_000, "https://crests.football-data.org/471.png"],
  ["Torino", 74, 42_000_000, 1_050_000, "https://crests.football-data.org/586.png"],
  ["Udinese", 72, 34_000_000, 900_000, "https://crests.football-data.org/115.png"],
];

const BUNDESLIGA_TEAMS = [
  ["FC Augsburg", 72, 34_000_000, 940_000, "https://crests.football-data.org/16.png"],
  ["Bayern Munich", 92, 132_000_000, 3_300_000, "https://crests.football-data.org/5.png"],
  ["Borussia Dortmund", 83, 78_000_000, 2_100_000, "https://crests.football-data.org/4.png"],
  ["Borussia Monchengladbach", 75, 46_000_000, 1_150_000, "https://crests.football-data.org/18.png"],
  ["Werder Bremen", 73, 40_000_000, 1_000_000, "https://crests.football-data.org/12.png"],
  ["Eintracht Frankfurt", 80, 68_000_000, 1_650_000, "https://crests.football-data.org/19.png"],
  ["SC Freiburg", 76, 50_000_000, 1_220_000, "https://crests.football-data.org/17.png"],
  ["Hamburger SV", 72, 38_000_000, 1_000_000, "https://crests.football-data.org/7.png"],
  ["FC Heidenheim", 70, 30_000_000, 820_000, "https://crests.football-data.org/44.png"],
  ["TSG Hoffenheim", 74, 44_000_000, 1_100_000, "https://crests.football-data.org/2.png"],
  ["FC Koln", 72, 38_000_000, 980_000, "https://crests.football-data.org/1.png"],
  ["RB Leipzig", 84, 88_000_000, 2_050_000, "https://crests.football-data.org/721.png"],
  ["Bayer Leverkusen", 86, 90_000_000, 2_200_000, "https://crests.football-data.org/3.png"],
  ["Mainz 05", 74, 42_000_000, 1_050_000, "https://crests.football-data.org/15.png"],
  ["St Pauli", 70, 30_000_000, 820_000, "https://crests.football-data.org/20.png"],
  ["VfB Stuttgart", 80, 66_000_000, 1_600_000, "https://crests.football-data.org/10.png"],
  ["Union Berlin", 73, 40_000_000, 1_000_000, "https://crests.football-data.org/28.png"],
  ["VfL Wolfsburg", 75, 46_000_000, 1_150_000, "https://crests.football-data.org/11.png"],
];

const ENGLISH_LEAGUE_ONE_TEAMS = [
  ["AFC Wimbledon", 64, 16_000_000, 420_000, "https://crests.football-data.org/347.png"],
  ["Barnsley", 66, 22_000_000, 520_000, "https://crests.football-data.org/357.png"],
  ["Blackpool", 65, 20_000_000, 500_000, "https://crests.football-data.org/336.png"],
  ["Bolton Wanderers", 66, 24_000_000, 560_000, "https://crests.football-data.org/60.png"],
  ["Bradford City", 63, 16_000_000, 420_000, "https://crests.football-data.org/339.png"],
  ["Burton Albion", 60, 12_000_000, 340_000, null],
  ["Cardiff City", 67, 26_000_000, 620_000, "https://crests.football-data.org/715.png"],
  ["Doncaster Rovers", 62, 14_000_000, 380_000, null],
  ["Exeter City", 61, 13_000_000, 360_000, null],
  ["Huddersfield Town", 66, 24_000_000, 560_000, "https://crests.football-data.org/394.png"],
  ["Leyton Orient", 62, 14_000_000, 380_000, null],
  ["Lincoln City", 63, 16_000_000, 400_000, null],
  ["Luton Town", 70, 34_000_000, 820_000, "https://crests.football-data.org/389.png"],
  ["Mansfield Town", 61, 13_000_000, 360_000, null],
  ["Northampton Town", 60, 12_000_000, 340_000, null],
  ["Peterborough United", 64, 18_000_000, 460_000, "https://crests.football-data.org/1077.png"],
  ["Plymouth Argyle", 66, 24_000_000, 560_000, "https://crests.football-data.org/1138.png"],
  ["Port Vale", 61, 13_000_000, 360_000, null],
  ["Reading", 64, 20_000_000, 500_000, "https://crests.football-data.org/355.png"],
  ["Rotherham United", 65, 20_000_000, 500_000, "https://crests.football-data.org/385.png"],
  ["Stevenage", 61, 12_000_000, 350_000, null],
  ["Stockport County", 63, 16_000_000, 420_000, null],
  ["Wigan Athletic", 64, 19_000_000, 470_000, "https://crests.football-data.org/75.png"],
  ["Wycombe Wanderers", 63, 16_000_000, 420_000, null],
];

const ENGLISH_LEAGUE_TWO_TEAMS = [
  ["Accrington Stanley", 56, 8_000_000, 240_000, null],
  ["Barnet", 55, 7_000_000, 220_000, null],
  ["Barrow", 56, 8_000_000, 240_000, null],
  ["Bristol Rovers", 59, 11_000_000, 310_000, "https://crests.football-data.org/398.png"],
  ["Bromley", 55, 7_000_000, 220_000, null],
  ["Cambridge United", 58, 10_000_000, 290_000, null],
  ["Cheltenham Town", 57, 9_000_000, 260_000, null],
  ["Chesterfield", 58, 10_000_000, 290_000, null],
  ["Colchester United", 57, 9_000_000, 260_000, null],
  ["Crawley Town", 57, 9_000_000, 260_000, null],
  ["Crewe Alexandra", 58, 10_000_000, 290_000, "https://crests.football-data.org/1132.png"],
  ["Fleetwood Town", 58, 10_000_000, 290_000, null],
  ["Gillingham", 58, 10_000_000, 290_000, null],
  ["Grimsby Town", 57, 9_000_000, 260_000, null],
  ["Harrogate Town", 55, 7_000_000, 220_000, null],
  ["Milton Keynes Dons", 60, 12_000_000, 330_000, "https://crests.football-data.org/388.png"],
  ["Newport County", 56, 8_000_000, 240_000, null],
  ["Notts County", 59, 11_000_000, 310_000, null],
  ["Oldham Athletic", 57, 9_000_000, 260_000, null],
  ["Salford City", 58, 10_000_000, 290_000, null],
  ["Shrewsbury Town", 58, 10_000_000, 290_000, "https://crests.football-data.org/358.png"],
  ["Swindon Town", 58, 10_000_000, 290_000, null],
  ["Tranmere Rovers", 57, 9_000_000, 260_000, null],
  ["Walsall", 58, 10_000_000, 290_000, null],
];

const LALIGA_HYPERMOTION_TEAMS = [
  ["Albacete Balompie", 62, 16_000_000, 420_000, null],
  ["UD Almeria", 68, 28_000_000, 700_000, "https://crests.football-data.org/267.png"],
  ["Burgos CF", 61, 14_000_000, 380_000, null],
  ["Cadiz CF", 67, 26_000_000, 660_000, "https://crests.football-data.org/264.png"],
  ["CD Castellon", 60, 12_000_000, 340_000, null],
  ["AD Ceuta", 58, 10_000_000, 300_000, null],
  ["Cordoba CF", 60, 12_000_000, 340_000, "https://crests.football-data.org/295.png"],
  ["Cultural Leonesa", 58, 10_000_000, 300_000, null],
  ["Deportivo La Coruna", 64, 20_000_000, 500_000, "https://crests.football-data.org/560.png"],
  ["SD Eibar", 65, 22_000_000, 540_000, "https://crests.football-data.org/278.png"],
  ["Granada CF", 67, 26_000_000, 660_000, "https://crests.football-data.org/83.png"],
  ["SD Huesca", 62, 16_000_000, 420_000, "https://crests.football-data.org/275.png"],
  ["UD Las Palmas", 66, 24_000_000, 600_000, "https://crests.football-data.org/275.png"],
  ["CD Leganes", 66, 24_000_000, 600_000, "https://crests.football-data.org/745.png"],
  ["Malaga CF", 63, 18_000_000, 460_000, "https://crests.football-data.org/84.png"],
  ["CD Mirandes", 61, 14_000_000, 380_000, null],
  ["Racing Santander", 64, 20_000_000, 500_000, null],
  ["Real Sociedad B", 60, 12_000_000, 340_000, "https://crests.football-data.org/92.png"],
  ["Real Valladolid", 67, 26_000_000, 660_000, "https://crests.football-data.org/250.png"],
  ["Sporting Gijon", 64, 20_000_000, 500_000, "https://crests.football-data.org/96.png"],
  ["Real Zaragoza", 65, 22_000_000, 540_000, "https://crests.football-data.org/83.png"],
  ["FC Andorra", 60, 12_000_000, 340_000, null],
];

const SERIE_B_TEAMS = [
  ["Bari", 62, 16_000_000, 420_000, null],
  ["Carrarese", 58, 10_000_000, 300_000, null],
  ["Catanzaro", 61, 14_000_000, 380_000, null],
  ["Cesena", 61, 14_000_000, 380_000, null],
  ["Empoli", 67, 26_000_000, 660_000, "https://crests.football-data.org/445.png"],
  ["Frosinone", 65, 22_000_000, 540_000, "https://crests.football-data.org/470.png"],
  ["Juve Stabia", 59, 11_000_000, 320_000, null],
  ["Mantova", 59, 11_000_000, 320_000, null],
  ["Modena", 61, 14_000_000, 380_000, null],
  ["Monza", 67, 26_000_000, 660_000, "https://crests.football-data.org/5911.png"],
  ["Padova", 58, 10_000_000, 300_000, null],
  ["Palermo", 64, 20_000_000, 500_000, null],
  ["Pescara", 59, 11_000_000, 320_000, null],
  ["Reggiana", 60, 12_000_000, 340_000, null],
  ["Sampdoria", 64, 20_000_000, 500_000, "https://crests.football-data.org/584.png"],
  ["Spezia", 64, 20_000_000, 500_000, "https://crests.football-data.org/488.png"],
  ["Sudtirol", 59, 11_000_000, 320_000, null],
  ["Venezia", 67, 26_000_000, 660_000, "https://crests.football-data.org/454.png"],
  ["Virtus Entella", 58, 10_000_000, 300_000, null],
  ["Avellino", 58, 10_000_000, 300_000, null],
];

const BUNDESLIGA_2_TEAMS = [
  ["Arminia Bielefeld", 61, 14_000_000, 380_000, "https://crests.football-data.org/38.png"],
  ["VfL Bochum", 68, 28_000_000, 700_000, "https://crests.football-data.org/36.png"],
  ["Eintracht Braunschweig", 61, 14_000_000, 380_000, "https://crests.football-data.org/33.png"],
  ["Darmstadt 98", 65, 22_000_000, 540_000, "https://crests.football-data.org/55.png"],
  ["Dynamo Dresden", 61, 14_000_000, 380_000, null],
  ["Fortuna Dusseldorf", 66, 24_000_000, 600_000, "https://crests.football-data.org/24.png"],
  ["Greuther Furth", 62, 16_000_000, 420_000, "https://crests.football-data.org/21.png"],
  ["Hannover 96", 65, 22_000_000, 540_000, "https://crests.football-data.org/8.png"],
  ["Hertha BSC", 66, 24_000_000, 600_000, "https://crests.football-data.org/9.png"],
  ["Holstein Kiel", 66, 24_000_000, 600_000, "https://crests.football-data.org/720.png"],
  ["Kaiserslautern", 64, 20_000_000, 500_000, "https://crests.football-data.org/13.png"],
  ["Karlsruher SC", 63, 18_000_000, 460_000, "https://crests.football-data.org/39.png"],
  ["Magdeburg", 62, 16_000_000, 420_000, null],
  ["Nurnberg", 64, 20_000_000, 500_000, "https://crests.football-data.org/14.png"],
  ["Paderborn", 63, 18_000_000, 460_000, "https://crests.football-data.org/29.png"],
  ["Preussen Munster", 60, 12_000_000, 340_000, null],
  ["Schalke 04", 67, 26_000_000, 660_000, "https://crests.football-data.org/6.png"],
  ["SV Elversberg", 61, 14_000_000, 380_000, null],
];

const LIGUE_1_TEAMS = [
  ["Paris Saint-Germain", 90, 128_000_000, 3_250_000, "https://crests.football-data.org/524.png"],
  ["Olympique Marseille", 82, 72_000_000, 1_800_000, "https://crests.football-data.org/516.png"],
  ["AS Monaco", 82, 70_000_000, 1_750_000, "https://crests.football-data.org/548.png"],
  ["Olympique Lyonnais", 80, 64_000_000, 1_650_000, "https://crests.football-data.org/523.png"],
  ["Lille OSC", 80, 62_000_000, 1_550_000, "https://crests.football-data.org/521.png"],
  ["OGC Nice", 78, 56_000_000, 1_400_000, "https://crests.football-data.org/522.png"],
  ["Stade Rennais", 78, 54_000_000, 1_350_000, "https://crests.football-data.org/529.png"],
  ["RC Strasbourg", 75, 46_000_000, 1_100_000, "https://crests.football-data.org/576.png"],
  ["RC Lens", 78, 54_000_000, 1_350_000, "https://crests.football-data.org/546.png"],
  ["Stade Brestois", 76, 48_000_000, 1_160_000, "https://crests.football-data.org/512.png"],
  ["Toulouse FC", 73, 38_000_000, 980_000, "https://crests.football-data.org/511.png"],
  ["FC Nantes", 72, 34_000_000, 900_000, "https://crests.football-data.org/543.png"],
  ["Angers SCO", 70, 28_000_000, 760_000, "https://crests.football-data.org/532.png"],
  ["AJ Auxerre", 71, 30_000_000, 800_000, "https://crests.football-data.org/519.png"],
  ["Le Havre AC", 70, 28_000_000, 760_000, "https://crests.football-data.org/533.png"],
  ["FC Metz", 69, 26_000_000, 720_000, "https://crests.football-data.org/545.png"],
  ["FC Lorient", 70, 28_000_000, 760_000, "https://crests.football-data.org/525.png"],
  ["Paris FC", 69, 26_000_000, 720_000, null],
];

const LIGUE_2_TEAMS = [
  ["AS Saint-Etienne", 66, 24_000_000, 600_000, "https://crests.football-data.org/527.png"],
  ["Stade Reims", 67, 26_000_000, 660_000, "https://crests.football-data.org/547.png"],
  ["Montpellier HSC", 67, 26_000_000, 660_000, "https://crests.football-data.org/518.png"],
  ["Troyes AC", 62, 16_000_000, 420_000, "https://crests.football-data.org/531.png"],
  ["SC Bastia", 61, 14_000_000, 380_000, null],
  ["EA Guingamp", 62, 16_000_000, 420_000, "https://crests.football-data.org/538.png"],
  ["Stade Lavallois", 60, 12_000_000, 340_000, null],
  ["Pau FC", 59, 11_000_000, 320_000, null],
  ["Amiens SC", 61, 14_000_000, 380_000, "https://crests.football-data.org/530.png"],
  ["Annecy FC", 59, 11_000_000, 320_000, null],
  ["Clermont Foot", 64, 20_000_000, 500_000, "https://crests.football-data.org/541.png"],
  ["Grenoble Foot 38", 60, 12_000_000, 340_000, null],
  ["Rodez AF", 59, 11_000_000, 320_000, null],
  ["USL Dunkerque", 59, 11_000_000, 320_000, null],
  ["Red Star FC", 59, 11_000_000, 320_000, null],
  ["AS Nancy", 59, 11_000_000, 320_000, "https://crests.football-data.org/520.png"],
  ["Le Mans FC", 58, 10_000_000, 300_000, null],
  ["US Boulogne", 58, 10_000_000, 300_000, null],
];

const LEAGUE_CATALOG = [
  { id: "global-super-league", country: "Global", name: "Global Super League", teams: 20, level: 88, domesticCup: "World Super Cup", continent: "World", globalSeed: true },
  { id: "eng-premier-league", country: "England", name: "Premier League", teams: 20, level: 86, domesticCup: "FA Cup", continent: "Europe", realSeed: true },
  { id: "eng-championship", country: "England", name: "Championship", teams: 24, level: 70, domesticCup: "FA Cup", continent: "Europe", realSeed: true },
  { id: "eng-league-one", country: "England", name: "League One", teams: 24, level: 62, domesticCup: "FA Cup", continent: "Europe", realSeed: true },
  { id: "eng-league-two", country: "England", name: "League Two", teams: 24, level: 56, domesticCup: "FA Cup", continent: "Europe", realSeed: true },
  { id: "esp-la-liga", country: "Spain", name: "LALIGA EA SPORTS", teams: 20, level: 85, domesticCup: "Copa del Rey", continent: "Europe", realSeed: true },
  { id: "esp-hypermotion", country: "Spain", name: "LALIGA HYPERMOTION", teams: 22, level: 70, domesticCup: "Copa del Rey", continent: "Europe", realSeed: true },
  { id: "ita-serie-a", country: "Italy", name: "Lega Serie A", teams: 20, level: 83, domesticCup: "Coppa Italia", continent: "Europe", realSeed: true },
  { id: "ita-serie-b", country: "Italy", name: "Serie B", teams: 20, level: 68, domesticCup: "Coppa Italia", continent: "Europe", realSeed: true },
  { id: "ger-bundesliga", country: "Germany", name: "Bundesliga", teams: 18, level: 83, domesticCup: "DFB-Pokal", continent: "Europe", realSeed: true },
  { id: "ger-2-bundesliga", country: "Germany", name: "Bundesliga 2", teams: 18, level: 68, domesticCup: "DFB-Pokal", continent: "Europe", realSeed: true },
  { id: "fra-ligue-1", country: "France", name: "Ligue 1 McDonald's", teams: 18, level: 80, domesticCup: "Coupe de France", continent: "Europe", realSeed: true },
  { id: "fra-ligue-2", country: "France", name: "Ligue 2 BKT", teams: 18, level: 65, domesticCup: "Coupe de France", continent: "Europe", realSeed: true },
  { id: "ned-eredivisie", country: "Netherlands", name: "Eredivisie", teams: 18, level: 76, domesticCup: "KNVB Cup", continent: "Europe" },
  { id: "ned-eerste-divisie", country: "Netherlands", name: "Eerste Divisie", teams: 20, level: 60, domesticCup: "KNVB Cup", continent: "Europe" },
  { id: "por-primeira", country: "Portugal", name: "Primeira Liga", teams: 18, level: 76, domesticCup: "Taca de Portugal", continent: "Europe" },
  { id: "por-liga-portugal-2", country: "Portugal", name: "Liga Portugal 2", teams: 18, level: 61, domesticCup: "Taca de Portugal", continent: "Europe" },
  { id: "sco-premiership", country: "Scotland", name: "Scottish Premiership", teams: 12, level: 70, domesticCup: "Scottish Cup", continent: "Europe" },
  { id: "sco-championship", country: "Scotland", name: "Scottish Championship", teams: 10, level: 58, domesticCup: "Scottish Cup", continent: "Europe" },
  { id: "tur-super-lig", country: "Turkiye", name: "Super Lig", teams: 20, level: 74, domesticCup: "Turkish Cup", continent: "Europe" },
  { id: "tur-1-lig", country: "Turkiye", name: "TFF 1. Lig", teams: 20, level: 60, domesticCup: "Turkish Cup", continent: "Europe" },
  { id: "bel-pro-league", country: "Belgium", name: "Pro League", teams: 16, level: 72, domesticCup: "Belgian Cup", continent: "Europe" },
  { id: "bel-challenger-pro-league", country: "Belgium", name: "Challenger Pro League", teams: 16, level: 58, domesticCup: "Belgian Cup", continent: "Europe" },
  { id: "usa-mls", country: "United States", name: "Major League Soccer", teams: 30, level: 70, domesticCup: "US Open Cup", continent: "North America" },
  { id: "mex-liga-mx", country: "Mexico", name: "Liga MX", teams: 18, level: 72, domesticCup: "Copa MX", continent: "North America" },
  { id: "bra-serie-a", country: "Brazil", name: "Brasileirao Serie A", teams: 20, level: 77, domesticCup: "Copa do Brasil", continent: "South America" },
  { id: "arg-primera", country: "Argentina", name: "Primera Division", teams: 28, level: 74, domesticCup: "Copa Argentina", continent: "South America" },
  { id: "ksa-pro-league", country: "Saudi Arabia", name: "Saudi Pro League", teams: 18, level: 73, domesticCup: "King Cup", continent: "Asia" },
  { id: "jpn-j1", country: "Japan", name: "J1 League", teams: 20, level: 69, domesticCup: "Emperor's Cup", continent: "Asia" },
  { id: "kor-k-league", country: "South Korea", name: "K League 1", teams: 12, level: 67, domesticCup: "Korean FA Cup", continent: "Asia" },
  { id: "aus-a-league", country: "Australia", name: "A-League Men", teams: 12, level: 63, domesticCup: "Australia Cup", continent: "Asia" },
  { id: "tha-league-1", country: "Thailand", name: "Thai League 1", teams: 16, level: 60, domesticCup: "Thai FA Cup", continent: "Asia" },
  { id: "egy-premier", country: "Egypt", name: "Egyptian Premier League", teams: 18, level: 65, domesticCup: "Egypt Cup", continent: "Africa" },
  { id: "rsa-premiership", country: "South Africa", name: "Premiership", teams: 16, level: 63, domesticCup: "Nedbank Cup", continent: "Africa" },
];

const REAL_PLAYABLE_LEAGUE_IDS = [
  "eng-premier-league",
  "eng-championship",
  "eng-league-one",
  "eng-league-two",
  "esp-la-liga",
  "esp-hypermotion",
  "ita-serie-a",
  "ita-serie-b",
  "ger-bundesliga",
  "ger-2-bundesliga",
  "fra-ligue-1",
  "fra-ligue-2",
];

const DIVISION_RULES = {
  "eng-premier-league": { relegation: 3, promotion: 0, lowerLeagueId: "eng-championship", lowerName: "Championship" },
  "eng-championship": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "eng-premier-league", upperName: "Premier League", lowerLeagueId: "eng-league-one", lowerName: "League One" },
  "eng-league-one": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 4, upperLeagueId: "eng-championship", upperName: "Championship", lowerLeagueId: "eng-league-two", lowerName: "League Two" },
  "eng-league-two": { promotion: 4, automaticPromotion: 3, playoff: { start: 4, end: 7, winners: 1 }, relegation: 2, upperLeagueId: "eng-league-one", upperName: "League One", lowerName: "National League" },
  "esp-la-liga": { relegation: 3, promotion: 0, lowerLeagueId: "esp-hypermotion", lowerName: "LALIGA HYPERMOTION" },
  "esp-hypermotion": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "esp-la-liga", upperName: "LALIGA EA SPORTS", lowerName: "Primera Federacion" },
  "ita-serie-a": { relegation: 3, promotion: 0, lowerLeagueId: "ita-serie-b", lowerName: "Serie B" },
  "ita-serie-b": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "ita-serie-a", upperName: "Lega Serie A", lowerName: "Serie C" },
  "ger-bundesliga": { relegation: 3, promotion: 0, lowerLeagueId: "ger-2-bundesliga", lowerName: "Bundesliga 2" },
  "ger-2-bundesliga": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "ger-bundesliga", upperName: "Bundesliga", lowerName: "3. Liga" },
  "fra-ligue-1": { relegation: 3, promotion: 0, lowerLeagueId: "fra-ligue-2", lowerName: "Ligue 2 BKT" },
  "fra-ligue-2": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "fra-ligue-1", upperName: "Ligue 1 McDonald's", lowerName: "Championnat National" },
  "ned-eredivisie": { relegation: 3, promotion: 0, lowerLeagueId: "ned-eerste-divisie", lowerName: "Eerste Divisie" },
  "ned-eerste-divisie": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "ned-eredivisie", upperName: "Eredivisie", lowerName: "Tweede Divisie" },
  "por-primeira": { relegation: 3, promotion: 0, lowerLeagueId: "por-liga-portugal-2", lowerName: "Liga Portugal 2" },
  "por-liga-portugal-2": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "por-primeira", upperName: "Primeira Liga", lowerName: "Liga 3" },
  "sco-premiership": { relegation: 3, promotion: 0, lowerLeagueId: "sco-championship", lowerName: "Scottish Championship" },
  "sco-championship": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "sco-premiership", upperName: "Scottish Premiership", lowerName: "Scottish League One" },
  "tur-super-lig": { relegation: 3, promotion: 0, lowerLeagueId: "tur-1-lig", lowerName: "TFF 1. Lig" },
  "tur-1-lig": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "tur-super-lig", upperName: "Super Lig", lowerName: "TFF 2. Lig" },
  "bel-pro-league": { relegation: 3, promotion: 0, lowerLeagueId: "bel-challenger-pro-league", lowerName: "Challenger Pro League" },
  "bel-challenger-pro-league": { promotion: 3, automaticPromotion: 2, playoff: { start: 3, end: 6, winners: 1 }, relegation: 3, upperLeagueId: "bel-pro-league", upperName: "Pro League", lowerName: "Belgian National Division 1" },
};

const EUROPEAN_LEAGUE_PYRAMID = [
  { country: "England", top: "Premier League", lower: "Championship" },
  { country: "England", top: "Championship", lower: "League One" },
  { country: "England", top: "League One", lower: "League Two" },
  { country: "Spain", top: "LALIGA EA SPORTS", lower: "LALIGA HYPERMOTION" },
  { country: "Italy", top: "Lega Serie A", lower: "Serie B" },
  { country: "Germany", top: "Bundesliga", lower: "Bundesliga 2" },
  { country: "France", top: "Ligue 1 McDonald's", lower: "Ligue 2 BKT" },
  { country: "Netherlands", top: "Eredivisie", lower: "Eerste Divisie" },
  { country: "Portugal", top: "Primeira Liga", lower: "Liga Portugal 2" },
  { country: "Scotland", top: "Scottish Premiership", lower: "Scottish Championship" },
  { country: "Turkiye", top: "Super Lig", lower: "TFF 1. Lig" },
  { country: "Belgium", top: "Pro League", lower: "Challenger Pro League" },
];

const GENERATED_CLUB_NAMES = [
  "Capital FC", "Harbour City", "United", "Athletic", "Rovers", "Sporting", "Racing Club", "Dynamo",
  "City", "Albion", "Wanderers", "Olympic", "Academy", "Victory", "Northern FC", "Southern Stars",
  "East End", "West County", "Central SC", "Metropolitan", "Royal Club", "Forest Town", "River Plate",
  "Coastal Union", "Railway FC", "Mountain Club", "Lions", "Eagles", "Phoenix", "Mariners",
];

const ACADEMY_FIRST_NAMES = [
  "Ethan", "Leo", "Noah", "Oscar", "Archie", "Jude", "Mason", "Harvey", "Finley", "Lucas",
  "Mateo", "Diego", "Thiago", "Nico", "Santiago", "Rafael", "Gabriel", "Andre", "Joao", "Miguel",
  "Luca", "Marco", "Matteo", "Enzo", "Hugo", "Ibrahim", "Youssef", "Amir", "Tariq", "Omar",
  "Kenji", "Riku", "Min-Jae", "Hyun", "Chan", "Suphanat", "Teeraphon", "Anan", "Kittipong", "Somchai",
];

const ACADEMY_LAST_NAMES = [
  "Walker", "Hughes", "Bennett", "Cooper", "Reed", "Taylor", "Morgan", "Clarke", "Wilson", "Brooks",
  "Garcia", "Martinez", "Santos", "Silva", "Costa", "Pereira", "Rossi", "Bianchi", "Moretti", "Conti",
  "Dubois", "Laurent", "Diallo", "Traore", "Mensah", "Okafor", "Hassan", "Saleh", "Rahman", "Khan",
  "Tanaka", "Nakamura", "Kim", "Park", "Lee", "Srisuwan", "Chanthong", "Kongkaew", "Thongchai", "Wongsa",
];

const STAFF_FIRST_NAMES = [
  "Michael", "Steve", "Carlos", "Marco", "Ruben", "Thomas", "Julian", "Roberto", "Andre", "Patrick",
  "Graham", "Darren", "Luca", "Sergio", "Nuno", "Miguel", "Hiroshi", "Somchai", "Kittisak", "Teerapat",
];

const STAFF_LAST_NAMES = [
  "Edwards", "McKenna", "Carvalho", "Rossi", "Schmidt", "Alonso", "Martinez", "Silva", "Pereira", "Cooper",
  "Morris", "Davies", "Ricci", "Navarro", "Santos", "Tanaka", "Srisuwan", "Wongsa", "Chanthong", "Kongkaew",
];

const STAFF_ROLE_BLUEPRINTS = [
  { role: "Assistant Manager", focus: "Tactical advice, opposition reports, match preparation", key: "tacticalKnowledge" },
  { role: "First-Team Coach", focus: "Attacking patterns, possession drills, technical growth", key: "coaching" },
  { role: "Defensive Coach", focus: "Shape, pressing traps, set-piece defending", key: "defending" },
  { role: "Goalkeeping Coach", focus: "Shot stopping, handling, keeper distribution", key: "goalkeeping" },
  { role: "Fitness Coach", focus: "Conditioning, recovery load, injury prevention", key: "fitness" },
  { role: "Chief Scout", focus: "Recruitment shortlists, player reports, transfer value reads", key: "judgingAbility" },
  { role: "Data Analyst", focus: "xG trends, passing efficiency, recruitment performance data", key: "tacticalKnowledge" },
  { role: "Head Physio", focus: "Injury treatment, return-to-play plans, medical checks", key: "physiotherapy" },
  { role: "U21 Manager", focus: "Youth development, pathway to the first team, loans", key: "workingWithYoungsters" },
  { role: "Head of Youth Development", focus: "Annual youth intake quality, personality and academy pathway", key: "workingWithYoungsters" },
];

function randomAcademyName(index) {
  const first = ACADEMY_FIRST_NAMES[(index + rand(0, ACADEMY_FIRST_NAMES.length - 1)) % ACADEMY_FIRST_NAMES.length];
  const last = ACADEMY_LAST_NAMES[(index * 3 + rand(0, ACADEMY_LAST_NAMES.length - 1)) % ACADEMY_LAST_NAMES.length];
  return `${first} ${last}`;
}

const GLOBAL_SUPER_TEAMS = [
  ["Real Madrid", 94, 145_000_000, 3_600_000, "https://crests.football-data.org/86.png"],
  ["Barcelona", 89, 105_000_000, 3_050_000, "https://crests.football-data.org/81.png"],
  ["Bayern Munich", 92, 132_000_000, 3_300_000, "https://crests.football-data.org/5.png"],
  ["Paris Saint-Germain", 90, 128_000_000, 3_250_000, "https://crests.football-data.org/524.png"],
  ["Inter Milan", 88, 96_000_000, 2_600_000, "https://crests.football-data.org/108.png"],
  ["AC Milan", 84, 82_000_000, 2_250_000, "https://crests.football-data.org/98.png"],
  ["Juventus", 84, 86_000_000, 2_350_000, "https://crests.football-data.org/109.png"],
  ["Borussia Dortmund", 83, 78_000_000, 2_100_000, "https://crests.football-data.org/4.png"],
  ["Bayer Leverkusen", 86, 90_000_000, 2_200_000, "https://crests.football-data.org/3.png"],
  ["Atletico Madrid", 85, 88_000_000, 2_300_000, "https://crests.football-data.org/78.png"],
  ["Napoli", 83, 74_000_000, 2_000_000, "https://crests.football-data.org/113.png"],
  ["Benfica", 80, 68_000_000, 1_650_000, "https://crests.football-data.org/1903.png"],
  ["Ajax", 77, 56_000_000, 1_350_000, "https://crests.football-data.org/678.png"],
  ["Al Nassr", 78, 92_000_000, 2_400_000, null],
  ["Al Hilal", 80, 102_000_000, 2_500_000, null],
  ["Inter Miami", 73, 60_000_000, 1_650_000, null],
  ["Flamengo", 76, 58_000_000, 1_400_000, null],
  ["River Plate", 75, 54_000_000, 1_250_000, null],
  ["Boca Juniors", 74, 50_000_000, 1_180_000, null],
  ["Al Ahly", 72, 44_000_000, 980_000, null],
];

const GLOBAL_PLAYER_SEEDS = {
  "Real Madrid": [
    ["Thibaut Courtois", "GK", 34, 18, 2026], ["Dani Carvajal", "FB", 34, 16, 2026], ["Antonio Rudiger", "CB", 33, 18, 2026],
    ["Eder Militao", "CB", 28, 17, 2028], ["Ferland Mendy", "FB", 31, 15, 2027], ["Aurelien Tchouameni", "DM", 26, 18, 2028],
    ["Federico Valverde", "CM", 27, 19, 2029], ["Jude Bellingham", "AM", 22, 20, 2029], ["Vinicius Junior", "W", 25, 20, 2027],
    ["Rodrygo", "W", 25, 18, 2028], ["Kylian Mbappe", "ST", 27, 20, 2029],
  ],
  Barcelona: [
    ["Marc-Andre ter Stegen", "GK", 34, 17, 2028], ["Jules Kounde", "FB", 27, 17, 2027], ["Ronald Araujo", "CB", 27, 18, 2031],
    ["Pau Cubarsi", "CB", 19, 17, 2029], ["Alejandro Balde", "FB", 22, 17, 2028], ["Frenkie de Jong", "CM", 29, 18, 2026],
    ["Pedri", "CM", 23, 19, 2030], ["Gavi", "AM", 21, 18, 2030], ["Lamine Yamal", "W", 18, 19, 2031],
    ["Raphinha", "W", 29, 18, 2027], ["Robert Lewandowski", "ST", 37, 18, 2026],
  ],
  "Bayern Munich": [
    ["Manuel Neuer", "GK", 40, 17, 2026], ["Joshua Kimmich", "FB", 31, 18, 2028], ["Dayot Upamecano", "CB", 27, 17, 2026],
    ["Kim Min-jae", "CB", 29, 17, 2028], ["Alphonso Davies", "FB", 25, 18, 2030], ["Joao Palhinha", "DM", 30, 16, 2028],
    ["Leon Goretzka", "CM", 31, 16, 2026], ["Jamal Musiala", "AM", 23, 20, 2030], ["Michael Olise", "W", 24, 18, 2029],
    ["Leroy Sane", "W", 30, 17, 2026], ["Harry Kane", "ST", 32, 19, 2027],
  ],
  "Paris Saint-Germain": [
    ["Gianluigi Donnarumma", "GK", 27, 18, 2026], ["Achraf Hakimi", "FB", 27, 18, 2029], ["Marquinhos", "CB", 31, 17, 2028],
    ["Willian Pacho", "CB", 24, 16, 2029], ["Nuno Mendes", "FB", 23, 18, 2029], ["Vitinha", "CM", 26, 18, 2029],
    ["Warren Zaire-Emery", "CM", 20, 18, 2029], ["Fabian Ruiz", "CM", 30, 17, 2027], ["Ousmane Dembele", "W", 29, 18, 2028],
    ["Bradley Barcola", "W", 23, 17, 2028], ["Goncalo Ramos", "ST", 25, 16, 2028],
  ],
  "Inter Milan": [
    ["Yann Sommer", "GK", 37, 16, 2026], ["Alessandro Bastoni", "CB", 27, 18, 2028], ["Francesco Acerbi", "CB", 38, 15, 2026],
    ["Benjamin Pavard", "CB", 30, 16, 2028], ["Federico Dimarco", "FB", 28, 17, 2027], ["Denzel Dumfries", "FB", 29, 16, 2028],
    ["Nicolo Barella", "CM", 29, 18, 2029], ["Hakan Calhanoglu", "DM", 32, 18, 2027], ["Henrikh Mkhitaryan", "CM", 37, 15, 2026],
    ["Lautaro Martinez", "ST", 28, 19, 2029], ["Marcus Thuram", "ST", 28, 17, 2028],
  ],
  "AC Milan": [
    ["Mike Maignan", "GK", 30, 18, 2026], ["Theo Hernandez", "FB", 28, 18, 2026], ["Fikayo Tomori", "CB", 28, 16, 2027],
    ["Matteo Gabbia", "CB", 26, 15, 2026], ["Davide Calabria", "FB", 29, 14, 2026], ["Youssouf Fofana", "DM", 27, 16, 2028],
    ["Tijjani Reijnders", "CM", 27, 17, 2030], ["Christian Pulisic", "W", 27, 17, 2027], ["Rafael Leao", "W", 26, 18, 2028],
    ["Samuel Chukwueze", "W", 26, 15, 2028], ["Santiago Gimenez", "ST", 24, 16, 2029],
  ],
  Juventus: [
    ["Michele Di Gregorio", "GK", 28, 15, 2029], ["Bremer", "CB", 28, 17, 2029], ["Federico Gatti", "CB", 27, 15, 2028],
    ["Andrea Cambiaso", "FB", 26, 16, 2029], ["Pierre Kalulu", "FB", 25, 15, 2029], ["Manuel Locatelli", "DM", 28, 16, 2028],
    ["Teun Koopmeiners", "CM", 28, 17, 2029], ["Khephren Thuram", "CM", 25, 16, 2029], ["Kenan Yildiz", "AM", 21, 17, 2029],
    ["Francisco Conceicao", "W", 23, 16, 2029], ["Dusan Vlahovic", "ST", 26, 17, 2026],
  ],
  "Borussia Dortmund": [
    ["Gregor Kobel", "GK", 28, 17, 2028], ["Nico Schlotterbeck", "CB", 26, 17, 2027], ["Niklas Sule", "CB", 30, 15, 2026],
    ["Julian Ryerson", "FB", 28, 15, 2026], ["Ramy Bensebaini", "FB", 30, 14, 2027], ["Emre Can", "DM", 32, 15, 2026],
    ["Julian Brandt", "AM", 30, 17, 2026], ["Marcel Sabitzer", "CM", 32, 15, 2027], ["Karim Adeyemi", "W", 24, 16, 2027],
    ["Serhou Guirassy", "ST", 30, 17, 2028], ["Maximilian Beier", "ST", 23, 16, 2029],
  ],
  "Bayer Leverkusen": [
    ["Lukas Hradecky", "GK", 36, 15, 2026], ["Jonathan Tah", "CB", 30, 17, 2026], ["Edmond Tapsoba", "CB", 27, 17, 2028],
    ["Piero Hincapie", "CB", 24, 16, 2027], ["Jeremie Frimpong", "FB", 25, 18, 2028], ["Alex Grimaldo", "FB", 30, 18, 2027],
    ["Granit Xhaka", "DM", 33, 17, 2028], ["Exequiel Palacios", "CM", 27, 16, 2028], ["Florian Wirtz", "AM", 22, 20, 2027],
    ["Victor Boniface", "ST", 25, 17, 2028], ["Patrik Schick", "ST", 30, 16, 2027],
  ],
  "Atletico Madrid": [
    ["Jan Oblak", "GK", 33, 18, 2028], ["Jose Maria Gimenez", "CB", 31, 16, 2028], ["Robin Le Normand", "CB", 29, 16, 2029],
    ["Nahuel Molina", "FB", 28, 16, 2027], ["Javi Galan", "FB", 31, 14, 2026], ["Koke", "CM", 34, 16, 2026],
    ["Rodrigo De Paul", "CM", 32, 17, 2026], ["Pablo Barrios", "CM", 22, 16, 2028], ["Antoine Griezmann", "AM", 35, 18, 2026],
    ["Julian Alvarez", "ST", 26, 18, 2030], ["Alexander Sorloth", "ST", 30, 16, 2028],
  ],
  Napoli: [
    ["Alex Meret", "GK", 29, 15, 2027], ["Amir Rrahmani", "CB", 32, 15, 2027], ["Alessandro Buongiorno", "CB", 26, 16, 2029],
    ["Giovanni Di Lorenzo", "FB", 32, 16, 2028], ["Mathias Olivera", "FB", 28, 15, 2027], ["Stanislav Lobotka", "DM", 31, 17, 2027],
    ["Andre-Frank Zambo Anguissa", "CM", 30, 16, 2027], ["Scott McTominay", "CM", 29, 16, 2028], ["Khvicha Kvaratskhelia", "W", 25, 18, 2027],
    ["Matteo Politano", "W", 32, 15, 2027], ["Romelu Lukaku", "ST", 33, 16, 2027],
  ],
  Benfica: [
    ["Anatoliy Trubin", "GK", 24, 16, 2028], ["Antonio Silva", "CB", 22, 17, 2027], ["Nicolas Otamendi", "CB", 38, 15, 2026],
    ["Alexander Bah", "FB", 28, 15, 2027], ["Alvaro Carreras", "FB", 23, 15, 2029], ["Florentino Luis", "DM", 26, 16, 2027],
    ["Orkun Kokcu", "CM", 25, 16, 2028], ["Fredrik Aursnes", "CM", 30, 16, 2027], ["Angel Di Maria", "W", 38, 15, 2026],
    ["Kerem Akturkoglu", "W", 27, 16, 2029], ["Vangelis Pavlidis", "ST", 27, 16, 2029],
  ],
  Ajax: [
    ["Remko Pasveer", "GK", 42, 12, 2026], ["Jorrel Hato", "CB", 20, 17, 2028], ["Josip Sutalo", "CB", 26, 15, 2028],
    ["Devyne Rensch", "FB", 23, 14, 2026], ["Youri Baas", "FB", 23, 14, 2028], ["Jordan Henderson", "DM", 35, 15, 2026],
    ["Kenneth Taylor", "CM", 24, 15, 2027], ["Kian Fitz-Jim", "CM", 23, 14, 2027], ["Steven Berghuis", "AM", 34, 14, 2026],
    ["Brian Brobbey", "ST", 24, 16, 2027], ["Wout Weghorst", "ST", 33, 14, 2026],
  ],
  "Al Nassr": [
    ["Bento", "GK", 26, 15, 2028], ["Aymeric Laporte", "CB", 31, 17, 2026], ["Mohamed Simakan", "CB", 26, 16, 2029],
    ["Sultan Al-Ghannam", "FB", 31, 14, 2028], ["Alex Telles", "FB", 33, 15, 2026], ["Marcelo Brozovic", "DM", 33, 17, 2026],
    ["Otavio", "CM", 31, 16, 2026], ["Abdullah Al-Khaibari", "CM", 29, 13, 2026], ["Sadio Mane", "W", 34, 17, 2026],
    ["Anderson Talisca", "AM", 32, 16, 2026], ["Cristiano Ronaldo", "ST", 41, 18, 2026],
  ],
  "Al Hilal": [
    ["Yassine Bounou", "GK", 35, 17, 2026], ["Kalidou Koulibaly", "CB", 34, 16, 2026], ["Ali Al-Bulaihi", "CB", 36, 13, 2026],
    ["Joao Cancelo", "FB", 31, 17, 2027], ["Renan Lodi", "FB", 28, 15, 2027], ["Ruben Neves", "DM", 29, 17, 2026],
    ["Sergej Milinkovic-Savic", "CM", 31, 17, 2026], ["Malcom", "W", 29, 17, 2027], ["Salem Al-Dawsari", "W", 34, 15, 2026],
    ["Neymar", "AM", 34, 18, 2026], ["Aleksandar Mitrovic", "ST", 31, 17, 2026],
  ],
  "Inter Miami": [
    ["Drake Callender", "GK", 28, 13, 2027], ["Jordi Alba", "FB", 37, 15, 2026], ["Tomas Aviles", "CB", 22, 13, 2028],
    ["Noah Allen", "CB", 22, 12, 2027], ["Marcelo Weigandt", "FB", 26, 13, 2027], ["Sergio Busquets", "DM", 37, 16, 2026],
    ["Federico Redondo", "CM", 23, 14, 2028], ["Benjamin Cremaschi", "CM", 21, 13, 2027], ["Lionel Messi", "AM", 39, 19, 2026],
    ["Luis Suarez", "ST", 39, 16, 2026], ["Robert Taylor", "W", 31, 13, 2026],
  ],
  Flamengo: [
    ["Agustin Rossi", "GK", 30, 15, 2027], ["Guillermo Varela", "FB", 33, 14, 2026], ["Leo Pereira", "CB", 30, 15, 2027],
    ["Leo Ortiz", "CB", 30, 15, 2028], ["Ayrton Lucas", "FB", 29, 15, 2027], ["Erick Pulgar", "DM", 32, 15, 2026],
    ["Gerson", "CM", 29, 16, 2027], ["Giorgian De Arrascaeta", "AM", 31, 17, 2026], ["Bruno Henrique", "W", 35, 15, 2026],
    ["Luiz Araujo", "W", 30, 15, 2027], ["Pedro", "ST", 29, 17, 2027],
  ],
  "River Plate": [
    ["Franco Armani", "GK", 39, 15, 2026], ["Paulo Diaz", "CB", 31, 15, 2027], ["German Pezzella", "CB", 35, 15, 2027],
    ["Milton Casco", "FB", 38, 13, 2026], ["Marcos Acuna", "FB", 34, 15, 2027], ["Enzo Perez", "DM", 40, 13, 2026],
    ["Nacho Fernandez", "CM", 36, 14, 2026], ["Manuel Lanzini", "AM", 33, 14, 2027], ["Pablo Solari", "W", 25, 15, 2027],
    ["Miguel Borja", "ST", 33, 15, 2026], ["Facundo Colidio", "ST", 26, 15, 2027],
  ],
  "Boca Juniors": [
    ["Sergio Romero", "GK", 39, 14, 2026], ["Luis Advincula", "FB", 36, 14, 2026], ["Marcos Rojo", "CB", 36, 14, 2026],
    ["Nicolas Figal", "CB", 32, 14, 2026], ["Lautaro Blanco", "FB", 27, 14, 2027], ["Pol Fernandez", "CM", 34, 14, 2026],
    ["Kevin Zenon", "CM", 24, 15, 2028], ["Exequiel Zeballos", "W", 24, 15, 2027], ["Edinson Cavani", "ST", 39, 15, 2026],
    ["Miguel Merentiel", "ST", 30, 15, 2027], ["Milton Gimenez", "ST", 29, 14, 2027],
  ],
  "Al Ahly": [
    ["Mohamed El Shenawy", "GK", 37, 15, 2026], ["Mohamed Hany", "FB", 30, 14, 2027], ["Rami Rabia", "CB", 32, 14, 2026],
    ["Yasser Ibrahim", "CB", 33, 14, 2026], ["Ali Maaloul", "FB", 36, 14, 2026], ["Marwan Attia", "DM", 27, 14, 2028],
    ["Emam Ashour", "CM", 28, 15, 2028], ["Mohamed Magdy Afsha", "AM", 30, 15, 2027], ["Hussein El Shahat", "W", 34, 14, 2027],
    ["Percy Tau", "W", 32, 14, 2026], ["Wessam Abou Ali", "ST", 27, 15, 2028],
  ],
};

const REAL_PLAYER_SEEDS = {
  "Athletic Club": [
    ["Unai Simon", "GK", 28, 17, 2029], ["Dani Vivian", "CB", 26, 16, 2030], ["Aitor Paredes", "CB", 26, 15, 2029],
    ["Yuri Berchiche", "FB", 36, 14, 2026], ["Oscar de Marcos", "FB", 37, 13, 2026], ["Mikel Jauregizar", "DM", 22, 15, 2029],
    ["Oihan Sancet", "AM", 26, 17, 2032], ["Nico Williams", "W", 23, 19, 2027], ["Inaki Williams", "W", 31, 16, 2028],
    ["Gorka Guruzeta", "ST", 29, 15, 2028], ["Alex Berenguer", "W", 30, 15, 2027],
  ],
  "Atletico Madrid": [
    ["Jan Oblak", "GK", 33, 18, 2028], ["Jose Maria Gimenez", "CB", 31, 16, 2028], ["Robin Le Normand", "CB", 29, 16, 2029],
    ["Nahuel Molina", "FB", 28, 16, 2027], ["Javi Galan", "FB", 31, 14, 2026], ["Koke", "CM", 34, 16, 2026],
    ["Rodrigo De Paul", "CM", 32, 17, 2026], ["Pablo Barrios", "CM", 22, 16, 2028], ["Antoine Griezmann", "AM", 35, 18, 2026],
    ["Julian Alvarez", "ST", 26, 18, 2030], ["Alexander Sorloth", "ST", 30, 16, 2028],
  ],
  "CA Osasuna": [
    ["Sergio Herrera", "GK", 32, 14, 2026], ["Jesus Areso", "FB", 26, 14, 2028], ["Alejandro Catena", "CB", 31, 14, 2028],
    ["Jorge Herrando", "CB", 25, 13, 2027], ["Juan Cruz", "FB", 33, 13, 2026], ["Lucas Torro", "DM", 31, 14, 2027],
    ["Jon Moncayola", "CM", 28, 14, 2031], ["Aimar Oroz", "AM", 24, 15, 2029], ["Ruben Garcia", "W", 32, 13, 2026],
    ["Ante Budimir", "ST", 34, 15, 2027], ["Bryan Zaragoza", "W", 24, 15, 2026],
  ],
  "Deportivo Alaves": [
    ["Antonio Sivera", "GK", 29, 13, 2027], ["Nahuel Tenaglia", "FB", 30, 13, 2027], ["Abdel Abqar", "CB", 27, 13, 2027],
    ["Aleksandar Sedlar", "CB", 34, 12, 2026], ["Manu Sanchez", "FB", 25, 13, 2027], ["Antonio Blanco", "DM", 25, 14, 2027],
    ["Ander Guevara", "CM", 29, 13, 2027], ["Carlos Vicente", "W", 27, 14, 2027], ["Toni Martinez", "ST", 29, 13, 2027],
    ["Kike Garcia", "ST", 36, 12, 2026], ["Stoichkov", "AM", 32, 13, 2027],
  ],
  "Elche CF": [
    ["Matias Dituro", "GK", 39, 12, 2026], ["Pedro Bigas", "CB", 36, 12, 2026], ["David Affengruber", "CB", 25, 13, 2027],
    ["Alvaro Nunez", "FB", 26, 13, 2027], ["Jose Salinas", "FB", 25, 12, 2026], ["Nicolas Castro", "CM", 25, 13, 2027],
    ["Aleix Febas", "CM", 30, 13, 2026], ["Rodrigo Mendoza", "AM", 21, 14, 2028], ["Josan", "W", 36, 12, 2026],
    ["Mourad", "ST", 28, 13, 2027], ["Rafa Mir", "ST", 28, 14, 2027],
  ],
  "FC Barcelona": [
    ["Marc-Andre ter Stegen", "GK", 34, 17, 2028], ["Jules Kounde", "FB", 27, 17, 2027], ["Ronald Araujo", "CB", 27, 18, 2031],
    ["Pau Cubarsi", "CB", 19, 17, 2029], ["Alejandro Balde", "FB", 22, 17, 2028], ["Frenkie de Jong", "CM", 29, 18, 2026],
    ["Pedri", "CM", 23, 19, 2030], ["Gavi", "AM", 21, 18, 2030], ["Lamine Yamal", "W", 18, 19, 2031],
    ["Raphinha", "W", 29, 18, 2027], ["Robert Lewandowski", "ST", 37, 18, 2026], ["Fermin Lopez", "AM", 23, 17, 2029],
  ],
  "Getafe CF": [
    ["David Soria", "GK", 33, 14, 2026], ["Djene", "CB", 34, 13, 2026], ["Domingos Duarte", "CB", 31, 13, 2027],
    ["Juan Iglesias", "FB", 28, 13, 2028], ["Diego Rico", "FB", 33, 13, 2026], ["Luis Milla", "CM", 31, 14, 2027],
    ["Mauro Arambarri", "DM", 30, 14, 2028], ["Carles Alena", "AM", 28, 13, 2026], ["Coba da Costa", "W", 23, 13, 2027],
    ["Borja Mayoral", "ST", 29, 15, 2027], ["Juanmi", "ST", 33, 13, 2026],
  ],
  "Girona FC": [
    ["Paulo Gazzaniga", "GK", 34, 15, 2027], ["Arnau Martinez", "FB", 23, 15, 2028], ["David Lopez", "CB", 36, 13, 2026],
    ["Daley Blind", "CB", 36, 14, 2026], ["Miguel Gutierrez", "FB", 24, 16, 2027], ["Yangel Herrera", "CM", 28, 15, 2027],
    ["Ivan Martin", "CM", 27, 15, 2028], ["Viktor Tsygankov", "W", 28, 16, 2027], ["Portu", "W", 34, 13, 2026],
    ["Cristhian Stuani", "ST", 39, 13, 2026], ["Abel Ruiz", "ST", 26, 14, 2029],
  ],
  "Levante UD": [
    ["Andres Fernandez", "GK", 39, 12, 2026], ["Adrian de la Fuente", "CB", 27, 13, 2027], ["Unai Elgezabal", "CB", 33, 12, 2026],
    ["Andres Garcia", "FB", 23, 14, 2028], ["Diego Pampin", "FB", 26, 12, 2027], ["Oriol Rey", "DM", 28, 13, 2027],
    ["Pablo Martinez", "CM", 28, 13, 2027], ["Carlos Alvarez", "AM", 22, 14, 2028], ["Roger Brugue", "W", 29, 13, 2027],
    ["Jose Luis Morales", "ST", 38, 13, 2026], ["Ivan Romero", "ST", 25, 13, 2027],
  ],
  "Rayo Vallecano": [
    ["Augusto Batalla", "GK", 30, 14, 2027], ["Andrei Ratiu", "FB", 28, 15, 2028], ["Florian Lejeune", "CB", 35, 13, 2026],
    ["Abdul Mumin", "CB", 28, 14, 2026], ["Pep Chavarria", "FB", 28, 13, 2027], ["Pathe Ciss", "DM", 32, 13, 2026],
    ["Unai Lopez", "CM", 30, 14, 2026], ["Isi Palazon", "W", 31, 14, 2028], ["Jorge de Frutos", "W", 29, 14, 2028],
    ["Alvaro Garcia", "W", 33, 13, 2026], ["Sergio Camello", "ST", 25, 14, 2027],
  ],
  "RC Celta": [
    ["Vicente Guaita", "GK", 39, 13, 2026], ["Oscar Mingueza", "FB", 27, 15, 2026], ["Carl Starfelt", "CB", 31, 14, 2027],
    ["Joseph Aidoo", "CB", 30, 13, 2026], ["Javi Rodriguez", "FB", 23, 13, 2028], ["Fran Beltran", "DM", 27, 14, 2026],
    ["Ilaix Moriba", "CM", 23, 14, 2028], ["Hugo Sotelo", "CM", 22, 14, 2028], ["Iago Aspas", "ST", 38, 15, 2026],
    ["Borja Iglesias", "ST", 33, 14, 2026], ["Willot Swedberg", "AM", 22, 15, 2027],
  ],
  "RCD Espanyol": [
    ["Joan Garcia", "GK", 25, 16, 2028], ["Omar El Hilali", "FB", 22, 14, 2027], ["Leandro Cabrera", "CB", 34, 13, 2026],
    ["Fernando Calero", "CB", 30, 13, 2026], ["Brian Olivan", "FB", 32, 13, 2026], ["Pol Lozano", "DM", 26, 13, 2027],
    ["Edu Exposito", "CM", 30, 13, 2027], ["Javi Puado", "W", 28, 15, 2028], ["Pere Milla", "W", 33, 13, 2026],
    ["Roberto Fernandez", "ST", 24, 14, 2029], ["Martin Braithwaite", "ST", 35, 13, 2026],
  ],
  "RCD Mallorca": [
    ["Dominik Greif", "GK", 29, 14, 2027], ["Pablo Maffeo", "FB", 28, 14, 2027], ["Antonio Raillo", "CB", 34, 14, 2026],
    ["Martin Valjent", "CB", 30, 14, 2027], ["Johan Mojica", "FB", 33, 13, 2026], ["Sam Costa", "DM", 25, 14, 2028],
    ["Manu Morlanes", "CM", 27, 14, 2028], ["Dani Rodriguez", "AM", 38, 12, 2026], ["Takuma Asano", "W", 31, 13, 2026],
    ["Vedat Muriqi", "ST", 32, 15, 2027], ["Cyle Larin", "ST", 31, 13, 2026],
  ],
  "Real Betis": [
    ["Pau Lopez", "GK", 31, 14, 2027], ["Hector Bellerin", "FB", 31, 14, 2028], ["Marc Bartra", "CB", 35, 14, 2027],
    ["Natan", "CB", 25, 15, 2029], ["Romain Perraud", "FB", 28, 14, 2029], ["Johnny Cardoso", "DM", 24, 16, 2029],
    ["Marc Roca", "CM", 29, 15, 2029], ["Isco", "AM", 34, 17, 2027], ["Pablo Fornals", "AM", 30, 15, 2029],
    ["Abde Ezzalzouli", "W", 24, 15, 2029], ["Cedric Bakambu", "ST", 35, 13, 2026],
  ],
  "Real Madrid": [
    ["Thibaut Courtois", "GK", 34, 18, 2026], ["Dani Carvajal", "FB", 34, 16, 2026], ["Antonio Rudiger", "CB", 33, 18, 2026],
    ["Eder Militao", "CB", 28, 17, 2028], ["Ferland Mendy", "FB", 31, 15, 2027], ["Aurelien Tchouameni", "DM", 26, 18, 2028],
    ["Federico Valverde", "CM", 27, 19, 2029], ["Jude Bellingham", "AM", 22, 20, 2029], ["Vinicius Junior", "W", 25, 20, 2027],
    ["Rodrygo", "W", 25, 18, 2028], ["Kylian Mbappe", "ST", 27, 20, 2029], ["Arda Guler", "AM", 21, 17, 2029],
  ],
  "Real Oviedo": [
    ["Aaron Escandell", "GK", 31, 12, 2027], ["Oier Luengo", "CB", 28, 13, 2027], ["Dani Calvo", "CB", 32, 12, 2026],
    ["Nacho Vidal", "FB", 31, 12, 2026], ["Carlos Pomares", "FB", 33, 12, 2026], ["Santi Cazorla", "CM", 41, 13, 2026],
    ["Luismi", "DM", 34, 12, 2026], ["Sebas Moyano", "W", 29, 13, 2027], ["Ilyas Chaira", "W", 25, 13, 2027],
    ["Alemao", "ST", 28, 13, 2027], ["Borja Baston", "ST", 33, 12, 2026],
  ],
  "Real Sociedad": [
    ["Alex Remiro", "GK", 31, 16, 2027], ["Hamari Traore", "FB", 34, 13, 2026], ["Igor Zubeldia", "CB", 29, 15, 2029],
    ["Jon Pacheco", "CB", 25, 15, 2027], ["Aihen Munoz", "FB", 28, 14, 2027], ["Martin Zubimendi", "DM", 27, 18, 2027],
    ["Mikel Merino", "CM", 29, 16, 2027], ["Brais Mendez", "AM", 29, 16, 2028], ["Takefusa Kubo", "W", 25, 17, 2029],
    ["Mikel Oyarzabal", "ST", 29, 17, 2028], ["Ander Barrenetxea", "W", 24, 15, 2027],
  ],
  "Sevilla FC": [
    ["Orjan Nyland", "GK", 35, 13, 2026], ["Juanlu Sanchez", "FB", 23, 14, 2028], ["Loic Bade", "CB", 26, 15, 2029],
    ["Nemanja Gudelj", "CB", 34, 13, 2026], ["Adria Pedrosa", "FB", 28, 13, 2028], ["Djibril Sow", "CM", 29, 14, 2028],
    ["Lucien Agoume", "DM", 24, 15, 2028], ["Suso", "AM", 32, 13, 2026], ["Dodi Lukebakio", "W", 28, 15, 2028],
    ["Isaac Romero", "ST", 26, 14, 2028], ["Chidera Ejuke", "W", 28, 14, 2027],
  ],
  "Valencia CF": [
    ["Giorgi Mamardashvili", "GK", 25, 17, 2027], ["Thierry Correia", "FB", 27, 14, 2027], ["Cristhian Mosquera", "CB", 22, 16, 2027],
    ["Mouctar Diakhaby", "CB", 29, 14, 2027], ["Jose Gaya", "FB", 31, 16, 2027], ["Javi Guerra", "CM", 23, 16, 2027],
    ["Pepelu", "DM", 27, 15, 2028], ["Andre Almeida", "AM", 26, 14, 2028], ["Diego Lopez", "W", 24, 15, 2027],
    ["Hugo Duro", "ST", 26, 15, 2028], ["Luis Rioja", "W", 32, 14, 2026],
  ],
  "Villarreal CF": [
    ["Luiz Junior", "GK", 25, 15, 2030], ["Juan Foyth", "FB", 28, 15, 2026], ["Logan Costa", "CB", 25, 15, 2030],
    ["Eric Bailly", "CB", 32, 13, 2026], ["Sergi Cardona", "FB", 27, 14, 2027], ["Santi Comesana", "CM", 29, 14, 2027],
    ["Dani Parejo", "CM", 37, 15, 2026], ["Alex Baena", "AM", 24, 18, 2028], ["Yeremy Pino", "W", 23, 16, 2027],
    ["Gerard Moreno", "ST", 34, 16, 2027], ["Ayoze Perez", "ST", 32, 15, 2028],
  ],
  Arsenal: [
    ["David Raya", "GK", 30, 16, 2028], ["William Saliba", "CB", 25, 18, 2027], ["Gabriel Magalhaes", "CB", 28, 17, 2029],
    ["Jurrien Timber", "FB", 24, 16, 2028], ["Riccardo Calafiori", "FB", 24, 16, 2029], ["Declan Rice", "DM", 27, 18, 2028],
    ["Martin Odegaard", "CM", 27, 18, 2028], ["Mikel Merino", "CM", 29, 15, 2028], ["Bukayo Saka", "W", 24, 19, 2027],
    ["Gabriel Martinelli", "W", 25, 17, 2027], ["Kai Havertz", "ST", 27, 16, 2028], ["Ethan Nwaneri", "AM", 19, 15, 2029],
  ],
  "Aston Villa": [
    ["Emiliano Martinez", "GK", 33, 17, 2029], ["Ezri Konsa", "CB", 28, 15, 2028], ["Pau Torres", "CB", 29, 16, 2028],
    ["Matty Cash", "FB", 28, 14, 2027], ["Lucas Digne", "FB", 32, 14, 2026], ["Boubacar Kamara", "DM", 26, 16, 2027],
    ["Youri Tielemans", "CM", 29, 16, 2027], ["John McGinn", "CM", 31, 15, 2027], ["Morgan Rogers", "AM", 23, 16, 2030],
    ["Ollie Watkins", "ST", 30, 17, 2028], ["Jacob Ramsey", "W", 25, 15, 2027],
  ],
  Bournemouth: [
    ["Kepa Arrizabalaga", "GK", 31, 15, 2026], ["Illia Zabarnyi", "CB", 23, 16, 2029], ["Marcos Senesi", "CB", 29, 14, 2026],
    ["Milos Kerkez", "FB", 22, 16, 2028], ["Adam Smith", "FB", 35, 12, 2026], ["Lewis Cook", "DM", 29, 14, 2028],
    ["Ryan Christie", "CM", 31, 14, 2027], ["Alex Scott", "CM", 22, 15, 2028], ["Justin Kluivert", "AM", 27, 15, 2028],
    ["Antoine Semenyo", "W", 26, 16, 2029], ["Evanilson", "ST", 26, 16, 2029],
  ],
  Brentford: [
    ["Mark Flekken", "GK", 32, 14, 2027], ["Nathan Collins", "CB", 25, 15, 2029], ["Ethan Pinnock", "CB", 33, 14, 2027],
    ["Aaron Hickey", "FB", 24, 14, 2027], ["Rico Henry", "FB", 28, 14, 2026], ["Christian Norgaard", "DM", 32, 15, 2027],
    ["Vitaly Janelt", "CM", 28, 14, 2026], ["Mikkel Damsgaard", "AM", 26, 15, 2027], ["Bryan Mbeumo", "W", 26, 17, 2026],
    ["Kevin Schade", "W", 24, 15, 2028], ["Yoane Wissa", "ST", 29, 16, 2026],
  ],
  "Brighton & Hove Albion": [
    ["Bart Verbruggen", "GK", 23, 15, 2028], ["Lewis Dunk", "CB", 34, 15, 2026], ["Jan Paul van Hecke", "CB", 26, 15, 2027],
    ["Pervis Estupinan", "FB", 28, 15, 2027], ["Tariq Lamptey", "FB", 25, 14, 2026], ["Carlos Baleba", "DM", 22, 17, 2028],
    ["Mats Wieffer", "CM", 26, 15, 2029], ["Jack Hinshelwood", "CM", 21, 15, 2028], ["Georginio Rutter", "AM", 24, 16, 2029],
    ["Kaoru Mitoma", "W", 29, 17, 2027], ["Evan Ferguson", "ST", 21, 16, 2029],
  ],
  Burnley: [
    ["James Trafford", "GK", 23, 15, 2027], ["Maxime Esteve", "CB", 24, 14, 2029], ["Jordan Beyer", "CB", 26, 14, 2028],
    ["Connor Roberts", "FB", 30, 13, 2027], ["Quilindschy Hartman", "FB", 24, 14, 2029], ["Josh Cullen", "DM", 30, 14, 2026],
    ["Hannibal Mejbri", "CM", 23, 14, 2028], ["Josh Laurent", "CM", 31, 13, 2026], ["Zian Flemming", "AM", 27, 14, 2028],
    ["Luca Koleosho", "W", 22, 15, 2029], ["Lyle Foster", "ST", 25, 14, 2028],
  ],
  Chelsea: [
    ["Robert Sanchez", "GK", 28, 15, 2030], ["Levi Colwill", "CB", 23, 17, 2029], ["Wesley Fofana", "CB", 25, 16, 2029],
    ["Reece James", "FB", 26, 17, 2028], ["Marc Cucurella", "FB", 27, 16, 2028], ["Moises Caicedo", "DM", 24, 18, 2031],
    ["Enzo Fernandez", "CM", 25, 17, 2031], ["Cole Palmer", "AM", 24, 19, 2033], ["Estevao Willian", "W", 19, 17, 2033],
    ["Pedro Neto", "W", 26, 16, 2031], ["Nicolas Jackson", "ST", 25, 16, 2033],
  ],
  "Crystal Palace": [
    ["Dean Henderson", "GK", 29, 15, 2028], ["Marc Guehi", "CB", 25, 16, 2026], ["Maxence Lacroix", "CB", 26, 15, 2029],
    ["Daniel Munoz", "FB", 30, 15, 2027], ["Tyrick Mitchell", "FB", 26, 15, 2027], ["Adam Wharton", "DM", 22, 17, 2029],
    ["Jefferson Lerma", "CM", 31, 14, 2026], ["Daichi Kamada", "AM", 29, 14, 2026], ["Eberechi Eze", "AM", 27, 18, 2027],
    ["Ismaila Sarr", "W", 28, 15, 2029], ["Jean-Philippe Mateta", "ST", 28, 16, 2027],
  ],
  Everton: [
    ["Jordan Pickford", "GK", 32, 16, 2027], ["James Tarkowski", "CB", 33, 14, 2026], ["Jarrad Branthwaite", "CB", 23, 17, 2027],
    ["Vitalii Mykolenko", "FB", 27, 14, 2026], ["Seamus Coleman", "FB", 37, 11, 2026], ["Idrissa Gueye", "DM", 36, 13, 2026],
    ["James Garner", "CM", 25, 14, 2027], ["Tim Iroegbunam", "CM", 23, 13, 2027], ["Dwight McNeil", "W", 26, 15, 2027],
    ["Iliman Ndiaye", "AM", 26, 15, 2029], ["Dominic Calvert-Lewin", "ST", 29, 14, 2026],
  ],
  Fulham: [
    ["Bernd Leno", "GK", 34, 15, 2027], ["Joachim Andersen", "CB", 30, 15, 2029], ["Calvin Bassey", "CB", 26, 15, 2027],
    ["Kenny Tete", "FB", 30, 13, 2026], ["Antonee Robinson", "FB", 28, 16, 2028], ["Sander Berge", "DM", 28, 15, 2029],
    ["Andreas Pereira", "CM", 30, 15, 2026], ["Emile Smith Rowe", "AM", 25, 16, 2029], ["Alex Iwobi", "W", 30, 15, 2028],
    ["Harry Wilson", "W", 29, 14, 2026], ["Rodrigo Muniz", "ST", 25, 15, 2028],
  ],
  "Leeds United": [
    ["Illan Meslier", "GK", 26, 14, 2026], ["Joe Rodon", "CB", 28, 14, 2028], ["Pascal Struijk", "CB", 26, 14, 2027],
    ["Jayden Bogle", "FB", 25, 14, 2028], ["Junior Firpo", "FB", 29, 13, 2026], ["Ethan Ampadu", "DM", 25, 15, 2027],
    ["Ao Tanaka", "CM", 27, 14, 2028], ["Ilia Gruev", "CM", 26, 13, 2027], ["Brenden Aaronson", "AM", 25, 14, 2027],
    ["Daniel James", "W", 28, 14, 2026], ["Joel Piroe", "ST", 26, 15, 2027],
  ],
  Liverpool: [
    ["Alisson", "GK", 33, 18, 2027], ["Virgil van Dijk", "CB", 34, 18, 2027], ["Ibrahima Konate", "CB", 26, 17, 2026],
    ["Trent Alexander-Arnold", "FB", 27, 18, 2027], ["Andrew Robertson", "FB", 32, 16, 2026], ["Ryan Gravenberch", "DM", 24, 17, 2028],
    ["Alexis Mac Allister", "CM", 27, 18, 2028], ["Dominik Szoboszlai", "CM", 25, 17, 2028], ["Mohamed Salah", "W", 33, 19, 2027],
    ["Luis Diaz", "W", 29, 17, 2027], ["Darwin Nunez", "ST", 26, 16, 2028], ["Harvey Elliott", "AM", 23, 15, 2027],
  ],
  "Manchester City": [
    ["Ederson", "GK", 32, 18, 2026], ["Ruben Dias", "CB", 28, 18, 2027], ["Josko Gvardiol", "CB", 24, 18, 2028],
    ["Kyle Walker", "FB", 35, 15, 2026], ["Rico Lewis", "FB", 21, 16, 2028], ["Rodri", "DM", 29, 20, 2027],
    ["Phil Foden", "AM", 25, 19, 2027], ["Bernardo Silva", "CM", 31, 18, 2026], ["Kevin De Bruyne", "CM", 34, 18, 2026],
    ["Jeremy Doku", "W", 23, 17, 2028], ["Erling Haaland", "ST", 25, 20, 2034],
  ],
  "Manchester United": [
    ["Andre Onana", "GK", 30, 15, 2028], ["Lisandro Martinez", "CB", 28, 16, 2027], ["Leny Yoro", "CB", 20, 16, 2029],
    ["Diogo Dalot", "FB", 27, 15, 2028], ["Luke Shaw", "FB", 30, 15, 2027], ["Manuel Ugarte", "DM", 25, 16, 2029],
    ["Kobbie Mainoo", "CM", 21, 17, 2027], ["Bruno Fernandes", "AM", 31, 18, 2027], ["Amad Diallo", "W", 23, 16, 2030],
    ["Alejandro Garnacho", "W", 21, 16, 2028], ["Rasmus Hojlund", "ST", 23, 16, 2028],
  ],
  "Newcastle United": [
    ["Nick Pope", "GK", 34, 15, 2026], ["Sven Botman", "CB", 26, 16, 2027], ["Fabian Schar", "CB", 34, 15, 2026],
    ["Tino Livramento", "FB", 23, 16, 2028], ["Lewis Hall", "FB", 21, 15, 2029], ["Bruno Guimaraes", "DM", 28, 18, 2028],
    ["Sandro Tonali", "CM", 25, 17, 2028], ["Joelinton", "CM", 29, 16, 2028], ["Anthony Gordon", "W", 25, 17, 2026],
    ["Harvey Barnes", "W", 28, 15, 2028], ["Alexander Isak", "ST", 26, 18, 2028],
  ],
  "Nottingham Forest": [
    ["Matz Sels", "GK", 34, 15, 2027], ["Murillo", "CB", 24, 16, 2028], ["Nikola Milenkovic", "CB", 28, 15, 2029],
    ["Neco Williams", "FB", 25, 14, 2026], ["Ola Aina", "FB", 29, 15, 2026], ["Ibrahim Sangare", "DM", 28, 15, 2028],
    ["Morgan Gibbs-White", "AM", 26, 17, 2027], ["Danilo", "CM", 25, 15, 2029], ["Callum Hudson-Odoi", "W", 25, 15, 2026],
    ["Anthony Elanga", "W", 24, 16, 2028], ["Chris Wood", "ST", 34, 15, 2027],
  ],
  Sunderland: [
    ["Anthony Patterson", "GK", 26, 14, 2028], ["Dan Ballard", "CB", 26, 14, 2028], ["Luke O'Nien", "CB", 31, 13, 2026],
    ["Trai Hume", "FB", 24, 14, 2027], ["Dennis Cirkin", "FB", 24, 14, 2026], ["Dan Neil", "DM", 24, 15, 2026],
    ["Jobe Bellingham", "CM", 20, 16, 2028], ["Chris Rigg", "CM", 19, 15, 2027], ["Patrick Roberts", "AM", 29, 14, 2026],
    ["Romaine Mundle", "W", 23, 14, 2028], ["Eliezer Mayenda", "ST", 21, 14, 2028],
  ],
  "Tottenham Hotspur": [
    ["Guglielmo Vicario", "GK", 29, 16, 2028], ["Cristian Romero", "CB", 28, 17, 2027], ["Micky van de Ven", "CB", 25, 17, 2029],
    ["Pedro Porro", "FB", 26, 16, 2028], ["Destiny Udogie", "FB", 23, 16, 2030], ["Yves Bissouma", "DM", 29, 15, 2026],
    ["Pape Matar Sarr", "CM", 23, 16, 2030], ["James Maddison", "AM", 29, 17, 2028], ["Dejan Kulusevski", "W", 26, 17, 2028],
    ["Brennan Johnson", "W", 25, 16, 2029], ["Dominic Solanke", "ST", 28, 16, 2030], ["Archie Gray", "CM", 20, 16, 2030],
  ],
  "West Ham United": [
    ["Alphonse Areola", "GK", 33, 14, 2027], ["Max Kilman", "CB", 28, 15, 2031], ["Jean-Clair Todibo", "CB", 26, 15, 2029],
    ["Aaron Wan-Bissaka", "FB", 28, 15, 2031], ["Emerson", "FB", 31, 14, 2026], ["Edson Alvarez", "DM", 28, 15, 2028],
    ["Tomas Soucek", "CM", 31, 14, 2027], ["Lucas Paqueta", "AM", 28, 17, 2027], ["Jarrod Bowen", "W", 29, 17, 2030],
    ["Mohammed Kudus", "W", 25, 17, 2028], ["Niclas Fullkrug", "ST", 33, 15, 2028],
  ],
  "Wolverhampton Wanderers": [
    ["Jose Sa", "GK", 33, 14, 2027], ["Toti Gomes", "CB", 27, 14, 2029], ["Santiago Bueno", "CB", 27, 13, 2028],
    ["Nelson Semedo", "FB", 32, 14, 2026], ["Rayan Ait-Nouri", "FB", 25, 16, 2026], ["Joao Gomes", "DM", 25, 16, 2028],
    ["Andre", "CM", 24, 16, 2029], ["Jean-Ricner Bellegarde", "AM", 28, 14, 2028], ["Matheus Cunha", "AM", 27, 17, 2027],
    ["Hwang Hee-chan", "W", 30, 15, 2028], ["Jorgen Strand Larsen", "ST", 26, 15, 2029],
  ],
};

Object.assign(REAL_PLAYER_SEEDS, {
  "Birmingham City": [["Ryan Allsop", "GK", 33, 12, 2026], ["Krystian Bielik", "CB", 28, 13, 2027], ["Christoph Klarer", "CB", 26, 13, 2028], ["Seung-ho Paik", "CM", 29, 13, 2027], ["Jay Stansfield", "ST", 23, 14, 2030]],
  "Blackburn Rovers": [["Aynsley Pears", "GK", 28, 12, 2026], ["Dominic Hyam", "CB", 30, 12, 2027], ["Hayden Carter", "CB", 26, 13, 2027], ["Lewis Travis", "DM", 28, 13, 2027], ["Yuki Ohashi", "ST", 29, 13, 2027]],
  "Bristol City": [["Max O'Leary", "GK", 29, 12, 2026], ["Zak Vyner", "CB", 29, 13, 2027], ["Rob Dickie", "CB", 30, 13, 2027], ["Jason Knight", "CM", 25, 14, 2028], ["Nahki Wells", "ST", 36, 12, 2026]],
  "Charlton Athletic": [["Ashley Maynard-Brewer", "GK", 27, 11, 2026], ["Lloyd Jones", "CB", 30, 12, 2027], ["Kayne Ramsay", "FB", 25, 12, 2027], ["Conor Coventry", "CM", 26, 12, 2027], ["Miles Leaburn", "ST", 22, 13, 2028]],
  "Coventry City": [["Ben Wilson", "GK", 33, 12, 2026], ["Bobby Thomas", "CB", 25, 13, 2027], ["Liam Kitching", "CB", 26, 13, 2027], ["Ben Sheaf", "DM", 28, 14, 2026], ["Haji Wright", "ST", 28, 14, 2027]],
  "Derby County": [["Jacob Widell Zetterstrom", "GK", 27, 12, 2028], ["Curtis Nelson", "CB", 33, 12, 2026], ["Eiran Cashin", "CB", 24, 13, 2027], ["Kenzo Goudmijn", "CM", 24, 13, 2028], ["Jerry Yates", "ST", 29, 12, 2026]],
  "Hull City": [["Ivor Pandur", "GK", 26, 12, 2027], ["Alfie Jones", "CB", 28, 12, 2026], ["Sean McLoughlin", "CB", 29, 12, 2026], ["Regan Slater", "CM", 26, 13, 2027], ["Liam Millar", "W", 26, 13, 2027]],
  "Ipswich Town": [["Christian Walton", "GK", 30, 13, 2027], ["Luke Woolfenden", "CB", 27, 13, 2027], ["Leif Davis", "FB", 26, 15, 2028], ["Sam Morsy", "DM", 34, 13, 2026], ["George Hirst", "ST", 27, 13, 2027]],
  "Leicester City": [["Mads Hermansen", "GK", 25, 15, 2028], ["Wout Faes", "CB", 28, 14, 2027], ["Jannik Vestergaard", "CB", 33, 13, 2026], ["Harry Winks", "CM", 30, 14, 2026], ["Patson Daka", "ST", 27, 14, 2026]],
  "Middlesbrough": [["Seny Dieng", "GK", 31, 13, 2027], ["Dael Fry", "CB", 28, 13, 2026], ["Rav van den Berg", "CB", 21, 14, 2027], ["Hayden Hackney", "CM", 23, 14, 2027], ["Emmanuel Latte Lath", "ST", 27, 14, 2027]],
  "Millwall": [["Lukas Jensen", "GK", 27, 12, 2027], ["Jake Cooper", "CB", 31, 13, 2026], ["Japhet Tanganga", "CB", 27, 13, 2028], ["George Saville", "CM", 32, 12, 2026], ["Mihailo Ivanovic", "ST", 21, 12, 2028]],
  "Norwich City": [["Angus Gunn", "GK", 30, 13, 2026], ["Shane Duffy", "CB", 34, 12, 2026], ["Jack Stacey", "FB", 30, 12, 2026], ["Marcelino Nunez", "CM", 26, 14, 2027], ["Josh Sargent", "ST", 26, 14, 2028]],
  "Oxford United": [["Jamie Cumming", "GK", 26, 12, 2027], ["Elliott Moore", "CB", 29, 12, 2026], ["Ciaron Brown", "CB", 28, 12, 2026], ["Cameron Brannagan", "CM", 30, 13, 2027], ["Mark Harris", "ST", 27, 12, 2026]],
  Portsmouth: [["Nicolas Schmid", "GK", 29, 12, 2027], ["Regan Poole", "CB", 27, 12, 2027], ["Conor Shaughnessy", "CB", 30, 12, 2026], ["Marlon Pack", "DM", 35, 12, 2026], ["Colby Bishop", "ST", 29, 13, 2026]],
  "Preston North End": [["Freddie Woodman", "GK", 29, 13, 2026], ["Liam Lindsay", "CB", 30, 12, 2026], ["Andrew Hughes", "CB", 34, 12, 2026], ["Ben Whiteman", "CM", 30, 13, 2026], ["Will Keane", "ST", 33, 12, 2026]],
  "Queens Park Rangers": [["Paul Nardi", "GK", 32, 12, 2026], ["Jimmy Dunne", "CB", 28, 12, 2026], ["Steve Cook", "CB", 35, 12, 2026], ["Sam Field", "DM", 28, 13, 2027], ["Ilias Chair", "AM", 28, 14, 2026]],
  "Sheffield United": [["Michael Cooper", "GK", 26, 13, 2028], ["Anel Ahmedhodzic", "CB", 27, 14, 2026], ["Jack Robinson", "CB", 32, 12, 2026], ["Gustavo Hamer", "CM", 29, 15, 2027], ["Kieffer Moore", "ST", 33, 13, 2026]],
  "Sheffield Wednesday": [["James Beadle", "GK", 21, 13, 2026], ["Dominic Iorfa", "CB", 31, 12, 2026], ["Di'Shon Bernard", "CB", 25, 12, 2027], ["Barry Bannan", "CM", 36, 13, 2026], ["Josh Windass", "AM", 32, 12, 2026]],
  Southampton: [["Gavin Bazunu", "GK", 24, 14, 2027], ["Taylor Harwood-Bellis", "CB", 24, 14, 2028], ["Jan Bednarek", "CB", 30, 13, 2026], ["Flynn Downes", "DM", 27, 13, 2028], ["Adam Armstrong", "ST", 29, 13, 2026]],
  "Stoke City": [["Viktor Johansson", "GK", 27, 13, 2027], ["Ben Wilmot", "CB", 26, 12, 2026], ["Michael Rose", "CB", 30, 12, 2026], ["Wouter Burger", "CM", 25, 13, 2027], ["Bae Jun-ho", "AM", 22, 13, 2027]],
  "Swansea City": [["Lawrence Vigouroux", "GK", 32, 12, 2026], ["Ben Cabango", "CB", 26, 13, 2028], ["Harry Darling", "CB", 26, 13, 2026], ["Matt Grimes", "CM", 30, 13, 2027], ["Liam Cullen", "ST", 27, 12, 2026]],
  Watford: [["Daniel Bachmann", "GK", 31, 13, 2028], ["Francisco Sierralta", "CB", 29, 12, 2027], ["Ryan Porteous", "CB", 27, 13, 2027], ["Giorgi Chakvetadze", "AM", 26, 14, 2028], ["Vakoun Bayo", "ST", 29, 13, 2027]],
  "West Bromwich Albion": [["Alex Palmer", "GK", 29, 13, 2027], ["Kyle Bartley", "CB", 35, 12, 2026], ["Torbjorn Heggem", "CB", 27, 13, 2027], ["Jayson Molumby", "CM", 26, 13, 2027], ["Josh Maja", "ST", 27, 13, 2026]],
  Wrexham: [["Arthur Okonkwo", "GK", 24, 13, 2027], ["Max Cleworth", "CB", 23, 12, 2027], ["Eoghan O'Connell", "CB", 30, 12, 2026], ["George Dobson", "CM", 28, 12, 2027], ["Paul Mullin", "ST", 31, 13, 2027]],
  Atalanta: [["Marco Carnesecchi", "GK", 25, 16, 2028], ["Isak Hien", "CB", 27, 15, 2028], ["Berat Djimsiti", "CB", 33, 15, 2026], ["Ederson", "CM", 26, 17, 2027], ["Ademola Lookman", "W", 28, 17, 2026], ["Gianluca Scamacca", "ST", 27, 16, 2027]],
  Bologna: [["Lukasz Skorupski", "GK", 35, 14, 2026], ["Sam Beukema", "CB", 27, 15, 2027], ["Jhon Lucumi", "CB", 28, 15, 2026], ["Remo Freuler", "CM", 34, 15, 2026], ["Riccardo Orsolini", "W", 29, 16, 2027], ["Santiago Castro", "ST", 21, 15, 2028]],
  Cagliari: [["Simone Scuffet", "GK", 30, 13, 2026], ["Yerry Mina", "CB", 31, 14, 2026], ["Sebastiano Luperto", "CB", 29, 13, 2028], ["Antoine Makoumbou", "CM", 28, 13, 2026], ["Gianluca Gaetano", "AM", 26, 14, 2029], ["Roberto Piccoli", "ST", 25, 13, 2029]],
  "Como 1907": [["Jean Butez", "GK", 31, 13, 2028], ["Alberto Dossena", "CB", 27, 14, 2028], ["Marc Kempf", "CB", 31, 14, 2027], ["Maximo Perrone", "DM", 23, 14, 2026], ["Nico Paz", "AM", 21, 16, 2028], ["Patrick Cutrone", "ST", 28, 14, 2028]],
  Cremonese: [["Emil Audero", "GK", 29, 13, 2027], ["Luca Ravanelli", "CB", 29, 12, 2026], ["Matteo Bianchetti", "CB", 33, 12, 2026], ["Michele Castagnetti", "DM", 36, 12, 2026], ["Franco Vazquez", "AM", 37, 12, 2026], ["Manuel De Luca", "ST", 28, 12, 2027]],
  Fiorentina: [["David de Gea", "GK", 35, 16, 2026], ["Luca Ranieri", "CB", 27, 14, 2028], ["Pietro Comuzzo", "CB", 21, 15, 2028], ["Rolando Mandragora", "CM", 29, 14, 2026], ["Moise Kean", "ST", 26, 16, 2029], ["Albert Gudmundsson", "AM", 28, 16, 2029]],
  Genoa: [["Nicola Leali", "GK", 33, 13, 2026], ["Koni De Winter", "CB", 23, 15, 2028], ["Johan Vasquez", "CB", 27, 14, 2027], ["Morten Frendrup", "CM", 25, 16, 2028], ["Ruslan Malinovskyi", "AM", 33, 14, 2026], ["Andrea Pinamonti", "ST", 27, 14, 2027]],
  "Hellas Verona": [["Lorenzo Montipo", "GK", 30, 13, 2026], ["Diego Coppola", "CB", 22, 15, 2027], ["Pawel Dawidowicz", "CB", 31, 13, 2026], ["Ondrej Duda", "CM", 31, 14, 2026], ["Tomas Suslov", "AM", 24, 15, 2027], ["Amin Sarr", "ST", 25, 13, 2027]],
  "Inter Milan": [["Yann Sommer", "GK", 37, 16, 2026], ["Alessandro Bastoni", "CB", 27, 18, 2028], ["Benjamin Pavard", "CB", 30, 16, 2028], ["Federico Dimarco", "FB", 28, 17, 2027], ["Nicolo Barella", "CM", 29, 18, 2029], ["Lautaro Martinez", "ST", 28, 19, 2029]],
  Juventus: [["Michele Di Gregorio", "GK", 28, 15, 2029], ["Bremer", "CB", 29, 17, 2029], ["Federico Gatti", "CB", 28, 15, 2028], ["Manuel Locatelli", "DM", 28, 16, 2028], ["Kenan Yildiz", "AM", 20, 17, 2029], ["Dusan Vlahovic", "ST", 26, 17, 2026]],
  Lazio: [["Ivan Provedel", "GK", 32, 15, 2027], ["Mario Gila", "CB", 25, 15, 2027], ["Alessio Romagnoli", "CB", 31, 15, 2027], ["Matteo Guendouzi", "CM", 27, 16, 2028], ["Mattia Zaccagni", "W", 31, 16, 2029], ["Taty Castellanos", "ST", 27, 15, 2028]],
  Lecce: [["Wladimiro Falcone", "GK", 31, 14, 2028], ["Federico Baschirotto", "CB", 29, 13, 2026], ["Kialonda Gaspar", "CB", 28, 13, 2027], ["Ylber Ramadani", "DM", 30, 13, 2026], ["Patrick Dorgu", "FB", 21, 15, 2029], ["Nikola Krstovic", "ST", 26, 14, 2027]],
  "AC Milan": [["Mike Maignan", "GK", 30, 17, 2026], ["Fikayo Tomori", "CB", 28, 16, 2027], ["Theo Hernandez", "FB", 28, 18, 2026], ["Tijjani Reijnders", "CM", 27, 17, 2030], ["Rafael Leao", "W", 26, 18, 2028], ["Santiago Gimenez", "ST", 25, 16, 2029]],
  Napoli: [["Alex Meret", "GK", 29, 15, 2027], ["Amir Rrahmani", "CB", 32, 15, 2027], ["Alessandro Buongiorno", "CB", 26, 17, 2029], ["Stanislav Lobotka", "DM", 31, 16, 2027], ["Scott McTominay", "CM", 29, 16, 2028], ["Romelu Lukaku", "ST", 33, 16, 2027]],
  Parma: [["Zion Suzuki", "GK", 23, 14, 2029], ["Enrico Delprato", "CB", 26, 13, 2027], ["Botond Balogh", "CB", 24, 13, 2027], ["Adrian Bernabe", "CM", 25, 15, 2027], ["Dennis Man", "W", 27, 14, 2027], ["Ange-Yoan Bonny", "ST", 22, 15, 2027]],
  "Pisa SC": [["Adrian Semper", "GK", 28, 12, 2027], ["Antonio Caracciolo", "CB", 35, 12, 2026], ["Arturo Calabresi", "CB", 30, 12, 2026], ["Marius Marin", "CM", 27, 13, 2026], ["Mattia Valoti", "AM", 32, 12, 2026], ["Alexander Lind", "ST", 23, 13, 2028]],
  Roma: [["Mile Svilar", "GK", 26, 15, 2027], ["Gianluca Mancini", "CB", 29, 16, 2027], ["Evan Ndicka", "CB", 26, 16, 2028], ["Bryan Cristante", "DM", 31, 15, 2027], ["Lorenzo Pellegrini", "AM", 30, 16, 2026], ["Paulo Dybala", "AM", 32, 17, 2026]],
  Sassuolo: [["Andrea Consigli", "GK", 39, 12, 2026], ["Martin Erlic", "CB", 28, 13, 2027], ["Josh Doig", "FB", 24, 14, 2028], ["Kristian Thorstvedt", "CM", 27, 14, 2027], ["Armand Lauriente", "W", 27, 15, 2027], ["Andrea Pinamonti", "ST", 27, 14, 2027]],
  Torino: [["Vanja Milinkovic-Savic", "GK", 29, 15, 2027], ["Alessandro Buongiorno", "CB", 26, 17, 2028], ["Perr Schuurs", "CB", 26, 15, 2026], ["Samuele Ricci", "CM", 24, 16, 2028], ["Nikola Vlasic", "AM", 28, 15, 2027], ["Duvan Zapata", "ST", 35, 14, 2026]],
  Udinese: [["Maduka Okoye", "GK", 26, 14, 2027], ["Jaka Bijol", "CB", 27, 15, 2027], ["Thomas Kristensen", "CB", 24, 13, 2028], ["Sandi Lovric", "CM", 28, 14, 2027], ["Lazar Samardzic", "AM", 24, 16, 2026], ["Lorenzo Lucca", "ST", 25, 15, 2028]],
  "FC Augsburg": [["Finn Dahmen", "GK", 28, 14, 2027], ["Jeffrey Gouweleeuw", "CB", 34, 13, 2026], ["Keven Schlotterbeck", "CB", 29, 14, 2027], ["Elvis Rexhbecaj", "CM", 28, 14, 2027], ["Arne Maier", "CM", 27, 14, 2026], ["Phillip Tietz", "ST", 28, 14, 2027]],
  "Bayern Munich": [["Manuel Neuer", "GK", 40, 17, 2026], ["Dayot Upamecano", "CB", 27, 17, 2026], ["Kim Min-jae", "CB", 29, 17, 2028], ["Joshua Kimmich", "CM", 31, 18, 2028], ["Jamal Musiala", "AM", 23, 20, 2030], ["Harry Kane", "ST", 32, 19, 2027]],
  "Borussia Dortmund": [["Gregor Kobel", "GK", 28, 17, 2028], ["Nico Schlotterbeck", "CB", 26, 17, 2027], ["Waldemar Anton", "CB", 29, 16, 2028], ["Julian Brandt", "AM", 29, 16, 2026], ["Karim Adeyemi", "W", 24, 16, 2027], ["Serhou Guirassy", "ST", 30, 17, 2028]],
  "Borussia Monchengladbach": [["Moritz Nicolas", "GK", 28, 14, 2029], ["Ko Itakura", "CB", 29, 15, 2026], ["Nico Elvedi", "CB", 29, 15, 2027], ["Julian Weigl", "DM", 30, 15, 2028], ["Franck Honorat", "W", 29, 15, 2028], ["Tim Kleindienst", "ST", 30, 15, 2028]],
  "Werder Bremen": [["Michael Zetterer", "GK", 30, 14, 2027], ["Marco Friedl", "CB", 28, 14, 2026], ["Niklas Stark", "CB", 31, 14, 2027], ["Jens Stage", "CM", 29, 15, 2026], ["Romano Schmid", "AM", 26, 15, 2026], ["Marvin Ducksch", "ST", 32, 14, 2026]],
  "Eintracht Frankfurt": [["Kevin Trapp", "GK", 35, 15, 2026], ["Robin Koch", "CB", 29, 16, 2027], ["Tuta", "CB", 26, 15, 2026], ["Ellyes Skhiri", "DM", 31, 15, 2027], ["Mario Gotze", "AM", 34, 15, 2026], ["Hugo Ekitike", "ST", 23, 17, 2029]],
  "SC Freiburg": [["Noah Atubolu", "GK", 24, 15, 2027], ["Matthias Ginter", "CB", 32, 15, 2026], ["Philipp Lienhart", "CB", 30, 15, 2026], ["Nicolas Hofler", "DM", 36, 13, 2026], ["Ritsu Doan", "W", 28, 15, 2027], ["Vincenzo Grifo", "W", 33, 15, 2026]],
  "Hamburger SV": [["Daniel Heuer Fernandes", "GK", 33, 13, 2026], ["Sebastian Schonlau", "CB", 31, 13, 2026], ["Dennis Hadzikadunic", "CB", 28, 13, 2027], ["Jonas Meffert", "DM", 31, 13, 2026], ["Ludovit Reis", "CM", 26, 14, 2028], ["Robert Glatzel", "ST", 32, 13, 2026]],
  "FC Heidenheim": [["Kevin Muller", "GK", 35, 12, 2026], ["Patrick Mainka", "CB", 31, 13, 2027], ["Benedikt Gimber", "CB", 29, 13, 2026], ["Lennard Maloney", "DM", 26, 13, 2026], ["Jan Schoppner", "CM", 27, 13, 2027], ["Marvin Pieringer", "ST", 26, 13, 2027]],
  "TSG Hoffenheim": [["Oliver Baumann", "GK", 36, 15, 2026], ["Ozan Kabak", "CB", 26, 14, 2026], ["Kevin Akpoguma", "CB", 31, 13, 2026], ["Anton Stach", "CM", 27, 15, 2027], ["Andrej Kramaric", "AM", 34, 16, 2026], ["Max Moerstedt", "ST", 20, 14, 2028]],
  "FC Koln": [["Marvin Schwabe", "GK", 31, 14, 2027], ["Timo Hubers", "CB", 29, 14, 2026], ["Julian Pauli", "CB", 21, 13, 2028], ["Eric Martel", "DM", 24, 14, 2026], ["Florian Kainz", "AM", 33, 14, 2026], ["Damion Downs", "ST", 22, 13, 2026]],
  "RB Leipzig": [["Peter Gulacsi", "GK", 36, 15, 2026], ["Willi Orban", "CB", 33, 16, 2027], ["Castello Lukeba", "CB", 23, 17, 2028], ["Xaver Schlager", "CM", 28, 16, 2026], ["Xavi Simons", "AM", 23, 18, 2027], ["Benjamin Sesko", "ST", 23, 18, 2029]],
  "Bayer Leverkusen": [["Lukas Hradecky", "GK", 36, 15, 2026], ["Jonathan Tah", "CB", 30, 17, 2026], ["Edmond Tapsoba", "CB", 27, 17, 2028], ["Granit Xhaka", "CM", 33, 17, 2028], ["Florian Wirtz", "AM", 23, 20, 2027], ["Patrik Schick", "ST", 30, 16, 2027]],
  "Mainz 05": [["Robin Zentner", "GK", 31, 14, 2026], ["Stefan Bell", "CB", 34, 13, 2026], ["Dominik Kohr", "DM", 32, 14, 2026], ["Nadiem Amiri", "CM", 29, 15, 2028], ["Paul Nebel", "AM", 23, 14, 2026], ["Jonathan Burkardt", "ST", 25, 16, 2027]],
  "St Pauli": [["Nikola Vasilj", "GK", 30, 13, 2027], ["Eric Smith", "CB", 29, 13, 2026], ["Hauke Wahl", "CB", 32, 13, 2026], ["Jackson Irvine", "CM", 33, 13, 2026], ["Oladapo Afolayan", "W", 28, 13, 2027], ["Johannes Eggestein", "ST", 28, 13, 2026]],
  "VfB Stuttgart": [["Alexander Nubel", "GK", 29, 15, 2026], ["Waldemar Anton", "CB", 29, 16, 2027], ["Dan-Axel Zagadou", "CB", 26, 14, 2026], ["Angelo Stiller", "CM", 25, 17, 2028], ["Enzo Millot", "AM", 24, 16, 2028], ["Deniz Undav", "ST", 29, 16, 2027]],
  "Union Berlin": [["Frederik Ronnow", "GK", 33, 14, 2026], ["Kevin Vogt", "CB", 34, 13, 2026], ["Diogo Leite", "CB", 27, 14, 2026], ["Rani Khedira", "DM", 32, 13, 2026], ["Benedict Hollerbach", "W", 25, 14, 2027], ["Jordan Siebatcheu", "ST", 30, 13, 2026]],
  "VfL Wolfsburg": [["Kamil Grabara", "GK", 27, 15, 2029], ["Maxence Lacroix", "CB", 26, 15, 2026], ["Sebastiaan Bornauw", "CB", 27, 14, 2026], ["Maximilian Arnold", "CM", 32, 15, 2026], ["Lovro Majer", "AM", 28, 15, 2028], ["Jonas Wind", "ST", 27, 15, 2026]],
});

const YOUNG_TRANSFER_TARGETS = [
  ["Lamine Yamal", "W", 18, 19, 2031], ["Warren Zaire-Emery", "CM", 20, 18, 2029], ["Endrick", "ST", 19, 17, 2030],
  ["Franco Mastantuono", "AM", 18, 17, 2031], ["Geovany Quenda", "W", 19, 16, 2030], ["Jorrel Hato", "CB", 20, 17, 2028],
  ["Kendry Paez", "AM", 19, 16, 2030], ["Roony Bardghji", "W", 20, 16, 2029], ["Marc Bernal", "DM", 19, 16, 2029],
  ["Ethan Nwaneri", "AM", 19, 16, 2029], ["Chris Rigg", "CM", 19, 15, 2027], ["Mikey Moore", "W", 18, 15, 2028],
];

const FREE_AGENT_SEEDS = [
  ["Sergio Ramos", "CB", 40, 14, 2026], ["Memphis Depay", "ST", 32, 15, 2026], ["Anthony Martial", "ST", 30, 14, 2026],
  ["Dele Alli", "AM", 30, 13, 2026], ["Keylor Navas", "GK", 39, 14, 2026], ["Miralem Pjanic", "CM", 36, 13, 2026],
  ["Juan Cuadrado", "FB", 38, 13, 2026], ["Wissam Ben Yedder", "ST", 35, 14, 2026],
];

const REAL_TRANSFER_LEDGER_2526 = [
  { player: "Martin Zubimendi", role: "DM", age: 27, quality: 18, from: "Real Sociedad", to: "Arsenal", fee: 65_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Viktor Gyokeres", role: "ST", age: 28, quality: 18, from: "Sporting CP", to: "Arsenal", fee: 72_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Florian Wirtz", role: "AM", age: 23, quality: 20, from: "Bayer Leverkusen", to: "Liverpool", fee: 125_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Hugo Ekitike", role: "ST", age: 24, quality: 17, from: "Eintracht Frankfurt", to: "Liverpool", fee: 95_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Matheus Cunha", role: "AM", age: 27, quality: 17, from: "Wolverhampton Wanderers", to: "Manchester United", fee: 74_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Benjamin Sesko", role: "ST", age: 23, quality: 17, from: "RB Leipzig", to: "Manchester United", fee: 76_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Bryan Mbeumo", role: "W", age: 26, quality: 17, from: "Brentford", to: "Manchester United", fee: 71_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Mohammed Kudus", role: "W", age: 25, quality: 17, from: "West Ham United", to: "Tottenham Hotspur", fee: 64_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Xavi Simons", role: "AM", age: 23, quality: 18, from: "RB Leipzig", to: "Tottenham Hotspur", fee: 60_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Joao Pedro", role: "ST", age: 24, quality: 17, from: "Brighton & Hove Albion", to: "Chelsea", fee: 64_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Jamie Gittens", role: "W", age: 21, quality: 16, from: "Borussia Dortmund", to: "Chelsea", fee: 56_000_000, type: "arrival", source: "Transfermarkt 25/26 seed" },
  { player: "Morgan Gibbs-White", role: "AM", age: 26, quality: 17, from: "Nottingham Forest", to: "Tottenham Hotspur", fee: 70_000_000, type: "rumour", source: "Transfermarkt-style rumour seed" },
];

const LALIGA_TRANSFER_LEDGER_2526 = [
  { player: "Trent Alexander-Arnold", role: "FB", age: 27, quality: 18, from: "Liverpool", to: "Real Madrid", fee: 10_000_000, type: "arrival", source: "LALIGA 25/26 seed" },
  { player: "Dean Huijsen", role: "CB", age: 21, quality: 17, from: "Bournemouth", to: "Real Madrid", fee: 62_000_000, type: "arrival", source: "LALIGA 25/26 seed" },
  { player: "Joan Garcia", role: "GK", age: 25, quality: 16, from: "RCD Espanyol", to: "FC Barcelona", fee: 25_000_000, type: "arrival", source: "LALIGA 25/26 seed" },
  { player: "Marcus Rashford", role: "W", age: 28, quality: 17, from: "Manchester United", to: "FC Barcelona", fee: 0, type: "loan", source: "LALIGA 25/26 seed" },
  { player: "Alex Baena", role: "AM", age: 24, quality: 18, from: "Villarreal CF", to: "Atletico Madrid", fee: 42_000_000, type: "arrival", source: "LALIGA 25/26 seed" },
  { player: "David Hancko", role: "CB", age: 28, quality: 16, from: "Feyenoord", to: "Atletico Madrid", fee: 30_000_000, type: "arrival", source: "LALIGA 25/26 seed" },
  { player: "Alberto Moleiro", role: "AM", age: 22, quality: 16, from: "Las Palmas", to: "Villarreal CF", fee: 16_000_000, type: "arrival", source: "LALIGA 25/26 seed" },
  { player: "Santi Cazorla", role: "CM", age: 41, quality: 13, from: "Real Oviedo", to: "Real Oviedo", fee: 0, type: "renewal", source: "LALIGA 25/26 seed" },
];

const REAL_SHIRT_NUMBERS = {
  "David Raya": 22, "William Saliba": 2, "Gabriel Magalhaes": 6, "Jurrien Timber": 12, "Riccardo Calafiori": 33, "Declan Rice": 41,
  "Martin Odegaard": 8, "Mikel Merino": 23, "Bukayo Saka": 7, "Gabriel Martinelli": 11, "Kai Havertz": 29, "Ethan Nwaneri": 53,
  "Emiliano Martinez": 23, "Ezri Konsa": 4, "Pau Torres": 14, "Matty Cash": 2, "Lucas Digne": 12, "Boubacar Kamara": 44,
  "Youri Tielemans": 8, "John McGinn": 7, "Morgan Rogers": 27, "Ollie Watkins": 11, "Jacob Ramsey": 41,
  "Kepa Arrizabalaga": 13, "Illia Zabarnyi": 27, "Marcos Senesi": 5, "Milos Kerkez": 3, "Adam Smith": 15, "Lewis Cook": 4,
  "Ryan Christie": 10, "Alex Scott": 14, "Justin Kluivert": 19, "Antoine Semenyo": 24, "Evanilson": 9,
  "Mark Flekken": 1, "Nathan Collins": 22, "Ethan Pinnock": 5, "Aaron Hickey": 2, "Rico Henry": 3, "Christian Norgaard": 6,
  "Vitaly Janelt": 27, "Mikkel Damsgaard": 24, "Bryan Mbeumo": 19, "Kevin Schade": 7, "Yoane Wissa": 11,
  "Bart Verbruggen": 1, "Lewis Dunk": 5, "Jan Paul van Hecke": 29, "Pervis Estupinan": 30, "Tariq Lamptey": 2, "Carlos Baleba": 20,
  "Mats Wieffer": 27, "Jack Hinshelwood": 41, "Georginio Rutter": 14, "Kaoru Mitoma": 22, "Evan Ferguson": 28,
  "James Trafford": 1, "Maxime Esteve": 5, "Jordan Beyer": 36, "Connor Roberts": 14, "Josh Cullen": 24, "Hannibal Mejbri": 28,
  "Josh Laurent": 29, "Zian Flemming": 19, "Luca Koleosho": 30, "Lyle Foster": 17,
  "Robert Sanchez": 1, "Levi Colwill": 6, "Wesley Fofana": 29, "Reece James": 24, "Marc Cucurella": 3, "Moises Caicedo": 25,
  "Enzo Fernandez": 8, "Cole Palmer": 20, "Estevao Willian": 41, "Pedro Neto": 7, "Nicolas Jackson": 15,
  "Dean Henderson": 1, "Marc Guehi": 6, "Maxence Lacroix": 5, "Daniel Munoz": 12, "Tyrick Mitchell": 3, "Adam Wharton": 20,
  "Jefferson Lerma": 8, "Daichi Kamada": 18, "Eberechi Eze": 10, "Ismaila Sarr": 7, "Jean-Philippe Mateta": 14,
  "Jordan Pickford": 1, "James Tarkowski": 6, "Jarrad Branthwaite": 32, "Vitalii Mykolenko": 19, "Seamus Coleman": 23, "Idrissa Gueye": 27,
  "James Garner": 37, "Tim Iroegbunam": 42, "Dwight McNeil": 7, "Iliman Ndiaye": 10, "Dominic Calvert-Lewin": 9,
  "Bernd Leno": 1, "Joachim Andersen": 5, "Calvin Bassey": 3, "Kenny Tete": 2, "Antonee Robinson": 33, "Sander Berge": 16,
  "Andreas Pereira": 18, "Emile Smith Rowe": 32, "Alex Iwobi": 17, "Harry Wilson": 8, "Rodrigo Muniz": 9,
  "Illan Meslier": 1, "Joe Rodon": 6, "Pascal Struijk": 5, "Jayden Bogle": 2, "Junior Firpo": 3, "Ethan Ampadu": 4,
  "Ao Tanaka": 22, "Ilia Gruev": 44, "Brenden Aaronson": 11, "Daniel James": 7, "Joel Piroe": 10,
  "Alisson": 1, "Virgil van Dijk": 4, "Ibrahima Konate": 5, "Trent Alexander-Arnold": 66, "Andrew Robertson": 26, "Ryan Gravenberch": 38,
  "Alexis Mac Allister": 10, "Dominik Szoboszlai": 8, "Mohamed Salah": 11, "Luis Diaz": 7, "Darwin Nunez": 9, "Harvey Elliott": 19,
  "Ederson": 31, "Ruben Dias": 3, "Josko Gvardiol": 24, "Kyle Walker": 2, "Rico Lewis": 82, "Rodri": 16, "Phil Foden": 47,
  "Bernardo Silva": 20, "Kevin De Bruyne": 17, "Jeremy Doku": 11, "Erling Haaland": 9,
  "Andre Onana": 24, "Lisandro Martinez": 6, "Leny Yoro": 15, "Diogo Dalot": 20, "Luke Shaw": 23, "Manuel Ugarte": 25,
  "Kobbie Mainoo": 37, "Bruno Fernandes": 8, "Amad Diallo": 16, "Alejandro Garnacho": 17, "Rasmus Hojlund": 9,
  "Nick Pope": 22, "Sven Botman": 4, "Fabian Schar": 5, "Tino Livramento": 21, "Lewis Hall": 20, "Bruno Guimaraes": 39,
  "Sandro Tonali": 8, "Joelinton": 7, "Anthony Gordon": 10, "Harvey Barnes": 11, "Alexander Isak": 14,
  "Matz Sels": 26, "Murillo": 5, "Nikola Milenkovic": 31, "Neco Williams": 7, "Ola Aina": 34, "Ibrahim Sangare": 6,
  "Morgan Gibbs-White": 10, "Danilo": 28, "Callum Hudson-Odoi": 14, "Anthony Elanga": 21, "Chris Wood": 11,
  "Anthony Patterson": 1, "Dan Ballard": 5, "Luke O'Nien": 13, "Trai Hume": 32, "Dennis Cirkin": 3, "Dan Neil": 24,
  "Jobe Bellingham": 7, "Chris Rigg": 11, "Patrick Roberts": 10, "Romaine Mundle": 14, "Eliezer Mayenda": 12,
  "Guglielmo Vicario": 1, "Cristian Romero": 17, "Micky van de Ven": 37, "Pedro Porro": 23, "Destiny Udogie": 13, "Yves Bissouma": 8,
  "Pape Matar Sarr": 29, "James Maddison": 10, "Dejan Kulusevski": 21, "Brennan Johnson": 22, "Dominic Solanke": 19, "Archie Gray": 14,
  "Alphonse Areola": 23, "Max Kilman": 26, "Jean-Clair Todibo": 25, "Aaron Wan-Bissaka": 29, "Emerson": 33, "Edson Alvarez": 19,
  "Tomas Soucek": 28, "Lucas Paqueta": 10, "Jarrod Bowen": 20, "Mohammed Kudus": 14, "Niclas Fullkrug": 11,
  "Jose Sa": 1, "Toti Gomes": 24, "Santiago Bueno": 4, "Nelson Semedo": 22, "Rayan Ait-Nouri": 3, "Joao Gomes": 8,
  "Andre": 7, "Jean-Ricner Bellegarde": 27, "Matheus Cunha": 10, "Hwang Hee-chan": 11, "Jorgen Strand Larsen": 9,
  "Thibaut Courtois": 1, "Dani Carvajal": 2, "Antonio Rudiger": 22, "Eder Militao": 3, "Ferland Mendy": 23, "Aurelien Tchouameni": 14,
  "Federico Valverde": 8, "Jude Bellingham": 5, "Vinicius Junior": 7, Rodrygo: 11, "Kylian Mbappe": 9,
  "Marc-Andre ter Stegen": 1, "Jules Kounde": 23, "Ronald Araujo": 4, "Pau Cubarsi": 2, "Alejandro Balde": 3, "Frenkie de Jong": 21,
  Pedri: 8, Gavi: 6, "Lamine Yamal": 19, Raphinha: 11, "Robert Lewandowski": 9,
  "Manuel Neuer": 1, "Joshua Kimmich": 6, "Dayot Upamecano": 2, "Kim Min-jae": 3, "Alphonso Davies": 19, "Joao Palhinha": 16,
  "Leon Goretzka": 8, "Jamal Musiala": 42, "Michael Olise": 17, "Leroy Sane": 10, "Harry Kane": 9,
  "Gianluigi Donnarumma": 1, "Achraf Hakimi": 2, Marquinhos: 5, "Nuno Mendes": 25, Vitinha: 17, "Warren Zaire-Emery": 33,
  "Fabian Ruiz": 8, "Ousmane Dembele": 10, "Bradley Barcola": 29, "Goncalo Ramos": 9,
  "Lionel Messi": 10, "Luis Suarez": 9, Neymar: 10, "Cristiano Ronaldo": 7, "Sadio Mane": 10, "Harry Kane": 9,
  Endrick: 16, "Franco Mastantuono": 30, "Geovany Quenda": 57, "Kendry Paez": 10, "Roony Bardghji": 40, "Marc Bernal": 28, "Mikey Moore": 47,
};

const ROLE_NUMBER_POOLS = {
  GK: [1, 13, 22, 31, 40],
  CB: [2, 4, 5, 6, 12, 15, 16, 24, 26, 32],
  FB: [2, 3, 12, 14, 15, 20, 21, 22, 23, 29, 33],
  DM: [4, 5, 6, 14, 16, 19, 24, 25, 28, 41],
  CM: [6, 8, 10, 14, 17, 18, 20, 21, 22, 23, 27, 37],
  AM: [7, 8, 10, 11, 14, 18, 20, 21, 27, 47],
  W: [7, 10, 11, 14, 17, 19, 20, 21, 22, 24, 27, 47],
  ST: [7, 9, 10, 11, 14, 18, 19, 24, 29, 30],
};

const state = {
  week: 1,
  season: new Date().getFullYear(),
  currentDate: null,
  introComplete: false,
  careerSetupMode: null,
  customTeamName: "Your New Team FC",
  customLeagueId: "eng-premier-league",
  manager: {
    firstName: "Alex",
    lastName: "Taylor",
    nationality: "England",
    secondaryNationality: "Ireland",
    coachingStyle: "Balanced",
  },
  gameStarted: false,
  seasonComplete: false,
  activeView: "menu",
  selectedLeagueId: "eng-premier-league",
  pendingLeagueId: "eng-premier-league",
  userTeamId: 1,
  pendingTeamId: 1,
  selectedOpponentId: 2,
  selectedPlayerId: null,
  squadMode: "overview",
  squadGroup: "senior",
  bookmarksOpen: false,
  bookmarkIds: ["messages", "firstTeam", "tactics", "playerDatabase", "transferActivity", "competitions"],
  lineupPlayerIds: null,
  lastMatch: null,
  matchdayPhase: "ready",
  preMatchConfirmed: false,
  postMatchSummary: null,
  viewerMode: "broadcast",
  highlightLevel: "extended",
  matchPlaybackSpeed: 1,
  pendingMatchDecision: null,
  touchlineShout: null,
  uiScale: "normal",
  matchWidgets: {
    stats: true,
    fatigue: true,
    events: true,
    ratings: true,
  },
  teams: [],
  players: [],
  staff: [],
  fixtures: [],
  calendarEvents: [],
  postponedFixtures: [],
  table: [],
  competitions: [],
  honors: [],
  leagueMovement: null,
  latestChampionNotice: null,
  transferMarket: [],
  transferNews: [],
  transferSearch: "",
  transferRoleFilter: "ALL",
  marketDataUpdatedAt: null,
  marketSource: "Transfermarkt-style",
  transferApiBaseUrl: "https://transfermarkt-api.fly.dev",
  transferApiStatus: "Not connected",
  transferApiLimit: 6,
  initialMarketSyncDone: false,
  initialMarketSyncRunning: false,
  scoutingKnowledge: {},
  scoutingAssignments: [],
  scoutingReports: [],
  analystReports: [],
  selectedScoutPlayerId: null,
  activeDialogue: null,
  activeNegotiation: null,
  dialogueQueue: [],
  dialogueHistory: [],
  staffDelegation: {
    press: false,
    youthContracts: true,
    scoutingShortlist: true,
    trainingSchedule: false,
    medicalAlerts: true,
  },
  infrastructureProjects: [],
  socialFeed: [],
  managerPool: [],
  jobMarketHistory: [],
  leagueReputation: {},
  mediaPressure: null,
  mediaHistory: [],
  newgenCounter: 0,
  board: {
    score: 70,
    grade: "B",
    status: "Stable",
    warningLevel: 0,
    history: [],
    vision: {
      youthSignings: true,
      attackingFootball: true,
      wageControl: true,
    },
  },
  financeReport: {
    lastIncome: 0,
    lastWages: 0,
    lastOperations: 0,
    lastNet: 0,
    seasonIncome: 0,
    seasonExpenses: 0,
  },
  trainingIntensity: "balanced",
  trainingFocus: "tactical",
  youthFocus: "balanced",
  tacticsModule: "team",
  selectedTacticPlayerId: null,
  feed: [],
  formationPositions: null,
  lifeEvents: [],
  teamTalk: {
    lastStyle: null,
    boost: 0,
    history: [],
    reactions: [],
  },
  tactics: {
    formation: "4-3-3",
    mentality: "balanced",
    pressing: 12,
    tempo: 12,
    width: 12,
    line: 11,
    passIntoSpace: true,
    playOutOfDefence: true,
    counterPress: true,
    focusPlay: "balanced",
    passingDirectness: 10,
    possessionLost: "counterPress",
    possessionWon: "counter",
    defensiveWidth: 11,
    marking: "zonal",
    creativeFreedom: "flexible",
    setPieces: {
      cornerRoutine: "nearPost",
      freeKickRoutine: "bestDelivery",
      throwInRoutine: "retainPossession",
      penaltyTakerId: null,
      cornerTakerId: null,
      freeKickTakerId: null,
    },
    cohesion: 62,
    familiarity: {
      mentality: 72,
      tempo: 66,
      passing: 68,
      creative: 61,
      positioning: 70,
      pressing: 66,
      marking: 65,
      roles: 64,
    },
  },
};

const BOOKMARK_CATALOG = [
  { id: "messages", label: "Messages", icon: "▰", view: "inbox" },
  { id: "firstTeam", label: "First Team", icon: "⚑", view: "squad", mode: "overview" },
  { id: "tactics", label: "Tactics", icon: "▣", view: "tactics" },
  { id: "playerDatabase", label: "Player Database", icon: "⌕", view: "squad", mode: "report" },
  { id: "transferActivity", label: "Transfer Activity", icon: "↔", view: "transfers" },
  { id: "competitions", label: "Competitions", icon: "♛", view: "competitions" },
  { id: "calendar", label: "Calendar", icon: "▦", view: "schedule" },
  { id: "clubSite", label: "Club Site", icon: "⬟", view: "clubInfo" },
  { id: "competitionStages", label: "Competition Stages", icon: "◉", view: "competitions" },
  { id: "dataHub", label: "Data Hub", icon: "◎", view: "engine" },
  { id: "finances", label: "Finances", icon: "▤", view: "finances" },
  { id: "fixtureSchedule", label: "Fixture Schedule", icon: "▥", view: "schedule" },
  { id: "jobCentre", label: "Job Centre", icon: "♙", view: "clubVision" },
  { id: "newsSite", label: "News Site", icon: "◌", view: "news" },
  { id: "playerRecommendations", label: "Player Recommendations", icon: "✧", view: "scouting" },
  { id: "recruitmentBudgets", label: "Recruitment Budgets", icon: "◈", view: "finances" },
  { id: "recruitmentFocuses", label: "Recruitment Focuses", icon: "⊙", view: "scouting" },
  { id: "responsibilities", label: "Responsibilities", icon: "☷", view: "staff" },
  { id: "setPieces", label: "Set Pieces", icon: "⚑", view: "tactics" },
  { id: "shortlists", label: "Shortlists", icon: "▤", view: "transfers" },
  { id: "squadPlanner", label: "Squad Planner", icon: "◌", view: "squad", mode: "overview" },
  { id: "staff", label: "Staff", icon: "♟", view: "staff" },
  { id: "staffSearch", label: "Staff Search", icon: "⌕", view: "staff" },
  { id: "staffTransferActivity", label: "Staff Transfer Activity", icon: "↔", view: "staff" },
  { id: "training", label: "Training", icon: "▲", view: "training" },
  { id: "transferWindow", label: "Transfer Window", icon: "◷", view: "transfers" },
  { id: "transferRoomIn", label: "TransferRoom In", icon: "▣", view: "transfers" },
  { id: "transferRoomOut", label: "TransferRoom Out", icon: "◧", view: "transfers" },
  { id: "youthSetup", label: "Youth Setup", icon: "✤", view: "development" },
];

function bookmarkItem(id) {
  return BOOKMARK_CATALOG.find((item) => item.id === id);
}

function toggleBookmarksModal(force) {
  state.bookmarksOpen = typeof force === "boolean" ? force : !state.bookmarksOpen;
  render();
}

function goBookmark(id) {
  const item = bookmarkItem(id);
  if (!item) return;
  state.activeView = item.view;
  if (item.mode) state.squadMode = item.mode;
  state.bookmarksOpen = false;
  render();
}

function toggleBookmark(id) {
  const exists = state.bookmarkIds.includes(id);
  if (exists) {
    state.bookmarkIds = state.bookmarkIds.filter((bookmarkId) => bookmarkId !== id);
  } else if (state.bookmarkIds.length < 12) {
    state.bookmarkIds = [...state.bookmarkIds, id];
  } else {
    addFeed("Bookmark limit reached. Remove one shortcut before adding another.");
  }
  render();
}

const PATH_VIEW_CLASSES = [
  "path-menu",
  "path-inbox",
  "path-squad",
  "path-match",
  "path-replay",
  "path-tactics",
  "path-playerStats",
  "path-dynamics",
  "path-staff",
  "path-training",
  "path-schedule",
  "path-league",
  "path-competitions",
  "path-scouting",
  "path-media",
  "path-honors",
  "path-development",
  "path-clubInfo",
  "path-clubVision",
  "path-transfers",
  "path-news",
  "path-finances",
  "path-engine",
  "path-schema",
];

function setPathTheme(view) {
  document.body.classList.remove(...PATH_VIEW_CLASSES);
  document.body.classList.add(`path-${view}`);
}

function openStartMenu() {
  state.introComplete = true;
  state.careerSetupMode = null;
  render();
}

function chooseCareerSetup(mode) {
  state.careerSetupMode = mode;
  const leagueModeMap = {
    premier: "eng-premier-league",
    championship: "eng-championship",
    leagueone: "eng-league-one",
    leaguetwo: "eng-league-two",
    laliga: "esp-la-liga",
    hypermotion: "esp-hypermotion",
    seriea: "ita-serie-a",
    serieb: "ita-serie-b",
    bundesliga: "ger-bundesliga",
    bundesliga2: "ger-2-bundesliga",
    ligue1: "fra-ligue-1",
    ligue2: "fra-ligue-2",
  };
  const leagueId = mode === "create" ? state.customLeagueId : leagueModeMap[mode] ?? "eng-premier-league";
  selectStartLeague(leagueId);
  if (mode === "create") {
    createCustomTeamSeed();
  }
  render();
}

function backToCareerChoice() {
  state.careerSetupMode = null;
  render();
}

function createCustomTeamSeed() {
  const custom = state.teams[0];
  if (!custom) return;
  const customName = state.customTeamName.trim() || "Your New Team FC";
  custom.name = customName;
  custom.reputation = 72;
  custom.budget = 75_000_000;
  custom.wageBudget = 1_550_000;
  custom.morale = 12;
  custom.logo = null;
  custom.logoType = "generated";
  state.pendingTeamId = custom.id;
  state.userTeamId = custom.id;
  playersForTeam(custom.id).forEach((player, index) => {
    player.name = randomAcademyName(index);
    player.contract.source = "custom club starter contract";
  });
  assignTeamShirtNumbers(custom.id);
  addFeed(`Created ${customName} in ${currentLeague().name}.`);
}

function updateCustomTeamName(value) {
  state.customTeamName = value;
  createCustomTeamSeed();
  render();
}

function updateManagerField(field, value) {
  if (!Object.hasOwn(state.manager, field)) return;
  state.manager[field] = value;
  if (field === "nationality") state.manager.secondaryNationality = secondaryNationalityFor(value, managerFullName());
}

function selectCustomLeague(leagueId) {
  state.customLeagueId = REAL_PLAYABLE_LEAGUE_IDS.includes(leagueId) ? leagueId : "eng-premier-league";
  selectStartLeague(state.customLeagueId);
  state.careerSetupMode = "create";
  createCustomTeamSeed();
  render();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chance(probability) {
  return Math.random() < probability;
}

function money(value) {
  return `$${(value / 1_000_000).toFixed(1)}m`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function managerFullName() {
  const firstName = state.manager.firstName.trim() || "Alex";
  const lastName = state.manager.lastName.trim() || "Taylor";
  return `${firstName} ${lastName}`;
}

function wage(value) {
  return `$${Math.round(value / 1000)}k/w`;
}

function resetFinanceReport() {
  state.financeReport = {
    lastIncome: 0,
    lastWages: 0,
    lastOperations: 0,
    lastNet: 0,
    seasonIncome: 0,
    seasonExpenses: 0,
  };
}

function setTrainingPlan(key, value) {
  if (key === "intensity") state.trainingIntensity = value;
  if (key === "focus") state.trainingFocus = value;
  addFeed(`Training plan updated: ${state.trainingIntensity} intensity, ${state.trainingFocus} focus.`);
  render();
}

function setYouthFocus(value) {
  state.youthFocus = value;
  addFeed(`Youth centre focus changed to ${value}.`);
  render();
}

function promoteYouthPlayer(playerId) {
  const player = playersForTeam(state.userTeamId).find((candidate) => candidate.id === playerId);
  if (!player || !["u21", "u18"].includes(player.squadGroup)) return;
  player.squadGroup = player.age <= 20 ? "sub" : "senior";
  addFeed(`${player.name} promoted into the ${SQUAD_GROUPS[player.squadGroup]} group.`);
  render();
}

function currentLeague() {
  return LEAGUE_CATALOG.find((league) => league.id === state.selectedLeagueId) ?? LEAGUE_CATALOG[0];
}

function pendingLeague() {
  return LEAGUE_CATALOG.find((league) => league.id === state.pendingLeagueId) ?? LEAGUE_CATALOG[0];
}

function teamInitials(name) {
  return name
    .split(/\s+/)
    .filter((word) => !["&", "and", "hove"].includes(word.toLowerCase()))
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function hashString(value) {
  return [...value].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);
}

function generatedCrestUrl(name, leagueId = "world") {
  const palette = [
    ["#d6f06e", "#0f5132", "#07100d"],
    ["#65d4a4", "#173f8f", "#ffffff"],
    ["#f8c866", "#8f1d1d", "#07100d"],
    ["#ffffff", "#1d4f9a", "#d52828"],
    ["#90cdf4", "#102a43", "#ffffff"],
    ["#f6ad55", "#2d3748", "#ffffff"],
    ["#c6f6d5", "#22543d", "#07100d"],
    ["#fed7e2", "#702459", "#07100d"],
  ];
  const hash = hashString(`${leagueId}-${name}`);
  const [primary, secondary, text] = palette[hash % palette.length];
  const initials = teamInitials(name);
  const stripe = hash % 2 === 0 ? primary : secondary;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="${primary}"/>
        <stop offset="1" stop-color="${secondary}"/>
      </linearGradient>
    </defs>
    <path d="M48 5 84 18v28c0 22-14 37-36 45C26 83 12 68 12 46V18L48 5Z" fill="url(#g)" stroke="#f7fafc" stroke-width="5"/>
    <path d="M19 31h58v11H19z" fill="${stripe}" opacity=".82"/>
    <circle cx="48" cy="50" r="24" fill="#ffffff" opacity=".92"/>
    <text x="48" y="58" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${initials.length > 2 ? 19 : 25}" font-weight="900" fill="${text}">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function teamCrest(team, size = "md") {
  if (!team.logo) {
    return `<span class="crest crest-${size}" aria-hidden="true"><b>${teamInitials(team.name)}</b></span>`;
  }
  return `<span class="crest crest-${size}" aria-hidden="true">
    <img src="${team.logo}" alt="" loading="lazy" onerror="this.hidden=true; this.nextElementSibling.hidden=false;" />
    <b hidden>${teamInitials(team.name)}</b>
  </span>`;
}

function average(values) {
  if (!values.length) return 10;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function weightedRating(player, keys) {
  return average(keys.map((key) => player.attributes[key] ?? 10));
}

const MATCH_LOGIC_TICK_RATE = 60;
const MATCH_TICKS_PER_MINUTE = MATCH_LOGIC_TICK_RATE * 60;
const MATCH_TICK_SECONDS = 1 / MATCH_LOGIC_TICK_RATE;
const CONTROL_RADIUS = 4.8;
const VISION_RANGE = 34;
const VISUALIZER_RENDER_FPS = 60;
const VISUALIZER_BUFFER_FRAMES = 3;
const REWIND_BUFFER_SECONDS = 10;
const REWIND_BUFFER_TICKS = MATCH_LOGIC_TICK_RATE * REWIND_BUFFER_SECONDS;
const REWIND_SAMPLE_INTERVAL = 6;
const REWIND_BUFFER_LIMIT = Math.ceil(REWIND_BUFFER_TICKS / REWIND_SAMPLE_INTERVAL);

let activeMatchVisualizer = null;
let activeThreeMatchViewer = null;

function attribute255(value) {
  return clamp(Math.round(((value ?? 10) / 20) * 255), 1, 255);
}

function rating255To20(value) {
  return clamp(value / 12.75, 1, 20);
}

function createPlayerMindState(morale = 12, satisfaction = 12, respect = 82) {
  return {
    overallMorale: clamp(Math.round(morale * 5), 0, 100),
    clubSatisfaction: clamp(Math.round(satisfaction * 5), 0, 100),
    managerRespect: clamp(Math.round(respect), 0, 100),
    currentMoodString: "Settled in the squad",
    moodNotes: ["Content with current squad situation"],
  };
}

function playerMindState(player) {
  if (!player) return createPlayerMindState();
  if (!player.mindState) {
    player.mindState = createPlayerMindState(player.contract?.morale ?? 12, player.contract?.happiness ?? 12, player.managerRespect ?? 82);
  }
  return player.mindState;
}

function syncContractMoodFromMind(player) {
  if (!player?.contract) return;
  const mind = playerMindState(player);
  player.contract.morale = clamp(Math.round(mind.overallMorale / 5), 1, 20);
  player.contract.happiness = clamp(Math.round(mind.clubSatisfaction / 5), 1, 20);
}

function adjustPlayerMind(player, deltas = {}, reason = "") {
  const mind = playerMindState(player);
  mind.overallMorale = clamp(Math.round(mind.overallMorale + (deltas.overallMorale ?? 0)), 0, 100);
  mind.clubSatisfaction = clamp(Math.round(mind.clubSatisfaction + (deltas.clubSatisfaction ?? 0)), 0, 100);
  mind.managerRespect = clamp(Math.round(mind.managerRespect + (deltas.managerRespect ?? 0)), 0, 100);
  if (reason) {
    mind.currentMoodString = reason;
    mind.moodNotes = [reason, ...(mind.moodNotes ?? []).filter((note) => note !== reason)].slice(0, 4);
  }
  syncContractMoodFromMind(player);
  return mind;
}

function mindStateBand(player) {
  const morale = playerMindState(player).overallMorale;
  if (morale >= 90) return { key: "superb", label: "Superb", className: "superb", impact: "Composure and Decisions +10%" };
  if (morale >= 70) return { key: "veryGood", label: "Very Good", className: "very-good", impact: "Attributes play at full level" };
  if (morale >= 40) return { key: "okay", label: "Okay", className: "okay", impact: "Normal output, slightly higher stamina drain" };
  if (morale >= 20) return { key: "poor", label: "Poor", className: "poor", impact: "Anticipation -15%" };
  return { key: "abysmal", label: "Abysmal", className: "abysmal", impact: "Mental and physical output -25%" };
}

function mindAttributeModifier(player, keys) {
  const band = mindStateBand(player);
  const touchesMentalKey = keys.some((key) => ATTRIBUTES.mental.includes(key));
  const touchesPhysicalKey = keys.some((key) => ATTRIBUTES.physical.includes(key));
  if (band.key === "superb" && keys.some((key) => ["composure", "decisions"].includes(key))) return 1.1;
  if (band.key === "poor" && keys.includes("anticipation")) return 0.85;
  if (band.key === "abysmal" && (touchesMentalKey || touchesPhysicalKey)) return 0.75;
  return 1;
}

function updatePlayerMoodAfterMatch(player, match, matchRating = null, started = false) {
  if (!player) return;
  const isHome = player.teamId === match.homeId;
  const teamWon = isHome ? match.score.home > match.score.away : match.score.away > match.score.home;
  const teamLost = isHome ? match.score.home < match.score.away : match.score.away < match.score.home;
  const hidden = player.hidden ?? {};
  const professionalDrop = Math.max(0, (20 - (hidden.professionalism ?? 10)) * 0.5);
  const ambitionMultiplier = (hidden.ambition ?? 10) / 10;
  const loyaltyShield = (hidden.loyalty ?? 10) / 20;
  const role = player.contract?.squadStatus ?? squadStatusForPlayer(player);
  const deltas = {
    overallMorale: teamWon ? 3 : teamLost ? -4 : 1,
    clubSatisfaction: teamLost ? -1 : teamWon ? 1 : 0,
    managerRespect: teamLost ? -1 : 0,
  };
  let reason = teamWon ? "Lifted by the latest team result" : teamLost ? "Concerned by the latest team result" : "Steady after the latest draw";

  if (started && Number.isFinite(matchRating)) {
    if (matchRating >= 8) {
      deltas.overallMorale += 10;
      deltas.managerRespect += 2;
      reason = "Confident after an excellent individual display";
    } else if (matchRating < 6) {
      deltas.overallMorale -= Math.round(10 + professionalDrop);
      deltas.managerRespect -= hidden.professionalism < 8 ? 2 : 0;
      reason = "Lacking confidence after a poor individual display";
    }
  }

  if (!started && role === "Star Player" && (player.benchStreak ?? 0) >= 3) {
    deltas.clubSatisfaction -= Math.round(15 * ambitionMultiplier * (1 - loyaltyShield * 0.35));
    deltas.managerRespect -= Math.round(10 * ambitionMultiplier * (1 - loyaltyShield * 0.25));
    reason = "Unhappy at being left on the bench for several matches";
  }

  adjustPlayerMind(player, deltas, reason);
}

function processWeeklyPlayerMindStates() {
  state.players.forEach((player) => {
    const issue = activeAvailabilityIssue(player);
    const mind = playerMindState(player);
    const role = player.contract?.squadStatus ?? squadStatusForPlayer(player);
    const hidden = player.hidden ?? {};
    if (issue?.type === "skippedTraining") {
      adjustPlayerMind(player, { overallMorale: -3, managerRespect: -4 }, "Relationship strained by missed training");
      return;
    }
    if (player.dynamics?.transferRequest) {
      adjustPlayerMind(player, { overallMorale: -2, clubSatisfaction: -4, managerRespect: -3 }, "Wants a move and is unsettled");
      return;
    }
    if ((player.benchStreak ?? 0) >= 2 && ["Star Player", "Regular Starter"].includes(role)) {
      const ambition = (hidden.ambition ?? 10) / 10;
      adjustPlayerMind(player, { overallMorale: -2 * ambition, clubSatisfaction: -3 * ambition, managerRespect: -2 }, "Frustrated by reduced playing time");
      return;
    }
    if (mind.overallMorale < 72 && (hidden.professionalism ?? 10) >= 15) {
      adjustPlayerMind(player, { overallMorale: 1, managerRespect: 1 }, "Responding professionally in training");
    }
  });
}

function effectivePlayerRating255(player, keys, context = {}) {
  if (!player) return attribute255(10);
  const matchProfile = context.matchProfile ?? player.matchProfile ?? null;
  const consistencyPenalty = matchProfile?.consistencyPenalty ?? 0;
  const chokePenalty = (matchProfile?.choke || context.choke) && keys.some((key) => ["decisions", "composure", "anticipation", "passing", "finishing"].includes(key)) ? rand(1, 3) : 0;
  const homesickPenalty = (player.dynamics?.homesickWeeks ?? 0) > 1 && keys.some((key) => ATTRIBUTES.mental.includes(key)) ? 1 : 0;
  const contextPenalty = keys.some((key) => ATTRIBUTES.mental.includes(key) || ATTRIBUTES.technical.includes(key)) ? matchProfile?.contextPenalty ?? 0 : 0;
  const visible255 = average(keys.map((key) => {
    const isPhysical = ATTRIBUTES.physical.includes(key);
    const penalty = isPhysical ? 0 : consistencyPenalty + chokePenalty + homesickPenalty + contextPenalty;
    return attribute255(clamp((player.attributes[key] ?? 10) - penalty, 1, 20));
  }));
  const ca255 = clamp(Math.round((player.hidden.currentAbility / 200) * 255), 1, 255);
  const consistency = (player.hidden.consistency ?? 12) / 20;
  const important = context.important ? (player.hidden.importantMatches ?? 12) / 20 : 0.6;
  const morale = clamp((player.contract.morale ?? 10) / 12, 0.72, 1.28);
  const confidence = clamp((player.form ?? 10) / 12, 0.7, 1.28);
  const fitness = clamp((player.condition ?? 90) / 100, 0.52, 1.08);
  const fatigue = clamp(1 - ((player.fatigue ?? 0) / 150), 0.45, 1);
  const matchDayVariance = 0.88 + consistency * 0.16 + (Math.random() - 0.5) * (0.18 - consistency * 0.08);
  const bigMatchLift = context.important ? 0.88 + important * 0.24 : 1;
  const talkModifier = clamp(player.teamTalkModifier ?? 1, 0.88, 1.12);
  const mindModifier = mindAttributeModifier(player, keys);
  return clamp(
    (visible255 * 0.68 + ca255 * 0.32) * morale * confidence * fitness * fatigue * matchDayVariance * bigMatchLift * talkModifier * mindModifier,
    1,
    255
  );
}

function defaultPlayerTraits(role) {
  const traits = {
    GK: ["claimsCrosses"],
    CB: ["staysBack", "marksTightly"],
    FB: ["getsForward", "crossesEarly"],
    DM: ["holdsPosition", "playsShortPasses"],
    CM: ["dictatesTempo", "playsShortPasses"],
    AM: ["triesKillerBalls", "roamsFromPosition"],
    W: ["runsWithBall", "cutsInside"],
    ST: ["getsIntoBox", "shootsOften"],
  };
  return [...(traits[role] ?? ["playsShortPasses"])];
}

function defaultRoleDuty(role) {
  const duties = {
    GK: "Goalkeeper Defend",
    CB: "Central Defender Defend",
    FB: chance(0.34) ? "Inverted Wing-Back Support" : "Full-Back Support",
    DM: "Defensive Midfielder Support",
    CM: "Central Midfielder Support",
    AM: "Advanced Playmaker Attack",
    W: "Inside Forward Attack",
    ST: chance(0.28) ? "Target Forward Support" : "Advanced Forward Attack",
  };
  return duties[role] ?? `${role} Support`;
}

function defaultPlayerInstructions(player) {
  const risk = player.role === "ST" || player.role === "AM" ? "higher" : player.role === "CB" || player.role === "GK" ? "lower" : "normal";
  const passing = player.traits?.includes("triesKillerBalls") ? "direct" : player.traits?.includes("playsShortPasses") ? "short" : "mixed";
  const shooting = player.role === "ST" || player.traits?.includes("shootsOften") ? "more" : "normal";
  return { passing, risk, movement: player.roleDuty?.includes("Inverted") ? "invert" : "team", shooting };
}

const POSITIONAL_CA_WEIGHTS = {
  GK: { agility: 7, positioning: 7, decisions: 6, composure: 5, firstTouch: 3, passing: 2, pace: 1 },
  CB: { tackling: 8, positioning: 8, heading: 7, jumping: 6, strength: 6, anticipation: 6, concentration: 6, marking: 7, finishing: 0.4, longShots: 0.4 },
  FB: { pace: 6, stamina: 6, tackling: 6, crossing: 5, positioning: 5, workRate: 5, acceleration: 5, finishing: 0.6 },
  DM: { tackling: 7, positioning: 7, decisions: 6, passing: 5, workRate: 6, anticipation: 6, strength: 4, finishing: 0.5 },
  CM: { passing: 7, decisions: 7, vision: 6, teamwork: 5, stamina: 5, firstTouch: 5, positioning: 4, tackling: 3 },
  AM: { vision: 7, passing: 6, flair: 6, dribbling: 6, firstTouch: 6, decisions: 5, finishing: 4, tackling: 0.5 },
  W: { pace: 7, acceleration: 7, dribbling: 7, crossing: 6, flair: 5, technique: 5, finishing: 3, tackling: 0.5 },
  ST: { finishing: 8, composure: 7, anticipation: 7, pace: 6, acceleration: 6, heading: 5, technique: 4, tackling: 0.3 },
};

function negativePotentialRange(value) {
  const ranges = {
    "-10": [170, 200],
    "-9.5": [160, 190],
    "-9": [150, 180],
    "-8.5": [140, 170],
  };
  return ranges[String(value)] ?? null;
}

function resolvePotentialAbility(seedPotential, currentAbility, age, youthUpside) {
  const negativeRange = negativePotentialRange(seedPotential);
  if (negativeRange) return clamp(rand(negativeRange[0], negativeRange[1]), currentAbility, 200);
  return clamp(seedPotential ?? currentAbility + youthUpside - Math.max(0, age - 27) * 4, currentAbility, 200);
}

function footProfile(seed = {}) {
  const strongFoot = seed.strongFoot ?? (chance(0.76) ? "right" : "left");
  const weakFoot = seed.weakFoot ?? rand(5, 16);
  const strongFootRating = seed.strongFootRating ?? rand(17, 20);
  return {
    strongFoot,
    strongFootRating,
    weakFoot,
    weakFootTax: clamp(Math.round(Math.max(0, weakFoot - 10) * 2.4 + Math.max(0, strongFootRating - 18) * 1.6), 0, 30),
  };
}

function positionalCaCost(role, attributes, feet = { weakFootTax: 0 }) {
  const weights = POSITIONAL_CA_WEIGHTS[role] ?? {};
  const attributeCost = Object.entries(attributes).reduce((sum, [key, value]) => {
    const weight = weights[key] ?? 1.2;
    return sum + Math.max(0, value - 1) * weight;
  }, 0);
  return Math.round(attributeCost / 9 + (feet.weakFootTax ?? 0));
}

function matchAttributeProfile(player, important = false) {
  const survivesConsistency = chance(clamp((player.hidden.consistency ?? 12) / 20, 0.05, 1));
  const consistencyPenalty = survivesConsistency ? 0 : rand(1, 3);
  const bigMatchScore = (player.hidden.importantMatches ?? 12) + (player.attributes.composure ?? 10) + (player.hidden.pressure ?? 10);
  const choke = important && bigMatchScore < 28 && chance(clamp((32 - bigMatchScore) / 28, 0.08, 0.72));
  return {
    consistencyPenalty,
    choke,
    survivesConsistency,
    important,
  };
}

function environmentalMatrix(weatherKey) {
  const pitchKeys = Object.keys(PITCH_CONDITIONS);
  const pitchKey = weatherKey === "rain" ? "wet" : weatherKey === "snow" ? "longGrass" : pitchKeys[rand(0, pitchKeys.length - 1)];
  const pitch = PITCH_CONDITIONS[pitchKey];
  const size = {
    length: rand(100, 110),
    width: rand(64, 74),
  };
  return {
    pitchKey,
    pitch,
    size,
    widthEffect: size.width <= 66 ? "narrow" : size.width >= 72 ? "wide" : "standard",
    ballDrag: pitch.ballDrag * (weatherKey === "wind" ? 0.985 : 1),
    passAccuracy: pitch.passAccuracy * (WEATHER[weatherKey]?.technical ?? 1),
    accelerationDrag: pitch.stamina * (weatherKey === "heat" ? 1.08 : 1),
    spinDecay: weatherKey === "rain" ? 0.9 : weatherKey === "wind" ? 0.82 : 0.94,
  };
}

function buildMatchReadyStats(lineup, tactic, important) {
  const normalized = normalizeTactics(tactic);
  return Object.fromEntries(lineup.map((player) => {
    const keys = Object.values(ATTRIBUTES).flat();
    return [player.id, {
      technical: average(ATTRIBUTES.technical.map((key) => effectivePlayerRating255(player, [key], { important }))),
      mental: average(ATTRIBUTES.mental.map((key) => effectivePlayerRating255(player, [key], { important }))) * familiarityPenalty(normalized, "mentality"),
      physical: average(ATTRIBUTES.physical.map((key) => effectivePlayerRating255(player, [key], { important }))) * clamp((player.condition ?? 90) / 100, 0.55, 1.08) * clamp(playerStaminaScore(player) / 82, 0.55, 1.08),
      allRound: average(keys.map((key) => effectivePlayerRating255(player, [key], { important }))),
    }];
  }));
}

const NATIONALITY_LANGUAGE = {
  England: "English",
  Scotland: "English",
  Wales: "English",
  Ireland: "English",
  Spain: "Spanish",
  Argentina: "Spanish",
  Colombia: "Spanish",
  Brazil: "Portuguese",
  Portugal: "Portuguese",
  France: "French",
  Germany: "German",
  Italy: "Italian",
  Netherlands: "Dutch",
  Belgium: "French",
  Thailand: "Thai",
  Japan: "Japanese",
  "South Korea": "Korean",
  "United States": "English",
};

function randomNationality(seedName = "") {
  const pool = ["England", "Spain", "Brazil", "Argentina", "France", "Germany", "Italy", "Portugal", "Netherlands", "Belgium", "United States", "Thailand", "Japan", "South Korea"];
  const hash = [...seedName].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

const SECONDARY_NATIONALITY_POOLS = {
  England: ["Ireland", "Scotland", "Wales", "United States"],
  Scotland: ["England", "Ireland", "Wales"],
  Wales: ["England", "Ireland", "Scotland"],
  Ireland: ["England", "Scotland", "Wales", "United States"],
  Spain: ["Argentina", "Portugal", "Colombia"],
  Argentina: ["Spain", "Italy", "Colombia"],
  Colombia: ["Spain", "Argentina", "United States"],
  Brazil: ["Portugal", "Spain", "Italy"],
  Portugal: ["Brazil", "Spain", "France"],
  France: ["Belgium", "Portugal", "Italy"],
  Germany: ["Netherlands", "Belgium", "United States"],
  Italy: ["Argentina", "Spain", "France"],
  Netherlands: ["Belgium", "Germany", "England"],
  Belgium: ["France", "Netherlands", "Germany"],
  Thailand: ["England", "Japan", "South Korea"],
  Japan: ["South Korea", "United States", "Thailand"],
  "South Korea": ["United States", "Japan", "Thailand"],
  "United States": ["England", "Ireland", "Colombia"],
};

const DIALOGUE_DATABASE = {
  SQUAD_DROP: {
    trigger: "SQUAD_DROP",
    title: "Playing Time Meeting",
    openingLine: "บอสครับ ผมเป็นตัวหลักของทีม แต่ช่วงหลังผมนั่งสำรองติดกันหลายเกมแล้ว ผมต้องรู้ว่าผมยังอยู่ในแผนของบอสไหม",
    options: [
      {
        id: "promise_start",
        text: "นายยังสำคัญกับทีม นัดต่อไปฉันจะให้โอกาสนายพิสูจน์ตัวเอง",
        tone: "PRAISE",
        influence: { morale: 14, loyalty: 6, revoltChance: -12, promiseStart: true },
        required: { managerReputation: 4200 },
      },
      {
        id: "rotation_reason",
        text: "ฉันต้องหมุนทีมตามความฟิต ถ้านายซ้อมดี โอกาสจะกลับมาเอง",
        tone: "NEGOTIATE",
        influence: { morale: -3, loyalty: 2, revoltChance: -4 },
      },
      {
        id: "team_first",
        text: "ทีมมาก่อนเสมอ ถ้านายรับการแข่งขันในทีมไม่ได้ เราจะคุยเรื่องอนาคตกัน",
        tone: "AGGRESSIVE",
        influence: { morale: -22, loyalty: -20, revoltChance: 24 },
      },
    ],
  },
  WAGE_PROTEST: {
    trigger: "WAGE_PROTEST",
    title: "Wage Concern",
    openingLine: "บอสครับ ฟอร์มผมดีต่อเนื่อง แต่ค่าเหนื่อยผมต่ำกว่าค่าเฉลี่ยทีมมาก ผมอยากให้สโมสรเห็นคุณค่าของผม",
    options: [
      {
        id: "review_contract",
        text: "นายสมควรถูกประเมินใหม่ ฉันจะให้ฝ่ายบริหารเปิดโต๊ะคุยสัญญา",
        tone: "PRAISE",
        influence: { morale: 12, loyalty: 8, revoltChance: -10, contractReview: true },
      },
      {
        id: "wait_until_window",
        text: "ฉันเห็นฟอร์มนาย แต่เราต้องรอจังหวะการเงินที่เหมาะสมก่อน",
        tone: "NEGOTIATE",
        influence: { morale: -6, loyalty: -4, revoltChance: 8 },
      },
      {
        id: "wage_hardline",
        text: "ค่าเหนื่อยไม่ได้ขึ้นจากฟอร์มไม่กี่นัด กลับไปทำผลงานให้ยาวกว่านี้",
        tone: "AGGRESSIVE",
        influence: { morale: -18, loyalty: -16, revoltChance: 20 },
      },
    ],
  },
  TRANSFER_REQUEST_BLOCKED: {
    trigger: "TRANSFER_REQUEST",
    title: "Blocked Transfer Request",
    openingLine: "บอสครับ... ทีมใหญ่ยื่นข้อเสนอเข้ามา แต่สโมสรบล็อกไม่ให้ผมย้าย นี่อาจเป็นโอกาสครั้งใหญ่ในอาชีพผม",
    options: [
      {
        id: "build_around_you",
        text: "เรากำลังสร้างทีมรอบตัวนาย นายคือหัวใจที่เราจะขาดไม่ได้",
        tone: "PRAISE",
        influence: { morale: 15, loyalty: 10, revoltChance: -20 },
        required: { managerReputation: 5000 },
      },
      {
        id: "set_price",
        text: "ข้อเสนอมันต่ำเกินไป ถ้าทีมไหนจ่ายถึงราคาที่เหมาะสม ฉันจะไม่ขวางนาย",
        tone: "NEGOTIATE",
        influence: { morale: -5, loyalty: -5, setAskingPrice: true },
        nextNode: "DISCUSS_PRICE",
      },
      {
        id: "contract_hardline",
        text: "นายยังมีสัญญาอยู่ที่นี่ และต้องเคารพสัญญาจนกว่าสโมสรจะตัดสินใจ",
        tone: "AGGRESSIVE",
        influence: { morale: -30, loyalty: -50, revoltChance: 40 },
      },
    ],
  },
  POOR_FORM_WARNING: {
    trigger: "POOR_FORM",
    title: "Private Form Warning",
    openingLine: "บอสเรียกผมมาคุยเรื่องฟอร์มใช่ไหมครับ ผมรู้ว่าช่วงนี้เล่นไม่ดี แต่ผมอยากได้ความชัดเจนว่าจะต้องแก้ตรงไหน",
    options: [
      {
        id: "support_plan",
        text: "เราจะช่วยนายด้วยโปรแกรมซ้อมเฉพาะทาง ฉันยังเชื่อในคุณภาพของนาย",
        tone: "PRAISE",
        influence: { morale: 10, loyalty: 4, revoltChance: -8, trainingBoost: true },
      },
      {
        id: "warn_private",
        text: "มาตรฐานต้องสูงกว่านี้ นัดต่อไปฉันอยากเห็นความรับผิดชอบมากขึ้น",
        tone: "NEGOTIATE",
        influence: { morale: -4, loyalty: 0, revoltChance: 2, focusBoost: true },
      },
      {
        id: "bench_threat",
        text: "ถ้าฟอร์มยังไม่ดีขึ้น นายจะเสียตำแหน่งตัวจริงทันที",
        tone: "AGGRESSIVE",
        influence: { morale: -16, loyalty: -12, revoltChance: 16 },
      },
    ],
  },
  DISCUSS_PRICE: {
    trigger: "TRANSFER_REQUEST",
    title: "Asking Price Agreement",
    openingLine: "ถ้าบอสตั้งราคาชัดเจน ผมรับได้ครับ แต่ผมต้องการให้สโมสรจริงใจกับคำพูดนี้",
    options: [
      {
        id: "fair_release",
        text: "เราจะตั้งราคาตามมูลค่าจริงของนาย และฉันจะรักษาคำพูดถ้าข้อเสนอถึงตัวเลขนั้น",
        tone: "NEGOTIATE",
        influence: { morale: 6, loyalty: 6, revoltChance: -14, setAskingPrice: true },
      },
      {
        id: "premium_release",
        text: "นายคือคนสำคัญ ราคาต้องสูงกว่าตลาด แต่เราจะไม่ปิดประตู",
        tone: "NEGOTIATE",
        influence: { morale: -2, loyalty: 0, revoltChance: 4, setAskingPrice: true, premiumPrice: true },
      },
    ],
  },
};

function secondaryNationalityFor(primaryNationality, seedName = "") {
  const pool = SECONDARY_NATIONALITY_POOLS[primaryNationality] ?? Object.keys(NATIONALITY_LANGUAGE).filter((nation) => nation !== primaryNationality);
  const hash = [...`${seedName}-${primaryNationality}`].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

function nationalitySummary(person) {
  return `${person.primaryNationality ?? person.nationality} / ${person.secondaryNationality ?? secondaryNationalityFor(person.nationality, person.name)}`;
}

function hierarchyBand(player) {
  const influence = player.influence ?? 30;
  if (influence >= 82) return "Team Leader";
  if (influence >= 66) return "Highly Influential";
  if (influence >= 48) return "Influential";
  return "Other Player";
}

function squadStatusForPlayer(player, teamId = player.teamId) {
  if (player.contract?.squadStatus) return player.contract.squadStatus;
  const teamPlayers = playersForTeam(teamId).sort((a, b) => b.hidden.currentAbility - a.hidden.currentAbility);
  const rank = teamPlayers.findIndex((candidate) => candidate.id === player.id) + 1;
  if (rank > 0 && rank <= 3) return "Star Player";
  if (rank > 0 && rank <= 11) return "Regular Starter";
  if (rank > 0 && rank <= 18) return "Squad Player";
  return "Emergency Backup";
}

function inferredSquadStatusForPlayer(player, teamId = player.teamId) {
  const saved = player.contract?.squadStatus;
  if (saved) player.contract.squadStatus = null;
  const status = squadStatusForPlayer(player, teamId);
  if (saved) player.contract.squadStatus = saved;
  return status;
}

function expectedAppearancesForStatus(status, week = state.week) {
  const played = Math.max(1, week - 1);
  const ratios = {
    "Star Player": 0.82,
    "Regular Starter": 0.62,
    "Squad Player": 0.28,
    "Emergency Backup": 0.08,
  };
  return played * (ratios[status] ?? 0.2);
}

function socialConnectionScore(player, mate) {
  if (player.id === mate.id) return 0;
  let score = 0;
  if (player.nationality === mate.nationality) score += 34;
  if (player.secondaryNationality === mate.nationality || mate.secondaryNationality === player.nationality) score += 16;
  if (player.secondaryNationality === mate.secondaryNationality) score += 8;
  if (player.language === mate.language) score += 24;
  if (Math.abs(player.age - mate.age) <= 3) score += 12;
  if (Math.abs((player.joinedSeason ?? state.season) - (mate.joinedSeason ?? state.season)) <= 1) score += 10;
  if (player.socialGroup === mate.socialGroup) score += 20;
  return score;
}

function socialGraphForTeam(teamId) {
  const squad = playersForTeam(teamId);
  const nodes = squad.map((player) => ({
    player,
    band: hierarchyBand(player),
    links: squad
      .filter((mate) => mate.id !== player.id)
      .map((mate) => ({ mate, score: socialConnectionScore(player, mate) }))
      .filter((link) => link.score >= 28)
      .sort((a, b) => b.score - a.score),
  }));
  return {
    nodes,
    leaders: nodes.filter((node) => node.band === "Team Leader"),
    isolated: nodes.filter((node) => node.links.length === 0),
    coreGroups: Object.entries(Object.groupBy?.(squad, (player) => player.socialGroup) ?? squad.reduce((groups, player) => {
      groups[player.socialGroup] = groups[player.socialGroup] ?? [];
      groups[player.socialGroup].push(player);
      return groups;
    }, {})).map(([group, players]) => ({ group, players })),
  };
}

function recalculateInfluence(player) {
  const tenure = Math.max(0, state.season - (player.joinedSeason ?? state.season));
  const wagePower = clamp((player.contract.wage ?? 0) / 8500, 0, 20);
  player.influence = clamp(Math.round(player.age * 0.9 + tenure * 5 + wagePower + (player.attributes.leadership ?? 10) * 2.2 + player.hidden.currentAbility / 5), 1, 100);
}

function socialPulse(teamId, sourcePlayer, delta, reason, maxDepth = 2) {
  if (!sourcePlayer) return;
  const graph = socialGraphForTeam(teamId);
  const queue = [{ player: sourcePlayer, depth: 0, strength: Math.abs(delta) }];
  const visited = new Set([sourcePlayer.id]);
  while (queue.length) {
    const item = queue.shift();
    const node = graph.nodes.find((entry) => entry.player.id === item.player.id);
    if (!node || item.depth >= maxDepth) continue;
    node.links.slice(0, 8).forEach(({ mate, score }) => {
      if (visited.has(mate.id)) return;
      visited.add(mate.id);
      const bandMultiplier = hierarchyBand(sourcePlayer) === "Team Leader" ? 1.25 : hierarchyBand(sourcePlayer) === "Highly Influential" ? 1 : 0.7;
      const impact = Math.sign(delta) * Math.max(1, Math.round(item.strength * (score / 100) * bandMultiplier));
      mate.contract.morale = clamp(mate.contract.morale + impact, 1, 20);
      mate.contract.happiness = clamp(mate.contract.happiness + impact, 1, 20);
      queue.push({ player: mate, depth: item.depth + 1, strength: Math.max(1, item.strength - 1) });
    });
  }
  addFeed(`${reason}: ${hierarchyBand(sourcePlayer)} ${sourcePlayer.name} sent a ${delta < 0 ? "negative" : "positive"} pulse through the dressing room.`);
}

function triggerSquadRevolt(teamId, sourcePlayer, reason) {
  if (!sourcePlayer || hierarchyBand(sourcePlayer) !== "Team Leader" || sourcePlayer.dynamics?.revoltTriggered) return false;
  sourcePlayer.dynamics.revoltTriggered = true;
  const graph = socialGraphForTeam(teamId);
  const allies = graph.nodes
    .find((node) => node.player.id === sourcePlayer.id)
    ?.links.filter((link) => link.score >= 42)
    .slice(0, 12) ?? [];
  allies.forEach(({ mate }) => {
    mate.contract.morale = clamp(mate.contract.morale - 3, 1, 20);
    mate.contract.happiness = clamp(mate.contract.happiness - 2, 1, 20);
  });
  const team = teamById(teamId);
  team.morale = clamp(team.morale - Math.max(2, Math.round(allies.length / 3)), 1, 20);
  if (teamId === state.userTeamId) {
    addFeed(`Dressing-room revolt: ${sourcePlayer.name} challenged the manager over ${reason}. ${allies.length} teammate(s) were affected.`);
  }
  return true;
}

function dialoguePersonality(player) {
  return {
    professionalism: player.hidden?.professionalism ?? 10,
    ambition: player.hidden?.ambition ?? 10,
    loyalty: player.hidden?.loyalty ?? player.dynamics?.loyalty ?? 10,
    controversy: player.hidden?.controversy ?? 10,
  };
}

function dialogueToneLabel(tone) {
  return {
    PRAISE: "Praise",
    NEGOTIATE: "Negotiate",
    AGGRESSIVE: "Aggressive",
  }[tone] ?? label(tone);
}

function activeDialogueNode() {
  const dialogue = state.activeDialogue;
  return dialogue ? DIALOGUE_DATABASE[dialogue.nodeId] : null;
}

function dialogueEventKey(playerId, dialogueId, week = state.week) {
  return `${week}:${playerId}:${dialogueId}`;
}

function hasDialogueEvent(playerId, dialogueId, week = state.week) {
  const key = dialogueEventKey(playerId, dialogueId, week);
  return state.dialogueQueue.some((event) => event.key === key) || state.dialogueHistory.some((event) => event.key === key);
}

function queuePlayerDialogue(player, dialogueId, trigger, context = {}) {
  if (!player || !DIALOGUE_DATABASE[dialogueId] || hasDialogueEvent(player.id, dialogueId)) return false;
  const event = {
    key: dialogueEventKey(player.id, dialogueId),
    id: `dlg-${state.week}-${player.id}-${dialogueId}`,
    playerId: player.id,
    dialogueId,
    trigger,
    context,
    week: state.week,
  };
  state.dialogueQueue.unshift(event);
  addFeed(`Player interaction waiting: ${player.name} wants to discuss ${trigger.replaceAll("_", " ").toLowerCase()}.`);
  return true;
}

function openPlayerDialogue(playerId, dialogueId = null, trigger = "MANUAL") {
  const player = state.players.find((candidate) => candidate.id === Number(playerId));
  if (!player) return;
  const queued = state.dialogueQueue.find((event) => event.playerId === player.id && (!dialogueId || event.dialogueId === dialogueId));
  const nodeId = queued?.dialogueId ?? dialogueId ?? (player.dynamics?.transferRequest ? "TRANSFER_REQUEST_BLOCKED" : player.form <= 7 ? "POOR_FORM_WARNING" : "SQUAD_DROP");
  if (!DIALOGUE_DATABASE[nodeId]) return;
  state.dialogueQueue = state.dialogueQueue.filter((event) => event.id !== queued?.id);
  state.activeDialogue = {
    playerId: player.id,
    nodeId,
    trigger: queued?.trigger ?? trigger,
    context: queued?.context ?? {},
    key: queued?.key ?? dialogueEventKey(player.id, nodeId),
    startedWeek: state.week,
  };
  render();
}

function closeDialogue() {
  state.activeDialogue = null;
  render();
}

function moraleDeltaFromPercent(value) {
  return Math.round((value ?? 0) / 7.5);
}

function adjustedDialogueOutcome(player, option, dialogue) {
  const personality = dialoguePersonality(player);
  const influence = option.influence ?? {};
  const outcome = {
    morale: influence.morale ?? 0,
    loyalty: influence.loyalty ?? 0,
    revoltChance: influence.revoltChance ?? 0,
    notes: [],
  };
  const managerRep = clubReputationScore(teamById(state.userTeamId));
  if (option.required?.managerReputation && managerRep < option.required.managerReputation) {
    outcome.morale *= 0.55;
    outcome.loyalty *= 0.55;
    outcome.revoltChance += 8;
    outcome.notes.push("manager reputation made the promise less convincing");
  }
  if (option.tone === "AGGRESSIVE" && personality.professionalism < 10) {
    outcome.morale *= 1.7;
    outcome.loyalty *= 1.45;
    outcome.revoltChance *= 1.4;
    outcome.notes.push("low professionalism amplified the backlash");
  }
  if (option.tone === "PRAISE" && personality.ambition > 15 && dialogue.trigger === "TRANSFER_REQUEST") {
    outcome.morale *= 0.5;
    outcome.loyalty *= 0.7;
    outcome.revoltChance += 10;
    outcome.notes.push("high ambition made reassurance harder");
  }
  if (option.tone !== "AGGRESSIVE" && personality.loyalty >= 15) {
    outcome.morale += 4;
    outcome.loyalty += 5;
    outcome.revoltChance -= 8;
    outcome.notes.push("loyalty softened the conversation");
  }
  if (dialogue.trigger === "TRANSFER_REQUEST" && personality.ambition >= 16 && !influence.setAskingPrice) {
    outcome.morale -= 8;
    outcome.loyalty -= 8;
    outcome.revoltChance += 14;
  }
  outcome.revoltChance += Math.max(0, personality.controversy - 10) * 2;
  return outcome;
}

function selectDialogueOption(optionId) {
  const dialogue = state.activeDialogue;
  const node = activeDialogueNode();
  if (!dialogue || !node) return;
  const option = node.options.find((candidate) => candidate.id === optionId);
  const player = state.players.find((candidate) => candidate.id === dialogue.playerId);
  if (!option || !player) return;
  const outcome = adjustedDialogueOutcome(player, option, node);
  const influence = option.influence ?? {};
  const moraleChange = moraleDeltaFromPercent(outcome.morale);
  const loyaltyChange = moraleDeltaFromPercent(outcome.loyalty);
  player.contract.morale = clamp(player.contract.morale + moraleChange, 1, 20);
  player.contract.happiness = clamp(player.contract.happiness + Math.round(moraleChange * 0.75), 1, 20);
  adjustPlayerMind(player, {
    overallMorale: moraleChange * 5,
    clubSatisfaction: Math.round(moraleChange * 3.5),
    managerRespect: Math.round(outcome.morale * 0.25),
  }, `${dialogueToneLabel(option.tone)} meeting changed the relationship`);
  player.hidden.loyalty = clamp((player.hidden.loyalty ?? player.dynamics?.loyalty ?? 10) + loyaltyChange, 1, 20);
  player.dynamics.loyalty = player.hidden.loyalty;
  if (influence.promiseStart) player.dynamics.promisedStartWeek = state.week + 1;
  if (influence.contractReview) player.dynamics.contractReview = true;
  if (influence.trainingBoost) player.dynamics.trainingBoostWeeks = 2;
  if (influence.focusBoost) player.form = clamp(player.form + 1, 1, 20);
  if (influence.setAskingPrice) {
    const multiplier = influence.premiumPrice ? 1.45 : 1.18;
    player.dynamics.askingPrice = Math.round(player.value * multiplier);
    player.dynamics.transferPromise = true;
  }
  const personality = dialoguePersonality(player);
  const revoltProbability = clamp((outcome.revoltChance + (player.contract.morale <= 5 ? 18 : 0) + (personality.controversy - 8) * 2) / 100, 0, 0.78);
  let revolt = false;
  if (revoltProbability > 0 && chance(revoltProbability)) {
    revolt = triggerSquadRevolt(player.teamId, player, node.title) || false;
    if (!revolt) socialPulse(player.teamId, player, -2, `Dialogue fallout from ${player.name}`, 1);
  } else if (outcome.morale < 0 && player.contract.morale <= 6 && hierarchyBand(player) === "Team Leader") {
    socialPulse(player.teamId, player, -2, `Concern over treatment of ${player.name}`, 1);
  } else if (outcome.morale > 0) {
    socialPulse(player.teamId, player, 1, `Positive player meeting with ${player.name}`, 1);
  }
  state.dialogueHistory.unshift({
    key: dialogue.key,
    week: state.week,
    playerId: player.id,
    playerName: player.name,
    dialogueId: dialogue.nodeId,
    optionId,
    tone: option.tone,
    moraleChange,
    loyaltyChange,
    revolt,
    notes: outcome.notes,
  });
  state.dialogueHistory = state.dialogueHistory.slice(0, 40);
  addFeed(`${node.title}: ${player.name} responded to a ${dialogueToneLabel(option.tone)} talk. Morale ${moraleChange >= 0 ? "+" : ""}${moraleChange}, loyalty ${loyaltyChange >= 0 ? "+" : ""}${loyaltyChange}.`);
  if (option.nextNode) {
    state.activeDialogue = { ...dialogue, nodeId: option.nextNode };
  } else {
    state.activeDialogue = null;
  }
  render();
}

function processDialogueTriggers() {
  const squad = playersForTeam(state.userTeamId);
  const starters = new Set(firstEleven(state.userTeamId).map((player) => player.id));
  const averageWage = average(squad.map((player) => player.contract.wage));
  squad.forEach((player) => {
    player.dynamics = player.dynamics ?? {};
    const status = squadStatusForPlayer(player);
    if (["Star Player", "Regular Starter"].includes(status)) {
      player.dynamics.dropStreak = starters.has(player.id) ? 0 : (player.dynamics.dropStreak ?? 0) + 1;
      if (player.dynamics.dropStreak >= 3) queuePlayerDialogue(player, "SQUAD_DROP", "SQUAD_DROP", { dropStreak: player.dynamics.dropStreak });
    }
    if (player.form >= 16 && player.contract.wage < averageWage * 0.72) {
      queuePlayerDialogue(player, "WAGE_PROTEST", "WAGE_PROTEST", { averageWage });
    }
    if (player.form <= 6 && ["Star Player", "Regular Starter", "Squad Player"].includes(status)) {
      player.dynamics.poorFormStreak = (player.dynamics.poorFormStreak ?? 0) + 1;
      if (player.dynamics.poorFormStreak >= 3) queuePlayerDialogue(player, "POOR_FORM_WARNING", "POOR_FORM", { poorFormStreak: player.dynamics.poorFormStreak });
    } else {
      player.dynamics.poorFormStreak = 0;
    }
    if (player.dynamics.transferRequest && !player.dynamics.transferPromise) {
      queuePlayerDialogue(player, "TRANSFER_REQUEST_BLOCKED", "TRANSFER_REQUEST", {});
    }
  });
}

function assignSocialIdentity(player, seed = {}) {
  player.primaryNationality = seed.primaryNationality ?? seed.nationality ?? player.primaryNationality ?? player.nationality ?? randomNationality(player.name);
  player.secondaryNationality = seed.secondaryNationality ?? player.secondaryNationality ?? secondaryNationalityFor(player.primaryNationality, player.name);
  player.nationality = player.primaryNationality;
  player.language = seed.language ?? player.language ?? NATIONALITY_LANGUAGE[player.primaryNationality] ?? "English";
  player.joinedSeason = seed.joinedSeason ?? player.joinedSeason ?? state.season;
  player.hidden.adaptability = seed.adaptability ?? player.hidden.adaptability ?? rand(5, 18);
  player.contract.squadStatus = seed.squadStatus ?? player.contract.squadStatus ?? inferredSquadStatusForPlayer(player, player.teamId);
  player.dynamics = player.dynamics ?? { homesickWeeks: 0, transferRequest: false, mediaComplaint: false };
}

function createAIManagerProfile(teamName, reputation) {
  const formations = ["4-3-3", "4-2-3-1", "4-4-2", "3-5-2"];
  const index = Math.abs([...teamName].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % formations.length;
  const name = `${teamName.split(" ")[0]} Head Coach`;
  const nationality = randomNationality(name);
  return {
    name,
    status: "employed",
    currentTeamId: null,
    nationality,
    primaryNationality: nationality,
    secondaryNationality: secondaryNationalityFor(nationality, name),
    reputationScore: clamp(reputation * 95 + rand(-280, 420), 1000, 9600),
    tacticalDirection: ["defensive", "balanced", "attacking", "pressing"][index],
    preferredFormation: formations[index],
    youthImportance: clamp(rand(6, 18) + (reputation < 75 ? 2 : 0), 1, 20),
    buyYouth: clamp(rand(5, 18) + (reputation < 75 ? 2 : 0), 1, 20),
    signFirstTeam: clamp(rand(6, 18) + (reputation >= 80 ? 2 : 0), 1, 20),
    financialConservatism: clamp(rand(4, 18) + (reputation < 76 ? 2 : 0), 1, 20),
    transferStyle: ["value", "youth", "stars", "depth"][index],
    riskTolerance: clamp(rand(7, 16) + (reputation > 82 ? 2 : 0), 1, 20),
    jobSecurity: rand(48, 82),
  };
}

function createAttributes(role, quality) {
  const base = {};
  Object.values(ATTRIBUTES).flat().forEach((key) => {
    base[key] = clamp(Math.round(quality + rand(-4, 4)), 1, 20);
  });

  const roleBoosts = {
    GK: ["positioning", "decisions", "agility", "composure", "firstTouch"],
    CB: ["tackling", "heading", "strength", "positioning", "jumping"],
    FB: ["pace", "stamina", "crossing", "tackling", "workRate"],
    DM: ["tackling", "positioning", "passing", "workRate", "decisions"],
    CM: ["passing", "vision", "decisions", "teamwork", "stamina"],
    AM: ["vision", "dribbling", "firstTouch", "passing", "composure"],
    W: ["pace", "acceleration", "dribbling", "crossing", "agility"],
    ST: ["finishing", "composure", "heading", "strength", "acceleration"],
  };

  roleBoosts[role].forEach((key) => {
    base[key] = clamp(base[key] + rand(2, 5), 1, 20);
  });

  return base;
}

function createPlayer(id, name, role, age, quality, teamId, seed = {}) {
  const currentAbility = clamp(seed.currentAbility ?? Math.round(quality * 9.2 + rand(-8, 8)), 1, 200);
  const youthUpside = age <= 21 ? rand(30, 68) : rand(5, 48);
  const potentialAbility = resolvePotentialAbility(seed.potentialAbility ?? (age <= 18 && quality >= 14 && chance(0.18) ? ["-8.5", "-9", "-9.5"][rand(0, 2)] : undefined), currentAbility, age, youthUpside);
  const attributes = createAttributes(role, quality);
  const feet = footProfile(seed);
  const caCost = positionalCaCost(role, attributes, feet);
  const value = Math.round((currentAbility * 115_000 + potentialAbility * 65_000) * (role === "ST" ? 1.1 : 1));
  const traits = seed.traits ?? defaultPlayerTraits(role);
  const roleDuty = seed.roleDuty ?? defaultRoleDuty(role);
  const instructionBase = { role, roleDuty, traits };
  const nationality = seed.nationality ?? randomNationality(name);
  const secondaryNationality = seed.secondaryNationality ?? secondaryNationalityFor(nationality, name);
  const language = seed.language ?? NATIONALITY_LANGUAGE[nationality] ?? "English";
  const joinedSeason = seed.joinedSeason ?? state.season;
  const influence = seed.influence ?? clamp(Math.round(age * 0.9 + (attributes.leadership ?? 10) * 2.2 + currentAbility / 5 + (seed.wage ?? value / 530) / 8500), 1, 100);
  const initialMorale = seed.morale ?? rand(10, 16);
  const initialHappiness = seed.happiness ?? rand(10, 16);

  return {
    id,
    teamId,
    name,
    role,
    age,
    nationality,
    primaryNationality: nationality,
    secondaryNationality,
    language,
    joinedSeason,
    shirtNumber: seed.shirtNumber ?? REAL_SHIRT_NUMBERS[name] ?? null,
    squadGroup: seed.squadGroup ?? (age <= 18 ? "u18" : age <= 21 ? "u21" : "senior"),
    realName: seed.realName ?? true,
    heightCm: seed.heightCm ?? clamp(rand(168, 193) + (role === "GK" || role === "CB" ? rand(4, 10) : role === "ST" ? rand(0, 6) : 0), 160, 205),
    weightKg: seed.weightKg ?? clamp(rand(66, 86) + (attributes.strength > 15 ? rand(3, 8) : 0), 58, 104),
    feet,
    traits,
    roleDuty,
    instructions: seed.instructions ?? defaultPlayerInstructions(instructionBase),
    influence,
    socialGroup: seed.socialGroup ?? (age <= 21 ? "academy core" : currentAbility > 150 ? "leaders" : ["local group", "international group", "first-team core"][rand(0, 2)]),
    attributes,
    hidden: {
      currentAbility,
      potentialAbility,
      consistency: seed.consistency ?? rand(6, 18),
      importantMatches: seed.importantMatches ?? rand(5, 18),
      injuryProneness: seed.injuryProneness ?? rand(2, 18),
      professionalism: seed.professionalism ?? rand(6, 18),
      determination: seed.determination ?? rand(6, 18),
      ambition: seed.ambition ?? rand(6, 18),
      loyalty: seed.loyalty ?? rand(5, 18),
      controversy: seed.controversy ?? rand(2, 16),
      pressure: seed.pressure ?? rand(5, 18),
      dirtiness: seed.dirtiness ?? rand(2, 15),
      versatility: seed.versatility ?? rand(4, 16),
      adaptability: seed.adaptability ?? rand(5, 18),
      caCost,
      weakFootTax: feet.weakFootTax,
    },
    contract: {
      wage: seed.wage ?? Math.round(value / 530),
      expires: seed.expires ?? state.season + rand(1, 4),
      morale: initialMorale,
      happiness: initialHappiness,
      squadStatus: seed.squadStatus ?? null,
      source: seed.contractSource ?? "seed estimate",
    },
    mindState: createPlayerMindState(initialMorale, initialHappiness, seed.managerRespect ?? rand(70, 94)),
    dynamics: {
      homesickWeeks: 0,
      transferRequest: false,
      mediaComplaint: false,
    },
    value,
    condition: rand(84, 100),
    fatigue: rand(0, 14),
    recentLoad: rand(0, 8),
    benchStreak: seed.benchStreak ?? 0,
    matchMinutes: 0,
    seasonStarts: 0,
    availability: null,
    discipline: {
      lateArrivals: 0,
      skippedTraining: 0,
    },
    injuredWeeks: 0,
    form: rand(9, 15),
    stats: {
      appearances: 0,
      goals: 0,
      assists: 0,
      shots: 0,
      keyPasses: 0,
      yellowCards: 0,
      redCards: 0,
    },
  };
}

function createTeam(id, name, reputation, budget, wageBudget, logo) {
  const aiManager = createAIManagerProfile(name, reputation);
  aiManager.currentTeamId = id;
  return {
    id,
    name,
    logo: logo ?? generatedCrestUrl(name, state.selectedLeagueId),
    logoType: logo ? "real" : "generated",
    reputation,
    reputationScore: reputation * 100,
    youthFacilities: clamp(Math.round(reputation / 6) + rand(-2, 2), 5, 20),
    youthRecruitment: clamp(Math.round(reputation / 7) + rand(-2, 3), 4, 20),
    trainingFacilities: clamp(Math.round(reputation / 6) + rand(-2, 2), 5, 20),
    corporateFacilities: clamp(Math.round(reputation / 8) + rand(-2, 3), 3, 20),
    stadiumAttendance: clamp(Math.round(8_000 + reputation * 620 + rand(-5500, 8500)), 5_000, 88_000),
    fanPassion: clamp(rand(8, 18) + (reputation >= 82 ? 2 : 0), 1, 20),
    fanProfile: {
      hardcore: clamp(rand(24, 48) + (reputation >= 82 ? 8 : 0), 12, 62),
      casual: clamp(rand(24, 44), 14, 58),
      family: clamp(rand(12, 34), 8, 45),
    },
    boardTargetRank: reputation >= 88 ? 4 : reputation >= 78 ? 8 : reputation >= 68 ? 12 : 17,
    transferRevenueRetained: clamp(rand(55, 90) + (budget > 80_000_000 ? 8 : 0), 35, 100),
    jobVacant: false,
    winStreak: 0,
    budget,
    wageBudget,
    morale: rand(10, 15),
    aiManager,
    tactics: {
      formation: id === state.userTeamId ? "4-3-3" : aiManager.preferredFormation,
      mentality: id === state.userTeamId ? "balanced" : ["cautious", "balanced", "positive"][rand(0, 2)],
      pressing: rand(8, 15),
      tempo: rand(8, 15),
      width: rand(8, 15),
      line: rand(8, 14),
      passIntoSpace: chance(0.45),
      playOutOfDefence: reputation > 74 || chance(0.38),
      counterPress: reputation > 78 || chance(0.34),
      creativeFreedom: ["disciplined", "flexible", "expressive"][rand(0, 2)],
      familiarity: {
        mentality: rand(55, 86),
        passing: rand(55, 86),
        positioning: rand(55, 86),
        pressing: rand(55, 86),
        roles: rand(55, 86),
      },
    },
  };
}

function realLeagueTeams(league) {
  if (league.id === "eng-premier-league") return PREMIER_LEAGUE_TEAMS;
  if (league.id === "eng-championship") return CHAMPIONSHIP_TEAMS;
  if (league.id === "eng-league-one") return ENGLISH_LEAGUE_ONE_TEAMS;
  if (league.id === "eng-league-two") return ENGLISH_LEAGUE_TWO_TEAMS;
  if (league.id === "esp-la-liga") return LALIGA_TEAMS;
  if (league.id === "esp-hypermotion") return LALIGA_HYPERMOTION_TEAMS;
  if (league.id === "ita-serie-a") return SERIE_A_TEAMS;
  if (league.id === "ita-serie-b") return SERIE_B_TEAMS;
  if (league.id === "ger-bundesliga") return BUNDESLIGA_TEAMS;
  if (league.id === "ger-2-bundesliga") return BUNDESLIGA_2_TEAMS;
  if (league.id === "fra-ligue-1") return LIGUE_1_TEAMS;
  if (league.id === "fra-ligue-2") return LIGUE_2_TEAMS;
  return PREMIER_LEAGUE_TEAMS;
}

function buildRoundRobin(teamIds) {
  const schedule = [];
  const rotation = [...teamIds];
  const rounds = teamIds.length - 1;

  for (let round = 0; round < rounds; round += 1) {
    const fixtures = [];
    for (let index = 0; index < rotation.length / 2; index += 1) {
      const home = rotation[index];
      const away = rotation[rotation.length - 1 - index];
      fixtures.push(round % 2 === 0 ? [home, away] : [away, home]);
    }
    schedule.push(fixtures);
    rotation.splice(1, 0, rotation.pop());
  }

  return schedule;
}

function buildHomeAwaySchedule(teamIds) {
  const firstHalf = buildRoundRobin(teamIds);
  const secondHalf = firstHalf.map((round) => round.map(([homeId, awayId]) => [awayId, homeId]));
  return applyFixtureCalendar([...firstHalf, ...secondHalf]);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function firstSaturdayOnOrAfter(date) {
  const next = new Date(date);
  const diff = (6 - next.getDay() + 7) % 7;
  return addDays(next, diff);
}

function formatFixtureDate(date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fixtureIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function seasonDayIndex(date, season = state.season) {
  return Math.round((new Date(date).getTime() - new Date(season, 7, 1).getTime()) / 86_400_000);
}

function fifaBreakRanges(season = state.season) {
  return [
    [new Date(season, 8, 1), new Date(season, 8, 10), "FIFA international break"],
    [new Date(season, 9, 5), new Date(season, 9, 14), "FIFA international break"],
    [new Date(season, 10, 9), new Date(season, 10, 18), "FIFA international break"],
    [new Date(season + 1, 2, 16), new Date(season + 1, 2, 25), "FIFA international break"],
  ];
}

function calendarBlockReason(date, season = state.season) {
  const time = new Date(date).getTime();
  return fifaBreakRanges(season).find(([start, end]) => time >= start.getTime() && time <= end.getTime())?.[2] ?? null;
}

function nextWeekendLeagueSlot(date, season = state.season) {
  let slot = firstSaturdayOnOrAfter(date);
  while (calendarBlockReason(slot, season)) slot = addDays(slot, 7);
  return slot;
}

function nextMidweekSlot(date, weekday = 3) {
  const slot = addDays(date, 1);
  const diff = (weekday - slot.getDay() + 7) % 7;
  return addDays(slot, diff);
}

function daysBetweenIso(left, right) {
  if (!left || !right) return 999;
  return Math.abs(new Date(right).getTime() - new Date(left).getTime()) / 86_400_000;
}

const COMPETITION_RULE_MATRIX = {
  league: {
    code: "LG",
    label: "League",
    defaultDay: "Sat-Sun",
    format: "Home and away league",
    bench: 9,
    subs: 5,
    windows: 3,
    priority: 3,
    color: "league",
    special: "25-player registration, 8 homegrown players targeted.",
    restAdvice: "Normal league preparation. Rotate if the next slot is under 72 hours.",
  },
  premierLeague: {
    code: "EPL",
    label: "Premier League",
    defaultDay: "Sat-Sun",
    format: "38-match home and away league",
    bench: 9,
    subs: 5,
    windows: 3,
    priority: 3,
    color: "league",
    special: "Homegrown squad target: 8 players in the 25-player list.",
    restAdvice: "Weekend league rhythm. Full XI is safe with 4+ rest days.",
  },
  faCup: {
    code: "FAC",
    label: "FA Cup",
    defaultDay: "Fri-Mon",
    format: "Single-match knockout, extra time then penalties",
    bench: 9,
    subs: 5,
    windows: 3,
    priority: 1,
    color: "fac",
    special: "Youth players can be selected without strict pre-registration.",
    restAdvice: "Cup knockout. Keep a senior spine but carry academy options.",
  },
  carabaoCup: {
    code: "CC",
    label: "Carabao Cup",
    defaultDay: "Tue-Wed",
    format: "Single-match knockout, penalties immediately after a draw",
    bench: 9,
    subs: 5,
    windows: 3,
    priority: 1,
    color: "carabao",
    special: "No extra time. AI big clubs bias toward rotation and youth minutes.",
    restAdvice: "Midweek rotation slot. Protect high-load starters.",
  },
  ucl: {
    code: "UCL",
    label: "UEFA Champions League",
    defaultDay: "Tue-Wed",
    format: "36-team league phase into knockout rounds",
    bench: 12,
    subs: 5,
    windows: 3,
    priority: 2,
    color: "ucl",
    special: "Strict List A/List B registration. No same-country league phase draw.",
    restAdvice: "European pace. Use 12-man bench depth and manage travel fatigue.",
  },
  uel: {
    code: "UEL",
    label: "UEFA Europa League",
    defaultDay: "Thu",
    format: "36-team league phase into knockout rounds",
    bench: 12,
    subs: 5,
    windows: 3,
    priority: 2,
    color: "uel",
    special: "Strict UEFA registration. Thursday travel can compress league prep.",
    restAdvice: "Thursday schedule often leaves short recovery before league matches.",
  },
  blocked: {
    code: "FIFA",
    label: "International Break",
    defaultDay: "-",
    format: "Club schedule blocked",
    bench: 0,
    subs: 0,
    windows: 0,
    priority: 0,
    color: "blocked",
    special: "Club matches cannot be placed in this window.",
    restAdvice: "Non-international players recover; internationals may return tired.",
  },
};

function competitionRuleKey(name = "", type = "league") {
  const normalized = name.toLowerCase();
  if (normalized.includes("premier league")) return "premierLeague";
  if (normalized.includes("fa cup")) return "faCup";
  if (normalized.includes("carabao") || normalized.includes("efl cup") || normalized.includes("league cup")) return "carabaoCup";
  if (normalized.includes("champions league")) return "ucl";
  if (normalized.includes("europa")) return "uel";
  if (type === "blocked") return "blocked";
  return type === "league" ? "league" : "faCup";
}

function competitionRules(name, type = "league") {
  return COMPETITION_RULE_MATRIX[competitionRuleKey(name, type)] ?? COMPETITION_RULE_MATRIX.league;
}

function calculateMatchDayFitnessPreview(player, daysSinceLastMatch) {
  const naturalFitness = player.attributes?.naturalFitness ?? 10;
  const recoveryRate = naturalFitness * 1.5;
  const currentFatigue = player.fatigue ?? 0;
  const currentFitness = player.condition ?? 90;
  if (daysSinceLastMatch < 3) {
    const fatigue = clamp(currentFatigue + 25, 0, 100);
    return {
      fitness: clamp(Math.max(50, currentFitness - fatigue), 1, 100),
      fatigue,
      risk: "high",
    };
  }
  const fatigue = clamp(currentFatigue - recoveryRate * daysSinceLastMatch, 0, 100);
  return {
    fitness: clamp(currentFitness + recoveryRate * daysSinceLastMatch, 1, 100),
    fatigue,
    risk: daysSinceLastMatch < 4 ? "medium" : "low",
  };
}

function applyRecoveryIntervalPenalty(teamId, isoDate, source) {
  const team = teamById(teamId);
  if (!team || !isoDate || team.lastCompetitiveDate === isoDate) return;
  const intervalDays = daysBetweenIso(team.lastCompetitiveDate, isoDate);
  team.lastMatchIntervalDays = intervalDays;
  team.lastCompetitiveDate = isoDate;
  if (intervalDays >= 3) return;

  const penalty = intervalDays < 2 ? 12 : 7;
  playersForTeam(teamId).forEach((player) => {
    if ((player.seasonStarts ?? 0) <= 0 && (player.matchMinutes ?? 0) <= 0) return;
    player.condition = clamp(player.condition - rand(Math.max(2, penalty - 4), penalty), 25, 100);
    player.fatigue = clamp((player.fatigue ?? 0) + rand(Math.max(2, penalty - 3), penalty + 3), 0, 100);
    player.recentLoad = clamp((player.recentLoad ?? 0) + penalty, 0, 100);
  });
  if (teamId === state.userTeamId) {
    addFeed(`Fixture congestion: only ${Math.round(intervalDays * 24)} hours before ${source}. Accumulated fatigue applied to recent starters.`);
  }
}

function registerCalendarEvent(event) {
  state.calendarEvents = state.calendarEvents ?? [];
  state.calendarEvents.push(event);
}

function applyFixtureCalendar(schedule, season = state.season, league = currentLeague()) {
  state.calendarEvents = [];
  state.postponedFixtures = [];
  fifaBreakRanges(season).forEach(([start, end, reason]) => {
    const rules = competitionRules(reason, "blocked");
    registerCalendarEvent({
      type: "blocked",
      competition: reason,
      date: fixtureIsoDate(start),
      displayDate: `${formatFixtureDate(start)} - ${formatFixtureDate(end)}`,
      dayIndex: seasonDayIndex(start, season),
      priority: 0,
      ruleKey: "blocked",
      rulesCode: rules.code,
    });
  });
  const start = nextWeekendLeagueSlot(new Date(season, 7, 8), season);
  let current = start;
  return schedule.map((round, index) => {
    if (index > 0) {
      const congestedLowerLeague = schedule.length > 38 && [5, 11, 17, 23, 29, 35, 41].includes(index);
      const holidayRound = [18, 19, 20].includes(index);
      current = congestedLowerLeague || holidayRound
        ? addDays(current, 4)
        : nextWeekendLeagueSlot(addDays(current, 7), season);
      while (calendarBlockReason(current, season)) current = nextWeekendLeagueSlot(addDays(current, 7), season);
    }
    const datedRound = round.map((fixture, fixtureIndex) => {
      const stagger = fixtureIndex % 10 === 0 ? 0 : fixtureIndex % 3 === 0 ? 1 : 0;
      const fixtureDate = addDays(current, stagger);
      fixture.date = fixtureIsoDate(fixtureDate);
      fixture.displayDate = formatFixtureDate(fixtureDate);
      fixture.kickoff = fixtureIndex % 5 === 0 ? "20:00" : fixtureIndex % 2 === 0 ? "15:00" : "17:30";
      fixture.dayIndex = seasonDayIndex(fixtureDate, season);
      fixture.status = "SCHEDULED";
      fixture.competition = league.name;
      fixture.ruleKey = competitionRuleKey(league.name, "league");
      fixture.rulesCode = competitionRules(league.name, "league").code;
      fixture.priority = 3;
      return fixture;
    });
    datedRound.date = fixtureIsoDate(current);
    datedRound.displayDate = formatFixtureDate(current);
    datedRound.label = `${league.name} Matchday ${index + 1}`;
    datedRound.matchday = index + 1;
    datedRound.dayIndex = seasonDayIndex(current, season);
    registerCalendarEvent({ type: "league", competition: league.name, date: datedRound.date, displayDate: datedRound.displayDate, dayIndex: datedRound.dayIndex, matchday: index + 1, priority: 3, ruleKey: competitionRuleKey(league.name, "league"), rulesCode: competitionRules(league.name, "league").code });
    return datedRound;
  });
}

function nextUserFixture() {
  if (state.seasonComplete) return null;
  const round = state.fixtures[state.week - 1];
  const fixture = round?.find((pair) => pair.includes(state.userTeamId));
  if (!fixture) return null;
  return {
    week: state.week,
    round,
    fixture,
    homeId: fixture[0],
    awayId: fixture[1],
    date: fixture.displayDate ?? round.displayDate ?? "-",
    isoDate: fixture.date ?? round.date,
    kickoff: fixture.kickoff ?? "15:00",
  };
}

function advanceCalendarAfterMatchweek(weekPlayed) {
  state.week += 1;
  state.lastMatchWeek = weekPlayed;
  const nextFixture = nextUserFixture();
  state.currentDate = nextFixture?.isoDate ?? null;
  state.selectedOpponentId = nextFixture
    ? nextFixture.fixture.find((teamId) => teamId !== state.userTeamId)
    : state.teams.find((team) => team.id !== state.userTeamId)?.id ?? state.userTeamId;
}

function processWeeklyClubOperations(weekPlayed) {
  state.teams.forEach((team) => {
    const wages = playersForTeam(team.id).reduce((sum, player) => sum + player.contract.wage, 0);
    const income = 640_000 + team.reputation * 8500 + (team.corporateFacilities ?? 8) * 22_000;
    const operations = Math.round(210_000 + team.reputation * 3100);
    team.budget -= wages + operations;
    team.budget += income;
    if (team.id === state.userTeamId) {
      state.financeReport.lastIncome = income;
      state.financeReport.lastWages = wages;
      state.financeReport.lastOperations = operations;
      state.financeReport.lastNet = income - wages - operations;
      state.financeReport.seasonIncome += income;
      state.financeReport.seasonExpenses += wages + operations;
    }
  });
  applyWeeklyTraining();
  processRandomPlayerIncidents();
  processNarrativeLifeEvents();
  applyYouthDevelopment();
  processScoutingAssignments();
  evaluateSquadDynamicsWeek();
  processWeeklyPlayerMindStates();
  processDialogueTriggers();
  processInfrastructureProjects();
  processAIManagerJobMarket();
  simulateAITransferActivity(weekPlayed);
  simulateCompetitionsForWeek(weekPlayed);
  if (weekPlayed % 4 === 0) evaluateBoardPerformance();
}

function simulateRemainingRoundFixtures(round, playedFixture) {
  return round
    .filter(([homeId, awayId]) => !(homeId === playedFixture[0] && awayId === playedFixture[1]))
    .map(([homeId, awayId]) => {
      const fixture = round.find((pair) => pair[0] === homeId && pair[1] === awayId);
      applyRecoveryIntervalPenalty(homeId, fixture?.date ?? round.date, currentLeague().name);
      applyRecoveryIntervalPenalty(awayId, fixture?.date ?? round.date, currentLeague().name);
      const result = simulateMatch(homeId, awayId);
      return { result, text: `${teamById(homeId).name} ${result.score.home}-${result.score.away} ${teamById(awayId).name}` };
    });
}

function playerMatchRating(player, match) {
  if (!player) return 0;
  const teamSide = player.teamId === match.homeId ? "home" : "away";
  const teamWon = match.score[teamSide] > match.score[teamSide === "home" ? "away" : "home"];
  const matchGoals = (match.replay ?? []).filter((event) => event.type === "goal" && event.player === player.name).length;
  const matchAssists = (match.replay ?? []).filter((event) => event.assist === player.name).length;
  const base = 6.25 + (teamWon ? 0.35 : 0);
  const production = matchGoals * 1.05 + matchAssists * 0.65;
  const roleQuality = (playerScore(player) - 120) / 95;
  const conditionDrag = player.condition < 65 ? -0.25 : 0;
  return clamp(base + production + roleQuality + conditionDrag + rand(-0.2, 0.25), 5.8, 9.8);
}

function buildPostMatchSummary(match) {
  const played = [...(match.lineups?.home ?? []), ...(match.lineups?.away ?? [])]
    .map((id) => state.players.find((player) => player.id === id))
    .filter(Boolean);
  const rated = played
    .map((player) => ({ player, rating: playerMatchRating(player, match) }))
    .sort((a, b) => b.rating - a.rating);
  const motm = rated[0];
  return {
    matchId: `${match.homeId}-${match.awayId}-${state.lastMatchWeek ?? state.week}`,
    homeId: match.homeId,
    awayId: match.awayId,
    score: { ...match.score },
    stats: {
      home: {
        shots: match.stats.home.shots,
        onTarget: match.stats.home.onTarget,
        xg: Number(match.stats.home.xg.toFixed(2)),
        possession: match.stats.home.possession,
      },
      away: {
        shots: match.stats.away.shots,
        onTarget: match.stats.away.onTarget,
        xg: Number(match.stats.away.xg.toFixed(2)),
        possession: match.stats.away.possession,
      },
    },
    manOfTheMatch: motm
      ? {
          id: motm.player.id,
          name: motm.player.name,
          teamId: motm.player.teamId,
          role: motm.player.role,
          rating: Number(motm.rating.toFixed(1)),
          goals: (match.replay ?? []).filter((event) => event.type === "goal" && event.player === motm.player.name).length,
          assists: (match.replay ?? []).filter((event) => event.assist === motm.player.name).length,
        }
      : null,
    events: match.events.slice(-8).reverse(),
  };
}

function confirmPreMatchPlan() {
  state.preMatchConfirmed = true;
  state.postMatchSummary = null;
  addFeed("Match plan confirmed. Squad and tactics are locked for kickoff.");
  render();
}

function openNextMatchPrep() {
  state.postMatchSummary = null;
  state.preMatchConfirmed = false;
  state.matchdayPhase = "ready";
  state.activeView = "match";
  addFeed("Next match preparation opened. Review squad and tactics before kickoff.");
  render();
}

function buildGeneratedLeagueTeams(league) {
  const used = new Set();
  return Array.from({ length: league.teams }, (_, index) => {
    let suffix = GENERATED_CLUB_NAMES[index % GENERATED_CLUB_NAMES.length];
    let name = `${league.country} ${suffix}`;
    if (used.has(name)) name = `${league.country} ${suffix} ${index + 1}`;
    used.add(name);
    const reputation = clamp(league.level + rand(-8, 7), 45, 90);
    const budget = Math.round((reputation * reputation) * 13_500);
    const wageBudget = Math.round(reputation * 18_000);
    return createTeam(index + 1, name, reputation, budget, wageBudget, null);
  });
}

function leagueRules(league = currentLeague()) {
  return DIVISION_RULES[league.id] ?? {
    promotion: league.level < 78 ? 2 : 0,
    relegation: league.teams >= 18 ? 3 : 2,
    lowerName: `${league.name} 2`,
  };
}

function leagueDataProfile(league) {
  const realLeague = REAL_PLAYABLE_LEAGUE_IDS.includes(league.id);
  const profiles = {
    "eng-premier-league": {
      status: "Real clubs + real player seed",
      source: "Premier League squad lists / Transfermarkt-style sync",
      coverage: "20 clubs, crests, senior squad core, 25/26 transfer overlay",
    },
    "esp-la-liga": {
      status: "Real clubs + real player seed",
      source: "LALIGA clubs / Transfermarkt-style sync",
      coverage: "20 LALIGA EA SPORTS clubs, crests, senior squad core, 25/26 transfer overlay",
    },
    "eng-championship": {
      status: "Real clubs + real player seed",
      source: "EFL Championship clubs / Transfermarkt-style sync",
      coverage: "24 Championship clubs, crests where available, senior squad core",
    },
    "ita-serie-a": {
      status: "Real clubs + real player seed",
      source: "Lega Serie A clubs / Transfermarkt-style sync",
      coverage: "20 Lega Serie A clubs, crests where available, senior squad core",
    },
    "ger-bundesliga": {
      status: "Real clubs + real player seed",
      source: "Bundesliga clubs / Transfermarkt-style sync",
      coverage: "18 Bundesliga clubs, crests, senior squad core",
    },
    "fra-ligue-1": {
      status: "Real clubs + real player seed",
      source: "LFP / Ligue 1 McDonald's reference seed",
      coverage: "18 Ligue 1 clubs, crests where available, generated squad depth",
    },
    "fra-ligue-2": {
      status: "Real clubs + real player seed",
      source: "LFP / Ligue 2 BKT reference seed",
      coverage: "18 Ligue 2 clubs, crests where available, generated squad depth",
    },
    "global-super-league": {
      status: "Real club showcase",
      source: "Top-club seed database",
      coverage: "20 global clubs with star-player cores and club crests where available",
    },
  };
  return profiles[league.id] ?? {
    status: realLeague ? "Real clubs + generated squad depth" : "Generated playable league",
    source: realLeague ? `${league.name} official club reference seed` : "Official league slot pending",
    coverage: realLeague
      ? `${league.teams} real clubs, crests where available, generated depth players`
      : `${league.teams} generated clubs, generated squads, real league rules shell`,
  };
}

function generatedDivisionTeam(league, index, sourceName) {
  const suffix = GENERATED_CLUB_NAMES[(index + state.season) % GENERATED_CLUB_NAMES.length];
  const name = `${sourceName} ${suffix}`;
  const reputation = clamp(league.level + rand(-14, -5), 42, 82);
  const budget = Math.round((reputation * reputation) * 10_800);
  const wageBudget = Math.round(reputation * 14_500);
  return createTeam(1000 + state.season * 10 + index, name, reputation, budget, wageBudget, null);
}

function generateIncomingTeams(league, count, sourceName) {
  return Array.from({ length: count }, (_, index) => generatedDivisionTeam(league, index, sourceName));
}

function promotionPlayoffScore(row, seedIndex) {
  const team = teamById(row.teamId);
  const goalDifference = row.goalsFor - row.goalsAgainst;
  const formScore = row.points * 2 + goalDifference + row.goalsFor * 0.2;
  const reputationScore = (team?.reputation ?? 60) * 1.4;
  const seedBonus = Math.max(0, 4 - seedIndex) * 2.5;
  return formScore + reputationScore + seedBonus + Math.random() * 14;
}

function calculatePromotionRows(rules) {
  if (!rules.upperLeagueId || !rules.promotion) return { automaticRows: [], playoffRows: [], playoffWinnerRows: [] };
  if (!rules.playoff) {
    return { automaticRows: state.table.slice(0, rules.promotion), playoffRows: [], playoffWinnerRows: [] };
  }

  const automaticRows = state.table.slice(0, rules.automaticPromotion ?? Math.max(0, rules.promotion - rules.playoff.winners));
  const playoffRows = state.table.slice(rules.playoff.start - 1, rules.playoff.end);
  const scoredPlayoffRows = playoffRows.map((row, index) => ({ row, score: promotionPlayoffScore(row, index) }));
  const playoffWinnerRows = scoredPlayoffRows
    .sort((a, b) => b.score - a.score)
    .map((item) => item.row)
    .slice(0, rules.playoff.winners);
  return { automaticRows, playoffRows, playoffWinnerRows };
}

function generateIncomingPromotedTeams(league, rules, count) {
  if (!count) return [];
  const lowerLeague = LEAGUE_CATALOG.find((item) => item.id === rules.lowerLeagueId);
  if (lowerLeague?.realSeed) {
    const existingNames = new Set(state.teams.map((team) => team.name));
    return realLeagueTeams(lowerLeague)
      .filter(([name]) => !existingNames.has(name))
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([name, reputation, budget, wageBudget, logo], index) =>
        createTeam(1000 + state.season * 10 + index, name, reputation, budget, wageBudget, logo)
      );
  }
  return rules.lowerName ? generateIncomingTeams(league, count, rules.lowerName) : [];
}

function generateIncomingRelegatedTeams(rules, count) {
  if (!count) return [];
  const upperLeague = LEAGUE_CATALOG.find((item) => item.id === rules.upperLeagueId);
  if (upperLeague?.realSeed) {
    const existingNames = new Set(state.teams.map((team) => team.name));
    return realLeagueTeams(upperLeague)
      .filter(([name]) => !existingNames.has(name))
      .sort((a, b) => a[1] - b[1])
      .slice(0, count)
      .map(([name, reputation, budget, wageBudget, logo], index) =>
        createTeam(2000 + state.season * 10 + index, name, reputation, budget, wageBudget, logo)
      );
  }
  const fallbackLeague = upperLeague ?? currentLeague();
  return Array.from({ length: count }, (_, index) => generatedDivisionTeam(fallbackLeague, index + 40, rules.upperName ?? "Upper League"));
}

function calculateLeagueMovement() {
  const league = currentLeague();
  const rules = leagueRules(league);
  const relegatedRows = rules.relegation ? state.table.slice(-rules.relegation) : [];
  const { automaticRows, playoffRows, playoffWinnerRows } = calculatePromotionRows(rules);
  const promotedRows = [...automaticRows, ...playoffWinnerRows];
  const incomingPromoted = rules.relegation ? generateIncomingPromotedTeams(league, rules, relegatedRows.length) : [];
  const incomingRelegated = rules.upperLeagueId ? generateIncomingRelegatedTeams(rules, promotedRows.length) : [];
  const userRowIndex = state.table.findIndex((row) => row.teamId === state.userTeamId);
  const userPromoted = promotedRows.some((row) => row.teamId === state.userTeamId);
  const userRelegated = relegatedRows.some((row) => row.teamId === state.userTeamId);

  return {
    leagueId: league.id,
    leagueName: league.name,
    rules,
    userRowIndex,
    userPromoted,
    userRelegated,
    promotedTeamIds: promotedRows.map((row) => row.teamId),
    automaticPromotedTeamIds: automaticRows.map((row) => row.teamId),
    playoffTeamIds: playoffRows.map((row) => row.teamId),
    playoffWinnerTeamIds: playoffWinnerRows.map((row) => row.teamId),
    relegatedTeamIds: relegatedRows.map((row) => row.teamId),
    incomingPromoted,
    incomingRelegated,
  };
}

function seedRealSquadForTeam(team, nextId, source = "real player seed / approximate expiry") {
  const realSeeds = REAL_PLAYER_SEEDS[team.name];
  if (!realSeeds) return null;
  let id = nextId;
  realSeeds.forEach(([name, role, age, quality, expires], index) => {
    state.players.push(
      createPlayer(id++, name, role, age, quality, team.id, {
        squadGroup: squadGroupForSeed(age, index),
        realName: true,
        expires,
        contractSource: source,
      })
    );
  });
  return id;
}

function seedSquadForTeam(team, nextId) {
  let id = seedRealSquadForTeam(team, nextId);
  if (!id) id = seedGeneratedSquad(team, nextId);
  id = ensureSquadDepth(team, id);
  assignTeamShirtNumbers(team.id);
  return id;
}

function seedMissingTeamPlayers() {
  let id = Math.max(...state.players.map((player) => player.id), 0) + 1;
  state.teams.forEach((team) => {
    if (playersForTeam(team.id).length) return;
    id = seedSquadForTeam(team, id);
  });
}

function rebuildLeagueAroundUser(leagueId, message) {
  const keepUser = teamById(state.userTeamId);
  state.selectedLeagueId = leagueId;
  state.pendingLeagueId = leagueId;
  const league = currentLeague();
  const leagueTeams = league.realSeed
    ? realLeagueTeams(league).map(([name, reputation, budget, wageBudget, logo], index) =>
        createTeam(index + 100, name, reputation, budget, wageBudget, logo)
      )
    : buildGeneratedLeagueTeams(league).map((team, index) => ({ ...team, id: index + 100 }));
  const otherTeams = leagueTeams
    .filter((team) => team.name !== keepUser.name)
    .slice(0, league.teams - 1);
  state.teams = [keepUser, ...otherTeams];
  state.players = state.players.filter((player) => player.teamId === keepUser.id);
  seedMissingTeamPlayers();
  state.teams.forEach((team) => assignTeamShirtNumbers(team.id));
  addFeed(message);
}

function applyLeagueMovement() {
  const movement = state.leagueMovement;
  if (!movement) return;

  const rules = movement.rules;
  if (movement.userPromoted && rules.upperLeagueId) {
    const keepUser = teamById(state.userTeamId);
    const upper = LEAGUE_CATALOG.find((league) => league.id === rules.upperLeagueId);
    rebuildLeagueAroundUser(rules.upperLeagueId, `${keepUser.name} promoted to ${upper?.name ?? rules.upperName}.`);
    return;
  }

  if (movement.userRelegated && rules.lowerLeagueId) {
    const keepUser = teamById(state.userTeamId);
    const lower = LEAGUE_CATALOG.find((league) => league.id === rules.lowerLeagueId);
    rebuildLeagueAroundUser(rules.lowerLeagueId, `${keepUser.name} relegated to ${lower?.name ?? rules.lowerName}.`);
    return;
  }

  const outgoingIds = [...movement.relegatedTeamIds, ...movement.promotedTeamIds];
  const incomingTeams = [...movement.incomingPromoted, ...(movement.incomingRelegated ?? [])];
  if (outgoingIds.length && incomingTeams.length) {
    const outgoing = new Set(outgoingIds);
    const survivors = state.teams.filter((team) => !outgoing.has(team.id));
    state.teams = [...survivors, ...incomingTeams].slice(0, currentLeague().teams);
    state.players = state.players.filter((player) => !outgoing.has(player.teamId));
    const incomingIds = new Set(incomingTeams.map((team) => team.id));
    let id = Math.max(...state.players.map((player) => player.id), 0) + 1;
    state.teams.filter((team) => incomingIds.has(team.id)).forEach((team) => {
      id = seedSquadForTeam(team, id);
    });
    if (movement.incomingPromoted.length) addFeed(`${movement.incomingPromoted.map((team) => team.name).join(", ")} promoted into ${movement.leagueName}.`);
    if (movement.incomingRelegated?.length) addFeed(`${movement.incomingRelegated.map((team) => team.name).join(", ")} relegated into ${movement.leagueName}.`);
  }
}

function seedGeneratedSquad(team, nextId) {
  const roles = ["GK", "CB", "CB", "FB", "FB", "DM", "CM", "CM", "AM", "W", "ST", "GK", "CB", "CM", "W", "ST"];
  let id = nextId;
  roles.forEach((role, index) => {
    const quality = clamp(Math.round(team.reputation / 5 + rand(-3, 2)), 7, 17);
    state.players.push(
      createPlayer(id++, `${team.name.split(" ")[0]} ${role}${index + 1}`, role, rand(18, 33), quality, team.id, {
        squadGroup: index < 11 ? "senior" : "sub",
        realName: false,
        expires: state.season + rand(1, 5),
        contractSource: "generated league player",
      })
    );
  });
  return id;
}

function squadGroupForSeed(age, index) {
  if (age <= 18) return "u18";
  if (age <= 21) return "u21";
  return index < 11 ? "senior" : "sub";
}

function existingNamesForTeam(teamId) {
  return new Set(playersForTeam(teamId).map((player) => player.name));
}

function addDepthPlayer(team, id, role, squadGroup, index) {
  const ageRanges = {
    senior: [22, 33],
    sub: [19, 31],
    u21: [19, 21],
    u18: [16, 18],
  };
  const qualityOffsets = {
    senior: [-4, -1],
    sub: [-5, -2],
    u21: [-7, -3],
    u18: [-9, -5],
  };
  const [minAge, maxAge] = ageRanges[squadGroup];
  const [minOffset, maxOffset] = qualityOffsets[squadGroup];
  const quality = clamp(Math.round(team.reputation / 5 + rand(minOffset, maxOffset)), 6, 16);
  const age = rand(minAge, maxAge);
  return createPlayer(id, randomAcademyName(team.id * 100 + index), role, age, quality, team.id, {
    squadGroup,
    realName: false,
    expires: state.season + rand(2, 5),
    contractSource: squadGroup === "senior" || squadGroup === "sub" ? "depth squad seed" : `${SQUAD_GROUPS[squadGroup]} academy seed`,
  });
}

function ensureSquadDepth(team, nextId) {
  let id = nextId;
  const depthPlan = {
    senior: { total: 18, roles: ["GK", "CB", "CB", "FB", "FB", "DM", "CM", "CM", "AM", "W", "W", "ST"] },
    sub: { total: 7, roles: ["GK", "CB", "FB", "DM", "CM", "W", "ST"] },
    u21: { total: 10, roles: ["GK", "CB", "FB", "DM", "CM", "AM", "W", "ST"] },
    u18: { total: 10, roles: ["GK", "CB", "FB", "DM", "CM", "AM", "W", "ST"] },
  };

  Object.entries(depthPlan).forEach(([squadGroup, plan]) => {
    while (playersForTeam(team.id).filter((player) => player.squadGroup === squadGroup).length < plan.total) {
      const currentCount = playersForTeam(team.id).filter((player) => player.squadGroup === squadGroup).length;
      const role = plan.roles[currentCount % plan.roles.length];
      state.players.push(addDepthPlayer(team, id++, role, squadGroup, currentCount));
    }
  });

  return id;
}

function applyTransferLedgerToSquads(nextId) {
  let id = nextId;
  const ledger = state.selectedLeagueId === "esp-la-liga" ? LALIGA_TRANSFER_LEDGER_2526 : REAL_TRANSFER_LEDGER_2526;
  ledger
    .filter((deal) => deal.type === "arrival")
    .forEach((deal) => {
      const destination = state.teams.find((team) => team.name === deal.to);
      if (!destination) return;
      const player = state.players.find((candidate) => candidate.name === deal.player);
      if (player) {
        player.teamId = destination.id;
        player.squadGroup = "senior";
        player.value = Math.max(player.value, deal.fee);
        player.contract.wage = wageEstimateFromValue(player, deal.fee);
        player.contract.expires = Math.max(player.contract.expires, state.season + 4);
        player.contract.source = `${deal.source} / squad move`;
        return;
      }

      const created = createPlayer(id++, deal.player, deal.role, deal.age ?? 24, deal.quality ?? 16, destination.id, {
        squadGroup: "senior",
        realName: true,
        expires: state.season + 4,
        contractSource: `${deal.source} / added to 25/26 squad`,
      });
      created.value = deal.fee;
      created.contract.wage = wageEstimateFromValue(created, deal.fee);
      state.players.push(created);
    });

  state.teams.forEach((team) => assignTeamShirtNumbers(team.id));
  return id;
}

function seedGame() {
  const league = currentLeague();
  state.leagueMovement = null;
  state.pendingMatchDecision = null;
  state.touchlineShout = null;
  state.scoutingKnowledge = { [league.country]: 88, [state.manager.nationality]: 64 };
  state.scoutingAssignments = [];
  state.scoutingReports = [];
  state.analystReports = [];
  state.selectedScoutPlayerId = null;
  state.mediaPressure = null;
  state.mediaHistory = [];
  state.infrastructureProjects = [];
  state.socialFeed = [];
  state.jobMarketHistory = [];
  seedManagerPool(12);
  state.lifeEvents = [];
  state.newgenCounter = 0;
  state.board = {
    score: 70,
    grade: "B",
    status: "Stable",
    warningLevel: 0,
    history: [],
    vision: { youthSignings: true, attackingFootball: true, wageControl: true },
  };
  state.teams = league.globalSeed
    ? GLOBAL_SUPER_TEAMS.map(([name, reputation, budget, wageBudget, logo], index) =>
        createTeam(index + 1, name, reputation, budget, wageBudget, logo)
      )
    : league.realSeed
    ? realLeagueTeams(league).map(([name, reputation, budget, wageBudget, logo], index) =>
        createTeam(index + 1, name, reputation, budget, wageBudget, logo)
      )
    : buildGeneratedLeagueTeams(league);
  let id = 1;
  state.players = [];
  state.staff = [];

  state.teams.forEach((team) => {
    const realSeeds = league.globalSeed ? GLOBAL_PLAYER_SEEDS[team.name] : null;
    if (!realSeeds) {
      id = seedSquadForTeam(team, id);
      return;
    }

    realSeeds.forEach(([name, role, age, quality, expires], index) => {
      state.players.push(
        createPlayer(id++, name, role, age, quality, team.id, {
          squadGroup: squadGroupForSeed(age, index),
          realName: true,
          expires,
          contractSource: "real player seed / approximate expiry",
        })
      );
    });

    id = ensureSquadDepth(team, id);
    assignTeamShirtNumbers(team.id);
  });

  id = applyTransferLedgerToSquads(id);

  state.table = state.teams.map((team) => ({
    teamId: team.id,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  }));

  state.fixtures = buildHomeAwaySchedule(state.teams.map((team) => team.id));

  refreshMarket();
  resetFinanceReport();
  state.currentDate = nextUserFixture()?.isoDate ?? null;
  state.selectedOpponentId = nextUserFixture()?.fixture.find((teamId) => teamId !== state.userTeamId) ?? state.teams.find((team) => team.id !== state.userTeamId).id;
  state.competitions = [];
  state.leagueReputation[league.id] = clamp((league.level ?? 75) * 100, 1000, 10000);
  evaluateBoardPerformance();
  addFeed(`${league.name} ${state.fixtures.length}-matchweek season loaded.`);
}

function teamById(teamId) {
  return state.teams.find((team) => team.id === teamId);
}

function staffName(index) {
  const first = STAFF_FIRST_NAMES[(index + rand(0, STAFF_FIRST_NAMES.length - 1)) % STAFF_FIRST_NAMES.length];
  const last = STAFF_LAST_NAMES[(index * 5 + rand(0, STAFF_LAST_NAMES.length - 1)) % STAFF_LAST_NAMES.length];
  return `${first} ${last}`;
}

function buildClubStaff(club) {
  const reputationLift = Math.round(club.reputation / 10);
  const moraleLift = Math.round(club.morale / 4);
  const managerBase = clamp(9 + reputationLift + moraleLift, 1, 20);
  const manager = {
    role: "Manager",
    name: managerFullName(),
    nationality: state.manager.nationality,
    primaryNationality: state.manager.nationality,
    secondaryNationality: state.manager.secondaryNationality ?? secondaryNationalityFor(state.manager.nationality, managerFullName()),
    focus: `${state.manager.coachingStyle} football, dressing-room leadership, matchday decisions`,
    attributes: {
      coaching: clamp(managerBase, 1, 20),
      tacticalKnowledge: clamp(managerBase + 1, 1, 20),
      manManagement: clamp(12 + moraleLift, 1, 20),
      judgingAbility: clamp(10 + reputationLift, 1, 20),
      discipline: clamp(11 + Math.round(reputationLift / 2), 1, 20),
    },
  };

  const generated = STAFF_ROLE_BLUEPRINTS.map((blueprint, index) => {
    const name = staffName(index);
    const nationality = randomNationality(name);
    const base = clamp(7 + reputationLift + rand(-2, 4), 1, 20);
    const attributes = {
      coaching: clamp(base + rand(-1, 2), 1, 20),
      tacticalKnowledge: clamp(base + rand(-2, 3), 1, 20),
      manManagement: clamp(base + rand(-2, 2), 1, 20),
      judgingAbility: clamp(base + rand(-1, 4), 1, 20),
      discipline: clamp(base + rand(-3, 2), 1, 20),
      defending: clamp(base + (blueprint.key === "defending" ? 4 : rand(-2, 2)), 1, 20),
      goalkeeping: clamp(base + (blueprint.key === "goalkeeping" ? 5 : rand(-4, 1)), 1, 20),
      fitness: clamp(base + (blueprint.key === "fitness" ? 5 : rand(-2, 2)), 1, 20),
      physiotherapy: clamp(base + (blueprint.key === "physiotherapy" ? 5 : rand(-3, 2)), 1, 20),
      workingWithYoungsters: clamp(base + (blueprint.key === "workingWithYoungsters" ? 5 : rand(-2, 3)), 1, 20),
    };
    return {
      role: blueprint.role,
      name,
      nationality,
      primaryNationality: nationality,
      secondaryNationality: secondaryNationalityFor(nationality, name),
      focus: blueprint.focus,
      attributes,
      primaryRating: attributes[blueprint.key] ?? base,
    };
  });

  return [manager, ...generated];
}

function staffOverall(staffMember) {
  const values = Object.values(staffMember.attributes ?? {});
  return values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 10;
}

function staffByRole(role) {
  return state.staff.find((member) => member.role === role);
}

function bestStaffRating(roles, attribute) {
  const ratings = roles
    .map((role) => staffByRole(role)?.attributes?.[attribute] ?? staffByRole(role)?.primaryRating ?? 8)
    .filter(Number.isFinite);
  return ratings.length ? Math.max(...ratings) : 8;
}

function trainingStarRating(focus = state.trainingFocus) {
  const club = teamById(state.userTeamId);
  const squadSize = playersForTeam(state.userTeamId).filter((player) => ["senior", "sub", "u21"].includes(player.squadGroup)).length;
  const focusAttribute = {
    tactical: "tacticalKnowledge",
    attacking: "coaching",
    defensive: "defending",
    physical: "fitness",
  }[focus] ?? "coaching";
  const coachRating = bestStaffRating(["Assistant Manager", "First Team Coach", "Defensive Coach", "Fitness Coach"], focusAttribute);
  const facilityLift = (club.trainingFacilities ?? 10) * 0.42;
  const loadPenalty = Math.max(0, squadSize - 24) * 0.12;
  return clamp(Number(((coachRating + facilityLift - loadPenalty) / 5.4).toFixed(1)), 1, 5);
}

function sportsScienceRating() {
  const sports = bestStaffRating(["Sports Scientist", "Fitness Coach"], "fitness");
  const physio = bestStaffRating(["Head of Medical", "Physiotherapist"], "physiotherapy");
  return clamp(Math.round((sports * 0.58 + physio * 0.42)), 1, 20);
}

function injuryRiskScore(player) {
  const science = sportsScienceRating();
  const risk = (player.hidden.injuryProneness ?? 10) * 3.2 + (player.fatigue ?? 0) * 0.56 + (100 - (player.condition ?? 90)) * 0.28 + (player.recentLoad ?? 0) * 0.22 - science * 2.1;
  return clamp(Math.round(risk), 1, 100);
}

function medicalRiskBand(score) {
  if (score >= 72) return { label: "Red", className: "risk-red", note: "high injury risk" };
  if (score >= 48) return { label: "Amber", className: "risk-amber", note: "monitor workload" };
  return { label: "Green", className: "risk-green", note: "available" };
}

function setStaffDelegation(key, checked) {
  if (!(key in state.staffDelegation)) return;
  state.staffDelegation[key] = Boolean(checked);
  addFeed(`Staff delegation updated: ${label(key)} ${checked ? "assigned" : "returned to manager"}.`);
  render();
}

function infrastructureCategoryLabel(category) {
  return {
    trainingFacilities: "Training Facilities",
    youthFacilities: "Youth Facilities",
    corporateFacilities: "Corporate Facilities",
  }[category] ?? label(category);
}

function requestInfrastructureUpgrade(category) {
  const club = teamById(state.userTeamId);
  if (!club || !(category in club)) return;
  if (club[category] >= 20) return addFeed(`${infrastructureCategoryLabel(category)} are already at the maximum level.`);
  if (state.infrastructureProjects.some((project) => project.category === category && project.status === "building")) return addFeed(`${infrastructureCategoryLabel(category)} upgrade is already under construction.`);
  const leverage = clamp(state.board.score + clubReputationScore(club) / 180 + (club.budget > 25_000_000 ? 12 : 0), 0, 160);
  const cost = Math.round((club[category] + 1) * (category === "corporateFacilities" ? 1_450_000 : 1_850_000));
  const approved = club.budget > cost * 1.25 && leverage >= 66;
  if (!approved) {
    state.board.history.unshift(`Week ${state.week}: board rejected ${infrastructureCategoryLabel(category)} request.`);
    state.board.history = state.board.history.slice(0, 12);
    addFeed(`Board rejected ${infrastructureCategoryLabel(category)} request. Improve finance or job security first.`);
    return render();
  }
  club.budget -= cost;
  state.infrastructureProjects.unshift({
    id: `${state.season}-${state.week}-${category}`,
    category,
    targetLevel: club[category] + 1,
    weeksRemaining: rand(24, 48),
    cost,
    status: "building",
  });
  state.board.history.unshift(`Week ${state.week}: board approved ${infrastructureCategoryLabel(category)} upgrade to level ${club[category] + 1}.`);
  state.board.history = state.board.history.slice(0, 12);
  addFeed(`Board approved ${infrastructureCategoryLabel(category)} upgrade. Cost ${money(cost)}, construction started.`);
  render();
}

function processInfrastructureProjects() {
  const club = teamById(state.userTeamId);
  state.infrastructureProjects.forEach((project) => {
    if (project.status !== "building") return;
    project.weeksRemaining -= 1;
    if (project.weeksRemaining <= 0) {
      club[project.category] = clamp(project.targetLevel, 1, 20);
      project.status = "complete";
      addFeed(`${infrastructureCategoryLabel(project.category)} upgrade completed: level ${club[project.category]}/20.`);
    }
  });
  state.infrastructureProjects = state.infrastructureProjects.slice(0, 8);
}

function addSocialPost(tone, text, tag = "club") {
  state.socialFeed.unshift({ week: state.week, season: seasonLabel(), tone, text, tag });
  state.socialFeed = state.socialFeed.slice(0, 36);
}

function fanMoodScore(club = teamById(state.userTeamId)) {
  const position = state.table.findIndex((row) => row.teamId === club.id) + 1;
  const positionScore = position ? 100 - ((position - 1) / Math.max(1, state.table.length - 1)) * 72 : 58;
  const passionSwing = (club.fanProfile?.hardcore ?? 34) * 0.28;
  return clamp(Math.round(positionScore + club.morale * 1.2 - passionSwing / 2), 1, 100);
}

function generateFanReactionForMatch(match) {
  const club = teamById(state.userTeamId);
  const home = match.homeId === state.userTeamId;
  const userGoals = home ? match.score.home : match.score.away;
  const oppGoals = home ? match.score.away : match.score.home;
  const won = userGoals > oppGoals;
  const lost = userGoals < oppGoals;
  const defensive = ["veryDefensive", "defensive", "cautious"].includes(state.tactics.mentality);
  if (won) addSocialPost("positive", `Massive result. ${club.name} looked organised and ruthless today. #${club.name.replaceAll(" ", "")}`, "match");
  else if (lost && home && defensive) addSocialPost("negative", `Losing at home while sitting deep is rough. Fans want more courage from the manager.`, "match");
  else if (lost) addSocialPost("negative", `That result hurts. The pressure around ${club.name} will grow this week.`, "match");
  else addSocialPost("neutral", `A draw with plenty to analyse. Some fans back the process, others want faster changes.`, "match");
}

function treatInjury(playerId, method) {
  const player = playersForTeam(state.userTeamId).find((candidate) => candidate.id === Number(playerId));
  const club = teamById(state.userTeamId);
  if (!player || player.injuredWeeks <= 0) return;
  if (method === "specialist") {
    const cost = 450_000 + player.injuredWeeks * 85_000;
    if (club.budget < cost) return addFeed(`Medical board blocked specialist surgery for ${player.name}. Cost ${money(cost)}.`);
    club.budget -= cost;
    player.injuredWeeks += 1;
    player.hidden.injuryProneness = clamp((player.hidden.injuryProneness ?? 10) - 2, 1, 20);
    player.contract.morale = clamp(player.contract.morale + 1, 1, 20);
    addFeed(`${player.name} sent to a specialist. Longer recovery, lower recurrence risk. Cost ${money(cost)}.`);
  } else if (method === "injection") {
    player.injuredWeeks = Math.max(1, player.injuredWeeks - 1);
    player.hidden.injuryProneness = clamp((player.hidden.injuryProneness ?? 10) + 2, 1, 20);
    player.condition = clamp(player.condition - 8, 25, 100);
    addFeed(`${player.name} received pain-management rehab. Faster return, higher recurrence risk.`);
  } else {
    player.injuredWeeks = Math.max(0, player.injuredWeeks - 1);
    addFeed(`${player.name} follows normal rehab under the medical team.`);
  }
  render();
}

function seasonLabel() {
  return `${state.season}/${String(state.season + 1).slice(-2)}`;
}

function playersForTeam(teamId) {
  return state.players.filter((player) => player.teamId === teamId);
}

function shirtNo(player, fallback = "-") {
  const number = Number(player?.shirtNumber);
  return Number.isInteger(number) && number >= 1 && number <= 99 ? number : fallback;
}

function assignTeamShirtNumbers(teamId) {
  const roleOrder = ["GK", "FB", "CB", "DM", "CM", "AM", "W", "ST"];
  const groupOrder = { senior: 0, sub: 1, u21: 2, u18: 3 };
  const used = new Set();
  const teamPlayers = playersForTeam(teamId).sort((a, b) =>
    (groupOrder[a.squadGroup] ?? 4) - (groupOrder[b.squadGroup] ?? 4) ||
    roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role) ||
    b.hidden.currentAbility - a.hidden.currentAbility
  );

  teamPlayers
    .filter((player) => Number.isInteger(Number(player.shirtNumber)) || Number.isInteger(Number(REAL_SHIRT_NUMBERS[player.name])))
    .forEach((player) => {
      const preferredNumber = Number(player.shirtNumber ?? REAL_SHIRT_NUMBERS[player.name]);
      if (preferredNumber >= 1 && preferredNumber <= 99 && !used.has(preferredNumber)) {
        player.shirtNumber = preferredNumber;
        used.add(preferredNumber);
      } else {
        player.shirtNumber = null;
      }
    });

  teamPlayers.forEach((player) => {
    if (player.shirtNumber) return;
    const preferredNumber = Number(player.shirtNumber ?? REAL_SHIRT_NUMBERS[player.name]);
    if (Number.isInteger(preferredNumber) && preferredNumber >= 1 && preferredNumber <= 99 && !used.has(preferredNumber)) {
      player.shirtNumber = preferredNumber;
      used.add(preferredNumber);
      return;
    }

    const pool = [...(ROLE_NUMBER_POOLS[player.role] ?? []), ...Array.from({ length: 99 }, (_, index) => index + 1)];
    const nextNumber = pool.find((number) => !used.has(number)) ?? teamPlayers.length + 1;
    player.shirtNumber = nextNumber;
    used.add(nextNumber);
  });
}

function matchSquadForTeam(teamId) {
  const matchGroups = new Set(["senior", "sub"]);
  return playersForTeam(teamId).filter((player) => matchGroups.has(player.squadGroup));
}

function activeAvailabilityIssue(player) {
  if (player.injuredWeeks > 0) {
    return {
      type: "injury",
      label: `${player.injuredWeeks}w injury`,
      blocksMatch: true,
      className: "injured",
    };
  }
  if (player.availability?.weeks > 0) return player.availability;
  return null;
}

function playerStaminaScore(player) {
  const naturalFitness = player.attributes?.naturalFitness ?? 10;
  const base = (player.condition ?? 90) * 0.58 + naturalFitness * 1.35 + 22;
  const recentLoadPenalty = (player.recentLoad ?? 0) * 0.36;
  const fatiguePenalty = (player.fatigue ?? 0) * 0.46;
  const minutesPenalty = Math.min(18, ((player.matchMinutes ?? 0) / 90) * 0.22);
  const injuryPenalty = player.injuredWeeks > 0 ? 34 : 0;
  const issue = activeAvailabilityIssue(player);
  const incidentPenalty = issue?.type === "fever" ? 22 : issue?.type === "skippedTraining" ? 7 : issue?.type === "late" ? 3 : 0;
  const moodFatiguePenalty = Math.max(0, (70 - playerMindState(player).overallMorale) * 0.08);
  return clamp(Math.round(base - recentLoadPenalty - fatiguePenalty - minutesPenalty - injuryPenalty - incidentPenalty - moodFatiguePenalty), 1, 100);
}

function isPlayerMatchAvailable(player) {
  const issue = activeAvailabilityIssue(player);
  return !(issue?.blocksMatch);
}

function formationRoleSlots(formation = state.tactics.formation) {
  const slots = {
    "4-4-2": ["GK", "FB", "CB", "CB", "FB", "W", "CM", "CM", "W", "ST", "ST"],
    "4-3-3": ["GK", "FB", "CB", "CB", "FB", "DM", "CM", "CM", "W", "W", "ST"],
    "4-2-3-1": ["GK", "FB", "CB", "CB", "FB", "DM", "DM", "W", "AM", "W", "ST"],
    "3-5-2": ["GK", "CB", "CB", "CB", "W", "DM", "CM", "CM", "W", "ST", "ST"],
  };
  return slots[formation] ?? slots["4-3-3"];
}

function autoFirstEleven(teamId, excludedIds = new Set()) {
  const roles = formationRoleSlots(teamById(teamId)?.tactics?.formation);
  const squad = matchSquadForTeam(teamId).filter((player) => isPlayerMatchAvailable(player) && !excludedIds.has(player.id));
  const picked = [];

  roles.forEach((role) => {
    const player = squad
      .filter((candidate) => candidate.role === role && !picked.includes(candidate))
      .sort((a, b) => playerScore(b) - playerScore(a))[0];
    if (player) picked.push(player);
  });

  squad
    .filter((player) => !picked.includes(player))
    .sort((a, b) => playerScore(b) - playerScore(a))
    .slice(0, 11 - picked.length)
    .forEach((player) => picked.push(player));

  return picked;
}

function ensureUserLineup() {
  const validIds = new Set(matchSquadForTeam(state.userTeamId).filter((player) => isPlayerMatchAvailable(player)).map((player) => player.id));
  if (!Array.isArray(state.lineupPlayerIds) || state.lineupPlayerIds.length !== 11) {
    state.lineupPlayerIds = autoFirstEleven(state.userTeamId).map((player) => player.id);
  }

  const used = new Set();
  state.lineupPlayerIds = state.lineupPlayerIds.map((playerId) => {
    if (!validIds.has(playerId) || used.has(playerId)) return null;
    used.add(playerId);
    return playerId;
  });

  const replacements = autoFirstEleven(state.userTeamId, used);
  state.lineupPlayerIds = state.lineupPlayerIds.map((playerId) => {
    if (playerId) return playerId;
    const replacement = replacements.shift();
    return replacement?.id ?? null;
  });
}

function firstEleven(teamId) {
  if (teamId !== state.userTeamId) return autoFirstEleven(teamId);
  ensureUserLineup();
  return state.lineupPlayerIds.map((playerId) => state.players.find((player) => player.id === playerId)).filter(Boolean);
}

function playerScore(player) {
  const roleKeys = {
    GK: ["agility", "positioning", "decisions", "composure"],
    CB: ["tackling", "heading", "strength", "positioning"],
    FB: ["pace", "stamina", "crossing", "tackling"],
    DM: ["tackling", "passing", "positioning", "workRate"],
    CM: ["passing", "vision", "decisions", "stamina"],
    AM: ["vision", "firstTouch", "passing", "dribbling"],
    W: ["pace", "dribbling", "crossing", "acceleration"],
    ST: ["finishing", "composure", "heading", "acceleration"],
  };
  const visible = rating255To20(effectivePlayerRating255(player, roleKeys[player.role]));
  const moraleLift = (player.contract.morale - 10) * 0.45;
  const fatigueDrag = (player.fatigue ?? 0) * 0.16;
  const availabilityDrag = isPlayerMatchAvailable(player) ? 0 : 18;
  const staminaLift = (playerStaminaScore(player) - 70) * 0.08;
  return visible * 4 + player.hidden.currentAbility * 0.33 + player.form * 1.5 + player.condition * 0.08 + moraleLift + staminaLift - fatigueDrag - availabilityDrag;
}

function coachReadinessScore(player) {
  const statusPenalty = isPlayerMatchAvailable(player) ? 0 : 999;
  const roleScore = playerScore(player);
  const conditionLift = player.condition * 0.72;
  const staminaLift = playerStaminaScore(player) * 0.58;
  const fatiguePenalty = (player.fatigue ?? 0) * 0.62;
  const moraleLift = player.contract.morale * 1.8;
  const groupLift = player.squadGroup === "senior" ? 5 : player.squadGroup === "sub" ? 3 : player.squadGroup === "u21" ? 1 : 0;
  return roleScore + conditionLift + staminaLift + moraleLift + groupLift - fatiguePenalty - statusPenalty;
}

function coachAutoEleven(teamId = state.userTeamId) {
  const roles = formationRoleSlots(teamById(teamId)?.tactics?.formation);
  const squad = playersForTeam(teamId)
    .filter((player) => isPlayerMatchAvailable(player) && player.condition >= 52 && playerStaminaScore(player) >= 45 && (player.fatigue ?? 0) <= 86)
    .sort((a, b) => coachReadinessScore(b) - coachReadinessScore(a));
  const picked = [];

  roles.forEach((role) => {
    const player = squad.find((candidate) => candidate.role === role && !picked.includes(candidate));
    if (player) picked.push(player);
  });

  squad
    .filter((player) => !picked.includes(player))
    .slice(0, 11 - picked.length)
    .forEach((player) => picked.push(player));

  return picked;
}

function applyCoachAutoLineup() {
  const picked = coachAutoEleven(state.userTeamId);
  if (picked.length < 11) {
    addFeed("Assistant coach could not find 11 fit players. Use rest week or promote academy depth.");
    return render();
  }
  picked.forEach((player) => {
    if (!["senior", "sub"].includes(player.squadGroup)) player.squadGroup = "sub";
  });
  state.lineupPlayerIds = picked.map((player) => player.id);
  state.selectedPlayerId = picked[0]?.id ?? state.selectedPlayerId;
  state.preMatchConfirmed = false;
  const avgCondition = Math.round(average(picked.map((player) => player.condition)));
  const avgFatigue = Math.round(average(picked.map((player) => player.fatigue ?? 0)));
  const avgStamina = Math.round(average(picked.map((player) => playerStaminaScore(player))));
  addFeed(`Assistant coach picked the sharpest XI: avg condition ${avgCondition}%, stamina ${avgStamina}, avg fatigue ${avgFatigue}.`);
  render();
}

function teamPhaseRating(teamId, phase, tactics = teamById(teamId).tactics) {
  const normalized = normalizeTactics(tactics);
  const matrix = mentalityMatrix(normalized);
  const eleven = firstEleven(teamId);
  const keys = {
    attack: ["finishing", "composure", "vision", "passing", "dribbling", "pace"],
    midfield: ["passing", "vision", "decisions", "teamwork", "stamina", "workRate"],
    defense: ["tackling", "positioning", "strength", "heading", "workRate", "decisions"],
    physical: ["pace", "stamina", "strength", "naturalFitness", "agility"],
  };

  const important = state.week >= 32 || state.matchdayPhase === "half";
  const base = average(eleven.map((player) => rating255To20(effectivePlayerRating255(player, keys[phase], { important }))));
  const condition = average(eleven.map((player) => player.condition)) / 100;
  const stamina = average(eleven.map((player) => playerStaminaScore(player))) / 100;
  const fatigue = average(eleven.map((player) => player.fatigue ?? 0)) / 100;
  const playerMorale = average(eleven.map((player) => player.contract.morale)) / 12;
  const morale = (teamById(teamId).morale / 10) * clamp(playerMorale, 0.78, 1.28);
  const talkBoost = teamId === state.userTeamId ? 1 + state.teamTalk.boost : 1;
  const ca = average(eleven.map((player) => player.hidden.currentAbility)) / 10;
  const tacticalIntent =
    phase === "attack"
      ? matrix.risk * (normalized.tempo / 12) * (0.94 + normalized.passingDirectness / 160) * (normalized.possessionWon === "counter" ? 1.04 : 0.98)
      : phase === "defense"
        ? (1 + Math.max(0, -matrix.line) / 42) * (1 + normalized.line / 90) * (0.96 + normalized.defensiveWidth / 240) * (normalized.marking === "manMark" ? 1.025 : 1) * familiarityPenalty(normalized, "positioning")
        : (1 + (normalized.width + matrix.width - 10) / 80) * familiarityPenalty(normalized, "passing");

  return (base * 0.72 + ca * 0.28) * condition * (0.72 + stamina * 0.28) * (1 - fatigue * 0.62) * morale * tacticalIntent * talkBoost;
}

function homeFanPower(teamId) {
  const team = teamById(teamId);
  const reputationHeat = team.reputation / 7;
  const moraleHeat = team.morale / 1.7;
  const attendanceHeat = (team.stadiumAttendance ?? 28_000) / 15000;
  const passionHeat = (team.fanPassion ?? 10) / 3;
  const userTalk = teamId === state.userTeamId ? state.teamTalk.boost * 55 : 0;
  return clamp(Math.round(reputationHeat + moraleHeat + attendanceHeat + passionHeat + userTalk), 8, 28);
}

function complacencyContext(teamId, opponentId) {
  const team = teamById(teamId);
  const opponent = teamById(opponentId);
  const opponentPosition = state.table.findIndex((row) => row.teamId === opponentId) + 1;
  const bottomThree = opponentPosition > Math.max(0, state.table.length - 3);
  const active = (team.winStreak ?? 0) >= 8 && bottomThree && team.reputation >= opponent.reputation + 8;
  return {
    active,
    penalty: active ? clamp(Math.round((team.winStreak - 6) / 2), 1, 3) : 0,
    note: active ? `${team.name} risk complacency after ${team.winStreak} straight wins against a bottom-three opponent.` : "No complacency trigger.",
  };
}

function teamDuelProfile(teamId) {
  const eleven = firstEleven(teamId);
  const keepers = eleven.filter((player) => player.role === "GK");
  const defenders = eleven.filter((player) => ["GK", "CB", "FB", "DM"].includes(player.role));
  const creators = eleven.filter((player) => ["DM", "CM", "AM", "W"].includes(player.role));
  const attackers = eleven.filter((player) => ["ST", "W", "AM", "CM"].includes(player.role));

  return {
    keeper: keepers[0] ? weightedRating(keepers[0], ["agility", "positioning", "decisions", "composure"]) : 10,
    defensiveDuel: average(defenders.map((player) => weightedRating(player, ["tackling", "positioning", "strength", "decisions"]))),
    creation: average(creators.map((player) => weightedRating(player, ["passing", "vision", "firstTouch", "decisions"]))),
    finishing: average(attackers.map((player) => weightedRating(player, ["finishing", "composure", "dribbling", "acceleration"]))),
    condition: average(eleven.map((player) => player.condition)) / 100,
    form: average(eleven.map((player) => player.form)) / 10,
  };
}

function playerShotRating(player) {
  if (!player) return 10;
  return rating255To20(effectivePlayerRating255(player, ["finishing", "composure", "longShots", "dribbling"], { important: state.week >= 32 })) +
    player.form / 3 +
    player.condition / 22;
}

function pickDefender(teamId) {
  const defenders = firstEleven(teamId).filter((player) => ["CB", "FB", "DM"].includes(player.role));
  if (!defenders.length) return null;
  return defenders
    .map((player) => ({
      player,
      weight: weightedRating(player, ["tackling", "positioning", "strength", "decisions"]) + player.condition / 18,
    }))
    .sort((a, b) => b.weight - a.weight)[rand(0, Math.min(4, defenders.length - 1))]?.player;
}

function mentalityRisk(tactic, player = null) {
  const normalized = normalizeTactics(tactic);
  const matrix = mentalityMatrix(normalized);
  const base = matrix.risk;
  const tempo = 0.9 + normalized.tempo / 95;
  const playerRisk =
    player?.instructions?.risk === "higher" ? 1.08 :
      player?.instructions?.risk === "lower" ? 0.92 :
        1;
  const traitRisk =
    player?.traits?.includes("triesKillerBalls") ? 1.06 :
      player?.traits?.includes("playsShortPasses") ? 0.96 :
        1;
  return base * tempo * playerRisk * traitRisk;
}

function playerInstructionEfficiency(player, tactic) {
  if (!player?.instructions) return 1;
  const teamShort = tactic.tempo <= 11;
  const forcedDirect = player.instructions.passing === "direct";
  const forcedShort = player.instructions.passing === "short";
  if ((teamShort && forcedDirect) || (!teamShort && forcedShort && tactic.tempo >= 15)) return 0.94;
  return 1;
}

function normalizeTactics(tactic = {}) {
  return {
    formation: tactic.formation ?? "4-3-3",
    mentality: tactic.mentality ?? "balanced",
    pressing: Number(tactic.pressing ?? 12),
    tempo: Number(tactic.tempo ?? 12),
    width: Number(tactic.width ?? 12),
    line: Number(tactic.line ?? 11),
    passIntoSpace: tactic.passIntoSpace ?? false,
    playOutOfDefence: tactic.playOutOfDefence ?? false,
    counterPress: tactic.counterPress ?? false,
    focusPlay: tactic.focusPlay ?? "balanced",
    passingDirectness: Number(tactic.passingDirectness ?? 10),
    possessionLost: tactic.possessionLost ?? (tactic.counterPress ? "counterPress" : "regroup"),
    possessionWon: tactic.possessionWon ?? "counter",
    defensiveWidth: Number(tactic.defensiveWidth ?? 11),
    marking: tactic.marking ?? "zonal",
    creativeFreedom: tactic.creativeFreedom ?? "flexible",
    setPieces: {
      cornerRoutine: tactic.setPieces?.cornerRoutine ?? "nearPost",
      freeKickRoutine: tactic.setPieces?.freeKickRoutine ?? "bestDelivery",
      throwInRoutine: tactic.setPieces?.throwInRoutine ?? "retainPossession",
      penaltyTakerId: tactic.setPieces?.penaltyTakerId ?? null,
      cornerTakerId: tactic.setPieces?.cornerTakerId ?? null,
      freeKickTakerId: tactic.setPieces?.freeKickTakerId ?? null,
    },
    cohesion: Number(tactic.cohesion ?? 62),
    familiarity: {
      mentality: tactic.familiarity?.mentality ?? 62,
      tempo: tactic.familiarity?.tempo ?? 62,
      passing: tactic.familiarity?.passing ?? 62,
      creative: tactic.familiarity?.creative ?? 62,
      positioning: tactic.familiarity?.positioning ?? 62,
      pressing: tactic.familiarity?.pressing ?? 62,
      marking: tactic.familiarity?.marking ?? 62,
      roles: tactic.familiarity?.roles ?? 62,
    },
  };
}

function mentalityMatrix(tactic = {}) {
  const normalized = normalizeTactics(tactic);
  const matrix = {
    veryDefensive: { risk: 0.62, urgency: 1.34, line: -10, engagement: -8, width: -5, hold: 1.3 },
    defensive: { risk: 0.74, urgency: 1.2, line: -6, engagement: -5, width: -3, hold: 1.15 },
    cautious: { risk: 0.84, urgency: 1.1, line: -3, engagement: -2, width: -1, hold: 1.08 },
    balanced: { risk: 1, urgency: 1, line: 0, engagement: 0, width: 0, hold: 1 },
    positive: { risk: 1.16, urgency: 0.88, line: 4, engagement: 4, width: 3, hold: 0.9 },
    attacking: { risk: 1.32, urgency: 0.78, line: 7, engagement: 7, width: 5, hold: 0.78 },
    veryAttacking: { risk: 1.5, urgency: 0.66, line: 10, engagement: 10, width: 7, hold: 0.66 },
  };
  return matrix[normalized.mentality] ?? matrix.balanced;
}

function familiarityPenalty(tactic = {}, area = "positioning") {
  const normalized = normalizeTactics(tactic);
  const value = normalized.familiarity?.[area] ?? 62;
  const cohesion = normalized.cohesion ?? 62;
  return clamp((1 - (100 - value) / 260) * (0.86 + cohesion / 700), 0.58, 1.04);
}

function creativeFreedomMultiplier(tactic = {}) {
  const normalized = normalizeTactics(tactic);
  const familiarity = familiarityPenalty(normalized, "creative");
  const freedom = normalized.creativeFreedom;
  if (freedom === "expressive") return { flair: 1.22 * familiarity, discipline: 0.88, optionNoise: 1.18 * familiarity };
  if (freedom === "disciplined") return { flair: 0.78, discipline: 1.18 * familiarity, optionNoise: 0.72 };
  return { flair: familiarity, discipline: 1, optionNoise: familiarity };
}

function dutyModifier(player, ball, side, hasBall) {
  const duty = player.roleDuty?.toLowerCase() ?? "";
  const forward = side === "home" ? -1 : 1;
  if (duty.includes("defend")) return hasBall ? forward * 2 : forward * -1;
  if (duty.includes("attack")) return hasBall ? forward * 7 : forward * 2;
  return hasBall ? (ball.y - 50) * 0.05 : 0;
}

function teamFluidityProfile(teamId, tactic = teamById(teamId)?.tactics) {
  const normalized = normalizeTactics(tactic);
  const duties = firstEleven(teamId).map((player) => player.roleDuty?.split(" ").at(-1)?.toLowerCase() ?? "support");
  const defend = duties.filter((duty) => duty === "defend").length;
  const support = duties.filter((duty) => duty === "support").length;
  const attack = duties.filter((duty) => duty === "attack").length;
  const spread = Math.max(defend, support, attack) - Math.min(defend, support, attack);
  const labelText = normalized.creativeFreedom === "expressive" || spread <= 2
    ? "Fluid"
    : normalized.creativeFreedom === "disciplined" || spread >= 6
      ? "Rigid"
      : "Flexible";
  return {
    label: labelText,
    defend,
    support,
    attack,
    creativeModifier: creativeFreedomMultiplier(normalized),
  };
}

function vectorDistance(a, b) {
  return Math.hypot((a.x ?? 0) - (b.x ?? 0), (a.y ?? 0) - (b.y ?? 0));
}

function determinePlayerAiState(player, ball, possessionSide, closestId) {
  if (ball.controllerId === player.id) return "IN_POSSESSION";
  if (ball.controllerId != null) return possessionSide === player.side ? "SUPPORT_RUN" : "DEFENDING_POSITION";
  return closestId === player.id ? "CHASE_BALL" : "OFF_BALL_RUN";
}

function snapshotAbstractEngineFrame(absoluteTick, minute, tick, possessionSide, ball, homePlayers, awayPlayers) {
  const allPlayers = [
    ...homePlayers.map((player) => ({ ...player, side: "home" })),
    ...awayPlayers.map((player) => ({ ...player, side: "away" })),
  ];
  const closestId = allPlayers
    .map((player) => ({ id: player.id, distance: vectorDistance(player, ball) }))
    .sort((a, b) => a.distance - b.distance)[0]?.id ?? null;
  return {
    absoluteTick,
    minute,
    second: Number(((tick - 1) * MATCH_TICK_SECONDS).toFixed(2)),
    possession: possessionSide,
    ball: { ...ball, target: ball.target ? { ...ball.target } : null, visualCommand: ball.visualCommand ? { ...ball.visualCommand } : null },
    objects: 23,
    players: {
      home: homePlayers.map((player) => ({ ...player, aiState: determinePlayerAiState({ ...player, side: "home" }, ball, possessionSide, closestId) })),
      away: awayPlayers.map((player) => ({ ...player, aiState: determinePlayerAiState({ ...player, side: "away" }, ball, possessionSide, closestId) })),
    },
  };
}

function pushRewindFrame(trace, frame) {
  const buffer = trace.rewindBuffer;
  if (buffer.length < REWIND_BUFFER_LIMIT) {
    buffer.push(frame);
  } else {
    buffer[trace.rewindCursor] = frame;
    trace.rewindCursor = (trace.rewindCursor + 1) % REWIND_BUFFER_LIMIT;
  }
  trace.rewindCount = Math.min((trace.rewindCount ?? 0) + 1, REWIND_BUFFER_LIMIT);
}

function orderedRewindFrames(trace) {
  const buffer = trace?.rewindBuffer ?? [];
  if (buffer.length < REWIND_BUFFER_LIMIT || !trace.rewindCursor) return [...buffer];
  return [...buffer.slice(trace.rewindCursor), ...buffer.slice(0, trace.rewindCursor)];
}

function logAbstractMatchEvent(match, entry) {
  match.engineTrace.matchLog = match.engineTrace.matchLog ?? [];
  match.engineTrace.matchLog.push(entry);
  if (match.engineTrace.matchLog.length > 220) match.engineTrace.matchLog.shift();
}

function decisionIntervalTicks(player, tactic = {}) {
  const cognition = effectivePlayerRating255(player, ["anticipation", "decisions", "composure"]) * familiarityPenalty(tactic, "mentality");
  const urgency = mentalityMatrix(tactic).urgency;
  return clamp(Math.round((30 - cognition / 13) * urgency), 4, 34);
}

function coneOfVisionOptions(actor, teammates, opponents, ball) {
  const facing = { x: ball.vx >= 0 ? 1 : -1, y: ball.vy / Math.max(1, Math.abs(ball.vx) + Math.abs(ball.vy)) };
  return teammates
    .filter((mate) => mate.id !== actor.id)
    .map((mate) => {
      const toMate = { x: mate.x - actor.x, y: mate.y - actor.y };
      const distance = Math.max(1, Math.hypot(toMate.x, toMate.y));
      const dot = (toMate.x * facing.x + toMate.y * facing.y) / distance;
      const pressure = opponents.filter((opp) => vectorDistance(opp, mate) < CONTROL_RADIUS * 2.2).length;
      return { mate, distance, pressure, visible: dot > -0.25 && distance <= VISION_RANGE };
    })
    .filter((option) => option.visible);
}

function weightedChoice(options) {
  const total = options.reduce((sum, option) => sum + Math.max(0, option.weight), 0);
  if (total <= 0) return options[0];
  let roll = Math.random() * total;
  for (const option of options) {
    roll -= Math.max(0, option.weight);
    if (roll <= 0) return option;
  }
  return options[options.length - 1];
}

function generateActionOptions(actorPlayer, actorState, teammateStates, opponentStates, tactic, ball, side) {
  const normalized = normalizeTactics(tactic);
  const visionOptions = coneOfVisionOptions(actorState, teammateStates, opponentStates, ball);
  const pressure = opponentStates.filter((opp) => vectorDistance(opp, actorState) < CONTROL_RADIUS * 1.8).length;
  const freedom = creativeFreedomMultiplier(normalized);
  const decision = effectivePlayerRating255(actorPlayer, ["decisions", "vision", "composure"]) * familiarityPenalty(normalized, "passing");
  const risk = mentalityRisk(normalized, actorPlayer) * mentalityMatrix(normalized).risk;
  const goalDistance = side === "home" ? 95 - actorState.x : actorState.x - 5;
  const canShoot = goalDistance < 28 || actorPlayer.role === "ST";
  const killerBall = actorPlayer.traits?.includes("triesKillerBalls") ? 1.28 : 1;
  const directness = clamp(normalized.passingDirectness / 10, 0.55, 1.65);
  const transitionRush = normalized.possessionWon === "counter" ? 1.18 : 0.88;
  const shootInstruction = actorPlayer.instructions?.shooting === "more" ? 1.26 : actorPlayer.instructions?.shooting === "less" ? 0.74 : 1;
  const targetForwardOption = visionOptions.find((option) => option.mate.duty?.includes("Target Forward"));
  const safeBias = clamp(decision / 190, 0.62, 1.22);
  const shortOptions = visionOptions.filter((option) => option.distance <= (normalized.playOutOfDefence && ["GK", "CB", "FB"].includes(actorPlayer.role) ? 18 : 42));
  const forwardOptions = visionOptions.filter((option) => side === "home" ? option.mate.x > actorState.x : option.mate.x < actorState.x);
  const directTarget = (normalized.passIntoSpace ? forwardOptions : visionOptions).sort((a, b) => b.distance - a.distance)[0]?.mate;
  return [
    { type: "pass", target: shortOptions.sort((a, b) => a.pressure - b.pressure)[0]?.mate, weight: (normalized.playOutOfDefence && ["GK", "CB", "FB"].includes(actorPlayer.role) ? 52 : 38) * safeBias / directness },
    { type: "through_ball", target: directTarget, weight: 16 * risk * killerBall * directness * transitionRush * (normalized.passIntoSpace ? 1.34 : 1) },
    { type: "target_forward", target: targetForwardOption?.mate, weight: targetForwardOption ? 34 : 0 },
    { type: "dribble", weight: (actorPlayer.traits?.includes("runsWithBall") ? 24 : 14) * risk * freedom.flair / Math.max(1, pressure) },
    { type: "shoot", weight: canShoot ? (22 + (actorPlayer.role === "ST" ? 16 : 0)) * risk * freedom.optionNoise * shootInstruction : 2 },
    { type: "recycle", target: visionOptions.sort((a, b) => a.distance - b.distance)[0]?.mate, weight: pressure > 1 ? 24 * safeBias * freedom.discipline : 10 },
  ].filter((option) => !["pass", "through_ball", "target_forward", "recycle"].includes(option.type) || option.target);
}

function passTargetVector(actorPlayer, action, actorState, tactic, pressure, environment = environmentalMatrix("clear")) {
  const normalized = normalizeTactics(tactic);
  const target = action.target ?? actorState;
  const passing = effectivePlayerRating255(actorPlayer, ["passing", "technique", "vision", "composure"]) * familiarityPenalty(normalized, "passing");
  const pressureError = pressure * 1.8 + (tactic.pressing > 14 ? 1.4 : 0);
  const weatherError = 1.25 + (1 - environment.passAccuracy) * 8;
  const baseError = clamp((255 - passing) / 28 + pressureError + weatherError, 1, 13);
  const mentalRisk = mentalityMatrix(normalized).risk;
  const intoSpace = ["through_ball", "target_forward"].includes(action.type)
    ? (normalized.passIntoSpace ? 8 : 4) * mentalRisk
    : 0;
  return {
    x: clamp(target.x + (actorState.x < target.x ? intoSpace : -intoSpace) + rand(-baseError, baseError), 3, 97),
    y: clamp(target.y + rand(-baseError, baseError), 4, 96),
    z: action.type === "target_forward" ? rand(5, 11) : action.type === "through_ball" ? rand(0, 5) : rand(0, 2),
    error: baseError,
  };
}

function shotTargetVector(side, shooter, xg, onTarget, goalChance) {
  const goalX = side === "home" ? 98 : 2;
  const topCorner = shooter?.attributes?.technique >= 15 || shooter?.attributes?.composure >= 15;
  const leftOrRight = chance(0.5) ? -1 : 1;
  const cornerY = topCorner ? (leftOrRight < 0 ? 35 : 65) : rand(40, 60);
  const missDrift = onTarget ? 0 : leftOrRight * rand(8, 18);
  return {
    x: goalX,
    y: clamp(cornerY + missDrift, 8, 92),
    z: clamp(onTarget ? 4 + xg * 22 : rand(2, 18), 0, 26),
    magnet: onTarget ? clamp(0.18 + goalChance * 1.8, 0.18, 0.72) : 0.05,
    outcome: onTarget ? "on_target" : "miss",
  };
}

function translateActionToVisualCommand(action, actorPlayer, actorState, side, context = {}) {
  const target = action.target ?? context.target ?? actorState;
  const actionMap = {
    pass: "PASS",
    recycle: "PASS",
    through_ball: "PASS",
    target_forward: "PASS",
    dribble: "SPRINT",
    shoot: "SHOOT",
    tackle: "TACKLE",
  };
  return {
    playerId: actorPlayer?.id ?? null,
    team: side.toUpperCase(),
    action: actionMap[action.type] ?? "IDLE",
    target: [target.x ?? actorState.x, target.y ?? actorState.y, target.z ?? 0],
    warp: {
      hipYaw: clamp(((target.y ?? actorState.y) - actorState.y) * 1.4, -38, 38),
      footPlant: [target.x ?? actorState.x, target.y ?? actorState.y, target.z ?? 0],
      blendMs: action.type === "shoot" ? 180 : 110,
    },
    hybridPhysics: {
      magnet: context.magnet ?? 0,
      destination: context.destination ?? [target.x ?? actorState.x, target.y ?? actorState.y, target.z ?? 0],
    },
    impact: {
      ragdollImpulse: context.ragdollImpulse ?? 0,
      foul: Boolean(context.foul),
      wetSlide: Boolean(context.wetSlide),
    },
  };
}

function resolveDuel(attacker, defender, type, pressure = 1) {
  if (!attacker || !defender) return { winner: "attacker", margin: 12 };
  const matrices = {
    carry: {
      attack: ["dribbling", "agility", "flair", "balance", "acceleration"],
      defense: ["tackling", "positioning", "anticipation", "strength"],
      body: (player) => (player.weightKg ?? 76) / 8,
    },
    header: {
      attack: ["jumping", "heading", "bravery", "strength"],
      defense: ["jumping", "heading", "bravery", "positioning"],
      body: (player) => (player.heightCm ?? 180) / 7,
    },
    shoulder: {
      attack: ["balance", "strength", "aggression"],
      defense: ["strength", "aggression", "balance"],
      body: (player) => (player.weightKg ?? 76) / 6,
    },
  };
  const matrix = matrices[type] ?? matrices.carry;
  const attackCap = effectivePlayerRating255(attacker, matrix.attack) + matrix.body(attacker) - pressure * 6;
  const defenseCap = effectivePlayerRating255(defender, matrix.defense) + matrix.body(defender);
  const attackRoll = rand(1, Math.max(2, attackCap));
  const defenseRoll = rand(1, Math.max(2, defenseCap));
  const collisionForce = Math.round(Math.abs(attackRoll - defenseRoll) / 8 + pressure * 4 + ((defender?.hidden.dirtiness ?? 8) + (defender?.attributes.aggression ?? 10)) / 4);
  const ragdollImpulse = clamp(collisionForce / 34, 0.12, 1.35);
  return {
    winner: attackRoll >= defenseRoll ? "attacker" : "defender",
    margin: Math.round(Math.abs(attackRoll - defenseRoll)),
    attackRoll: Math.round(attackRoll),
    defenseRoll: Math.round(defenseRoll),
    collisionForce,
    ragdollImpulse,
    activeRagdoll: collisionForce >= 18 || pressure >= 3,
  };
}

function defensiveLineDrift(player, tactic, ball, side) {
  const normalized = normalizeTactics(tactic);
  const matrix = mentalityMatrix(normalized);
  const anchor = side === "home" ? 70 - normalized.line - matrix.line : 30 + normalized.line + matrix.line;
  const awareness = effectivePlayerRating255(player, ["positioning", "anticipation", "concentration"]) * familiarityPenalty(normalized, "positioning");
  const drift = clamp((180 - awareness) / 20, 0, 7);
  const ballPull = (ball.y - anchor) * 0.035;
  return {
    anchor,
    drift: rand(-drift, drift) + ballPull,
    offsideRisk: awareness < 125 && tactic.line >= 14,
  };
}

function tickPlayerPositions(teamId, side, possessionSide, ball, tactic, emergencyPress = null) {
  const normalized = normalizeTactics(tactic);
  const matrix = mentalityMatrix(normalized);
  const lineup = firstEleven(teamId);
  const shape = teamId === state.userTeamId && state.formationPositions?.length === 11
    ? state.formationPositions.map(({ label, x, y }, index) => [label ?? formationShape(normalized.formation)[index]?.[0] ?? "MC", x, y])
    : formationShape(normalized.formation);
  const hasBall = side === possessionSide;
  const linePush = (normalized.line - 10) * 0.75 + matrix.line;
  const widthScale = clamp(1 + ((normalized.width - 10 + matrix.width) * familiarityPenalty(normalized, "width")) / 42, 0.74, 1.28);
  const focusShift = hasBall ? normalized.focusPlay === "left" ? -4 : normalized.focusPlay === "right" ? 4 : 0 : 0;
  const positions = lineup.map((player, index) => {
    const slot = shape[index] ?? ["CM", 50, 50];
    const mirrorY = side === "home" ? slot[2] : 100 - slot[2];
    const inverted = player.roleDuty?.includes("Inverted") && hasBall && player.role === "FB";
    const dutyY = dutyModifier(player, ball, side, hasBall) * familiarityPenalty(normalized, "roles");
    const baseX = 50 + (slot[1] - 50) * widthScale + focusShift;
    const xDrift = inverted ? (50 - baseX) * 0.52 : (ball.x - baseX) * (hasBall ? 0.08 : 0.045);
    const zonal = ["CB", "FB", "DM"].includes(player.role) && !hasBall ? defensiveLineDrift(player, normalized, ball, side) : { drift: 0, offsideRisk: false };
    const yDrift = (ball.y - mirrorY) * (hasBall ? 0.1 : 0.06) - linePush * (side === "home" ? 0.12 : -0.12) + zonal.drift + dutyY;
    return {
      id: player.id,
      teamId: player.teamId,
      name: player.name,
      role: player.role,
      duty: player.roleDuty,
      x: clamp(Math.round(baseX + xDrift + rand(-2, 2)), 4, 96),
      y: clamp(Math.round(mirrorY + yDrift + rand(-2, 2)), 5, 95),
      vx: clamp((ball.x - slot[1]) / 12, -6, 6),
      vy: clamp((ball.y - mirrorY) / 12, -6, 6),
      direction: Math.round((Math.atan2(ball.y - mirrorY, ball.x - slot[1]) * 180) / Math.PI),
      offsideRisk: zonal.offsideRisk,
      condition: player.condition,
      stamina: playerStaminaScore(player),
      fatigue: player.fatigue ?? 0,
      morale: player.contract.morale,
    };
  });
  if (emergencyPress?.side === side) {
    const pressingIds = positions
      .map((position) => ({ id: position.id, distance: vectorDistance(position, ball) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, emergencyPress.count ?? 4)
      .map((entry) => entry.id);
    positions.forEach((position) => {
      if (!pressingIds.includes(position.id)) return;
      position.x = clamp(Math.round(position.x + (ball.x - position.x) * 0.62), 4, 96);
      position.y = clamp(Math.round(position.y + (ball.y - position.y) * 0.62), 5, 95);
      position.counterPressing = true;
    });
  }
  return positions;
}

function runMatchMinuteTicks(match, minute, context, homeId, awayId, homeTactics, awayTactics, momentum) {
  const environment = context.environment ?? environmentalMatrix("clear");
  let possessionSide = "home";
  let finalHomeHasBall = true;
  let ball = match.tickState?.ball ?? { x: 50, y: 50, z: 0, vx: 0, vy: 0, vz: 0, state: "Ball_Free", controllerId: null };
  let lastHomePlayers = match.tickState?.players?.home ?? tickPlayerPositions(homeId, "home", "home", ball, homeTactics);
  let lastAwayPlayers = match.tickState?.players?.away ?? tickPlayerPositions(awayId, "away", "home", ball, awayTactics);
  const homePlayers = firstEleven(homeId);
  const awayPlayers = firstEleven(awayId);
  let previousPossession = match.tickState?.possession ?? possessionSide;

  for (let tick = 1; tick <= MATCH_TICKS_PER_MINUTE; tick += 1) {
    const absoluteTick = (minute - 1) * MATCH_TICKS_PER_MINUTE + tick;
    const homeWeight =
      context.homeRatings.midfield * context.homeAdvantage * (1 + momentum.home / 12) * (1 + (homeTactics.tempo - awayTactics.pressing) / 95);
    const awayWeight =
      context.awayRatings.midfield * context.awayComposurePressure * (1 + momentum.away / 12) * (1 + (awayTactics.tempo - homeTactics.pressing) / 95);
    finalHomeHasBall = Math.random() < homeWeight / (homeWeight + awayWeight);
    possessionSide = finalHomeHasBall ? "home" : "away";
    match.stats[possessionSide].possessionTouches += 1;
    if (possessionSide !== previousPossession) {
      const lostSide = previousPossession;
      const lostTactic = lostSide === "home" ? normalizeTactics(homeTactics) : normalizeTactics(awayTactics);
      if (lostTactic.possessionLost === "counterPress") {
        match.engineTrace.counterPresses += 1;
        const pressFamiliarity = familiarityPenalty(lostTactic, "transition") * familiarityPenalty(lostTactic, "pressing");
        match.engineTrace.counterPress = {
          side: lostSide,
          startTick: absoluteTick,
          expiresTick: absoluteTick + Math.round(rand(5, 7) * MATCH_LOGIC_TICK_RATE * pressFamiliarity),
          count: clamp(Math.round(4 * pressFamiliarity), 2, 4),
        };
      }
      previousPossession = possessionSide;
    }
    if (match.engineTrace.counterPress && absoluteTick > match.engineTrace.counterPress.expiresTick) {
      match.engineTrace.counterPress = null;
    }

    const tactic = normalizeTactics(finalHomeHasBall ? homeTactics : awayTactics);
    const teamId = finalHomeHasBall ? homeId : awayId;
    const activeLineup = finalHomeHasBall ? homePlayers : awayPlayers;
    const activeStates = finalHomeHasBall ? lastHomePlayers : lastAwayPlayers;
    const opponentStates = finalHomeHasBall ? lastAwayPlayers : lastHomePlayers;
    const actorState = activeStates
      .map((state) => ({ state, distance: vectorDistance(state, ball) }))
      .sort((a, b) => a.distance - b.distance)[0]?.state;
    const actorPlayer = actorState ? activeLineup.find((player) => player.id === actorState.id) : null;
    const runtimeDrag = actorPlayer ? (match.engineTrace.runtimeFatigue[actorPlayer.id] ?? 0) : 0;
    const controlRadius = CONTROL_RADIUS + (actorPlayer ? effectivePlayerRating255(actorPlayer, ["firstTouch", "technique", "agility"]) / 255 - runtimeDrag / 90 : 0);
    const inControl = actorState && vectorDistance(actorState, ball) <= controlRadius;

    if (inControl && actorPlayer) {
      ball.state = opponentStates.some((opp) => vectorDistance(opp, actorState) < CONTROL_RADIUS) ? "Ball_In_Contest" : "Within_Control_Radius";
      ball.controllerId = actorPlayer.id;
      const interval = clamp(decisionIntervalTicks(actorPlayer, tactic) + Math.round(runtimeDrag / 8), 4, 38);
      if ((tick + String(actorPlayer.id).length + minute) % interval === 0) {
        const options = generateActionOptions(actorPlayer, actorState, activeStates, opponentStates, tactic, ball, possessionSide);
        const action = weightedChoice(options);
        const pressure = opponentStates.filter((opp) => vectorDistance(opp, actorState) < CONTROL_RADIUS * 1.8).length;
        match.engineTrace.decisions += 1;
        match.engineTrace.lastDecision = { minute, tick, player: actorPlayer.name, action: action.type, pressure, options: options.length };
        logAbstractMatchEvent(match, {
          tick: absoluteTick,
          gameMinute: minute,
          eventType: action.type.toUpperCase(),
          actorId: actorPlayer.id,
          actor: actorPlayer.name,
          startPos: { x: Number(ball.x.toFixed(2)), y: Number(ball.y.toFixed(2)) },
          pressure,
          aiState: "IN_POSSESSION",
          dangerous: action.type === "shoot",
        });
        match.engineTrace.passingLanes = options.filter((option) => ["pass", "through_ball", "target_forward", "recycle"].includes(option.type)).length;
        match.engineTrace.translationCommands = match.engineTrace.translationCommands ?? [];
        if (["pass", "through_ball", "target_forward", "recycle"].includes(action.type)) {
          const target = passTargetVector(actorPlayer, action, actorState, tactic, pressure, environment);
          ball.vx = clamp((target.x - ball.x) / 18, -4.4, 4.4);
          ball.vy = clamp((target.y - ball.y) / 18, -4.4, 4.4);
          ball.vz = clamp((target.z - (ball.z ?? 0)) / 10, -1.2, 1.2);
          ball.spin = clamp((ball.spin ?? 0) + rand(-8, 8) + (action.type === "through_ball" ? 6 : 0), -30, 30);
          ball.target = target;
          ball.visualCommand = translateActionToVisualCommand(action, actorPlayer, actorState, possessionSide, {
            target,
            destination: [target.x, target.y, target.z],
            magnet: action.type === "through_ball" ? 0.16 : 0.08,
          });
          match.engineTrace.translationCommands.push(ball.visualCommand);
          if (match.engineTrace.translationCommands.length > 14) match.engineTrace.translationCommands.shift();
          match.engineTrace.passErrors.push(Number(target.error.toFixed(1)));
          if (match.engineTrace.passErrors.length > 12) match.engineTrace.passErrors.shift();
        } else if (action.type === "dribble") {
          const nearestDefender = opponentStates.sort((a, b) => vectorDistance(a, actorState) - vectorDistance(b, actorState))[0];
          const defender = nearestDefender ? (finalHomeHasBall ? awayPlayers : homePlayers).find((player) => player.id === nearestDefender.id) : null;
          const duel = resolveDuel(actorPlayer, defender, "carry", pressure);
          match.engineTrace.duels += 1;
          match.engineTrace.lastDuel = duel;
          maybeCollisionInjury(duel, actorPlayer, defender, minute, match);
          if (duel.winner === "attacker") {
            ball.vx += finalHomeHasBall ? 0.55 : -0.55;
            ball.vy += rand(-1, 1) * 0.35;
          } else {
            possessionSide = finalHomeHasBall ? "away" : "home";
            finalHomeHasBall = !finalHomeHasBall;
            ball.state = "Ball_In_Contest";
            momentum[possessionSide] += 0.08;
          }
          ball.visualCommand = translateActionToVisualCommand({ type: duel.activeRagdoll ? "tackle" : "dribble" }, actorPlayer, actorState, possessionSide, {
            target: nearestDefender ?? actorState,
            magnet: 0,
            ragdollImpulse: duel.ragdollImpulse,
            foul: duel.activeRagdoll && duel.collisionForce >= 24,
            wetSlide: environment.pitchKey === "wet",
          });
        } else if (action.type === "shoot") {
          ball.vx = finalHomeHasBall ? clamp((96 - ball.x) / 10, 2.2, 6) : clamp((4 - ball.x) / 10, -6, -2.2);
          ball.vy += rand(-2, 2);
          ball.vz = rand(2, 7) / 2;
          ball.state = "Ball_Free";
          const target = shotTargetVector(possessionSide, actorPlayer, 0.14, true, 0.08);
          ball.target = target;
          ball.visualCommand = translateActionToVisualCommand(action, actorPlayer, actorState, possessionSide, {
            target,
            destination: [target.x, target.y, target.z],
            magnet: target.magnet,
          });
          match.engineTrace.translationCommands.push(ball.visualCommand);
          if (match.engineTrace.translationCommands.length > 14) match.engineTrace.translationCommands.shift();
        }
      }
    } else {
      ball.state = "Ball_Free";
      ball.controllerId = null;
    }

    if (tick % MATCH_LOGIC_TICK_RATE === 0) {
      homePlayers.concat(awayPlayers).forEach((player) => {
        const playerTactic = normalizeTactics(player.teamId === homeId ? homeTactics : awayTactics);
        const playerMatrix = mentalityMatrix(playerTactic);
        const tacticLoad = (playerTactic.pressing / 26 + playerTactic.tempo / 34 + Math.max(0, 1 - playerMatrix.hold) * 0.32) * environment.accelerationDrag;
        const staminaRelief = (player.attributes.stamina + player.attributes.naturalFitness) / 90;
        match.engineTrace.runtimeFatigue[player.id] = clamp((match.engineTrace.runtimeFatigue[player.id] ?? 0) + tacticLoad - staminaRelief, 0, 40);
      });
    }

    const attackDirection = finalHomeHasBall ? 1 : -1;
    const matrix = mentalityMatrix(tactic);
    const verticalPush = ((5 + matrix.engagement / 2) + tactic.tempo / 6) / MATCH_LOGIC_TICK_RATE;
    ball = {
      ...ball,
      ax: clamp((ball.target?.x ? (ball.target.x - ball.x) * (ball.target.magnet ?? 0.08) / 140 : 0) + (ball.spin ?? 0) / 9000, -0.16, 0.16),
      ay: clamp((ball.target?.y ? (ball.target.y - ball.y) * (ball.target.magnet ?? 0.08) / 140 : 0) + (ball.spin ?? 0) / 12000, -0.16, 0.16),
      x: clamp(ball.x + ball.vx + (ball.ax ?? 0) + attackDirection * verticalPush + rand(-1, 1) * 0.18, 5, 95),
      y: clamp(ball.y + ball.vy + (ball.ay ?? 0) + (tactic.width - 10) * (Math.random() - 0.5) / MATCH_LOGIC_TICK_RATE, 8, 92),
      z: clamp((ball.z ?? 0) + (ball.vz ?? 0), 0, 28),
      vx: clamp((ball.vx ?? 0) * environment.ballDrag, -6, 6),
      vy: clamp((ball.vy ?? 0) * environment.ballDrag, -6, 6),
      vz: clamp(((ball.vz ?? 0) - 0.08) * 0.94, -3, 5),
      spin: clamp((ball.spin ?? 0) * environment.spinDecay, -30, 30),
      state: ball.state ?? "Ball_Free",
    };

    if (tick % MATCH_LOGIC_TICK_RATE === 0 || tick === MATCH_TICKS_PER_MINUTE) {
      lastHomePlayers = tickPlayerPositions(homeId, "home", possessionSide, ball, homeTactics, match.engineTrace.counterPress);
      lastAwayPlayers = tickPlayerPositions(awayId, "away", possessionSide, ball, awayTactics, match.engineTrace.counterPress);
    }

    const recordFrame = tick % REWIND_SAMPLE_INTERVAL === 0 || tick === MATCH_TICKS_PER_MINUTE;
    const sample = recordFrame
      ? snapshotAbstractEngineFrame(absoluteTick, minute, tick, possessionSide, ball, lastHomePlayers, lastAwayPlayers)
      : null;
    if (sample) pushRewindFrame(match.engineTrace, sample);
    if (sample && (tick === MATCH_TICKS_PER_MINUTE || (minute % 5 === 0 && tick === MATCH_LOGIC_TICK_RATE * 8))) {
      match.tickState = sample;
      if (match.tickSamples.length < 46 && (minute % 3 === 0 || match.tickSamples.length < 4)) match.tickSamples.push(sample);
    }
  }

  return { homeHasBall: finalHomeHasBall, side: possessionSide, ball };
}

function simulateMatch(homeId, awayId, options = {}) {
  const home = teamById(homeId);
  const away = teamById(awayId);
  const weatherKey = options.weather ?? ["clear", "rain", "wind", "heat", "snow"][rand(0, 4)];
  let weather = WEATHER[weatherKey];
  const fromMinute = options.fromMinute ?? 1;
  const toMinute = options.toMinute ?? 90;
  const continuingMatch = options.initialMatch ?? null;
  const environment = continuingMatch?.environment ?? environmentalMatrix(weatherKey);
  const homeTactics = homeId === state.userTeamId ? state.tactics : home.tactics;
  const awayTactics = awayId === state.userTeamId ? state.tactics : away.tactics;
  const homeLineup = firstEleven(homeId);
  const awayLineup = firstEleven(awayId);
  const match = continuingMatch ?? {
    homeId,
    awayId,
    weather: weatherKey,
    environment,
    applied: false,
    lineups: {
      home: homeLineup.map((player) => player.id),
      away: awayLineup.map((player) => player.id),
    },
    score: { home: 0, away: 0 },
    stats: {
      home: { shots: 0, onTarget: 0, possessionTouches: 0, xg: 0 },
      away: { shots: 0, onTarget: 0, possessionTouches: 0, xg: 0 },
    },
    events: [],
    replay: [],
    specialStates: [],
    assistantAlerts: [],
    weatherTimeline: [{ minute: fromMinute, weather: weatherKey, label: WEATHER[weatherKey].notes }],
    highlights: [],
    highlightClips: [],
    tickSamples: [],
    tickState: null,
    engineTrace: {
      ticksPerSecond: MATCH_LOGIC_TICK_RATE,
      objectCount: 23,
      decisions: 0,
      duels: 0,
      passErrors: [],
      lastDecision: null,
      runtimeFatigue: {},
      rewindBuffer: [],
      rewindCursor: 0,
      rewindCount: 0,
      matchLog: [],
      highlightTriggers: 0,
      passingLanes: 0,
      interrupts: [],
      counterPresses: 0,
      counterPress: null,
      translationCommands: [],
      lastDuel: null,
      tacticalMatrix: {
        home: mentalityMatrix(homeTactics),
        away: mentalityMatrix(awayTactics),
        homeFamiliarity: normalizeTactics(homeTactics).familiarity,
        awayFamiliarity: normalizeTactics(awayTactics).familiarity,
      },
    },
    analysis: {},
  };

  if (!continuingMatch) {
    homeLineup
      .concat(awayLineup)
      .forEach((player) => {
        player.stats.appearances += 1;
      });
  }
  const importantMatch = options.competition === "cup" || state.week >= Math.max(1, state.fixtures.length - 5);
  const fanPower = homeFanPower(homeId);
  const homeComplacency = complacencyContext(homeId, awayId);
  const awayComplacency = complacencyContext(awayId, homeId);
  homeLineup.concat(awayLineup).forEach((player) => {
    player.matchProfile = matchAttributeProfile(player, importantMatch);
  });
  homeLineup.forEach((player) => {
    const cautiousRelief = homeId === state.userTeamId && state.teamTalk.lastStyle === "Cautious" ? 1 : 0;
    player.matchProfile.contextPenalty = Math.max(0, homeComplacency.penalty - cautiousRelief);
  });
  awayLineup.forEach((player) => {
    const crowdAnxiety = player.age <= 22 && (player.hidden.pressure ?? 10) <= 10 && chance(clamp(fanPower / 55, 0.08, 0.56)) ? 1 : 0;
    const cautiousRelief = awayId === state.userTeamId && state.teamTalk.lastStyle === "Cautious" ? 1 : 0;
    player.matchProfile.contextPenalty = Math.max(0, awayComplacency.penalty - cautiousRelief) + crowdAnxiety;
    player.matchProfile.crowdAnxiety = crowdAnxiety > 0;
  });
  const matchReadyStats = continuingMatch?.analysis?.matchReadyStats ?? {
    home: buildMatchReadyStats(homeLineup, homeTactics, importantMatch),
    away: buildMatchReadyStats(awayLineup, awayTactics, importantMatch),
  };

  const mediaHomePressure = state.mediaPressure?.teamId === homeId ? state.mediaPressure.intensity / 500 : 0;
  const mediaAwayPressure = state.mediaPressure?.teamId === awayId ? state.mediaPressure.intensity / 500 : 0;
  const homeAdvantage = (1 + fanPower / 180) * (1 - mediaHomePressure);
  const awayComposurePressure = (1 - fanPower / 520) * (1 - mediaAwayPressure);
  const homeProfile = teamDuelProfile(homeId);
  const awayProfile = teamDuelProfile(awayId);
  const homeWidthModifier = environment.widthEffect === "narrow" && homeTactics.width >= 14 ? 0.94 : environment.widthEffect === "wide" && homeTactics.width >= 13 ? 1.03 : 1;
  const awayWidthModifier = environment.widthEffect === "narrow" && awayTactics.width >= 14 ? 0.94 : environment.widthEffect === "wide" && awayTactics.width >= 13 ? 1.03 : 1;
  const context = {
    homeAdvantage,
    fanPower,
    awayComposurePressure,
    weather,
    environment,
    homeTactics,
    awayTactics,
    homeRatings: {
      attack: teamPhaseRating(homeId, "attack", homeTactics) * homeWidthModifier,
      midfield: teamPhaseRating(homeId, "midfield", homeTactics) * environment.passAccuracy,
      defense: teamPhaseRating(homeId, "defense", homeTactics),
      physical: teamPhaseRating(homeId, "physical", homeTactics),
    },
    awayRatings: {
      attack: teamPhaseRating(awayId, "attack", awayTactics) * awayWidthModifier,
      midfield: teamPhaseRating(awayId, "midfield", awayTactics) * environment.passAccuracy,
      defense: teamPhaseRating(awayId, "defense", awayTactics),
      physical: teamPhaseRating(awayId, "physical", awayTactics),
    },
    homeProfile,
    awayProfile,
  };
  match.analysis = {
    fanPower,
    homeEdge: Math.round((context.homeRatings.attack + context.homeRatings.midfield + context.homeRatings.defense) * homeAdvantage),
    awayEdge: Math.round((context.awayRatings.attack + context.awayRatings.midfield + context.awayRatings.defense) * awayComposurePressure),
    scale: "Visible 1-20 attributes are converted to 1-255 internal ratings before match rolls.",
    tickRate: `${MATCH_LOGIC_TICK_RATE} ticks/second (${MATCH_TICKS_PER_MINUTE} ticks/minute)`,
    environment: `${environment.size.length}x${environment.size.width}m, ${environment.pitchKey}: ${environment.pitch.notes}`,
    matchReadyStats,
    notes: `Home fan power ${fanPower}/28, ${environment.widthEffect} pitch width and media pressure ${Math.round((mediaHomePressure + mediaAwayPressure) * 100)}% are applied to match context. ${homeComplacency.note}`,
    crowdAnxiety: awayLineup.filter((player) => player.matchProfile?.crowdAnxiety).length,
    complacency: { home: homeComplacency, away: awayComplacency },
    hiddenProfiles: {
      inconsistent: homeLineup.concat(awayLineup).filter((player) => player.matchProfile?.consistencyPenalty > 0).length,
      choking: homeLineup.concat(awayLineup).filter((player) => player.matchProfile?.choke).length,
    },
  };

  const momentum = { home: fanPower / 80, away: 0 };

  if (state.teamTalk.boost && [homeId, awayId].includes(state.userTeamId)) {
    match.engineTrace.interrupts.push({ minute: fromMinute, type: "shout", label: state.teamTalk.lastStyle ?? "Touchline shout", boost: state.teamTalk.boost });
  }

  for (let minute = fromMinute; minute <= toMinute; minute += 1) {
    if (state.touchlineShout && minute > state.touchlineShout.expiresMinute) {
      match.engineTrace.interrupts.push({ minute, type: "touchline shout expired", label: `${state.touchlineShout.label} effect ended` });
      state.touchlineShout = null;
      state.teamTalk.boost = 0;
      playersForTeam(state.userTeamId).forEach((player) => {
        delete player.teamTalkModifier;
        delete player.teamTalkReaction;
      });
    }
    if (minute >= 60 && !match.weatherChanged && chance(0.035)) {
      const nextWeather = weatherKey === "rain" ? "wind" : "rain";
      const shiftedEnvironment = environmentalMatrix(nextWeather);
      match.weatherChanged = true;
      match.weather = nextWeather;
      weather = WEATHER[nextWeather];
      context.weather = weather;
      Object.assign(environment, {
        pitchKey: shiftedEnvironment.pitchKey,
        pitch: shiftedEnvironment.pitch,
        ballDrag: shiftedEnvironment.ballDrag,
        passAccuracy: shiftedEnvironment.passAccuracy,
        accelerationDrag: shiftedEnvironment.accelerationDrag,
        spinDecay: shiftedEnvironment.spinDecay,
      });
      const weatherText = `${minute}' Weather change: ${WEATHER[nextWeather].notes}`;
      match.weatherTimeline.push({ minute, weather: nextWeather, label: WEATHER[nextWeather].notes });
      match.events.push(weatherText);
      match.specialStates.push({ minute, type: "weather", status: "resolved", text: weatherText });
    }
    momentum.home *= 0.992;
    momentum.away *= 0.992;
    const tickFrame = runMatchMinuteTicks(match, minute, context, homeId, awayId, homeTactics, awayTactics, momentum);
    const homeHasBall = tickFrame.homeHasBall;
    const side = homeHasBall ? "home" : "away";
    const opponent = homeHasBall ? "away" : "home";
    const tactic = homeHasBall ? homeTactics : awayTactics;
    const ratings = homeHasBall ? context.homeRatings : context.awayRatings;
    const oppRatings = homeHasBall ? context.awayRatings : context.homeRatings;
    const profile = homeHasBall ? context.homeProfile : context.awayProfile;
    const oppProfile = homeHasBall ? context.awayProfile : context.homeProfile;

    const scorePressure = side === "home"
      ? match.score.home < match.score.away ? 1.12 : match.score.home > match.score.away ? 0.9 : 1
      : match.score.away < match.score.home ? 1.1 : match.score.away > match.score.home ? 0.88 : 1;
    const creationEdge = (ratings.attack * 0.55 + ratings.midfield * 0.45 + profile.creation * 0.7) /
      Math.max(1, oppRatings.defense * 0.7 + oppProfile.defensiveDuel * 0.55);
    const tacticalRisk = mentalityRisk(tactic);
    const eventChance =
      0.052 *
      weather.tempo *
      creationEdge *
      scorePressure *
      tacticalRisk *
      setPieceQuality(side === "home" ? homeId : awayId, tactic) *
      (0.86 + tactic.tempo / 42) *
      (side === "home" ? context.homeAdvantage : context.awayComposurePressure) *
      (1 + momentum[side] / 18);

    if (!chance(clamp(eventChance, 0.018, 0.13))) continue;

    const attackingTeamId = homeHasBall ? homeId : awayId;
    const defendingTeamId = homeHasBall ? awayId : homeId;
    const shooter = pickShooter(attackingTeamId);
    const defender = pickDefender(defendingTeamId);
    const important = state.week >= 32 || options.competition === "cup";
    const shooterRating = playerShotRating(shooter) * playerInstructionEfficiency(shooter, tactic);
    const defenderRating = defender ? rating255To20(effectivePlayerRating255(defender, ["tackling", "positioning", "strength", "decisions"], { important })) : oppProfile.defensiveDuel;
    const keeperPool = firstEleven(defendingTeamId).filter((player) => player.role === "GK");
    const keeperRating = keeperPool[0] ? rating255To20(effectivePlayerRating255(keeperPool[0], ["agility", "positioning", "decisions", "composure"], { important })) : oppProfile.keeper;
    const keeperHandling = keeperPool[0] ? weightedRating(keeperPool[0], ["agility", "firstTouch", "composure", "decisions"]) : keeperRating;
    const duelEdge = (shooterRating + profile.finishing * 0.75 + ratings.attack * 0.35) - (defenderRating * 0.8 + oppRatings.defense * 0.28);
    const shotQuality =
      duelEdge * weather.technical * (0.9 + tactic.width / 85) - keeperRating * 0.18;
    const chanceTypeBonus = (shooter?.role === "ST" ? 0.025 : shooter?.role === "W" ? 0.01 : 0) + (shooter?.traits?.includes("getsIntoBox") ? 0.012 : 0);
    const xg = clamp(0.055 + shotQuality / 230 + chanceTypeBonus + Math.random() * 0.075, 0.015, 0.42);
    const onTargetChance = clamp(0.22 + xg * 1.25 + (shooterRating - defenderRating) / 95 - (weather.technical < 1 ? 0.04 : 0), 0.16, 0.68);
    const onTarget = chance(onTargetChance);

    match.stats[side].shots += 1;
    match.stats[side].xg += xg;
    if (onTarget) match.stats[side].onTarget += 1;

    const clutch = shooter ? (shooter.attributes.composure + shooter.form) / 40 : 0.65;
    const keeperSavePower = keeperRating / 23;
    const crowdFinishLift = side === "home" ? 1 + fanPower / 260 : 1 - fanPower / 650;
    const goalChance = onTarget ? clamp((xg * (0.78 + clutch) * crowdFinishLift) / keeperSavePower, 0.01, 0.34) : 0;
    if (shooter) shooter.stats.shots += 1;

    if (chance(goalChance)) {
      match.score[side] += 1;
      const scorer = shooter ?? pickScorer(attackingTeamId);
      const assister = pickAssister(attackingTeamId, scorer?.id);
      if (scorer) scorer.stats.goals += 1;
      if (assister) {
        assister.stats.assists += 1;
        assister.stats.keyPasses += 1;
      }
      const text = `${minute}' Goal ${side === "home" ? home.name : away.name}: ${scorer.name}${assister ? `, assist ${assister.name}` : ""}`;
      match.events.push(text);
      const visual = createPitchEvent(minute, side, attackingTeamId, "goal", text);
      match.replay.push(createReplayEvent(minute, "goal", side, text, scorer, assister, visual));
      match.highlights.push(visual);
      captureHighlightClip(match, minute, "goal", text);
      if (chance(0.14)) {
        const varText = `${minute}' VAR review: the referee checks the goal and confirms the decision.`;
        match.events.push(varText);
        match.specialStates.push({ minute, type: "var", status: "confirmed", text: varText, delaySeconds: rand(3, 5) });
        captureHighlightClip(match, minute, "var", varText);
      }
      scorer.form = clamp(scorer.form + 1, 1, 20);
      momentum[side] += side === "home" ? 0.85 + fanPower / 70 : 0.65;
      momentum[opponent] = clamp(momentum[opponent] - 0.35, -0.8, 2.5);
    } else if (xg > 0.25 || chance(0.18)) {
      const rebound = onTarget && chance(clamp((15 - keeperHandling) / 42 + (weather.technical < 1 ? 0.055 : 0.02), 0.025, 0.24));
      const duelText = defender ? ` under pressure from ${defender.name}` : "";
      const text = `${minute}' ${side === "home" ? home.name : away.name} ${rebound ? "force a rebound after the goalkeeper spills the ball" : onTarget ? "force a save" : "shoot wide"}${shooter ? ` through ${shooter.name}` : ""}${duelText}`;
      match.events.push(text);
      if (rebound) match.specialStates.push({ minute, type: "rebound", status: "live", text });
      const visual = createPitchEvent(minute, side, attackingTeamId, onTarget ? "save" : "shot", text);
      match.replay.push(createReplayEvent(minute, onTarget ? "save" : "shot", side, text, shooter, null, visual));
      match.highlights.push(visual);
      captureHighlightClip(match, minute, onTarget ? "save" : "shot", text);
      momentum[side] += onTarget ? 0.22 : 0.12;
    }

    checkInjuries(homeHasBall ? homeId : awayId, weather, tactic, minute, match);
  }

  const totalTouches = Math.max(1, match.stats.home.possessionTouches + match.stats.away.possessionTouches);
  match.stats.home.possession = Math.round((match.stats.home.possessionTouches / totalTouches) * 100);
  match.stats.away.possession = 100 - match.stats.home.possession;
  match.assistantAlerts = buildAssistantMatchAlerts(match);

  if (options.applyResult !== false) {
    applyResult(match);
  }
  if ([homeId, awayId].includes(state.userTeamId) && toMinute >= 90) {
    state.teamTalk.boost = 0;
    state.teamTalk.reactions = [];
    state.touchlineShout = null;
    playersForTeam(state.userTeamId).forEach((player) => {
      delete player.teamTalkModifier;
      delete player.teamTalkReaction;
    });
  }
  homeLineup.concat(awayLineup).forEach((player) => {
    delete player.matchProfile;
    if (toMinute >= 90) {
      delete player.teamTalkModifier;
      delete player.teamTalkReaction;
    }
  });
  return match;
}

function simulateSelectedMatch() {
  const nextFixture = nextUserFixture();
  if (!nextFixture) {
    if (state.week > state.fixtures.length) completeSeason();
    addFeed("No next league fixture is available. Check Schedule or start next season.");
    return render();
  }
  if (state.matchdayPhase !== "half" && !state.preMatchConfirmed) {
    state.activeView = "match";
    addFeed("Confirm squad and tactics before kickoff.");
    return render();
  }
  if (state.matchdayPhase === "half" && state.lastMatch) {
    const continued = simulateMatch(state.lastMatch.homeId, state.lastMatch.awayId, {
      applyResult: false,
      fromMinute: 46,
      toMinute: 90,
      initialMatch: state.lastMatch,
      weather: state.lastMatch.weather,
    });
    state.lastMatch = continued;
    applyResult(continued);
    const otherResults = simulateRemainingRoundFixtures(nextFixture.round, nextFixture.fixture);
    processWeeklyClubOperations(nextFixture.week);
    advanceCalendarAfterMatchweek(nextFixture.week);
    state.matchdayPhase = "ready";
    state.preMatchConfirmed = false;
    state.postMatchSummary = buildPostMatchSummary(continued);
    addFeed(`Full time: ${teamById(continued.homeId).name} ${continued.score.home}-${continued.score.away} ${teamById(continued.awayId).name}.`);
    otherResults.slice(0, 4).forEach(({ result, text }) => {
      addFeed(`${text} (${result.weather}). xG ${result.stats.home.xg.toFixed(2)}-${result.stats.away.xg.toFixed(2)}`);
    });
    if (state.week > state.fixtures.length) completeSeason();
    render();
    return;
  }
  applyRecoveryIntervalPenalty(nextFixture.homeId, nextFixture.isoDate, currentLeague().name);
  applyRecoveryIntervalPenalty(nextFixture.awayId, nextFixture.isoDate, currentLeague().name);
  const result = simulateMatch(nextFixture.homeId, nextFixture.awayId, { applyResult: false, fromMinute: 1, toMinute: 45 });
  state.lastMatch = result;
  state.matchdayPhase = "half";
  state.postMatchSummary = null;
  state.selectedOpponentId = nextFixture.fixture.find((teamId) => teamId !== state.userTeamId);
  addFeed(`Half time (${nextFixture.date}): ${teamById(result.homeId).name} ${visibleMatchScore(result).home}-${visibleMatchScore(result).away} ${teamById(result.awayId).name}.`);
  render();
}

function visibleMatchEvents(match = state.lastMatch) {
  if (!match) return [];
  return state.matchdayPhase === "half"
    ? match.events.filter((event) => Number.parseInt(event, 10) <= 45)
    : match.events;
}

function visibleMatchReplay(match = state.lastMatch) {
  if (!match) return [];
  return state.matchdayPhase === "half"
    ? match.replay.filter((event) => event.minute <= 45)
    : match.replay;
}

function visibleMatchScore(match = state.lastMatch) {
  const score = { home: 0, away: 0 };
  visibleMatchEvents(match).forEach((event) => {
    if (!event.includes("Goal ")) return;
    if (event.includes(`${teamById(match.homeId).name}:`)) score.home += 1;
    if (event.includes(`${teamById(match.awayId).name}:`)) score.away += 1;
  });
  return state.matchdayPhase === "full" ? match.score : score;
}

function buildAssistantMatchAlerts(match) {
  if (!match) return [];
  const userSide = match.homeId === state.userTeamId ? "home" : "away";
  const opponentSide = userSide === "home" ? "away" : "home";
  const alerts = [];
  const tired = firstEleven(state.userTeamId).filter((player) => player.condition < 65 || (player.fatigue ?? 0) >= 65);
  if (tired[0]) alerts.push(`หมายเลข ${shirtNo(tired[0])} ${tired[0].name} เริ่มล้าสะสม เสี่ยงบาดเจ็บ ควรพิจารณาเปลี่ยนตัวครับบอส`);
  if ((match.stats[opponentSide].shots ?? 0) >= (match.stats[userSide].shots ?? 0) + 3) alerts.push("คู่แข่งสร้างโอกาสได้มากกว่า ควรลดพื้นที่ด้านข้างหรือสั่งให้ไล่บีบเร็วขึ้นครับ");
  if ((match.stats[userSide].possession ?? 50) < 42) alerts.push("แดนกลางของเราเก็บบอลสองไม่ดี ลองลด tempo หรือเปลี่ยนการจ่ายบอลให้ตรงขึ้นครับ");
  if (match.analysis?.complacency?.[userSide]?.active) alerts.push("ทีมดูประมาทกว่าปกติครับ ใช้ Focus หรือ Cautious เพื่อเรียกสมาธิกลับมา");
  return alerts.slice(0, 4);
}

function makeCupCompetition(name, type, weeks, opponentPool, status = "active", rules = {}) {
  return {
    name,
    type,
    status,
    rules,
    phase: type === "league-phase" ? "league-phase" : "knockout",
    roundLabel: type === "league-phase" ? "League phase" : rules.rounds?.[0] ?? "Knockout round",
    roundIndex: 0,
    weeks,
    opponentPool,
    legBuffer: null,
    dropDownTeams: [],
    projectedRank: null,
    swissTable: type === "league-phase" ? buildSwissTableSkeleton(opponentPool) : [],
    record: { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    history: status === "active" ? [] : ["Not qualified this season."],
  };
}

function recordHonor(type, competitionName, teamId) {
  const team = teamById(teamId);
  const alreadyRecorded = state.honors.some(
    (honor) => honor.season === seasonLabel() && honor.competitionName === competitionName && honor.teamId === teamId
  );
  if (alreadyRecorded) return;

  const honor = {
    type,
    competitionName,
    season: seasonLabel(),
    teamId,
    teamName: team.name,
    logo: team.logo,
  };
  state.honors.unshift(honor);
  state.latestChampionNotice = honor;
}

function cupTierForLeague(league) {
  if (league.id.includes("league-two") || league.id.includes("2") || league.id.includes("hypermotion") || league.id.includes("serie-b") || league.id.includes("ligue-2")) return 2;
  if (league.id.includes("championship") || league.id.includes("league-one") || league.id.includes("erste") || league.id.includes("1-lig")) return 2;
  return 1;
}

function catalogTeamEntries(league) {
  if (league.id === currentLeague().id && state.teams?.length) {
    return state.teams.map((team, index) => ({
      teamId: `${league.id}-${team.id}`,
      name: team.name,
      teamName: team.name,
      country: league.country,
      leagueId: league.id,
      leagueName: league.name,
      tier: cupTierForLeague(league),
      coefficientScore: clamp(Math.round(team.reputation * 1.16 + league.level * 0.42 - index * 1.35), 20, 145),
      clubCoefficient: clamp(Math.round(team.reputation * 1.16 + league.level * 0.42 - index * 1.35), 20, 145),
      power: clamp(team.reputation + rand(-4, 5), 42, 99),
      reputation: team.reputation,
      logo: team.logo,
      source: "active league database",
      stats: { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, awayGoals: 0, points: 0 },
    }));
  }
  const seeds = league.realSeed || league.globalSeed
    ? realLeagueTeams(league)
    : buildGeneratedLeagueTeams(league).map((team) => [team.name, team.reputation, team.budget, team.wageBudget, team.logo]);
  return seeds
    .slice(0, league.teams)
    .map(([name, reputation, budget, wageBudget, logo], index) => ({
      teamId: `${league.id}-${index + 1}`,
      name,
      teamName: name,
      country: league.country,
      leagueId: league.id,
      leagueName: league.name,
      tier: cupTierForLeague(league),
      coefficientScore: clamp(Math.round((reputation * 1.16) + (league.level * 0.42) - index * 1.35), 20, 145),
      clubCoefficient: clamp(Math.round((reputation * 1.16) + (league.level * 0.42) - index * 1.35), 20, 145),
      power: clamp(reputation + rand(-5, 6), 42, 98),
      reputation,
      logo,
      budget,
      wageBudget,
      source: "league catalog database",
      stats: { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, awayGoals: 0, points: 0 },
    }));
}

function buildDomesticCupPool(league) {
  const countryLeagues = LEAGUE_CATALOG
    .filter((candidate) => candidate.country === league.country && candidate.continent === league.continent)
    .sort((a, b) => b.level - a.level);
  const teams = countryLeagues.flatMap((candidate) => catalogTeamEntries(candidate));
  const unique = [];
  const used = new Set();
  teams.forEach((team) => {
    const key = `${team.country}-${team.name}`;
    if (used.has(key)) return;
    used.add(key);
    unique.push({ ...team, drawSource: `${team.leagueName} (${team.source})` });
  });
  return unique.sort((a, b) => b.tier - a.tier || b.power - a.power);
}

function europeanQualificationSlots(league, competitionName = "UEFA Champions League") {
  if (league.continent !== "Europe" || league.level < 69) return 0;
  const ucl = competitionName.includes("Champions");
  if (ucl) {
    if (["England", "Spain", "Italy", "Germany"].includes(league.country) && league.level >= 82) return 4;
    if (league.country === "France" && league.level >= 78) return 3;
    if (["Netherlands", "Portugal"].includes(league.country)) return 2;
    if (["Belgium", "Scotland", "Turkiye"].includes(league.country)) return 1;
    return league.level >= 74 ? 1 : 0;
  }
  if (["England", "Spain", "Italy", "Germany", "France"].includes(league.country) && league.level >= 78) return 3;
  if (["Netherlands", "Portugal", "Belgium", "Turkiye", "Scotland"].includes(league.country)) return 2;
  return league.level >= 70 ? 1 : 0;
}

function europeanLeagueTeamSeeds(league) {
  return catalogTeamEntries(league).map((team, index) => ({
    ...team,
    qualifiedFor: null,
    coefficientScore: clamp(team.coefficientScore + rand(-3, 5) - index * 0.1, 20, 145),
    clubCoefficient: clamp(team.clubCoefficient + rand(-3, 5) - index * 0.1, 20, 145),
  }));
}

function gatherEuropeanContenders(competitionName = "UEFA Champions League", userTeam = teamById(state.userTeamId), targetCount = 36) {
  const contenders = [];
  LEAGUE_CATALOG
    .filter((league) => league.continent === "Europe")
    .forEach((league) => {
      const slots = europeanQualificationSlots(league, competitionName);
      if (!slots) return;
      europeanLeagueTeamSeeds(league).slice(0, slots).forEach((team, index) => {
        contenders.push({
          ...team,
          qualifiedFor: competitionName.includes("Champions") ? "UCL_LEAGUE_PHASE" : "UEL_LEAGUE_PHASE",
          qualificationRank: index + 1,
        });
      });
    });

  if (userTeam && userTeam.reputation >= (competitionName.includes("Champions") ? 82 : 72)) {
    contenders.unshift({
      teamId: `user-${userTeam.id}`,
      teamName: userTeam.name,
      name: userTeam.name,
      country: currentLeague().country,
      leagueId: currentLeague().id,
      leagueName: currentLeague().name,
      qualifiedFor: competitionName.includes("Champions") ? "UCL_LEAGUE_PHASE" : "UEL_LEAGUE_PHASE",
      coefficientScore: clamp(Math.round(userTeam.reputation * 1.22 + currentLeague().level * 0.48 + rand(-2, 6)), 35, 145),
      clubCoefficient: clamp(Math.round(userTeam.reputation * 1.22 + currentLeague().level * 0.48 + rand(-2, 6)), 35, 145),
      power: clamp(userTeam.reputation + rand(-4, 7), 48, 99),
      reputation: userTeam.reputation,
      logo: userTeam.logo,
      user: true,
      stats: { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, awayGoals: 0, points: 0 },
    });
  }

  const unique = [];
  const used = new Set();
  contenders
    .sort((a, b) => b.coefficientScore - a.coefficientScore)
    .forEach((team) => {
      const key = `${team.country}-${team.name}`;
      if (used.has(key)) return;
      used.add(key);
      unique.push(team);
    });

  if (unique.length < targetCount) {
    LEAGUE_CATALOG
      .filter((league) => league.continent === "Europe")
      .flatMap((league) => europeanLeagueTeamSeeds(league).map((team) => ({ ...team, qualifiedFor: competitionName.includes("Champions") ? "UCL_LEAGUE_PHASE_BACKFILL" : "UEL_LEAGUE_PHASE_BACKFILL" })))
      .sort((a, b) => b.coefficientScore - a.coefficientScore)
      .forEach((team) => {
        if (unique.length >= targetCount) return;
        const key = `${team.country}-${team.name}`;
        if (used.has(key)) return;
        used.add(key);
        unique.push(team);
      });
  }

  return unique.slice(0, targetCount);
}

function allocateIntoPots(contenders) {
  const sorted = [...contenders].sort((a, b) => b.coefficientScore - a.coefficientScore);
  return {
    pot1: sorted.slice(0, 9).map((team) => ({ ...team, pot: 1 })),
    pot2: sorted.slice(9, 18).map((team) => ({ ...team, pot: 2 })),
    pot3: sorted.slice(18, 27).map((team) => ({ ...team, pot: 3 })),
    pot4: sorted.slice(27, 36).map((team) => ({ ...team, pot: 4 })),
  };
}

function pickSwissOpponent(currentTeam, potTeams, usedIds) {
  const candidates = potTeams
    .filter((team) => team.teamId !== currentTeam.teamId && team.country !== currentTeam.country && !usedIds.has(team.teamId))
    .sort((a, b) => b.coefficientScore - a.coefficientScore);
  return candidates[0] ?? potTeams.find((team) => team.teamId !== currentTeam.teamId && !usedIds.has(team.teamId)) ?? null;
}

function generateSwissFixtureMatrix(pots) {
  const potList = [pots.pot1, pots.pot2, pots.pot3, pots.pot4];
  const allTeams = potList.flat();
  const teamFixtures = {};
  const allFixtures = [];
  allTeams.forEach((team) => {
    const used = new Set();
    const fixtures = [];
    potList.forEach((potTeams, potIndex) => {
      for (let draw = 0; draw < 2; draw += 1) {
        const opponent = pickSwissOpponent(team, potTeams, used);
        if (!opponent) continue;
        used.add(opponent.teamId);
        const venue = fixtures.length % 2 === 0 ? "home" : "away";
        const fixture = venue === "home"
          ? { home: team.teamId, away: opponent.teamId, status: "SCHEDULED", pot: potIndex + 1 }
          : { home: opponent.teamId, away: team.teamId, status: "SCHEDULED", pot: potIndex + 1 };
        fixtures.push({ ...opponent, venue, pot: potIndex + 1, drawRule: `Pot ${potIndex + 1} opponent ${draw + 1}` });
        allFixtures.push(fixture);
      }
    });
    teamFixtures[team.teamId] = fixtures.slice(0, 8);
  });
  return { allTeams, allFixtures, teamFixtures };
}

function buildSwissTableSkeleton(contenders) {
  return contenders.map((team) => ({
    teamId: team.teamId,
    name: team.name,
    country: team.country,
    pot: team.pot,
    user: Boolean(team.user),
    played: team.stats?.played ?? 0,
    won: team.stats?.won ?? 0,
    drawn: team.stats?.drawn ?? 0,
    lost: team.stats?.lost ?? 0,
    goalsFor: team.stats?.goalsFor ?? 0,
    goalsAgainst: team.stats?.goalsAgainst ?? 0,
    goalDifference: team.stats?.goalDiff ?? 0,
    awayGoals: team.stats?.awayGoals ?? 0,
    points: team.stats?.points ?? 0,
  }));
}

function createEuropeanLeaguePhase(competitionName, status, rules) {
  const contenders = gatherEuropeanContenders(competitionName);
  const pots = allocateIntoPots(contenders);
  const matrix = generateSwissFixtureMatrix(pots);
  const userEntry = matrix.allTeams.find((team) => team.user) ?? matrix.allTeams[0];
  const userSchedule = matrix.teamFixtures[userEntry.teamId] ?? matrix.allTeams.filter((team) => team.teamId !== userEntry.teamId).slice(0, 8);
  return {
    contenders: matrix.allTeams,
    pots,
    allFixtures: matrix.allFixtures,
    userTeamKey: userEntry.teamId,
    userSchedule,
    opponentPool: userSchedule,
    swissTable: buildSwissTableSkeleton(matrix.allTeams),
  };
}

function sortSwissStandings(table) {
  return [...table].sort((a, b) =>
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor ||
    (b.awayGoals ?? 0) - (a.awayGoals ?? 0)
  );
}

function updateSwissStandingRow(row, goalsFor, goalsAgainst, awayGoals = 0) {
  if (!row) return;
  row.played = (row.played ?? 0) + 1;
  row.goalsFor = (row.goalsFor ?? 0) + goalsFor;
  row.goalsAgainst = (row.goalsAgainst ?? 0) + goalsAgainst;
  row.goalDifference = row.goalsFor - row.goalsAgainst;
  row.awayGoals = (row.awayGoals ?? 0) + awayGoals;
  if (goalsFor > goalsAgainst) {
    row.won = (row.won ?? 0) + 1;
    row.points = (row.points ?? 0) + 3;
  } else if (goalsFor === goalsAgainst) {
    row.drawn = (row.drawn ?? 0) + 1;
    row.points = (row.points ?? 0) + 1;
  } else {
    row.lost = (row.lost ?? 0) + 1;
  }
}

function updateSwissLeagueTable(competition, opponent, teamGoals, opponentGoals) {
  if (!competition?.swissTable || !opponent) return;
  const userRow = competition.swissTable.find((row) => row.user);
  const opponentRow = competition.swissTable.find((row) => row.teamId === opponent.teamId || row.name === opponent.name);
  const userAwayGoals = opponent.venue === "away" ? teamGoals : 0;
  const opponentAwayGoals = opponent.venue === "home" ? opponentGoals : 0;
  updateSwissStandingRow(userRow, teamGoals, opponentGoals, userAwayGoals);
  updateSwissStandingRow(opponentRow, opponentGoals, teamGoals, opponentAwayGoals);
}

function simulateOtherSwissFixtures(competition, roundIndex) {
  if (!competition?.swissTable || !competition.allFixtures) return;
  const alreadyPlayed = new Set(competition.swissTable.filter((row) => row.played > roundIndex).map((row) => row.teamId));
  const fixtures = competition.allFixtures
    .filter((fixture) => !fixture.played && !alreadyPlayed.has(fixture.home) && !alreadyPlayed.has(fixture.away))
    .slice(0, 12);
  fixtures.forEach((fixture) => {
    const homeRow = competition.swissTable.find((row) => row.teamId === fixture.home);
    const awayRow = competition.swissTable.find((row) => row.teamId === fixture.away);
    if (!homeRow || !awayRow) return;
    const homePower = competition.contenders?.find((team) => team.teamId === fixture.home)?.power ?? 76;
    const awayPower = competition.contenders?.find((team) => team.teamId === fixture.away)?.power ?? 74;
    const { teamGoals: homeGoals, opponentGoals: awayGoals } = rollCupScore(homePower, awayPower, 0.1);
    updateSwissStandingRow(homeRow, homeGoals, awayGoals, 0);
    updateSwissStandingRow(awayRow, awayGoals, homeGoals, awayGoals);
    fixture.played = true;
  });
}

function currentCupRound(competition) {
  if (competition.type === "league-phase" && competition.roundIndex < 8) return "League phase";
  if (competition.type === "league-phase") return competition.roundLabel;
  return competition.rules?.rounds?.[Math.min(competition.roundIndex, (competition.rules.rounds?.length ?? 1) - 1)] ?? competition.roundLabel;
}

function rollCupScore(teamPower, opponentPower, venueBias = 0) {
  return {
    teamGoals: Math.max(0, Math.round((teamPower / 36 + Math.random() * 2.1 + venueBias) - opponentPower / 52)),
    opponentGoals: Math.max(0, Math.round((opponentPower / 38 + Math.random() * 2.1 - venueBias) - teamPower / 54)),
  };
}

function findAvailableMidweekForCompetition(startDate, occupied, weekday = 3) {
  let slot = nextMidweekSlot(startDate, weekday);
  for (let attempts = 0; attempts < 18; attempts += 1) {
    const iso = fixtureIsoDate(slot);
    if (!calendarBlockReason(slot) && !occupied.has(iso)) return slot;
    slot = addDays(slot, 7);
  }
  return slot;
}

function postponeLeagueFixture(fixture, conflictDate, occupied) {
  const originalDate = fixture.date;
  const replacement = findAvailableMidweekForCompetition(addDays(new Date(conflictDate), 7), occupied, 3);
  fixture.status = "POSTPONED";
  fixture.originalDate = originalDate;
  fixture.date = fixtureIsoDate(replacement);
  fixture.displayDate = formatFixtureDate(replacement);
  fixture.dayIndex = seasonDayIndex(replacement);
  fixture.kickoff = "19:45";
  fixture.status = "RESCHEDULED";
  state.postponedFixtures.push({
    homeId: fixture[0],
    awayId: fixture[1],
    originalDate,
    rescheduledDate: fixture.date,
    reason: "Higher-priority cup calendar collision",
  });
  occupied.add(fixture.date);
  return fixture;
}

function assignCompetitionCalendar(competitions) {
  const leagueRounds = state.fixtures;
  const occupied = new Set();
  const userLeagueDates = leagueRounds
    .map((round) => round.find((fixture) => fixture.includes(state.userTeamId))?.date)
    .filter(Boolean);
  userLeagueDates.forEach((date) => occupied.add(date));

  competitions.forEach((competition) => {
    if (competition.status === "not-qualified") {
      competition.scheduledDates = [];
      return;
    }
    competition.scheduledDates = competition.weeks.map((week, index) => {
      const baseRound = leagueRounds[Math.min(Math.max(week - 1, 0), leagueRounds.length - 1)];
      const baseDate = new Date(baseRound?.date ?? new Date(state.season, 7, 8));
      const fixedDomesticFinal = competition.type === "knockout" && index === competition.weeks.length - 1;
      const weekday = competition.name.includes("Europa")
        ? 4
        : competition.type === "league-phase"
          ? index % 2 === 0 ? 2 : 3
          : 4;
      let slot = fixedDomesticFinal ? baseDate : findAvailableMidweekForCompetition(baseDate, occupied, weekday);
      if (fixedDomesticFinal && occupied.has(fixtureIsoDate(slot))) {
        const collision = leagueRounds
          .flat()
          .find((fixture) => fixture.date === fixtureIsoDate(slot) && fixture.includes(state.userTeamId));
        if (collision) postponeLeagueFixture(collision, slot, occupied);
      }
      if (!fixedDomesticFinal && occupied.has(fixtureIsoDate(slot))) {
        slot = findAvailableMidweekForCompetition(addDays(slot, 1), occupied, weekday);
      }
      const isoDate = fixtureIsoDate(slot);
      const rules = competitionRules(competition.name, competition.type === "league-phase" ? "europe" : "domestic-cup");
      occupied.add(isoDate);
      registerCalendarEvent({
        type: competition.type === "league-phase" ? "europe" : "domestic-cup",
        competition: competition.name,
        date: isoDate,
        displayDate: formatFixtureDate(slot),
        dayIndex: seasonDayIndex(slot),
        round: index + 1,
        priority: competition.type === "league-phase" ? 2 : 1,
        ruleKey: competitionRuleKey(competition.name, competition.type === "league-phase" ? "europe" : "domestic-cup"),
        rulesCode: rules.code,
      });
      return { isoDate, displayDate: formatFixtureDate(slot), dayIndex: seasonDayIndex(slot), weekday: slot.getDay() };
    });
  });
}

function initializeCompetitions() {
  const league = currentLeague();
  const userTeam = teamById(state.userTeamId);
  const leagueWeeks = state.fixtures.length;
  const domesticWeeks = [Math.ceil(leagueWeeks * 0.25), Math.ceil(leagueWeeks * 0.38), Math.ceil(leagueWeeks * 0.52), Math.ceil(leagueWeeks * 0.66), Math.ceil(leagueWeeks * 0.8), leagueWeeks];
  const continentalWeeks = [4, 8, 12, 16, 20, 24, 28, 32].filter((week) => week < leagueWeeks);
  const knockoutWeeks = [33, 34, 35, 36, 37, 38].filter((week) => week <= leagueWeeks && week > Math.max(...continentalWeeks));
  const uclStatus = league.continent === "Europe" && userTeam.reputation >= 82 ? "active" : "not-qualified";
  const uelStatus = league.continent === "Europe" && userTeam.reputation >= 72 && userTeam.reputation < 88 ? "active" : "not-qualified";
  const uclLeaguePhase = createEuropeanLeaguePhase("UEFA Champions League", uclStatus, {});
  const uelLeaguePhase = createEuropeanLeaguePhase("UEFA Europa League", uelStatus, {});
  const domesticRules = {
    format: "single-match knockout",
    allowReplay: false,
    tieredIngestion: true,
    entryRound: league.level >= 80 ? "Round of 64" : "Early rounds",
    rounds: ["Early rounds", "Round of 64", "Round of 32", "Round of 16", "Semi-final", "Final"],
  };
  const uefaRules = {
    format: "Swiss league phase + two-legged knockout",
    teams: 36,
    pots: 4,
    matches: 8,
    sameCountryBlocked: true,
    repeatOpponentBlocked: true,
    topEightToRound16: true,
    playoffPlaces: "9-24",
    eliminatedPlaces: "25-36",
    awayGoals: false,
    allowDropDown: false,
    rounds: ["League phase", "Knockout play-off", "Round of 16", "Quarter-final", "Semi-final", "Final"],
  };
  const uclCompetition = makeCupCompetition("UEFA Champions League", "league-phase", [...continentalWeeks, ...knockoutWeeks], uclLeaguePhase.opponentPool, uclStatus, uefaRules);
  Object.assign(uclCompetition, uclLeaguePhase);
  const uelCompetition = makeCupCompetition("UEFA Europa League", "league-phase", [...continentalWeeks, ...knockoutWeeks], uelLeaguePhase.opponentPool, uelStatus, { ...uefaRules, allowDropDown: false });
  Object.assign(uelCompetition, uelLeaguePhase);
  state.competitions = [
    makeCupCompetition(league.domesticCup, "knockout", domesticWeeks, buildDomesticCupPool(league), "active", domesticRules),
    uclCompetition,
    uelCompetition,
  ];
  assignCompetitionCalendar(state.competitions);
}

function evaluateSwissLeaguePhase(competition) {
  const userTeam = teamById(state.userTeamId);
  const table = sortSwissStandings(competition.swissTable).map((row, index) => ({ ...row, rank: index + 1 }));
  competition.swissTable = table;
  const rank = table.findIndex((row) => row.user) + 1;
  competition.projectedRank = rank;
  if (rank <= 8) {
    competition.phase = "round-16";
    competition.roundLabel = "Round of 16";
    competition.history.unshift(`${userTeam.name} finish ${rank}/36 and qualify directly for the Round of 16.`);
  } else if (rank <= 24) {
    competition.phase = "playoff";
    competition.roundLabel = "Knockout play-off";
    competition.history.unshift(`${userTeam.name} finish ${rank}/36 and enter the two-legged knockout play-off.`);
  } else {
    competition.status = "eliminated";
    competition.phase = "eliminated";
    competition.history.unshift(`${userTeam.name} finish ${rank}/36 and are eliminated. Modern UEFA rules do not drop teams into the Europa League.`);
    if (competition.rules?.allowDropDown) {
      injectDropDownTeam("UEFA Europa League", userTeam.name);
    }
  }
}

function injectDropDownTeam(targetCompetitionName, teamName) {
  const target = state.competitions.find((competition) => competition.name === targetCompetitionName);
  if (!target || target.status === "not-qualified") return;
  target.dropDownTeams = target.dropDownTeams ?? [];
  target.dropDownTeams.push(teamName);
  target.history.unshift(`${teamName} injected into ${targetCompetitionName} play-off through drop-down rules.`);
}

function resolveTwoLeggedEuropeanTie(competition, opponent, normalizedTeamPower, resultText, teamGoals, opponentGoals) {
  const userTeamName = teamById(state.userTeamId).name;
  if (!competition.legBuffer) {
    competition.legBuffer = { opponent, leg1: { teamGoals, opponentGoals } };
    competition.history.unshift(`${resultText} - first leg stored`);
    competition.roundLabel = `${competition.roundLabel} second leg`;
    competition.roundIndex += 1;
    return `${resultText} - first leg`;
  }

  const leg1 = competition.legBuffer.leg1;
  const aggregateTeam = leg1.teamGoals + teamGoals;
  const aggregateOpponent = leg1.opponentGoals + opponentGoals;
  let advanced = aggregateTeam > aggregateOpponent;
  let decision = `aggregate ${aggregateTeam}-${aggregateOpponent}`;
  if (aggregateTeam === aggregateOpponent) {
    const extraTimeWinner = chance(clamp(normalizedTeamPower / (normalizedTeamPower + opponent.power), 0.3, 0.7));
    if (chance(0.55)) {
      advanced = extraTimeWinner;
      decision = `${decision}, decided in extra time`;
    } else {
      advanced = extraTimeWinner;
      decision = `${decision}, won ${advanced ? "by" : "lost on"} penalties`;
    }
  }

  competition.legBuffer = null;
  if (advanced) {
    competition.record.won += 1;
    competition.history.unshift(`${resultText} - ${decision}, advanced`);
    competition.roundIndex += 1;
    const nextRound = competition.phase === "playoff" ? "Round of 16" : competition.phase === "round-16" ? "Quarter-final" : competition.phase === "quarter-final" ? "Semi-final" : "Final";
    competition.phase = nextRound.toLowerCase().replaceAll(" ", "-");
    competition.roundLabel = nextRound;
    if (competition.roundIndex >= competition.weeks.length) {
      competition.status = "won";
      competition.history.unshift(`${userTeamName} win ${competition.name}.`);
      recordHonor("cup", competition.name, state.userTeamId);
    }
  } else {
    competition.record.lost += 1;
    competition.status = "eliminated";
    competition.history.unshift(`${resultText} - ${decision}, eliminated`);
  }
  return `${resultText} - ${decision}`;
}

function simulateCompetitionMatch(competition) {
  if (competition.status !== "active") return null;
  const opponent = competition.legBuffer?.opponent ?? competition.opponentPool[competition.roundIndex % competition.opponentPool.length];
  const calendarSlot = competition.scheduledDates?.[competition.roundIndex];
  applyRecoveryIntervalPenalty(state.userTeamId, calendarSlot?.isoDate, competition.name);
  const teamPower = teamPhaseRating(state.userTeamId, "attack") + teamPhaseRating(state.userTeamId, "defense");
  const normalizedTeamPower = clamp(teamPower * 2.6 + teamById(state.userTeamId).morale, 45, 105);
  const venueBias = opponent.venue === "home" ? 0.16 : opponent.venue === "away" ? -0.12 : chance(0.5) ? 0.08 : -0.03;
  let { teamGoals, opponentGoals } = rollCupScore(normalizedTeamPower, opponent.power, venueBias);
  const userTeamName = teamById(state.userTeamId).name;
  const venueText = opponent.venue ? ` (${opponent.venue})` : "";
  const resultText = `${competition.name} ${currentCupRound(competition)}${venueText}: ${userTeamName} ${teamGoals}-${opponentGoals} ${opponent.name}`;

  competition.record.played += 1;
  competition.record.goalsFor += teamGoals;
  competition.record.goalsAgainst += opponentGoals;

  if (competition.type === "league-phase" && competition.roundIndex < 8) {
    updateSwissLeagueTable(competition, opponent, teamGoals, opponentGoals);
    simulateOtherSwissFixtures(competition, competition.roundIndex);
    if (teamGoals > opponentGoals) {
      competition.record.won += 1;
      competition.record.points += 3;
    } else if (teamGoals < opponentGoals) {
      competition.record.lost += 1;
    } else {
      competition.record.drawn += 1;
      competition.record.points += 1;
    }
    competition.history.unshift(`${resultText} - ${opponent.drawRule ?? `Pot ${opponent.pot}`}, country block checked`);
    competition.roundIndex += 1;
    competition.swissTable = sortSwissStandings(competition.swissTable).map((row, index) => ({ ...row, rank: index + 1 }));
    if (competition.roundIndex === 8) {
      evaluateSwissLeaguePhase(competition);
    }
    return resultText;
  }

  if (competition.type === "league-phase") {
    return resolveTwoLeggedEuropeanTie(competition, opponent, normalizedTeamPower, resultText, teamGoals, opponentGoals);
  }

  if (teamGoals === opponentGoals) {
    if (competition.rules?.allowReplay) {
      competition.history.unshift(`${resultText} - replay required`);
      return `${resultText} - replay required`;
    }
    const extraTimeTeam = chance(clamp(normalizedTeamPower / (normalizedTeamPower + opponent.power), 0.28, 0.72));
    if (chance(0.62)) {
      if (extraTimeTeam) teamGoals += 1;
      else opponentGoals += 1;
    }
    if (teamGoals === opponentGoals) {
      const wonShootout = chance(clamp(normalizedTeamPower / (normalizedTeamPower + opponent.power), 0.3, 0.7));
      competition.history.unshift(`${resultText} - ${wonShootout ? "advanced" : "eliminated"} on penalties`);
      if (!wonShootout) {
        competition.record.lost += 1;
        competition.status = "eliminated";
        return `${resultText} - eliminated on penalties`;
      }
      teamGoals += 1;
    }
  }

  if (teamGoals > opponentGoals) {
    competition.record.won += 1;
    competition.history.unshift(`${resultText} - advanced`);
    competition.roundIndex += 1;
    if (competition.roundIndex >= competition.weeks.length) {
      competition.status = "won";
      competition.history.unshift(`${userTeamName} win ${competition.name}.`);
      recordHonor("cup", competition.name, state.userTeamId);
    }
  } else {
    competition.record.lost += 1;
    competition.status = "eliminated";
    competition.history.unshift(`${resultText} - eliminated`);
  }

  return resultText;
}

function simulateCompetitionsForWeek(week) {
  state.competitions.forEach((competition) => {
    if (competition.status !== "active") return;
    if (competition.weeks[competition.roundIndex] !== week) return;
    const result = simulateCompetitionMatch(competition);
    if (result) addFeed(result);
  });
}

function createPitchEvent(minute, side, teamId, type, text) {
  const attackingRight = side === "home";
  const xRanges = {
    goal: attackingRight ? [92, 97] : [3, 8],
    save: attackingRight ? [78, 92] : [8, 22],
    shot: attackingRight ? [68, 88] : [12, 32],
    injury: attackingRight ? [36, 66] : [34, 64],
    waiting: [50, 50],
  };
  const [minX, maxX] = xRanges[type] ?? xRanges.shot;

  return {
    minute,
    teamId,
    teamName: teamById(teamId).name,
    type,
    text,
    x: rand(minX, maxX),
    y: rand(26, 74),
  };
}

function createReplayEvent(minute, type, side, text, primaryPlayer, secondaryPlayer, visual = null) {
  const fallbackTeamId = side === "home" ? state.lastMatch?.homeId : state.lastMatch?.awayId;
  const x = visual?.x ?? (side === "home" ? rand(58, 94) : rand(6, 42));
  const y = visual?.y ?? rand(28, 72);
  return {
    minute,
    type,
    side,
    text,
    player: primaryPlayer ? primaryPlayer.name : null,
    assist: secondaryPlayer ? secondaryPlayer.name : null,
    teamId: visual?.teamId ?? fallbackTeamId ?? null,
    teamName: visual?.teamName ?? (visual?.teamId ? teamById(visual.teamId)?.name : null),
    x,
    y,
    camera: type === "goal" ? "six-yard box" : type === "save" ? "keeper cam" : type === "injury" ? "medical view" : "attack view",
  };
}

function pickScorer(teamId) {
  const attackers = firstEleven(teamId).filter((player) => ["ST", "W", "AM", "CM"].includes(player.role));
  return attackers.sort((a, b) => weightedRating(b, ["finishing", "composure"]) - weightedRating(a, ["finishing", "composure"]))[rand(0, Math.min(3, attackers.length - 1))];
}

function pickShooter(teamId) {
  const attackers = firstEleven(teamId).filter((player) => ["ST", "W", "AM", "CM"].includes(player.role));
  const weighted = attackers
    .map((player) => ({
      player,
      weight: weightedRating(player, ["finishing", "composure", "longShots", "dribbling"]) + (player.role === "ST" ? 8 : 0),
    }))
    .sort((a, b) => b.weight - a.weight);
  return weighted[rand(0, Math.min(4, weighted.length - 1))]?.player ?? attackers[0];
}

function pickAssister(teamId, scorerId) {
  const creators = firstEleven(teamId).filter((player) => player.id !== scorerId && ["W", "AM", "CM", "FB", "DM"].includes(player.role));
  if (!creators.length || chance(0.18)) return null;
  const weighted = creators
    .map((player) => ({
      player,
      weight: weightedRating(player, ["passing", "vision", "crossing", "decisions"]) + (["W", "AM"].includes(player.role) ? 5 : 0),
    }))
    .sort((a, b) => b.weight - a.weight);
  return weighted[rand(0, Math.min(4, weighted.length - 1))]?.player ?? creators[0];
}

function registerInjury(player, weeks, minute, match, reason = "Injury concern") {
  if (!player || player.injuredWeeks > 0) return;
  player.injuredWeeks = weeks;
  player.availability = null;
  player.condition = clamp(player.condition - rand(8, 18), 30, 100);
  player.fatigue = clamp((player.fatigue ?? 0) + rand(8, 18), 0, 100);
  player.recentLoad = clamp((player.recentLoad ?? 0) + rand(10, 22), 0, 100);
  player.contract.morale = clamp(player.contract.morale - 1, 1, 20);
  const text = `${minute}' ${reason}: ${player.name} will miss ${player.injuredWeeks} week(s)`;
  match.events.push(text);
  const side = player.teamId === match.homeId ? "home" : "away";
  const visual = createPitchEvent(minute, side, player.teamId, "injury", text);
  match.replay.push(createReplayEvent(minute, "injury", side, text, player, null, visual));
  match.highlights.push(visual);
  captureHighlightClip(match, minute, "injury", text);
  match.specialStates = match.specialStates ?? [];
  match.specialStates.push({ minute, type: "injury", status: "decision", playerId: player.id, text });
  if (player.teamId === state.userTeamId) {
    state.pendingMatchDecision = { type: "injury", playerId: player.id, matchMinute: minute, weeks, reason };
  }
}

function resolveMatchDecision(action) {
  const decision = state.pendingMatchDecision;
  const player = state.players.find((item) => item.id === decision?.playerId);
  if (!decision || !player) return;
  if (action === "painkiller") {
    player.injuredWeeks = Math.max(1, player.injuredWeeks - 1);
    player.condition = clamp(player.condition + 8, 20, 100);
    player.hidden.injuryProneness = clamp(player.hidden.injuryProneness + 1, 1, 20);
    addFeed(`Matchday decision: ${player.name} receives pain relief and continues with higher post-match risk.`);
  } else {
    player.condition = clamp(player.condition - 4, 20, 100);
    addFeed(`Matchday decision: ${player.name} will be substituted immediately.`);
  }
  state.pendingMatchDecision = null;
  render();
}

function captureHighlightClip(match, minute, type, text) {
  const frames = orderedRewindFrames(match.engineTrace);
  const eventTick = frames.at(-1)?.absoluteTick ?? minute * MATCH_TICKS_PER_MINUTE;
  const cameraDirector = cameraDirectorForEvent(type);
  match.highlightClips = match.highlightClips ?? [];
  match.highlightClips.push({
    type,
    text,
    minute,
    eventTick,
    startTick: Math.max(0, eventTick - REWIND_BUFFER_TICKS),
    endTick: eventTick + MATCH_LOGIC_TICK_RATE * (type === "goal" ? 5 : 3),
    inPoint: Math.max(1, minute - 1),
    preRollSeconds: REWIND_BUFFER_SECONDS,
    postRollSeconds: type === "goal" ? 5 : 3,
    cameraDirector,
    frames,
  });
  match.engineTrace.highlightTriggers = (match.engineTrace.highlightTriggers ?? 0) + 1;
  logAbstractMatchEvent(match, {
    tick: eventTick,
    gameMinute: minute,
    eventType: type.toUpperCase(),
    actorId: null,
    actor: null,
    startPos: frames.at(-1)?.ball ? { x: frames.at(-1).ball.x, y: frames.at(-1).ball.y } : null,
    pressure: null,
    aiState: null,
    dangerous: true,
    commentary: text,
  });
}

function cameraDirectorForEvent(type) {
  const sequences = {
    goal: ["broadcast-pan", "goal-behind", "celebration-closeup", "scoreboard-goal"],
    save: ["broadcast-pan", "keeper-cam", "rebound-check"],
    shot: ["broadcast-pan", "attack-closeup", "reaction-closeup"],
    injury: ["eye-level-drama", "medical-view", "touchline-decision"],
    var: ["eye-level-drama", "slow-motion", "var-overlay", "referee-decision"],
    substitution: ["touchline-pip", "digital-board", "player-handshake"],
  };
  return sequences[type] ?? ["broadcast-pan"];
}

function maybeCollisionInjury(duel, attacker, defender, minute, match) {
  [attacker, defender].filter(Boolean).forEach((player) => {
    const lowCondition = player.condition < 70 ? 1.85 : 1;
    const injuryRisk = (player.hidden.injuryProneness / 20) * (duel.collisionForce / 180) * lowCondition;
    if (!chance(injuryRisk)) return;
    const severe = duel.collisionForce > 24 && player.hidden.injuryProneness >= 16 && chance(0.35);
    registerInjury(player, severe ? rand(5, 12) : rand(1, 4), minute, match, severe ? "Severe collision injury" : "Collision injury");
  });
}

function checkInjuries(teamId, weather, tactics, minute, match) {
  if (!chance(0.0038 * weather.injury * (tactics.pressing / 12) * (tactics.tempo / 13))) return;
  const candidates = firstEleven(teamId).filter((player) => player.injuredWeeks === 0);
  if (!candidates.length) return;
  const player = candidates[rand(0, candidates.length - 1)];
  const fatigueRisk = (100 - player.condition) / 180;
  const accumulatedFatigue = (player.fatigue ?? 0) / 160;
  const staminaRisk = (100 - playerStaminaScore(player)) / 240;
  const risk = (player.hidden.injuryProneness / 20) * 0.22 + fatigueRisk + accumulatedFatigue + staminaRisk;
  if (!chance(risk)) return;

  registerInjury(player, rand(1, 4), minute, match, player.condition < 70 ? "Muscle fatigue injury" : "Injury concern");
}

function applyResult(match) {
  if (match.applied) return;
  match.applied = true;
  const homeRow = state.table.find((row) => row.teamId === match.homeId);
  const awayRow = state.table.find((row) => row.teamId === match.awayId);
  const homeGoals = match.score.home;
  const awayGoals = match.score.away;

  homeRow.played += 1;
  awayRow.played += 1;
  homeRow.goalsFor += homeGoals;
  homeRow.goalsAgainst += awayGoals;
  awayRow.goalsFor += awayGoals;
  awayRow.goalsAgainst += homeGoals;

  const homeWon = homeGoals > awayGoals;
  const awayWon = awayGoals > homeGoals;
  const leagueFixture = state.fixtures
    .flat()
    .find((fixture) => fixture[0] === match.homeId && fixture[1] === match.awayId && !fixture.result);
  if (leagueFixture) {
    leagueFixture.result = {
      home: homeGoals,
      away: awayGoals,
      outcome: homeWon ? "H" : awayWon ? "A" : "D",
    };
    leagueFixture.status = "PLAYED";
  }
  if (homeWon) {
    homeRow.won += 1;
    awayRow.lost += 1;
    homeRow.points += 3;
    teamById(match.homeId).morale = clamp(teamById(match.homeId).morale + 1, 1, 20);
    teamById(match.awayId).morale = clamp(teamById(match.awayId).morale - 1, 1, 20);
    teamById(match.homeId).winStreak = (teamById(match.homeId).winStreak ?? 0) + 1;
    teamById(match.awayId).winStreak = 0;
  } else if (awayWon) {
    awayRow.won += 1;
    homeRow.lost += 1;
    awayRow.points += 3;
    teamById(match.awayId).morale = clamp(teamById(match.awayId).morale + 1, 1, 20);
    teamById(match.homeId).morale = clamp(teamById(match.homeId).morale - 1, 1, 20);
    teamById(match.awayId).winStreak = (teamById(match.awayId).winStreak ?? 0) + 1;
    teamById(match.homeId).winStreak = 0;
  } else {
    homeRow.drawn += 1;
    awayRow.drawn += 1;
    homeRow.points += 1;
    awayRow.points += 1;
    teamById(match.homeId).winStreak = 0;
    teamById(match.awayId).winStreak = 0;
  }

  const playedIds = new Set([...(match.lineups?.home ?? []), ...(match.lineups?.away ?? [])]);
  const homePlayedIds = new Set(match.lineups?.home ?? []);
  const awayPlayedIds = new Set(match.lineups?.away ?? []);
  [match.homeId, match.awayId].forEach((teamId) => {
    const teamWon = teamId === match.homeId ? homeWon : awayWon;
    const teamLost = teamId === match.homeId ? awayWon : homeWon;
    const tactic = teamId === state.userTeamId ? state.tactics : teamById(teamId).tactics;
    const starterIds = teamId === match.homeId ? homePlayedIds : awayPlayedIds;
    playersForTeam(teamId).forEach((player) => {
      if (starterIds.has(player.id)) {
        player.benchStreak = 0;
        const workRateLoad = player.attributes.workRate / 7;
        const staminaRelief = (player.attributes.stamina + player.attributes.naturalFitness) / 9;
        const tacticalLoad = tactic.pressing / 5 + tactic.tempo / 6;
        const load = clamp(Math.round(7 + tacticalLoad + workRateLoad - staminaRelief + rand(-2, 3)), 4, 18);
        player.condition = clamp(player.condition - load, 25, 100);
        player.fatigue = clamp((player.fatigue ?? 0) + load + rand(0, 5), 0, 100);
        player.recentLoad = clamp((player.recentLoad ?? 0) + load + rand(5, 12), 0, 100);
        player.matchMinutes = (player.matchMinutes ?? 0) + 90;
        player.seasonStarts = (player.seasonStarts ?? 0) + 1;
        player.contract.morale = clamp(player.contract.morale + (teamWon ? 1 : teamLost ? -1 : 0), 1, 20);
        player.form = clamp(player.form + (teamWon ? 1 : teamLost ? -1 : 0), 1, 20);
        if (player.age <= 24) {
          applyPlayerDevelopment(player, ["decisions", "positioning", "composure", "anticipation"], 0.08, "match");
        }
        updatePlayerMoodAfterMatch(player, match, Number(playerMatchRating(player, match)), true);
      } else {
        if (["senior", "sub"].includes(player.squadGroup)) {
          player.benchStreak = (player.benchStreak ?? 0) + 1;
        }
        const recovery = player.injuredWeeks > 0 ? 1 : rand(4, 9);
        player.condition = clamp(player.condition + recovery, 35, 100);
        player.fatigue = clamp((player.fatigue ?? 0) - rand(5, 12), 0, 100);
        player.recentLoad = clamp((player.recentLoad ?? 0) - rand(8, 18), 0, 100);
        if (!playedIds.has(player.id) && player.contract.morale > 8 && chance(0.08)) {
          player.contract.morale = clamp(player.contract.morale - 1, 1, 20);
        }
        updatePlayerMoodAfterMatch(player, match, null, false);
      }
      if (player.injuredWeeks > 0) player.injuredWeeks -= 1;
    });
  });

  sortTable();
  if (state.mediaPressure && [match.homeId, match.awayId].includes(state.mediaPressure.teamId)) {
    state.mediaPressure = null;
  }
}

function sortTable() {
  state.table.sort((a, b) => {
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    return b.points - a.points || gdB - gdA || b.goalsFor - a.goalsFor;
  });
}

function simulateWeek() {
  if (state.seasonComplete) {
    addFeed(`Season ${state.season}/${String(state.season + 1).slice(-2)} is complete. Start next season when ready.`);
    return render();
  }

  if (state.week > state.fixtures.length) {
    completeSeason();
    return render();
  }

  const weekPlayed = state.week;
  const round = state.fixtures[weekPlayed - 1];
  const summaries = round.map(([homeId, awayId]) => {
    const fixture = round.find((pair) => pair[0] === homeId && pair[1] === awayId);
    applyRecoveryIntervalPenalty(homeId, fixture?.date ?? round.date, currentLeague().name);
    applyRecoveryIntervalPenalty(awayId, fixture?.date ?? round.date, currentLeague().name);
    const result = simulateMatch(homeId, awayId);
    if ([homeId, awayId].includes(state.userTeamId)) {
      state.lastMatch = result;
      state.matchdayPhase = "ready";
      state.preMatchConfirmed = false;
      state.postMatchSummary = buildPostMatchSummary(result);
      generateFanReactionForMatch(result);
      state.tactics.familiarity = normalizeTactics(state.tactics).familiarity;
      ["positioning", "roles", "mentality"].forEach((area) => {
        state.tactics.familiarity[area] = clamp((state.tactics.familiarity[area] ?? 62) + 1, 1, 100);
      });
      state.tactics.cohesion = clamp((state.tactics.cohesion ?? 62) + 1, 1, 100);
      teamById(state.userTeamId).tactics = { ...state.tactics };
    }
    return { result, text: `${teamById(homeId).name} ${result.score.home}-${result.score.away} ${teamById(awayId).name}` };
  });

  processWeeklyClubOperations(weekPlayed);
  advanceCalendarAfterMatchweek(weekPlayed);

  summaries.reverse().forEach(({ result, text }) => {
    addFeed(`${text} (${result.weather}). xG ${result.stats.home.xg.toFixed(2)}-${result.stats.away.xg.toFixed(2)}`);
  });

  if (state.week > state.fixtures.length) {
    completeSeason();
  }

  render();
}

function completeSeason() {
  state.seasonComplete = true;
  const champion = teamById(state.table[0].teamId);
  recordHonor("league", currentLeague().name, champion.id);
  state.leagueMovement = calculateLeagueMovement();
  updateDynamicReputation();
  evaluateBoardPerformance(true);
  const relegatedNames = state.leagueMovement.relegatedTeamIds.map((teamId) => teamById(teamId)?.name).filter(Boolean);
  const promotedNames = state.leagueMovement.incomingPromoted.map((team) => team.name);
  const incomingRelegatedNames = (state.leagueMovement.incomingRelegated ?? []).map((team) => team.name);
  const autoPromotedNames = state.leagueMovement.automaticPromotedTeamIds.map((teamId) => teamById(teamId)?.name).filter(Boolean);
  const playoffNames = state.leagueMovement.playoffTeamIds.map((teamId) => teamById(teamId)?.name).filter(Boolean);
  const playoffWinnerNames = state.leagueMovement.playoffWinnerTeamIds.map((teamId) => teamById(teamId)?.name).filter(Boolean);
  addFeed(`Season complete: ${champion.name} win ${state.season}/${String(state.season + 1).slice(-2)}.`);
  if (autoPromotedNames.length) addFeed(`Automatic promotion: ${autoPromotedNames.join(", ")}.`);
  if (playoffWinnerNames.length) addFeed(`Playoff winner: ${playoffWinnerNames.join(", ")} from ${playoffNames.join(", ")}.`);
  if (relegatedNames.length) addFeed(`Relegated: ${relegatedNames.join(", ")}.`);
  if (promotedNames.length) addFeed(`Promoted: ${promotedNames.join(", ")}.`);
  if (incomingRelegatedNames.length) addFeed(`Coming down from ${state.leagueMovement.rules.upperName}: ${incomingRelegatedNames.join(", ")}.`);
}

function applyWeeklyTraining() {
  const stars = trainingStarRating();
  const science = sportsScienceRating();
  const intensity = {
    recovery: { condition: 6, growth: 0, injury: -0.02 },
    balanced: { condition: 2, growth: 0.18, injury: 0 },
    high: { condition: -4, growth: 0.34, injury: 0.035 },
  }[state.trainingIntensity] ?? { condition: 2, growth: 0.18, injury: 0 };
  const focusMap = {
    tactical: ["decisions", "positioning", "teamwork"],
    attacking: ["finishing", "dribbling", "vision"],
    defensive: ["tackling", "positioning", "strength"],
    physical: ["stamina", "pace", "naturalFitness"],
  };
  const attributes = focusMap[state.trainingFocus] ?? focusMap.tactical;
  if (state.trainingFocus === "tactical") {
    state.tactics.familiarity = normalizeTactics(state.tactics).familiarity;
    Object.keys(state.tactics.familiarity).forEach((area) => {
      state.tactics.familiarity[area] = clamp(state.tactics.familiarity[area] + (state.trainingIntensity === "high" ? 3 : 2), 1, 100);
    });
    state.tactics.cohesion = clamp((state.tactics.cohesion ?? 62) + (state.trainingIntensity === "high" ? 3 : 2), 1, 100);
    teamById(state.userTeamId).tactics = { ...state.tactics };
  }
  playersForTeam(state.userTeamId).forEach((player) => {
    const recoveryBonus = player.injuredWeeks > 0 ? -2 : Math.round(player.attributes.naturalFitness / 6);
    player.condition = clamp(player.condition + intensity.condition + recoveryBonus + rand(-2, 2), 35, 100);
    player.fatigue = clamp((player.fatigue ?? 0) - (state.trainingIntensity === "recovery" ? rand(12, 20) : rand(4, 10)), 0, 100);
    player.recentLoad = clamp((player.recentLoad ?? 0) + (state.trainingIntensity === "high" ? rand(4, 9) : rand(-8, 2)), 0, 100);
    applyPlayerDevelopment(player, attributes, intensity.growth * (0.72 + stars / 5), "training");
    if (chance(Math.max(0, player.hidden.injuryProneness / 420 + intensity.injury - science / 1600))) {
      player.injuredWeeks = Math.max(player.injuredWeeks, rand(1, 2));
      player.availability = null;
      player.contract.morale = clamp(player.contract.morale - 1, 1, 20);
      if (state.staffDelegation.medicalAlerts) addFeed(`Medical alert: ${player.name} picked up a training knock. Sports science rating ${science}/20.`);
    }
  });

  state.players
    .filter((player) => player.teamId !== state.userTeamId)
    .forEach((player) => {
      player.condition = clamp(player.condition + rand(2, 8), 35, 100);
      player.fatigue = clamp((player.fatigue ?? 0) - rand(4, 12), 0, 100);
      player.recentLoad = clamp((player.recentLoad ?? 0) - rand(4, 12), 0, 100);
      if (player.injuredWeeks > 0 && chance(0.25)) player.injuredWeeks -= 1;
    });
}

function processRandomPlayerIncidents() {
  state.players.forEach((player) => {
    if (player.availability?.weeks > 0) {
      player.availability.weeks -= 1;
      if (player.availability.weeks <= 0) {
        if (player.teamId === state.userTeamId) addFeed(`${player.name} is available again after ${player.availability.label.toLowerCase()}.`);
        player.availability = null;
      }
    }

    if (player.injuredWeeks > 0 || player.availability?.blocksMatch) return;

    const fatigueRisk = (player.fatigue ?? 0) / 900;
    const loadRisk = (player.recentLoad ?? 0) / 1200;
    const professionalismRisk = (20 - (player.hidden.professionalism ?? 10)) / 1700;
    const injuryRisk = (player.hidden.injuryProneness ?? 10) / 2600;
    const risk = 0.003 + fatigueRisk + loadRisk + professionalismRisk + injuryRisk;
    if (!chance(risk)) return;

    const roll = Math.random();
    if (roll < 0.42) {
      player.availability = {
        type: "fever",
        label: "Fever",
        weeks: 1,
        blocksMatch: true,
        className: "illness",
      };
      player.condition = clamp(player.condition - rand(8, 16), 30, 100);
      player.fatigue = clamp((player.fatigue ?? 0) + rand(10, 18), 0, 100);
      player.contract.morale = clamp(player.contract.morale - 1, 1, 20);
      if (player.teamId === state.userTeamId) addFeed(`Medical update: ${player.name} has a fever and is unavailable this week.`);
    } else if (roll < 0.74) {
      player.availability = {
        type: "skippedTraining",
        label: "Skipped training",
        weeks: 1,
        blocksMatch: false,
        className: "discipline",
      };
      player.discipline = player.discipline ?? { lateArrivals: 0, skippedTraining: 0 };
      player.discipline.skippedTraining = (player.discipline.skippedTraining ?? 0) + 1;
      player.form = clamp(player.form - 1, 1, 20);
      player.contract.morale = clamp(player.contract.morale - 2, 1, 20);
      player.fatigue = clamp((player.fatigue ?? 0) + rand(3, 8), 0, 100);
      if (player.teamId === state.userTeamId) addFeed(`Discipline: ${player.name} skipped training. Morale and sharpness dropped.`);
    } else {
      player.availability = {
        type: "late",
        label: "Late arrival",
        weeks: 1,
        blocksMatch: false,
        className: "discipline",
      };
      player.discipline = player.discipline ?? { lateArrivals: 0, skippedTraining: 0 };
      player.discipline.lateArrivals = (player.discipline.lateArrivals ?? 0) + 1;
      player.contract.morale = clamp(player.contract.morale - 1, 1, 20);
      if (player.teamId === state.userTeamId) addFeed(`Discipline: ${player.name} arrived late for training.`);
    }
  });
}

function addLifeEvent(player, type, title, detail, actions) {
  if (!player || state.lifeEvents.some((event) => event.playerId === player.id && event.type === type && !event.resolved)) return;
  state.lifeEvents.unshift({
    id: `${state.season}-${state.week}-${player.id}-${type}`,
    playerId: player.id,
    type,
    title,
    detail,
    actions,
    resolved: false,
  });
  state.lifeEvents = state.lifeEvents.slice(0, 18);
  addFeed(`Inbox decision: ${title}`);
}

function processNarrativeLifeEvents() {
  playersForTeam(state.userTeamId).forEach((player) => {
    const homesick = (player.dynamics?.homesickWeeks ?? 0) >= 2 && player.age <= 23;
    if (homesick && chance(0.24)) {
      addLifeEvent(player, "homesick", `${player.name} requests compassionate leave`, "The player is struggling away from home and asks for two weeks with family.", ["grantLeave", "refuseLeave"]);
    }
    if ((player.hidden.professionalism ?? 10) <= 8 && chance(0.018)) {
      addLifeEvent(player, "nightlife", `${player.name} breached club discipline`, "Staff report a late-night club visit before training. The dressing room expects a response.", ["warning", "fineOneWeek", "fineTwoWeeks"]);
    }
    if ((player.hidden.professionalism ?? 10) <= 10 && (player.hidden.ambition ?? 10) >= 14 && chance(0.012)) {
      addLifeEvent(player, "tacticsCriticism", `${player.name} criticised the tactics`, "A media interview questioned the team's tactical direction.", ["privateTalk", "warning", "fineOneWeek"]);
    }
    if ((player.hidden.ambition ?? 10) >= 15 && player.hidden.currentAbility >= 140 && chance(0.012)) {
      addLifeEvent(player, "agentDemand", `${player.name}'s agent demands a major raise`, "The agent claims larger clubs are watching and asks for a three-times wage package.", ["acceptAgentDemand", "negotiateAgent", "refuseAgent"]);
    }
  });
}

function resolveLifeEvent(eventId, action) {
  const event = state.lifeEvents.find((item) => item.id === eventId && !item.resolved);
  const player = state.players.find((item) => item.id === event?.playerId);
  if (!event || !player) return;
  event.resolved = true;
  let note = "";
  if (action === "grantLeave") {
    player.availability = { type: "compassionateLeave", label: "Compassionate leave", weeks: 2, blocksMatch: true, className: "illness" };
    player.dynamics.homesickWeeks = 0;
    player.contract.happiness = clamp(player.contract.happiness + 3, 1, 20);
    note = `${player.name} received two weeks of compassionate leave.`;
  } else if (action === "refuseLeave") {
    player.contract.morale = clamp(player.contract.morale - 3, 1, 20);
    player.contract.happiness = clamp(player.contract.happiness - 4, 1, 20);
    player.dynamics.transferRequest = chance(0.58);
    player.availability = { type: "absent", label: "Absent from training", weeks: 1, blocksMatch: true, className: "discipline" };
    note = `${player.name} reacted badly after compassionate leave was refused.`;
  } else if (action === "warning" || action === "privateTalk") {
    player.contract.morale = clamp(player.contract.morale - (action === "warning" ? 1 : 0), 1, 20);
    player.hidden.professionalism = clamp(player.hidden.professionalism + 1, 1, 20);
    note = `${player.name} received a ${action === "warning" ? "formal warning" : "private meeting"}.`;
  } else if (action === "fineOneWeek" || action === "fineTwoWeeks") {
    const weeks = action === "fineTwoWeeks" ? 2 : 1;
    teamById(state.userTeamId).budget += player.contract.wage * weeks;
    player.hidden.professionalism = clamp(player.hidden.professionalism + 1, 1, 20);
    player.contract.morale = clamp(player.contract.morale - weeks, 1, 20);
    note = `${player.name} was fined ${weeks} week(s) wages.`;
  } else if (action === "acceptAgentDemand") {
    player.contract.wage *= 3;
    player.contract.happiness = clamp(player.contract.happiness + 3, 1, 20);
    note = `${player.name} signed the agent's requested wage package.`;
  } else if (action === "negotiateAgent") {
    player.contract.wage = Math.round(player.contract.wage * 1.65);
    player.contract.happiness = clamp(player.contract.happiness + 1, 1, 20);
    note = `${player.name}'s agent accepted a negotiated wage increase.`;
  } else {
    player.contract.happiness = clamp(player.contract.happiness - 4, 1, 20);
    player.dynamics.mediaComplaint = true;
    player.dynamics.transferRequest = chance(0.55);
    triggerSquadRevolt(player.teamId, player, "contract handling");
    note = `${player.name}'s agent left talks unhappy.`;
  }
  addFeed(`Club decision: ${note}`);
  render();
}

function ageGrowthModifier(age) {
  if (age <= 18) return 1.42;
  if (age <= 21) return 1.28;
  if (age <= 24) return 1.08;
  if (age <= 27) return 0.54;
  if (age <= 31) return 0.18;
  return 0.05;
}

function matchExposureModifier(player) {
  const league = currentLeague();
  const leagueChallenge = clamp((league.level ?? 78) / Math.max(55, player.hidden.currentAbility), 0.55, 1.28);
  const apps = player.stats?.appearances ?? 0;
  return clamp(0.78 + Math.min(apps, 18) / 36, 0.78, 1.28) * leagueChallenge;
}

function attributeCaWeight(player, attribute) {
  return POSITIONAL_CA_WEIGHTS[player.role]?.[attribute] ?? 1.2;
}

function applyPlayerDevelopment(player, attributes, baseChance, source = "training") {
  if (player.hidden.currentAbility >= player.hidden.potentialAbility) {
    if (player.age >= 29 && chance(0.08)) redistributeAgingAttributes(player, attributes);
    return;
  }
  const professionalism = (player.hidden.professionalism ?? 10) / 20;
  const drive = ((player.hidden.ambition ?? 10) + (player.hidden.determination ?? 10)) / 40;
  const trainingRating = 4.8 + professionalism * 2.2 + drive * 1.5 + (player.condition ?? 80) / 120 - (player.fatigue ?? 0) / 180;
  if (trainingRating < 6 && source !== "match") return;

  const growthChance = baseChance * ageGrowthModifier(player.age) * (0.72 + professionalism) * (0.72 + drive) * matchExposureModifier(player);
  if (!chance(clamp(growthChance, 0, 0.72))) return;

  const attribute = attributes
    .map((key) => ({ key, weight: attributeCaWeight(player, key) }))
    .sort((a, b) => b.weight - a.weight)[rand(0, Math.min(2, attributes.length - 1))]?.key ?? attributes[0];
  if ((player.attributes[attribute] ?? 1) >= 20) return;

  player.attributes[attribute] = clamp(player.attributes[attribute] + 1, 1, 20);
  const caCost = attributeCaWeight(player, attribute);
  const caGain = caCost >= 6 ? 2 : caCost >= 3 ? 1 : chance(0.25) ? 1 : 0;
  player.hidden.currentAbility = clamp(player.hidden.currentAbility + caGain, 1, player.hidden.potentialAbility);
  player.hidden.caCost = positionalCaCost(player.role, player.attributes, player.feet);
}

function redistributeAgingAttributes(player, preferredAttributes = []) {
  const physical = ["pace", "acceleration", "stamina", "agility"];
  const source = physical.find((key) => (player.attributes[key] ?? 1) > 8);
  const target = preferredAttributes.find((key) => !physical.includes(key) && (player.attributes[key] ?? 1) < 20) ?? "decisions";
  if (!source) return;
  player.attributes[source] = clamp(player.attributes[source] - 1, 1, 20);
  player.attributes[target] = clamp((player.attributes[target] ?? 10) + 1, 1, 20);
}

function applyYouthDevelopment() {
  const focusMap = {
    balanced: ["decisions", "firstTouch", "stamina"],
    technical: ["passing", "firstTouch", "dribbling"],
    physical: ["pace", "stamina", "strength"],
    mental: ["decisions", "workRate", "teamwork"],
  };
  const attributes = focusMap[state.youthFocus] ?? focusMap.balanced;
  playersForTeam(state.userTeamId)
    .filter((player) => ["u21", "u18"].includes(player.squadGroup))
    .forEach((player) => {
      applyPlayerDevelopment(player, attributes, player.squadGroup === "u18" ? 0.34 : 0.24, "academy");
    });
}

function clubReputationScore(team) {
  return clamp(team?.reputationScore ?? (team?.reputation ?? 60) * 100, 100, 10000);
}

function playerReputationScore(player) {
  const club = teamById(player.teamId);
  const clubLift = club ? clubReputationScore(club) * 0.22 : 1800;
  const abilityLift = (player.hidden.currentAbility ?? 90) * 31 + (player.hidden.potentialAbility ?? 120) * 9;
  const formLift = (player.form ?? 10) * 55;
  const ageLift = player.age <= 22 && player.hidden.potentialAbility >= 155 ? 550 : 0;
  return clamp(Math.round(clubLift + abilityLift + formLift + ageLift), 500, 10000);
}

function reputationGateAllows(player, club = teamById(state.userTeamId)) {
  const clubRep = clubReputationScore(club);
  const playerRep = playerReputationScore(player);
  return {
    allowed: clubRep >= playerRep - 1500,
    clubRep,
    playerRep,
    gap: playerRep - clubRep,
  };
}

function setClubReputation(team, score) {
  team.reputationScore = clamp(Math.round(score), 100, 10000);
  team.reputation = clamp(Math.round(team.reputationScore / 100), 1, 100);
}

function updateDynamicReputation() {
  const league = currentLeague();
  const previousLeagueRep = state.leagueReputation[league.id] ?? clamp((league.level ?? 75) * 100, 1000, 10000);
  state.table.forEach((row, index) => {
    const team = teamById(row.teamId);
    const performance = Math.round((state.teams.length - index) * 11 - state.teams.length * 4.5);
    const championBonus = index === 0 ? 180 : index <= 3 ? 75 : 0;
    const relegationPenalty = state.leagueMovement?.relegatedTeamIds?.includes(team.id) ? -260 : 0;
    setClubReputation(team, clubReputationScore(team) + performance + championBonus + relegationPenalty);
    if (team.id === state.userTeamId && performance + championBonus > 0) {
      const sponsorLift = Math.round((performance + championBonus) * 24_000);
      team.budget += sponsorLift;
      addFeed(`Reputation growth attracted ${money(sponsorLift)} in improved sponsor support.`);
    }
  });
  const topFour = state.table.slice(0, 4).map((row) => clubReputationScore(teamById(row.teamId)));
  const leagueLift = Math.round((topFour.reduce((sum, value) => sum + value, 0) / Math.max(1, topFour.length) - previousLeagueRep) * 0.08);
  state.leagueReputation[league.id] = clamp(previousLeagueRep + leagueLift, 1000, 10000);
}

function createAvailableManager(seed = "Free Coach", reputation = 68) {
  const manager = createAIManagerProfile(seed, reputation);
  manager.status = "available";
  manager.currentTeamId = null;
  manager.name = `${randomNationality(seed).split(" ")[0] || seed.split(" ")[0]} ${["Martinez", "Wilson", "Kovac", "Silva", "Rossi", "Hughes", "Schmidt"][rand(0, 6)]}`;
  return manager;
}

function seedManagerPool(count = 12) {
  state.managerPool = Array.from({ length: count }, (_, index) => createAvailableManager(`Manager ${index + 1}`, rand(58, 88)));
}

function aiBoardScore(team) {
  const position = state.table.findIndex((row) => row.teamId === team.id) + 1 || state.teams.length;
  const target = team.boardTargetRank ?? 12;
  const positionScore = clamp(100 - Math.max(0, position - target) * 12 + Math.max(0, target - position) * 4, 0, 100);
  const moraleScore = (team.morale ?? 10) * 4;
  const financeScore = transferBudgetPressure(team).mustSell ? 30 : 68;
  return clamp(Math.round(positionScore * 0.58 + moraleScore * 0.22 + financeScore * 0.2), 0, 100);
}

function hireAIManager(team) {
  if (!state.managerPool.length) seedManagerPool(8);
  const preferred = state.managerPool
    .filter((manager) => clubReputationScore(team) >= manager.reputationScore - 1600)
    .sort((a, b) => b.reputationScore - a.reputationScore || b.riskTolerance - a.riskTolerance)[0] ?? state.managerPool[0];
  state.managerPool = state.managerPool.filter((manager) => manager !== preferred);
  preferred.status = "employed";
  preferred.currentTeamId = team.id;
  preferred.jobSecurity = rand(54, 78);
  team.aiManager = preferred;
  team.jobVacant = false;
  team.tactics.formation = preferred.preferredFormation;
  team.tactics.mentality = preferred.tacticalDirection === "attacking" ? "positive" : preferred.tacticalDirection === "defensive" ? "cautious" : "balanced";
  state.jobMarketHistory.unshift(`Week ${state.week}: ${team.name} hired ${preferred.name} (${preferred.preferredFormation}, ${preferred.transferStyle}).`);
  state.jobMarketHistory = state.jobMarketHistory.slice(0, 18);
  addTransferNews(`${team.name} appoint ${preferred.name}`, `${preferred.tacticalDirection} coach prefers ${preferred.preferredFormation} and ${preferred.transferStyle} recruitment.`, "manager");
}

function sackAIManager(team, reason) {
  if (!team.aiManager || team.id === state.userTeamId) return;
  const oldManager = team.aiManager;
  oldManager.status = "available";
  oldManager.currentTeamId = null;
  oldManager.jobSecurity = 35;
  state.managerPool.unshift(oldManager);
  team.jobVacant = true;
  state.jobMarketHistory.unshift(`Week ${state.week}: ${team.name} sacked ${oldManager.name}. ${reason}`);
  state.jobMarketHistory = state.jobMarketHistory.slice(0, 18);
  addTransferNews(`${team.name} sack ${oldManager.name}`, reason, "manager");
  hireAIManager(team);
}

function processAIManagerJobMarket() {
  if (state.week < 5) return;
  state.teams
    .filter((team) => team.id !== state.userTeamId)
    .forEach((team) => {
      const score = aiBoardScore(team);
      const danger = score < 28 || (score < 42 && chance(0.18));
      if (danger) {
        sackAIManager(team, `Board score ${score}/100, target rank ${team.boardTargetRank}.`);
      } else if (team.aiManager) {
        team.aiManager.jobSecurity = clamp(Math.round(score * 0.75 + rand(8, 20)), 1, 100);
      } else if (team.jobVacant) {
        hireAIManager(team);
      }
    });
}

function nextPlayerId() {
  return Math.max(...state.players.map((player) => player.id), 0) + 1;
}

function processRetirements() {
  const retiring = state.players.filter((player) => player.age >= 39 || (player.age >= 35 && chance(0.2 + (player.age - 35) * 0.14)));
  const retiringIds = new Set(retiring.map((player) => player.id));
  state.players = state.players.filter((player) => !retiringIds.has(player.id));
  const userRetirements = retiring.filter((player) => player.teamId === state.userTeamId);
  if (userRetirements.length) addFeed(`Retirement: ${userRetirements.map((player) => player.name).join(", ")} left professional football.`);
}

function runYouthIntake() {
  let id = nextPlayerId();
  const roles = ["GK", "CB", "FB", "DM", "CM", "AM", "W", "ST"];
  const youthDirector = state.staff.find((member) => member.role === "Head of Youth Development");
  const userDirectorRating = youthDirector?.attributes?.workingWithYoungsters ?? 11;
  const league = currentLeague();
  state.teams.forEach((team) => {
    const count = team.id === state.userTeamId ? rand(4, 6) : rand(2, 4);
    for (let index = 0; index < count; index += 1) {
      const directorLift = team.id === state.userTeamId ? userDirectorRating : Math.round(team.reputation / 7);
      const networkCountries = team.id === state.userTeamId
        ? Object.entries(state.scoutingKnowledge).filter(([, knowledge]) => knowledge >= 55).map(([country]) => country)
        : [];
      const nationality = chance(0.72) ? league.country : networkCountries[rand(0, Math.max(0, networkCountries.length - 1))] ?? randomNationality(team.name);
      const academyPower = (team.youthFacilities ?? 10) * 1.25 + (team.youthRecruitment ?? 10) * 1.45 + directorLift;
      const wonderkidRoll = academyPower + rand(1, 100);
      const quality = clamp(Math.round(4 + team.youthFacilities / 2.4 + team.youthRecruitment / 3 + directorLift / 4 + rand(-3, 4) + (wonderkidRoll > 118 ? 3 : 0)), 5, 18);
      const player = createPlayer(id++, randomAcademyName(state.newgenCounter++), roles[rand(0, roles.length - 1)], rand(15, 16), quality, team.id, {
        squadGroup: "u18",
        realName: false,
        nationality,
        contractSource: "academy intake",
        professionalism: rand(5, 19),
        determination: rand(5, 19),
        ambition: rand(5, 19),
      });
      player.newgen = true;
      player.portraitSeed = hashString(`${player.name}-${state.season}`);
      player.hidden.currentAbility = clamp(rand(30, 54) + Math.round((team.youthFacilities - 10) * 0.8), 25, 82);
      const paBoost = Math.round((team.youthFacilities + team.youthRecruitment + directorLift - 24) * 1.45);
      player.hidden.potentialAbility = clamp(player.hidden.potentialAbility + paBoost + (wonderkidRoll > 128 ? rand(18, 34) : 0), player.hidden.currentAbility, 200);
      if (player.hidden.potentialAbility >= 160 && team.id === state.userTeamId) addSocialPost("positive", `Academy watchers are buzzing about ${player.name}. The kid looks special.`, "academy");
      state.players.push(player);
    }
    assignTeamShirtNumbers(team.id);
  });
  addFeed(`Youth intake: the academy welcomed a new U18 group shaped by facilities and youth recruitment.`);
}

function boardGrade(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  if (score >= 28) return "E";
  return "F";
}

function calculateBoardPerformance() {
  const club = teamById(state.userTeamId);
  const row = state.table.find((item) => item.teamId === club.id);
  const position = Math.max(1, state.table.findIndex((item) => item.teamId === club.id) + 1);
  const resultScore = clamp(Math.round(100 - ((position - 1) / Math.max(1, state.table.length - 1)) * 84 + (row?.points ?? 0) / 4), 0, 100);
  const wages = playersForTeam(club.id).reduce((sum, player) => sum + player.contract.wage, 0);
  const financeScore = clamp(Math.round(115 - (wages / Math.max(1, club.wageBudget)) * 100), 0, 100);
  const moraleScore = clamp(Math.round(club.morale * 5), 0, 100);
  const youth = playersForTeam(club.id).filter((player) => player.age <= 22).length;
  const attackBonus = ["positive", "attacking"].includes(state.tactics.mentality) ? 22 : 10;
  const visionScore = clamp(Math.round(42 + Math.min(30, youth * 1.25) + attackBonus), 0, 100);
  const score = clamp(Math.round(resultScore * 0.4 + financeScore * 0.2 + moraleScore * 0.2 + visionScore * 0.2), 0, 100);
  return { score, resultScore, financeScore, moraleScore, visionScore, position };
}

function evaluateBoardPerformance(seasonEnd = false, recordHistory = true) {
  const metrics = calculateBoardPerformance();
  state.board.score = metrics.score;
  state.board.grade = boardGrade(metrics.score);
  state.board.metrics = metrics;
  state.board.warningLevel = metrics.score < 28 ? 2 : metrics.score < 45 ? 1 : 0;
  state.board.status = metrics.score < 20 ? "Sacked" : metrics.score < 28 ? "Boardroom meeting" : metrics.score < 45 ? "Under pressure" : metrics.score >= 80 ? "Very secure" : "Stable";
  if (recordHistory) {
    state.board.history.unshift(`${seasonEnd ? "Season review" : `Week ${state.week}`}: grade ${state.board.grade}, ${state.board.status}.`);
    state.board.history = state.board.history.slice(0, 12);
  }
  if (state.board.warningLevel && (seasonEnd || state.week % 8 === 0)) addFeed(`Board review: job security is ${state.board.status.toLowerCase()} (${state.board.grade}).`);
}

function startNextSeason() {
  applyLeagueMovement();
  processRetirements();
  state.season += 1;
  state.week = 1;
  state.seasonComplete = false;
  state.lastMatch = null;
  state.matchdayPhase = "ready";
  state.preMatchConfirmed = false;
  state.postMatchSummary = null;
  state.latestChampionNotice = null;
  state.leagueMovement = null;
  state.teamTalk = {
    lastStyle: null,
    boost: 0,
    history: [],
    reactions: [],
  };
  state.fixtures = buildHomeAwaySchedule(state.teams.map((team) => team.id));
  state.currentDate = nextUserFixture()?.isoDate ?? null;
  state.selectedOpponentId = nextUserFixture()?.fixture.find((teamId) => teamId !== state.userTeamId) ?? state.teams.find((team) => team.id !== state.userTeamId)?.id ?? state.userTeamId;
  state.table = state.teams.map((team) => ({
    teamId: team.id,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  }));
  state.teams.forEach((team) => {
    team.budget += 12_000_000 + team.reputation * 180_000;
    team.morale = clamp(10 + Math.round(team.reputation / 20), 1, 20);
    team.lastCompetitiveDate = null;
    team.lastMatchIntervalDays = null;
    team.winStreak = 0;
  });
  state.players.forEach((player) => {
    player.age += 1;
    player.condition = rand(84, 100);
    player.fatigue = rand(0, 12);
    player.recentLoad = rand(0, 8);
    player.matchMinutes = 0;
    player.seasonStarts = 0;
    player.availability = null;
    player.injuredWeeks = 0;
    player.stats = {
      appearances: 0,
      goals: 0,
      assists: 0,
      shots: 0,
      keyPasses: 0,
      yellowCards: 0,
      redCards: 0,
    };
    if (player.age <= 23 && player.hidden.currentAbility < player.hidden.potentialAbility) {
      player.hidden.currentAbility = clamp(player.hidden.currentAbility + rand(2, 7), 1, player.hidden.potentialAbility);
    }
  });
  runYouthIntake();
  refreshMarket();
  resetFinanceReport();
  initializeCompetitions();
  evaluateBoardPerformance();
  addFeed(`New season started: ${state.season}/${String(state.season + 1).slice(-2)}.`);
  render();
}

function refreshMarket() {
  const startId = Math.max(...state.players.map((player) => player.id), 0) + 1;
  const seeds = [...YOUNG_TRANSFER_TARGETS, ...FREE_AGENT_SEEDS];
  state.transferMarket = seeds.map(([name, role, age, quality, expires], index) => {
    const player = createPlayer(startId + index, name, role, age, quality, null, {
      expires,
      squadGroup: "senior",
      contractSource: index >= YOUNG_TRANSFER_TARGETS.length ? "free agent seed / unattached" : "young real-player transfer seed / approximate expiry",
    });
    player.freeAgent = index >= YOUNG_TRANSFER_TARGETS.length;
    player.askingPrice = player.freeAgent ? 0 : Math.round(player.value * (1.25 + Math.random() * 0.65));
    return player;
  });
}

function marketValueEstimate(player, club = teamById(player.teamId) ?? { reputation: 68 }) {
  const ageCurve =
    player.age <= 18 ? 1.28 :
    player.age <= 21 ? 1.42 :
    player.age <= 25 ? 1.34 :
    player.age <= 29 ? 1.12 :
    player.age <= 32 ? 0.82 :
    0.48;
  const rolePremium = player.role === "ST" ? 1.18 : ["W", "AM"].includes(player.role) ? 1.1 : player.role === "GK" ? 0.82 : 1;
  const clubPremium = clamp(club.reputation / 78, 0.72, 1.32);
  const abilityBase = player.hidden.currentAbility * 82_000 + player.hidden.potentialAbility * 118_000;
  const contractYears = Math.max(1, player.contract.expires - state.season);
  const contractPremium = clamp(0.82 + contractYears * 0.08, 0.88, 1.3);
  const formPremium = clamp(0.86 + player.form / 60, 0.9, 1.18);
  const requestDiscount = player.dynamics?.transferRequest ? 0.58 : player.dynamics?.mediaComplaint ? 0.82 : 1;
  return Math.round(abilityBase * ageCurve * rolePremium * clubPremium * contractPremium * formPremium * requestDiscount);
}

function wageEstimateFromValue(player, value) {
  const agePremium = player.age >= 29 ? 1.08 : player.age <= 21 ? 0.72 : 1;
  const rolePremium = player.role === "ST" ? 1.18 : player.role === "GK" ? 0.9 : 1;
  return Math.round(clamp(value / 520, 8_000, 420_000) * agePremium * rolePremium);
}

function normalizeTransferApiBaseUrl(value) {
  return (value || "").trim().replace(/\/+$/, "");
}

function setTransferApiBaseUrl(value) {
  state.transferApiBaseUrl = normalizeTransferApiBaseUrl(value);
  state.transferApiStatus = state.transferApiBaseUrl ? "Ready" : "Missing API URL";
}

function setTransferApiLimit(value) {
  state.transferApiLimit = clamp(Number.parseInt(value, 10) || 6, 1, 12);
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function normalizeLookupName(name) {
  return String(name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function flattenObjects(value, results = []) {
  if (!value || typeof value !== "object") return results;
  if (Array.isArray(value)) {
    value.forEach((item) => flattenObjects(item, results));
    return results;
  }
  results.push(value);
  Object.values(value).forEach((item) => flattenObjects(item, results));
  return results;
}

function findTransfermarktPlayerCandidate(payload, playerName) {
  const wanted = normalizeLookupName(playerName);
  return flattenObjects(payload)
    .filter((item) => {
      const id = item.id ?? item.playerId ?? item.player_id;
      const name = item.name ?? item.playerName ?? item.player_name;
      return id && name;
    })
    .sort((a, b) => {
      const aName = normalizeLookupName(a.name ?? a.playerName ?? a.player_name);
      const bName = normalizeLookupName(b.name ?? b.playerName ?? b.player_name);
      const aExact = aName === wanted ? 2 : aName.includes(wanted) || wanted.includes(aName) ? 1 : 0;
      const bExact = bName === wanted ? 2 : bName.includes(wanted) || wanted.includes(bName) ? 1 : 0;
      return bExact - aExact;
    })[0] ?? null;
}

function parseMarketMoney(value) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.round(value);
  if (typeof value !== "string") return null;
  const clean = value.toLowerCase().replace(/,/g, ".").replace(/\s+/g, "");
  const numeric = Number.parseFloat(clean.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric)) return null;
  const multiplier =
    clean.includes("bn") || clean.includes("b") ? 1_000_000_000 :
    clean.includes("m") ? 1_000_000 :
    clean.includes("k") || clean.includes("th") ? 1_000 :
    1;
  const currencyLift = clean.includes("€") || clean.includes("eur") ? 1.08 : 1;
  return Math.round(numeric * multiplier * currencyLift);
}

function extractTransfermarktValue(payload) {
  let best = null;
  const visit = (value, key = "") => {
    if (value == null) return;
    const lowerKey = key.toLowerCase();
    const keyLooksRight = lowerKey.includes("market") || lowerKey.includes("value");
    if (keyLooksRight) {
      const parsed = parseMarketMoney(value);
      if (parsed && (!best || parsed > best)) best = parsed;
    }
    if (typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach((item) => visit(item, key));
      return;
    }
    Object.entries(value).forEach(([childKey, childValue]) => visit(childValue, childKey));
  };
  visit(payload);
  return best;
}

async function requestTransfermarktApi(path) {
  const baseUrl = normalizeTransferApiBaseUrl(state.transferApiBaseUrl);
  if (!baseUrl) throw new Error("Missing Transfermarkt API base URL");
  const response = await fetch(`${baseUrl}${path}`, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
}

async function fetchTransfermarktPlayerSnapshot(player) {
  const searchPayload = await requestTransfermarktApi(`/players/search/${encodeURIComponent(player.realName ?? player.name)}?page_number=1`);
  const candidate = findTransfermarktPlayerCandidate(searchPayload, player.realName ?? player.name);
  if (!candidate) return null;
  const playerId = candidate.id ?? candidate.playerId ?? candidate.player_id;
  let value = extractTransfermarktValue(candidate);
  let marketPayload = null;
  if (!value && playerId) {
    marketPayload = await requestTransfermarktApi(`/players/${encodeURIComponent(playerId)}/market_value`);
    value = extractTransfermarktValue(marketPayload);
  }
  return {
    apiId: playerId,
    apiName: candidate.name ?? candidate.playerName ?? candidate.player_name ?? player.name,
    marketValue: value,
    rawMarket: marketPayload,
  };
}

async function syncMarketDataFromTransfermarktApi() {
  if (state.initialMarketSyncDone || state.initialMarketSyncRunning) {
    state.transferApiStatus = state.initialMarketSyncRunning ? "Initial sync running" : "Synced once for this career";
    addFeed("Market API sync already ran for this career.");
    return render();
  }

  const baseUrl = normalizeTransferApiBaseUrl(state.transferApiBaseUrl);
  if (!baseUrl) {
    state.transferApiStatus = "Missing API URL";
    addFeed("Add a Transfermarkt API URL before API sync.");
    return render();
  }

  state.initialMarketSyncRunning = true;
  state.transferApiStatus = "Connecting...";
  render();

  const selectedPlayers = [
    ...firstEleven(state.userTeamId),
    ...state.transferMarket.slice(0, 3),
  ].slice(0, state.transferApiLimit);
  let updated = 0;
  let failed = 0;

  for (const player of selectedPlayers) {
    try {
      const snapshot = await fetchTransfermarktPlayerSnapshot(player);
      if (!snapshot?.marketValue) {
        failed += 1;
      } else {
        player.value = snapshot.marketValue;
        player.contract.wage = Math.round(player.contract.wage * 0.4 + wageEstimateFromValue(player, snapshot.marketValue) * 0.6);
        player.contract.source = `Transfermarkt API ${snapshot.apiName} ${new Date().toISOString().slice(0, 10)}`;
        player.transfermarktId = snapshot.apiId;
        if ("askingPrice" in player) player.askingPrice = Math.round(player.value * (1.18 + Math.random() * 0.72));
        updated += 1;
      }
    } catch (error) {
      failed += 1;
      console.warn("Transfermarkt API sync failed", player.name, error);
    }
    await wait(900);
  }

  state.marketDataUpdatedAt = new Date().toLocaleDateString("en-GB");
  state.marketSource = updated ? "Transfermarkt API" : "Transfermarkt-style fallback";
  state.transferApiStatus = updated
    ? `Connected: ${updated}/${selectedPlayers.length} updated`
    : "API unavailable or rate limited";
  state.initialMarketSyncDone = true;
  state.initialMarketSyncRunning = false;

  if (!updated) {
    syncMarketDataFromTransfermarktStyle(false);
    addTransferNews(
      "Transfermarkt API fallback used",
      "The API request did not return usable values, so the game used the local valuation model for this sync.",
      "market"
    );
    addFeed("Transfermarkt API was unavailable, so the one-time career sync used local values.");
    render();
  } else {
    addTransferNews(
      "Transfermarkt API sync complete",
      `${updated} player values were updated from ${baseUrl}. ${failed ? `${failed} players stayed on local estimates.` : "All requested players returned usable market data."}`,
      "market"
    );
    addFeed(`Transfermarkt API sync complete: ${updated}/${selectedPlayers.length} players updated.`);
    render();
  }
}

function addTransferNews(headline, body, type = "rumour") {
  state.transferNews.unshift({
    week: state.week,
    season: seasonLabel(),
    type,
    headline,
    body,
  });
  state.transferNews = state.transferNews.slice(0, 80);
}

function syncMarketDataFromTransfermarktStyle(shouldRender = true) {
  state.players.forEach((player) => {
    const club = teamById(player.teamId);
    const nextValue = marketValueEstimate(player, club);
    player.value = nextValue;
    player.contract.wage = Math.round(player.contract.wage * 0.55 + wageEstimateFromValue(player, nextValue) * 0.45);
    player.contract.source = `Transfermarkt-style market sync ${new Date().toISOString().slice(0, 10)}`;
  });
  state.transferMarket.forEach((player) => {
    player.value = marketValueEstimate(player);
    player.askingPrice = Math.round(player.value * (1.18 + Math.random() * 0.72));
    player.contract.wage = wageEstimateFromValue(player, player.value);
  });
  state.marketDataUpdatedAt = new Date().toLocaleDateString("en-GB");
  state.marketSource = "Transfermarkt-style";
  state.transferApiStatus = state.transferApiStatus || "Local model";
  addTransferNews("Market values updated", "Player values and wages were recalculated using ability, potential, age curve, club reputation, contract length and form.", "market");
  addFeed("Market data synced with Transfermarkt-style valuation model.");
  if (shouldRender) render();
}

function transferWindowOpen(week = state.week) {
  return week <= 6 || (week >= 20 && week <= 25);
}

function transferBudgetPressure(team) {
  const wages = playersForTeam(team.id).reduce((sum, player) => sum + player.contract.wage, 0);
  const wageRoom = team.wageBudget - wages;
  return {
    canBuy: team.budget > 18_000_000 && wageRoom > 90_000,
    mustSell: team.budget < 6_000_000 || wageRoom < -120_000,
    wageRoom,
  };
}

function squadRoleMultiplier(status) {
  return {
    "Star Player": 1.5,
    "Regular Starter": 1.22,
    "Squad Player": 1,
    "Emergency Backup": 0.8,
  }[status] ?? 1;
}

const AGENT_PERSONALITIES = {
  moneyGrubber: {
    label: "Money Grubber",
    summary: "Chases agent fee and signing bonus before sporting pathway.",
    feeMultiplier: 1.65,
    wageFlexFromFee: 0.16,
    patienceFromFee: 10,
    patiencePenalty: 1.16,
  },
  patientAdvisor: {
    label: "Patient Advisor",
    summary: "Protects career path, playing time and club vision.",
    feeMultiplier: 0.86,
    wageFlexFromFee: 0.04,
    patienceFromFee: 4,
    patiencePenalty: 0.86,
  },
  hardNegotiator: {
    label: "Hard Negotiator",
    summary: "Pushes guaranteed money and walks if too many lines are locked.",
    feeMultiplier: 1.18,
    wageFlexFromFee: 0.08,
    patienceFromFee: 6,
    patiencePenalty: 1.04,
  },
};

function agentProfileForPlayer(player) {
  const keys = Object.keys(AGENT_PERSONALITIES);
  const key = player.agentType ?? keys[Math.abs(hashString(`${player.name}-${player.primaryNationality ?? player.nationality}`)) % keys.length];
  const profile = AGENT_PERSONALITIES[key] ?? AGENT_PERSONALITIES.hardNegotiator;
  const firstNames = ["Jorge", "Mikael", "Clara", "Rafael", "Luca", "Andre"];
  const lastNames = ["Mendes", "Stone", "Vieira", "Keller", "Romano", "Da Costa"];
  const seed = Math.abs(hashString(`${player.name}-agent-name`));
  return {
    type: key,
    name: player.agentName ?? `${firstNames[seed % firstNames.length]} ${lastNames[Math.floor(seed / 7) % lastNames.length]}`,
    ...profile,
  };
}

function contractNegotiationDemand(player, role = player.contract?.squadStatus ?? squadStatusForPlayer(player)) {
  const personality = dialoguePersonality(player);
  const agent = agentProfileForPlayer(player);
  const roleMultiplier = squadRoleMultiplier(role);
  const loyaltyDiscount = clamp(1 - Math.max(0, personality.loyalty - 10) * 0.012, 0.86, 1);
  const professionalismDiscount = clamp(1 - Math.max(0, personality.professionalism - 12) * 0.008, 0.9, 1);
  const ambitionLift = 1 + personality.ambition / 20;
  const baseWage = Math.round(player.contract.wage * ambitionLift * roleMultiplier * loyaltyDiscount * professionalismDiscount);
  const threshold = Math.round(baseWage * clamp(0.86 + personality.ambition / 150 - personality.loyalty / 220, 0.78, 0.98));
  const agentFee = Math.round(baseWage * 8 * agent.feeMultiplier);
  const appearanceBonus = Math.round(baseWage * (agent.type === "patientAdvisor" ? 0.78 : 0.52));
  return {
    wage: Math.max(player.contract.wage + 1000, baseWage),
    threshold,
    years: Math.max(player.contract.expires + 2, state.season + 2),
    role,
    signingBonus: Math.round(baseWage * 10),
    goalBonus: Math.round(baseWage * 0.9),
    appearanceBonus,
    agentFee,
    clubVision: agent.type === "patientAdvisor" ? "First-team pathway" : "Standard role pathway",
  };
}

function playerLeverage(player) {
  const statusScore = {
    "Star Player": 10,
    "Regular Starter": 7,
    "Squad Player": 4,
    "Emergency Backup": 2,
  }[player.contract?.squadStatus ?? squadStatusForPlayer(player)] ?? 4;
  const performance = Number(playerRating(player)) || player.form / 2.4;
  const yearsLeft = Math.max(0, player.contract.expires - state.season);
  return clamp(Math.round(statusScore + performance + (5 - Math.min(5, yearsLeft)) * 1.3 + (player.influence ?? 30) / 22), 1, 25);
}

function transferValuation(player, seller = teamById(player.teamId)) {
  const pressure = seller ? transferBudgetPressure(seller) : { mustSell: false };
  const listed = seller ? listedForSalePlayers().some((item) => item.player.id === player.id) : false;
  const yearsLeft = Math.max(0, player.contract.expires - state.season);
  const importance = firstEleven(player.teamId).some((starter) => starter.id === player.id) ? 1.32 : player.contract.squadStatus === "Star Player" ? 1.25 : 1;
  const listDiscount = listed || pressure.mustSell || player.dynamics?.transferRequest ? 0.78 : 1.42;
  const valuation = Math.round(player.value * (1 + yearsLeft * 0.1) * importance * listDiscount);
  return {
    valuation,
    listed,
    importance,
    mustSell: pressure.mustSell,
    releaseClause: Math.round(player.value * (2.15 + Math.max(0, player.hidden.currentAbility - 150) / 160)),
  };
}

function negotiationStatusText(context) {
  if (!context) return "";
  if (context.patience <= 0) return "Walked out";
  if (context.patience <= 25) return "Fractured";
  if (context.patience <= 55) return "Tense";
  if (context.patience <= 80) return "Cautious";
  return "Open";
}

function startContractNegotiation(playerId, source = "extension", extra = {}) {
  const player = state.players.find((candidate) => candidate.id === Number(playerId)) ?? state.transferMarket.find((candidate) => candidate.id === Number(playerId));
  if (!player) return addFeed(`No player found with id ${playerId}.`);
  if (source !== "extension") {
    const gate = reputationGateAllows(player);
    if (!gate.allowed) {
      addFeed(`${player.name} is not interested in talks. Club reputation ${gate.clubRep.toLocaleString()} is below player reputation ${gate.playerRep.toLocaleString()}.`);
      return;
    }
  }
  const demand = contractNegotiationDemand(player, extra.role ?? player.contract?.squadStatus ?? squadStatusForPlayer(player));
  const agent = agentProfileForPlayer(player);
  state.activeNegotiation = {
    type: "contract",
    source,
    playerId: player.id,
    sellerId: extra.sellerId ?? null,
    agreedFee: extra.agreedFee ?? 0,
    patience: 100,
    turn: 1,
    maxTurns: 5,
    locks: {},
    excluded: {},
    agent,
    demand,
    counter: null,
    message: `${agent.name} opens as a ${agent.label}: ${wage(demand.wage)}, ${demand.years} expiry, ${demand.role}.`,
    history: [],
  };
  render();
}

function startTransferNegotiation(playerId) {
  const player = state.players.find((candidate) => candidate.id === Number(playerId));
  const buyer = teamById(state.userTeamId);
  const seller = teamById(player?.teamId);
  if (!player || !buyer || !seller || seller.id === buyer.id) return;
  const gate = reputationGateAllows(player, buyer);
  if (!gate.allowed) return addFeed(`${player.name} is not interested in joining ${buyer.name}. Club reputation ${gate.clubRep.toLocaleString()} is too far below his reputation ${gate.playerRep.toLocaleString()}.`);
  if (player.hidden.currentAbility >= 158 && clubReputationScore(buyer) + 450 < clubReputationScore(seller)) return addFeed(`${player.name} is not interested. ${buyer.name}'s reputation does not match his current ambitions.`);
  const valuation = transferValuation(player, seller);
  state.activeNegotiation = {
    type: "transfer",
    playerId: player.id,
    sellerId: seller.id,
    patience: 100,
    turn: 1,
    maxTurns: 5,
    locks: {},
    excluded: {},
    demand: {
      upfront: valuation.valuation,
      installments: 0,
      addons: Math.round(valuation.valuation * 0.08),
      valuation,
    },
    counter: null,
    message: `${seller.name} valuation: ${money(valuation.valuation)}${valuation.listed ? " (listed)" : ""}.`,
    history: [],
  };
  render();
}

function closeNegotiation() {
  state.activeNegotiation = null;
  render();
}

function currentNegotiationPlayer() {
  const context = state.activeNegotiation;
  if (!context) return null;
  return state.players.find((player) => player.id === context.playerId) ?? state.transferMarket.find((player) => player.id === context.playerId);
}

function negotiationFieldValue(id, fallback = 0) {
  const value = document.querySelector(`#${id}`)?.value;
  return Number.parseInt(value, 10) || fallback;
}

function lockedNegotiationCount(context = state.activeNegotiation) {
  return Object.values(context?.locks ?? {}).filter(Boolean).length;
}

function excludedNegotiationCount(context = state.activeNegotiation) {
  return Object.values(context?.excluded ?? {}).filter(Boolean).length;
}

function readNegotiationOffer(context = state.activeNegotiation) {
  if (!context) return null;
  if (context.type === "contract") {
    return {
      wage: negotiationFieldValue("negWage", context.counter?.wage ?? context.demand.wage),
      years: negotiationFieldValue("negYears", context.counter?.years ?? context.demand.years),
      signingBonus: context.excluded?.signingBonus ? 0 : negotiationFieldValue("negSigningBonus", context.counter?.signingBonus ?? context.demand.signingBonus),
      goalBonus: context.excluded?.goalBonus ? 0 : negotiationFieldValue("negGoalBonus", context.counter?.goalBonus ?? context.demand.goalBonus),
      appearanceBonus: context.excluded?.appearanceBonus ? 0 : negotiationFieldValue("negAppearanceBonus", context.counter?.appearanceBonus ?? context.demand.appearanceBonus),
      agentFee: context.excluded?.agentFee ? 0 : negotiationFieldValue("negAgentFee", context.counter?.agentFee ?? context.demand.agentFee),
      role: document.querySelector("#negRole")?.value ?? context.counter?.role ?? context.demand.role,
    };
  }
  return {
    upfront: negotiationFieldValue("negUpfront", context.counter?.upfront ?? context.demand.upfront),
    installments: context.excluded?.installments ? 0 : negotiationFieldValue("negInstallments", context.counter?.installments ?? context.demand.installments),
    addons: context.excluded?.addons ? 0 : negotiationFieldValue("negAddons", context.counter?.addons ?? context.demand.addons),
  };
}

function contractOfferEffectiveValue(offer, context) {
  const agent = context.agent ?? AGENT_PERSONALITIES.hardNegotiator;
  const feeFlex = Math.min(context.demand.agentFee * 1.4, offer.agentFee ?? 0) / Math.max(1, context.demand.agentFee);
  const agentFeeCredit = context.demand.threshold * agent.wageFlexFromFee * feeFlex;
  const appearanceCredit = (offer.appearanceBonus ?? 0) * (agent.type === "patientAdvisor" ? 0.34 : 0.18);
  return offer.wage + (offer.goalBonus ?? 0) * 0.25 + (offer.signingBonus ?? 0) / 60 + appearanceCredit + agentFeeCredit;
}

function adjustedContractThreshold(context, offer) {
  const agent = context.agent ?? AGENT_PERSONALITIES.hardNegotiator;
  const rolePenalty = offer.role !== context.demand.role ? context.demand.threshold * 0.08 : 0;
  const visionPenalty = agent.type === "patientAdvisor" && context.excluded?.clubVision ? context.demand.threshold * 0.14 : 0;
  const removedPenalty = excludedNegotiationCount(context) * context.demand.threshold * 0.025;
  return Math.round(context.demand.threshold + rolePenalty + visionPenalty + removedPenalty);
}

function negotiationReaction(offer, context = state.activeNegotiation) {
  if (!context || !offer) return { text: "Waiting for offer", color: "#8492a6", className: "neutral", ratio: 0 };
  if (context.type === "contract") {
    const ratio = contractOfferEffectiveValue(offer, context) / Math.max(1, adjustedContractThreshold(context, offer));
    if (ratio >= 1.02) return { text: "Very interested", color: "#13ce66", className: "good", ratio };
    if (ratio >= 0.86) return { text: "Willing to listen", color: "#ff9900", className: "warn", ratio };
    return { text: "Unhappy with this package", color: "#ff4949", className: "bad", ratio };
  }
  const total = offer.upfront + offer.installments * 0.8 + offer.addons * 0.5;
  const ratio = total / Math.max(1, context.demand.valuation.valuation);
  if (ratio >= 1) return { text: "Club likely to accept", color: "#13ce66", className: "good", ratio };
  if (ratio >= 0.82) return { text: "Counter offer likely", color: "#ff9900", className: "warn", ratio };
  return { text: "Selling club unimpressed", color: "#ff4949", className: "bad", ratio };
}

function updateLiveNegotiationReaction() {
  const context = state.activeNegotiation;
  const reaction = negotiationReaction(readNegotiationOffer(context), context);
  const target = document.querySelector("#negLiveReaction");
  const meter = document.querySelector("#negLiveReactionMeter");
  if (target) {
    target.textContent = reaction.text;
    target.className = `live-reaction ${reaction.className}`;
  }
  if (meter) meter.style.width = `${clamp(Math.round(reaction.ratio * 100), 0, 120)}%`;
}

function toggleNegotiationLock(field) {
  const context = state.activeNegotiation;
  if (!context) return;
  context.locks = context.locks ?? {};
  context.locks[field] = !context.locks[field];
  render();
}

function toggleNegotiationExclude(field) {
  const context = state.activeNegotiation;
  if (!context) return;
  context.excluded = context.excluded ?? {};
  context.excluded[field] = !context.excluded[field];
  if (context.excluded[field]) context.locks = { ...(context.locks ?? {}), [field]: false };
  render();
}

function adjustNegotiationValue(field, delta, min = 0, max = 999999999) {
  const context = state.activeNegotiation;
  if (!context || context.locks?.[field] || context.excluded?.[field]) return;
  const input = document.querySelector(`#neg${field[0].toUpperCase()}${field.slice(1)}`);
  if (!input) return;
  input.value = clamp((Number.parseInt(input.value, 10) || 0) + delta, min, max);
  updateLiveNegotiationReaction();
}

function completeContractNegotiation(context, offer) {
  const player = currentNegotiationPlayer();
  const club = teamById(state.userTeamId);
  if (!player || !club) return;
  const totalWages = playersForTeam(state.userTeamId).reduce((sum, squadPlayer) => sum + squadPlayer.contract.wage, 0);
  if (totalWages - (player.teamId === state.userTeamId ? player.contract.wage : 0) + offer.wage > club.wageBudget) {
    context.patience = clamp(context.patience - 18, 0, 100);
    context.message = `The board blocks the package. Wage budget cannot absorb ${wage(offer.wage)}.`;
    return;
  }
  const upfrontCosts = (offer.signingBonus ?? 0) + (offer.agentFee ?? 0);
  const transferCashDue = context.source === "transfer" ? context.agreedFee ?? 0 : 0;
  if (upfrontCosts + transferCashDue > club.budget) {
    context.patience = clamp(context.patience - 14, 0, 100);
    context.message = `The board blocks upfront fees. Transfer cash, signing bonus and agent fee require ${money(upfrontCosts + transferCashDue)}.`;
    return;
  }
  if (context.source === "transfer" || context.source === "freeAgent") {
    const seller = teamById(context.sellerId);
    const fee = context.agreedFee ?? 0;
    if (fee > 0) {
      club.budget -= fee;
      if (seller) seller.budget += Math.round(fee * 0.86);
    }
    if (!state.players.includes(player)) state.players.push(player);
    state.transferMarket = state.transferMarket.filter((candidate) => candidate.id !== player.id);
    player.teamId = state.userTeamId;
    player.freeAgent = false;
    player.squadGroup = player.hidden.currentAbility >= 130 ? "senior" : "sub";
    player.joinedSeason = state.season;
    addTransferNews(`${club.name} complete ${player.name} deal`, `${fee ? `Fee ${money(fee)} plus ` : ""}${wage(offer.wage)} wage package after agent talks.`, "done");
    addSocialPost(player.hidden.currentAbility >= 145 ? "positive" : "neutral", `${player.name} joins ${club.name}. ${player.hidden.currentAbility >= 145 ? "This feels like a statement signing." : "Fans are waiting to see how he fits."}`, "transfer");
    if (seller) applySocialMoraleRipple(seller.id, player, -1, `${seller.name} dressing room reaction`);
  }
  club.budget -= upfrontCosts;
  player.contract.wage = offer.wage;
  player.contract.expires = offer.years;
  player.contract.squadStatus = offer.role;
  player.contract.happiness = clamp(player.contract.happiness + 2, 1, 20);
  player.contract.morale = clamp(player.contract.morale + 1, 1, 20);
  player.dynamics = { homesickWeeks: 0, transferRequest: false, mediaComplaint: false, loyalty: player.hidden?.loyalty ?? 10 };
  evaluateOstracism(player, state.userTeamId);
  assignTeamShirtNumbers(state.userTeamId);
  addFeed(`${player.name} agrees terms: ${wage(offer.wage)} until ${offer.years}.`);
  state.activeNegotiation = null;
}

function completeTransferFeeNegotiation(context, offer) {
  const player = currentNegotiationPlayer();
  const buyer = teamById(state.userTeamId);
  const seller = teamById(context.sellerId);
  const total = offer.upfront + offer.installments * 0.8 + offer.addons * 0.5;
  if (!player || !buyer || !seller) return;
  if (buyer.budget < offer.upfront) {
    context.patience = clamp(context.patience - 16, 0, 100);
    context.message = `${buyer.name} cannot fund the upfront cash.`;
    return;
  }
  addTransferNews(`${seller.name} accept ${player.name} bid`, `${buyer.name} agreed a package worth ${money(Math.round(total))}. Contract talks begin now.`, "rumour");
  addFeed(`${seller.name} accepted the ${player.name} package. Contract talks begin now.`);
  startContractNegotiation(player.id, "transfer", { sellerId: seller.id, agreedFee: offer.upfront });
}

function submitNegotiationOffer() {
  const context = state.activeNegotiation;
  const player = currentNegotiationPlayer();
  if (!context || !player) return;
  if (context.type === "contract") {
    const offer = readNegotiationOffer(context);
    const agent = context.agent ?? AGENT_PERSONALITIES.hardNegotiator;
    const effective = contractOfferEffectiveValue(offer, context);
    const threshold = adjustedContractThreshold(context, offer);
    const gap = threshold - effective;
    const lowballScale = gap / Math.max(1, context.demand.wage);
    const lockPenalty = Math.round(lockedNegotiationCount(context) * 5 * agent.patiencePenalty);
    context.history.push(`Offer ${wage(offer.wage)} until ${offer.years} as ${offer.role}. ${lockedNegotiationCount(context)} locked, ${excludedNegotiationCount(context)} removed.`);
    if (gap <= 0) {
      completeContractNegotiation(context, offer);
    } else if (lowballScale < 0.2) {
      const feeGoodwill = offer.agentFee >= context.demand.agentFee ? agent.patienceFromFee : 0;
      context.patience = clamp(context.patience - Math.round((player.hidden.ambition > 15 ? 14 : 10) * agent.patiencePenalty) - lockPenalty + feeGoodwill, 0, 100);
      const nextWage = Math.round(offer.wage + gap * 0.62);
      context.counter = {
        ...offer,
        wage: context.locks?.wage ? offer.wage : Math.max(nextWage, offer.wage + 1000),
        signingBonus: context.excluded?.signingBonus ? 0 : context.locks?.signingBonus ? offer.signingBonus : Math.max(offer.signingBonus, context.demand.signingBonus),
        goalBonus: context.excluded?.goalBonus ? 0 : context.locks?.goalBonus ? offer.goalBonus : Math.max(offer.goalBonus, context.demand.goalBonus),
        appearanceBonus: context.excluded?.appearanceBonus ? 0 : context.locks?.appearanceBonus ? offer.appearanceBonus : Math.max(offer.appearanceBonus, context.demand.appearanceBonus),
        agentFee: context.excluded?.agentFee ? 0 : context.locks?.agentFee ? offer.agentFee : Math.max(offer.agentFee, context.demand.agentFee),
      };
      if (excludedNegotiationCount(context)) context.counter.wage += Math.round(context.demand.threshold * 0.08 * excludedNegotiationCount(context));
      context.message = `Counter offer: ${agent.name} asks for ${wage(context.counter.wage)} and reacts ${negotiationReaction(context.counter, context).text.toLowerCase()}. Patience is now ${context.patience}.`;
    } else {
      const leverage = playerLeverage(player);
      context.patience = clamp(context.patience - Math.round((34 + leverage * 1.1 + (player.hidden.controversy ?? 10) / 2) * agent.patiencePenalty) - lockPenalty, 0, 100);
      context.message = context.patience <= 0 ? "Walk out: the offer was too far below the threshold." : "Rejected: this package is too far from the player's expectations.";
    }
  } else if (context.type === "transfer") {
    const offer = readNegotiationOffer(context);
    const total = offer.upfront + offer.installments * 0.8 + offer.addons * 0.5;
    const valuation = context.demand.valuation.valuation;
    const lockPenalty = lockedNegotiationCount(context) * 4;
    context.history.push(`Bid package ${money(Math.round(total))}: ${money(offer.upfront)} upfront. ${lockedNegotiationCount(context)} locked, ${excludedNegotiationCount(context)} removed.`);
    if (total >= valuation) {
      completeTransferFeeNegotiation(context, offer);
    } else if (total >= valuation * 0.82) {
      context.patience = clamp(context.patience - 10 - lockPenalty, 0, 100);
      const gap = valuation - total;
      context.counter = {
        upfront: context.locks?.upfront ? offer.upfront : Math.round(offer.upfront + gap * (context.excluded?.installments || context.excluded?.addons ? 0.9 : 0.72)),
        installments: context.excluded?.installments ? 0 : context.locks?.installments ? offer.installments : Math.round(offer.installments + gap * 0.22),
        addons: context.excluded?.addons ? 0 : context.locks?.addons ? offer.addons : Math.round(offer.addons + gap * 0.1),
      };
      context.message = `${teamById(context.sellerId)?.name} counter at ${money(Math.round(context.counter.upfront + context.counter.installments * 0.8 + context.counter.addons * 0.5))}.`;
    } else {
      context.patience = clamp(context.patience - 40 - lockPenalty, 0, 100);
      context.message = context.patience <= 0 ? "Walk out: the selling club ended talks." : "Rejected: lowball bid damaged the room.";
    }
  }
  if (state.activeNegotiation) state.activeNegotiation.turn = (state.activeNegotiation.turn ?? 1) + 1;
  if (state.activeNegotiation && state.activeNegotiation.turn > (state.activeNegotiation.maxTurns ?? 5)) {
    addFeed(`Negotiation expired with ${player.name}. The room ran out of turns.`);
    state.activeNegotiation = null;
  }
  if (context.patience <= 0) {
    player.contract.happiness = clamp(player.contract.happiness - 2, 1, 20);
    if (player.teamId === state.userTeamId) applySocialMoraleRipple(state.userTeamId, player, -1, "Failed negotiation");
    addFeed(`Negotiation collapsed with ${player.name}.`);
    state.activeNegotiation = null;
  }
  render();
}

function acceptNegotiationCounter() {
  const context = state.activeNegotiation;
  if (!context?.counter) return;
  if (context.type === "contract") completeContractNegotiation(context, context.counter);
  if (context.type === "transfer") completeTransferFeeNegotiation(context, context.counter);
  render();
}

function squadDesiredMatrix(team) {
  const formation = team.aiManager?.preferredFormation ?? team.tactics?.formation ?? "4-3-3";
  const slots = formationRoleSlots(formation);
  const desired = { GK: 2, CB: 4, FB: 4, DM: 2, CM: 4, AM: 2, W: 4, ST: 3 };
  slots.forEach((role) => {
    desired[role] = Math.max(desired[role] ?? 0, Math.ceil(slots.filter((slot) => slot === role).length * 2.1));
  });
  return desired;
}

function positionalNeedMatrix(team) {
  const desired = squadDesiredMatrix(team);
  const squad = playersForTeam(team.id).filter((player) => ["senior", "sub", "u21"].includes(player.squadGroup));
  return Object.entries(desired)
    .map(([role, need]) => {
      const rolePlayers = squad.filter((player) => player.role === role);
      const goodPlayers = rolePlayers.filter((player) => player.hidden.currentAbility >= team.reputation + 48 || player.contract.expires > state.season + 1);
      const expiring = rolePlayers.filter((player) => player.contract.expires <= state.season + 1).length;
      const gap = need - goodPlayers.length;
      return { role, need, have: rolePlayers.length, good: goodPlayers.length, expiring, score: gap * 24 + expiring * 10 };
    })
    .sort((a, b) => b.score - a.score);
}

function targetRolesForManager(team) {
  return positionalNeedMatrix(team)
    .filter((entry) => entry.score > 0)
    .map((entry) => entry.role);
}

function applySocialMoraleRipple(teamId, player, delta, reason) {
  if (!player || (player.influence ?? 0) < 14) return;
  playersForTeam(teamId)
    .filter((mate) => mate.id !== player.id && mate.socialGroup === player.socialGroup)
    .forEach((mate) => {
      mate.contract.morale = clamp(mate.contract.morale + delta, 1, 20);
      mate.contract.happiness = clamp(mate.contract.happiness + Math.round(delta / 2), 1, 20);
    });
  addFeed(`${reason}: ${player.socialGroup} morale moved because ${player.name} is influential.`);
  if ((player.influence ?? 0) >= 66) socialPulse(teamId, player, delta, reason, hierarchyBand(player) === "Team Leader" ? 3 : 2);
}

function evaluateOstracism(player, teamId) {
  const mates = playersForTeam(teamId).filter((mate) => mate.id !== player.id);
  const bestLink = Math.max(0, ...mates.map((mate) => socialConnectionScore(player, mate)));
  if (bestLink >= 28) {
    player.dynamics.homesickWeeks = Math.max(0, (player.dynamics.homesickWeeks ?? 0) - 1);
    return false;
  }
  const adaptationRoll = (player.hidden.adaptability ?? 10) + (player.hidden.professionalism ?? 10) + rand(1, 20);
  if (adaptationRoll < 34) {
    player.dynamics.homesickWeeks = (player.dynamics.homesickWeeks ?? 0) + 1;
    player.contract.morale = clamp(player.contract.morale - 1, 1, 20);
    player.contract.happiness = clamp(player.contract.happiness - 1, 1, 20);
    return true;
  }
  return false;
}

function evaluatePlayingTimeDrama(player, teamId) {
  const status = player.contract.squadStatus ?? squadStatusForPlayer(player, teamId);
  player.contract.squadStatus = status;
  const expected = expectedAppearancesForStatus(status);
  const actual = player.stats?.appearances ?? 0;
  if (actual + 1 >= expected) return false;
  const frustration = (expected - actual) * (0.7 + (player.hidden.ambition ?? 10) / 20) * (1.25 - (player.hidden.professionalism ?? 10) / 40);
  if (frustration < 2.1) return false;
  player.contract.happiness = clamp(player.contract.happiness - 1, 1, 20);
  if (frustration > 3.2 && !player.dynamics.mediaComplaint) {
    player.dynamics.mediaComplaint = true;
    addTransferNews(`${player.name} unhappy with role at ${teamById(teamId).name}`, `${status} expects more minutes. Agents are monitoring the situation.`, "rumour");
  }
  if (frustration > 4.6 || player.contract.happiness <= 5) {
    player.dynamics.transferRequest = true;
    player.value = marketValueEstimate(player, teamById(teamId));
    addTransferNews(`${player.name} asks to leave ${teamById(teamId).name}`, `Playing time fell below ${status} promise. Market value is discounted for interested clubs.`, "rumour");
    triggerSquadRevolt(teamId, player, "playing-time treatment");
  }
  return true;
}

function evaluateSquadDynamicsWeek() {
  state.teams.forEach((team) => {
    playersForTeam(team.id).forEach((player) => {
      recalculateInfluence(player);
      if (!player.dynamics) player.dynamics = { homesickWeeks: 0, transferRequest: false, mediaComplaint: false };
      if (evaluateOstracism(player, team.id) && team.id === state.userTeamId) {
        addFeed(`${player.name} is struggling to fit into any social group. Morale dropped.`);
      }
      evaluatePlayingTimeDrama(player, team.id);
    });
  });
}

function completeAITransfer(buyer, seller, player, fee) {
  const sellingTeamId = seller.id;
  buyer.budget -= fee;
  seller.budget += Math.round(fee * 0.86);
  player.teamId = buyer.id;
  player.squadGroup = player.hidden.currentAbility > average(firstEleven(buyer.id).map((starter) => starter.hidden.currentAbility)) ? "senior" : "sub";
  player.contract.wage = wageEstimateFromValue(player, fee);
  player.contract.expires = Math.max(player.contract.expires, state.season + rand(3, 5));
  player.contract.squadStatus = inferredSquadStatusForPlayer(player, buyer.id);
  player.joinedSeason = state.season;
  player.dynamics = { homesickWeeks: 0, transferRequest: false, mediaComplaint: false };
  addTransferNews(
    `${buyer.name} agree ${money(fee)} deal for ${player.name}`,
    `${seller.name} accepted after the offer matched club budget reality. Wage room after deal: ${wage(transferBudgetPressure(buyer).wageRoom)}.`,
    "done"
  );
  applySocialMoraleRipple(sellingTeamId, player, -1, `${seller.name} dressing room reaction`);
  applySocialMoraleRipple(buyer.id, player, 1, `${buyer.name} dressing room reaction`);
  if (evaluateOstracism(player, buyer.id)) {
    addTransferNews(`${player.name} adaptation watch`, `${buyer.name}'s staff are concerned about language and social group fit after the move.`, "rumour");
  }
}

function simulateAITransferActivity(week = state.week, force = false) {
  if (!transferWindowOpen(week)) {
    if (force) addTransferNews("Transfer window closed", "Clubs are scouting only. Completed deals restart when the next window opens.", "rumour");
    return;
  }
  const buyers = state.teams
    .filter((team) => team.id !== state.userTeamId && transferBudgetPressure(team).canBuy)
    .sort((a, b) => b.budget - a.budget)
    .slice(0, 5);
  if (!buyers.length) {
    if (force) addTransferNews("Quiet market", "No AI club has enough budget and wage room for a realistic deal this week.", "rumour");
    return;
  }
  if (!force && !chance(0.44)) return;

  const buyer = buyers[rand(0, buyers.length - 1)];
  const manager = buyer.aiManager ?? createAIManagerProfile(buyer.name, buyer.reputation);
  const wantedRoles = targetRolesForManager(buyer);
  const sellers = state.teams.filter((team) => team.id !== buyer.id && team.id !== state.userTeamId);
  const seller = sellers[rand(0, sellers.length - 1)];
  const sellerStarters = new Set(firstEleven(seller.id).map((player) => player.id));
  const candidates = playersForTeam(seller.id)
    .filter((player) => !sellerStarters.has(player.id) && ["senior", "sub", "u21"].includes(player.squadGroup))
    .filter((player) => player.value < buyer.budget * 0.38)
    .filter((player) => {
      const replacementScript = player.contract.expires <= state.season + 1 || player.dynamics?.transferRequest;
      const youthScript = manager.buyYouth >= 15 && player.age <= 19 && player.hidden.potentialAbility >= 150;
      return wantedRoles.includes(player.role) || replacementScript || youthScript;
    })
    .sort((a, b) => {
      const youthBias = manager.transferStyle === "youth" || manager.buyYouth >= 15 ? 1 : 0;
      const firstTeamBias = manager.signFirstTeam >= 15 ? 1 : 0;
      const roleBiasA = wantedRoles.includes(a.role) ? 14 : 0;
      const roleBiasB = wantedRoles.includes(b.role) ? 14 : 0;
      return (b.hidden.potentialAbility + roleBiasB + (b.age <= 19 ? youthBias * 22 : 0) + (b.age >= 26 && b.age <= 29 ? firstTeamBias * b.hidden.currentAbility * 0.18 : 0)) -
        (a.hidden.potentialAbility + roleBiasA + (a.age <= 19 ? youthBias * 22 : 0) + (a.age >= 26 && a.age <= 29 ? firstTeamBias * a.hidden.currentAbility * 0.18 : 0)) ||
        b.value - a.value;
    })
    .slice(0, 8);

  if (!candidates.length) {
    addTransferNews(`${buyer.name} scouting meeting`, `${buyer.name} are active but no realistic deal matched budget, wage room and squad need this week.`, "rumour");
    return;
  }

  const player = candidates[rand(0, candidates.length - 1)];
  const conservatism = clamp(manager.financialConservatism / 20, 0.05, 1);
  const discount = player.dynamics?.transferRequest ? 0.68 : 1;
  const fee = Math.round(player.value * discount * (0.92 + Math.random() * (0.62 - conservatism * 0.28)));
  if (buyer.budget < fee || transferBudgetPressure(buyer).wageRoom < wageEstimateFromValue(player, fee)) {
    addTransferNews(`${buyer.name} cool interest in ${player.name}`, `The package became too expensive at ${money(fee)} plus wages.`, "rumour");
    return;
  }
  if (manager.financialConservatism >= 15 && fee > player.value * 1.08) {
    addTransferNews(`${buyer.name} walk away from ${player.name}`, `${manager.name} refuses to overpay beyond the club's valuation model.`, "rumour");
    return;
  }
  completeAITransfer(buyer, seller, player, fee);
}

function buyPlayer(playerId) {
  const player = state.transferMarket.find((candidate) => candidate.id === playerId);
  const club = teamById(state.userTeamId);
  if (!player) return addFeed(`No market player found with id ${playerId}.`);
  if (club.budget < player.askingPrice) return addFeed(`Deal blocked. ${player.name} costs ${money(player.askingPrice)}.`);
  if (player.hidden.currentAbility >= 158 && clubReputationScore(club) < 7200) return addFeed(`${player.name} declined talks. Club reputation is not high enough for an elite signing yet.`);
  startContractNegotiation(player.id, player.freeAgent ? "freeAgent" : "transfer", { agreedFee: player.askingPrice ?? 0 });
}

function buyClubPlayer(playerId) {
  startTransferNegotiation(playerId);
}

function setTransferSearch(value) {
  state.transferSearch = value;
  render();
}

function setTransferRoleFilter(value) {
  state.transferRoleFilter = value;
  render();
}

function marketTrend(player) {
  const valueRatio = player.askingPrice / Math.max(1, player.value);
  if (player.freeAgent) return "Free agent";
  if (player.age <= 21 && player.hidden.potentialAbility >= 160) return "Rising";
  if (valueRatio > 1.55) return "Expensive";
  if (player.contract.expires <= state.season + 1) return "Contract chance";
  return "Stable";
}

function transferPlayerMatches(player, query) {
  const club = teamById(player.teamId);
  return !query || `${player.name} ${player.role} ${club?.name ?? "free agent"}`.toLowerCase().includes(query);
}

function listedForSalePlayers() {
  return state.teams.flatMap((team) => {
    const pressure = transferBudgetPressure(team);
    const starters = new Set(firstEleven(team.id).map((player) => player.id));
    return playersForTeam(team.id)
      .filter((player) => {
        const expiring = player.contract.expires <= state.season + 1;
        const unhappy = player.contract.morale <= 8 || player.contract.happiness <= 8;
        const surplus = !starters.has(player.id) && ["senior", "sub"].includes(player.squadGroup);
        const valuableSale = pressure.mustSell && player.value > 4_000_000;
        return player.dynamics?.transferRequest || (surplus && (expiring || unhappy || pressure.mustSell)) || valuableSale;
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, pressure.mustSell ? 4 : 2)
      .map((player) => ({
        team,
        player,
        reason: player.dynamics?.transferRequest ? "Transfer request" : pressure.mustSell ? "Budget pressure" : player.contract.expires <= state.season + 1 ? "Contract ending" : player.contract.morale <= 8 ? "Low morale" : "Surplus squad role",
      }));
  });
}

function renderTransferRows(players, query, limit = 80) {
  const rows = players
    .filter((player) => transferPlayerMatches(player, query))
    .sort((a, b) => b.value - a.value || b.hidden.potentialAbility - a.hidden.potentialAbility)
    .slice(0, limit)
    .map((player, index) => {
      const club = teamById(player.teamId);
      const canBid = club && club.id !== state.userTeamId;
      const canFree = !club;
      return `<tr>
        <td><span class="market-rank">${index + 1}</span></td>
        <td>
          <div class="market-player-cell">
            <span class="market-shirt">${shirtNo(player, player.role)}</span>
            <div><strong>${escapeHtml(player.name)}</strong><small>${player.age} yrs | ${player.role} | Rep ${playerReputationScore(player).toLocaleString()} | ${player.contract.squadStatus ?? squadStatusForPlayer(player)} | ${player.contract.source}</small></div>
          </div>
        </td>
        <td>${club ? `<span class="table-club">${teamCrest(club, "sm")}${club.name}</span>` : "<strong>Free Agent</strong><small>No club</small>"}</td>
        <td>${money(player.value)}<small>${player.dynamics?.transferRequest ? "Transfer request" : marketTrend(player)}</small></td>
        <td>${wage(player.contract.wage)}<small>${player.contract.expires}</small></td>
        <td>${player.contract.morale}/20<small>${playerStatus(player).label}</small></td>
        <td>${canFree ? `<button onclick="buyPlayer(${player.id})" type="button">Sign Free</button>` : canBid ? `<button onclick="buyClubPlayer(${player.id})" type="button">Bid</button>` : "<small>Your squad</small>"}</td>
      </tr>`;
    })
    .join("");
  return rows || `<tr><td colspan="7"><strong>No players found</strong><small>Adjust search, position, or club filter.</small></td></tr>`;
}

function movePlayerToSquad(playerId, squadGroup) {
  const player = playersForTeam(state.userTeamId).find((candidate) => candidate.id === playerId);
  if (!player || !SQUAD_GROUPS[squadGroup]) return;
  const previousGroup = player.squadGroup;
  player.squadGroup = squadGroup;
  if (!["senior", "sub"].includes(squadGroup) && Array.isArray(state.lineupPlayerIds)) {
    state.lineupPlayerIds = state.lineupPlayerIds.map((id) => id === player.id ? null : id);
    ensureUserLineup();
  }
  state.squadGroup = squadGroup;
  state.selectedPlayerId = player.id;
  const action = squadGroup === "senior" ? "promoted to the senior squad" : `moved to ${SQUAD_GROUPS[squadGroup]}`;
  addFeed(`${player.name} ${action} from ${SQUAD_GROUPS[previousGroup]}.`);
  render();
}

function setLineupSlot(playerId, slotIndex) {
  const player = playersForTeam(state.userTeamId).find((candidate) => candidate.id === Number(playerId));
  if (!player || slotIndex < 0 || slotIndex > 10) return;
  if (!isPlayerMatchAvailable(player)) {
    addFeed(`${player.name} cannot start: ${playerStatus(player).label}.`);
    return render();
  }
  ensureUserLineup();

  const previousGroup = player.squadGroup;
  if (!["senior", "sub"].includes(player.squadGroup)) {
    player.squadGroup = "senior";
  }

  const oldPlayerId = state.lineupPlayerIds[slotIndex];
  const currentSlot = state.lineupPlayerIds.findIndex((id) => id === player.id);
  if (currentSlot >= 0 && currentSlot !== slotIndex) {
    state.lineupPlayerIds[currentSlot] = oldPlayerId;
  }
  state.lineupPlayerIds[slotIndex] = player.id;

  const oldPlayer = playersForTeam(state.userTeamId).find((candidate) => candidate.id === oldPlayerId);
  if (oldPlayer && oldPlayer.id !== player.id && oldPlayer.squadGroup === "senior") {
    oldPlayer.squadGroup = "sub";
  }

  state.selectedPlayerId = player.id;
  state.squadGroup = player.squadGroup;
  state.preMatchConfirmed = false;
  addFeed(`${player.name} is now in the starting XI${previousGroup !== player.squadGroup ? ` after promotion from ${SQUAD_GROUPS[previousGroup]}` : ""}.`);
  render();
}

function negotiateContract(playerId) {
  const player = playersForTeam(state.userTeamId).find((candidate) => candidate.id === playerId);
  if (!player) return addFeed(`No squad player found with id ${playerId}.`);
  startContractNegotiation(player.id, "extension");
}

function restSquad() {
  playersForTeam(state.userTeamId).forEach((player) => {
    player.condition = clamp(player.condition + rand(7, 14), 1, 100);
    player.fatigue = clamp((player.fatigue ?? 0) - rand(12, 24), 0, 100);
    player.recentLoad = clamp((player.recentLoad ?? 0) - rand(16, 30), 0, 100);
    player.contract.morale = clamp(player.contract.morale + (activeAvailabilityIssue(player)?.blocksMatch ? 0 : 1), 1, 20);
    if (player.injuredWeeks > 0 && chance(0.35)) player.injuredWeeks -= 1;
  });
  state.trainingIntensity = "recovery";
  addFeed("Training intensity reduced. Condition improves, but no match revenue this week.");
  render();
}

const ROLE_DUTY_OPTIONS = {
  GK: ["Goalkeeper Defend", "Sweeper Keeper Support"],
  CB: ["Central Defender Defend", "Ball Playing Defender Defend", "No-Nonsense Centre-Back Defend"],
  FB: ["Full-Back Support", "Wing-Back Attack", "Inverted Wing-Back Support"],
  DM: ["Defensive Midfielder Defend", "Defensive Midfielder Support", "Deep Lying Playmaker Support"],
  CM: ["Central Midfielder Support", "Box-to-Box Midfielder Support", "Deep Lying Playmaker Support", "Mezzala Attack"],
  AM: ["Advanced Playmaker Support", "Advanced Playmaker Attack", "Shadow Striker Attack"],
  W: ["Winger Support", "Winger Attack", "Inside Forward Support", "Inside Forward Attack"],
  ST: ["Advanced Forward Attack", "Target Forward Support", "False Nine Support", "Poacher Attack"],
};

function setTacticsModule(module) {
  state.tacticsModule = module;
  render();
}

function tacticFamiliarityArea(key) {
  if (key.includes("formation") || key.includes("role")) return "roles";
  if (key.includes("marking")) return "marking";
  if (key.includes("press")) return "pressing";
  if (key.includes("defensive") || key.includes("width") || key.includes("focusPlay")) return "positioning";
  if (key.includes("possession")) return "tempo";
  if (key.includes("creative")) return "creative";
  if (key.includes("tempo")) return "tempo";
  if (key.includes("passing")) return "passing";
  return "mentality";
}

function reduceTacticalFamiliarity(key, amount = 2) {
  state.tactics.familiarity = normalizeTactics(state.tactics).familiarity;
  const area = tacticFamiliarityArea(key);
  state.tactics.familiarity[area] = clamp((state.tactics.familiarity[area] ?? 62) - amount, 1, 100);
  state.tactics.cohesion = clamp((state.tactics.cohesion ?? 62) - Math.ceil(amount / 2), 1, 100);
}

function setTactic(key, value) {
  const numericKeys = ["pressing", "tempo", "width", "line", "passingDirectness", "defensiveWidth"];
  const booleanKeys = ["passIntoSpace", "playOutOfDefence", "counterPress"];
  const path = key.split(".");
  const normalizedValue = numericKeys.includes(key)
    ? Number(value)
    : booleanKeys.includes(key)
      ? value === true || value === "true"
      : value;
  let target = state.tactics;
  path.slice(0, -1).forEach((part) => {
    target[part] = target[part] ?? {};
    target = target[part];
  });
  target[path.at(-1)] = normalizedValue;
  if (key === "possessionLost") state.tactics.counterPress = value === "counterPress";
  if (key === "formation") {
    state.formationPositions = formationShape(value).map(([slotLabel, x, y]) => ({ label: slotLabel, x, y }));
    addFeed(`Formation changed to ${value}. Your tactical shape has been adjusted automatically.`);
  }
  reduceTacticalFamiliarity(key, key === "formation" ? 4 : 2);
  teamById(state.userTeamId).tactics = { ...state.tactics };
  state.preMatchConfirmed = false;
  render();
}

function selectedTacticPlayer() {
  const starters = firstEleven(state.userTeamId);
  const selected = starters.find((player) => player.id === Number(state.selectedTacticPlayerId)) ?? starters[0];
  state.selectedTacticPlayerId = selected?.id ?? null;
  return selected;
}

function selectTacticPlayer(playerId) {
  state.selectedTacticPlayerId = Number(playerId);
  render();
}

function setPlayerRoleDuty(playerId, roleDuty) {
  const player = playersForTeam(state.userTeamId).find((candidate) => candidate.id === Number(playerId));
  if (!player) return;
  player.roleDuty = roleDuty;
  reduceTacticalFamiliarity("roles", 3);
  teamById(state.userTeamId).tactics = { ...state.tactics };
  state.preMatchConfirmed = false;
  addFeed(`${player.name} assigned ${roleDuty}.`);
  render();
}

function setPlayerInstruction(playerId, key, value) {
  const player = playersForTeam(state.userTeamId).find((candidate) => candidate.id === Number(playerId));
  if (!player) return;
  player.instructions = { ...defaultPlayerInstructions(player), ...player.instructions, [key]: value };
  reduceTacticalFamiliarity("roles", 1);
  state.preMatchConfirmed = false;
  addFeed(`${player.name}: ${label(key)} instruction set to ${label(value)}.`);
  render();
}

function trainTacticalFamiliarity(area) {
  state.tactics.familiarity = normalizeTactics(state.tactics).familiarity;
  state.tactics.familiarity[area] = clamp((state.tactics.familiarity[area] ?? 60) + rand(4, 8), 1, 100);
  state.tactics.cohesion = clamp((state.tactics.cohesion ?? 62) + rand(1, 3), 1, 100);
  teamById(state.userTeamId).tactics = { ...state.tactics };
  addFeed(`Training focus improved ${label(area)} familiarity to ${state.tactics.familiarity[area]}%.`);
  render();
}

function assistantTacticalAdvice() {
  const club = teamById(state.userTeamId);
  const opponentId = state.selectedOpponentId === state.userTeamId
    ? state.teams.find((team) => team.id !== state.userTeamId)?.id
    : state.selectedOpponentId;
  const opponent = teamById(opponentId) ?? state.teams.find((team) => team.id !== state.userTeamId);
  const starters = firstEleven(state.userTeamId);
  const avgCondition = average(starters.map((player) => player.condition));
  const avgStamina = average(starters.map((player) => playerStaminaScore(player)));
  const avgFatigue = average(starters.map((player) => player.fatigue ?? 0));
  const attack = teamPhaseRating(state.userTeamId, "attack");
  const midfield = teamPhaseRating(state.userTeamId, "midfield");
  const defense = teamPhaseRating(state.userTeamId, "defense");
  const opponentAttack = opponent ? teamPhaseRating(opponent.id, "attack") : attack;
  const opponentDefense = opponent ? teamPhaseRating(opponent.id, "defense") : defense;
  const staff = state.staff.length ? state.staff : buildClubStaff(club);
  const assistant = staff.find((member) => member.role === "Assistant Manager") ?? staff[1] ?? staff[0];
  const fitnessCoach = staff.find((member) => member.role === "Fitness Coach") ?? assistant;
  const defensiveCoach = staff.find((member) => member.role === "Defensive Coach") ?? assistant;
  const recommendation = {
    formation: state.tactics.formation,
    mentality: "balanced",
    pressing: 12,
    tempo: 12,
    width: 12,
    line: 12,
  };
  const reasons = [];

  if (avgFatigue > 58 || avgCondition < 74 || avgStamina < 62) {
    recommendation.mentality = "cautious";
    recommendation.pressing = 8;
    recommendation.tempo = 9;
    recommendation.line = 9;
    reasons.push(`${fitnessCoach.name}: reduce pressing because the XI is not fresh enough.`);
  } else if (attack > opponentDefense + 4 && midfield >= defense) {
    recommendation.mentality = "positive";
    recommendation.pressing = 15;
    recommendation.tempo = 15;
    recommendation.width = 14;
    reasons.push(`${assistant.name}: attack the opponent; our attacking edge is clear.`);
  } else if (opponentAttack > defense + 4) {
    recommendation.mentality = "cautious";
    recommendation.pressing = 10;
    recommendation.tempo = 10;
    recommendation.line = 8;
    reasons.push(`${defensiveCoach.name}: protect space behind the back line.`);
  } else {
    recommendation.mentality = "balanced";
    recommendation.pressing = 12;
    recommendation.tempo = midfield > opponentDefense ? 13 : 11;
    recommendation.width = attack > defense ? 13 : 11;
    reasons.push(`${assistant.name}: stay balanced and adjust during the match.`);
  }

  if (starters.filter((player) => ["W", "FB"].includes(player.role) && player.condition >= 78).length >= 4) {
    recommendation.width = Math.max(recommendation.width, 14);
    reasons.push("Wide players are fit, so using the flanks is recommended.");
  }

  return {
    opponent,
    assistant,
    avgCondition: Math.round(avgCondition),
    avgStamina: Math.round(avgStamina),
    avgFatigue: Math.round(avgFatigue),
    recommendation,
    reasons,
  };
}

function applyAssistantTactics() {
  const advice = assistantTacticalAdvice();
  state.tactics = { ...state.tactics, ...advice.recommendation };
  teamById(state.userTeamId).tactics = { ...state.tactics };
  state.preMatchConfirmed = false;
  addFeed(`${advice.assistant.name} applied assistant tactical plan: ${state.tactics.mentality}, press ${state.tactics.pressing}, tempo ${state.tactics.tempo}.`);
  render();
}

function selectManagedTeam(teamId) {
  state.userTeamId = Number(teamId);
  state.selectedPlayerId = null;
  state.lineupPlayerIds = null;
  state.lastMatch = null;
  state.matchdayPhase = "ready";
  state.preMatchConfirmed = false;
  state.postMatchSummary = null;
  state.tactics = { ...teamById(state.userTeamId).tactics };
  state.formationPositions = formationShape(state.tactics.formation).map(([slotLabel, x, y]) => ({ label: slotLabel, x, y }));
  state.selectedOpponentId = nextUserFixture()?.fixture.find((teamId) => teamId !== state.userTeamId) ?? state.teams.find((team) => team.id !== state.userTeamId).id;
  addFeed(`You are now managing ${teamById(state.userTeamId).name}.`);
  render();
}

function selectOpponent(teamId) {
  const nextOpponentId = Number(teamId);
  if (nextOpponentId === state.userTeamId) {
    addFeed("Pick a different opponent.");
    return render();
  }
  state.selectedOpponentId = nextOpponentId;
  state.lastMatch = null;
  state.matchdayPhase = "ready";
  state.preMatchConfirmed = false;
  state.postMatchSummary = null;
  render();
}

function openOpponentScoutReport(teamId) {
  const opponent = teamById(Number(teamId));
  if (!opponent || opponent.id === state.userTeamId) return;
  state.selectedOpponentId = opponent.id;
  state.activeView = "tactics";
  addFeed(`Opponent scout report loaded: ${opponent.name}. Assistant advice is now tuned to this fixture.`);
  render();
}

function previewStartTeam(teamId) {
  state.pendingTeamId = Number(teamId);
  render();
}

function selectStartLeague(leagueId) {
  state.pendingLeagueId = leagueId;
  state.selectedLeagueId = leagueId;
  state.pendingTeamId = 1;
  state.userTeamId = 1;
  state.selectedPlayerId = null;
  state.lineupPlayerIds = null;
  state.lastMatch = null;
  state.matchdayPhase = "ready";
  state.feed = [];
  state.initialMarketSyncDone = false;
  state.initialMarketSyncRunning = false;
  state.marketDataUpdatedAt = null;
  state.marketSource = "Transfermarkt-style";
  state.transferApiStatus = "Not connected";
  seedGame();
  render();
}

function startGame(targetView = "menu") {
  state.userTeamId = state.pendingTeamId;
  state.selectedOpponentId = state.teams.find((team) => team.id !== state.userTeamId).id;
  state.tactics = { ...teamById(state.userTeamId).tactics };
  state.manager.firstName = state.manager.firstName.trim() || "Alex";
  state.manager.lastName = state.manager.lastName.trim() || "Taylor";
  state.staff = buildClubStaff(teamById(state.userTeamId));
  state.selectedPlayerId = null;
  state.lineupPlayerIds = null;
  state.lastMatch = null;
  state.matchdayPhase = "ready";
  state.preMatchConfirmed = false;
  state.postMatchSummary = null;
  state.gameStarted = true;
  state.activeView = targetView;
  initializeCompetitions();
  addFeed(`Welcome ${managerFullName()} to ${teamById(state.userTeamId).name}. Your 38-match season begins now.`);
  render();
  window.setTimeout(() => syncMarketDataFromTransfermarktApi(), 250);
}

function conductTeamTalk(style) {
  const club = teamById(state.userTeamId);
  const squad = playersForTeam(state.userTeamId);
  const styles = {
    assertive: {
      label: "Assertive",
      morale: 1,
      boost: 0.035,
      text: "The squad looks focused after a confident, measured message.",
      playerMood: 1,
    },
    aggressive: {
      label: "Aggressive",
      morale: club.morale >= 13 ? 1 : -1,
      boost: club.morale >= 13 ? 0.05 : 0.015,
      text: club.morale >= 13 ? "The leaders respond to higher standards." : "Some players look tense after the demand.",
      playerMood: club.morale >= 13 ? 1 : -1,
    },
    inspiring: {
      label: "Inspiring",
      morale: 2,
      boost: 0.025,
      text: "Confidence rises after an inspiring speech.",
      playerMood: 1,
    },
    cautious: {
      label: "Cautious",
      morale: 0,
      boost: 0.02,
      text: "The dressing room settles and complacency risk drops.",
      playerMood: 0,
    },
  };
  const aliases = { encourage: "assertive", demand: "aggressive", praise: "inspiring", calm: "cautious" };
  const tone = aliases[style] ?? style;
  const talk = styles[tone] ?? styles.assertive;

  club.morale = clamp(club.morale + talk.morale, 1, 20);
  squad.forEach((player) => {
    const determination = player.hidden.determination ?? 10;
    const pressure = player.hidden.pressure ?? 10;
    const anxious = tone === "aggressive" && (pressure <= 9 || determination <= 9);
    const firedUp = tone === "aggressive" && determination >= 14;
    const motivated = tone === "inspiring" || tone === "assertive" && pressure >= 10;
    const uninterested = tone === "cautious" && determination <= 8;
    const modifier = anxious ? 0.92 : firedUp ? 1.1 : motivated ? 1.06 : uninterested ? 0.96 : 1.01;
    const reaction = anxious ? "Anxious" : firedUp ? "Fired Up" : motivated ? "Motivated" : uninterested ? "Uninterested" : "Focused";
    player.teamTalkModifier = modifier;
    player.teamTalkReaction = reaction;
    player.contract.morale = clamp(player.contract.morale + talk.playerMood + (firedUp ? 1 : anxious ? -1 : 0), 1, 20);
    player.form = clamp(player.form + (modifier > 1.03 ? 1 : anxious ? -1 : 0), 1, 20);
  });
  state.teamTalk.lastStyle = talk.label;
  state.teamTalk.boost = clamp(talk.boost, 0, 0.06);
  state.teamTalk.reactions = squad.map((player) => ({ playerId: player.id, name: player.name, reaction: player.teamTalkReaction, modifier: player.teamTalkModifier })).slice(0, 24);
  state.teamTalk.history.unshift(`${seasonLabel()} W${state.week}: ${talk.label} - ${talk.text}`);
  state.teamTalk.history = state.teamTalk.history.slice(0, 8);
  if (state.matchdayPhase === "half" && state.lastMatch) {
    state.lastMatch.engineTrace.interrupts.push({ minute: 45, type: "half-time shout", label: talk.label, boost: state.teamTalk.boost });
  }
  addFeed(`Team talk: ${talk.text}`);
  render();
}

function renderTeamTalkPanel(compact = false) {
  return `<section class="fm-panel team-talk-panel ${compact ? "compact" : ""}">
    <header><h3>Team Talk</h3><span>${state.teamTalk.lastStyle ?? "None"}</span></header>
    <p>${state.teamTalk.boost ? `Active match boost: +${Math.round(state.teamTalk.boost * 100)}% phase ratings.` : "Pick a tone before kickoff to affect morale and the next match."}</p>
    <div>
      <button onclick="conductTeamTalk('assertive')" type="button">Assertive</button>
      <button onclick="conductTeamTalk('aggressive')" type="button">Aggressive</button>
      <button onclick="conductTeamTalk('inspiring')" type="button">Inspiring</button>
      <button onclick="conductTeamTalk('cautious')" type="button">Cautious</button>
    </div>
    ${state.teamTalk.reactions.length ? `<div class="talk-reaction-grid">${state.teamTalk.reactions.slice(0, compact ? 6 : 14).map((item) => `<span class="${item.reaction.toLowerCase().replaceAll(" ", "-")}"><b>${item.name}</b><small>${item.reaction} | ${item.modifier.toFixed(2)}x</small></span>`).join("")}</div>` : ""}
  </section>`;
}

function addFeed(text) {
  state.feed.unshift(text);
  state.feed = state.feed.slice(0, 12);
  const feed = document.querySelector("#feed");
  if (feed) feed.innerHTML = state.feed.map((item) => `<li>${item}</li>`).join("");
}

function renderMenuLogPanel() {
  const rows = state.feed.length ? state.feed : ["No messages yet. Simulate a week to create club news."];
  return `<section class="fm-menu-log-panel">
    <div class="panel-header compact">
      <div><p class="eyebrow">Week Highlights</p><h3>Manager Log</h3></div>
      <div class="button-row">
        <button onclick="${state.seasonComplete ? "startNextSeason()" : "simulateWeek()"}" type="button">${state.seasonComplete ? "Start Next Season" : "Simulate Week"}</button>
        <button onclick="restSquad()" type="button">Rest Squad</button>
        <button onclick="refreshMarket(); addFeed('Scouting list refreshed.'); render();" type="button">Refresh Market</button>
      </div>
    </div>
    <label for="commandInput">Manager command</label>
    <div class="command-row">
      <input id="commandInput" type="text" autocomplete="off" placeholder="try: play, team 12, opponent 13, sim" />
      <button id="commandButton" onclick="runCommand()" type="button">Run</button>
    </div>
    <ol id="feed" class="feed" aria-live="polite">${rows.map((item) => `<li>${item}</li>`).join("")}</ol>
  </section>`;
}

function renderDashboard() {
  const club = teamById(state.userTeamId);
  const league = currentLeague();
  const wages = playersForTeam(state.userTeamId).reduce((sum, player) => sum + player.contract.wage, 0);
  const nextMatch = nextUserFixture();
  const chrome = chromeSectionForView(state.activeView);
  document.querySelector("#seasonLabel").textContent = chrome.title;
  document.querySelector("#clubName").innerHTML = `${teamCrest(club, "sm")}<span>${club.name}</span>`;
  document.querySelector("#weekLabel").textContent = state.seasonComplete
    ? "Season Complete"
    : nextMatch
      ? `${nextMatch.date} | MW ${state.week}/${state.fixtures.length}`
      : `Matchweek ${state.week}/${state.fixtures.length}`;
  const subnav = document.querySelector("#sectionSubnav");
  if (subnav) subnav.innerHTML = renderSectionSubnav(chrome);
  const dateLabel = document.querySelector("#chromeDateLabel");
  const timeLabel = document.querySelector("#chromeTimeLabel");
  if (dateLabel) dateLabel.textContent = nextMatch?.date?.replace(/\s+/g, " ") ?? seasonLabel();
  if (timeLabel) timeLabel.textContent = nextMatch ? `${nextMatch.kickoff}` : state.seasonComplete ? "Done" : "00:00";
  document.querySelector("#balanceValue").textContent = money(club.budget);
  document.querySelector("#wageValue").textContent = `${wage(wages)} / ${wage(club.wageBudget)}`;
  document.querySelector("#moraleValue").textContent = `${club.morale}/20`;
  document.querySelector("#fixtureValue").textContent = state.seasonComplete
    ? "Start next season"
    : nextMatch
      ? `${nextMatch.date} ${nextMatch.kickoff}: ${teamById(nextMatch.homeId).name} vs ${teamById(nextMatch.awayId).name}`
      : "Season done";
}

function chromeSectionForView(view) {
  const groups = {
    Portal: ["menu", "inbox", "schedule", "news", "competitions", "scouting"],
    Squad: ["squad", "tactics", "training", "development", "dynamics", "playerStats"],
    Recruitment: ["transfers", "scouting", "news"],
    "Match Day": ["match", "replay", "engine"],
    Club: ["clubInfo", "clubVision", "staff", "finances", "media"],
    Career: ["league", "competitions", "honors", "schema"],
  };
  const found = Object.entries(groups).find(([, views]) => views.includes(view));
  return {
    title: found?.[0] ?? "Portal",
    view,
  };
}

function subnavItemsForSection(title) {
  const items = {
    Portal: [
      ["Overview", "menu"],
      ["Messages", "inbox"],
      ["Calendar", "schedule"],
      ["News Site", "news"],
      ["Stages", "competitions"],
      ["Opposition Report", "scouting"],
    ],
    Squad: [
      ["Overview", "squad"],
      ["First Team", "squad"],
      ["Under 21s", "development"],
      ["Under 18s", "development"],
      ["Training", "training"],
      ["Youth Setup", "development"],
      ["Dynamics", "dynamics"],
      ["More", "playerStats"],
    ],
    Recruitment: [
      ["Overview", "transfers"],
      ["Players", "transfers"],
      ["Scouting", "scouting"],
      ["Shortlists", "transfers"],
      ["Transfer Activity", "news"],
      ["Budgets", "finances"],
    ],
    "Match Day": [
      ["Overview", "match"],
      ["Team Talk", "match"],
      ["Tactics", "tactics"],
      ["2D/3D Viewer", "match"],
      ["Replay", "replay"],
      ["Engine Log", "engine"],
    ],
    Club: [
      ["Overview", "clubInfo"],
      ["Vision", "clubVision"],
      ["Staff", "staff"],
      ["Finances", "finances"],
      ["Media", "media"],
    ],
    Career: [
      ["Overview", "league"],
      ["League Table", "league"],
      ["Competitions", "competitions"],
      ["Honours", "honors"],
      ["Data Schema", "schema"],
    ],
  };
  return items[title] ?? items.Portal;
}

function renderSectionSubnav(chrome) {
  if (chrome.title === "Squad") {
    const squadItems = [
      { text: "Overview", view: "squad", mode: "overview", group: "senior" },
      { text: "First Team", view: "squad", mode: "overview", group: "senior" },
      { text: "Tactics", view: "tactics" },
      { text: "Under 21s", view: "squad", mode: "overview", group: "u21" },
      { text: "Under 18s", view: "squad", mode: "overview", group: "u18" },
      { text: "Training", view: "training" },
      { text: "Youth Setup", view: "development" },
      { text: "Dynamics", view: "dynamics" },
      { text: "More", view: "playerStats" },
    ];
    return squadItems
      .map(({ text, view, mode, group }) => {
        const active = view === "squad"
          ? state.activeView === "squad" && (state.squadMode ?? "overview") === (mode ?? "overview") && (!group || state.squadGroup === group)
          : state.activeView === view;
        const actionParts = [`state.activeView='${view}'`];
        if (mode) actionParts.push(`state.squadMode='${mode}'`);
        if (group) actionParts.push(`state.squadGroup='${group}'`, "state.selectedPlayerId=null");
        const action = `${actionParts.join(";")}; render();`;
        return `<button class="${active ? "active" : ""}" onclick="${action}" type="button">${text}</button>`;
      })
      .join("");
  }
  return subnavItemsForSection(chrome.title)
    .map(([text, view]) => `<button class="${state.activeView === view ? "active" : ""}" onclick="state.activeView='${view}'; render();" type="button">${text}</button>`)
    .join("");
}

function cycleUiScale() {
  const scales = ["compact", "normal", "large"];
  const current = scales.indexOf(state.uiScale);
  state.uiScale = scales[(current + 1) % scales.length];
  document.body.dataset.uiScale = state.uiScale;
  addFeed(`Interface text size changed to ${state.uiScale}.`);
  render();
}

function attrTone(value) {
  return value >= 16 ? "elite" : value >= 11 ? "standard" : "weak";
}

function playerRadarProfile(player) {
  const groupAverage = (keys) => Math.round(average(keys.map((key) => player.attributes[key] ?? 10)) * 5);
  return [
    ["Defending", groupAverage(["tackling", "positioning", "heading", "strength"])],
    ["Physical", groupAverage(["strength", "stamina", "balance", "jumping"])],
    ["Speed", groupAverage(["pace", "acceleration", "agility"])],
    ["Mental", groupAverage(["decisions", "anticipation", "composure", "workRate"])],
    ["Attacking", groupAverage(["finishing", "dribbling", "crossing", "longShots"])],
    ["Technical", groupAverage(["passing", "technique", "firstTouch", "vision"])],
  ];
}

function radarPolygon(profile) {
  return profile.map(([, value], index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / profile.length;
    const radius = clamp(value, 8, 100) * 0.42;
    return `${50 + Math.cos(angle) * radius}% ${50 + Math.sin(angle) * radius}%`;
  }).join(", ");
}

function renderPlayerRadar(player) {
  const profile = playerRadarProfile(player);
  return `<section class="player-radar-card">
    <div class="player-radar" aria-label="${player.name} attribute radar">
      <i class="radar-grid outer"></i><i class="radar-grid inner"></i>
      <b style="clip-path:polygon(${radarPolygon(profile)})"></b>
    </div>
    <div>${profile.map(([name, value]) => `<span>${name}<strong>${value}</strong></span>`).join("")}</div>
  </section>`;
}

function renderPlayerAttributeHighlights(player) {
  const keys = ["finishing", "passing", "dribbling", "tackling", "vision", "decisions", "pace", "stamina", "strength", "composure", "positioning", "technique"];
  return `<section class="attribute-highlight-grid">${keys.map((key) => `<span>${label(key)}<b class="attr-number ${attrTone(player.attributes[key])}">${player.attributes[key]}</b></span>`).join("")}</section>`;
}

function playerReportRole(player) {
  state.playerReportRoles = state.playerReportRoles ?? {};
  return state.playerReportRoles[player.id] ?? (player.role === "W" ? "Inside Winger" : player.role === "ST" ? "Advanced Forward" : player.role === "FB" ? "Wing Back" : player.role === "CB" ? "Central Defender" : player.role === "GK" ? "Sweeper Keeper" : "Playmaker");
}

function setPlayerReportRole(playerId, role) {
  state.playerReportRoles = state.playerReportRoles ?? {};
  state.playerReportRoles[playerId] = role;
  render();
}

function roleKeyAttributes(role) {
  const map = {
    "Inside Winger": ["dribbling", "firstTouch", "technique", "flair", "acceleration", "pace"],
    "Wide Forward": ["finishing", "dribbling", "acceleration", "composure", "workRate"],
    "Inside Forward": ["finishing", "dribbling", "longShots", "composure", "pace"],
    Winger: ["crossing", "dribbling", "pace", "acceleration", "workRate"],
    "Playmaking Winger": ["passing", "vision", "technique", "flair", "decisions"],
    "Advanced Forward": ["finishing", "composure", "anticipation", "pace", "acceleration"],
    "Box To Box Midfielder": ["stamina", "workRate", "teamwork", "passing", "tackling"],
    "Central Defender": ["tackling", "heading", "positioning", "strength", "jumping"],
    "Wing Back": ["stamina", "crossing", "tackling", "pace", "workRate"],
    Playmaker: ["passing", "vision", "technique", "decisions", "composure"],
    "Sweeper Keeper": ["positioning", "decisions", "passing", "firstTouch", "composure"],
  };
  return map[role] ?? ["decisions", "teamwork", "workRate"];
}

function roleOptionsForPlayer(player) {
  const options = {
    W: ["Inside Winger", "Wide Forward", "Inside Forward", "Winger", "Playmaking Winger"],
    ST: ["Advanced Forward", "Wide Forward", "Inside Forward", "Playmaker", "Box To Box Midfielder"],
    AM: ["Playmaker", "Inside Winger", "Playmaking Winger", "Wide Forward", "Box To Box Midfielder"],
    CM: ["Box To Box Midfielder", "Playmaker", "Central Defender", "Wide Forward", "Inside Winger"],
    DM: ["Box To Box Midfielder", "Playmaker", "Central Defender", "Wing Back", "Sweeper Keeper"],
    FB: ["Wing Back", "Inside Winger", "Wide Forward", "Central Defender", "Playmaker"],
    CB: ["Central Defender", "Wing Back", "Playmaker", "Box To Box Midfielder", "Sweeper Keeper"],
    GK: ["Sweeper Keeper", "Central Defender", "Playmaker", "Box To Box Midfielder", "Wing Back"],
  };
  return options[player.role] ?? ["Playmaker", "Box To Box Midfielder", "Inside Winger", "Wide Forward", "Central Defender"];
}

function attrTier(value) {
  return value >= 16 ? "world" : value >= 11 ? "good" : value >= 6 ? "mid" : "low";
}

function renderAttributeRows(player, keys, selectedKeys = []) {
  return keys.map((key, index) => `<div class="report-attr-row ${index % 2 ? "alt" : ""} ${selectedKeys.includes(key) ? "role-key" : ""}">
    <span>${label(key)}</span><b class="${attrTier(player.attributes[key] ?? 10)}">${player.attributes[key] ?? 10}</b>
  </div>`).join("");
}

function renderStarRating(value) {
  const stars = clamp(Math.round((value / 200) * 5), 1, 5);
  return `<span class="report-stars">${"★".repeat(stars)}${"☆".repeat(5 - stars)}</span>`;
}

function renderFootMeter(labelText, value) {
  const text = value >= 17 ? "Very Strong" : value >= 12 ? "Strong" : value >= 7 ? "Reasonable" : "Weak";
  return `<div class="foot-meter"><span>${labelText}<b>${text}</b></span><i style="--foot:${clamp(value * 5, 5, 100)}%"></i></div>`;
}

function renderReportPitch(player) {
  const roleDots = {
    GK: [[50, 86, "best"]],
    CB: [[38, 66, "best"], [50, 68, "best"], [62, 66, "best"], [50, 46, "okay"]],
    FB: [[18, 58, "best"], [82, 58, "okay"], [18, 38, "best"], [82, 38, "okay"]],
    DM: [[50, 55, "best"], [38, 48, "okay"], [62, 48, "okay"]],
    CM: [[42, 43, "best"], [58, 43, "best"], [50, 55, "okay"]],
    AM: [[50, 28, "best"], [24, 28, "okay"], [76, 28, "okay"]],
    W: [[18, 26, "best"], [82, 26, "okay"], [26, 38, "okay"]],
    ST: [[50, 16, "best"], [38, 18, "okay"], [62, 18, "okay"]],
  };
  const weakDots = [[22, 68], [36, 62], [64, 62], [78, 68], [30, 48], [70, 48], [44, 35], [56, 35], [50, 72]];
  return `<div class="report-position-card">
    <small>Positions</small><strong>${player.role}</strong>
    <div class="report-mini-pitch"><i class="half"></i><i class="box left"></i><i class="box right"></i><i class="circle"></i>
      ${weakDots.map(([x, y]) => `<span class="pos-dot weak" style="left:${x}%;top:${y}%"></span>`).join("")}
      ${(roleDots[player.role] ?? [[50, 45, "best"]]).map(([x, y, cls]) => `<span class="pos-dot ${cls}" style="left:${x}%;top:${y}%"></span>`).join("")}
    </div>
    <em>${player.role} / ${playerReportRole(player)}</em>
  </div>`;
}

function renderRoleSelector(player, selectedRole) {
  const selectedKeys = roleKeyAttributes(selectedRole);
  return `<div class="report-role-list">
    <div class="report-role-head"><span>Select</span><span>Ability</span><span>Role</span></div>
    ${roleOptionsForPlayer(player).map((role) => {
      const fit = clamp(Math.round(average(roleKeyAttributes(role).map((key) => player.attributes[key] ?? 10)) / 4), 1, 5);
      return `<button class="${role === selectedRole ? "active" : ""}" onclick="setPlayerReportRole(${player.id}, '${role}')" type="button"><i></i><span>${"★".repeat(fit)}${"☆".repeat(5 - fit)}</span><strong>${role}</strong></button>`;
    }).join("")}
    <small>Role keys: ${selectedKeys.map(label).join(", ")}</small>
  </div>`;
}

function clubReputationLabel(value) {
  return value >= 160 ? "Continental" : value >= 125 ? "National" : "Regional";
}

function personalityLabel(player) {
  const h = player.hidden;
  if (h.professionalism >= 15 && h.determination >= 14) return "Professional";
  if (h.ambition >= 15 && h.pressure >= 12) return "Spirited";
  if (h.loyalty >= 15) return "Loyal";
  return "Balanced";
}

function renderPlayerReportHeader(player, club) {
  const valueLow = Math.round(player.value * 0.92);
  const valueHigh = Math.round(player.value * 1.08);
  const mind = mindStateBand(player);
  return `<section class="player-report-header">
    <div class="report-portrait"><span>${teamInitials(player.name).slice(0, 2)}</span></div>
    <div class="report-id-block">
      <div><h2>${escapeHtml(player.name)} <b>${shirtNo(player)}</b></h2><button type="button">⌃</button><button type="button">⌄</button></div>
      <p>${escapeHtml(player.role)} | ${SQUAD_GROUPS[player.squadGroup]} | ${player.age} years old</p>
      <span class="report-nation">${escapeHtml(player.primaryNationality)}</span><strong>${mind.label}</strong>
      <button class="report-action" onclick="openPlayerDialogue(${player.id}, 'POOR_FORM_WARNING', 'MANUAL')" type="button">Actions ▾</button>
    </div>
    <div class="report-club-block">${teamCrest(club, "md")}<span>${escapeHtml(club.name)}</span><b>${player.contract.squadStatus ?? squadStatusForPlayer(player)}</b></div>
    <div class="report-fact"><span>${escapeHtml(player.secondaryNationality)}</span><b>${player.stats.appearances ?? 0} apps / ${player.stats.goals ?? 0} goals</b></div>
    <div class="report-fact"><span>${money(valueLow)} - ${money(valueHigh)}</span><b>${wage(player.contract.wage)} p/w ${player.contract.expires}</b></div>
    <div class="report-stars-block"><span>Current Ability</span>${renderStarRating(player.hidden.currentAbility)}<span>Potential Ability</span>${renderStarRating(player.hidden.potentialAbility)}</div>
  </section>`;
}

function renderPlayerReportMain(player) {
  const selectedRole = playerReportRole(player);
  const selectedKeys = roleKeyAttributes(selectedRole);
  return `<section class="player-report-main">
    <aside class="report-panel report-positions">${renderReportPitch(player)}<div class="report-phase-tabs"><button class="active" type="button">In Possession</button><button type="button">Out of Possession</button></div>${renderRoleSelector(player, selectedRole)}</aside>
    <section class="report-panel report-attrs"><h3>Technical</h3>${renderAttributeRows(player, ["crossing", "dribbling", "finishing", "firstTouch", "heading", "longShots", "marking", "passing", "tackling", "technique"], selectedKeys)}<h3>Set Pieces</h3>${renderAttributeRows(player, ["corners", "freeKickTaking", "longThrows", "penaltyTaking"], selectedKeys)}</section>
    <section class="report-panel report-attrs"><h3>Mental</h3>${renderAttributeRows(player, ["aggression", "anticipation", "bravery", "composure", "concentration", "decisions", "determination", "flair", "leadership", "positioning", "teamwork", "vision", "workRate"], selectedKeys)}</section>
    <section class="report-panel report-attrs report-physical"><h3>Physical</h3>${renderAttributeRows(player, ["acceleration", "agility", "balance", "jumping", "naturalFitness", "pace", "stamina", "strength"], selectedKeys)}
      <div class="report-info-box"><h3>Info</h3><span>Height <b>${player.heightCm} cm</b></span><span>Weight <b>${player.weightKg} kg</b></span><span>Reputation <b>${clubReputationLabel(player.hidden.currentAbility)}</b></span><span>Personality <b>${personalityLabel(player)}</b></span>${renderFootMeter(`${player.feet.strongFoot} Foot`, player.feet.strongFootRating)}${renderFootMeter("Weak Foot", player.feet.weakFoot)}<h3>Traits</h3>${(player.traits ?? []).slice(0, 4).map((trait) => `<em>${label(trait)}</em>`).join("")}</div>
    </section>
  </section>`;
}

function renderFormBars(player) {
  const seed = Math.round(player.form ?? 10);
  return Array.from({ length: 5 }, () => `<i style="--bar:${clamp(seed + rand(-2, 2), 5, 10) * 10}%"></i>`).join("");
}

function renderPlayerReportWidgets(player) {
  const mind = playerMindState(player);
  const band = mindStateBand(player);
  const avgRating = playerRating(player);
  const seasonRows = [
    ["Premier League", player.stats.appearances, player.stats.goals, player.stats.assists, (player.stats.shots * 0.11).toFixed(1), 0, 0, player.stats.yellowCards, player.stats.redCards, avgRating],
    [currentLeague().domesticCup ?? "Domestic Cup", Math.max(0, Math.round(player.stats.appearances * 0.3)), Math.round(player.stats.goals * 0.25), Math.round(player.stats.assists * 0.25), "0.8", 0, 0, 0, 0, clamp(Number(avgRating) - 0.18, 5.8, 9.9).toFixed(2)],
    ["Overall (Club)", player.stats.appearances, player.stats.goals, player.stats.assists, (player.stats.shots * 0.18).toFixed(1), 0, 0, player.stats.yellowCards, player.stats.redCards, avgRating],
  ];
  return `<section class="player-report-widgets">
    <article><h3>Happiness</h3><strong class="${band.className}">${band.label}</strong><small>Positives ${mind.clubSatisfaction >= 60 ? 4 : 1}</small><small>Negatives ${mind.clubSatisfaction < 55 ? 3 : 1}</small></article>
    <article><h3>Fitness</h3><strong>${playerStaminaScore(player) >= 70 ? "Good" : "Tired"}</strong><small>Condition ${player.condition}%</small><small>Fatigue ${player.fatigue ?? 0}</small></article>
    <article><h3>Form</h3><div class="form-bars">${renderFormBars(player)}</div><strong>${avgRating}</strong><small>Last 5 Games</small></article>
    <article><h3>Discipline</h3><strong>${player.stats.yellowCards || player.stats.redCards ? `${player.stats.yellowCards} yellows / ${player.stats.redCards} reds` : "Clean"}</strong><small>${player.injuredWeeks ? `${player.injuredWeeks}w injury` : "Available"}</small></article>
    <article><h3>Training</h3><strong>${player.availability ? "Limited" : "Available"}</strong><small>Training Rating ${(6 + player.hidden.professionalism / 10).toFixed(2)}</small></article>
    <article class="season-stats-widget"><h3>Season Stats</h3><table><thead><tr><th>Competition</th><th>Apps</th><th>Gls</th><th>Asts</th><th>xG</th><th>Pens</th><th>PoM</th><th>Yel</th><th>Red</th><th>Avg Rat</th></tr></thead><tbody>${seasonRows.map((row) => `<tr>${row.map((cell, index) => `<td>${index === 0 ? `<strong>${cell}</strong>` : cell}</td>`).join("")}</tr>`).join("")}</tbody></table></article>
    <article><h3>Career Stats</h3><strong>${Math.max(1, Math.round(player.age / 7))} Clubs</strong><small>Apps ${player.stats.appearances + player.seasonStarts + 80}</small><small>Goals ${player.stats.goals + Math.round(player.hidden.currentAbility / 7)}</small></article>
  </section>`;
}

function renderPlayerProfileReport(player, club) {
  return `<div class="player-report-screen"><div class="report-breadcrumb">Squad › Player Report</div>${renderPlayerReportHeader(player, club)}<nav class="report-tabs"><button class="active" type="button">Overview</button><button type="button">Personal</button><button type="button">Performance</button><button type="button">Career</button><button onclick="state.activeView='tactics'; render();" type="button">Comparison</button></nav>${renderPlayerReportMain(player)}${renderPlayerReportWidgets(player)}</div>`;
}

function renderSquadTable(groupedPlayers, selected, groupTabs) {
  return `<section class="squad-list-panel player-report-list"><div class="squad-group-tabs">${groupTabs}</div><div class="squad-table-shell"><table><thead><tr><th>No.</th><th>Player</th><th>Role</th><th>Age</th><th>Nationalities</th><th>Rating</th><th>Condition</th><th>Stamina</th><th>Fatigue</th><th>Status</th><th>Morale</th><th>Wage</th><th>Contract</th></tr></thead><tbody>${groupedPlayers.map((player) => `<tr class="${player.id === selected.id ? "selected" : ""}" onclick="state.selectedPlayerId=${player.id}; render();"><td><strong>${shirtNo(player)}</strong></td><td><strong>${player.name}</strong><small>${SQUAD_GROUPS[player.squadGroup]}</small></td><td>${player.role}</td><td>${player.age}</td><td>${nationalitySummary(player)}</td><td>${playerRating(player)}</td><td>${player.condition}%</td><td>${playerStaminaScore(player)}</td><td>${player.fatigue ?? 0}</td><td>${playerStatus(player).label}</td><td>${playerMindState(player).overallMorale}/100</td><td>${wage(player.contract.wage)}</td><td>${player.contract.expires}</td></tr>`).join("")}</tbody></table></div></section>`;
}

function portalMessageRows() {
  const rows = [
    ...state.feed.map((text, index) => ({ author: index % 3 === 0 ? "Assistant Manager" : index % 3 === 1 ? "Recruitment Team" : "Board", text, time: `${String(20 - index).padStart(2, "0")}:5${index % 10}` })),
    { author: "Training Staff", text: `${teamById(state.userTeamId).name} training schedule for the coming weeks`, time: "08:59" },
    { author: "Medical Centre", text: "Fitness tests and injury-risk report available", time: "11:56" },
    { author: "League Office", text: "Fixture schedule updated after cup draw", time: "12:45" },
  ].slice(0, 11);
  return rows.map((row) => `<button class="portal-message-row" onclick="state.activeView='inbox'; render();" type="button">
    <span class="message-avatar">${row.author.slice(0, 1)}</span>
    <strong>${escapeHtml(row.author)}</strong>
    <small>${escapeHtml(row.time)}</small>
    <em>${escapeHtml(row.text)}</em>
  </button>`).join("");
}

function renderPortalCalendarMini(items) {
  const datedItems = items.filter((item) => item.isoDate);
  const anchor = new Date(datedItems[0]?.isoDate ?? nextUserFixture()?.isoDate ?? new Date(state.season, 7, 8));
  const weekStart = addDays(anchor, -((anchor.getDay() + 6) % 7));
  const days = Array.from({ length: 14 }, (_, index) => addDays(weekStart, index));
  const monthLabel = anchor.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return `<section class="portal-card portal-calendar-card">
    <header><h3>Calendar ${monthLabel}</h3><button onclick="state.activeView='schedule'; render();" type="button">Open</button></header>
    <div class="portal-calendar-mini">
      ${days.map((date) => {
        const iso = fixtureIsoDate(date);
        const item = datedItems.find((candidate) => candidate.isoDate === iso);
        const day = date.getDate();
        const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
        const month = date.toLocaleDateString("en-GB", { month: "short" });
        return `<button class="${item ? "has-event" : ""}" onclick="state.activeView='schedule'; render();" type="button">
          <b>${day} ${month}</b>
          <span>${weekday} | ${item ? `${item.rules.code} ${item.venue}` : "Training"}</span>
          ${item ? `<strong>${escapeHtml(item.opponentName)}</strong>` : "<em>General</em>"}
        </button>`;
      }).join("")}
    </div>
  </section>`;
}

function calendarMonthMeta(items) {
  const nextItem = items.find((item) => ["NEXT", "UPCOMING", "RESCHEDULED"].includes(item.status) && item.isoDate) ?? items.find((item) => item.isoDate);
  const anchor = new Date(nextItem?.isoDate ?? nextUserFixture()?.isoDate ?? new Date(state.season, 7, 8));
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = (first.getDay() + 6) % 7;
  const cells = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return {
    label: anchor.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    cells,
  };
}

function renderCalendarMonthGrid(items) {
  const { cells } = calendarMonthMeta(items);
  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return `<section class="fm-calendar-month">
    <div class="calendar-weekdays">${labels.map((item) => `<strong>${item}</strong>`).join("")}</div>
    <div class="calendar-month-grid">
      ${cells.map((date) => {
        if (!date) return `<article class="calendar-empty"></article>`;
        const iso = fixtureIsoDate(date);
        const dayItems = items.filter((item) => item.isoDate === iso).slice(0, 3);
        return `<article class="${dayItems.length ? "has-match" : ""}">
          <b>${date.getDate()}</b>
          <span>Training</span>
          ${dayItems.map((item) => `<button onclick="state.activeView='match'; render();" type="button">
            <small>${item.rules.code} ${item.kickoff}</small>
            <strong>${escapeHtml(item.opponentName)}</strong>
            <em>${item.venue}</em>
          </button>`).join("")}
        </article>`;
      }).join("")}
    </div>
  </section>`;
}

function renderPortalTableMini() {
  return state.table.slice(0, 11).map((row, index) => {
    const team = teamById(row.teamId);
    const gd = row.goalsFor - row.goalsAgainst;
    return `<tr class="${team.id === state.userTeamId ? "selected" : ""}">
      <td>${index + 1}</td>
      <td>${teamCrest(team, "sm")}<strong>${escapeHtml(team.name)}</strong></td>
      <td>${row.played}</td>
      <td>${row.won}</td>
      <td>${row.drawn}</td>
      <td>${row.lost}</td>
      <td>${gd}</td>
      <td><b>${row.points}</b></td>
    </tr>`;
  }).join("");
}

function ratingPillClass(value) {
  if (value >= 7.2) return "excellent";
  if (value >= 6.8) return "good";
  return "muted";
}

function portalSquadRows() {
  return playersForTeam(state.userTeamId)
    .sort((a, b) => (b.form + b.condition / 20 + playerScore(b) / 30) - (a.form + a.condition / 20 + playerScore(a) / 30))
    .slice(0, 13)
    .map((player) => {
      const rating = Number(playerRating(player));
      const played = Math.max(0, Math.round((player.stats?.apps ?? player.form) / 2));
      const subApps = player.squadGroup === "sub" || player.squadGroup === "u21" ? ` (${Math.max(1, Math.round(played / 2))})` : "";
      return `<tr onclick="state.activeView='squad'; state.squadMode='report'; state.selectedPlayerId=${player.id}; render();">
        <td><span class="portal-avatar">${shirtNo(player)}</span><strong>${escapeHtml(player.name)}</strong></td>
        <td>${player.role}${player.squadGroup !== "senior" ? ` <small>${SQUAD_GROUPS[player.squadGroup]}</small>` : ""}</td>
        <td>${player.age}</td>
        <td>${escapeHtml((player.nationality ?? "UNK").slice(0, 3).toUpperCase())}</td>
        <td>${played}${subApps}</td>
        <td><b class="rating-pill ${ratingPillClass(rating)}">${rating >= 6 ? rating.toFixed(2) : "-"}</b></td>
      </tr>`;
    })
    .join("");
}

function renderPortalSquadWidget(club) {
  const players = playersForTeam(state.userTeamId);
  const injured = players.filter((player) => player.injuredWeeks > 0).length;
  const assigned = players.filter((player) => Number.isInteger(Number(player.shirtNumber))).length;
  return `<section class="portal-club-widget portal-squad-widget">
    <header>
      <div class="portal-club-title">${teamCrest(club, "md")}<div><p>${escapeHtml(club.name)}</p><strong>Players (${players.length})</strong></div></div>
      <div class="portal-squad-status"><span>✕ ${currentLeague().shortName ?? currentLeague().name} Closed Until 1/1/${state.season + 1}</span><b>⚑ ${assigned} assigned</b></div>
    </header>
    <table>
      <thead><tr><th>Player</th><th>Position</th><th>Age</th><th>Nation</th><th>Played</th><th>Rating</th></tr></thead>
      <tbody>${portalSquadRows()}</tbody>
    </table>
    <footer><span>${injured} players injured</span><button onclick="state.activeView='squad'; state.squadMode='overview'; render();" type="button">Open Squad</button></footer>
  </section>`;
}

function renderPortalTacticsWidget(club) {
  const shape = formationShape(club.tactics?.formation ?? state.tactics.formation);
  return `<section class="portal-club-widget portal-tactics-widget">
    <header><h3>Tactics</h3><div><button onclick="state.activeView='tactics'; render();" type="button">Set Pieces</button><button onclick="state.activeView='tactics'; render();" type="button">Pens</button><button onclick="state.activeView='scouting'; render();" type="button">Opposition</button></div></header>
    <div class="portal-mini-pitch">
      ${shape.map(([slot, x, y], index) => `<span title="${slot}" style="left:${x}%;top:${y}%">${index + 1}</span>`).join("")}
    </div>
    <footer>${club.tactics?.formation ?? state.tactics.formation} active</footer>
  </section>`;
}

function renderPortalYouthWidget() {
  const academy = playersForTeam(state.userTeamId)
    .filter((player) => ["u21", "u18"].includes(player.squadGroup))
    .sort((a, b) => b.hidden.potentialAbility - a.hidden.potentialAbility)
    .slice(0, 2);
  const intakeDate = new Date(state.season + 1, 2, 16);
  const today = new Date(state.currentDate ?? nextUserFixture()?.isoDate ?? new Date(state.season, 7, 8));
  const daysLeft = Math.max(0, Math.ceil((intakeDate - today) / 86400000));
  return `<section class="portal-club-widget portal-youth-widget">
    <header><div><h3>Youth Setup</h3><strong>Superb</strong><span>Overall Youth Rating</span></div></header>
    <h4>Staff Recommendations</h4>
    <div class="portal-youth-list">
      ${academy.map((player) => `<button onclick="state.activeView='squad'; state.squadMode='report'; state.selectedPlayerId=${player.id}; render();" type="button">
        <span class="portal-avatar">${shirtNo(player)}</span><strong>${escapeHtml(player.name)}</strong><small>${player.role} | ${player.age} years old</small><b>★★☆☆☆</b>
      </button>`).join("") || "<p>No academy recommendation yet.</p>"}
    </div>
    <footer><b>Mar 16</b><span>${state.season + 1} Youth Intake<br>${daysLeft} days to go</span></footer>
  </section>`;
}

function renderPortalBottomWidgets(club) {
  const players = playersForTeam(state.userTeamId);
  const injured = players.filter((player) => player.injuredWeeks > 0);
  const banned = players.find((player) => activeAvailabilityIssue(player)?.type === "suspension") ?? players.find((player) => (player.yellowCards ?? 0) >= 4);
  return `<section class="portal-club-widget portal-feedback-widget">
      <h3>Squad Feedback</h3>
      <div><strong>Board</strong><span>${state.board.status}</span></div>
      <div><strong>Supporters</strong><span>Satisfied</span></div>
    </section>
    <section class="portal-club-widget portal-medical-widget">
      <h3>Medical Centre</h3>
      <strong>✚ ${injured.length} players injured</strong>
      <p>${injured.slice(0, 3).map((player) => escapeHtml(player.name)).join("   ") || "No major injuries"}</p>
      <small>${players.filter((player) => player.condition < 68 || (player.fatigue ?? 0) > 60).length} players at risk of injury</small>
    </section>
    <section class="portal-club-widget portal-discipline-widget">
      <h3>Discipline</h3>
      <strong>▰ ${banned ? `1 player banned vs ${nextUserFixture() ? teamById(nextUserFixture().fixture.find((id) => id !== state.userTeamId))?.name : "next opponent"}` : "No active bans"}</strong>
      <p>${banned ? escapeHtml(banned.name) : "0 players are one yellow away from a ban"}</p>
    </section>`;
}

function renderPortalSideWidgets(club) {
  const next = nextUserFixture();
  const opponent = next ? teamById(next.fixture.find((teamId) => teamId !== state.userTeamId)) : null;
  const topPlayer = playersForTeam(state.userTeamId).sort((a, b) => Number(playerRating(b)) - Number(playerRating(a)))[0];
  return `<section class="portal-club-widget portal-atmosphere-widget">
      <h3>Club Atmosphere</h3>
      <p>The squad feels there is unity between the players, although the staff still want stronger cohesion before the next run of fixtures.</p>
      <b>${club.morale}/20 morale</b>
    </section>
    <section class="portal-club-widget portal-form-widget">
      <h3>Form Watch</h3>
      <button onclick="state.activeView='squad'; state.squadMode='report'; state.selectedPlayerId=${topPlayer?.id}; render();" type="button">${topPlayer ? `${escapeHtml(topPlayer.name)} ${playerRating(topPlayer)}` : "No player report"}</button>
      <small>Av. Rating</small>
    </section>
    <section class="portal-club-widget portal-duty-widget">
      <h3>International duty</h3>
      <p>${opponent ? `Next opposition: ${escapeHtml(opponent.name)}` : "No active international window"}</p>
      <span>25th Mar-31st Mar</span>
    </section>`;
}

function renderBookmarksModal() {
  if (!state.bookmarksOpen) return "";
  const selected = state.bookmarkIds.map(bookmarkItem).filter(Boolean);
  const available = BOOKMARK_CATALOG.filter((item) => !state.bookmarkIds.includes(item.id));
  const row = (item, active) => `<button class="${active ? "active" : ""}" onclick="${active ? `goBookmark('${item.id}')` : `toggleBookmark('${item.id}')`}" type="button">
    <span>${item.icon}</span><strong>${item.label}</strong><i onclick="event.stopPropagation(); toggleBookmark('${item.id}')">${active ? "★" : "☆"}</i>
  </button>`;
  return `<aside class="bookmark-modal" role="dialog" aria-label="Edit Bookmarks">
    <header><h3>Edit Bookmarks (${selected.length}/12)</h3><button onclick="toggleBookmarksModal(false)" aria-label="Close bookmarks" type="button">×</button></header>
    <div class="bookmark-columns">
      <div>${selected.map((item) => row(item, true)).join("")}</div>
      <div>${available.map((item) => row(item, false)).join("")}</div>
    </div>
  </aside>`;
}

function renderMenu() {
  const club = teamById(state.userTeamId);
  return `<section class="club-portal-screen">
    ${renderPortalSquadWidget(club)}
    <div class="club-portal-centre">
      ${renderPortalTacticsWidget(club)}
      ${renderPortalYouthWidget()}
    </div>
    <div class="club-portal-right">${renderPortalSideWidgets(club)}</div>
    <div class="club-portal-bottom">${renderPortalBottomWidgets(club)}</div>
    ${renderBookmarksModal()}
  </section>`;
}

function formationShape(formation = state.tactics.formation) {
  const shapes = {
    "4-4-2": [
      ["GK", 50, 91],
      ["DR", 86, 72],
      ["DCR", 62, 74],
      ["DCL", 38, 74],
      ["DL", 14, 72],
      ["MR", 86, 45],
      ["MCR", 62, 48],
      ["MCL", 38, 48],
      ["ML", 14, 45],
      ["ST", 38, 16],
      ["ST", 62, 16],
    ],
    "4-3-3": [
      ["GK", 50, 91],
      ["DR", 86, 72],
      ["DCR", 62, 74],
      ["DCL", 38, 74],
      ["DL", 14, 72],
      ["DM", 50, 56],
      ["MCR", 64, 43],
      ["MCL", 36, 43],
      ["AMR", 86, 24],
      ["AML", 14, 24],
      ["ST", 50, 14],
    ],
    "4-2-3-1": [
      ["GK", 50, 91],
      ["DR", 86, 72],
      ["DCR", 62, 74],
      ["DCL", 38, 74],
      ["DL", 14, 72],
      ["DM", 38, 53],
      ["DM", 62, 53],
      ["AMR", 86, 30],
      ["AMC", 50, 28],
      ["AML", 14, 30],
      ["ST", 50, 13],
    ],
    "3-5-2": [
      ["GK", 50, 91],
      ["DCR", 70, 74],
      ["DC", 50, 76],
      ["DCL", 30, 74],
      ["WBR", 88, 51],
      ["DM", 50, 57],
      ["MCR", 64, 42],
      ["MCL", 36, 42],
      ["WBL", 12, 51],
      ["ST", 38, 16],
      ["ST", 62, 16],
    ],
  };
  return shapes[formation] ?? shapes["4-3-3"];
}

function fmFormationPositions(formation = state.tactics.formation) {
  return formationShape(formation).map(([label, x, y]) => [label, x, y]);
}

function activeFormationPositions() {
  if (!state.formationPositions) {
    state.formationPositions = formationShape().map(([label, x, y]) => ({ label, x, y }));
  }
  return state.formationPositions;
}

function resetFreeMoveShape() {
  state.formationPositions = formationShape().map(([label, x, y]) => ({ label, x, y }));
  addFeed(`${state.tactics.formation} tactical shape reset to default.`);
  render();
}

function positionLabelForCoordinates(x, y) {
  const side = x < 34 ? "L" : x > 66 ? "R" : "C";
  if (y >= 84) return "GK";
  if (y >= 63) return side === "C" ? "DC" : `D${side}`;
  if (y >= 49) return side === "C" ? "DM" : `DM${side}`;
  if (y >= 29) return side === "C" ? "MC" : `M${side}`;
  if (y >= 18) return side === "C" ? "AMC" : `AM${side}`;
  return "ST";
}

function playerRating(player) {
  return (playerScore(player) / 12.5).toFixed(1);
}

function moodRelationshipText(player) {
  const mind = playerMindState(player);
  if (mind.managerRespect <= 24) return "Losing trust and may challenge your decisions soon.";
  if (mind.managerRespect <= 44) return "Needs clearer communication from the manager.";
  if (mind.managerRespect >= 82) return "Strongly believes in your management.";
  return "Maintains a workable relationship with the manager.";
}

function moodSatisfactionNotes(player) {
  const mind = playerMindState(player);
  const notes = [];
  if (mind.clubSatisfaction >= 72) notes.push("Happy with his place at the club.");
  if (mind.clubSatisfaction < 45) notes.push("Concerned about contract, role or club direction.");
  if ((player.benchStreak ?? 0) >= 2) notes.push(`Benched for ${player.benchStreak} straight league matches.`);
  if (player.dynamics?.transferRequest) notes.push("Considering a transfer request.");
  if (player.dynamics?.homesickWeeks) notes.push("Struggling to settle away from home.");
  if (player.availability?.type === "skippedTraining") notes.push("Recent discipline issue affected trust.");
  if (!notes.length) notes.push("No major concerns reported this week.");
  return notes;
}

function renderMindAxis(labelText, value) {
  return `<div class="mind-axis">
    <span>${labelText}</span>
    <strong>${value}/100</strong>
    <i style="--value:${value}%"><b></b></i>
  </div>`;
}

function renderPlayerMoodDashboard(player) {
  const mind = playerMindState(player);
  const band = mindStateBand(player);
  const notes = [...new Set([mind.currentMoodString, ...moodSatisfactionNotes(player), ...(mind.moodNotes ?? [])].filter(Boolean))].slice(0, 5);
  return `<section class="mind-dashboard">
    <header>
      <div>
        <p class="eyebrow">Player Mood</p>
        <h4>${escapeHtml(player.name)}</h4>
      </div>
      <span class="mind-state-pill ${band.className}">${band.label}</span>
    </header>
    <div class="mind-axis-grid">
      ${renderMindAxis("Overall Morale", mind.overallMorale)}
      ${renderMindAxis("Club Happiness", mind.clubSatisfaction)}
      ${renderMindAxis("Manager Respect", mind.managerRespect)}
    </div>
    <p class="mind-impact">${band.impact}</p>
    <div class="mind-notes">
      <strong>Squad psychology report</strong>
      <ul>${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
      <em>${escapeHtml(moodRelationshipText(player))}</em>
    </div>
  </section>`;
}

function playerStatus(player) {
  const issue = activeAvailabilityIssue(player);
  if (issue) return { label: issue.label, className: issue.className ?? (issue.blocksMatch ? "injured" : "low") };
  if (playerStaminaScore(player) < 45) return { label: "Low stamina", className: "tired" };
  if (player.condition < 62 || (player.fatigue ?? 0) > 68) return { label: "Tired", className: "tired" };
  const mind = playerMindState(player);
  if (mind.overallMorale <= 39) return { label: "Low mood", className: "low" };
  if (player.condition >= 86 && mind.overallMorale >= 70) return { label: "Sharp", className: "sharp" };
  return { label: "Ready", className: "ready" };
}

function renderFitnessLine(player) {
  const status = playerStatus(player);
  return `<span class="fitness-line ${status.className}">
    <b>Con ${player.condition}%</b>
    <b>Sta ${playerStaminaScore(player)}</b>
    <b>Fat ${player.fatigue ?? 0}</b>
    <b>Mor ${playerMindState(player).overallMorale}</b>
    <em>${status.label}</em>
  </span>`;
}

function swapOrSelectSub(playerId) {
  const selectedId = Number(state.selectedPlayerId);
  const selectedStarterIndex = state.lineupPlayerIds?.findIndex((id) => id === selectedId) ?? -1;
  const playerStarterIndex = state.lineupPlayerIds?.findIndex((id) => id === playerId) ?? -1;
  if (selectedId && selectedId !== playerId && selectedStarterIndex >= 0 && playerStarterIndex < 0) {
    setLineupSlot(playerId, selectedStarterIndex);
    return;
  }
  if (selectedId && selectedId !== playerId && selectedStarterIndex < 0 && playerStarterIndex >= 0) {
    setLineupSlot(selectedId, playerStarterIndex);
    return;
  }
  state.selectedPlayerId = playerId;
  render();
}

function benchPlayersForTeam(teamId, limit = 12) {
  const starters = new Set(firstEleven(teamId).map((player) => player.id));
  return playersForTeam(teamId)
    .filter((player) => ["senior", "sub", "u21", "u18"].includes(player.squadGroup) && !starters.has(player.id))
    .sort((a, b) =>
      (a.injuredWeeks > 0) - (b.injuredWeeks > 0) ||
      Number(["u21", "u18"].includes(a.squadGroup)) - Number(["u21", "u18"].includes(b.squadGroup)) ||
      b.condition - a.condition ||
      playerScore(b) - playerScore(a)
    )
    .slice(0, limit);
}

function renderSubBench(teamId, title = "Subs & Academy") {
  const players = benchPlayersForTeam(teamId);
  const selectedStarter = state.lineupPlayerIds?.includes(Number(state.selectedPlayerId));
  return `<aside class="fm-panel fm-sub-bench">
    <header><h3>${title}</h3><span>${selectedStarter ? "Pick a sub to swap" : "Drag to shirt"}</span></header>
    <div class="sub-bench-list">
      ${players.map((player) => `<button class="${player.id === state.selectedPlayerId ? "active" : ""}" data-drag-player-id="${player.id}" draggable="true" onclick="swapOrSelectSub(${player.id})" type="button">
        <span class="mini-shirt">${shirtNo(player)}</span>
        <strong>${player.name}</strong>
        <small>${player.role} | ${SQUAD_GROUPS[player.squadGroup]} | ${playerRating(player)}</small>
        ${renderFitnessLine(player)}
      </button>`).join("")}
    </div>
  </aside>`;
}

function renderFmShirt(player, index, side = "home") {
  const name = player?.name.split(" ").slice(-1)[0] ?? "Empty";
  const rating = player ? playerRating(player) : "-";
  const fit = player ? roleSuitability(player) : { className: "bad", label: "Empty slot" };
  return `<button class="fm-player-token ${side}" data-player-id="${player?.id ?? ""}" type="button">
    <span class="fm-shirt"><b>${shirtNo(player, index + 1)}</b><em class="suitability-dot ${fit.className}" title="${fit.label}"></em></span>
    <i>${rating}</i>
    <strong>${name}</strong>
    ${player ? `<small class="token-status">${player.condition}% | S${playerStaminaScore(player)} | F${player.fatigue ?? 0}</small>` : ""}
  </button>`;
}

function renderFmFormation(teamId, title, side = "home") {
  const team = teamById(teamId);
  const eleven = firstEleven(teamId);
  const editable = teamId === state.userTeamId;
  const shape = fmFormationPositions(team?.tactics?.formation);
  const positions = editable ? activeFormationPositions() : shape.map(([, x, y]) => ({ x, y }));
  return `<section class="fm-panel fm-formation ${editable ? "editable" : ""}">
    <header><h3>${title} <em>${team?.tactics?.formation ?? "4-3-3"}</em></h3>${editable ? `<button onclick="resetFreeMoveShape()" type="button">Reset Shape</button>` : `<span><b></b><b></b><b></b></span>`}</header>
    <div class="fm-board" ${editable ? `data-free-move="true"` : ""}>
      <div class="fm-board-line half"></div>
      <div class="fm-board-line circle"></div>
      <div class="fm-board-line box-top"></div>
      <div class="fm-board-line box-bottom"></div>
      ${positions
        .map(({ label: slotLabel, x, y }, index) => `<div class="fm-position" data-position-index="${index}" ${editable ? `data-lineup-slot="${index}"` : ""} style="left:${x}%;top:${y}%"><span class="fm-role-label">${slotLabel ?? shape[index]?.[0] ?? ""}</span>${renderFmShirt(eleven[index], index, side)}</div>`)
        .join("")}
    </div>
    ${editable ? `<p class="free-move-hint">Drag shirts to move shape. Drag squad players onto shirts to set your starting XI.</p>` : ""}
  </section>`;
}

function renderFmSquadStrip(teamId) {
  const eleven = firstEleven(teamId);
  const positions = formationShape(teamById(teamId)?.tactics?.formation).map(([label]) => label);
  return `<section class="fm-squad-strip">
    <div class="fm-strip-cell title"><strong>Squad</strong><span>5/5 Subs</span><span>3/3 Stoppages</span></div>
    ${eleven.map((player, index) => `<button class="fm-strip-cell" data-player-id="${player.id}" type="button">
      <b>${positions[index]}</b>
      <span class="fm-shirt small"><b>${shirtNo(player, index + 1)}</b></span>
      <strong>${player.name.split(" ").slice(-1)[0]}</strong>
      <i>${playerRating(player)}</i>
    </button>`).join("")}
  </section>`;
}

function renderFmTopControls(title = "Tactics & Subs") {
  const t = state.tactics;
  const normalized = normalizeTactics(t);
  return `<div class="fm-match-top">
    <div class="fm-top-actions">
      <button onclick="state.activeView='tactics'; render();" type="button">${title}</button>
      <button onclick="state.activeView='tactics'; render();" type="button">Instructions</button>
      <select onchange="setTactic('mentality', this.value)">
        ${["veryDefensive", "defensive", "cautious", "balanced", "positive", "attacking", "veryAttacking"].map((item) => `<option value="${item}" ${normalized.mentality === item ? "selected" : ""}>${label(item)}</option>`).join("")}
      </select>
    </div>
    <div class="fm-top-actions right">
      <button onclick="state.activeView='menu'; render();" type="button">Menu</button>
      <button onclick="simulateSelectedMatch()" type="button">Pause</button>
    </div>
  </div>`;
}

function renderFmStatsPanel() {
  const match = state.lastMatch;
  const homeStats = match?.stats.home ?? { shots: 4, onTarget: 2, xg: 0.78, possession: 58 };
  const awayStats = match?.stats.away ?? { shots: 2, onTarget: 1, xg: 0.29, possession: 42 };
  const stats = [
    ["Shots", homeStats.shots, awayStats.shots],
    ["Shots on Target", homeStats.onTarget, awayStats.onTarget],
    ["xG", homeStats.xg.toFixed(2), awayStats.xg.toFixed(2)],
    ["Possession", `${homeStats.possession}%`, `${awayStats.possession}%`],
  ];
  return `<section class="fm-panel fm-stats">
    <header><h3>Match Stats</h3><span><b></b><b></b><b></b></span></header>
    ${stats.map(([name, homeValue, awayValue]) => `<div class="fm-stat-row">
      <strong>${homeValue}</strong><span>${name}</span><b>${awayValue}</b>
      <i style="--home:${Number.parseFloat(homeValue) || 50};--away:${Number.parseFloat(awayValue) || 50}"></i>
    </div>`).join("")}
  </section>`;
}

function renderFmEventsPanel() {
  const events = state.lastMatch?.events.slice(-4).reverse() ?? ["No match events yet.", "Simulate selected match to create live data."];
  return `<section class="fm-panel fm-events"><header><h3>Match Events</h3></header>
    <ol>${events.map((event) => `<li>${event}</li>`).join("")}</ol>
  </section>`;
}

function squadDepthRoleForSlot(slotLabel = "") {
  if (slotLabel === "GK") return "GK";
  if (["DL", "DR", "WBL", "WBR", "FB"].includes(slotLabel)) return "FB";
  if (slotLabel.includes("DC") || slotLabel === "CB") return "CB";
  if (slotLabel.includes("DM")) return "DM";
  if (slotLabel.includes("AM") || slotLabel === "AML" || slotLabel === "AMR") return "AM";
  if (slotLabel === "ML" || slotLabel === "MR" || slotLabel === "W") return "W";
  if (slotLabel.includes("ST")) return "ST";
  return "CM";
}

function renderSquadDepthPanel(teamId) {
  const positions = formationShape(teamById(teamId)?.tactics?.formation).map(([slot]) => slot);
  const allPlayers = playersForTeam(teamId).filter((player) => ["senior", "sub", "u21", "u18"].includes(player.squadGroup));
  const starters = new Set(firstEleven(teamId).map((player) => player.id));
  return `<section class="fm-panel squad-depth-panel">
    <header><h3>Squad Depth</h3><span>${teamById(teamId)?.tactics?.formation ?? state.tactics.formation}</span></header>
    <div class="squad-depth-grid">
      ${positions.map((slot) => {
        const targetRole = squadDepthRoleForSlot(slot);
        const depth = allPlayers
          .map((player) => ({
            player,
            score: (player.role === targetRole ? 28 : roleSuitability(player).className === "good" ? 12 : 0) + playerScore(player) + player.condition / 3 - (player.fatigue ?? 0) / 4,
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);
        return `<article>
          <strong>${slot}</strong>
          ${depth.map(({ player }, index) => `<button class="${starters.has(player.id) ? "starter" : ""}" onclick="state.selectedPlayerId=${player.id}; state.squadMode='report'; render();" type="button">
            <b>${index + 1}</b><span>${shirtNo(player)} ${escapeHtml(player.name.split(" ").slice(-1)[0])}</span><em>${playerRating(player)} | ${player.condition}%</em>
          </button>`).join("")}
        </article>`;
      }).join("")}
    </div>
  </section>`;
}

function renderSquadOverview(club, selected, groupedPlayers, groupTabs, coachSummary) {
  return `<div class="panel-header">
    <div><p class="eyebrow">Squad Overview</p><h2>${escapeHtml(club.name)} Tactic + Squad Depth</h2></div>
    <div class="button-row">
      <button onclick="applyCoachAutoLineup()" type="button">Coach Auto XI</button>
      <button onclick="state.activeView='tactics'; render();" type="button">Open Tactics</button>
      <button onclick="state.squadMode='report'; render();" type="button">Player Report</button>
    </div>
  </div>
  <section class="staff-advice-card squad-advice">
    <div>
      <p class="eyebrow">Assistant Selection</p>
      <h3>Auto lineup based on fitness, morale, fatigue and role fit</h3>
      <span>Recommended XI: ${coachSummary.condition || 0}% condition | ${coachSummary.stamina || 0} stamina | ${coachSummary.fatigue || 0} fatigue | ${coachSummary.count}/11 available</span>
    </div>
    <button onclick="applyCoachAutoLineup()" type="button">Apply Coach Pick</button>
  </section>
  <div class="squad-page-layout squad-overview-layout">
    <section class="squad-pitch-panel">
      ${renderFmFormation(state.userTeamId, `${club.name} Formation`, "home")}
    </section>
    ${renderSubBench(state.userTeamId, "Subs / U21 / U18")}
    ${renderSquadDepthPanel(state.userTeamId)}
    ${renderSquadTable(groupedPlayers, selected, groupTabs)}
  </div>`;
}

function renderSquad() {
  const club = teamById(state.userTeamId);
  state.squadMode = state.squadMode ?? "overview";
  const groupedPlayers = playersForTeam(state.userTeamId)
    .filter((player) => player.squadGroup === state.squadGroup)
    .sort((a, b) => playerScore(b) - playerScore(a));
  const selected = groupedPlayers.find((player) => player.id === state.selectedPlayerId) ?? groupedPlayers[0] ?? firstEleven(state.userTeamId)[0];
  state.selectedPlayerId = selected.id;
  const groupTabs = Object.entries(SQUAD_GROUPS)
    .map(([group, text]) => {
      const count = playersForTeam(state.userTeamId).filter((player) => player.squadGroup === group).length;
      return `<button class="${state.squadGroup === group ? "active" : ""}" onclick="state.squadGroup='${group}'; state.selectedPlayerId=null; render();" type="button">${text} <span>${count}</span></button>`;
    })
    .join("");
  const moveButtons = Object.entries(SQUAD_GROUPS)
    .map(([group, text]) => `<button class="${selected.squadGroup === group ? "active" : ""}" onclick="movePlayerToSquad(${selected.id}, '${group}')" type="button">${text}</button>`)
    .join("");
  const coachXI = coachAutoEleven(state.userTeamId);
  const coachCondition = Math.round(average(coachXI.map((player) => player.condition)));
  const coachStamina = Math.round(average(coachXI.map((player) => playerStaminaScore(player))));
  const coachFatigue = Math.round(average(coachXI.map((player) => player.fatigue ?? 0)));
  if (state.squadMode !== "report") {
    return renderSquadOverview(club, selected, groupedPlayers, groupTabs, {
      condition: coachCondition,
      stamina: coachStamina,
      fatigue: coachFatigue,
      count: coachXI.length,
    });
  }
  return `<div class="player-report-shell">
    <div class="panel-header compact">
      <div><p class="eyebrow">Squad Player Report</p><h2>${escapeHtml(selected.name)}</h2></div>
      <div class="button-row"><button onclick="state.squadMode='overview'; render();" type="button">Back To Overview</button><button onclick="state.activeView='tactics'; render();" type="button">Open Tactics</button></div>
    </div>
    ${renderPlayerProfileReport(selected, club)}
    <section class="report-management-row">
      <div>
        <p class="eyebrow">Assistant Selection</p>
        <h3>Coach auto pick checks fitness, morale, fatigue and role fit before choosing XI</h3>
        <span class="report-readiness">Recommended XI: ${coachCondition || 0}% condition | ${coachStamina || 0} stamina | ${coachFatigue || 0} fatigue | ${coachXI.length}/11 available</span>
      </div>
      <div class="button-row">
        <button onclick="applyCoachAutoLineup()" type="button">Coach Auto XI</button>
        <button onclick="openPlayerDialogue(${selected.id}, 'POOR_FORM_WARNING', 'MANUAL')" type="button">Talk</button>
        <button onclick="negotiateContract(${selected.id})" type="button">Offer Contract</button>
        <button onclick="state.activeView='tactics'; render();" type="button">Open Tactics</button>
      </div>
      <div class="move-squad-controls compact">
        <h4>Move Squad</h4>
        <div>${moveButtons}</div>
      </div>
    </section>
    ${renderSquadTable(groupedPlayers, selected, groupTabs)}
  </div>`;
}

function pitchPositions(side) {
  const left = side === "home";
  const x = (homeX, awayX) => (left ? homeX : awayX);
  return [
    { role: "GK", x: x(8, 92), y: 50 },
    { role: "FB", x: x(22, 78), y: 20 },
    { role: "CB", x: x(20, 80), y: 40 },
    { role: "CB", x: x(20, 80), y: 60 },
    { role: "FB", x: x(22, 78), y: 80 },
    { role: "DM", x: x(36, 64), y: 50 },
    { role: "CM", x: x(46, 54), y: 35 },
    { role: "CM", x: x(46, 54), y: 65 },
    { role: "AM", x: x(58, 42), y: 50 },
    { role: "W", x: x(65, 35), y: 24 },
    { role: "ST", x: x(73, 27), y: 50 },
  ];
}

function renderPitchPlayers(teamId, side, livePlayers = null) {
  if (livePlayers?.length) {
    return livePlayers
      .map((position, index) => {
        const player = state.players.find((candidate) => candidate.id === position.id);
        const shortName = position.name ? position.name.split(" ").at(-1).slice(0, 3).toUpperCase() : position.role;
        const status = position.offsideRisk ? "Offside line risk" : position.duty ?? "Live tick";
        return `<span class="pitch-player ${side} live ${position.offsideRisk ? "risk" : ""}" data-visual-player-id="${position.id}" style="left:${position.x}%;top:${position.y}%" title="${status}">
          <b>${shirtNo(player, index + 1)}</b><i>${shortName}</i>
        </span>`;
      })
      .join("");
  }
  const eleven = firstEleven(teamId);
  return pitchPositions(side)
    .map((position, index) => {
      const player = eleven[index];
      const shortName = player ? player.name.split(" ").at(-1).slice(0, 3).toUpperCase() : position.role;
      return `<span class="pitch-player ${side}" data-visual-player-id="${player?.id ?? ""}" style="left:${position.x}%;top:${position.y}%">
        <b>${shirtNo(player, index + 1)}</b><i>${shortName}</i>
      </span>`;
    })
    .join("");
}

function renderEngineTelemetry(match) {
  if (!match) {
    return `<section class="engine-telemetry">
      <div class="panel-header compact"><div><p class="eyebrow">Engine Live</p><h3>รอเริ่ม Match</h3></div><button onclick="state.activeView='engine'; render();" type="button">Engine Detail</button></div>
      <p>กด Play Match แล้วระบบจะแสดง tick, ball state, decision loop, duel และ fatigue degradation ตรงนี้.</p>
    </section>`;
  }
  const trace = match.engineTrace ?? {};
  const tick = match.tickState;
  const ball = tick?.ball ?? {};
  const avgError = trace.passErrors?.length ? average(trace.passErrors).toFixed(1) : "0.0";
  const fatigueValues = Object.values(trace.runtimeFatigue ?? {});
  const maxFatigue = fatigueValues.length ? Math.max(...fatigueValues).toFixed(1) : "0.0";
  const hiddenProfiles = match.analysis?.hiddenProfiles ?? { inconsistent: 0, choking: 0 };
  const environment = match.environment;
  const clips = match.highlightClips?.length ?? 0;
  const rewindFrames = trace.rewindCount ?? trace.rewindBuffer?.length ?? 0;
  const matchLogs = trace.matchLog?.length ?? 0;
  const playerStates = tick?.players
    ? [...(tick.players.home ?? []), ...(tick.players.away ?? [])].reduce((summary, player) => {
        const key = player.aiState ?? "OFF_BALL_RUN";
        summary[key] = (summary[key] ?? 0) + 1;
        return summary;
      }, {})
    : {};
  const matrix = trace.tacticalMatrix?.home ?? mentalityMatrix(state.tactics);
  const familiarity = trace.tacticalMatrix?.homeFamiliarity ?? normalizeTactics(state.tactics).familiarity;
  const avgFamiliarity = Math.round(average(Object.values(familiarity)));
  const lastDecision = trace.lastDecision
    ? `${trace.lastDecision.minute}' ${trace.lastDecision.player}: ${trace.lastDecision.action} under pressure ${trace.lastDecision.pressure}`
    : "No decision captured yet";
  return `<section class="engine-telemetry">
    <div class="panel-header compact">
      <div><p class="eyebrow">Engine Live</p><h3>${trace.ticksPerSecond ?? MATCH_LOGIC_TICK_RATE} ticks/sec | ${trace.objectCount ?? 23} objects</h3></div>
      <button onclick="state.activeView='engine'; render();" type="button">Engine Detail</button>
    </div>
    <div class="engine-telemetry-grid">
      <article><span>Ball State</span><strong>${ball.state ?? "Ball_Free"}</strong><small>X ${Math.round(ball.x ?? 50)} Y ${Math.round(ball.y ?? 50)} Z ${Math.round(ball.z ?? 0)}</small></article>
      <article><span>Velocity</span><strong>${Number(ball.vx ?? 0).toFixed(2)} / ${Number(ball.vy ?? 0).toFixed(2)}</strong><small>Acc ${Number(ball.ax ?? 0).toFixed(2)} / ${Number(ball.ay ?? 0).toFixed(2)} | spin ${Number(ball.spin ?? 0).toFixed(1)}</small></article>
      <article><span>Environment</span><strong>${environment?.pitchKey ?? "dry"}</strong><small>${environment?.size?.length ?? 105}x${environment?.size?.width ?? 68}m | drag ${Number(environment?.ballDrag ?? 0).toFixed(3)}</small></article>
      <article><span>Crowd Pressure</span><strong>${match.analysis?.fanPower ?? 0}/28</strong><small>${match.analysis?.crowdAnxiety ?? 0} away player(s) anxious</small></article>
      <article><span>Complacency</span><strong>${match.analysis?.complacency?.home?.active ? "Home risk" : match.analysis?.complacency?.away?.active ? "Away risk" : "Clear"}</strong><small>${match.analysis?.complacency?.home?.note ?? "No trigger"}</small></article>
      <article><span>Decisions</span><strong>${trace.decisions ?? 0}</strong><small>${lastDecision}</small></article>
      <article><span>Duels</span><strong>${trace.duels ?? 0}</strong><small>1v1 versus matrix rolls</small></article>
      <article><span>Passing Lanes</span><strong>${trace.passingLanes ?? 0}</strong><small>Options from scan cone</small></article>
      <article><span>Pass Error</span><strong>${avgError}</strong><small>Target vector deviation</small></article>
      <article><span>Runtime Fatigue</span><strong>${maxFatigue}</strong><small>Decision delay + control drag</small></article>
      <article><span>Risk Matrix</span><strong>${matrix.risk.toFixed(2)}x</strong><small>Urgency ${matrix.urgency.toFixed(2)} | width ${matrix.width}</small></article>
      <article><span>Familiarity</span><strong>${avgFamiliarity}%</strong><small>Penalty feeds decisions/positioning</small></article>
      <article><span>Counter-Press</span><strong>${trace.counterPresses ?? 0}</strong><small>${trace.counterPress ? `${trace.counterPress.side} emergency press active` : "Emergency script idle"}</small></article>
      <article><span>Highlights</span><strong>${clips}</strong><small>Rewind buffer triggers ${trace.highlightTriggers ?? 0}</small></article>
      <article><span>Ring Buffer</span><strong>${rewindFrames}/${REWIND_BUFFER_LIMIT}</strong><small>${REWIND_BUFFER_SECONDS}s rolling history | ${MATCH_LOGIC_TICK_RATE}Hz logic | ${MATCH_LOGIC_TICK_RATE / REWIND_SAMPLE_INTERVAL}Hz visual samples</small></article>
      <article><span>FSM States</span><strong>${Object.keys(playerStates).length}</strong><small>${Object.entries(playerStates).map(([key, value]) => `${key} ${value}`).join(" | ") || "Awaiting tick"}</small></article>
      <article><span>Match Logger</span><strong>${matchLogs}</strong><small>${trace.matchLog?.at(-1)?.eventType ?? "No event"} | ${trace.matchLog?.at(-1)?.actor ?? "Awaiting action"}</small></article>
      <article><span>Interrupts</span><strong>${trace.interrupts?.length ?? 0}</strong><small>${trace.interrupts?.at(-1)?.label ?? "No shout injected"}</small></article>
      <article><span>Hidden Form</span><strong>${hiddenProfiles.inconsistent}/${hiddenProfiles.choking}</strong><small>Consistency nerfs / big-match chokes</small></article>
      <article><span>Translation Layer</span><strong>${trace.translationCommands?.length ?? 0}</strong><small>${trace.translationCommands?.at(-1)?.action ?? "No visual command"} | magnet ${Number(trace.translationCommands?.at(-1)?.hybridPhysics?.magnet ?? 0).toFixed(2)}</small></article>
      <article><span>Active Ragdoll</span><strong>${trace.lastDuel?.activeRagdoll ? "On" : "Idle"}</strong><small>Force ${trace.lastDuel?.collisionForce ?? 0} | impulse ${Number(trace.lastDuel?.ragdollImpulse ?? 0).toFixed(2)}</small></article>
      <article><span>Visual Flair</span><strong>${match.weather === "rain" || environment?.pitchKey === "wet" ? "Wet match" : "Dry match"}</strong><small>GK states | kit wear | pitch wear | manager reactions</small></article>
    </div>
  </section>`;
}

function setViewerMode(mode) {
  state.viewerMode = ["classic", "broadcast", "commentary"].includes(mode) ? mode : "classic";
  render();
}

function setHighlightLevel(level) {
  state.highlightLevel = ["key", "extended", "full"].includes(level) ? level : "extended";
  render();
}

function setMatchPlaybackSpeed(speed) {
  state.matchPlaybackSpeed = [1, 1.25, 1.5].includes(Number(speed)) ? Number(speed) : 1;
  render();
}

function exportUnityMatchState() {
  const match = state.lastMatch;
  if (!match) {
    addFeed("Play a match first, then export its Unity MatchState JSON.");
    return render();
  }
  const frames = buildMatchStateFrames(match).map((frame) => ({
    tick: frame.tick,
    minute: frame.minute,
    second: frame.second,
    ball: frame.ball,
    players: frame.players,
    matchEvent: (() => {
      const clip = match.highlightClips?.filter((item) => item.minute <= frame.minute).at(-1);
      return clip ? { type: clip.type, text: clip.text, cameraDirector: clip.cameraDirector } : { type: "", text: "", cameraDirector: [] };
    })(),
  }));
  const payload = JSON.stringify({ matchId: `${match.homeId}-${match.awayId}-${state.season}-${state.week}`, ticksPerSecond: MATCH_LOGIC_TICK_RATE, frames }, null, 2);
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
  anchor.download = "live_match_state.json";
  anchor.click();
  URL.revokeObjectURL(anchor.href);
  addFeed("Unity MatchState JSON exported. Place it in unity_match_viewer/Assets/StreamingAssets/MatchData/live_match_state.json.");
}

function quickMatchSubstitute() {
  const match = state.lastMatch;
  if (!match || state.matchdayPhase !== "half") {
    addFeed("Quick Sub becomes available at half-time or during an active match interval.");
    return render();
  }
  const starters = firstEleven(state.userTeamId);
  const outgoing = starters
    .filter((player) => player.role !== "GK")
    .sort((a, b) => a.condition - b.condition || (b.fatigue ?? 0) - (a.fatigue ?? 0))[0];
  const incoming = benchPlayersForTeam(state.userTeamId)
    .filter((player) => player.injuredWeeks <= 0 && !player.availability?.blocksMatch && player.role === outgoing?.role)
    .sort((a, b) => b.condition - a.condition || playerScore(b) - playerScore(a))[0]
    ?? benchPlayersForTeam(state.userTeamId).find((player) => player.injuredWeeks <= 0 && !player.availability?.blocksMatch);
  if (!outgoing || !incoming) {
    addFeed("Assistant could not find a valid quick substitution.");
    return render();
  }
  const slot = state.lineupPlayerIds.findIndex((id) => id === outgoing.id);
  if (slot < 0) return;
  state.lineupPlayerIds[slot] = incoming.id;
  const side = state.userTeamId === match.homeId ? "home" : "away";
  match.lineups[side] = state.lineupPlayerIds.slice();
  const minute = match.tickState?.minute ?? 45;
  const text = `${minute}' Substitution ${teamById(state.userTeamId).name}: ${incoming.name} replaces ${outgoing.name}`;
  match.events.push(text);
  match.specialStates.push({ minute, type: "substitution", status: "resolved", text, incoming: incoming.id, outgoing: outgoing.id });
  captureHighlightClip(match, minute, "substitution", text);
  addFeed(text);
  render();
}

function issueTouchlineShout(type) {
  const club = teamById(state.userTeamId);
  const match = state.lastMatch;
  const minute = match?.tickState?.minute ?? 0;
  const config = {
    encourage: { label: "Encourage", boost: 0.035, morale: 1 },
    demand: { label: "Demand More", boost: 0.05, morale: club.morale >= 11 ? 1 : -1 },
    berate: { label: "Berate", boost: 0.025, morale: club.morale >= 14 ? 1 : -2 },
    focus: { label: "Focus", boost: 0.03, morale: 0 },
  }[type];
  if (!config) return;
  state.touchlineShout = { ...config, type, issuedMinute: minute, expiresMinute: minute + rand(10, 15) };
  state.teamTalk.boost = config.boost;
  firstEleven(state.userTeamId).forEach((player) => {
    const determined = (player.hidden.determination ?? 10) >= 13;
    player.teamTalkModifier = clamp(1 + config.boost + (determined ? 0.025 : type === "berate" ? -0.025 : 0), 0.9, 1.12);
    player.teamTalkReaction = determined && ["encourage", "demand"].includes(type) ? "Fired Up" : type === "berate" && !determined ? "Anxious" : "Focused";
    player.contract.morale = clamp(player.contract.morale + config.morale, 1, 20);
  });
  match?.engineTrace?.interrupts.push({ minute, type: "touchline shout", label: config.label, boost: config.boost, expiresMinute: state.touchlineShout.expiresMinute });
  addFeed(`Touchline shout: ${config.label} is active until approximately ${state.touchlineShout.expiresMinute}'.`);
  render();
}

function renderBroadcastControls(match) {
  const trace = match?.engineTrace ?? {};
  const tick = match?.tickState;
  const possession = tick?.possession ? `${label(tick.possession)} possession` : "Awaiting kickoff";
  const cameraLabel = state.viewerMode === "broadcast" ? "Broadcast 3D" : state.viewerMode === "commentary" ? "Text Commentary" : "Classic 2D";
  const frames = buildMatchStateFrames(match).length;
  return `<section class="broadcast-control-panel">
    <div>
      <p class="eyebrow">Match viewer</p>
      <h3>${cameraLabel}</h3>
      <span>${possession} | ${trace.decisions ?? 0} decisions | ${trace.duels ?? 0} duels | ${trace.rewindCount ?? 0}/${REWIND_BUFFER_LIMIT} ring frames | ${match?.highlightClips?.length ?? 0} clips</span>
    </div>
    <div class="viewer-toggle" role="group" aria-label="Match viewer mode">
      <button class="${state.viewerMode === "classic" ? "active" : ""}" onclick="setViewerMode('classic')" type="button">2D</button>
      <button class="${state.viewerMode === "broadcast" ? "active" : ""}" onclick="setViewerMode('broadcast')" type="button">3D Broadcast</button>
      <button class="${state.viewerMode === "commentary" ? "active" : ""}" onclick="setViewerMode('commentary')" type="button">Text</button>
    </div>
    <div class="viewer-toggle highlight-toggle" role="group" aria-label="Highlight level">
      ${["key", "extended", "full"].map((level) => `<button class="${state.highlightLevel === level ? "active" : ""}" onclick="setHighlightLevel('${level}')" type="button">${label(level)}</button>`).join("")}
    </div>
    <div class="viewer-toggle speed-toggle" role="group" aria-label="Playback speed">
      ${[1, 1.25, 1.5].map((speed) => `<button class="${state.matchPlaybackSpeed === speed ? "active" : ""}" onclick="setMatchPlaybackSpeed(${speed})" type="button">${speed}x</button>`).join("")}
    </div>
    <button onclick="exportUnityMatchState()" type="button">Export Unity JSON</button>
  </section>`;
}

function toggleMatchWidget(widget) {
  state.matchWidgets[widget] = !state.matchWidgets[widget];
  render();
}

function renderQuickTacticsBar(match) {
  const fatigue = firstEleven(state.userTeamId)
    .sort((a, b) => (b.fatigue ?? 0) - (a.fatigue ?? 0))
    .slice(0, 3);
  return `<section class="quick-tactics-bar">
    <div><p class="eyebrow">Quick Tactics</p><strong>${label(state.tactics.mentality)}</strong></div>
    <div class="quick-mentality">
      ${["cautious", "balanced", "positive", "attacking"].map((item) => `<button class="${state.tactics.mentality === item ? "active" : ""}" onclick="setTactic('mentality', '${item}')" type="button">${label(item)}</button>`).join("")}
    </div>
    <button onclick="state.activeView='tactics'; render();" type="button">Full Tactics</button>
    <button onclick="quickMatchSubstitute()" type="button">Quick Sub</button>
    <div class="touchline-shouts">
      ${["encourage", "demand", "berate", "focus"].map((item) => `<button class="${state.touchlineShout?.type === item ? "active" : ""}" onclick="issueTouchlineShout('${item}')" type="button">${label(item)}</button>`).join("")}
    </div>
    <div class="widget-toggles">
      ${["stats", "fatigue", "ratings", "events"].map((item) => `<button class="${state.matchWidgets[item] ? "active" : ""}" onclick="toggleMatchWidget('${item}')" type="button">${label(item)}</button>`).join("")}
    </div>
    ${state.matchWidgets.fatigue ? `<aside class="match-widget fatigue-widget"><h4>Fitness Watch</h4>${fatigue.map((player) => `<span>${player.name}<b>${player.condition}% / F${player.fatigue ?? 0}</b><i><em style="width:${player.condition}%"></em></i></span>`).join("")}</aside>` : ""}
    ${state.matchWidgets.stats ? `<aside class="match-widget stats-widget"><h4>Live Stats</h4><span>Possession<b>${match?.stats.home.possession ?? 50}-${match?.stats.away.possession ?? 50}%</b></span><span>Shots / OT<b>${match?.stats.home.shots ?? 0}(${match?.stats.home.onTarget ?? 0})-${match?.stats.away.shots ?? 0}(${match?.stats.away.onTarget ?? 0})</b></span><span>xG<b>${(match?.stats.home.xg ?? 0).toFixed(2)}-${(match?.stats.away.xg ?? 0).toFixed(2)}</b></span><span>Pass Completion<b>${livePassCompletion(match, "home")}% - ${livePassCompletion(match, "away")}%</b></span></aside>` : ""}
    ${state.matchWidgets.ratings ? `<aside class="match-widget ratings-widget"><h4>Live Ratings</h4>${livePlayerRatings(match).slice(0, 5).map(({ player, rating }) => `<span>${player.name}<b>${rating.toFixed(1)}</b></span>`).join("")}</aside>` : ""}
    ${state.matchWidgets.events ? `<aside class="match-widget events-widget"><h4>Latest Event</h4><p>${match?.events.at(-1) ?? "Waiting for kickoff"}</p></aside>` : ""}
  </section>`;
}

function livePassCompletion(match, side) {
  if (!match) return 0;
  const errors = match.engineTrace?.passErrors ?? [];
  const drag = errors.length ? average(errors) * 1.6 : 8;
  return clamp(Math.round(92 - drag + (side === "home" ? 1 : -1)), 58, 94);
}

function livePlayerRatings(match) {
  return firstEleven(state.userTeamId)
    .map((player) => {
      const production = player.stats.goals * 0.48 + player.stats.assists * 0.3;
      const sharpness = (player.form - 10) / 18 + (player.condition - 70) / 170 - (player.fatigue ?? 0) / 260;
      return { player, rating: clamp(6.4 + production + sharpness, 5.5, 9.8) };
    })
    .sort((a, b) => a.rating - b.rating);
}

function renderMatchClock(match, score, home, away, phaseLabel) {
  const minute = match?.tickState?.minute ?? (state.matchdayPhase === "half" ? 45 : state.matchdayPhase === "full" ? 90 : 0);
  const second = Math.floor(match?.tickState?.second ?? 0).toString().padStart(2, "0");
  const weather = match ? `${match.weather} / ${match.environment?.pitchKey ?? "dry"}` : "pre-match";
  return `<div class="broadcast-scorebug">
    <div class="scorebug-clock"><strong>${minute}:${second}</strong><span>${phaseLabel}</span></div>
    <div class="scorebug-team home">${teamCrest(home, "sm")}<b>${teamInitials(home.name)}</b></div>
    <div class="scorebug-score">${match ? `${score.home} - ${score.away}` : "0 - 0"}</div>
    <div class="scorebug-team away"><b>${teamInitials(away.name)}</b>${teamCrest(away, "sm")}</div>
    <div class="scorebug-weather">${weather}</div>
  </div>`;
}

function renderViewerTrail(match) {
  const samples = match?.tickSamples?.slice(-12) ?? [];
  if (!samples.length) return "";
  return samples
    .map((sample, index) => {
      const opacity = 0.18 + (index / Math.max(samples.length - 1, 1)) * 0.58;
      return `<span class="ball-ghost" style="left:${sample.ball.x}%;top:${sample.ball.y}%;opacity:${opacity}"></span>`;
    })
    .join("");
}

function renderTickTimeline(match) {
  const samples = match?.tickSamples?.slice(-16) ?? [];
  if (!samples.length) return "";
  return `<section class="tick-timeline">
    <header><span>Tick Timeline</span><strong>${match.engineTrace?.ticksPerSecond ?? MATCH_LOGIC_TICK_RATE} TPS</strong></header>
    <div>
      ${samples.map((sample) => `<i style="--x:${sample.ball.x}%;--y:${sample.ball.y}%"><b>${sample.minute}'</b></i>`).join("")}
    </div>
  </section>`;
}

function renderMatchSquadStatus() {
  const ratings = new Map(livePlayerRatings(state.lastMatch).map(({ player, rating }) => [player.id, rating]));
  return `<aside class="match-squad-widget">
    <header><span>Squad Status</span><button onclick="quickMatchSubstitute()" type="button">Quick Sub</button></header>
    <ol>
      ${firstEleven(state.userTeamId).map((player) => {
        const reaction = player.teamTalkReaction ?? (player.condition < 66 ? "Tired" : player.contract.morale >= 14 ? "Confident" : "Focused");
        return `<li>
          <b>${shirtNo(player)}</b>
          <span><strong>${player.name}</strong><small>${player.role} | ${reaction}</small></span>
          <em>${(ratings.get(player.id) ?? 6.5).toFixed(1)}</em>
          <i><u style="width:${player.condition}%"></u></i>
        </li>`;
      }).join("")}
    </ol>
  </aside>`;
}

function renderMomentumTimeline(match) {
  const home = match?.stats?.home ?? { shots: 0, xg: 0, possession: 50 };
  const away = match?.stats?.away ?? { shots: 0, xg: 0, possession: 50 };
  const homeEdge = clamp(Math.round(34 + home.xg * 20 + home.shots * 3 + (home.possession - 50) * 0.5), 12, 88);
  const awayEdge = 100 - homeEdge;
  return `<article class="momentum-widget">
    <span>Match Momentum</span>
    <div><i style="width:${homeEdge}%"></i><b style="width:${awayEdge}%"></b></div>
    <small>Home pressure ${homeEdge}% | Away pressure ${awayEdge}%</small>
  </article>`;
}

function renderTextMatchViewport(match) {
  const events = visibleMatchEvents(match).slice(-9).reverse();
  return `<section class="text-match-viewport">
    <header><span>Live Text Feed</span><strong>${label(state.highlightLevel)} highlights | ${state.matchPlaybackSpeed}x</strong></header>
    <ol>${(events.length ? events : ["Kick-off preparation in progress."]).map((event) => `<li>${commentaryForEvent(event)}</li>`).join("")}</ol>
  </section>`;
}

function renderLiveMatchSidebar(match, home, away) {
  const events = visibleMatchEvents(match).slice(-5).reverse();
  const lastDecision = match?.engineTrace?.lastDecision;
  return `<aside class="live-match-sidebar">
    <article>
      <span>Assistant Feed</span>
      <strong>${lastDecision ? `${lastDecision.player}: ${lastDecision.action}` : "Waiting for first decision"}</strong>
      <small>${lastDecision ? `${lastDecision.options} options, pressure ${lastDecision.pressure}` : "Engine will show choices after kickoff."}</small>
    </article>
    ${renderMomentumTimeline(match)}
    <article>
      <span>Momentum</span>
      <strong>${home.name}</strong>
      <small>${match ? `${match.stats.home.possession}% possession | ${match.stats.home.xg.toFixed(2)} xG` : "Pre-match"}</small>
    </article>
    <article>
      <span>Threat</span>
      <strong>${away.name}</strong>
      <small>${match ? `${match.stats.away.possession}% possession | ${match.stats.away.xg.toFixed(2)} xG` : "Pre-match"}</small>
    </article>
    <ol>
      ${(events.length ? events : ["Press Play Match to generate live match events."]).map((event) => `<li>${event}</li>`).join("")}
    </ol>
    ${(match?.assistantAlerts?.length ? match.assistantAlerts : ["ผู้ช่วยกำลังวิเคราะห์เกมอยู่ครับ"]).map((alert) => `<article class="assistant-match-alert"><span>Assistant Manager</span><small>${alert}</small></article>`).join("")}
  </aside>`;
}

function commentaryForEvent(event) {
  if (!event) return "รอเสียงนกหวีดเริ่มเกม...";
  if (event.includes("Goal ")) return `${event} เรียบร้อยครับ! เสียงเชียร์ดังลั่นสนาม`;
  if (event.includes("VAR")) return `${event} ทุกคนกำลังรอคำตัดสินจากห้อง VAR`;
  if (event.includes("Weather change")) return `${event} สภาพสนามกำลังเปลี่ยน แท็กติกต้องปรับแล้วครับ`;
  if (event.includes("Injury") || event.includes("injury")) return `${event} ทีมแพทย์กำลังวิ่งลงสนาม`;
  return event;
}

function renderCommentaryBar(match) {
  const events = visibleMatchEvents(match);
  const selected = state.highlightLevel === "key"
    ? events.filter((event) => event.includes("Goal ") || event.includes("VAR") || event.includes("injury"))
    : events;
  const latest = selected.at(-1) ?? "";
  const severity = latest.includes("Goal ") ? "goal" : latest.includes("VAR") || latest.includes("injury") || latest.includes("Substitution") ? "alert" : "normal";
  return `<section class="commentary-bar ${severity}"><span>LIVE COMMENTARY</span><strong>${commentaryForEvent(latest)}</strong><small>${label(state.highlightLevel)} highlights</small></section>`;
}

function renderMatchDecisionOverlay() {
  const decision = state.pendingMatchDecision;
  const player = state.players.find((item) => item.id === decision?.playerId);
  if (!decision || !player) return "";
  return `<section class="match-decision-overlay">
    <article>
      <p class="eyebrow">Match stopped | medical decision</p>
      <h3>${player.name} requires treatment</h3>
      <span>${decision.matchMinute}' ${decision.reason}. Current estimate: ${decision.weeks} week(s).</span>
      <div><button onclick="resolveMatchDecision('substitute')" type="button">Substitute Now</button><button onclick="resolveMatchDecision('painkiller')" type="button">Pain Relief + Continue</button></div>
    </article>
  </section>`;
}

function visualLerp(a, b, t) {
  return a + (b - a) * t;
}

function hermite(a, b, tangentA, tangentB, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * a + (t3 - 2 * t2 + t) * tangentA + (-2 * t3 + 3 * t2) * b + (t3 - t2) * tangentB;
}

function deepFreezeFrame(frame) {
  Object.freeze(frame.ball.pos);
  Object.freeze(frame.ball.spin);
  if (frame.ball.visualCommand) Object.freeze(frame.ball.visualCommand);
  Object.freeze(frame.ball);
  frame.players.forEach((player) => {
    Object.freeze(player.pos);
    Object.freeze(player.dir);
    Object.freeze(player.inverse_kinematics_target);
    Object.freeze(player);
  });
  Object.freeze(frame.players);
  return Object.freeze(frame);
}

function recentVisualReaction(player, minute) {
  const event = state.lastMatch?.replay?.filter((item) => item.minute <= minute).at(-1);
  if (!event || minute - event.minute > 2) return null;
  if (event.type === "goal") return event.teamId === player.teamId ? "CELEBRATE" : "MISS_REACTION";
  if (event.type === "save" && player.role === "GK") return "GK_DIVE";
  if (event.type === "shot" && event.player === player.name) return "MISS_REACTION";
  if (event.type === "injury" && event.player === player.name) return "INJURED";
  return null;
}

function animStateForPlayer(player, frameBall, teamKey, minute) {
  const speed = Math.hypot(player.vx ?? 0, player.vy ?? 0);
  const reaction = recentVisualReaction(player, minute);
  const ownGoalX = teamKey === "home" ? 4 : 96;
  const ballNearOwnBox = Math.abs((frameBall?.x ?? 50) - ownGoalX) < 24;
  if (reaction) return reaction;
  if (player.role === "GK" && ballNearOwnBox && (frameBall?.z ?? 0) > 2.4) return "GK_DIVE";
  if (player.role === "GK" && frameBall?.visualCommand?.playerId === player.id && frameBall.visualCommand.action === "PASS") return "GK_DISTRIBUTE";
  if (player.role === "GK" && ballNearOwnBox) return "GK_READY";
  if (player.counterPressing) return "TACKLE";
  if (frameBall?.visualCommand?.playerId === player.id) return frameBall.visualCommand.action;
  if (frameBall?.controllerId === player.id && frameBall?.state === "Within_Control_Radius") return "PASS";
  if (["CB", "FB", "DM"].includes(player.role) && speed > 0.7 && ballNearOwnBox) return "JOCKEY";
  if (["ST", "W", "AM"].includes(player.role) && speed > 2.4) return "CALL_FOR_BALL";
  if (speed > 3.4) return "SPRINT";
  if (speed > 1.4) return "JOG";
  return "IDLE";
}

function toMatchStateFrame(sample, index) {
  const ball = sample.ball ?? { x: 50, y: 50, z: 0, spin: 0, state: "Ball_Free" };
  const players = ["home", "away"].flatMap((teamKey) =>
    (sample.players?.[teamKey] ?? []).map((player) => ({
      id: player.id,
      team: teamKey.toUpperCase(),
      pos: [player.x, player.y, 0],
      dir: [player.vx ?? 0, player.vy ?? 0],
      speed: Math.hypot(player.vx ?? 0, player.vy ?? 0),
      anim_state: animStateForPlayer(player, ball, teamKey, sample.minute),
      inverse_kinematics_target: [ball.x, ball.y, ball.z ?? 0],
      role: player.role,
      condition: player.condition ?? 100,
      fatigue: player.fatigue ?? 0,
      dirty_kit: player.counterPressing || (ball.visualCommand?.action === "TACKLE" && ball.visualCommand?.playerId === player.id),
    }))
  );
  return deepFreezeFrame({
    tick: Math.round(((sample.minute - 1) * 60 + (sample.second ?? 0)) * MATCH_LOGIC_TICK_RATE) + index,
    minute: sample.minute,
    second: sample.second ?? 0,
    ball: {
      pos: [ball.x, ball.y, ball.z ?? 0],
      spin: [ball.spin ?? 0, ball.vz ?? 0],
      state: ball.state ?? "FREE",
      visualCommand: ball.visualCommand ?? null,
    },
    players,
  });
}

function buildMatchStateFrames(match) {
  if (!match) return [];
  const samples = [...(match.tickSamples ?? [])];
  if (match.tickState) samples.push(match.tickState);
  const keyed = new Map();
  samples.forEach((sample, index) => {
    const key = `${sample.minute}:${sample.second ?? index}`;
    keyed.set(key, toMatchStateFrame(sample, index));
  });
  return [...keyed.values()].sort((a, b) => a.tick - b.tick);
}

class VisualizerFrameQueue {
  constructor(frames = []) {
    this.frames = frames.slice(-Math.max(VISUALIZER_BUFFER_FRAMES, frames.length));
  }

  framePair(progress) {
    if (!this.frames.length) return null;
    if (this.frames.length === 1) return [this.frames[0], this.frames[0], 0];
    const scaled = progress * (this.frames.length - 1);
    const index = Math.min(Math.floor(scaled), this.frames.length - 2);
    return [this.frames[index], this.frames[index + 1], scaled - index];
  }
}

class MatchVisualizer {
  constructor(root, frames, mode) {
    this.root = root;
    this.queue = new VisualizerFrameQueue(frames);
    this.mode = mode;
    this.startedAt = performance.now();
    this.rafId = null;
    this.lastRenderAt = 0;
    this.duration = Math.max(1.6, frames.length / MATCH_LOGIC_TICK_RATE / state.matchPlaybackSpeed);
    this.playerNodes = new Map([...root.querySelectorAll("[data-visual-player-id]")].map((node) => [Number(node.dataset.visualPlayerId), node]));
    this.ballNode = root.querySelector("[data-visual-ball]");
  }

  start() {
    if (!this.queue.frames.length || (!this.playerNodes.size && !this.ballNode)) return;
    const loop = (now) => {
      if (now - this.lastRenderAt >= 1000 / VISUALIZER_RENDER_FPS) {
        const progress = ((now - this.startedAt) / 1000 / this.duration) % 1;
        this.render(progress);
        this.lastRenderAt = now;
      }
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  interpolatePlayer(playerA, playerB, t) {
    const sourceB = playerB ?? playerA;
    return {
      id: playerA.id,
      x: visualLerp(playerA.pos[0], sourceB.pos[0], t),
      y: visualLerp(playerA.pos[1], sourceB.pos[1], t),
      dx: visualLerp(playerA.dir[0], sourceB.dir[0], t),
      dy: visualLerp(playerA.dir[1], sourceB.dir[1], t),
      speed: visualLerp(playerA.speed ?? 0, sourceB.speed ?? 0, t),
      anim: (sourceB.speed ?? 0) - (playerA.speed ?? 0) < -1.2 ? "DECELERATE" : t < 0.5 ? playerA.anim_state : sourceB.anim_state,
      role: playerA.role,
      team: playerA.team,
      condition: visualLerp(playerA.condition ?? 100, sourceB.condition ?? 100, t),
      fatigue: visualLerp(playerA.fatigue ?? 0, sourceB.fatigue ?? 0, t),
      dirtyKit: playerA.dirty_kit || sourceB.dirty_kit,
    };
  }

  render(progress) {
    const pair = this.queue.framePair(progress);
    if (!pair) return;
    const [frameA, frameB, t] = pair;
    const playersB = new Map(frameB.players.map((player) => [player.id, player]));
    frameA.players.forEach((playerA) => {
      const node = this.playerNodes.get(playerA.id);
      if (!node) return;
      const player = this.interpolatePlayer(playerA, playersB.get(playerA.id), t);
      const speed = Math.hypot(player.dx, player.dy);
      node.style.left = `${player.x}%`;
      node.style.top = `${player.y}%`;
      node.style.setProperty("--player-turn", `${Math.round((Math.atan2(player.dy, player.dx || 0.01) * 180) / Math.PI)}deg`);
      node.style.setProperty("--player-scale", player.anim === "SPRINT" ? "1.1" : player.anim === "TACKLE" ? "1.16" : "1");
      node.style.setProperty("--speed-stretch", `${clamp(player.speed / 10, 0, 0.32)}`);
      node.dataset.anim = player.anim;
      node.dataset.lod = speed < 1 && this.mode === "broadcast" ? "low" : "high";
    });

    if (this.ballNode) {
      const ballA = frameA.ball;
      const ballB = frameB.ball;
      const x = visualLerp(ballA.pos[0], ballB.pos[0], t);
      const y = visualLerp(ballA.pos[1], ballB.pos[1], t);
      const z = hermite(ballA.pos[2], ballB.pos[2], ballA.spin[1] ?? 0, ballB.spin[1] ?? 0, t);
      this.ballNode.style.left = `${x}%`;
      this.ballNode.style.top = `${y}%`;
      this.ballNode.style.setProperty("--ball-z", `${clamp(z, 0, 28)}`);
      this.ballNode.title = ballB.state;
    }
  }
}

class ThreeMatchViewer {
  constructor(root, frames, homeId, awayId) {
    this.root = root;
    this.frames = frames;
    this.queue = new VisualizerFrameQueue(frames);
    this.homeId = homeId;
    this.awayId = awayId;
    this.startedAt = performance.now();
    this.duration = Math.max(2, frames.length / MATCH_LOGIC_TICK_RATE / state.matchPlaybackSpeed);
    this.rafId = null;
    this.lastRenderAt = 0;
    this.playerMeshes = new Map();
    this.labelSprites = new Map();
    this.THREE = window.THREE;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.ballMesh = null;
    this.ballTrail = [];
    this.pitchWear = [];
    this.rainParticles = null;
    this.managerMesh = null;
    this.fallbackStadium = null;
    this.externalStadium = null;
    this.externalStadiumLoader = null;
    this.arcadeOverlay = null;
    this.latestEvent = state.lastMatch?.replay?.at(-1) ?? null;
    this.cameraDirector = state.lastMatch?.highlightClips?.at(-1)?.cameraDirector ?? cameraDirectorForEvent(this.latestEvent?.type);
    this.replayUntil = this.latestEvent && ["goal", "save", "shot"].includes(this.latestEvent.type) ? this.startedAt + 3600 : 0;
  }

  start() {
    if (!this.THREE || !this.root || this.frames.length < 2) return false;
    this.setupScene();
    const loop = (now) => {
      if (now - this.lastRenderAt >= 1000 / VISUALIZER_RENDER_FPS) {
        const progress = ((now - this.startedAt) / 1000 / this.duration) % 1;
        this.render(progress);
        this.lastRenderAt = now;
      }
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
    return true;
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.renderer) {
      this.renderer.dispose();
      this.root.querySelectorAll("canvas").forEach((canvas) => canvas.remove());
    }
  }

  fieldX(percent) {
    return (percent - 50) * 1.05;
  }

  fieldZ(percent) {
    return (percent - 50) * 0.68;
  }

  setupScene() {
    const THREE = this.THREE;
    const rect = this.root.getBoundingClientRect();
    const width = Math.max(640, Math.round(rect.width));
    const height = Math.max(360, Math.round(rect.height || width * 0.56));
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x101722);
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 420);
    this.camera.position.set(0, 58, 62);
    this.camera.lookAt(0, 0, 0);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setSize(width, height);
    this.root.appendChild(this.renderer.domElement);

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x304030, 2.2));
    const sun = new THREE.DirectionalLight(0xffffff, 2.1);
    sun.position.set(-28, 50, 34);
    this.scene.add(sun);
    this.addStadium();
    this.loadExternalStadium();

    const turf = new THREE.Group();
    for (let i = 0; i < 10; i += 1) {
      const stripe = new THREE.Mesh(
        new THREE.PlaneGeometry(10.5, 68),
        new THREE.MeshStandardMaterial({ color: i % 2 ? 0x4ca33f : 0x367e36, roughness: 0.94 })
      );
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.x = -47.25 + i * 10.5;
      turf.add(stripe);
    }
    this.scene.add(turf);
    this.addPitchLines();
    this.addGoals();
    this.addPitchFlair();
    this.addTouchlineManager();

    const allPlayers = this.frames.at(-1)?.players ?? [];
    allPlayers.forEach((player) => this.createPlayerMesh(player));
    this.ballMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.62, 24, 16),
      new THREE.MeshStandardMaterial({ color: 0xf8f3dd, roughness: 0.48, metalness: 0.02 })
    );
    this.ballMesh.position.set(0, 1, 0);
    this.scene.add(this.ballMesh);
    this.createBallTrail();
    this.createArcadeOverlay();
  }

  addPitchFlair() {
    const THREE = this.THREE;
    const wearMaterial = new THREE.MeshBasicMaterial({ color: 0x6f5236, transparent: true, opacity: 0.04 });
    [
      [-47, -8], [-47, 0], [-47, 8], [47, -8], [47, 0], [47, 8],
      [-5, -5], [0, 0], [5, 5], [-2, 8], [3, -9],
    ].forEach(([x, z], index) => {
      const patch = new THREE.Mesh(new THREE.CircleGeometry(index < 6 ? 3.1 : 2.4, 18), wearMaterial.clone());
      patch.rotation.x = -Math.PI / 2;
      patch.position.set(x, 0.042, z);
      this.scene.add(patch);
      this.pitchWear.push(patch);
    });
    const drops = new Float32Array(150 * 3);
    for (let index = 0; index < drops.length; index += 3) {
      drops[index] = rand(-54, 54);
      drops[index + 1] = rand(1, 30);
      drops[index + 2] = rand(-35, 35);
    }
    const rainGeometry = new THREE.BufferGeometry();
    rainGeometry.setAttribute("position", new THREE.BufferAttribute(drops, 3));
    this.rainParticles = new THREE.Points(
      rainGeometry,
      new THREE.PointsMaterial({ color: 0xb8dcff, size: 0.16, transparent: true, opacity: 0.58 })
    );
    this.rainParticles.visible = false;
    this.scene.add(this.rainParticles);
  }

  addTouchlineManager() {
    const THREE = this.THREE;
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.78, 2.1, 4, 10),
      new THREE.MeshStandardMaterial({ color: 0x12151c, roughness: 0.42 })
    );
    body.position.y = 1.65;
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 14, 10),
      new THREE.MeshStandardMaterial({ color: 0xe8bd98, roughness: 0.58 })
    );
    head.position.y = 3.2;
    group.add(body, head);
    group.position.set(-10, 0, -38);
    this.scene.add(group);
    this.managerMesh = group;
  }

  updatePitchFlair(frame, now) {
    const minute = frame?.minute ?? 0;
    const wet = state.lastMatch?.weather === "rain" || state.lastMatch?.environment?.pitchKey === "wet";
    this.pitchWear.forEach((patch, index) => {
      patch.material.opacity = clamp(0.025 + minute / 780 + (index < 6 ? minute / 1100 : minute / 1500), 0.025, 0.23);
    });
    if (this.rainParticles) {
      this.rainParticles.visible = wet;
      if (wet) {
        const points = this.rainParticles.geometry.attributes.position;
        for (let index = 1; index < points.array.length; index += 3) {
          points.array[index] = points.array[index] < 0.4 ? rand(18, 30) : points.array[index] - 0.62;
        }
        points.needsUpdate = true;
      }
    }
    if (this.managerMesh) {
      const shoutActive = Boolean(state.touchlineShout);
      const goalReaction = this.latestEvent?.type === "goal" && now < this.replayUntil;
      this.managerMesh.rotation.z = shoutActive ? Math.sin(now / 120) * 0.08 : 0;
      this.managerMesh.position.y = goalReaction ? Math.max(0, Math.sin(now / 100) * 0.8) : 0;
      this.managerMesh.position.x = shoutActive ? -10 + Math.sin(now / 180) * 2.2 : -10;
    }
  }

  applyPlayerAnimation(mesh, player, now) {
    const legs = mesh.userData.legs ?? [];
    const arms = mesh.userData.arms ?? [];
    const body = mesh.userData.body;
    const phase = Math.sin(now / (player.anim === "SPRINT" ? 82 : 118) + player.id);
    const movement = clamp(player.speed / 5, 0, 1.1);
    mesh.rotation.z = 0;
    mesh.position.y = 0;
    mesh.scale.set(1, 1, 1);
    legs.forEach((leg, index) => {
      leg.rotation.x = (index ? -1 : 1) * phase * movement;
      leg.rotation.z = 0;
    });
    arms.forEach((arm, index) => {
      arm.rotation.x = (index ? 1 : -1) * phase * movement * 0.72;
      arm.rotation.z = index ? -0.18 : 0.18;
    });
    if (player.anim === "SPRINT") mesh.scale.set(1, 1.12, 1);
    if (player.anim === "JOCKEY") {
      mesh.scale.set(1.12, 0.92, 1);
      arms.forEach((arm, index) => { arm.rotation.z = index ? -0.72 : 0.72; });
    }
    if (player.anim === "TACKLE") {
      mesh.scale.set(1.22, 0.72, 1.28);
      mesh.rotation.z = -0.72;
    }
    if (player.anim === "GK_READY") {
      mesh.scale.set(1.12, 0.88, 1);
      arms.forEach((arm, index) => { arm.rotation.z = index ? -0.9 : 0.9; });
    }
    if (player.anim === "GK_DISTRIBUTE") {
      mesh.scale.set(1, 1.04, 1);
      arms.forEach((arm, index) => { arm.rotation.z = index ? -1.15 : 0.42; });
    }
    if (player.anim === "GK_DIVE") {
      mesh.scale.set(1.22, 0.7, 1);
      mesh.rotation.z = phase > 0 ? 1.05 : -1.05;
      mesh.position.y = 0.8;
      arms.forEach((arm) => { arm.rotation.z = -1.25; });
    }
    if (player.anim === "CELEBRATE") {
      mesh.position.y = Math.max(0, phase * 0.55);
      arms.forEach((arm, index) => { arm.rotation.z = index ? -1.65 : 1.65; });
    }
    if (player.anim === "MISS_REACTION") {
      arms.forEach((arm, index) => { arm.rotation.z = index ? -2.45 : 2.45; });
    }
    if (player.anim === "CALL_FOR_BALL") {
      arms.forEach((arm, index) => { arm.rotation.z = index ? -1.45 : 0.34; });
    }
    if (player.anim === "DECELERATE") {
      mesh.rotation.z = -0.2;
      mesh.scale.set(1.08, 0.96, 1);
      legs.forEach((leg, index) => { leg.rotation.z = index ? -0.24 : 0.24; });
    }
    if (player.anim === "INJURED") {
      mesh.rotation.z = 1.25;
      mesh.scale.set(1.18, 0.62, 1.15);
    }
    if (body) {
      const sweat = clamp((100 - player.condition + player.fatigue * 0.45) / 120, 0, 0.72);
      body.material.roughness = clamp(0.58 - sweat * 0.3, 0.24, 0.58);
      body.material.color.copy(mesh.userData.baseColor).lerp(new this.THREE.Color(0x594c35), player.dirtyKit ? 0.34 : 0);
    }
  }

  addLine(points, color = 0xf2f7e9) {
    const THREE = this.THREE;
    const geometry = new THREE.BufferGeometry().setFromPoints(points.map(([x, z]) => new THREE.Vector3(x, 0.035, z)));
    this.scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color })));
  }

  addPitchLines() {
    const THREE = this.THREE;
    this.addLine([[-52.5, -34], [52.5, -34], [52.5, 34], [-52.5, 34], [-52.5, -34]]);
    this.addLine([[0, -34], [0, 34]]);
    this.addLine([[-52.5, -20], [-36, -20], [-36, 20], [-52.5, 20]]);
    this.addLine([[52.5, -20], [36, -20], [36, 20], [52.5, 20]]);
    this.addLine([[-52.5, -9], [-46, -9], [-46, 9], [-52.5, 9]]);
    this.addLine([[52.5, -9], [46, -9], [46, 9], [52.5, 9]]);
    const circle = new THREE.EllipseCurve(0, 0, 9.15, 9.15, 0, Math.PI * 2).getPoints(72).map((point) => [point.x, point.y]);
    this.addLine(circle);
    [-40, 40].forEach((x) => {
      const spot = new THREE.Mesh(new THREE.CircleGeometry(0.34, 16), new THREE.MeshBasicMaterial({ color: 0xf2f7e9 }));
      spot.rotation.x = -Math.PI / 2;
      spot.position.set(x, 0.04, 0);
      this.scene.add(spot);
    });
  }

  addGoals() {
    const THREE = this.THREE;
    [-54, 54].forEach((x) => {
      const goal = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 2.2, 11),
        new THREE.MeshStandardMaterial({ color: 0xdfe6ef, transparent: true, opacity: 0.82 })
      );
      goal.position.set(x, 1.1, 0);
      this.scene.add(goal);
    });
  }

  addStadium() {
    const THREE = this.THREE;
    this.root.dataset.stadium = "fallback-ready";
    const stadium = new THREE.Group();
    const standMaterial = new THREE.MeshStandardMaterial({ color: 0x20263a, roughness: 0.82 });
    [
      { x: 0, z: -45, w: 128, d: 8 },
      { x: 0, z: 45, w: 128, d: 8 },
      { x: -64, z: 0, w: 8, d: 82 },
      { x: 64, z: 0, w: 8, d: 82 },
    ].forEach((stand) => {
      const base = new THREE.Mesh(new THREE.BoxGeometry(stand.w, 4.5, stand.d), standMaterial);
      base.position.set(stand.x, 2, stand.z);
      stadium.add(base);
    });
    const crowdColors = [0xf3f5ff, 0xffd166, 0xef476f, 0x06d6a0, 0x5da9ff, 0xffffff];
    const crowdGeometry = new THREE.BoxGeometry(0.75, 1.05, 0.75);
    for (let i = 0; i < 180; i += 1) {
      const side = i % 4;
      const mat = new THREE.MeshStandardMaterial({ color: crowdColors[i % crowdColors.length], roughness: 0.7 });
      const fan = new THREE.Mesh(crowdGeometry, mat);
      if (side < 2) {
        fan.position.set(rand(-58, 58), 5 + rand(0, 3), side === 0 ? rand(-50, -42) : rand(42, 50));
      } else {
        fan.position.set(side === 2 ? rand(-69, -61) : rand(61, 69), 5 + rand(0, 3), rand(-36, 36));
      }
      fan.rotation.y = rand(-20, 20) / 10;
      stadium.add(fan);
    }
    this.scene.add(stadium);
    this.fallbackStadium = stadium;
  }

  loadExternalStadium() {
    this.root.dataset.stadium = "procedural";
  }

  createBallTrail() {
    const THREE = this.THREE;
    for (let i = 0; i < 12; i += 1) {
      const trail = new THREE.Mesh(
        new THREE.SphereGeometry(0.34 - i * 0.014, 12, 8),
        new THREE.MeshBasicMaterial({ color: 0xfff2a6, transparent: true, opacity: 0.2 - i * 0.012 })
      );
      trail.visible = false;
      this.scene.add(trail);
      this.ballTrail.push(trail);
    }
  }

  createArcadeOverlay() {
    const THREE = this.THREE;
    const match = state.lastMatch;
    const home = teamById(match?.homeId ?? this.homeId);
    const away = teamById(match?.awayId ?? this.awayId);
    const score = match ? visibleMatchScore(match) : { home: 0, away: 0 };
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 192;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(10, 5, 22, 0.78)";
    ctx.fillRect(0, 0, 1024, 192);
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 54px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${teamInitials(home.name)}  ${score.home} - ${score.away}  ${teamInitials(away.name)}`, 512, 82);
    ctx.font = "800 24px system-ui, sans-serif";
    ctx.fillStyle = "#ffd166";
    const eventText = this.latestEvent ? `${this.latestEvent.minute}' ${this.latestEvent.type.toUpperCase()} - ${this.latestEvent.player ?? this.latestEvent.teamName ?? ""}` : "TACTIC FOOTBALL 25";
    ctx.fillText(eventText, 512, 128);
    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
    sprite.scale.set(40, 7.5, 1);
    sprite.position.set(0, 18, -32);
    this.scene.add(sprite);
    this.arcadeOverlay = sprite;
  }

  createNumberSprite(text) {
    const THREE = this.THREE;
    const canvas = document.createElement("canvas");
    canvas.width = 96;
    canvas.height = 96;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(6, 10, 18, 0.72)";
    ctx.beginPath();
    ctx.arc(48, 48, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 38px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(text), 48, 50);
    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
    sprite.scale.set(3.2, 3.2, 1);
    return sprite;
  }

  createPlayerMesh(player) {
    const THREE = this.THREE;
    const playerRecord = state.players.find((candidate) => candidate.id === player.id);
    const isKeeper = player.role === "GK" || playerRecord?.role === "GK";
    const teamColor = isKeeper ? 0x46a85b : player.team === "HOME" ? 0xd52d3a : 0x2d65d5;
    const group = new THREE.Group();
    const leftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 1.1, 0.28),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.62 })
    );
    const rightLeg = leftLeg.clone();
    leftLeg.position.set(-0.32, 0.62, 0);
    rightLeg.position.set(0.32, 0.62, 0);
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.8, 1.9, 4, 10),
      new THREE.MeshStandardMaterial({ color: teamColor, roughness: 0.54 })
    );
    body.position.y = 1.55;
    const leftArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 1.25, 0.24),
      new THREE.MeshStandardMaterial({ color: teamColor, roughness: 0.54 })
    );
    const rightArm = leftArm.clone();
    leftArm.position.set(-0.92, 1.82, 0);
    rightArm.position.set(0.92, 1.82, 0);
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 16, 12),
      new THREE.MeshStandardMaterial({ color: 0xf0c9a5, roughness: 0.6 })
    );
    head.position.y = 3.05;
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.2, 20),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.02;
    group.add(shadow, leftLeg, rightLeg, leftArm, rightArm, body, head);
    const number = this.createNumberSprite(shirtNo(playerRecord, 0));
    number.position.y = 4.15;
    group.add(number);
    group.userData.legs = [leftLeg, rightLeg];
    group.userData.arms = [leftArm, rightArm];
    group.userData.body = body;
    group.userData.baseColor = new THREE.Color(teamColor);
    this.scene.add(group);
    this.playerMeshes.set(player.id, group);
    this.labelSprites.set(player.id, number);
  }

  interpolatePlayer(playerA, playerB, t) {
    const sourceB = playerB ?? playerA;
    return {
      id: playerA.id,
      x: visualLerp(playerA.pos[0], sourceB.pos[0], t),
      y: visualLerp(playerA.pos[1], sourceB.pos[1], t),
      dx: visualLerp(playerA.dir[0], sourceB.dir[0], t),
      dy: visualLerp(playerA.dir[1], sourceB.dir[1], t),
      speed: visualLerp(playerA.speed ?? 0, sourceB.speed ?? 0, t),
      anim: (sourceB.speed ?? 0) - (playerA.speed ?? 0) < -1.2 ? "DECELERATE" : t < 0.5 ? playerA.anim_state : sourceB.anim_state,
      role: playerA.role,
      team: playerA.team,
      condition: visualLerp(playerA.condition ?? 100, sourceB.condition ?? 100, t),
      fatigue: visualLerp(playerA.fatigue ?? 0, sourceB.fatigue ?? 0, t),
      dirtyKit: playerA.dirty_kit || sourceB.dirty_kit,
    };
  }

  render(progress) {
    const pair = this.queue.framePair(progress);
    if (!pair) return;
    const [frameA, frameB, t] = pair;
    const playersB = new Map(frameB.players.map((player) => [player.id, player]));
    frameA.players.forEach((playerA) => {
      const player = this.interpolatePlayer(playerA, playersB.get(playerA.id), t);
      const mesh = this.playerMeshes.get(player.id);
      if (!mesh) return;
      mesh.position.set(this.fieldX(player.x), 0, this.fieldZ(player.y));
      mesh.rotation.y = -Math.atan2(player.dy, player.dx || 0.01) + Math.PI / 2;
      this.applyPlayerAnimation(mesh, player, performance.now());
      const label = this.labelSprites.get(player.id);
      if (label) label.lookAt(this.camera.position);
    });

    const x = visualLerp(frameA.ball.pos[0], frameB.ball.pos[0], t);
    const y = visualLerp(frameA.ball.pos[1], frameB.ball.pos[1], t);
    const z = hermite(frameA.ball.pos[2], frameB.ball.pos[2], frameA.ball.spin[1] ?? 0, frameB.ball.spin[1] ?? 0, t);
    this.ballMesh.position.set(this.fieldX(x), 0.72 + z * 0.16, this.fieldZ(y));
    this.ballMesh.rotation.x += 0.04 + Math.abs(frameB.ball.spin[0] ?? 0) * 0.002;
    this.ballMesh.rotation.z += (frameB.ball.spin[0] ?? 0) * 0.0015;
    const ballSpeed = Math.hypot(frameB.ball.pos[0] - frameA.ball.pos[0], frameB.ball.pos[1] - frameA.ball.pos[1]);
    this.ballTrail.forEach((trail, index) => {
      const lag = Math.min(this.frames.length - 1, index + 1);
      const sample = this.frames[Math.max(0, Math.floor(progress * (this.frames.length - 1)) - lag)];
      if (!sample) return;
      trail.visible = ballSpeed > 0.9;
      trail.position.set(this.fieldX(sample.ball.pos[0]), 0.68 + sample.ball.pos[2] * 0.16, this.fieldZ(sample.ball.pos[1]));
      trail.material.opacity = Math.max(0.03, 0.2 - index * 0.014);
    });
    this.updatePitchFlair(frameB, performance.now());

    const replayActive = performance.now() < this.replayUntil;
    const goalBehind = replayActive && this.cameraDirector.includes("goal-behind");
    const dramaCloseup = replayActive && this.cameraDirector.includes("eye-level-drama");
    const targetCamY = goalBehind ? 12 : dramaCloseup ? 8 : replayActive ? 24 : 58;
    const targetCamZ = goalBehind
      ? this.fieldZ(y)
      : dramaCloseup
        ? this.fieldZ(y) + 10
        : replayActive
          ? this.fieldZ(y) + (frameB.ball.pos[0] > 50 ? 22 : -22)
          : 58 + this.fieldZ(y) * 0.1;
    const targetCamX = goalBehind
      ? this.fieldX(frameB.ball.pos[0] > 50 ? 98 : 2)
      : replayActive
        ? this.fieldX(x) - (frameB.ball.pos[0] > 50 ? 18 : -18)
        : this.fieldX(x) * 0.18;
    this.camera.position.x = visualLerp(this.camera.position.x, targetCamX, replayActive ? 0.08 : 0.04);
    this.camera.position.y = visualLerp(this.camera.position.y, targetCamY, 0.05);
    this.camera.position.z = visualLerp(this.camera.position.z, targetCamZ, replayActive ? 0.08 : 0.04);
    this.camera.lookAt(this.fieldX(x) * (replayActive ? 0.82 : 0.28), replayActive ? 1.6 : 0, this.fieldZ(y) * (replayActive ? 0.82 : 0.28));
    if (this.arcadeOverlay) this.arcadeOverlay.lookAt(this.camera.position);
    this.renderer.render(this.scene, this.camera);
  }
}

function initializeMatchVisualizer() {
  if (activeMatchVisualizer) {
    activeMatchVisualizer.stop();
    activeMatchVisualizer = null;
  }
  if (activeThreeMatchViewer) {
    activeThreeMatchViewer.stop();
    activeThreeMatchViewer = null;
  }
  if (state.activeView !== "match" || !state.lastMatch) return;
  const root = document.querySelector(".match-viewer-shell");
  const frames = buildMatchStateFrames(state.lastMatch);
  if (!root || frames.length < 2 || state.viewerMode === "commentary") return;
  root.dataset.pipeline = `producer-consumer:${frames.length}`;
  if (state.viewerMode === "broadcast") {
    const threeRoot = root.querySelector("[data-three-match-viewer]");
    if (threeRoot && window.THREE) {
      activeThreeMatchViewer = new ThreeMatchViewer(threeRoot, frames, state.lastMatch.homeId, state.lastMatch.awayId);
      if (activeThreeMatchViewer.start()) {
        root.classList.add("three-active");
        return;
      }
    }
  }
  activeMatchVisualizer = new MatchVisualizer(root, frames, state.viewerMode);
  activeMatchVisualizer.start();
}

function renderLineupCard(teamId, side = "home") {
  const team = teamById(teamId);
  const tactic = teamId === state.userTeamId ? state.tactics : team?.tactics ?? {};
  const eleven = firstEleven(teamId);
  const rating = Math.round(
    average([
      teamPhaseRating(teamId, "attack", tactic),
      teamPhaseRating(teamId, "midfield", tactic),
      teamPhaseRating(teamId, "defense", tactic),
    ])
  );
  return `<section class="pre-lineup-card ${side}">
    <header>
      <div>${teamCrest(team, "md")}<h3>${team.name}</h3></div>
      <span>${normalizeTactics(tactic).formation} | ${label(normalizeTactics(tactic).mentality)} | rating ${rating}</span>
    </header>
    <ol>
      ${eleven.map((player) => `<li>
        <b>${shirtNo(player)}</b>
        <span>${player.name}</span>
        <em>${player.role}</em>
        <small>${player.condition}% | S${playerStaminaScore(player)} | F${player.fatigue ?? 0} | ${playerStatus(player).label}</small>
      </li>`).join("")}
    </ol>
  </section>`;
}

function renderPreMatchPreparation(homeId, awayId, nextMatch) {
  const advice = assistantTacticalAdvice();
  return `<section class="pre-match-gate ${state.preMatchConfirmed ? "confirmed" : ""}">
    <div class="panel-header compact">
      <div>
        <p class="eyebrow">Pre-match preparation required</p>
        <h3>${nextMatch ? `${nextMatch.date} ${nextMatch.kickoff}` : "Scheduled fixture"}</h3>
      </div>
      <button onclick="confirmPreMatchPlan()" type="button">${state.preMatchConfirmed ? "Plan Confirmed" : "Confirm Squad + Tactics"}</button>
    </div>
    <div class="pre-match-actions">
      <button onclick="state.activeView='squad'; render();" type="button">Review Squad</button>
      <button onclick="state.activeView='tactics'; render();" type="button">Review Tactics</button>
      <button onclick="applyCoachAutoLineup()" type="button">Coach Auto XI</button>
      <button onclick="applyAssistantTactics()" type="button">Staff Tactical Advice</button>
    </div>
    <div class="staff-advice-card tactics-advice">
      <div>
        <p class="eyebrow">Assistant report</p>
        <h3>${advice.assistant.name}: ${advice.recommendation.mentality} plan vs ${teamById(awayId).name}</h3>
        <span>Suggested press ${advice.recommendation.pressing}, tempo ${advice.recommendation.tempo}, width ${advice.recommendation.width}, line ${advice.recommendation.line}. XI condition ${advice.avgCondition}% | stamina ${advice.avgStamina} | fatigue ${advice.avgFatigue}</span>
      </div>
    </div>
    <div class="pre-lineup-grid">
      ${renderLineupCard(homeId, "home")}
      ${renderLineupCard(awayId, "away")}
    </div>
  </section>`;
}

function renderPostMatchSummaryPanel() {
  const summary = state.postMatchSummary;
  if (!summary) return "";
  const home = teamById(summary.homeId);
  const away = teamById(summary.awayId);
  const motmTeam = summary.manOfTheMatch ? teamById(summary.manOfTheMatch.teamId) : null;
  return `<section class="post-match-summary">
    <div class="panel-header compact">
      <div>
        <p class="eyebrow">Full-time report</p>
        <h3>${home.name} ${summary.score.home}-${summary.score.away} ${away.name}</h3>
      </div>
      <button onclick="openNextMatchPrep()" type="button">Next Match Prep</button>
    </div>
    <div class="post-summary-grid">
      <article><span>Shots</span><strong>${summary.stats.home.shots} - ${summary.stats.away.shots}</strong></article>
      <article><span>On Target</span><strong>${summary.stats.home.onTarget} - ${summary.stats.away.onTarget}</strong></article>
      <article><span>xG</span><strong>${summary.stats.home.xg} - ${summary.stats.away.xg}</strong></article>
      <article><span>Possession</span><strong>${summary.stats.home.possession}% - ${summary.stats.away.possession}%</strong></article>
    </div>
    ${summary.manOfTheMatch ? `<article class="motm-card">
      ${teamCrest(motmTeam, "md")}
      <div><span>Man of the Match</span><strong>${summary.manOfTheMatch.name}</strong><small>${summary.manOfTheMatch.role} | Rating ${summary.manOfTheMatch.rating}</small></div>
    </article>` : ""}
    <ol class="timeline">${summary.events.map((event) => `<li>${event}</li>`).join("")}</ol>
  </section>`;
}

function matchHighlightsForLevel(match) {
  if (!match) return [];
  const available = state.matchdayPhase === "half"
    ? match.highlights.filter((event) => event.minute <= 45)
    : match.highlights;
  if (state.highlightLevel === "key") return available.filter((event) => ["goal", "injury"].includes(event.type)).slice(-5);
  return available.slice(state.highlightLevel === "full" ? -18 : -8);
}

function renderMatchSpecialStates(match) {
  const states = match?.specialStates?.slice(-4).reverse() ?? [];
  if (!states.length) return "";
  return `<section class="match-special-strip">
    ${states.map((item) => `<article class="${item.type}">
      <strong>${label(item.type)}</strong>
      <span>${item.text}</span>
      ${item.delaySeconds ? `<small>Review delay ${item.delaySeconds}s</small>` : ""}
    </article>`).join("")}
  </section>`;
}

function renderMatchArea() {
  const nextMatch = nextUserFixture();
  const match = state.matchdayPhase === "half" ? state.lastMatch : null;
  const selectedOpponentId = nextMatch?.fixture.find((teamId) => teamId !== state.userTeamId) ?? state.selectedOpponentId;
  const homeId = match?.homeId ?? nextMatch?.homeId ?? state.userTeamId;
  const awayId = match?.awayId ?? nextMatch?.awayId ?? selectedOpponentId;
  const home = teamById(homeId);
  const away = teamById(awayId);
  const highlights = matchHighlightsForLevel(match);
  const latest = highlights.at(-1);
  const tickState = match?.tickState ?? null;
  const liveBall = tickState?.ball ?? latest ?? null;
  const visibleScore = match ? visibleMatchScore(match) : null;
  const visibleEvents = visibleMatchEvents(match);
  const visibleReplay = visibleMatchReplay(match);
  const playLabel = state.matchdayPhase === "half" ? "Play Second Half" : "Play Match";
  const phaseLabel = state.matchdayPhase === "half" ? "Half Time" : state.matchdayPhase === "full" ? "Full Time" : "Pre-match";
  const stats = match
    ? `${match.stats.home.shots} shots, ${match.stats.home.onTarget} on target | xG ${match.stats.home.xg.toFixed(2)}`
    : "Waiting for simulation";
  const awayStats = match
    ? `${match.stats.away.shots} shots, ${match.stats.away.onTarget} on target | xG ${match.stats.away.xg.toFixed(2)}`
    : "Waiting for simulation";
  const seasonControl = state.seasonComplete
    ? `<button onclick="startNextSeason()" type="button">Start Next Season</button>`
    : `<button onclick="simulateWeek()" type="button">Skip Week</button>`;
  const canPlay = state.matchdayPhase === "half" || state.preMatchConfirmed;
  const kickoffHint = state.postMatchSummary ? "Next Match Prep" : canPlay ? playLabel : "Confirm Plan First";
  const kickoffAction = state.postMatchSummary ? "openNextMatchPrep()" : "simulateSelectedMatch()";

  return `<div class="panel-header">
    <div><p class="eyebrow">Play Match path</p><h2 class="crest-heading">${teamCrest(home, "md")}${home.name} vs ${teamCrest(away, "md")}${away.name}</h2></div>
    <div class="button-row"><button onclick="${kickoffAction}" type="button">${kickoffHint}</button><button onclick="state.activeView='tactics'; render();" type="button">Tactics</button><button onclick="state.activeView='engine'; render();" type="button">Engine</button>${seasonControl}</div>
  </div>
  ${renderPostMatchSummaryPanel()}
  <div class="match-selectors single-purpose">
    <label>Scheduled Fixture
      <select aria-label="Scheduled fixture" disabled>
        <option>${nextMatch ? `${nextMatch.date} ${nextMatch.kickoff} - ${teamById(nextMatch.homeId).name} vs ${teamById(nextMatch.awayId).name}` : "No next fixture"}</option>
      </select>
    </label>
    <article><span>Match Phase</span><strong>${phaseLabel}</strong></article>
    <article><span>Calendar</span><strong>${state.seasonComplete ? "Season complete" : nextMatch ? `${nextMatch.date} | Week ${state.week}/${state.fixtures.length}` : "Season done"}</strong></article>
  </div>
  ${state.matchdayPhase !== "half" && !state.postMatchSummary ? renderPreMatchPreparation(homeId, awayId, nextMatch) : ""}
  ${renderTeamTalkPanel()}
  ${renderBroadcastControls(match)}
  ${renderQuickTacticsBar(match)}
  ${renderMatchDecisionOverlay()}
  <div class="match-score-strip">
    <strong>${teamCrest(home, "md")}<span>${home.name}</span></strong>
    <span>${match ? `${visibleScore.home} - ${visibleScore.away}` : "Next"}</span>
    <strong>${teamCrest(away, "md")}<span>${away.name}</span></strong>
  </div>
  <div class="match-viewer-shell ${state.viewerMode === "broadcast" ? "broadcast-mode" : state.viewerMode === "commentary" ? "commentary-mode" : "classic-mode"}">
    ${renderMatchSquadStatus()}
    <div class="match-broadcast-stage">
      ${renderMatchClock(match, visibleScore ?? { home: 0, away: 0 }, home, away, phaseLabel)}
      ${state.viewerMode === "commentary" ? renderTextMatchViewport(match) : `<div class="match-pitch ${state.viewerMode === "broadcast" ? "pitch-3d" : "pitch-2d"}" aria-label="Top-down football pitch simulation">
        ${state.viewerMode === "broadcast" ? `<div class="three-match-viewer" data-three-match-viewer><span>Loading 3D match viewer...</span></div>` : ""}
        <div class="pitch-camera-label">${state.viewerMode === "broadcast" ? "Main Stand Cam" : "Tactical 2D"}</div>
        <div class="pitch-line halfway"></div>
        <div class="pitch-line center-circle"></div>
        <div class="pitch-line home-box"></div>
        <div class="pitch-line away-box"></div>
        <div class="pitch-line home-six"></div>
        <div class="pitch-line away-six"></div>
        <div class="pitch-line home-arc"></div>
        <div class="pitch-line away-arc"></div>
        <div class="pitch-spot home-spot"></div>
        <div class="pitch-spot away-spot"></div>
        ${renderViewerTrail(match)}
        ${renderPitchPlayers(homeId, "home", tickState?.players?.home)}
        ${renderPitchPlayers(awayId, "away", tickState?.players?.away)}
        ${highlights
          .map((event) => `<span class="pitch-event ${event.type}" style="left:${event.x}%;top:${event.y}%" title="${event.text}"></span>`)
          .join("")}
        ${liveBall ? `<span class="ball-marker live" data-visual-ball="true" style="left:${liveBall.x}%;top:${liveBall.y}%" title="${liveBall.state ?? "Ball"}"></span>` : ""}
      </div>`}
      ${renderTickTimeline(match)}
    </div>
    ${renderLiveMatchSidebar(match, home, away)}
  </div>
  ${renderCommentaryBar(match)}
  ${renderMatchSpecialStates(match)}
  ${renderEngineTelemetry(match)}
  ${renderHighlightGallery(4)}
  <div class="match-meta-grid">
    <article><span class="meta-team">${teamCrest(home, "sm")}${home.name}</span><strong>${stats}</strong></article>
    <article><span>Weather</span><strong>${match ? `${match.weather}: ${WEATHER[match.weather].notes}` : "Generated at kickoff"}</strong></article>
    <article><span class="meta-team">${teamCrest(away, "sm")}${away.name}</span><strong>${awayStats}</strong></article>
  </div>
  <ol class="timeline">
    ${(visibleEvents.length ? visibleEvents.slice(-10).reverse() : ["No match simulated yet. Press Play Match to create live events."])
      .map((event) => `<li>${event}</li>`)
      .join("")}
  </ol>
  ${state.matchdayPhase === "half" && visibleReplay.length ? `<div class="engine-notes"><p>Half-time reached. Adjust team talk, then press Play Second Half to finish the match.</p></div>` : ""}`;
}

function renderEventVisual(event) {
  const x = event.x ?? 50;
  const y = event.y ?? 50;
  const attackingLeft = event.side === "away";
  const goalX = attackingLeft ? 5 : 95;
  const keeperX = attackingLeft ? 9 : 91;
  const supportX = clamp(x + (attackingLeft ? 12 : -12), 12, 88);
  const supportY = clamp(y - 12, 16, 84);
  const defenderX = clamp(x + (attackingLeft ? -10 : 10), 10, 90);
  const defenderY = clamp(y + 10, 16, 84);
  return `<div class="event-visual ${event.type}" style="--ball-start-x:${supportX}%;--ball-start-y:${supportY}%;--ball-end-x:${x}%;--ball-end-y:${y}%;--goal-x:${goalX}%;--keeper-x:${keeperX}%;" aria-label="${event.type} event image">
    <div class="visual-line halfway"></div>
    <div class="visual-line box-left"></div>
    <div class="visual-line box-right"></div>
    <span class="visual-goal" style="left:${goalX}%;top:50%"></span>
    <span class="visual-player attacker" style="left:${supportX}%;top:${supportY}%"></span>
    <span class="visual-player defender" style="left:${defenderX}%;top:${defenderY}%"></span>
    <span class="visual-player keeper" style="left:${keeperX}%;top:50%"></span>
    <span class="visual-ball"></span>
    <span class="visual-trail"></span>
    <span class="visual-flash"></span>
  </div>`;
}

function renderHighlightGallery(limit = 6) {
  const replay = state.lastMatch?.replay ?? [];
  const cards = replay.slice(-limit).reverse();
  if (!cards.length) return "";
  return `<section class="highlight-gallery">
    <div class="panel-header compact">
      <div><p class="eyebrow">ภาพเหตุการณ์</p><h3>Match Images</h3></div>
      <button onclick="state.activeView='replay'; render();" type="button">View All</button>
    </div>
    <div class="highlight-grid">
      ${cards.map((event) => `<article class="highlight-card ${event.type}">
        ${renderEventVisual(event)}
        <div><strong>${event.minute}' ${event.type}</strong><p>${event.text}</p></div>
      </article>`).join("")}
    </div>
  </section>`;
}

function renderReplayPanel(limit = 12) {
  const replay = state.lastMatch?.replay ?? [];
  return `<section class="replay-panel">
    <div class="panel-header compact">
      <div><p class="eyebrow">Match replay</p><h3>Key Moments</h3></div>
      <button onclick="state.activeView='replay'; render();" type="button">Open Replay</button>
    </div>
    <div class="replay-list">
      ${(replay.length ? replay.slice(-limit).reverse() : [{ minute: "-", type: "waiting", text: "Simulate a match to create replay events." }])
        .map((event) => `<article class="replay-card ${event.type}">
          ${renderEventVisual(event)}
          <strong>${event.minute}'</strong>
          <div><span>${event.type}</span><p>${event.text}</p></div>
        </article>`)
        .join("")}
    </div>
  </section>`;
}

function renderReplay() {
  const match = state.lastMatch;
  if (!match) {
    return `<div class="panel-header"><div><p class="eyebrow">Replay</p><h2>No Match Replay Yet</h2></div></div>
      <div class="engine-notes"><p>Simulate a selected match or league week to generate replay events.</p></div>`;
  }
  const home = teamById(match.homeId);
  const away = teamById(match.awayId);
  return `<div class="panel-header">
    <div><p class="eyebrow">Replay center</p><h2 class="crest-heading">${teamCrest(home, "md")}${home.name} ${match.score.home}-${match.score.away} ${teamCrest(away, "md")}${away.name}</h2></div>
    <button onclick="simulateSelectedMatch()" type="button">Replay New Match</button>
  </div>
  <div class="replay-summary">
    <article><span>${home.name}</span><strong>${match.stats.home.shots} shots | ${match.stats.home.onTarget} on target | xG ${match.stats.home.xg.toFixed(2)}</strong></article>
    <article><span>${away.name}</span><strong>${match.stats.away.shots} shots | ${match.stats.away.onTarget} on target | xG ${match.stats.away.xg.toFixed(2)}</strong></article>
    <article><span>Highlight Buffer</span><strong>${match.highlightClips?.length ?? 0} clips</strong></article>
  </div>
  ${renderEngineTelemetry(match)}
  ${renderReplayPanel(99)}`;
}

function renderPlayerStats() {
  const rows = [...state.players]
    .filter((player) => player.teamId)
    .sort((a, b) => b.stats.goals - a.stats.goals || b.stats.assists - a.stats.assists || b.stats.appearances - a.stats.appearances)
    .slice(0, 80)
    .map((player, index) => {
      const team = teamById(player.teamId);
      return `<tr>
        <td>${index + 1}</td>
        <td><strong>${player.name}</strong><small>${player.role}</small></td>
        <td><span class="table-club">${teamCrest(team, "sm")}${team.name}</span></td>
        <td>${player.stats.appearances}</td>
        <td>${player.stats.goals}</td>
        <td>${player.stats.assists}</td>
        <td>${player.stats.shots}</td>
        <td>${player.stats.keyPasses}</td>
      </tr>`;
    })
    .join("");
  return `<div class="panel-header"><div><p class="eyebrow">Player production</p><h2>Goals and Assists</h2></div></div>
  <table>
    <thead><tr><th>#</th><th>Player</th><th>Club</th><th>Apps</th><th>Goals</th><th>Assists</th><th>Shots</th><th>Key Passes</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function renderInbox() {
  const injured = playersForTeam(state.userTeamId).filter((player) => player.injuredWeeks > 0);
  const tired = playersForTeam(state.userTeamId)
    .filter((player) => !player.injuredWeeks && ((player.fatigue ?? 0) >= 60 || player.condition < 68))
    .slice(0, 5);
  const transferUpdates = state.transferNews.slice(0, 4);
  const lifeEvents = state.lifeEvents.filter((event) => !event.resolved);
  const dialogueEvents = state.dialogueQueue.slice(0, 5);
  const actionLabels = {
    grantLeave: "Grant Leave",
    refuseLeave: "Refuse",
    warning: "Formal Warning",
    privateTalk: "Private Talk",
    fineOneWeek: "Fine 1 Week",
    fineTwoWeeks: "Fine 2 Weeks",
    acceptAgentDemand: "Accept Demand",
    negotiateAgent: "Negotiate",
    refuseAgent: "Refuse",
  };
  return `<div class="panel-header">
    <div><p class="eyebrow">Inbox path</p><h2>Manager Inbox</h2></div>
    <button onclick="state.activeView='menu'; render();" type="button">Back To Menu</button>
  </div>
  <section class="inbox-actions">
    ${state.activeDialogue ? (() => {
      const player = state.players.find((candidate) => candidate.id === state.activeDialogue.playerId);
      const node = activeDialogueNode();
      return player && node ? `<article class="inbox-card urgent dialogue-card"><div><p class="eyebrow">Player Interaction | ${node.trigger}</p><h3>${player.name}: ${node.title}</h3><span>${node.openingLine}</span></div><div><button onclick="render()" type="button">Continue Conversation</button><button onclick="closeDialogue()" type="button">Delay</button></div></article>` : "";
    })() : ""}
    ${dialogueEvents.map((event) => {
      const player = state.players.find((candidate) => candidate.id === event.playerId);
      const node = DIALOGUE_DATABASE[event.dialogueId];
      return player && node ? `<article class="inbox-card urgent dialogue-card"><div><p class="eyebrow">Player Interaction | ${event.trigger}</p><h3>${player.name}: ${node.title}</h3><span>${node.openingLine}</span></div><div><button onclick="openPlayerDialogue(${player.id}, '${event.dialogueId}', '${event.trigger}')" type="button">Talk Now</button><button onclick="state.activeView='squad'; state.selectedPlayerId=${player.id}; render();" type="button">Open Profile</button></div></article>` : "";
    }).join("")}
    ${lifeEvents.map((event) => `<article class="inbox-card urgent narrative-event"><div><p class="eyebrow">Manager Decision | ${event.type}</p><h3>${event.title}</h3><span>${event.detail}</span></div><div>${event.actions.map((action) => `<button onclick="resolveLifeEvent('${event.id}', '${action}')" type="button">${actionLabels[action] ?? label(action)}</button>`).join("")}</div></article>`).join("")}
    ${injured.map((player) => `<article class="inbox-card urgent"><div><p class="eyebrow">Medical Centre</p><h3>${player.name} is injured</h3><span>${player.injuredWeeks} week(s) out | ${playerStatus(player).label}</span></div><div><button onclick="sendPlayerToPhysio(${player.id})" type="button">Send To Physio</button><button onclick="state.activeView='squad'; state.selectedPlayerId=${player.id}; render();" type="button">Open Profile</button></div></article>`).join("")}
    ${tired.map((player) => `<article class="inbox-card"><div><p class="eyebrow">Fitness Report</p><h3>${player.name} needs recovery</h3><span>Condition ${player.condition}% | Fatigue ${player.fatigue ?? 0} | Stamina ${playerStaminaScore(player)}</span></div><div><button onclick="restPlayer(${player.id})" type="button">Recovery Session</button><button onclick="state.activeView='squad'; state.selectedPlayerId=${player.id}; render();" type="button">Open Profile</button></div></article>`).join("")}
    ${transferUpdates.map((item) => `<article class="inbox-card"><div><p class="eyebrow">Transfer Desk</p><h3>${item.headline}</h3><span>${item.body}</span></div><div><button onclick="state.activeView='transfers'; render();" type="button">Open Market</button><button onclick="state.activeView='news'; render();" type="button">View News</button></div></article>`).join("")}
    ${!state.activeDialogue && !dialogueEvents.length && !lifeEvents.length && !injured.length && !tired.length && !transferUpdates.length ? `<article class="inbox-card"><div><p class="eyebrow">Assistant Manager</p><h3>No urgent actions</h3><span>Your staff have no decisions waiting for review.</span></div></article>` : ""}
  </section>
  <div class="logic-list inbox-log">
    ${(state.feed.length ? state.feed : ["No messages yet. Simulate a week to create club news."])
      .map((item) => `<article><h3>Club Update</h3><p>${item}</p></article>`)
      .join("")}
  </div>`;
}

function sendPlayerToPhysio(playerId) {
  const player = playersForTeam(state.userTeamId).find((candidate) => candidate.id === Number(playerId));
  if (!player || player.injuredWeeks <= 0) return;
  player.injuredWeeks = Math.max(0, player.injuredWeeks - 1);
  player.contract.morale = clamp(player.contract.morale + 1, 1, 20);
  addFeed(`${player.name} started an intensive physio plan. Recovery improved by one week.`);
  render();
}

function restPlayer(playerId) {
  const player = playersForTeam(state.userTeamId).find((candidate) => candidate.id === Number(playerId));
  if (!player) return;
  player.condition = clamp(player.condition + 10, 1, 100);
  player.fatigue = clamp((player.fatigue ?? 0) - 18, 0, 100);
  player.recentLoad = clamp((player.recentLoad ?? 0) - 16, 0, 100);
  addFeed(`${player.name} completed a recovery session.`);
  render();
}

function renderInteractionModal() {
  const dialogue = state.activeDialogue;
  const node = activeDialogueNode();
  if (!dialogue || !node) return "";
  const player = state.players.find((candidate) => candidate.id === dialogue.playerId);
  if (!player) return "";
  const personality = dialoguePersonality(player);
  const initials = player.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const effects = [
    `Morale ${player.contract.morale}/20`,
    `Loyalty ${personality.loyalty}/20`,
    `Professionalism ${personality.professionalism}/20`,
    `Ambition ${personality.ambition}/20`,
    `Controversy ${personality.controversy}/20`,
  ];
  return `<div id="interaction-modal" class="interaction-modal-shell" role="dialog" aria-modal="true" aria-label="Player interaction">
    <article class="interaction-modal">
      <header class="interaction-player">
        <div class="interaction-avatar">${escapeHtml(initials)}</div>
        <div>
          <p class="eyebrow">${escapeHtml(node.trigger)} | ${escapeHtml(hierarchyBand(player))}</p>
          <h3>${escapeHtml(player.name)} <span>${escapeHtml(player.role)} | No. ${shirtNo(player)}</span></h3>
          <small>${escapeHtml(nationalitySummary(player))} | ${escapeHtml(squadStatusForPlayer(player))} | ${escapeHtml(teamById(player.teamId)?.name ?? "Club")}</small>
        </div>
        <button class="interaction-close" onclick="closeDialogue()" type="button">×</button>
      </header>
      <section class="interaction-speech">
        <p>${escapeHtml(node.openingLine)}</p>
      </section>
      <section class="interaction-effects">
        ${effects.map((effect) => `<span>${escapeHtml(effect)}</span>`).join("")}
      </section>
      <div class="interaction-options">
        ${node.options.map((option) => {
          const repGate = option.required?.managerReputation ? `Requires rep ${option.required.managerReputation}` : dialogueToneLabel(option.tone);
          const modifier = option.influence ?? {};
          return `<button class="chat-opt-btn tone-${option.tone.toLowerCase()}" onclick="selectDialogueOption('${option.id}')" type="button">
            <strong>${escapeHtml(option.text)}</strong>
            <small>${escapeHtml(repGate)} | Morale ${modifier.morale >= 0 ? "+" : ""}${modifier.morale ?? 0} | Loyalty ${modifier.loyalty >= 0 ? "+" : ""}${modifier.loyalty ?? 0}</small>
          </button>`;
        }).join("")}
      </div>
    </article>
  </div>`;
}

function renderNegotiationModal() {
  const context = state.activeNegotiation;
  if (!context) return "";
  const player = currentNegotiationPlayer();
  if (!player) return "";
  const club = teamById(state.userTeamId);
  const seller = teamById(context.sellerId);
  const mood = negotiationStatusText(context);
  const patienceWidth = clamp(context.patience, 0, 100);
  const history = context.history?.slice(-3) ?? [];
  const counterValue = context.counter
    ? context.type === "transfer"
      ? money(Math.round(context.counter.upfront + context.counter.installments * 0.8 + context.counter.addons * 0.5))
      : wage(context.counter.wage)
    : null;
  const row = (field, label, value, step, formatter = money, options = {}) => {
    const locked = context.locks?.[field];
    const excluded = context.excluded?.[field];
    const min = options.min ?? 0;
    const max = options.max ?? 999999999;
    const inputId = `neg${field[0].toUpperCase()}${field.slice(1)}`;
    return `<div class="neg-offer-row ${locked ? "locked" : ""} ${excluded ? "excluded" : ""}">
      <div><strong>${escapeHtml(label)}</strong><small>${excluded ? "Removed and excluded" : locked ? "Non-negotiable" : formatter(value)}</small></div>
      <div class="neg-stepper">
        <button onclick="adjustNegotiationValue('${field}', -${step}, ${min}, ${max})" type="button" ${locked || excluded ? "disabled" : ""}>-</button>
        <input id="${inputId}" value="${excluded ? 0 : value}" readonly oninput="updateLiveNegotiationReaction()" />
        <button onclick="adjustNegotiationValue('${field}', ${step}, ${min}, ${max})" type="button" ${locked || excluded ? "disabled" : ""}>+</button>
      </div>
      <div class="neg-row-tools">
        <button class="${locked ? "active" : ""}" onclick="toggleNegotiationLock('${field}')" type="button" ${excluded ? "disabled" : ""}>Lock</button>
        ${options.removable === false ? "" : `<button class="${excluded ? "active danger" : ""}" onclick="toggleNegotiationExclude('${field}')" type="button">Remove</button>`}
      </div>
    </div>`;
  };
  const defaultOffer = context.type === "contract"
    ? {
      wage: context.counter?.wage ?? context.demand.wage,
      years: context.counter?.years ?? context.demand.years,
      signingBonus: context.counter?.signingBonus ?? context.demand.signingBonus,
      goalBonus: context.counter?.goalBonus ?? context.demand.goalBonus,
      appearanceBonus: context.counter?.appearanceBonus ?? context.demand.appearanceBonus,
      agentFee: context.counter?.agentFee ?? context.demand.agentFee,
      role: context.counter?.role ?? context.demand.role,
    }
    : {
      upfront: context.counter?.upfront ?? context.demand.upfront,
      installments: context.counter?.installments ?? context.demand.installments,
      addons: context.counter?.addons ?? context.demand.addons,
    };
  const reaction = negotiationReaction(defaultOffer, context);
  const inputPanel = context.type === "contract"
    ? `<div class="neg-input-panel">
        <h4>Your Offer</h4>
        ${row("wage", "Weekly Wage", defaultOffer.wage, 1000, wage, { removable: false })}
        ${row("years", "Contract Until", defaultOffer.years, 1, (value) => String(value), { min: state.season + 1, max: state.season + 7, removable: false })}
        <label class="neg-role-select">Squad Role<select id="negRole" onchange="updateLiveNegotiationReaction()">${["Star Player", "Regular Starter", "Squad Player", "Emergency Backup"].map((role) => `<option value="${role}" ${role === defaultOffer.role ? "selected" : ""}>${role}</option>`).join("")}</select></label>
        ${row("signingBonus", "Signing Bonus", defaultOffer.signingBonus, 5000)}
        ${row("goalBonus", "Goal Bonus", defaultOffer.goalBonus, 1000)}
        ${row("appearanceBonus", "Appearance Bonus", defaultOffer.appearanceBonus, 1000)}
        ${row("agentFee", "Agent Fee", defaultOffer.agentFee, 5000)}
        <button class="neg-club-vision ${context.excluded?.clubVision ? "excluded" : ""}" onclick="toggleNegotiationExclude('clubVision')" type="button">Club vision: ${context.excluded?.clubVision ? "Removed" : escapeHtml(context.demand.clubVision)}</button>
      </div>`
    : `<div class="neg-input-panel">
        <h4>Your Bid</h4>
        ${row("upfront", "Upfront Cash", defaultOffer.upfront, 1000000, money, { removable: false })}
        ${row("installments", "Installments", defaultOffer.installments, 1000000)}
        ${row("addons", "Add-ons Value", defaultOffer.addons, 500000)}
      </div>`;
  const demandList = context.type === "contract"
    ? `<li>Wage target <strong>${wage(context.demand.wage)}</strong></li>
       <li>Minimum effective package <strong>${wage(context.demand.threshold)}</strong></li>
       <li>Agent fee expectation <strong>${money(context.demand.agentFee)}</strong></li>
       <li>Appearance bonus expectation <strong>${money(context.demand.appearanceBonus)}</strong></li>`
    : `<li>Valuation <strong>${money(context.demand.valuation.valuation)}</strong></li>
       <li>Release clause <strong>${money(context.demand.valuation.releaseClause)}</strong></li>
       <li>Seller pressure <strong>${context.demand.valuation.mustSell ? "Must sell" : "Stable"}</strong></li>`;
  const demandLine = context.type === "contract"
    ? `Demand ${wage(context.demand.wage)} | threshold around ${wage(context.demand.threshold)} | leverage ${playerLeverage(player)}/25`
    : `Seller ${seller?.name ?? "Club"} values package at ${money(context.demand.valuation.valuation)} | release clause ${money(context.demand.valuation.releaseClause)}`;
  return `<div class="interaction-modal-shell negotiation-shell" role="dialog" aria-modal="true" aria-label="Negotiation room">
    <article class="interaction-modal negotiation-modal">
      <header class="interaction-player">
        <div class="interaction-avatar">${escapeHtml(player.role)}</div>
        <div>
          <p class="eyebrow">${context.type === "contract" ? "Contract Negotiation" : "Transfer Negotiation"} | ${escapeHtml(mood)}</p>
          <h3>${escapeHtml(player.name)} <span>${context.source === "extension" ? club.name : seller ? `${seller.name} to ${club.name}` : "Free Agent"}</span></h3>
          <small>${escapeHtml(demandLine)}</small>
        </div>
        <button class="interaction-close" onclick="closeNegotiation()" type="button">×</button>
      </header>
      <section class="negotiation-patience">
        <div><span>Patience / Mood</span><strong>${context.patience}/100</strong></div>
        <b class="patience-fill" style="width:${patienceWidth}%"></b>
      </section>
      <section class="interaction-speech">
        <p>${escapeHtml(context.message)}</p>
        ${counterValue ? `<small>Counter available: ${counterValue}</small>` : ""}
      </section>
      <section class="negotiation-three-column">
        <aside class="neg-context-panel">
          <h4>Context</h4>
          <p><span>Club budget</span><strong>${money(club.budget)}</strong></p>
          <p><span>Wage room</span><strong>${wage(club.wageBudget - playersForTeam(club.id).reduce((sum, squadPlayer) => sum + squadPlayer.contract.wage, 0))}</strong></p>
          <p><span>Player leverage</span><strong>${playerLeverage(player)}/25</strong></p>
          <p><span>Form / Morale</span><strong>${player.form}/20 | ${player.contract.morale}/20</strong></p>
          ${context.agent ? `<div class="agent-card"><span>Agent</span><strong>${escapeHtml(context.agent.name)}</strong><small>${escapeHtml(context.agent.label)} | ${escapeHtml(context.agent.summary)}</small></div>` : `<div class="agent-card"><span>Seller</span><strong>${escapeHtml(seller?.name ?? "Club")}</strong><small>Valuation room and add-on tolerance.</small></div>`}
        </aside>
        ${inputPanel}
        <aside class="neg-demand-panel">
          <h4>Demands</h4>
          <ul>${demandList}</ul>
          <div class="live-reaction-card">
            <span>Live reaction</span>
            <strong id="negLiveReaction" class="live-reaction ${reaction.className}">${escapeHtml(reaction.text)}</strong>
            <div class="reaction-meter"><b id="negLiveReactionMeter" style="width:${clamp(Math.round(reaction.ratio * 100), 0, 120)}%"></b></div>
          </div>
          <div class="assistant-note"><span>Assistant note</span><p>${context.type === "contract" ? "Removing clauses pushes the agent to recover value through base wage. Locking too many lines burns patience quickly." : "Selling clubs prefer upfront cash. Removing installments forces the next counter into a larger guaranteed fee."}</p></div>
        </aside>
      </section>
      ${history.length ? `<ol class="negotiation-history">${history.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>` : ""}
      <div class="interaction-options negotiation-actions">
        <button class="chat-opt-btn tone-negotiate" onclick="submitNegotiationOffer()" type="button"><strong>Submit Offer</strong><small>Evaluate against patience, hidden personality and threshold.</small></button>
        ${context.counter ? `<button class="chat-opt-btn tone-praise" onclick="acceptNegotiationCounter()" type="button"><strong>Accept Counter</strong><small>Take the latest counter offer.</small></button>` : ""}
        <button class="chat-opt-btn tone-aggressive" onclick="closeNegotiation()" type="button"><strong>Walk Away</strong><small>End talks without agreement.</small></button>
      </div>
    </article>
  </div>`;
}

function renderScouting() {
  const club = teamById(state.userTeamId);
  const needs = positionalNeedMatrix(club).slice(0, 6);
  const prospects = [...state.transferMarket, ...state.players.filter((player) => player.teamId !== state.userTeamId)]
    .sort((a, b) => b.hidden.potentialAbility - a.hidden.potentialAbility || b.hidden.currentAbility - a.hidden.currentAbility)
    .slice(0, 24);
  const countries = [...new Set(state.players.flatMap((player) => [player.primaryNationality, player.secondaryNationality]).filter(Boolean))].sort();
  const selected = [...state.players, ...state.transferMarket].find((player) => player.id === state.selectedScoutPlayerId);
  return `<div class="panel-header"><div><p class="eyebrow">Scouting path</p><h2>Recruitment Knowledge Base</h2></div><div class="button-row"><button onclick="refreshMarket(); addFeed('Scouting reports refreshed.'); render();" type="button">Refresh Reports</button><button onclick="state.activeView='transfers'; render();" type="button">Transfer Market</button></div></div>
  <section class="market-hero">${needs.map((item) => `<article><span>${item.role}</span><strong>${item.good}/${item.need}</strong><small>Need score ${item.score} | ${item.expiring} expiring</small></article>`).join("")}</section>
  <section class="scouting-control">
    <label>Scout a nation
      <select id="scoutCountry">${countries.map((country) => `<option value="${escapeHtml(country)}">${escapeHtml(country)} | ${scoutingKnowledgeForCountry(country)}%</option>`).join("")}</select>
    </label>
    <button onclick="assignScoutToCountry(document.querySelector('#scoutCountry').value)" type="button">Create Assignment</button>
    <small>Knowledge grows each week. Wider fog means less reliable CA, PA and attribute ranges.</small>
  </section>
  <div class="scouting-assignment-grid">
    ${(state.scoutingAssignments.length ? state.scoutingAssignments : [{ country: currentLeague().country, weeks: 0 }]).map((assignment) => `<article><span>${escapeHtml(assignment.country)}</span><strong>${scoutingKnowledgeForCountry(assignment.country)}%</strong><div class="knowledge-meter"><b style="width:${scoutingKnowledgeForCountry(assignment.country)}%"></b></div><small>${assignment.weeks ? `${assignment.weeks} week assignment` : "Home network knowledge"}</small></article>`).join("")}
  </div>
  ${selected ? renderScoutProfile(selected) : ""}
  <h3 class="section-heading">Recommended Prospects</h3>
  <div class="market-table-shell"><table class="market-table"><thead><tr><th>Player</th><th>Role</th><th>Club</th><th>Knowledge</th><th>CA / PA estimate</th><th>Value</th><th></th></tr></thead><tbody>
    ${prospects.map((player) => `<tr><td><strong>${player.name}</strong><small>${player.age} yrs | ${nationalitySummary(player)}</small></td><td>${player.role}</td><td>${teamById(player.teamId)?.name ?? "Free Agent"}</td><td>${scoutingKnowledgeForPlayer(player)}%</td><td>${scoutedAbilityRange(player.hidden.currentAbility, scoutingKnowledgeForPlayer(player))} / ${scoutedAbilityRange(player.hidden.potentialAbility, scoutingKnowledgeForPlayer(player))}</td><td>${money(player.value)}</td><td><button onclick="openScoutedPlayer(${player.id})" type="button">Scout Profile</button></td></tr>`).join("")}
  </tbody></table></div>
  <h3 class="section-heading">Data Analyst Desk</h3>
  <div class="honor-list">${(state.analystReports.length ? state.analystReports.slice(0, 5) : ["No analyst report yet. Advance a week to receive data-led recruitment notes."]).map((report) => `<article class="honor-row"><div><strong>Performance model</strong><span>${escapeHtml(report)}</span></div></article>`).join("")}</div>`;
}

function openScoutedPlayer(playerId) {
  const player = [...state.players, ...state.transferMarket].find((candidate) => candidate.id === Number(playerId));
  if (!player) return;
  state.selectedScoutPlayerId = player.id;
  assignScoutToCountry(player.nationality, true);
  state.activeView = "scouting";
  render();
}

function scoutingKnowledgeForCountry(country) {
  const homeCountry = currentLeague().country;
  const managerCountry = state.manager.nationality;
  const fallback = country === homeCountry ? 88 : country === managerCountry ? 62 : 18;
  return clamp(Math.round(state.scoutingKnowledge[country] ?? fallback), 5, 100);
}

function scoutingKnowledgeForPlayer(player) {
  if (player.teamId === state.userTeamId) return 100;
  const primary = scoutingKnowledgeForCountry(player.primaryNationality ?? player.nationality ?? "Unknown");
  const secondary = scoutingKnowledgeForCountry(player.secondaryNationality ?? "Unknown");
  return clamp(Math.max(primary, Math.round(secondary * 0.82)), 5, 100);
}

function scoutedAbilityRange(value, knowledge) {
  const spread = knowledge >= 90 ? 0 : knowledge >= 70 ? 6 : knowledge >= 45 ? 14 : 24;
  return spread ? `${clamp(value - spread, 1, 200)}-${clamp(value + spread, 1, 200)}` : `${value}`;
}

function scoutedAttributeRange(value, knowledge) {
  const spread = knowledge >= 90 ? 0 : knowledge >= 70 ? 1 : knowledge >= 45 ? 3 : 5;
  return spread ? `${clamp(value - spread, 1, 20)}-${clamp(value + spread, 1, 20)}` : `${value}`;
}

function renderScoutProfile(player) {
  const knowledge = scoutingKnowledgeForPlayer(player);
  const attributes = ["finishing", "passing", "dribbling", "decisions", "composure", "pace", "stamina", "positioning"];
  return `<article class="scout-profile">
    <div><p class="eyebrow">Fog of war profile</p><h3>${escapeHtml(player.name)}</h3><span>${player.age} yrs | ${escapeHtml(nationalitySummary(player))} | ${teamById(player.teamId)?.name ?? "Free Agent"}</span></div>
    <strong>${knowledge}% known</strong>
    <div class="scout-profile-grid">${attributes.map((key) => `<span>${label(key)} <b>${scoutedAttributeRange(player.attributes[key] ?? 10, knowledge)}</b></span>`).join("")}</div>
    <small>CA estimate ${scoutedAbilityRange(player.hidden.currentAbility, knowledge)} | PA estimate ${scoutedAbilityRange(player.hidden.potentialAbility, knowledge)}</small>
  </article>`;
}

function assignScoutToCountry(country, silent = false) {
  if (!country) return;
  const existing = state.scoutingAssignments.find((assignment) => assignment.country === country);
  if (!existing) state.scoutingAssignments.unshift({ country, weeks: 0 });
  if (!silent) addFeed(`Chief scout started a knowledge assignment in ${country}.`);
  if (!silent) render();
}

function processScoutingAssignments() {
  const chiefScout = state.staff.find((member) => member.role === "Chief Scout");
  const rating = chiefScout?.attributes?.judgingAbility ?? 11;
  state.scoutingAssignments.forEach((assignment) => {
    assignment.weeks += 1;
    const current = scoutingKnowledgeForCountry(assignment.country);
    state.scoutingKnowledge[assignment.country] = clamp(current + Math.max(2, Math.round(rating / 5)), 5, 100);
  });
  const prospects = state.players.filter((player) => player.teamId !== state.userTeamId && player.stats.appearances > 0);
  const player = prospects[rand(0, Math.max(0, prospects.length - 1))];
  if (player) {
    const passModel = clamp(Math.round(66 + player.attributes.passing * 1.4 + rand(-7, 7)), 48, 94);
    const xg = ((player.stats.shots || 1) * (0.05 + player.attributes.finishing / 120)).toFixed(2);
    state.analystReports.unshift(`${player.name}: ${passModel}% projected pass completion, ${xg} xG model, ${player.stats.keyPasses} key passes recorded.`);
    state.analystReports = state.analystReports.slice(0, 12);
  }
}

function renderDynamics() {
  const club = teamById(state.userTeamId);
  const graph = socialGraphForTeam(state.userTeamId);
  const leaders = graph.nodes
    .sort((a, b) => b.player.influence - a.player.influence || playerScore(b.player) - playerScore(a.player))
    .slice(0, 6)
    .map((node) => node.player);
  const unhappy = playersForTeam(state.userTeamId).filter((player) => player.dynamics?.transferRequest || player.dynamics?.mediaComplaint);
  const revolts = playersForTeam(state.userTeamId).filter((player) => player.dynamics?.revoltTriggered);
  return `<div class="panel-header">
    <div><p class="eyebrow">Dynamics path</p><h2>Squad Dynamics</h2></div>
    <button onclick="restSquad()" type="button">Rest Squad</button>
  </div>
  ${renderTeamTalkPanel()}
  <div class="honors-grid">
    <article class="honor-card"><div><p class="eyebrow">Club morale</p><h3>${club.morale}/20</h3><strong>${club.morale >= 14 ? "Positive dressing room" : "Needs results"}</strong></div></article>
    <article class="honor-card"><div><p class="eyebrow">Leadership group</p><h3>${leaders[0]?.name ?? "No leader"}</h3><strong>${leaders[0]?.influence ?? 0}/100 influence</strong></div></article>
    <article class="honor-card"><div><p class="eyebrow">Social groups</p><h3>${graph.coreGroups.length}</h3><strong>${graph.isolated.length} isolated player(s)</strong></div></article>
    <article class="honor-card"><div><p class="eyebrow">Promises</p><h3>${unhappy.length}</h3><strong>media / transfer request watch</strong></div></article>
    <article class="honor-card"><div><p class="eyebrow">Revolt risk</p><h3>${revolts.length}</h3><strong>${revolts.length ? "leadership conflict active" : "dressing room stable"}</strong></div></article>
  </div>
  <h3 class="section-heading">Hierarchy</h3>
  <div class="honor-list">
    ${leaders.map((player) => `<article class="honor-row"><div><strong>${player.name}</strong><span>${hierarchyBand(player)} | Influence ${player.influence}/100 | Leadership ${player.attributes.leadership} | Morale ${player.contract.morale}/20</span></div></article>`).join("")}
  </div>
  <h3 class="section-heading">Social Network Graph</h3>
  <div class="honor-list">
    ${graph.coreGroups.map(({ group, players }) => `<article class="honor-row"><div><strong>${group}</strong><span>${players.length} player(s): ${players.slice(0, 6).map((player) => player.name).join(", ")}</span></div></article>`).join("")}
    ${graph.isolated.map(({ player }) => `<article class="honor-row warning"><div><strong>${player.name}</strong><span>Ostracism risk | ${nationalitySummary(player)} | ${player.language} | homesick ${player.dynamics?.homesickWeeks ?? 0}w</span></div></article>`).join("")}
  </div>
  <h3 class="section-heading">Squad Status Watch</h3>
  <div class="honor-list">
    ${(unhappy.length ? unhappy : playersForTeam(state.userTeamId).sort((a, b) => b.hidden.currentAbility - a.hidden.currentAbility).slice(0, 5))
      .map((player) => `<article class="honor-row"><div><strong>${player.name}</strong><span>${player.contract.squadStatus ?? squadStatusForPlayer(player)} | Apps ${player.stats.appearances}/${expectedAppearancesForStatus(player.contract.squadStatus ?? squadStatusForPlayer(player)).toFixed(1)} expected | ${player.dynamics?.transferRequest ? "Transfer request" : player.dynamics?.mediaComplaint ? "Media complaint" : "Stable"}</span></div></article>`)
      .join("")}
  </div>
  <h3 class="section-heading">Talk History</h3>
  <div class="honor-list">
    ${(state.teamTalk.history.length ? state.teamTalk.history : ["No team talks yet."])
      .map((item) => `<article class="honor-row"><div><strong>${item}</strong><span>Dressing room memory</span></div></article>`)
      .join("")}
  </div>`;
}

function renderStaff() {
  const club = teamById(state.userTeamId);
  if (!state.staff.length) state.staff = buildClubStaff(club);
  const manager = state.staff[0];
  const backroom = state.staff.slice(1);
  const delegationRows = [
    ["press", "Assistant handles press conferences"],
    ["youthContracts", "Director of Football negotiates youth contracts"],
    ["scoutingShortlist", "Chief Scout refreshes shortlist"],
    ["trainingSchedule", "Assistant sets weekly training schedule"],
    ["medicalAlerts", "Medical staff sends automatic injury alerts"],
  ];
  const starRows = ["tactical", "attacking", "defensive", "physical"].map((focus) => [focus, trainingStarRating(focus)]);
  const jobWatch = state.teams
    .filter((team) => team.id !== state.userTeamId)
    .map((team) => ({ team, score: aiBoardScore(team) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);
  return `<div class="panel-header">
    <div><p class="eyebrow">Staff path</p><h2>Backroom Staff</h2></div>
    <button onclick="state.activeView='transfers'; render();" type="button">Recruitment</button>
  </div>
  <article class="manager-card">
    <div>
      <p class="eyebrow">${manager.role}</p>
      <h3>${escapeHtml(manager.name)}</h3>
      <span>${escapeHtml(nationalitySummary(manager))} | ${escapeHtml(state.manager.coachingStyle)} coach | ${club.name}</span>
    </div>
    <strong>${staffOverall(manager)}/20</strong>
    <p>${escapeHtml(manager.focus)}</p>
  </article>
  <section class="staff-ops-grid">
    <article>
      <p class="eyebrow">Delegation</p>
      <h3>Staff Automation</h3>
      <div class="delegation-list">
        ${delegationRows.map(([key, text]) => `<label><input type="checkbox" ${state.staffDelegation[key] ? "checked" : ""} onchange="setStaffDelegation('${key}', this.checked)" /> <span>${text}</span></label>`).join("")}
      </div>
    </article>
    <article>
      <p class="eyebrow">Training Star Rating</p>
      <h3>${trainingStarRating()}/5 current focus</h3>
      <div class="training-stars">
        ${starRows.map(([focus, stars]) => `<span><b>${label(focus)}</b><i style="--star:${stars * 20}%"></i><strong>${stars}/5</strong></span>`).join("")}
      </div>
    </article>
    <article>
      <p class="eyebrow">Medical Science</p>
      <h3>${sportsScienceRating()}/20</h3>
      <span>Head of Medical, Physio and Sports Scientist reduce training and match injury risk.</span>
    </article>
  </section>
  <div class="staff-grid">
    ${backroom.map((member) => `<article class="staff-card">
      <div class="staff-card-header">
        <div><p class="eyebrow">${member.role}</p><h3>${escapeHtml(member.name)}</h3></div>
        <strong>${staffOverall(member)}/20</strong>
      </div>
      <p>${escapeHtml(member.focus)}</p>
      <p class="staff-nationality">Primary ${escapeHtml(member.primaryNationality)} | Secondary ${escapeHtml(member.secondaryNationality)}</p>
      <div class="staff-attributes">
        <span>Coach <b>${member.attributes.coaching}</b></span>
        <span>Tactical <b>${member.attributes.tacticalKnowledge}</b></span>
        <span>People <b>${member.attributes.manManagement}</b></span>
        <span>Judging <b>${member.attributes.judgingAbility}</b></span>
      </div>
    </article>`).join("")}
  </div>
  <h3 class="section-heading">AI Manager Job Landscape</h3>
  <section class="job-landscape-grid">
    ${jobWatch.map(({ team, score }) => `<article>
      <span>${team.name}</span>
      <strong>${team.aiManager?.name ?? "Vacant"}</strong>
      <small>Board score ${score}/100 | target rank ${team.boardTargetRank} | security ${team.aiManager?.jobSecurity ?? 0}%</small>
    </article>`).join("")}
  </section>
  <div class="honor-list">
    ${(state.jobMarketHistory.length ? state.jobMarketHistory : ["No manager moves yet. Poor AI results can trigger sackings after week 5."]).map((item) => `<article class="honor-row"><div><strong>Job Market</strong><span>${escapeHtml(item)}</span></div></article>`).join("")}
  </div>`;
}

function renderTraining() {
  const club = teamById(state.userTeamId);
  const squad = playersForTeam(state.userTeamId);
  const watchlist = [...squad].sort((a, b) => playerStaminaScore(a) - playerStaminaScore(b) || a.condition - b.condition).slice(0, 10);
  const averageCondition = Math.round(squad.reduce((sum, player) => sum + player.condition, 0) / squad.length);
  const averageStamina = Math.round(squad.reduce((sum, player) => sum + playerStaminaScore(player), 0) / squad.length);
  const averageFatigue = Math.round(squad.reduce((sum, player) => sum + (player.fatigue ?? 0), 0) / squad.length);
  const unavailableCount = squad.filter((player) => !isPlayerMatchAvailable(player)).length;
  const medicalWatch = [...squad]
    .map((player) => ({ player, risk: injuryRiskScore(player) }))
    .sort((a, b) => b.risk - a.risk)
    .slice(0, 8);
  const schedule = [
    ["Mon", state.trainingFocus === "physical" ? "Conditioning" : "Recovery + review", "Low injury risk"],
    ["Tue", state.trainingFocus === "attacking" ? "Chance creation" : state.trainingFocus === "defensive" ? "Defensive shape" : "Tactical units", "Main coaching block"],
    ["Wed", state.trainingIntensity === "high" ? "Double session" : "Technical work", "Attribute growth"],
    ["Thu", state.trainingFocus === "physical" ? "Speed + endurance" : "Match preparation", "Next opponent"],
    ["Fri", "Set pieces", "Corners and free kicks"],
    ["Sat", "Matchday", "Selection and team talk"],
    ["Sun", state.trainingIntensity === "recovery" ? "Full recovery" : "Recovery pool", "Condition reset"],
  ];
  return `<div class="panel-header">
    <div><p class="eyebrow">Training path</p><h2>Training Centre</h2></div>
    <button onclick="restSquad()" type="button">Recovery Session</button>
  </div>
  <section class="training-controls">
    <article><span>Average Condition</span><strong>${averageCondition}%</strong><small>${state.trainingIntensity} intensity</small></article>
    <article><span>Average Stamina</span><strong>${averageStamina}</strong><small>${unavailableCount} unavailable</small></article>
    <article><span>Average Fatigue</span><strong>${averageFatigue}</strong><small>recent load tracked</small></article>
    <article><span>Recovery Window</span><strong>${Number.isFinite(club.lastMatchIntervalDays) ? `${Math.round(club.lastMatchIntervalDays * 24)}h` : "Fresh"}</strong><small>${club.lastMatchIntervalDays < 3 ? "accumulated fatigue active" : "normal recovery"}</small></article>
    <label>Intensity
      <select onchange="setTrainingPlan('intensity', this.value)">
        ${["recovery", "balanced", "high"].map((item) => `<option value="${item}" ${item === state.trainingIntensity ? "selected" : ""}>${label(item)}</option>`).join("")}
      </select>
    </label>
    <label>Weekly Focus
      <select onchange="setTrainingPlan('focus', this.value)">
        ${["tactical", "attacking", "defensive", "physical"].map((item) => `<option value="${item}" ${item === state.trainingFocus ? "selected" : ""}>${label(item)}</option>`).join("")}
      </select>
    </label>
  </section>
  <div class="training-week">
    ${schedule.map(([day, title, note]) => `<article><span>${day}</span><strong>${title}</strong><small>${note}</small></article>`).join("")}
  </div>
  <h3 class="section-heading">Medical Centre</h3>
  <section class="medical-dashboard">
    <article><span>Sports Science</span><strong>${sportsScienceRating()}/20</strong><small>reduces injury risk</small></article>
    <article><span>Training Stars</span><strong>${trainingStarRating()}/5</strong><small>${state.trainingFocus} focus</small></article>
    <article><span>Red Flags</span><strong>${medicalWatch.filter((item) => item.risk >= 72).length}</strong><small>consider rest or rehab</small></article>
  </section>
  <div class="medical-list">
    ${medicalWatch.map(({ player, risk }) => {
      const band = medicalRiskBand(risk);
      return `<article class="${band.className}">
        <div><strong>${player.name}</strong><span>${player.role} | ${playerStatus(player).label}</span></div>
        <b>${band.label}</b>
        <small>Risk ${risk}/100 | ${band.note}</small>
        ${player.injuredWeeks > 0 ? `<div class="button-row"><button onclick="treatInjury(${player.id}, 'specialist')" type="button">Specialist Surgery</button><button onclick="treatInjury(${player.id}, 'injection')" type="button">Pain Rehab</button><button onclick="treatInjury(${player.id}, 'normal')" type="button">Normal Rehab</button></div>` : `<button onclick="restPlayer(${player.id})" type="button">Rest</button>`}
      </article>`;
    }).join("")}
  </div>
  <h3 class="section-heading">Condition Watchlist</h3>
  <table>
    <thead><tr><th>Player</th><th>Role</th><th>Condition</th><th>Stamina</th><th>Fatigue</th><th>Load</th><th>Status</th></tr></thead>
    <tbody>${watchlist.map((player) => `<tr><td><strong>${player.name}</strong><small>${SQUAD_GROUPS[player.squadGroup]}</small></td><td>${player.role}</td><td>${player.condition}%</td><td>${playerStaminaScore(player)}</td><td>${player.fatigue ?? 0}</td><td>${player.recentLoad ?? 0}</td><td>${playerStatus(player).label}</td></tr>`).join("")}</tbody>
  </table>`;
}

function userLeagueFormGuide(limit = 5) {
  return state.fixtures
    .map((round) => round.find((fixture) => fixture.includes(state.userTeamId)))
    .filter((fixture) => fixture?.result)
    .slice(-limit)
    .map((fixture) => {
      const userHome = fixture[0] === state.userTeamId;
      const userGoals = userHome ? fixture.result.home : fixture.result.away;
      const oppGoals = userHome ? fixture.result.away : fixture.result.home;
      return userGoals > oppGoals ? "W" : userGoals < oppGoals ? "L" : "D";
    });
}

function buildUserScheduleItems() {
  const leagueItems = state.fixtures
    .map((round, index) => {
      const fixture = round.find((pair) => pair.includes(state.userTeamId));
      if (!fixture) return null;
      const opponentId = fixture.find((teamId) => teamId !== state.userTeamId);
      const userHome = fixture[0] === state.userTeamId;
      const rules = competitionRules(fixture.competition ?? currentLeague().name, "league");
      return {
        id: `league-${index + 1}`,
        kind: "league",
        week: index + 1,
        dayIndex: fixture.dayIndex ?? round.dayIndex,
        isoDate: fixture.date ?? round.date,
        date: fixture.displayDate ?? round.displayDate,
        kickoff: fixture.kickoff ?? "15:00",
        competition: fixture.competition ?? currentLeague().name,
        rules,
        opponentId,
        opponentName: teamById(opponentId)?.name ?? "Opponent",
        venue: userHome ? "H" : "A",
        result: fixture.result,
        status: fixture.status === "RESCHEDULED" ? "RESCHEDULED" : index + 1 < state.week ? "PLAYED" : index + 1 === state.week ? "NEXT" : "UPCOMING",
      };
    })
    .filter(Boolean);
  const cupItems = (state.competitions ?? [])
    .filter((competition) => competition.status !== "not-qualified")
    .flatMap((competition) => (competition.scheduledDates ?? []).map((slot, index) => {
      const opponent = competition.opponentPool?.[index % Math.max(1, competition.opponentPool.length)];
      const rules = competitionRules(competition.name, competition.type === "league-phase" ? "europe" : "domestic-cup");
      return {
        id: `${competition.name}-${index}`,
        kind: competition.type === "league-phase" ? "europe" : "cup",
        week: competition.weeks?.[index] ?? "-",
        dayIndex: slot.dayIndex,
        isoDate: slot.isoDate,
        date: slot.displayDate,
        kickoff: rules.code === "UEL" ? "20:00" : rules.code === "UCL" ? "20:00" : "19:45",
        competition: competition.name,
        rules,
        opponentId: null,
        opponentName: opponent?.name ?? currentCupRound(competition),
        venue: opponent?.venue === "home" ? "H" : opponent?.venue === "away" ? "A" : "N",
        result: null,
        history: competition.history?.[index],
        status: index < competition.roundIndex ? "PLAYED" : index === competition.roundIndex && competition.status === "active" ? "NEXT" : competition.status === "eliminated" ? "ELIMINATED" : "UPCOMING",
      };
    }));
  return [...leagueItems, ...cupItems].sort((a, b) => a.dayIndex - b.dayIndex || String(a.id).localeCompare(String(b.id)));
}

function restDaysBeforeScheduleItem(items, item, index) {
  const previous = items.slice(0, index).reverse().find((candidate) => candidate.status !== "ELIMINATED");
  return previous ? Math.max(0, item.dayIndex - previous.dayIndex) : 7;
}

function scheduleResultText(item) {
  if (item.status === "ELIMINATED") return "Eliminated";
  if (!item.result) return item.status === "PLAYED" ? item.history ?? "Played" : item.kickoff;
  const userHome = item.venue === "H";
  const userGoals = userHome ? item.result.home : item.result.away;
  const oppGoals = userHome ? item.result.away : item.result.home;
  const letter = userGoals > oppGoals ? "W" : userGoals < oppGoals ? "L" : "D";
  return `${letter} ${userGoals}-${oppGoals}`;
}

function scheduleFitnessSummary(restDays) {
  const starters = firstEleven(state.userTeamId);
  const previews = starters.map((player) => calculateMatchDayFitnessPreview(player, restDays));
  return {
    fitness: Math.round(average(previews.map((item) => item.fitness))),
    fatigue: Math.round(average(previews.map((item) => item.fatigue))),
    risk: previews.filter((item) => item.risk === "high").length >= 4 ? "high" : previews.some((item) => item.risk !== "low") ? "medium" : "low",
  };
}

function renderSchedule() {
  const postponed = state.postponedFixtures ?? [];
  const scheduleItems = buildUserScheduleItems();
  const nextItem = scheduleItems.find((item) => ["NEXT", "UPCOMING", "RESCHEDULED"].includes(item.status));
  const formGuide = userLeagueFormGuide();
  const monthMeta = calendarMonthMeta(scheduleItems);
  const calendarAgenda = (state.calendarEvents ?? [])
    .filter((event) => event.type !== "league")
    .sort((a, b) => a.dayIndex - b.dayIndex)
    .slice(0, 18)
    .map((event) => {
      const rules = competitionRules(event.competition, event.type);
      return `<tr>
        <td>${event.dayIndex}</td>
        <td><strong>${event.displayDate}</strong><small>${event.type.replace("-", " ")}</small></td>
        <td><span class="comp-pill ${rules.color}">${rules.code}</span> <strong>${event.competition}</strong></td>
        <td>${rules.defaultDay}</td>
        <td>${event.type === "blocked" ? "BLOCKED" : rules.priority === 1 ? "FIXED CUP SLOT" : "UEFA SLOT"}</td>
      </tr>`;
    })
    .join("");
  const rows = scheduleItems
    .slice(0, Math.max(42, state.week + 10))
    .map((item, index) => {
      const restDays = restDaysBeforeScheduleItem(scheduleItems, item, index);
      const fitness = scheduleFitnessSummary(restDays);
      const resultText = scheduleResultText(item);
      const resultClass = resultText.startsWith("W") ? "win" : resultText.startsWith("L") ? "loss" : resultText.startsWith("D") ? "draw" : "";
      const opponentCell = item.opponentId
        ? `<button class="fixture-opponent" onclick="openOpponentScoutReport(${item.opponentId})" type="button">${teamCrest(teamById(item.opponentId), "sm")}${escapeHtml(item.opponentName)}</button>`
        : `<strong>${escapeHtml(item.opponentName)}</strong>`;
      return `<tr class="${item.id === nextItem?.id ? "selected next-fixture-row" : ""} fixture-${item.kind}">
        <td><strong>${item.date}</strong><small>Day ${item.dayIndex} | MW ${item.week}</small></td>
        <td><span class="comp-pill ${item.rules.color}">${item.rules.code}</span><span>${escapeHtml(item.competition)}</span></td>
        <td>${opponentCell}</td>
        <td class="center">${item.venue}</td>
        <td class="center"><strong class="result-code ${resultClass}">${escapeHtml(resultText)}</strong></td>
        <td><span>${escapeHtml(item.rules.special)}</span><small>${item.rules.subs} subs from ${item.rules.bench} bench | rest ${restDays}d | fitness ${fitness.fitness}% / fatigue ${fitness.fatigue}</small></td>
      </tr>`;
    })
    .join("");
  const nextFitness = nextItem ? scheduleFitnessSummary(restDaysBeforeScheduleItem(scheduleItems, nextItem, scheduleItems.findIndex((item) => item.id === nextItem.id))) : null;
  return `<div class="panel-header">
    <div><p class="eyebrow">Schedule path</p><h2>Fixture Dashboard</h2></div>
    <div class="button-row"><button onclick="state.activeView='match'; render();" type="button">Prepare Match</button><button onclick="simulateWeek()" type="button">Simulate Week</button></div>
  </div>
  <div class="calendar-toolbar">
    <div class="portal-pill-tabs"><button class="active" type="button">General</button><button type="button">Training</button><button type="button">Fixtures</button></div>
    <h2>${monthMeta.label || seasonLabel()}</h2>
    <div class="button-row"><button type="button">‹</button><button type="button">›</button><button type="button">Today</button><button onclick="restSquad()" type="button">Go On Holiday</button></div>
  </div>
  ${renderCalendarMonthGrid(scheduleItems)}
  <section class="schedule-hero">
    <article>
      <span>Season</span>
      <strong>${seasonLabel()}</strong>
      <small>${teamById(state.userTeamId).name}</small>
    </article>
    <article>
      <span>Next Fixture</span>
      <strong>${nextItem ? `${nextItem.rules.code} vs ${nextItem.opponentName}` : "Season complete"}</strong>
      <small>${nextItem ? `${nextItem.date} ${nextItem.kickoff} | ${nextItem.venue}` : "No remaining matches"}</small>
    </article>
    <article>
      <span>Form 5</span>
      <strong class="form-guide">${(formGuide.length ? formGuide : ["-", "-", "-", "-", "-"]).map((mark) => `<b class="${mark === "W" ? "win" : mark === "L" ? "loss" : mark === "D" ? "draw" : ""}">${mark}</b>`).join("")}</strong>
      <small>League matches only</small>
    </article>
    <article>
      <span>Recovery Forecast</span>
      <strong>${nextFitness ? `${nextFitness.fitness}%` : "-"}</strong>
      <small>${nextFitness ? `${nextFitness.risk} risk | avg fatigue ${nextFitness.fatigue}` : "No forecast"}</small>
    </article>
  </section>
  <section class="finance-summary">
    <article><span>League Matchdays</span><strong>${state.fixtures.length}</strong><small>Berger home / away rotation</small></article>
    <article><span>FIFA Breaks</span><strong>${fifaBreakRanges().length}</strong><small>club fixtures blocked</small></article>
    <article><span>Midweek Slots</span><strong>${(state.calendarEvents ?? []).filter((event) => ["europe", "domestic-cup"].includes(event.type)).length}</strong><small>cups and Europe</small></article>
    <article><span>Postponed</span><strong>${postponed.length}</strong><small>queue and reschedule</small></article>
  </section>
  <div class="fixture-table-shell"><table class="fixture-dashboard-table">
    <thead><tr><th>Date</th><th>Competition</th><th>Opponent</th><th>H/A</th><th>Result / Time</th><th>Match Rules + Load</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  <div class="assistant-note schedule-advice"><span>Assistant schedule note</span><p>${nextItem ? `${nextItem.rules.restAdvice} ${nextFitness?.risk === "high" ? "The 72-hour rule is triggered, so rotate tired starters before kickoff." : "Current recovery window is manageable."}` : "No active fixture remains in the calendar."}</p></div>
  <h3 class="section-heading">Global Calendar Slots</h3>
  <table class="calendar-slot-table">
    <thead><tr><th>Day</th><th>Date</th><th>Competition / Block</th><th>Default Day</th><th>Priority</th></tr></thead>
    <tbody>${calendarAgenda}</tbody>
  </table>`;
}

function renderDevelopment() {
  const club = teamById(state.userTeamId);
  const prospects = playersForTeam(state.userTeamId)
    .filter((player) => ["u21", "u18"].includes(player.squadGroup))
    .sort((a, b) => b.hidden.potentialAbility - a.hidden.potentialAbility)
    .slice(0, 12);
  const ready = prospects.filter((player) => player.hidden.currentAbility >= 118 || player.hidden.potentialAbility - player.hidden.currentAbility <= 22).length;
  const u18 = playersForTeam(state.userTeamId).filter((player) => player.squadGroup === "u18").length;
  const u21 = playersForTeam(state.userTeamId).filter((player) => player.squadGroup === "u21").length;
  return `<div class="panel-header">
    <div><p class="eyebrow">Development path</p><h2>Youth Development Centre</h2></div>
    <button onclick="state.activeView='squad'; render();" type="button">Open Squad</button>
  </div>
  <section class="academy-overview">
    <article><span>U21 Squad</span><strong>${u21}</strong><small>reserve pathway</small></article>
    <article><span>U18 Squad</span><strong>${u18}</strong><small>academy intake</small></article>
    <article><span>Ready Soon</span><strong>${ready}</strong><small>promotion candidates</small></article>
    <article><span>Youth Facilities</span><strong>${club.youthFacilities}/20</strong><small>intake CA modifier</small></article>
    <article><span>Youth Recruitment</span><strong>${club.youthRecruitment}/20</strong><small>intake PA modifier</small></article>
    <label>Youth Focus
      <select onchange="setYouthFocus(this.value)">
        ${["balanced", "technical", "physical", "mental"].map((item) => `<option value="${item}" ${item === state.youthFocus ? "selected" : ""}>${label(item)}</option>`).join("")}
      </select>
    </label>
  </section>
  <section class="infrastructure-grid">
    <article><span>Training Facilities</span><strong>${club.trainingFacilities}/20</strong><small>senior development speed</small><button onclick="requestInfrastructureUpgrade('trainingFacilities')" type="button">Request To Board</button></article>
    <article><span>Youth Facilities</span><strong>${club.youthFacilities}/20</strong><small>U18/U21 development</small><button onclick="requestInfrastructureUpgrade('youthFacilities')" type="button">Request To Board</button></article>
    <article><span>Corporate Facilities</span><strong>${club.corporateFacilities}/20</strong><small>sponsor and matchday income</small><button onclick="requestInfrastructureUpgrade('corporateFacilities')" type="button">Request To Board</button></article>
  </section>
  ${state.infrastructureProjects.length ? `<h3 class="section-heading">Infrastructure Projects</h3><div class="honor-list">${state.infrastructureProjects.map((project) => `<article class="honor-row"><div><strong>${infrastructureCategoryLabel(project.category)}</strong><span>${project.status} | target level ${project.targetLevel}/20 | ${Math.max(0, project.weeksRemaining)} week(s) remaining | ${money(project.cost)}</span></div></article>`).join("")}</div>` : ""}
  <table>
    <thead><tr><th>No.</th><th>Player</th><th>Group</th><th>Age</th><th>Role</th><th>CA</th><th>PA</th><th>Growth</th><th></th></tr></thead>
    <tbody>${prospects.map((player) => `<tr><td><strong>${shirtNo(player)}</strong></td><td><span class="academy-player-name">${player.newgen ? `<i class="newgen-avatar" style="--portrait-hue:${player.portraitSeed % 360}">${teamInitials(player.name).slice(0, 2)}</i>` : ""}<strong>${player.name}</strong></span></td><td>${SQUAD_GROUPS[player.squadGroup]}</td><td>${player.age}</td><td>${player.role}</td><td>${player.hidden.currentAbility}</td><td>${player.hidden.potentialAbility}</td><td>${player.hidden.potentialAbility - player.hidden.currentAbility}</td><td><button onclick="promoteYouthPlayer(${player.id})" type="button">Promote</button></td></tr>`).join("")}</tbody>
  </table>`;
}

function renderClubInfo() {
  const club = teamById(state.userTeamId);
  const league = currentLeague();
  const position = state.table.findIndex((row) => row.teamId === state.userTeamId) + 1;
  return `<div class="panel-header">
    <div><p class="eyebrow">Club Info path</p><h2 class="crest-heading">${teamCrest(club, "lg")}${club.name}</h2></div>
    <button onclick="state.activeView='honors'; render();" type="button">Honors</button>
  </div>
  <div class="honors-grid">
    <article class="honor-card"><div><p class="eyebrow">League</p><h3>${league.name}</h3><strong>${league.country}</strong></div></article>
    <article class="honor-card"><div><p class="eyebrow">Current position</p><h3>${position > 0 ? `#${position}` : "-"}</h3><strong>${state.table.find((row) => row.teamId === club.id)?.points ?? 0} points</strong></div></article>
    <article class="honor-card"><div><p class="eyebrow">Facilities</p><h3>${club.trainingFacilities}/${club.youthFacilities}/${club.corporateFacilities}</h3><strong>Training / Youth / Corporate</strong></div></article>
    <article class="honor-card"><div><p class="eyebrow">Fan Mood</p><h3>${fanMoodScore(club)}%</h3><strong>${club.fanProfile.hardcore}% hardcore support</strong></div></article>
  </div>
  <section class="fan-profile-grid">
    <article><span>Hardcore</span><strong>${club.fanProfile.hardcore}%</strong><small>strong home pressure, fast backlash</small></article>
    <article><span>Casual</span><strong>${club.fanProfile.casual}%</strong><small>responds to stars and results</small></article>
    <article><span>Family</span><strong>${club.fanProfile.family}%</strong><small>prefers stability and club identity</small></article>
    <article><span>Attendance</span><strong>${club.stadiumAttendance.toLocaleString()}</strong><small>fan power in match engine</small></article>
  </section>
  ${renderChampionBanner()}`;
}

function renderMedia() {
  const opponent = teamById(state.selectedOpponentId) ?? teamById(nextUserFixture()?.fixture.find((teamId) => teamId !== state.userTeamId));
  const captain = [...playersForTeam(state.userTeamId)].sort((a, b) => b.influence - a.influence)[0];
  const pressure = state.mediaPressure?.teamId === opponent?.id ? `${state.mediaPressure.intensity}% pressure active` : "No active mind game";
  return `<div class="panel-header">
    <div><p class="eyebrow">Media path</p><h2>Press Conference</h2></div>
    <button onclick="state.activeView='match'; render();" type="button">Match Preview</button>
  </div>
  <article class="media-stage">
    <p class="eyebrow">Pre-match question</p>
    <h3>How do you assess ${escapeHtml(opponent?.name ?? "the next opponent")} before the next fixture?</h3>
    <span>${pressure}. Answers alter morale, relationships and the pressure modifier used by the match engine.</span>
    <div class="media-choice-grid">
      <button onclick="answerPressConference('respect')" type="button"><strong>Show respect</strong><small>Calm the room and protect focus.</small></button>
      <button onclick="answerPressConference('mindGame')" type="button"><strong>Apply pressure</strong><small>Test the opponent's composure.</small></button>
      <button onclick="answerPressConference('backCaptain')" type="button"><strong>Back ${escapeHtml(captain?.name ?? "captain")}</strong><small>Lift the leadership group.</small></button>
      <button onclick="answerPressConference('transferHint')" type="button"><strong>Discuss transfer rumours</strong><small>Risk an unhappy player reaction.</small></button>
    </div>
  </article>
  <h3 class="section-heading">Media History</h3>
  <div class="honor-list">${(state.mediaHistory.length ? state.mediaHistory : ["No press answer recorded yet."]).map((item) => `<article class="honor-row"><div><strong>Press room</strong><span>${escapeHtml(item)}</span></div></article>`).join("")}</div>
  <h3 class="section-heading">Social Media Feed</h3>
  <div class="social-feed">
    ${(state.socialFeed.length ? state.socialFeed : [{ tone: "neutral", text: "No fan posts yet. Play a match or complete a transfer to generate social reaction.", tag: "club", week: state.week }]).map((post) => `<article class="${post.tone}"><div><strong>@${post.tag}_${post.week}</strong><span>Week ${post.week} | ${post.tone}</span></div><p>${escapeHtml(post.text)}</p></article>`).join("")}
  </div>`;
}

function answerPressConference(choice) {
  const opponent = teamById(state.selectedOpponentId);
  const club = teamById(state.userTeamId);
  const captain = [...playersForTeam(state.userTeamId)].sort((a, b) => b.influence - a.influence)[0];
  let note = "";
  if (choice === "respect") {
    club.morale = clamp(club.morale + 1, 1, 20);
    note = `You kept the tone calm before ${opponent?.name ?? "the match"}. Squad morale improved.`;
  } else if (choice === "mindGame") {
    state.mediaPressure = { teamId: opponent?.id, intensity: rand(18, 34), week: state.week };
    note = `You challenged ${opponent?.name ?? "the opponent"} publicly. Their composure will be tested in the next match.`;
  } else if (choice === "backCaptain") {
    if (captain) captain.contract.morale = clamp(captain.contract.morale + 2, 1, 20);
    club.morale = clamp(club.morale + 1, 1, 20);
    note = `You backed ${captain?.name ?? "the leadership group"} in public. The dressing room responded well.`;
  } else {
    const player = [...playersForTeam(state.userTeamId)].sort((a, b) => b.value - a.value)[0];
    if (player) {
      player.contract.morale = clamp(player.contract.morale - 3, 1, 20);
      player.dynamics.mediaComplaint = true;
      if (chance(0.35 + player.hidden.ambition / 50)) player.dynamics.transferRequest = true;
    }
    note = `Your transfer comment unsettled ${player?.name ?? "the squad"}. A private reaction may follow.`;
  }
  state.mediaHistory.unshift(note);
  state.mediaHistory = state.mediaHistory.slice(0, 12);
  addFeed(`Media: ${note}`);
  render();
}

function renderClubVision() {
  const club = teamById(state.userTeamId);
  const league = currentLeague();
  const position = state.table.findIndex((row) => row.teamId === state.userTeamId) + 1;
  const wageSpend = playersForTeam(club.id).reduce((sum, player) => sum + player.contract.wage, 0);
  const wageControl = clamp(Math.round(100 - (wageSpend / Math.max(1, club.wageBudget)) * 100), 0, 100);
  const youthCount = playersForTeam(club.id).filter((player) => ["u21", "u18"].includes(player.squadGroup)).length;
  const targetPosition = club.reputation >= 88 ? "Challenge for the title" : club.reputation >= 78 ? "Qualify for Europe" : club.reputation >= 68 ? "Secure top-half football" : "Avoid relegation";
  evaluateBoardPerformance(false, false);
  const boardScore = state.board.score;
  const leagueRep = state.leagueReputation[league.id] ?? clamp((league.level ?? 75) * 100, 1000, 10000);
  const vision = [
    ["Season target", targetPosition, `${league.name} position ${position > 0 ? `#${position}` : "-"}`],
    ["Playing style", state.tactics.mentality === "positive" || state.tactics.mentality === "attacking" ? "Front-foot football" : "Balanced identity", `${state.tactics.formation} with press ${state.tactics.pressing}`],
    ["Financial control", wageControl >= 20 ? "Sustainable wage structure" : "Reduce wage pressure", `${wage(wageSpend)} used from ${wage(club.wageBudget)}`],
    ["Youth pathway", youthCount >= 10 ? "Strong academy pipeline" : "Expand academy depth", `${youthCount} U21/U18 players tracked`],
  ];
  return `<div class="panel-header">
    <div><p class="eyebrow">Club Vision path</p><h2>Club Vision</h2></div>
    <div class="button-row">
      <button onclick="state.activeView='finances'; render();" type="button">Finances</button>
      <button onclick="state.activeView='development'; render();" type="button">Dev Centre</button>
    </div>
  </div>
  <section class="finance-summary">
    <article><span>Board Confidence</span><strong>${state.board.grade} | ${boardScore}%</strong><small>${state.board.status}</small></article>
    <article><span>League Target</span><strong>${position > 0 ? `#${position}` : "-"}</strong><small>${targetPosition}</small></article>
    <article><span>Wage Control</span><strong>${wageControl}%</strong><small>${wage(club.wageBudget - wageSpend)} room</small></article>
    <article><span>Reputation</span><strong>${clubReputationScore(club).toLocaleString()}</strong><small>${league.name} ${leagueRep.toLocaleString()}</small></article>
    <article><span>Transfer Revenue</span><strong>${club.transferRevenueRetained}%</strong><small>retained from player sales</small></article>
  </section>
  ${state.board.warningLevel ? `<article class="board-alert"><strong>${state.board.status}</strong><span>The board expect immediate improvement. A formal meeting is close.</span></article>` : ""}
  <div class="logic-list">
    ${vision.map(([title, value, note]) => `<article><h3>${title}</h3><p><strong>${value}</strong></p><p>${note}</p></article>`).join("")}
  </div>
  <h3 class="section-heading">Monthly Evaluation Formula</h3>
  <div class="finance-summary">
    <article><span>Results 40%</span><strong>${state.board.metrics.resultScore}</strong></article>
    <article><span>Finance 20%</span><strong>${state.board.metrics.financeScore}</strong></article>
    <article><span>Morale 20%</span><strong>${state.board.metrics.moraleScore}</strong></article>
    <article><span>Vision 20%</span><strong>${state.board.metrics.visionScore}</strong></article>
  </div>`;
}

function renderFinances() {
  const club = teamById(state.userTeamId);
  const wages = playersForTeam(state.userTeamId).reduce((sum, player) => sum + player.contract.wage, 0);
  const topEarners = playersForTeam(state.userTeamId).sort((a, b) => b.contract.wage - a.contract.wage).slice(0, 8);
  const incomeProjection = 640_000 + club.reputation * 8500;
  const operationsProjection = Math.round(210_000 + club.reputation * 3100);
  const weeklyProjection = incomeProjection - wages - operationsProjection;
  const wageUsage = Math.round((wages / Math.max(1, club.wageBudget)) * 100);
  const reports = [
    ["Broadcast + Matchday", state.financeReport.lastIncome || incomeProjection, "Last week income"],
    ["Player Wages", -Math.abs(state.financeReport.lastWages || wages), "Payroll"],
    ["Club Operations", -Math.abs(state.financeReport.lastOperations || operationsProjection), "Staff, academy, facilities"],
    ["Net Movement", state.financeReport.lastNet || weeklyProjection, "Weekly balance change"],
  ];
  return `<div class="panel-header">
    <div><p class="eyebrow">Finances path</p><h2>Club Finances</h2></div>
    <button onclick="state.activeView='transfers'; render();" type="button">Transfer Market</button>
  </div>
  <div class="finance-summary">
    <article><span>Balance</span><strong>${money(club.budget)}</strong></article>
    <article><span>Weekly Wages</span><strong>${wage(wages)}</strong></article>
    <article><span>Wage Budget</span><strong>${wage(club.wageBudget)}</strong></article>
    <article><span>Wage Usage</span><strong>${wageUsage}%</strong></article>
    <article><span>Sales Retained</span><strong>${club.transferRevenueRetained}%</strong><small>board financial rule</small></article>
  </div>
  <section class="finance-ledger">
    ${reports.map(([name, value, note]) => `<article class="${value < 0 ? "expense" : "income"}"><span>${name}</span><strong>${value < 0 ? "-" : "+"}${money(Math.abs(value))}</strong><small>${note}</small></article>`).join("")}
  </section>
  <div class="finance-bars">
    <article><span>Wage control</span><div><b style="width:${clamp(wageUsage, 0, 100)}%"></b></div><small>${wage(club.wageBudget - wages)} room</small></article>
    <article><span>Season P/L</span><div><b style="width:${clamp(((state.financeReport.seasonIncome - state.financeReport.seasonExpenses) + 40_000_000) / 800_000, 4, 100)}%"></b></div><small>${money(state.financeReport.seasonIncome - state.financeReport.seasonExpenses)} net</small></article>
  </div>
  <h3 class="section-heading">Top Earners</h3>
  <table>
    <thead><tr><th>Player</th><th>Role</th><th>Wage</th><th>Contract</th></tr></thead>
    <tbody>${topEarners.map((player) => `<tr><td><strong>${player.name}</strong></td><td>${player.role}</td><td>${wage(player.contract.wage)}</td><td>${player.contract.expires}</td></tr>`).join("")}</tbody>
  </table>`;
}

function label(key) {
  return key.replace(/[A-Z]/g, (letter) => ` ${letter}`).replace(/^./, (letter) => letter.toUpperCase());
}

function roleSuitability(player) {
  const roleKeys = {
    GK: ["agility", "positioning", "decisions", "composure"],
    CB: ["tackling", "positioning", "heading", "strength"],
    FB: ["pace", "stamina", "tackling", "crossing"],
    DM: ["tackling", "positioning", "passing", "workRate"],
    CM: ["passing", "vision", "decisions", "stamina"],
    AM: ["vision", "passing", "dribbling", "firstTouch"],
    W: ["pace", "acceleration", "dribbling", "crossing"],
    ST: ["finishing", "composure", "anticipation", "acceleration"],
  };
  const value = Math.round(average((roleKeys[player.role] ?? roleKeys.CM).map((key) => player.attributes[key] ?? 10)) * 5);
  return {
    value,
    label: value >= 73 ? "Natural" : value >= 59 ? "Accomplished" : "Needs work",
    className: value >= 73 ? "good" : value >= 59 ? "warn" : "bad",
  };
}

function setPieceAttributeKeys(type) {
  return {
    corner: ["crossing", "technique", "passing"],
    freeKick: ["longShots", "technique", "passing"],
    penalty: ["finishing", "composure", "technique"],
  }[type] ?? ["passing", "technique"];
}

function setPieceTakerCandidates(type) {
  const keys = setPieceAttributeKeys(type);
  return firstEleven(state.userTeamId)
    .map((player) => ({ player, score: Math.round(weightedRating(player, keys) * 10) / 10 }))
    .sort((a, b) => b.score - a.score);
}

function setPieceTaker(type, tactic = state.tactics) {
  const normalized = normalizeTactics(tactic);
  const key = `${type}TakerId`;
  const candidates = setPieceTakerCandidates(type);
  return candidates.find(({ player }) => player.id === Number(normalized.setPieces[key])) ?? candidates[0];
}

function setPieceQuality(teamId, tactic = teamById(teamId)?.tactics) {
  if (teamId !== state.userTeamId) return 1;
  const corner = setPieceTaker("corner", tactic)?.score ?? 10;
  const freeKick = setPieceTaker("freeKick", tactic)?.score ?? 10;
  return clamp(0.94 + (corner + freeKick - 20) / 180, 0.9, 1.12);
}

function tacticalAnalytics(tactic = state.tactics) {
  const normalized = normalizeTactics(tactic);
  const eleven = firstEleven(state.userTeamId);
  const warnings = [];
  if (normalized.width >= 15 && normalized.defensiveWidth >= 14) warnings.push("Wide shape leaves larger half-space gaps when possession is lost.");
  if (normalized.line >= 15 && normalized.pressing <= 10) warnings.push("High defensive line is exposed because the press does not protect it.");
  if (normalized.possessionLost === "counterPress" && average(eleven.map((player) => playerStaminaScore(player))) < 70) warnings.push("Counter-press intensity may drain this XI late in the match.");
  const poorFits = eleven.filter((player) => roleSuitability(player).value < 59);
  if (poorFits.length) warnings.push(`${poorFits.length} starter${poorFits.length > 1 ? "s are" : " is"} below the preferred role suitability level.`);
  if (!warnings.length) warnings.push("Shape is balanced. No major structural weakness detected.");
  const cells = Array.from({ length: 15 }, (_, index) => {
    const column = index % 5;
    const row = Math.floor(index / 5);
    const edge = Math.abs(column - 2);
    const attackBias = row === 0 ? normalized.line / 20 : row === 2 ? (20 - normalized.line) / 20 : 0.55;
    const widthBias = edge > 1 ? normalized.width / 20 : normalized.defensiveWidth / 24;
    return clamp(Math.round((attackBias + widthBias) * 42 + ((index * 7 + normalized.width) % 9) - 4), 18, 96);
  });
  return { warnings, cells };
}

function renderTeamInstructionModule(tactics) {
  return `<div class="tactic-module-content">
    <section class="phase-card">
      <h4>In Possession</h4>
      <label>Attacking Width <strong>${tactics.width}</strong><input type="range" min="1" max="20" value="${tactics.width}" onchange="setTactic('width', this.value)" /></label>
      <label>Passing Directness <strong>${tactics.passingDirectness}</strong><input type="range" min="1" max="20" value="${tactics.passingDirectness}" onchange="setTactic('passingDirectness', this.value)" /></label>
      <label>Tempo <strong>${tactics.tempo}</strong><input type="range" min="1" max="20" value="${tactics.tempo}" onchange="setTactic('tempo', this.value)" /></label>
      <label>Focus Play<select onchange="setTactic('focusPlay', this.value)">${["balanced", "left", "centre", "right"].map((item) => `<option value="${item}" ${tactics.focusPlay === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label>
      <label class="toggle-row"><input type="checkbox" ${tactics.passIntoSpace ? "checked" : ""} onchange="setTactic('passIntoSpace', this.checked)" /> Pass Into Space</label>
      <label class="toggle-row"><input type="checkbox" ${tactics.playOutOfDefence ? "checked" : ""} onchange="setTactic('playOutOfDefence', this.checked)" /> Play Out Of Defence</label>
    </section>
    <section class="phase-card">
      <h4>In Transition</h4>
      <label>When Possession Is Lost<select onchange="setTactic('possessionLost', this.value)">${["counterPress", "regroup"].map((item) => `<option value="${item}" ${tactics.possessionLost === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label>
      <label>When Possession Is Won<select onchange="setTactic('possessionWon', this.value)">${["counter", "holdShape"].map((item) => `<option value="${item}" ${tactics.possessionWon === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label>
    </section>
    <section class="phase-card">
      <h4>Out Of Possession</h4>
      <label>Defensive Line <strong>${tactics.line}</strong><input type="range" min="1" max="20" value="${tactics.line}" onchange="setTactic('line', this.value)" /></label>
      <label>Pressing Intensity <strong>${tactics.pressing}</strong><input type="range" min="1" max="20" value="${tactics.pressing}" onchange="setTactic('pressing', this.value)" /></label>
      <label>Defensive Width <strong>${tactics.defensiveWidth}</strong><input type="range" min="1" max="20" value="${tactics.defensiveWidth}" onchange="setTactic('defensiveWidth', this.value)" /></label>
      <label>Marking<select onchange="setTactic('marking', this.value)">${["zonal", "manMark"].map((item) => `<option value="${item}" ${tactics.marking === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label>
    </section>
  </div>`;
}

function renderPlayerRolesModule() {
  const selected = selectedTacticPlayer();
  if (!selected) return "<p>No starting XI available.</p>";
  const suitability = roleSuitability(selected);
  return `<div class="role-editor">
    <div class="role-player-list">
      ${firstEleven(state.userTeamId).map((player) => {
        const fit = roleSuitability(player);
        return `<button class="${selected.id === player.id ? "active" : ""}" onclick="selectTacticPlayer(${player.id})" type="button"><span class="suitability-dot ${fit.className}"></span><b>${shirtNo(player)}</b><strong>${player.name}</strong><small>${player.roleDuty}</small></button>`;
      }).join("")}
    </div>
    <section class="role-editor-form">
      <h4>${selected.name}</h4>
      <p><span class="suitability-dot ${suitability.className}"></span>${suitability.label} suitability | ${suitability.value}%</p>
      <label>Role & Duty<select onchange="setPlayerRoleDuty(${selected.id}, this.value)">${(ROLE_DUTY_OPTIONS[selected.role] ?? [`${selected.role} Support`]).map((item) => `<option ${selected.roleDuty === item ? "selected" : ""}>${item}</option>`).join("")}</select></label>
      <label>Passing<select onchange="setPlayerInstruction(${selected.id}, 'passing', this.value)">${["short", "mixed", "direct"].map((item) => `<option value="${item}" ${selected.instructions?.passing === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label>
      <label>Risk Taking<select onchange="setPlayerInstruction(${selected.id}, 'risk', this.value)">${["lower", "normal", "higher"].map((item) => `<option value="${item}" ${selected.instructions?.risk === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label>
      <label>Shooting<select onchange="setPlayerInstruction(${selected.id}, 'shooting', this.value)">${["less", "normal", "more"].map((item) => `<option value="${item}" ${(selected.instructions?.shooting ?? "normal") === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label>
    </section>
  </div>`;
}

function renderSetPiecesModule(tactics) {
  const takerSelect = (type, key) => {
    const selectedId = Number(tactics.setPieces[key]);
    return `<select onchange="setTactic('setPieces.${key}', this.value)">${setPieceTakerCandidates(type).slice(0, 7).map(({ player, score }) => `<option value="${player.id}" ${selectedId === player.id ? "selected" : ""}>${player.name} | ${score}</option>`).join("")}</select>`;
  };
  return `<div class="set-piece-grid">
    <section class="phase-card"><h4>Corners</h4><label>Taker Priority${takerSelect("corner", "cornerTakerId")}</label><label>Routine<select onchange="setTactic('setPieces.cornerRoutine', this.value)">${["nearPost", "farPost", "short", "edgeOfArea"].map((item) => `<option value="${item}" ${tactics.setPieces.cornerRoutine === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label></section>
    <section class="phase-card"><h4>Free Kicks</h4><label>Taker Priority${takerSelect("freeKick", "freeKickTakerId")}</label><label>Routine<select onchange="setTactic('setPieces.freeKickRoutine', this.value)">${["bestDelivery", "directShot", "crossFarPost"].map((item) => `<option value="${item}" ${tactics.setPieces.freeKickRoutine === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label></section>
    <section class="phase-card"><h4>Penalties & Throw-ins</h4><label>Penalty Taker${takerSelect("penalty", "penaltyTakerId")}</label><label>Throw-in Routine<select onchange="setTactic('setPieces.throwInRoutine', this.value)">${["retainPossession", "longThrow", "workLine"].map((item) => `<option value="${item}" ${tactics.setPieces.throwInRoutine === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label></section>
  </div>`;
}

function renderAnalyticsModule(tactics) {
  const analytics = tacticalAnalytics(tactics);
  return `<div class="analytics-module">
    <section class="weakness-radar"><h4>Analysis Heatmap</h4><div class="heatmap-grid">${analytics.cells.map((value) => `<i style="--heat:${value}%;" title="Tactical coverage ${value}%"></i>`).join("")}</div></section>
    <section class="analysis-warnings"><h4>Weakness Radar</h4>${analytics.warnings.map((warning) => `<p>${warning}</p>`).join("")}</section>
  </div>`;
}

function renderTacticModule(tactics) {
  if (state.tacticsModule === "roles") return renderPlayerRolesModule();
  if (state.tacticsModule === "setPieces") return renderSetPiecesModule(tactics);
  if (state.tacticsModule === "analytics") return renderAnalyticsModule(tactics);
  return renderTeamInstructionModule(tactics);
}

function renderTactics() {
  const t = state.tactics;
  const normalizedTactics = normalizeTactics(t);
  const matrix = mentalityMatrix(normalizedTactics);
  const familiarity = normalizedTactics.familiarity;
  const avgFamiliarity = Math.round(average(Object.values(familiarity)));
  const opponentId = state.selectedOpponentId === state.userTeamId
    ? state.teams.find((team) => team.id !== state.userTeamId).id
    : state.selectedOpponentId;
  const userTeam = teamById(state.userTeamId);
  const opponent = teamById(opponentId);
  const advice = assistantTacticalAdvice();
  const fluidity = teamFluidityProfile(state.userTeamId, normalizedTactics);

  return `<section class="fm-workspace">
    <div class="panel-header">
      <div><p class="eyebrow">Tactics path</p><h2>Tactical Setup</h2></div>
      <div class="button-row">
        <button onclick="applyAssistantTactics()" type="button">Apply Staff Advice</button>
        <button onclick="resetFreeMoveShape()" type="button">Reset Shape</button>
      </div>
    </div>
    <section class="staff-advice-card tactics-advice">
      <div>
        <p class="eyebrow">Assistant coach recommendation</p>
        <h3>${advice.assistant.name}: ${advice.recommendation.mentality} plan vs ${advice.opponent?.name ?? "next opponent"}</h3>
        <span>Suggested: press ${advice.recommendation.pressing}, tempo ${advice.recommendation.tempo}, width ${advice.recommendation.width}, line ${advice.recommendation.line}. XI condition ${advice.avgCondition}% | stamina ${advice.avgStamina} | fatigue ${advice.avgFatigue}</span>
      </div>
      <button onclick="applyAssistantTactics()" type="button">Apply Plan</button>
    </section>
    <section class="tactical-engine-card">
      <article><span>Risk Threshold</span><strong>${matrix.risk.toFixed(2)}x</strong><small>Higher values prefer killer passes and direct actions.</small></article>
      <article><span>Time On Ball</span><strong>${matrix.urgency.toFixed(2)}x</strong><small>Lower means quicker action decisions.</small></article>
      <article><span>Line / Engage</span><strong>${matrix.line > 0 ? "+" : ""}${matrix.line}</strong><small>Moves defensive and engagement lines.</small></article>
      <article><span>Width Modifier</span><strong>${matrix.width > 0 ? "+" : ""}${matrix.width}</strong><small>Attack spreads wider, defensive plans compact centrally.</small></article>
      <article><span>Team Fluidity</span><strong>${fluidity.label}</strong><small>D ${fluidity.defend} | S ${fluidity.support} | A ${fluidity.attack}</small></article>
      <article><span>Familiarity</span><strong>${avgFamiliarity}%</strong><small>Low values reduce anticipation, decisions, positioning.</small></article>
      <article><span>Team Cohesion</span><strong>${normalizedTactics.cohesion}%</strong><small>Drops after tactical upheaval, grows through matches and training.</small></article>
    </section>
    <div class="staff-advice-list">
      ${advice.reasons.map((reason) => `<article>${reason}</article>`).join("")}
    </div>
    <section class="formation-preset-bar" aria-label="Formation presets">
      <div>
        <p class="eyebrow">Formation presets</p>
        <h3>Choose your tactical shape</h3>
      </div>
      <div class="formation-preset-buttons">
        ${["4-4-2", "4-3-3", "4-2-3-1"].map((formation) => `<button class="${t.formation === formation ? "active" : ""}" data-formation-preset="${formation}" onclick="setTactic('formation', '${formation}')" type="button">${formation}</button>`).join("")}
      </div>
    </section>
    <nav class="tactics-module-tabs" aria-label="Tactics modules">
      ${[
        ["team", "Team Instructions"],
        ["roles", "Player Roles"],
        ["setPieces", "Set Pieces"],
        ["analytics", "Analytics"],
      ].map(([module, text]) => `<button class="${state.tacticsModule === module ? "active" : ""}" onclick="setTacticsModule('${module}')" type="button">${text}</button>`).join("")}
    </nav>
    <div class="fm-tactics-layout">
      ${renderFmFormation(userTeam.id, `${userTeam.name} Formation`, "home")}
      ${renderSubBench(state.userTeamId, "Subs")}
      <section class="fm-panel fm-instructions">
        <header><h3>${state.tacticsModule === "team" ? "Team Instructions" : state.tacticsModule === "roles" ? "Player Roles & Duties" : state.tacticsModule === "setPieces" ? "Set Pieces" : "Tactical Analytics"}</h3></header>
        ${state.tacticsModule === "team" ? `<div class="mentality-control"><label>Mentality<select onchange="setTactic('mentality', this.value)">${["veryDefensive", "defensive", "cautious", "balanced", "positive", "attacking", "veryAttacking"].map((item) => `<option value="${item}" ${normalizedTactics.mentality === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label><label>Creative Freedom<select onchange="setTactic('creativeFreedom', this.value)">${["disciplined", "flexible", "expressive"].map((item) => `<option value="${item}" ${normalizedTactics.creativeFreedom === item ? "selected" : ""}>${label(item)}</option>`).join("")}</select></label></div>` : ""}
        ${renderTacticModule(normalizedTactics)}
      </section>
      <section class="fm-panel tactical-familiarity">
        <header><h3>Tactical Familiarity</h3></header>
        ${Object.entries(familiarity).map(([area, value]) => `<article>
          <span>${label(area)}</span>
          <div><b style="width:${value}%"></b></div>
          <strong>${value}%</strong>
          <button onclick="trainTacticalFamiliarity('${area}')" type="button">Train</button>
        </article>`).join("")}
      </section>
      ${renderFmStatsPanel()}
      ${renderFmEventsPanel()}
    </div>
    ${renderFmSquadStrip(state.userTeamId)}
  </section>`;
}

function renderLeague() {
  const league = currentLeague();
  const movement = state.leagueMovement;
  const movementRules = movement?.rules ?? leagueRules(league);
  const promotedSet = new Set(movement?.promotedTeamIds ?? []);
  const relegatedSet = new Set(movement?.relegatedTeamIds ?? []);
  const pyramidRows = EUROPEAN_LEAGUE_PYRAMID.map(
    (item) => `<article><span>${item.country}</span><strong>${item.top}</strong><small>${item.lower}</small></article>`
  ).join("");
  const rows = state.table
    .map((row, index) => {
      const team = teamById(row.teamId);
      const status = promotedSet.has(row.teamId) ? "Promoted" : relegatedSet.has(row.teamId) ? "Relegated" : "";
      const liveZone = !state.seasonComplete && index >= state.table.length - movementRules.relegation ? "relegation-zone" : "";
      return `<tr class="${status.toLowerCase()} ${liveZone}"><td>${index + 1}</td><td><strong class="table-club">${teamCrest(team, "sm")}${team.name}</strong>${status ? `<small>${status}</small>` : ""}</td><td>${row.played}</td><td>${row.won}</td><td>${row.drawn}</td><td>${row.lost}</td><td>${row.goalsFor - row.goalsAgainst}</td><td>${row.points}</td></tr>`;
    })
    .join("");
  const movementPanel = movement
    ? `<div class="movement-panel">
        <article><span>ตกชั้น</span><strong>${movement.relegatedTeamIds.map((teamId) => teamById(teamId)?.name).filter(Boolean).join(", ") || "None"}</strong></article>
        <article><span>เลื่อนชั้นเข้า</span><strong>${movement.incomingPromoted.map((team) => team.name).join(", ") || "None"}</strong></article>
        ${movement.incomingRelegated?.length ? `<article><span>ตกจากลีกบนเข้า</span><strong>${movement.incomingRelegated.map((team) => team.name).join(", ")}</strong></article>` : ""}
        ${movement.automaticPromotedTeamIds?.length ? `<article><span>เลื่อนชั้นอัตโนมัติ</span><strong>${movement.automaticPromotedTeamIds.map((teamId) => teamById(teamId)?.name).filter(Boolean).join(", ")}</strong></article>` : ""}
        ${movement.playoffWinnerTeamIds?.length ? `<article><span>Playoff Winner</span><strong>${movement.playoffWinnerTeamIds.map((teamId) => teamById(teamId)?.name).filter(Boolean).join(", ")}</strong><small>อันดับ 3-6 แข่งเพลย์ออฟ</small></article>` : ""}
        ${movement.userPromoted ? `<article><span>Your Club</span><strong>Promoted</strong></article>` : ""}
        ${movement.userRelegated ? `<article><span>Your Club</span><strong>Relegated</strong></article>` : ""}
      </div>`
    : "";
  return `<div class="panel-header">
    <div><p class="eyebrow">Table path | ${league.country}</p><h2>${league.name} Table</h2></div>
    ${state.seasonComplete ? `<button onclick="startNextSeason()" type="button">Start Next Season</button>` : ""}
  </div>
  ${movementPanel}
  <table>
    <thead><tr><th>#</th><th>Club</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="engine-notes">
    <p>This league uses a home-and-away schedule: ${state.fixtures.length / 2} home fixtures and ${state.fixtures.length / 2} away fixtures for each club.</p>
    <p>Each simulated week updates table points, goal difference, morale, condition, weekly wages, and match income.</p>
    <p>Promotion/relegation: bottom ${movementRules.relegation ?? 0} go down${movementRules.lowerName ? ` to ${movementRules.lowerName}` : ""}${movementRules.upperName ? `, top ${movementRules.promotion} go up to ${movementRules.upperName}` : ""}.</p>
    ${movementRules.playoff ? `<p>${league.name} rule: top ${movementRules.automaticPromotion} are promoted automatically; positions ${movementRules.playoff.start}-${movementRules.playoff.end} enter a playoff for ${movementRules.playoff.winners} final promotion spot.</p>` : ""}
  </div>
  <section class="league-pyramid-panel">
    <div>
      <p class="eyebrow">European pyramid ready list</p>
      <h3>Main league / lower division</h3>
    </div>
    <div class="league-pyramid-grid">${pyramidRows}</div>
  </section>`;
}

function renderSwissPotSummary(competition) {
  if (competition.type !== "league-phase" || !competition.pots) return "";
  return `<div class="swiss-pot-grid">
    ${Object.entries(competition.pots).map(([key, teams]) => `<article><span>${key.toUpperCase()}</span><strong>${teams.length}</strong><small>${teams.slice(0, 3).map((team) => team.name).join(", ")}</small></article>`).join("")}
  </div>`;
}

function renderSwissStandings(competition) {
  if (competition.type !== "league-phase" || !competition.swissTable?.length) return "";
  const table = sortSwissStandings(competition.swissTable).map((row, index) => ({ ...row, rank: index + 1 }));
  const visible = [
    ...table.slice(0, 8),
    ...table.slice(8, 24).filter((row) => row.user),
    ...table.slice(8, 13),
    ...table.slice(23, 26),
    ...table.slice(32, 36),
  ];
  const uniqueRows = [];
  const seen = new Set();
  visible.forEach((row) => {
    if (seen.has(row.teamId ?? row.name)) return;
    seen.add(row.teamId ?? row.name);
    uniqueRows.push(row);
  });
  return `<div class="swiss-table-shell">
    <div class="swiss-table-header"><strong>League Phase Standing</strong><span>Top 8 direct | 9-24 play-off | 25-36 eliminated</span></div>
    <table class="swiss-standings-table">
      <thead><tr><th>Rank</th><th>Club</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead>
      <tbody>${uniqueRows.map((row) => {
        const zone = row.rank <= 8 ? "direct" : row.rank <= 24 ? "playoff" : "out";
        return `<tr class="${zone} ${row.user ? "user-row" : ""}">
          <td>${row.rank}</td>
          <td><strong>${escapeHtml(row.name)}</strong><small>${escapeHtml(row.country)} | Pot ${row.pot ?? "-"}</small></td>
          <td>${row.played ?? 0}</td>
          <td>${row.won ?? 0}</td>
          <td>${row.drawn ?? 0}</td>
          <td>${row.lost ?? 0}</td>
          <td>${(row.goalDifference ?? 0) > 0 ? "+" : ""}${row.goalDifference ?? 0}</td>
          <td><strong>${row.points ?? 0}</strong></td>
        </tr>`;
      }).join("")}</tbody>
    </table>
  </div>`;
}

function renderCompetitions() {
  const cards = state.competitions
    .map((competition) => `<article class="competition-card ${competition.status}">
      <div>
        <p class="eyebrow">${competition.type === "league-phase" ? "Continental" : "Domestic Cup"}</p>
        <h3>${competition.name}</h3>
      </div>
      <strong>${competition.status.replace("-", " ")}</strong>
      <p>Phase: ${competition.roundLabel}${competition.projectedRank ? ` | Swiss rank ${competition.projectedRank}/36` : ""}</p>
      ${competition.type === "league-phase" ? `<p>Database: ${(competition.contenders?.length ?? 0)} contenders | ${(competition.allFixtures?.length ?? 0)} generated fixture links | User route ${competition.opponentPool?.length ?? 0}/8</p>` : ""}
      ${renderSwissPotSummary(competition)}
      <p>Next slot: ${competition.scheduledDates?.[competition.roundIndex]?.displayDate ?? "No remaining fixture"}${competition.scheduledDates?.[competition.roundIndex] ? ` | Day ${competition.scheduledDates[competition.roundIndex].dayIndex}` : ""}</p>
      <p>Record: ${competition.record.won}W ${competition.record.drawn}D ${competition.record.lost}L | GF ${competition.record.goalsFor} GA ${competition.record.goalsAgainst} | Pts ${competition.record.points}</p>
      <p>${competition.rules?.format ?? "Cup format"}${competition.rules?.sameCountryBlocked ? " | same-country blocked" : ""}${competition.rules?.awayGoals === false ? " | no away goals" : ""}</p>
      ${renderSwissStandings(competition)}
      <ol>
        ${(competition.history.length ? competition.history : ["No fixtures played yet."])
          .slice(0, 5)
          .map((item) => `<li>${item}</li>`)
          .join("")}
      </ol>
    </article>`)
    .join("");

  return `<div class="panel-header">
    <div><p class="eyebrow">Cups and Europe</p><h2>Competitions</h2></div>
    <button onclick="simulateWeek()" type="button">Simulate Week</button>
  </div>
  <div class="competition-grid">${cards}</div>
  <div class="engine-notes">
    <p>${currentLeague().domesticCup} uses tiered domestic-cup ingestion: lower tiers enter early, top divisions enter around the Round of 64, then single-match knockout with extra time and penalties.</p>
    <p>UEFA competitions use the modern 36-team Swiss league phase: four pots, eight fixtures, four home and four away, no same-country opponents and no repeat opponents.</p>
    <p>League phase progression: 1-8 qualify for Round of 16, 9-24 enter a two-legged play-off, 25-36 are eliminated. Away goals are disabled.</p>
    <p>Drop-down logic exists as an optional rule flag, but modern UCL/UEL seasons eliminate league-phase losers directly instead of sending them into a lower cup.</p>
  </div>`;
}

function renderChampionBanner() {
  const notice = state.latestChampionNotice;
  if (!notice) return "";
  const team = teamById(notice.teamId) ?? { name: notice.teamName, logo: notice.logo };
  return `<section class="champion-banner">
    ${teamCrest(team, "lg")}
    <div>
      <p class="eyebrow">${notice.type === "league" ? "League champions" : "Cup winners"}</p>
      <h3>${notice.teamName} win ${notice.competitionName}</h3>
      <span>${notice.season}</span>
    </div>
  </section>`;
}

function renderHonors() {
  const userHonors = state.honors.filter((honor) => honor.teamId === state.userTeamId);
  const allHonors = state.honors;
  const userTeam = teamById(state.userTeamId);
  return `<div class="panel-header">
    <div><p class="eyebrow">Champions and trophies</p><h2>Honors</h2></div>
    ${state.seasonComplete ? `<button onclick="startNextSeason()" type="button">Start Next Season</button>` : ""}
  </div>
  ${renderChampionBanner()}
  <div class="honors-grid">
    <article class="honor-card main">
      ${teamCrest(userTeam, "lg")}
      <div>
        <p class="eyebrow">Your trophy cabinet</p>
        <h3>${userTeam.name}</h3>
        <strong>${userHonors.length} trophy${userHonors.length === 1 ? "" : "ies"}</strong>
      </div>
    </article>
    <article class="honor-card">
      <p class="eyebrow">Current season</p>
      <h3>${seasonLabel()}</h3>
      <span>${state.seasonComplete ? "Completed" : `Matchweek ${state.week}/${state.fixtures.length}`}</span>
    </article>
  </div>
  <h3 class="section-heading">Your Honors</h3>
  <div class="honor-list">
    ${(userHonors.length ? userHonors : [{ competitionName: "No trophies yet", season: "Win a league or cup to add one here.", teamName: userTeam.name, teamId: userTeam.id, logo: userTeam.logo, type: "none" }])
      .map((honor) => `<article class="honor-row">
        ${teamCrest(teamById(honor.teamId) ?? { name: honor.teamName, logo: honor.logo }, "md")}
        <div><strong>${honor.competitionName}</strong><span>${honor.season}</span></div>
      </article>`)
      .join("")}
  </div>
  <h3 class="section-heading">World Roll Of Honor</h3>
  <div class="honor-list">
    ${(allHonors.length ? allHonors : [])
      .map((honor) => `<article class="honor-row">
        ${teamCrest(teamById(honor.teamId) ?? { name: honor.teamName, logo: honor.logo }, "md")}
        <div><strong>${honor.teamName}</strong><span>${honor.competitionName} - ${honor.season}</span></div>
      </article>`)
      .join("") || `<article class="honor-row empty"><div><strong>No champions recorded yet</strong><span>Finish a season or win a cup.</span></div></article>`}
  </div>`;
}

function renderTransfers() {
  const club = teamById(state.userTeamId);
  const desiredRows = positionalNeedMatrix(club).slice(0, 5);
  const query = state.transferSearch.trim().toLowerCase();
  const allTransferPlayers = [...state.players, ...state.transferMarket];
  const roles = ["ALL", ...new Set(allTransferPlayers.map((player) => player.role))];
  const filteredMarketPlayers = state.transferMarket
    .filter((player) => state.transferRoleFilter === "ALL" || player.role === state.transferRoleFilter)
    .filter((player) => transferPlayerMatches(player, query))
    .sort((a, b) => b.value - a.value || b.hidden.potentialAbility - a.hidden.potentialAbility);
  const filteredAllPlayers = allTransferPlayers.filter((player) => state.transferRoleFilter === "ALL" || player.role === state.transferRoleFilter);
  const saleList = listedForSalePlayers().filter(({ player, team }) =>
    (state.transferRoleFilter === "ALL" || player.role === state.transferRoleFilter) &&
    (!query || `${player.name} ${player.role} ${team.name}`.toLowerCase().includes(query))
  );
  const freeAgents = state.transferMarket.filter((player) => player.freeAgent && (state.transferRoleFilter === "ALL" || player.role === state.transferRoleFilter));
  const activeLedger = state.selectedLeagueId === "esp-la-liga" ? LALIGA_TRANSFER_LEDGER_2526 : REAL_TRANSFER_LEDGER_2526;
  const ledgerRows = activeLedger
    .filter((item) => !query || `${item.player} ${item.from} ${item.to} ${item.role}`.toLowerCase().includes(query))
    .map((item) => `<tr>
      <td><strong>${escapeHtml(item.player)}</strong><small>${item.role} | ${item.type}</small></td>
      <td>${escapeHtml(item.from)}</td>
      <td>${escapeHtml(item.to)}</td>
      <td>${money(item.fee)}</td>
      <td><small>${item.source}</small></td>
    </tr>`)
    .join("");
  const wageRoom = club.wageBudget - playersForTeam(club.id).reduce((sum, player) => sum + player.contract.wage, 0);
  return `<div class="panel-header">
    <div><p class="eyebrow">Transfer path | 25/26 market hub</p><h2>Recruitment Market</h2></div>
    <div class="button-row"><button onclick="refreshMarket(); addFeed('Scouting list refreshed.'); render();" type="button">Refresh Shortlist</button><button onclick="state.activeView='news'; render();" type="button">Transfer News</button></div>
  </div>
  <section class="market-hero">
    <article><span>Transfer Budget</span><strong>${money(club.budget)}</strong><small>${club.name}</small></article>
    <article><span>Wage Room</span><strong>${wage(wageRoom)}</strong><small>available per week</small></article>
    <article><span>Players Database</span><strong>${state.players.length}</strong><small>all clubs in active league</small></article>
    <article><span>Free Agents</span><strong>${freeAgents.length}</strong><small>unattached contract list</small></article>
  </section>
  <section class="tactical-engine-card">
    ${desiredRows.map((row) => `<article><span>${row.role} Need</span><strong>${row.good}/${row.need}</strong><small>${row.expiring} expiring | need score ${row.score}</small></article>`).join("")}
  </section>
  <section class="market-toolbar">
    <label>Search player / club
      <input value="${escapeHtml(state.transferSearch)}" placeholder="Search name, position, club" oninput="setTransferSearch(this.value)" />
    </label>
    <label>Position
      <select onchange="setTransferRoleFilter(this.value)">
        ${roles.map((role) => `<option value="${role}" ${role === state.transferRoleFilter ? "selected" : ""}>${role === "ALL" ? "All positions" : role}</option>`).join("")}
      </select>
    </label>
    <article><span>Search Result</span><strong>${filteredAllPlayers.filter((player) => transferPlayerMatches(player, query)).length}</strong><small>all players + free agents</small></article>
  </section>
  <h3 class="section-heading">All Players In Active League</h3>
  <div class="market-table-shell">
    <table class="market-table">
      <thead><tr><th>#</th><th>Player</th><th>Club</th><th>Market value</th><th>Wage / Contract</th><th>Morale</th><th></th></tr></thead>
      <tbody>${renderTransferRows(filteredAllPlayers, query, 120)}</tbody>
    </table>
  </div>
  <h3 class="section-heading">บัญชีซื้อขาย 25/26 | Buys And Sales Ledger</h3>
  <div class="market-table-shell">
    <table class="market-table compact">
      <thead><tr><th>Player</th><th>From</th><th>To</th><th>Fee</th><th>Source</th></tr></thead>
      <tbody>${ledgerRows || `<tr><td colspan="5"><strong>No ledger rows found</strong><small>Adjust search.</small></td></tr>`}</tbody>
    </table>
  </div>
  <h3 class="section-heading">รายชื่อขึ้นบัญชีขาย | Listed For Sale</h3>
  <div class="market-table-shell">
    <table class="market-table">
      <thead><tr><th>#</th><th>Player</th><th>Club</th><th>Value</th><th>Wage / Contract</th><th>Reason</th><th></th></tr></thead>
      <tbody>${saleList.map(({ player, team, reason }, index) => `<tr>
        <td><span class="market-rank">${index + 1}</span></td>
        <td><div class="market-player-cell"><span class="market-shirt">${shirtNo(player, player.role)}</span><div><strong>${escapeHtml(player.name)}</strong><small>${player.age} yrs | ${player.role}</small></div></div></td>
        <td><span class="table-club">${teamCrest(team, "sm")}${team.name}</span></td>
        <td>${money(player.value)}<small>${marketTrend(player)}</small></td>
        <td>${wage(player.contract.wage)}<small>${player.contract.expires}</small></td>
        <td>${reason}<small>club sale logic</small></td>
        <td>${team.id === state.userTeamId ? "<small>Your squad</small>" : `<button onclick="buyClubPlayer(${player.id})" type="button">Bid</button>`}</td>
      </tr>`).join("") || `<tr><td colspan="7"><strong>No listed players found</strong><small>Clubs list players when budgets, contracts, morale, or squad roles create pressure.</small></td></tr>`}</tbody>
    </table>
  </div>
  <h3 class="section-heading">Free Agents</h3>
  <div class="market-table-shell">
    <table class="market-table">
      <thead><tr><th>#</th><th>Player</th><th>Status</th><th>Value</th><th>Wage / Contract</th><th>Morale</th><th></th></tr></thead>
      <tbody>${renderTransferRows(freeAgents, query, 40)}</tbody>
    </table>
  </div>
  <div class="engine-notes">
    <p>Player database uses the active league squads plus unattached free-agent seeds. Market values sync once per career through the configured Transfermarkt API or the offline Transfermarkt-style valuation model.</p>
    <p>The 25/26 ledger is a reference seed for real-world style moves. In-game transfers after week simulation are added to News and obey club budget, wage room, morale and sale-list pressure.</p>
  </div>`;
}

function renderNews() {
  const rows = state.transferNews.length
    ? state.transferNews
    : [{ week: state.week, season: seasonLabel(), type: "market", headline: "No transfer news yet", body: "Run Market Sync or simulate transfer-window weeks to generate buying and selling news." }];
  const transferWindow = transferWindowOpen() ? "Open" : "Closed";
  const apiUrl = state.transferApiBaseUrl || "";
  return `<div class="panel-header">
    <div><p class="eyebrow">News path</p><h2>Transfer News Hub</h2></div>
    <div class="button-row">
      <button onclick="syncMarketDataFromTransfermarktApi()" type="button" ${state.initialMarketSyncDone || state.initialMarketSyncRunning ? "disabled" : ""}>One-Time API Sync</button>
      <button onclick="simulateAITransferActivity(state.week, true); render();" type="button">Generate News</button>
      <button onclick="state.activeView='transfers'; render();" type="button">Market</button>
    </div>
  </div>
  <div class="api-panel">
    <label for="transferApiBaseUrl">Transfermarkt API Base URL</label>
    <div class="api-row">
      <input id="transferApiBaseUrl" value="${apiUrl}" placeholder="https://transfermarkt-api.fly.dev" onchange="setTransferApiBaseUrl(this.value)" />
      <label for="transferApiLimit">Limit</label>
      <input id="transferApiLimit" type="number" min="1" max="12" value="${state.transferApiLimit}" onchange="setTransferApiLimit(this.value)" />
    </div>
    <small>Runs once when the career starts. Uses felipeall/transfermarkt-api routes: /players/search/{name} and /players/{id}/market_value. Public demo can be rate limited; self-hosted localhost works too.</small>
  </div>
  <div class="dashboard">
    <article><span>Transfer Window</span><strong>${transferWindow}</strong></article>
    <article><span>Market Source</span><strong>${state.marketSource}</strong></article>
    <article><span>Updated</span><strong>${state.marketDataUpdatedAt ?? "Pending"}</strong></article>
    <article><span>API Status</span><strong>${state.transferApiStatus}</strong></article>
  </div>
  <div class="engine-notes">
    <p>API Sync runs once at career start to avoid real-time calls. If CORS, rate limits or missing players block live data, the same one-time sync falls back to the offline model.</p>
    <p>AI clubs buy realistically only when transfer window, budget and wage structure allow it. User players are protected from automatic AI sales.</p>
  </div>
  <div class="news-list">
    ${rows.map((item) => `<article class="news-card ${item.type}">
      <span>Week ${item.week} | ${item.season} | ${item.type}</span>
      <h3>${item.headline}</h3>
      <p>${item.body}</p>
    </article>`).join("")}
  </div>`;
}

function renderStartScreen() {
  if (!state.careerSetupMode) return renderCareerChoiceScreen();
  const selectedTeam = teamById(state.pendingTeamId);
  const selectedLeague = pendingLeague();
  const customLeague = LEAGUE_CATALOG.find((league) => league.id === state.customLeagueId) ?? selectedLeague;
  const customLeagueProfile = leagueDataProfile(customLeague);
  const squad = playersForTeam(state.pendingTeamId).sort((a, b) => playerScore(b) - playerScore(a)).slice(0, 5);
  const teamCards = state.teams
    .map((team) => `<button class="team-pick ${team.id === state.pendingTeamId ? "selected" : ""}" onclick="previewStartTeam(${team.id})" type="button">
      ${teamCrest(team, "lg")}
      <strong>${team.name}</strong>
      <span>Rep ${team.reputation} | Budget ${money(team.budget)}</span>
      <small>${team.logoType === "real" ? "Real crest" : "Generated club crest"}</small>
    </button>`)
    .join("");

  return `<section class="start-screen fm-start-screen">
    <div class="fm-menu-corner left">
      <button aria-label="Back to league selection" onclick="backToCareerChoice()" type="button">X</button>
    </div>
    <div class="fm-menu-corner right">
      <button aria-label="Open game guide" onclick="startGame('engine')" type="button">?</button>
    </div>
    <div class="fm-menu-top">
      <button class="top-icon" onclick="backToCareerChoice()" aria-label="Back to league selection" type="button"><span></span></button>
      <button class="top-logo" onclick="startGame('clubInfo')" type="button">FM</button>
      <button class="top-flash" onclick="startGame('match')" aria-label="Start at match screen" type="button"><span></span></button>
    </div>
    <div class="start-copy fm-start-hero">
      <p class="eyebrow">${state.careerSetupMode === "create" ? "Create your new team" : `Select ${selectedLeague.name} team`}</p>
      <h2>${state.careerSetupMode === "create" ? "Your New Team" : selectedLeague.name} Career</h2>
      <p>${state.careerSetupMode === "create" ? "Your custom club starts in the selected league with a starter squad, transfer budget, and full season schedule." : `Choose one of the ${selectedLeague.name} clubs, then start your manager career.`}</p>
    </div>
    <div class="fm-menu-search">
      <div><span class="search-symbol"></span><strong>SELECT TEAM...</strong></div>
      <div><span class="clock-symbol"></span><strong>${selectedLeague.name}</strong></div>
    </div>
    <div class="manager-profile-form">
      <label>Coach First Name
        <input value="${escapeHtml(state.manager.firstName)}" maxlength="24" oninput="updateManagerField('firstName', this.value)" placeholder="First name" />
      </label>
      <label>Coach Last Name
        <input value="${escapeHtml(state.manager.lastName)}" maxlength="24" oninput="updateManagerField('lastName', this.value)" placeholder="Last name" />
      </label>
      <label>Nationality
        <select aria-label="Manager Nationality" onchange="updateManagerField('nationality', this.value)">
          ${["England", "Thailand", "Spain", "Italy", "Germany", "France", "Portugal", "Brazil", "Argentina", "Japan", "South Korea", "United States"].map((nation) => `<option value="${nation}" ${nation === state.manager.nationality ? "selected" : ""}>${nation}</option>`).join("")}
        </select>
      </label>
      <label>Coaching Style
        <select aria-label="Manager Coaching Style" onchange="updateManagerField('coachingStyle', this.value)">
          ${["Balanced", "Tactical", "Attacking", "Defensive", "Development", "Motivator"].map((style) => `<option value="${style}" ${style === state.manager.coachingStyle ? "selected" : ""}>${style}</option>`).join("")}
        </select>
      </label>
    </div>
    ${state.careerSetupMode === "create" ? `<div class="custom-team-form">
      <label>Team Name
        <input value="${escapeHtml(state.customTeamName)}" maxlength="32" onchange="updateCustomTeamName(this.value)" oninput="state.customTeamName=this.value" placeholder="Your New Team FC" />
      </label>
      <label>Manual League Select
        <select aria-label="Manual League Select" onchange="selectCustomLeague(this.value)">
          ${LEAGUE_CATALOG.filter((league) => REAL_PLAYABLE_LEAGUE_IDS.includes(league.id)).map((league) => {
            const profile = leagueDataProfile(league);
            return `<option value="${league.id}" ${league.id === state.customLeagueId ? "selected" : ""}>${league.country} - ${league.name} | ${profile.status}</option>`;
          }).join("")}
        </select>
      </label>
      <article>
        <p class="eyebrow">League Information</p>
        <h3>${customLeague.name}</h3>
        <span>${customLeague.country} | ${customLeague.teams} clubs | Level ${customLeague.level} | ${customLeague.domesticCup} | ${customLeague.continent}</span>
      </article>
      <article class="league-data-card">
        <p class="eyebrow">Real Data Coverage</p>
        <h3>${customLeagueProfile.status}</h3>
        <span>${customLeagueProfile.coverage}</span>
        <small>${customLeagueProfile.source}</small>
      </article>
    </div>` : `<label class="league-picker fm-league-picker">League
      <select aria-label="League" onchange="selectStartLeague(this.value)">
        ${REAL_PLAYABLE_LEAGUE_IDS.map((leagueId) => {
          const league = LEAGUE_CATALOG.find((item) => item.id === leagueId);
          return `<option value="${league.id}" ${league.id === state.pendingLeagueId ? "selected" : ""}>${league.country} - ${league.name}</option>`;
        }).join("")}
      </select>
      <span>${selectedLeague.teams} clubs | ${selectedLeague.domesticCup} | ${selectedLeague.continent}</span>
    </label>`}
    <div class="start-layout">
      <div class="team-grid">${teamCards}</div>
      <aside class="start-preview">
        <h3 class="crest-heading">${teamCrest(selectedTeam, "lg")}${selectedTeam.name}</h3>
        <p>Transfer budget ${money(selectedTeam.budget)} | Wage budget ${wage(selectedTeam.wageBudget)} | ${selectedTeam.logoType === "real" ? "real crest loaded" : "generated crest"}</p>
        <h4>Manager</h4>
        <ol>
          <li><strong>${escapeHtml(managerFullName())}</strong><span>${escapeHtml(state.manager.nationality)} | ${escapeHtml(state.manager.coachingStyle)} coaching style</span></li>
        </ol>
        <h4>Key Players</h4>
        <ol>
          ${squad.map((player) => `<li><strong>${player.name}</strong><span>${player.role} | CA ${player.hidden.currentAbility} | Contract ${player.contract.expires}</span></li>`).join("")}
        </ol>
        <button class="start-button" onclick="startGame('menu')" type="button">Start Career</button>
        <button class="start-button secondary" onclick="backToCareerChoice()" type="button">Back</button>
      </aside>
    </div>
  </section>`;
}

function renderCareerChoiceScreen() {
  const quickLeagueCards = [
    ["premier", "England", "Premier League", "Arsenal, Liverpool, Man City, Chelsea"],
    ["championship", "England", "Championship", "Leicester, Southampton, Wrexham"],
    ["leagueone", "England", "League One", "Cardiff, Luton, Bolton, Reading"],
    ["leaguetwo", "England", "League Two", "Bristol Rovers, MK Dons, Notts County"],
    ["laliga", "Spain", "LALIGA EA SPORTS", "Real Madrid, Barcelona, Atletico"],
    ["hypermotion", "Spain", "LALIGA HYPERMOTION", "Almeria, Cadiz, Granada"],
    ["seriea", "Italy", "Lega Serie A", "Inter, Juventus, Milan, Napoli"],
    ["serieb", "Italy", "Serie B", "Palermo, Sampdoria, Venezia"],
    ["bundesliga", "Germany", "Bundesliga", "Bayern, Dortmund, Leverkusen"],
    ["bundesliga2", "Germany", "Bundesliga 2", "Schalke, Hertha, Bochum"],
    ["ligue1", "France", "Ligue 1 McDonald's", "PSG, Marseille, Monaco, Lyon"],
    ["ligue2", "France", "Ligue 2 BKT", "Saint-Etienne, Reims, Montpellier"],
  ];
  return `<section class="start-screen fm-start-screen career-choice-screen">
    <div class="fm-menu-corner left">
      <button aria-label="Back to loading screen" onclick="state.introComplete=false; render();" type="button">X</button>
    </div>
    <div class="fm-menu-corner right">
      <button aria-label="Open game guide" onclick="chooseCareerSetup('premier'); startGame('engine')" type="button">?</button>
    </div>
    <div class="fm-menu-top">
      <button class="top-icon" onclick="openStartMenu()" aria-label="League selection grid" type="button"><span></span></button>
      <button class="top-logo" onclick="chooseCareerSetup('premier'); startGame('clubInfo');" aria-label="Start default club info" type="button">TF25</button>
      <button class="top-flash" onclick="chooseCareerSetup('premier'); startGame('match');" aria-label="Quick start match screen" type="button"><span></span></button>
    </div>
    <div class="start-copy fm-start-hero">
      <p class="eyebrow">Career setup</p>
      <h2>Choose Your Start</h2>
      <p>Create a new club for the Premier League or manage a real Premier League team.</p>
    </div>
    <div class="career-choice-grid">
      <button class="career-choice-card create" onclick="chooseCareerSetup('create')" type="button">
        <span>Create</span>
        <strong>Create Your New Team</strong>
        <p>Build a new club in the Premier League with generated players, budget, contracts, and a full 38-match season.</p>
      </button>
      ${quickLeagueCards.map(([mode, country, name, examples]) => `<button class="career-choice-card premier" onclick="chooseCareerSetup('${mode}')" type="button">
        <span>${country}</span>
        <strong>Select With Team ${name}</strong>
        <p>${examples}</p>
      </button>`).join("")}
    </div>
  </section>`;
}

function renderLoadingMenu() {
  return `<section class="loading-menu" onclick="openStartMenu()" role="button" tabindex="0" aria-label="Start Tactic Football 25">
    <div class="loading-stadium">
      <div class="loading-lights"></div>
      <div class="loading-stands"></div>
      <div class="loading-pitch"></div>
      <div class="loading-manager"></div>
      <div class="loading-official"></div>
      <div class="loading-title">
        <h1><span>TACTIC</span><span>FOOTBALL</span><b>25</b></h1>
      </div>
      <span class="loading-tag left">#NEWS</span>
      <span class="loading-tag right">#MAINSTAND</span>
      <button class="loading-start" onclick="event.stopPropagation(); openStartMenu();" type="button">Click To Start</button>
    </div>
  </section>`;
}

function playerFrameSummary(framePlayer) {
  const player = state.players.find((candidate) => candidate.id === framePlayer.id);
  return {
    id: framePlayer.id,
    name: player?.name ?? `Player ${framePlayer.id}`,
    shirt: player ? shirtNo(player) : null,
    team: framePlayer.team,
    role: player?.role ?? null,
    pos: {
      x: Number(framePlayer.pos[0].toFixed(1)),
      y: Number(framePlayer.pos[1].toFixed(1)),
      z: Number((framePlayer.pos[2] ?? 0).toFixed(1)),
    },
    dir: {
      x: Number((framePlayer.dir[0] ?? 0).toFixed(2)),
      y: Number((framePlayer.dir[1] ?? 0).toFixed(2)),
    },
    speed: Number((framePlayer.speed ?? 0).toFixed(2)),
    anim_state: framePlayer.anim_state,
    condition: player?.condition ?? null,
    fatigue: player?.fatigue ?? null,
    morale: player?.contract?.morale ?? null,
  };
}

function buildMatchViewJson() {
  const nextFixture = nextUserFixture();
  const match = state.lastMatch;
  const live = state.matchdayPhase === "half" && match;
  const frames = buildMatchStateFrames(match);
  const frame = frames.at(-1);
  const home = match ? teamById(match.homeId) : nextFixture ? teamById(nextFixture.homeId) : teamById(state.userTeamId);
  const away = match ? teamById(match.awayId) : nextFixture ? teamById(nextFixture.awayId) : teamById(state.selectedOpponentId);
  const score = match
    ? live ? visibleMatchScore(match) : match.score
    : { home: 0, away: 0 };
  const latestEvent = match?.replay?.at(-1) ?? null;
  const trace = match?.engineTrace ?? {};
  const lastCommand = trace.translationCommands?.at(-1) ?? frame?.ball?.visualCommand ?? null;
  const lastDecision = trace.lastDecision ?? null;
  const lastDuel = trace.lastDuel ?? null;
  const homeLineup = match?.lineups?.home?.map((id) => state.players.find((player) => player.id === id)).filter(Boolean) ?? firstEleven(home?.id);
  const awayLineup = match?.lineups?.away?.map((id) => state.players.find((player) => player.id === id)).filter(Boolean) ?? firstEleven(away?.id);

  return {
    feed_version: "match-view.v2",
    generated_at: new Date().toISOString(),
    situation: live ? "LIVE_HALF_TIME_STATE" : match ? "LAST_COMPLETED_MATCH_PLUS_NEXT_FIXTURE" : "PRE_MATCH_NEXT_FIXTURE",
    calendar: {
      season: seasonLabel(),
      current_date: state.currentDate,
      matchweek: state.week,
      next_fixture: nextFixture
        ? {
            week: nextFixture.week,
            date: nextFixture.isoDate,
            display_date: nextFixture.date,
            kickoff: nextFixture.kickoff,
            home: teamById(nextFixture.homeId).name,
            away: teamById(nextFixture.awayId).name,
          }
        : null,
    },
    scoreboard: {
      phase: state.matchdayPhase,
      minute: frame?.minute ?? (live ? 45 : match ? 90 : 0),
      second: Math.round(frame?.second ?? 0),
      home: { id: home?.id ?? null, name: home?.name ?? "Home", score: score.home },
      away: { id: away?.id ?? null, name: away?.name ?? "Away", score: score.away },
      weather: match?.weather ?? "not_generated",
      pitch: match?.environment?.pitchKey ?? "not_generated",
    },
    tactical_context: {
      home: {
        formation: home?.tactics?.formation ?? "4-3-3",
        mentality: home?.tactics?.mentality ?? "balanced",
        possession: match?.stats?.home?.possession ?? 0,
        xg: Number((match?.stats?.home?.xg ?? 0).toFixed(2)),
        shots: match?.stats?.home?.shots ?? 0,
      },
      away: {
        formation: away?.tactics?.formation ?? "4-3-3",
        mentality: away?.tactics?.mentality ?? "balanced",
        possession: match?.stats?.away?.possession ?? 0,
        xg: Number((match?.stats?.away?.xg ?? 0).toFixed(2)),
        shots: match?.stats?.away?.shots ?? 0,
      },
      home_advantage: match?.analysis?.fanPower ?? homeFanPower(home?.id ?? state.userTeamId),
      counter_press: trace.counterPress
        ? { side: trace.counterPress.side, count: trace.counterPress.count, expires_tick: trace.counterPress.expiresTick }
        : null,
    },
    current_frame: frame
      ? {
          tick: frame.tick,
          ball: {
            state: frame.ball.state,
            pos: {
              x: Number(frame.ball.pos[0].toFixed(1)),
              y: Number(frame.ball.pos[1].toFixed(1)),
              z: Number(frame.ball.pos[2].toFixed(1)),
            },
            spin: {
              curve: Number((frame.ball.spin[0] ?? 0).toFixed(2)),
              lift: Number((frame.ball.spin[1] ?? 0).toFixed(2)),
            },
          },
          players: frame.players.map(playerFrameSummary),
        }
      : null,
    contextual_translation: {
      last_decision: lastDecision,
      visual_command: lastCommand,
      active_ragdoll: lastDuel
        ? {
            enabled: lastDuel.activeRagdoll,
            collision_force: lastDuel.collisionForce,
            ragdoll_impulse: Number((lastDuel.ragdollImpulse ?? 0).toFixed(2)),
            winner: lastDuel.winner,
          }
        : null,
      render_policy: {
        engine_is_source_of_truth: true,
        visualizer_is_read_only: true,
        interpolation: "LERP players, Hermite ball-Z",
        fallback: "CSS pitch if Three.js is unavailable",
      },
    },
    latest_event: latestEvent
      ? {
          minute: latestEvent.minute,
          type: latestEvent.type,
          team: latestEvent.teamName,
          player: latestEvent.player,
          assist: latestEvent.assist,
          text: latestEvent.text,
          camera: latestEvent.camera,
        }
      : null,
    lineups: {
      home: homeLineup.map((player) => ({ id: player.id, shirt: shirtNo(player), name: player.name, role: player.role, condition: player.condition })),
      away: awayLineup.map((player) => ({ id: player.id, shirt: shirtNo(player), name: player.name, role: player.role, condition: player.condition })),
    },
  };
}

function renderMatchJsonView() {
  const data = buildMatchViewJson();
  const match = state.lastMatch;
  const frameCount = buildMatchStateFrames(match).length;
  const json = escapeHtml(JSON.stringify(data, null, 2));
  return `<section class="json-match-panel">
    <div class="panel-header compact">
      <div><p class="eyebrow">JSON Match View</p><h3>Live Data Feed</h3></div>
      <button onclick="state.activeView='match'; render();" type="button">Open Match</button>
    </div>
    <div class="json-summary-grid">
      <article><span>Situation</span><strong>${data.situation.replaceAll("_", " ")}</strong></article>
      <article><span>Score</span><strong>${data.scoreboard.home.name} ${data.scoreboard.home.score}-${data.scoreboard.away.score} ${data.scoreboard.away.name}</strong></article>
      <article><span>Frames</span><strong>${frameCount}</strong><small>${data.contextual_translation.render_policy.interpolation}</small></article>
      <article><span>Visual Command</span><strong>${data.contextual_translation.visual_command?.action ?? "Waiting"}</strong><small>Read-only render instruction</small></article>
    </div>
    <pre class="json-match-view"><code>${json}</code></pre>
  </section>`;
}

function renderEngine() {
  return `<div class="panel-header"><div><p class="eyebrow">Core logic</p><h2>Rule-Based Match Engine</h2></div></div>
  ${renderMatchJsonView()}
  <div class="logic-list">
    <article><h3>1. Time-slice simulation</h3><p>The engine runs at ${MATCH_LOGIC_TICK_RATE} logic ticks per second. Each tick assesses 23 objects: 22 players plus the independent ball vector.</p></article>
    <article><h3>2. 255 internal scale</h3><p>Visible 1-20 attributes are converted to a 1-255 internal rating, then blended with CA, condition, fatigue, morale, form and hidden consistency.</p></article>
    <article><h3>3. CA and PA model</h3><p>Attributes have positional CA weights, weak-foot tax and PA hard caps. Young players can roll negative PA ranges, then grow through age, professionalism, determination and match exposure.</p></article>
    <article><h3>4. Hidden modifiers</h3><p>Consistency can reduce technical and mental attributes for a match, Important Matches can trigger choke states, and Injury Proneness works with collision force and low condition.</p></article>
    <article><h3>5. Decision loop</h3><p>Players think on intervals based on Anticipation, Decisions and Composure, then scan a cone of vision to generate weighted pass, dribble, recycle and shot options.</p></article>
    <article><h3>6. Tactical matrix</h3><p>Mentality controls risk threshold, urgency, engagement line and width. Team instructions filter decisions such as pass into space, play out and counter-press.</p></article>
    <article><h3>7. Roles and freedom</h3><p>Duties move players behind, level with or ahead of the ball. Role overrides handle inverted wing-backs and target forwards, while creative freedom changes Flair and discipline weighting.</p></article>
    <article><h3>8. Ball and duels</h3><p>The ball has X/Y/Z, velocity and ownership state. Passes use target vectors with error margins, while 1v1s use attacker-versus-defender dice rolls.</p></article>
    <article><h3>9. Zonal familiarity</h3><p>Eight familiarity bars reduce or protect Anticipation, Decisions and Positioning. Low familiarity creates slower reactions, drift and offside-line risk.</p></article>
    <article><h3>10. Runtime pipeline</h3><p>Pre-match builds environmental matrix and match-ready stats. Each tick updates physics, scans passing lanes, rolls decisions, stores rewind buffer, and lets half-time shouts inject new modifiers before the second-half loop.</p></article>
  </div>`;
}

function renderSchema() {
  return `<div class="panel-header"><div><p class="eyebrow">Relational database structure</p><h2>SQL Schema</h2></div></div>
  <pre><code>${SQL_SCHEMA.replaceAll("<", "&lt;")}</code></pre>`;
}

const SQL_SCHEMA = `CREATE TABLE clubs (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  reputation INTEGER NOT NULL CHECK (reputation BETWEEN 1 AND 100),
  transfer_budget INTEGER NOT NULL,
  wage_budget INTEGER NOT NULL,
  morale INTEGER NOT NULL CHECK (morale BETWEEN 1 AND 20)
);

CREATE TABLE players (
  id INTEGER PRIMARY KEY,
  club_id INTEGER REFERENCES clubs(id),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  age INTEGER NOT NULL,
  nationality TEXT NOT NULL,
  primary_nationality TEXT NOT NULL,
  secondary_nationality TEXT NOT NULL,
  language TEXT NOT NULL,
  joined_season INTEGER NOT NULL,
  height_cm INTEGER NOT NULL,
  weight_kg INTEGER NOT NULL,
  condition INTEGER NOT NULL CHECK (condition BETWEEN 1 AND 100),
  value INTEGER NOT NULL,
  current_ability INTEGER NOT NULL CHECK (current_ability BETWEEN 1 AND 200),
  potential_ability INTEGER NOT NULL CHECK (potential_ability BETWEEN current_ability AND 200),
  ca_cost INTEGER NOT NULL,
  weak_foot_tax INTEGER NOT NULL,
  strong_foot TEXT NOT NULL,
  strong_foot_rating INTEGER NOT NULL CHECK (strong_foot_rating BETWEEN 1 AND 20),
  weak_foot INTEGER NOT NULL CHECK (weak_foot BETWEEN 1 AND 20),
  consistency INTEGER NOT NULL CHECK (consistency BETWEEN 1 AND 20),
  important_matches INTEGER NOT NULL CHECK (important_matches BETWEEN 1 AND 20),
  injury_proneness INTEGER NOT NULL CHECK (injury_proneness BETWEEN 1 AND 20),
  professionalism INTEGER NOT NULL CHECK (professionalism BETWEEN 1 AND 20),
  determination INTEGER NOT NULL CHECK (determination BETWEEN 1 AND 20),
  ambition INTEGER NOT NULL CHECK (ambition BETWEEN 1 AND 20),
  pressure INTEGER NOT NULL CHECK (pressure BETWEEN 1 AND 20),
  dirtiness INTEGER NOT NULL CHECK (dirtiness BETWEEN 1 AND 20),
  adaptability INTEGER NOT NULL CHECK (adaptability BETWEEN 1 AND 20),
  influence INTEGER NOT NULL CHECK (influence BETWEEN 1 AND 100),
  social_group TEXT NOT NULL,
  squad_status TEXT NOT NULL,
  homesick_weeks INTEGER NOT NULL DEFAULT 0,
  transfer_request INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE player_attributes (
  player_id INTEGER PRIMARY KEY REFERENCES players(id),
  finishing INTEGER CHECK (finishing BETWEEN 1 AND 20),
  passing INTEGER CHECK (passing BETWEEN 1 AND 20),
  first_touch INTEGER CHECK (first_touch BETWEEN 1 AND 20),
  dribbling INTEGER CHECK (dribbling BETWEEN 1 AND 20),
  crossing INTEGER CHECK (crossing BETWEEN 1 AND 20),
  tackling INTEGER CHECK (tackling BETWEEN 1 AND 20),
  heading INTEGER CHECK (heading BETWEEN 1 AND 20),
  long_shots INTEGER CHECK (long_shots BETWEEN 1 AND 20),
  technique INTEGER CHECK (technique BETWEEN 1 AND 20),
  decisions INTEGER CHECK (decisions BETWEEN 1 AND 20),
  vision INTEGER CHECK (vision BETWEEN 1 AND 20),
  work_rate INTEGER CHECK (work_rate BETWEEN 1 AND 20),
  positioning INTEGER CHECK (positioning BETWEEN 1 AND 20),
  composure INTEGER CHECK (composure BETWEEN 1 AND 20),
  leadership INTEGER CHECK (leadership BETWEEN 1 AND 20),
  aggression INTEGER CHECK (aggression BETWEEN 1 AND 20),
  teamwork INTEGER CHECK (teamwork BETWEEN 1 AND 20),
  anticipation INTEGER CHECK (anticipation BETWEEN 1 AND 20),
  concentration INTEGER CHECK (concentration BETWEEN 1 AND 20),
  flair INTEGER CHECK (flair BETWEEN 1 AND 20),
  bravery INTEGER CHECK (bravery BETWEEN 1 AND 20),
  pace INTEGER CHECK (pace BETWEEN 1 AND 20),
  stamina INTEGER CHECK (stamina BETWEEN 1 AND 20),
  strength INTEGER CHECK (strength BETWEEN 1 AND 20),
  agility INTEGER CHECK (agility BETWEEN 1 AND 20),
  balance INTEGER CHECK (balance BETWEEN 1 AND 20),
  jumping INTEGER CHECK (jumping BETWEEN 1 AND 20),
  natural_fitness INTEGER CHECK (natural_fitness BETWEEN 1 AND 20),
  acceleration INTEGER CHECK (acceleration BETWEEN 1 AND 20)
);

CREATE TABLE contracts (
  player_id INTEGER PRIMARY KEY REFERENCES players(id),
  weekly_wage INTEGER NOT NULL,
  expires_year INTEGER NOT NULL,
  morale INTEGER CHECK (morale BETWEEN 1 AND 20),
  happiness INTEGER CHECK (happiness BETWEEN 1 AND 20)
);

CREATE TABLE fixtures (
  id INTEGER PRIMARY KEY,
  week INTEGER NOT NULL,
  home_club_id INTEGER REFERENCES clubs(id),
  away_club_id INTEGER REFERENCES clubs(id),
  home_goals INTEGER,
  away_goals INTEGER,
  weather TEXT
);

CREATE TABLE league_table (
  club_id INTEGER PRIMARY KEY REFERENCES clubs(id),
  played INTEGER DEFAULT 0,
  won INTEGER DEFAULT 0,
  drawn INTEGER DEFAULT 0,
  lost INTEGER DEFAULT 0,
  goals_for INTEGER DEFAULT 0,
  goals_against INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0
);`;

function render() {
  setPathTheme(state.activeView);
  document.body.dataset.uiScale = state.uiScale;
  if (!state.introComplete) {
    document.body.classList.add("loading-view");
    document.body.classList.remove("menu-view", "start-view", "desk-view");
    document.querySelector(".tabs").hidden = true;
    document.querySelector("#sectionSubnav").hidden = true;
    document.querySelector(".layout").classList.add("start-mode");
    document.querySelector("#view").innerHTML = renderLoadingMenu();
    return;
  }

  if (!state.gameStarted) {
    document.body.classList.remove("loading-view");
    document.body.classList.add("menu-view", "start-view");
    document.body.classList.remove("desk-view");
    document.querySelector("#seasonLabel").textContent = `Season ${state.season}/${String(state.season + 1).slice(-2)}`;
    document.querySelector("#clubName").textContent = "Select Club";
    document.querySelector("#weekLabel").textContent = "Before Kickoff";
    document.querySelector("#balanceValue").textContent = "-";
    document.querySelector("#wageValue").textContent = "-";
    document.querySelector("#moraleValue").textContent = "-";
    document.querySelector("#fixtureValue").textContent = "Choose your team";
    document.querySelector(".tabs").hidden = true;
    document.querySelector("#sectionSubnav").hidden = true;
    document.querySelector(".layout").classList.add("start-mode");
    document.querySelector("#view").innerHTML = renderStartScreen();
    return;
  }

  document.querySelector(".tabs").hidden = false;
  document.querySelector("#sectionSubnav").hidden = false;
  document.body.classList.remove("loading-view");
  document.body.classList.remove("start-view");
  document.body.classList.toggle("menu-view", state.activeView === "menu");
  document.body.classList.remove("desk-view");
  document.querySelector(".layout").classList.remove("start-mode");
  renderDashboard();
  const chrome = chromeSectionForView(state.activeView);
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.activeView || button.dataset.section === chrome.title);
  });

  const views = {
    menu: renderMenu,
    inbox: renderInbox,
    squad: renderSquad,
    match: renderMatchArea,
    replay: renderReplay,
    tactics: renderTactics,
    playerStats: renderPlayerStats,
    dynamics: renderDynamics,
    staff: renderStaff,
    training: renderTraining,
    schedule: renderSchedule,
    league: renderLeague,
    competitions: renderCompetitions,
    scouting: renderScouting,
    media: renderMedia,
    honors: renderHonors,
    development: renderDevelopment,
    clubInfo: renderClubInfo,
    clubVision: renderClubVision,
    transfers: renderTransfers,
    news: renderNews,
    finances: renderFinances,
    engine: renderEngine,
    schema: renderSchema,
  };

  document.querySelector("#view").innerHTML = (views[state.activeView] ?? renderMenu)() + renderInteractionModal() + renderNegotiationModal();
  initializeFreeMoveTactics();
  initializeLineupDragAndDrop();
  initializeMatchVisualizer();
  document.querySelectorAll("[data-player-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedPlayerId = Number(row.dataset.playerId);
      render();
    });
  });
}

function initializeLineupDragAndDrop() {
  document.querySelectorAll("[data-drag-player-id]").forEach((source) => {
    source.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", source.dataset.dragPlayerId);
      event.dataTransfer.effectAllowed = "move";
      source.classList.add("drag-source");
    });
    source.addEventListener("dragend", () => {
      source.classList.remove("drag-source");
      document.querySelectorAll(".lineup-drop-target").forEach((target) => target.classList.remove("lineup-drop-target"));
    });
  });

  document.querySelectorAll("[data-lineup-slot]").forEach((slot) => {
    slot.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      slot.classList.add("lineup-drop-target");
    });
    slot.addEventListener("dragleave", () => {
      slot.classList.remove("lineup-drop-target");
    });
    slot.addEventListener("drop", (event) => {
      event.preventDefault();
      const playerId = Number(event.dataTransfer.getData("text/plain"));
      const slotIndex = Number(slot.dataset.lineupSlot);
      slot.classList.remove("lineup-drop-target");
      if (playerId && Number.isInteger(slotIndex)) setLineupSlot(playerId, slotIndex);
    });
  });
}

function initializeFreeMoveTactics() {
  document.querySelectorAll('[data-free-move="true"] .fm-position').forEach((marker) => {
    marker.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const board = marker.closest("[data-free-move]");
      const index = Number(marker.dataset.positionIndex);
      marker.setPointerCapture(event.pointerId);
      marker.classList.add("dragging");

      const moveMarker = (moveEvent) => {
        const rect = board.getBoundingClientRect();
        const x = clamp(((moveEvent.clientX - rect.left) / rect.width) * 100, 6, 94);
        const y = clamp(((moveEvent.clientY - rect.top) / rect.height) * 100, 6, 94);
        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;
        const label = positionLabelForCoordinates(x, y);
        activeFormationPositions()[index] = { label, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
        const roleLabel = marker.querySelector(".fm-role-label");
        if (roleLabel) roleLabel.textContent = label;
      };

      const stopMove = () => {
        marker.classList.remove("dragging");
        marker.removeEventListener("pointermove", moveMarker);
        marker.removeEventListener("pointerup", stopMove);
        marker.removeEventListener("pointercancel", stopMove);
      };

      marker.addEventListener("pointermove", moveMarker);
      marker.addEventListener("pointerup", stopMove);
      marker.addEventListener("pointercancel", stopMove);
    });
  });
}

function runCommand(rawCommand) {
  if (rawCommand == null) {
    const input = document.querySelector("#commandInput");
    rawCommand = input?.value ?? "";
    if (input) input.value = "";
  }
  const [command, value] = rawCommand.trim().toLowerCase().split(/\s+/);
  if (!command) return;

  const viewCommands = {
    menu: "menu",
    home: "menu",
    inbox: "inbox",
    squad: "squad",
    match: "match",
    playmatch: "match",
    dynamics: "dynamics",
    staff: "staff",
    training: "training",
    schedule: "schedule",
    table: "league",
    league: "league",
    competitions: "competitions",
    cups: "competitions",
    scouting: "scouting",
    scout: "scouting",
    media: "media",
    press: "media",
    development: "development",
    dev: "development",
    club: "clubInfo",
    clubinfo: "clubInfo",
    vision: "clubVision",
    clubvision: "clubVision",
    finances: "finances",
    finance: "finances",
    transfer: "transfers",
    transfers: "transfers",
    news: "news",
    replay: "replay",
    stats: "playerStats",
    playerstats: "playerStats",
    tactics: "tactics",
    honors: "honors",
    trophies: "honors",
    engine: "engine",
    schema: "schema",
  };
  if (viewCommands[command]) {
    state.activeView = viewCommands[command];
    addFeed(`Opened ${command}.`);
    return render();
  }

  if (command === "sim" || command === "simulate") return simulateWeek();
  if (command === "next") return startNextSeason();
  if (command === "play") return simulateSelectedMatch();
  if (command === "talk") return conductTeamTalk(value || "encourage");
  if (command === "team") return selectManagedTeam(Number(value));
  if (command === "opponent") return selectOpponent(Number(value));
  if (command === "rest") return restSquad();
  if (command === "scout") {
    refreshMarket();
    addFeed("Scouting list refreshed.");
    return render();
  }
  if (command === "buy") return buyPlayer(Number(value));
  if (command === "contract") return negotiateContract(Number(value));
  if (command === "help") {
    addFeed("Commands: menu, inbox, squad, match, replay, tactics, stats, dynamics, staff, training, schedule, table, cups, scouting, media, development, club, vision, finances, transfer, play, sim, talk encourage/demand/praise/calm, team ID, opponent ID, rest, scout, buy ID, contract ID.");
    return;
  }

  addFeed(`Unknown command: ${rawCommand}. Type help for options.`);
}

document.querySelectorAll(".tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.uiScale) return cycleUiScale();
    state.activeView = button.dataset.view;
    if (state.activeView === "squad") state.squadMode = "overview";
    render();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.target?.id === "commandInput" && event.key === "Enter") {
    runCommand(event.target.value);
  }
});

document.addEventListener("keydown", (event) => {
  if (!state.introComplete && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openStartMenu();
  }
});

seedGame();
render();
