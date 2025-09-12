var R_SCALE = 1.7;

var THEMES = [
  { key: "coincidence",  color: "t-coincidence",  folder: "coincidence",  prefix: "coincidence",  count: 27 },
  { key: "abstract",     color: "t-abstract",     folder: "abstract",     prefix: "abstract",     count: 12 },
  { key: "micro-macro",  color: "t-micro-macro",  folder: "micro-macro",  prefix: "micro-macro",  count: 32 },
  { key: "me-fam-frnds", color: "t-me-fam-frnds", folder: "me-fam-frnds", prefix: "me-fam-frnds", count: 36 },
  { key: "pure-joy",     color: "t-pure-joy",     folder: "pure-joy",     prefix: "pure-joy",     count: 65 },
  { key: "muse-inspo",   color: "t-muse-inspo",   folder: "muse-inspo",   prefix: "muse-inspo",   count: 84 }
];

var FRIENDLY = {
  "coincidence": "Coincidence",
  "abstract": "Abstract",
  "micro-macro": "Micro / Macro",
  "me-fam-frnds": "Me – Family – Friends",
  "pure-joy": "Pure Joy",
  "muse-inspo": "Muse / Inspiration"
};

var META = {
  "coincidence1": { note: "", emotion: "Curious", date: "2025-04-04", gps: "40.73334° N, 73.99545° W" },
  "coincidence2": { note: "", emotion: "", date: "2025-04-13", gps: "40.74879° N, 73.98904° W" },
  "coincidence3": { note: "", emotion: "", date: "2023-04-22", gps: "40.73479° N, 73.99343° W" },
  "coincidence4": { note: "", emotion: "", date: "2023-01-15", gps: "37.51821° N, 127.02301° E" },
  "coincidence5": { note: "", emotion: "", date: "2017-12-24", gps: "33.41899° N, 117.62127° W" },
  "coincidence6": { note: "", emotion: "", date: "2022-06-09", gps: "36.07698° N, 129.56967° E" },
  "coincidence7": { note: "", emotion: "", date: "2022-08-12", gps: "37.57315° N, 126.97698° E" },
  "coincidence8": { note: "", emotion: "", date: "2023-05-05", gps: "40.72837° N, 74.00072° W" },
  "coincidence9": { note: "", emotion: "", date: "2025-04-30", gps: "40.74520° N, 73.98867° W" },
  "coincidence10": { note: "", emotion: "", date: "2018-05-03", gps: "33.66093° N, 117.82845° W" },
  "coincidence11": { note: "", emotion: "", date: "2023-05-12", gps: "40.73668° N, 73.99206° W" },
  "coincidence12": { note: "", emotion: "", date: "2023-02-17", gps: "40.78424° N, 73.95770° W" },
  "coincidence13": { note: "", emotion: "", date: "2018-06-16", gps: "33.66097° N, 117.82817° W" },
  "coincidence14": { note: "", emotion: "", date: "2024-08-11", gps: "37.56209° N, 126.98156° E" },
  "coincidence15": { note: "", emotion: "", date: "2022-06-28", gps: "36.34411° N, 129.37221° E" },
  "coincidence16": { note: "", emotion: "", date: "2023-12-24", gps: "37.52476° N, 127.03605° E" },
  "coincidence17": { note: "", emotion: "", date: "2024-09-13", gps: "40.71805° N, 73.95770° W" },
  "coincidence18": { note: "", emotion: "", date: "2023-03-27", gps: "40.73542° N, 73.99410° W" },
  "coincidence19": { note: "", emotion: "", date: "2023-03-31", gps: "40.74650° N, 73.98182° W" },
  "coincidence20": { note: "", emotion: "", date: "2024-09-18", gps: "40.73603° N, 73.99367° W" },
  "coincidence21": { note: "", emotion: "", date: "2023-04-06", gps: "40.73536° N, 73.99520° W" },
  "coincidence22": { note: "", emotion: "", date: "2022-10-07", gps: "40.73539° N, 73.99354° W" },
  "coincidence23": { note: "", emotion: "", date: "2023-09-17", gps: "40.72955° N, 73.99092° W" },
  "coincidence24": { note: "", emotion: "", date: "2022-12-28", gps: "37.32351° N, 129.00838° E" },
  "coincidence25": { note: "", emotion: "", date: "2023-09-20", gps: "40.72846° N, 73.99106° W" },
  "coincidence26": { note: "", emotion: "", date: "2025-09-03", gps: "40.73843° N, 73.99236° W" },
  "coincidence27": { note: "", emotion: "", date: "2021-04-20", gps: "37.37697° N, 127.09749° E" },

  "abstract1": { note: "", emotion: "", date: "2024-04-04", gps: "40.74912° N, 73.98961° W" },
  "abstract2": { note: "", emotion: "", date: "2022-11-20", gps: "40.73550° N, 73.99330° W" },
  "abstract3": { note: "", emotion: "", date: "2024-04-28", gps: "40.76285° N, 73.97355° W" },
  "abstract4": { note: "", emotion: "", date: "2022-04-22", gps: "40.73954° N, 74.00905° W" },
  "abstract5": { note: "", emotion: "", date: "2019-07-02", gps: "N/A" },
  "abstract6": { note: "", emotion: "", date: "2025-05-10", gps: "40.75333° N, 74.00236° W" },
  "abstract7": { note: "", emotion: "", date: "2025-02-28", gps: "40.73536° N, 73.99412° W" },
  "abstract8": { note: "", emotion: "", date: "2024-01-12", gps: "37.41603° N, 127.82333° E" },
  "abstract9": { note: "", emotion: "", date: "2025-06-02", gps: "N/A" },
  "abstract10": { note: "", emotion: "", date: "2022-10-05", gps: "N/A" },
  "abstract11": { note: "", emotion: "", date: "2022-03-06", gps: "N/A" },
  "abstract12": { note: "", emotion: "", date: "2022-03-06", gps: "N/A" },

  "micro-macro1": { note: "", emotion: "", date: "2025-05-10", gps: "40.75349° N, 74.00269° W" },
  "micro-macro2": { note: "", emotion: "", date: "2023-10-07", gps: "40.78320° N, 73.95877° W" },
  "micro-macro3": { note: "", emotion: "", date: "2023-04-28", gps: "40.73861° N, 73.99324° W" },
  "micro-macro4": { note: "", emotion: "", date: "2018-04-04", gps: "34.05423° N, 118.25028° W" },
  "micro-macro5": { note: "", emotion: "", date: "2024-11-04", gps: "40.78190° N, 73.97488° W" },
  "micro-macro6": { note: "", emotion: "", date: "2024-11-11", gps: "40.75322° N, 73.94287° W" },
  "micro-macro7": { note: "", emotion: "", date: "2023-07-14", gps: "37.55919° N, 126.98272° E" },
  "micro-macro8": { note: "", emotion: "", date: "2023-05-09", gps: "40.73955° N, 74.00219° W" },
  "micro-macro9": { note: "", emotion: "", date: "2025-05-10", gps: "40.75351° N, 74.00248° W" },
  "micro-macro10": { note: "", emotion: "", date: "2024-05-25", gps: "37.51245° N, 127.05985° E" },
  "micro-macro11": { note: "", emotion: "", date: "2019-06-19", gps: "35.66714° N, 139.73141° E" },
  "micro-macro12": { note: "", emotion: "", date: "2024-09-11", gps: "40.74090° N, 74.00822° W" },
  "micro-macro13": { note: "", emotion: "", date: "2019-03-10", gps: "37.44788° N, 127.07822° E" },
  "micro-macro14": { note: "", emotion: "", date: "2019-06-24", gps: "38.16391° N, 128.48709° E" },
  "micro-macro15": { note: "", emotion: "", date: "2019-06-24", gps: "38.16391° N, 128.48709° E" },
  "micro-macro16": { note: "", emotion: "", date: "2017-09-20", gps: "33.65185° N, 117.82205° W" },
  "micro-macro17": { note: "", emotion: "", date: "2017-09-20", gps: "33.65185° N, 117.82205° W" },
  "micro-macro18": { note: "", emotion: "", date: "2024-02-02", gps: "40.73545° N, 73.99488° W" },
  "micro-macro19": { note: "", emotion: "", date: "2022-12-17", gps: "40.73653° N, 73.99158° W" },
  "micro-macro20": { note: "", emotion: "", date: "2024-09-30", gps: "40.75304° N, 73.99161° W" },
  "micro-macro21": { note: "", emotion: "", date: "2018-12-24", gps: "37.49858° N, 127.05269° E" },
  "micro-macro22": { note: "", emotion: "", date: "2025-05-10", gps: "40.75336° N, 74.00242° W" },
  "micro-macro23": { note: "", emotion: "", date: "2025-05-10", gps: "40.75336° N, 74.00242° W" },
  "micro-macro24": { note: "", emotion: "", date: "2022-06-30", gps: "36.44640° N, 129.43616° E" },
  "micro-macro25": { note: "", emotion: "", date: "2024-07-19", gps: "37.53624° N, 126.99974° E" },
  "micro-macro26": { note: "", emotion: "", date: "2017-05-30", gps: "33.62876° N, 117.82846° W" },
  "micro-macro27": { note: "", emotion: "", date: "2024-03-09", gps: "N/A" },
  "micro-macro28": { note: "", emotion: "", date: "2020-07-09", gps: "37.52486° N, 127.02724° E" },
  "micro-macro29": { note: "", emotion: "", date: "2022-08-03", gps: "37.56922° N, 126.97790° E" },
  "micro-macro30": { note: "", emotion: "", date: "2022-06-09", gps: "36.07746° N, 129.57030° E" },
  "micro-macro31": { note: "", emotion: "", date: "2021-05-07", gps: "37.37787° N, 127.09751° E" },
  "micro-macro32": { note: "", emotion: "", date: "2025-01-29", gps: "40.73294° N, 74.00706° W" },

  "me-fam-frnds1": { note: "", emotion: "", date: "2024-09-24", gps: "N/A" },
  "me-fam-frnds2": { note: "", emotion: "", date: "2023-06-08", gps: "N/A" },
  "me-fam-frnds3": { note: "", emotion: "", date: "2023-07-28", gps: "37.52314° N, 127.03619° E" },
  "me-fam-frnds4": { note: "", emotion: "", date: "2018-06-17", gps: "33.54148° N, 117.78458° W" },
  "me-fam-frnds5": { note: "", emotion: "", date: "2018-06-17", gps: "33.54148° N, 117.78458° W" },
  "me-fam-frnds6": { note: "", emotion: "", date: "2020-12-20", gps: "N/A" },
  "me-fam-frnds7": { note: "", emotion: "", emotion: "", date: "2020-12-20", gps: "N/A" },
  "me-fam-frnds8": { note: "", emotion: "", date: "2018-08-31", gps: "N/A" },
  "me-fam-frnds9": { note: "", emotion: "", date: "2018-06-13", gps: "37.72055° N, 119.64855° W" },
  "me-fam-frnds10": { note: "", emotion: "", date: "2014-10-11", gps: "33.63225° N, 117.83581° W" },
  "me-fam-frnds11": { note: "", emotion: "", date: "2015-10-11", gps: "N/A" },
  "me-fam-frnds12": { note: "", emotion: "", date: "2021-09-14", gps: "N/A" },
  "me-fam-frnds13": { note: "", emotion: "", date: "2021-09-14", gps: "N/A" },
  "me-fam-frnds14": { note: "", emotion: "", date: "2023-07-28", gps: "37.52314° N, 127.03619° E" },
  "me-fam-frnds15": { note: "", emotion: "", date: "2025-08-10", gps: "37.21568° N, 127.14342° E" },
  "me-fam-frnds16": { note: "", emotion: "", date: "2017-09-04", gps: "33.66082° N, 117.82850° W" },
  "me-fam-frnds17": { note: "", emotion: "", date: "2023-08-09", gps: "37.53493° N, 126.98716° E" },
  "me-fam-frnds18": { note: "", emotion: "", date: "2025-04-30", gps: "40.76311° N, 73.97537° W" },
  "me-fam-frnds19": { note: "", emotion: "", date: "2019-03-22", gps: "37.37805° N, 127.09799° E" },
  "me-fam-frnds20": { note: "", emotion: "", date: "2025-06-19", gps: "37.54613° N, 127.03954° E" },
  "me-fam-frnds21": { note: "", emotion: "", date: "2022-10-06", gps: "N/A" },
  "me-fam-frnds22": { note: "", emotion: "", date: "2025-01-11", gps: "37.54630° N, 127.04928° E" },
  "me-fam-frnds23": { note: "", emotion: "", date: "2017-08-18", gps: "N/A" },
  "me-fam-frnds24": { note: "", emotion: "", date: "2018-04-20", gps: "33.65685° N, 117.82484° W" },
  "me-fam-frnds25": { note: "", emotion: "", date: "2021-05-20", gps: "37.37810° N, 127.09795° E" },
  "me-fam-frnds26": { note: "", emotion: "", date: "2025-04-30", gps: "40.73371° N, 73.99092° W" },
  "me-fam-frnds27": { note: "", emotion: "", date: "2025-04-30", gps: "40.74560° N, 73.98548° W" },
  "me-fam-frnds28": { note: "", emotion: "", date: "2016-06-03", gps: "33.62485° N, 117.82633° W" },
  "me-fam-frnds29": { note: "", emotion: "", date: "2025-08-12", gps: "37.54392° N, 126.92712° E" },
  "me-fam-frnds30": { note: "", emotion: "", date: "2023-12-02", gps: "40.74876° N, 73.98731° W" },
  "me-fam-frnds31": { note: "", date: "2018-05-18", gps: "33.64942° N, 117.76983° W" },
  "me-fam-frnds32": { note: "", emotion: "", date: "2018-06-06", gps: "33.69086° N, 117.88752° W" },
  "me-fam-frnds33": { note: "", emotion: "", date: "2022-08-06", gps: "37.49076° N, 127.05499° E" },
  "me-fam-frnds34": { note: "", emotion: "", date: "2019-06-07", gps: "N/A" },
  "me-fam-frnds35": { note: "", emotion: "", date: "2021-05-17", gps: "37.37935° N, 127.10324° E" },
  "me-fam-frnds36": { note: "", emotion: "", date: "2019-08-29", gps: "34.88062° N, 128.73915° E" },

  "pure-joy1": { note: "", emotion: "", date: "2016-11-04", gps: "N/A" },
  "pure-joy2": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "pure-joy3": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "pure-joy4": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "pure-joy5": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "pure-joy6": { note: "", emotion: "", date: "2016-05-22", gps: "33.54180° N, 117.78388° W" },
  "pure-joy7": { note: "", emotion: "", date: "2025-05-11", gps: "40.74841° N, 73.98931° W" },
  "pure-joy8": { note: "", emotion: "", date: "2025-06-18", gps: "37.55994° N, 126.98006° E" },
  "pure-joy9": { note: "", emotion: "", date: "2017-04-08", gps: "33.67751° N, 117.80036° W" },
  "pure-joy10": { note: "", emotion: "", date: "2018-06-28", gps: "33.60824° N, 117.92996° W" },
  "pure-joy11": { note: "", emotion: "", date: "2018-06-30", gps: "34.06338° N, 118.36030° W" },
  "pure-joy12": { note: "", emotion: "", date: "2018-04-01", gps: "33.54240° N, 117.78314° W" },
  "pure-joy13": { note: "", emotion: "", date: "2018-06-30", gps: "34.06317° N, 118.35963° W" },
  "pure-joy14": { note: "", emotion: "", date: "2016-06-03", gps: "33.62485° N, 117.82633° W" },
  "pure-joy15": { note: "", emotion: "", date: "2024-07-26", gps: "37.56565° N, 126.93826° E" },
  "pure-joy16": { note: "", emotion: "", date: "2018-04-04", gps: "34.05440° N, 118.25053° W" },
  "pure-joy17": { note: "", date: "2017-07-16", gps: "40.72377° N, 73.99649° W" },
  "pure-joy18": { note: "I will be looking from this pov when I graduate", emotion: "Thrill", date: "2023-11-07", gps: "40.73558° N, 73.99388° W" },
  "pure-joy19": { note: "", emotion: "", date: "2019-03-15", gps: "N/A" },
  "pure-joy20": { note: "", emotion: "", date: "2021-05-20", gps: "37.53455° N, 126.99488° E" },
  "pure-joy21": { note: "", emotion: "", date: "2021-05-20", gps: "37.55924° N, 126.98267° E" },
  "pure-joy22": { note: "", emotion: "", date: "2024-11-16", gps: "40.74860° N, 73.98903° W" },
  "pure-joy23": { note: "", emotion: "", date: "2017-09-05", gps: "33.66073° N, 117.82868° W" },
  "pure-joy24": { note: "", emotion: "", date: "2023-05-15", gps: "40.73524° N, 73.99402° W" },
  "pure-joy25": { note: "", emotion: "", date: "2016-08-23", gps: "33.66082° N, 117.82850° W" },
  "pure-joy26": { note: "", emotion: "", date: "2023-02-24", gps: "N/A" },
  "pure-joy27": { note: "", emotion: "", date: "2023-05-16", gps: "40.75984° N, 73.97922° W" },
  "pure-joy28": { note: "", emotion: "", date: "2018-05-18", gps: "33.64946° N, 117.76982° W" },
  "pure-joy29": { note: "", emotion: "", date: "2024-05-20", gps: "37.52430° N, 127.03498° E" },
  "pure-joy30": { note: "", emotion: "", date: "2025-07-19", gps: "34.70167° N, 135.49450° E" },
  "pure-joy31": { note: "", emotion: "", date: "2025-07-19", gps: "34.69799° N, 135.49036° E" },
  "pure-joy32": { note: "", emotion: "", date: "2019-04-17", gps: "37.48684° N, 127.05370° E" },
  "pure-joy33": { note: "", emotion: "", date: "2024-08-30", gps: "40.74851° N, 73.98835° W" },
  "pure-joy34": { note: "", emotion: "", date: "2023-12-24", gps: "37.52500° N, 127.03558° E" },
  "pure-joy35": { note: "", emotion: "", date: "2019-06-15", gps: "35.66574° N, 139.75743° E" },
  "pure-joy36": { note: "Long time no see, my old school bus", emotion: "Glad", date: "2022-07-09", gps: "37.53556° N, 127.02037° E" },
  "pure-joy37": { note: "", emotion: "", date: "2018-05-31", gps: "33.65206° N, 117.82221° W" },
  "pure-joy38": { note: "", emotion: "", date: "2025-09-03", gps: "N/A" },
  "pure-joy39": { note: "", emotion: "", date: "2025-09-03", gps: "N/A" },
  "pure-joy40": { note: "", emotion: "", date: "2022-12-04", gps: "40.77859° N, 73.96409° W" },
  "pure-joy41": { note: "", emotion: "", date: "2018-06-05", gps: "33.65143° N, 117.82219° W" },
  "pure-joy42": { note: "", emotion: "", date: "2018-06-05", gps: "33.65199° N, 117.82342° W" },
  "pure-joy43": { note: "", emotion: "", date: "2019-09-20", gps: "37.37688° N, 127.09798° E" },
  "pure-joy44": { note: "", emotion: "", date: "2018-06-09", gps: "33.66783° N, 117.83470° W" },
  "pure-joy45": { note: "", emotion: "", date: "2018-06-09", gps: "33.66044° N, 117.83284° W" },
  "pure-joy46": { note: "", emotion: "", date: "2025-01-02", gps: "37.54490° N, 126.98417° E" },
  "pure-joy47": { note: "", emotion: "", date: "2023-04-06", gps: "40.73549° N, 73.99522° W" },
  "pure-joy48": { note: "", emotion: "", date: "2019-06-18", gps: "35.66422° N, 139.75725° E" },
  "pure-joy49": { note: "", emotion: "", date: "2018-09-27", gps: "37.48653° N, 127.03799° E" },
  "pure-joy50": { note: "", emotion: "", date: "2019-04-30", gps: "33.66146° N, 117.82964° W" },
  "pure-joy51": { note: "", emotion: "", date: "2020-09-08", gps: "37.51433° N, 126.95686° E" },
  "pure-joy52": { note: "", emotion: "", date: "2025-01-07", gps: "37.55936° N, 126.98340° E" },
  "pure-joy53": { note: "", emotion: "", date: "2018-09-07", gps: "37.49040° N, 127.05525° E" },
  "pure-joy54": { note: "", emotion: "", date: "2022-10-12", gps: "40.74189° N, 74.01091° W" },
  "pure-joy55": { note: "", emotion: "", date: "2022-10-12", gps: "40.74230° N, 74.01041° W" },
  "pure-joy56": { note: "", emotion: "", date: "2025-07-28", gps: "37.48676° N, 127.05492° E" },
  "pure-joy57": { note: "", emotion: "", date: "2017-06-04", gps: "33.68944° N, 117.83421° W" },
  "pure-joy58": { note: "", emotion: "", date: "2023-04-15", gps: "40.76116° N, 73.97750° W" },
  "pure-joy59": { note: "", emotion: "", date: "2017-07-15", gps: "40.76671° N, 73.97222° W" },
  "pure-joy60": { note: "", emotion: "", date: "2023-04-15", gps: "40.76117° N, 73.97752° W" },
  "pure-joy61": { note: "", emotion: "", date: "2017-07-15", gps: "40.75904° N, 73.97962° W" },
  "pure-joy62": { note: "", emotion: "", date: "2016-05-15", gps: "33.57386° N, 117.83968° W" },
  "pure-joy63": { note: "", emotion: "", date: "2023-04-09", gps: "N/A" },
  "pure-joy64": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "pure-joy65": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },

  "muse-inspo1":  { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo2":  { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo3":  { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo4":  { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo5":  { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo6":  { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo7":  { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo8":  { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo9":  { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo10": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo11": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo12": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo13": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo14": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo15": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo16": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo17": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo18": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo19": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo20": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo21": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo22": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo23": { note: "", emotion: "", date: "2021-08-08", gps: "40.74530° N, 73.98113° W" },
  "muse-inspo24": { note: "", emotion: "", date: "2018-06-30", gps: "34.05896° N, 118.44385° W" },
  "muse-inspo25": { note: "", emotion: "", date: "2024-03-18", gps: "40.73568° N, 73.99480° W" },
  "muse-inspo26": { note: "", emotion: "", date: "2024-04-01", gps: "40.73578° N, 73.99499° W" },
  "muse-inspo27": { note: "", emotion: "", date: "2024-04-01", gps: "40.73578° N, 73.99499° W" },
  "muse-inspo28": { note: "", emotion: "", date: "2024-04-15", gps: "40.73582° N, 73.99482° W" },
  "muse-inspo29": { note: "", emotion: "", date: "2017-03-16", gps: "34.05427° N, 118.25050° W" },
  "muse-inspo30": { note: "", emotion: "", date: "2024-04-22", gps: "40.73650° N, 73.99397° W" },
  "muse-inspo31": { note: "", emotion: "", date: "2025-02-07", gps: "40.74544° N, 73.94810° W" },
  "muse-inspo32": { note: "", emotion: "", date: "2025-02-07", gps: "40.74550° N, 73.94810° W" },
  "muse-inspo33": { note: "", emotion: "", date: "2023-05-13", gps: "40.72557° N, 73.99503° W" },
  "muse-inspo34": { note: "", emotion: "", date: "2023-07-26", gps: "37.52471° N, 127.03983° E" },
  "muse-inspo35": { note: "", emotion: "", date: "2025-05-10", gps: "40.75273° N, 74.00223° W" },
  "muse-inspo36": { note: "", emotion: "", date: "2024-08-17", gps: "37.53556° N, 126.99978° E" },
  "muse-inspo37": { note: "", emotion: "", date: "2025-05-10", gps: "40.75315° N, 74.00203° W" },
  "muse-inspo38": { note: "", emotion: "", date: "2025-05-10", gps: "40.75373° N, 74.00269° W" },
  "muse-inspo39": { note: "", emotion: "", date: "2025-07-20", gps: "34.69252° N, 135.49171° E" },
  "muse-inspo40": { note: "", emotion: "", date: "2024-05-25", gps: "37.51243° N, 127.05972° E" },
  "muse-inspo41": { note: "", emotion: "", date: "2025-07-20", gps: "34.69269° N, 135.49159° E" },
  "muse-inspo42": { note: "", emotion: "", date: "2022-12-03", gps: "N/A" },
  "muse-inspo43": { note: "", emotion: "", date: "2024-09-04", gps: "40.73683° N, 73.99538° W" },
  "muse-inspo44": { note: "", emotion: "", date: "2025-07-20", gps: "34.69247° N, 135.49180° E" },
  "muse-inspo45": { note: "", emotion: "", date: "2025-07-20", gps: "34.69243° N, 135.49165° E" },
  "muse-inspo46": { note: "", emotion: "", date: "2024-09-10", gps: "40.73539° N, 73.99502° W" },
  "muse-inspo47": { note: "", emotion: "", date: "2022-12-04", gps: "40.77878° N, 73.96424° W" },
  "muse-inspo48": { note: "", emotion: "", date: "2019-12-28", gps: "37.52981° N, 126.96915° E" },
  "muse-inspo49": { note: "", emotion: "", date: "2019-12-28", gps: "37.52895° N, 126.96839° E" },
  "muse-inspo50": { note: "", emotion: "", date: "2019-12-28", gps: "37.52924° N, 126.96807° E" },
  "muse-inspo51": { note: "", emotion: "", date: "2022-12-14", gps: "40.73549° N, 73.99423° W" },
  "muse-inspo52": { note: "", emotion: "", date: "2023-03-29", gps: "40.73709° N, 73.99203° W" },
  "muse-inspo53": { note: "", emotion: "", date: "2025-05-31", gps: "37.55300° N, 126.96864° E" },
  "muse-inspo54": { note: "", emotion: "", date: "2025-01-02", gps: "37.54526° N, 126.98501° E" },
  "muse-inspo55": { note: "", emotion: "", date: "2025-03-22", gps: "40.74782° N, 74.00414° W" },
  "muse-inspo56": { note: "", emotion: "", date: "2018-03-11", gps: "N/A" },
  "muse-inspo57": { note: "", emotion: "", date: "2023-04-14", gps: "40.67066° N, 73.96374° W" },
  "muse-inspo58": { note: "", emotion: "", date: "2023-04-14", gps: "40.67127° N, 73.96375° W" },
  "muse-inspo59": { note: "", emotion: "", date: "2019-07-22", gps: "37.52490° N, 127.04634° E" },
  "muse-inspo60": { note: "", emotion: "", date: "2025-03-30", gps: "N/A" },
  "muse-inspo61": { note: "", emotion: "", date: "2017-08-07", gps: "33.61243° N, 117.86663° W" },
  "muse-inspo62": { note: "", emotion: "", date: "2018-06-25", gps: "33.69286° N, 117.73050° W" },
  "muse-inspo63": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo64": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo65": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo66": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo67": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo68": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo69": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo70": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo71": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo72": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo73": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo74": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo75": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo76": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo77": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo78": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo79": { note: "", emotion: "", date: "2025-09-01", gps: "N/A" },
  "muse-inspo80": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo81": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo82": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo83": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" },
  "muse-inspo84": { note: "", emotion: "", date: "2025-09-02", gps: "N/A" }
};

function makeAll() {
  var list = [];
  for (var t = 0; t < THEMES.length; t++) {
    var theme = THEMES[t];
    for (var i = 1; i <= theme.count; i++) {
      var key = theme.prefix + i;
      list.push({
        key: key,
        theme: theme.key,
        color: theme.color,
        src: "assets/" + theme.folder + "/" + theme.prefix + i + ".jpg"
      });
    }
  }
  return list;
}
var ALL = makeAll();

var CIRCLES = [
  {cx: 0.21, cy: 0.30, r: 0.15},
  {cx: 0.47, cy: 0.25, r: 0.13},
  {cx: 0.76, cy: 0.25, r: 0.15},
  {cx: 0.77, cy: 0.58, r: 0.18},
  {cx: 0.52, cy: 0.72, r: 0.16},
  {cx: 0.27, cy: 0.65, r: 0.15}
];

function rand(min, max) { return Math.random() * (max - min) + min; }
function placeInCircle(c) {
  var sw = window.innerWidth, sh = window.innerHeight;
  var cx = c.cx * sw, cy = c.cy * sh;
  var r  = c.r * R_SCALE * Math.min(sw, sh);
  var th = Math.random() * Math.PI * 2;
  var rad = Math.sqrt(Math.random()) * r;
  return { x: cx + rad * Math.cos(th), y: cy + rad * Math.sin(th), cx: cx, cy: cy, r: r };
}

var stage     = document.getElementById("brain-stage");
var seqGrid   = document.getElementById("sequence-grid");
var labelsBox = document.getElementById("labels");

var viewer = document.getElementById("viewer");
var closeBtn = document.getElementById("close-viewer");
var vImg  = document.getElementById("viewer-img");
var vTit  = document.getElementById("viewer-title");
var vNote = document.getElementById("viewer-note");
var vEmotion = document.getElementById("viewer-emotion");
var vDate = document.getElementById("viewer-date");
var vGPS  = document.getElementById("viewer-gps");

var dots = [];

function getThemeIndex(themeKey) {
  for (var i = 0; i < THEMES.length; i++) if (THEMES[i].key === themeKey) return i;
  return 0;
}

function makeDot(info, areaIndex) {
  var base = Math.random() * 6 + 10;
  var el = document.createElement("div");
  el.className = "dot " + THEMES[areaIndex].color;
  el.style.width = base + "px";
  el.style.height = base + "px";
  el.style.backgroundImage = "url(" + info.src + ")";
  el.style.animationDuration = (Math.random() * 2 + 4).toFixed(2) + "s";
  el.style.animationDelay    = (Math.random() * 3).toFixed(2) + "s";

  var pos = placeInCircle(CIRCLES[areaIndex]);
  var x = pos.x, y = pos.y;
  el.style.left = x + "px";
  el.style.top  = y + "px";

  var vx = rand(-0.06, 0.06), vy = rand(-0.06, 0.06);
  el.addEventListener("click", function(){ openViewer(info); });
  stage.appendChild(el);

  return { el: el, x: x, y: y, vx: vx, vy: vy, w: base, h: base, areaIndex: areaIndex, info: info };
}

function clearDots() {
  var olds = stage.querySelectorAll(".dot");
  for (var i = 0; i < olds.length; i++) if (olds[i].parentNode) olds[i].parentNode.removeChild(olds[i]);
}

function buildDots() {
  clearDots(); dots.length = 0;
  for (var i = 0; i < ALL.length; i++) {
    var info = ALL[i], idx = getThemeIndex(info.theme);
    dots.push(makeDot(info, idx));
  }
}
buildDots();

var labelEls = [];
function buildLabels() {
  if (labelEls.length) return;
  for (var i = 0; i < THEMES.length; i++) {
    var t = THEMES[i], el = document.createElement("div");
    el.className = "home-label " + t.color;
    el.textContent = FRIENDLY[t.key] ? FRIENDLY[t.key] : t.key;
    labelsBox.appendChild(el); labelEls.push(el);
  }
  positionLabels();
}
function positionLabels() {
  var sw = window.innerWidth, sh = window.innerHeight;
  for (var i = 0; i < labelEls.length; i++) {
    var el = labelEls[i], c = CIRCLES[i];
    el.style.left = (c.cx * sw) + "px";
    el.style.top  = (c.cy * sh) + "px";
    el.style.pointerEvents = "auto"; el.style.cursor = "pointer";
    (function (index) {
      el.onclick = function () {
        for (var k = 0; k < dots.length; k++) dots[k].el.style.opacity = (dots[k].areaIndex === index) ? "1" : "0.18";
        setTimeout(function(){ for (var k2 = 0; k2 < dots.length; k2++) dots[k2].el.style.opacity = ""; }, 2500);
      };
    })(i);
  }
}
buildLabels();
window.addEventListener("resize", positionLabels);

var last = 0, SPEED = 0.2;
function loop(t) {
  if (!last) last = t;
  var dt = (t - last) / 16.7; last = t;
  var sw = window.innerWidth, sh = window.innerHeight;

  for (var i = 0; i < dots.length; i++) {
    var d = dots[i];
    d.x += d.vx * dt * SPEED; d.y += d.vy * dt * SPEED;

    var c = CIRCLES[d.areaIndex];
    var cx = c.cx * sw, cy = c.cy * sh, R = c.r * R_SCALE * Math.min(sw, sh);
    var rx = d.w * 0.5, ry = d.h * 0.5, pr = (rx > ry ? rx : ry);
    var px = d.x + rx, py = d.y + ry;
    var dx = px - cx, dy = py - cy, dist = Math.sqrt(dx*dx + dy*dy);
    var maxDist = Math.max(0.0001, R - pr);

    if (dist > maxDist) {
      var nx = dx / dist, ny = dy / dist;
      d.x = (cx + nx * maxDist) - rx;
      d.y = (cy + ny * maxDist) - ry;
      d.vx = -d.vx; d.vy = -d.vy;
    }

    d.vx += (cx - px) * 0.000008;
    d.vy += (cy - py) * 0.000008;

    if (Math.random() < 0.002) {
      d.el.classList.add("burst");
      setTimeout((function(elRef){ return function(){ elRef.classList.remove("burst"); }; })(d.el), 650);
    }

    d.el.style.left = d.x + "px";
    d.el.style.top  = d.y + "px";
  }
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

function openViewer(info){
  var m = META[info.key] || {};
  vImg.src = info.src;
  vTit.textContent = info.key;
  vNote.textContent = m.note || "—";
  vEmotion.textContent = "Emotion: " + (m.emotion || "—");
  vDate.textContent = "Date: " + (m.date || "—");
  vGPS.textContent  = "GPS Coordinates: "  + (m.gps  || "—");
  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden", "false");
}
function closeViewer(){
  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden", "true");
  vImg.src = "";
}
closeBtn.addEventListener("click", closeViewer);
viewer.addEventListener("click", function(e){ if(e.target === viewer) closeViewer(); });
window.addEventListener("keydown", function(e){ if(e.key === "Escape") closeViewer(); });

function buildSequence(){
  seqGrid.innerHTML = "";
  var sorted = ALL.slice(0).sort(function(a,b){ return a.key.localeCompare(b.key, undefined, {numeric:true}); });
  for (var i = 0; i < sorted.length; i++) {
    var info = sorted[i], it = document.createElement("div");
    it.className = "item";
    it.style.backgroundImage = "url(" + info.src + ")";
    it.title = info.key;
    (function(infoRef){ it.addEventListener("click", function(){ openViewer(infoRef); }); })(info);
    seqGrid.appendChild(it);
  }
}
buildSequence();

var btnNeurons = document.getElementById("mode-neurons");
var btnSeq   = document.getElementById("mode-seq");
function setMode(mode){
  var neurons = (mode === "neurons");
  if (neurons) {
    btnNeurons.classList.add("active"); btnNeurons.setAttribute("aria-pressed","true");
    btnSeq.classList.remove("active"); btnSeq.setAttribute("aria-pressed","false");
  } else {
    btnSeq.classList.add("active"); btnSeq.setAttribute("aria-pressed","true");
    btnNeurons.classList.remove("active"); btnNeurons.setAttribute("aria-pressed","false");
  }
  document.getElementById("brain-stage").style.display = neurons ? "block" : "none";
  document.getElementById("sequence-grid").style.display = neurons ? "none" : "block";
}
btnNeurons.addEventListener("click", function(){ setMode("neurons"); });
btnSeq  .addEventListener("click", function(){ setMode("seq");   });
window.addEventListener("keydown", function(e){ if(e.key==="1") setMode("neurons"); if(e.key==="2") setMode("seq"); });
setMode("neurons");

