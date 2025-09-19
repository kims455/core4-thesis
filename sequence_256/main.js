var R_SCALE = 1.75;

var DOT_MIN = 23;
var DOT_MAX = 33;
var HITPAD  = 13;

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
  "coincidence1": { note: "Who left you here? Which book were you part of? What story do you have?", emotion: "Sympathy", date: "2025-04-04", gps: "40.73334° N, 73.99545° W" },
  "coincidence2": { note: "WOAHHH!!! Double yolks in one egg!!! This made my day.", emotion: "Surprise", date: "2025-04-13", gps: "40.74879° N, 73.98904° W" },
  "coincidence3": { note: "Looks likes an OK hand gesture. Anyway, why are you here alone?", emotion: "Curious", date: "2023-04-22", gps: "40.73479° N, 73.99343° W" },
  "coincidence4": { note: "Pouring a chandelier into a wine glass.", emotion: "Satisfied", date: "2023-01-15", gps: "37.51821° N, 127.02301° E" },
  "coincidence5": { note: "Three pigeons are standing on top of the sink together. Are they friends? I'm curious what they are thinking about. Also, I miss beaches in California.", emotion: "Intrigued", date: "2017-12-24", gps: "33.41899° N, 117.62127° W" },
  "coincidence6": { note: "Two seagulls on top of the hand. They look so tiny.", emotion: "Relaxation", date: "2022-06-09", gps: "36.07698° N, 129.56967° E" },
  "coincidence7": { note: "Reminds me of lightsabers from Star Wars. TMI: I never watched Star Wars.", emotion: "Enchantment", date: "2022-08-12", gps: "37.57315° N, 126.97698° E" },
  "coincidence8": { note: "Another glove lies on the ground, but with all the holes and textures beneath it, it almost looks like something from the moon.", emotion: "Curious", date: "2023-05-05", gps: "40.72837° N, 74.00072° W" },
  "coincidence9": { note: "I never thought a trash bin could be so beautiful. The sunlight streaming through the gap is unexpectedly lovely.", emotion: "Pleased", date: "2025-04-30", gps: "40.74520° N, 73.98867° W" },
  "coincidence10": { note: "This is my room back in Irvine, CA, from my high school years. I always loved watching the light gleam through the blinds.", emotion: "Nostalgic", date: "2018-05-03", gps: "33.66093° N, 117.82845° W" },
  "coincidence11": { note: "My iPhone camera lens seemed confused with such intense lighting from the window. I instantly captured that moment because the blue was so beautiful.", emotion: "Satisfied", date: "2023-05-12", gps: "40.73668° N, 73.99206° W" },
  "coincidence12": { note: "Part of the exhibition at Cooper Hewitt Museum. I love sphere-shaped lighting (I also have two of them in my room), and the color combination of these lights was fascinating.", emotion: "Satisfied", date: "2023-02-17", gps: "40.78424° N, 73.95770° W" },
  "coincidence13": { note: "A rainbow circle on the wall, created by sunlight passing through a glass. Looks like a button!", emotion: "Joy", date: "2018-06-16", gps: "33.66097° N, 117.82817° W" },
  "coincidence14": { note: "People leave their thoughts written on the street. How many passerby will stop to read them?", emotion: "Curious", date: "2024-08-11", gps: "37.56209° N, 126.98156° E" },
  "coincidence15": { note: "I took this photo while riding a golf cart. The crooked angle wasn’t intentional, but it makes the image look like a scene from Alice in Wonderland, as if Alice were spinning and falling into Wonderland.", emotion: "Optimistic", date: "2022-06-28", gps: "36.34411° N, 129.37221° E" },
  "coincidence16": { note: "I love spotting positive, encouraging little things around me — like this sticker on a streetlamp in Seoul.", emotion: "Happy", date: "2023-12-24", gps: "37.52476° N, 127.03605° E" },
  "coincidence17": { note: "I used to hate the halation from my iPhone camera, but sometimes it makes the photo look unexpectedly intriguing.", emotion: "Glad", date: "2024-09-13", gps: "40.71805° N, 73.95770° W" },
  "coincidence18": { note: "Another sunlight reflection on the wall. This was once my Instagram profile picture. No one knew what it was because I’d zoomed in, and my friends were surprised when they finally saw the full image.", emotion: "Joy", date: "2023-03-27", gps: "40.73542° N, 73.99410° W" },
  "coincidence19": { note: "I’ve never seen a latex glove in orange before. I found it on the stairs of a New York City subway. Why are you here? Who left you behind?", emotion: "Curious", date: "2023-03-31", gps: "40.74650° N, 73.98182° W" },
  "coincidence20": { note: "Do you remember how many manholes you stepped on today while walking down the street? Most people probably don’t notice — but I do. I like catching the small things we usually ignore, because they can turn into something you’d never expect.", emotion: "Enthusiasm", date: "2024-09-18", gps: "40.73603° N, 73.99367° W" },
  "coincidence21": { note: "I used to love playing with gum wrappers. One day I discovered that the aluminum side and the paper side could be separated. I carefully peeled them apart, trying to keep the original shape...and voilà! Perfectly done.", emotion: "Concentrated", date: "2023-04-06", gps: "40.73536° N, 73.99520° W" },
  "coincidence22": { note: "During break, I looked around the classroom and spotted this astronaut-like drawing high up on the wall. Who drew it? Did they have to stand on a desk or chair to reach it?", emotion: "Curious", date: "2022-10-07", gps: "40.73539° N, 73.99354° W" },
  "coincidence23": { note: "Laundry machines are valuable in NYC. But why is this one already broken and covered in graffiti? It looks fairly new, but I guess it’s done its job.", emotion: "Pity", date: "2023-09-17", gps: "40.72955° N, 73.99092° W" },
  "coincidence24": { note: "Is the photo upside down? Nope. So how are the icicles standing upright? I’ve forgotten the reason… This was taken inside Hwanseongul Cave, formed about 530 million years ago.", emotion: "Amazement", date: "2022-12-28", gps: "37.32351° N, 129.00838° E" },
  "coincidence25": { note: "Reminds me of Minions. So cute.", emotion: "Joy", date: "2023-09-20", gps: "40.72846° N, 73.99106° W" },
  "coincidence26": { note: "I guess someone threw this mirror on the ground. The cracks and the reflection of the building make it feel surreal when I keep staring at it.", emotion: "Mesmerize", date: "2025-09-03", gps: "40.73843° N, 73.99236° W" },
  "coincidence27": { note: "This is a piece I made back in high school art class. I spray-painted the broken pieces of a plate outside. I loved how the fence’s shadow fell across the plate, the newspaper, and the spray-paint can.", emotion: "Adventurous", date: "2021-04-20", gps: "37.37697° N, 127.09749° E" },

  "abstract1": { note: "I love using the camera as my eyes. Guess what this is... It's the bottom side of a plastic water bottle!", emotion: "Curiosity", date: "2024-04-04", gps: "40.74912° N, 73.98961° W" },
  "abstract2": { note: "Whenever I feel depressed, I express my feelings with watercolor.", emotion: "Melancholy", date: "2022-11-20", gps: "40.73550° N, 73.99330° W" },
  "abstract3": { note: "I saw this at Tiffany store in 5th Avenue. It looks like an egg, a tunnel, an eyeball of a dinosaur, a pill, a planet... and more.", emotion: "Daze", date: "2024-04-28", gps: "40.76285° N, 73.97355° W" },
  "abstract4": { note: "Took this photo at Whitney Museum. Jay DeFeo's 'The Rose' (1958-1966), one of my favorite artworks in NYC.", emotion: "Wonder", date: "2022-04-22", gps: "40.73954° N, 74.00905° W" },
  "abstract5": { note: "When I showed this photo to my friends, none of them could guess what it was — it’s actually a Bluetooth speaker glowing in the dark with the room lights off.", emotion: "Playful", date: "2019-07-02", gps: "N/A" },
  "abstract6": { note: "I want to have this sculpture on my bookshelf. Blue and yellow are my favorite colors.", emotion: "Possessive", date: "2025-05-10", gps: "40.75333° N, 74.00236° W" },
  "abstract7": { note: "Took this photo on my way home after class. I flipped it and it looked like a mountain.", emotion: "Amusement", date: "2025-02-28", gps: "40.73536° N, 73.99412° W" },
  "abstract8": { note: "Tadao Ando's work at Museum San, South Korea. I could stare at this architecture for whole day.", emotion: "Comfort", date: "2024-01-12", gps: "37.41603° N, 127.82333° E" },
  "abstract9": { note: "I saw James Turrell's work at Museum San. It's prohibited to take a photo during his exhibition experience, so I brought this image from a museum. Honestly, I wanted to live inside his work because it was such a fascinating experience.", emotion: "Ecstasy", date: "2025-06-02", gps: "N/A" },
  "abstract10": { note: "Another piece of watercolor I did when I felt lost and trapped.", emotion: "Heartache", date: "2022-10-05", gps: "N/A" },
  "abstract11": { note: "One of the works I created during my first year at Parsons. I always loved mimicking photos to create another world with my perspective. My professor loved my photo series.", emotion: "Enthusiasm", date: "2022-03-06", gps: "N/A" },
  "abstract12": { note: "Another version of the work during first year. See? There are lots of ways to create something unexpected with a photo.", emotion: "Enthusiasm", date: "2022-03-06", gps: "N/A" },

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

  "me-fam-frnds1": { note: "This is Harry! He’s a six-year-old Maltese, named after my dad’s first dog from his college days. We call him Harry the Second (like Henry VIII). I love him more than I love myself, and I miss him so much.", emotion: "Love, adore, thankful", date: "2024-09-24", gps: "N/A" },
  "me-fam-frnds2": { note: "This is a photo of me when I was about three or four years old, one of my earliest memories. Our family was visiting my grandfather’s vacation house in Bali, Indonesia. I was drinking water through a straw after playing with my sister and cousins, and my mom captured that moment.", emotion: "Nostalgic", date: "2023-06-08", gps: "N/A" },
  "me-fam-frnds3": { note: "My dad loves playing golf, and we’re always amazed at how tanned he gets from it. I once asked everyone to put their arms on the table to compare skin tones. From left to right: mom, me, dad, and older sister.", emotion: "Happy", date: "2023-07-28", gps: "37.52314° N, 127.03619° E" },
  "me-fam-frnds4": { note: "Took the photo at Laguna Beach, CA. Feet of dad, older sister, and me.", emotion: "Happy", date: "2018-06-17", gps: "33.54148° N, 117.78458° W" },
  "me-fam-frnds5": { note: "My mom took this photo of the three of us at Laguna Beach, CA. It's one of the core memories of my life.", emotion: "Nostalgic", date: "2018-06-17", gps: "33.54148° N, 117.78458° W" },
  "me-fam-frnds6": { note: "A polaroid photo by my mom. I got this Belle dress at Disneyland in California after begging my mom for hours. I wore it to my birthday pool party. Look how happy I am in the photo!", emotion: "Overjoyed", date: "2020-12-20", gps: "N/A" },
  "me-fam-frnds7": { note: "This is me before I was born. If you look closely, you can see my tiny arm raised in the middle. It feels strange yet fills me with gratitude every time I see this photo. It’s hard to believe how tiny I once was and how much my mom sacrificed for me and my older sister. Thank you, Mom. I love you.", emotion: "Subtle", emotion: "", date: "2020-12-20", gps: "N/A" },
  "me-fam-frnds8": { note: "Congratulations to Stella, my older sister! These are the gifts she gave me after her first week at NYU. When she was accepted, I started dreaming about going to college in New York so I could stay close to her and live together in the city. And that dream came true!", emotion: "Delightful", date: "2018-08-31", gps: "N/A" },
  "me-fam-frnds9": { note: "Family trip to Yosemite National Park before moving back to South Korea. Shot by my dad.", emotion: "Serenity", date: "2018-06-13", gps: "37.72055° N, 119.64855° W" },
  "me-fam-frnds10": { note: "Our very first dog, Haeng-Bok (which means happy in Korean), was adopted by one of our grandfathers. We loved her so much. Sadly, she was taken by a stranger when our housekeeper opened the door to air out the house. We spent weeks searching for her with missing dog flyers but never found her. I still tear up when I look at this photo. I remember how calm, elegant, and kind she was.", emotion: "Sorrow, heartache, grief...can't describe with words", date: "2014-10-11", gps: "33.63225° N, 117.83581° W" },
  "me-fam-frnds11": { note: "This was the first time I held a real golf club (other than a toy one). I always followed my dad and grandfather to the driving range, sitting on the sofa with snacks while watching them practice. The owner of the range thought I was getting bored, so she brought me a kid-sized club, and I finally got to practice on my own.", emotion: "Thrill", date: "2015-10-11", gps: "N/A" },
  "me-fam-frnds12": { note: "A photo of my mom in her twenties, taken in California while she was studying at UCLA. She brought us back here when we were kids and said it felt strange to return with us.", emotion: "Nostalgic", date: "2021-09-14", gps: "N/A" },
  "me-fam-frnds13": { note: "Another photo of my mom in her twenties. We loved watching the geese (or ducks) on the grass in California.", emotion: "Nostalgic", date: "2021-09-14", gps: "N/A" },
  "me-fam-frnds14": { note: "We went to a dessert shop in Seoul that had the cutest heart-shaped spoons, so I asked my family to gather so we could take a photo of all four hearts together.", emotion: "Warmth", date: "2023-07-28", gps: "37.52314° N, 127.03619° E" },
  "me-fam-frnds15": { note: "This is the putter my grandfather used when he was 29. He gave it to me as a gift, and I love feeling the passage of time whenever I use it. My mom took this photo while I was concentrating on putting the ball.", emotion: "Sentimentality", date: "2025-08-10", gps: "37.21568° N, 127.14342° E" },
  "me-fam-frnds16": { note: "I don’t remember what we were talking about, but I loved that moment when my sister and I just laughed together about random things and draw things on post it notes. I feel so deeply attached to her. She means a lot to me, and she’s the one who always makes me laugh.", emotion: "Love", date: "2017-09-04", gps: "33.66082° N, 117.82850° W" },
  "me-fam-frnds17": { note: "My very first drive in my mom’s car! I handwrote a “Novice Driver” sign in Korean and attached it to the back of the car, just to make it clear how new I was at this.", emotion: "Nervous", date: "2023-08-09", gps: "37.53493° N, 126.98716° E" },
  "me-fam-frnds18": { note: "My high school friend from California visited NYC with two of her friends. Another high school friend (who studies at Parsons) and I got there early to pick the menu, which was hard because I was starving. Anyway, it was so nice meeting both old and new friends. We talked all day until we needed throat candies!", emotion: "Joy", date: "2025-04-30", gps: "40.76311° N, 73.97537° W" },
  "me-fam-frnds19": { note: "This is me and my high school friend (also went to Parsons) jumping in the middle of our school’s soccer field. Who would have thought we’d both end up in NYC?", emotion: "Freedom", date: "2019-03-22", gps: "37.37805° N, 127.09799° E" },
  "me-fam-frnds20": { note: "I used to be scared of riding bicycles. My dad taught me well when I was in 2nd grade, but I was too timid, so I didn’t ride for years. Then, this summer in Seoul, I started riding an electric bike and it was absolutely thrilling. After that, I began riding bicycles all over the riverside paths, bridges, and forests in Seoul.", emotion: "Excitement, freedom", date: "2025-06-19", gps: "37.54613° N, 127.03954° E" },
  "me-fam-frnds21": { note: "One of my favorite portraits I created at Parsons. It was originally made for a film called 'Delirium' but I later edited it to make it feel more surreal and uncanny. It also reflects my feelings of loneliness and confusion.", emotion: "Isolated", date: "2022-10-06", gps: "N/A" },
  "me-fam-frnds22": { note: "Went to the restuarant I wanted to go with my oldest friend. We were friends since 1st grade.", emotion: "Excited", date: "2025-01-11", gps: "37.54630° N, 127.04928° E" },
  "me-fam-frnds23": { note: "", emotion: "", date: "2017-08-18", gps: "N/A" },
  "me-fam-frnds24": { note: "", emotion: "", date: "2018-04-20", gps: "33.65685° N, 117.82484° W" },
  "me-fam-frnds25": { note: "", emotion: "", date: "2021-05-20", gps: "37.37810° N, 127.09795° E" },
  "me-fam-frnds26": { note: "", emotion: "", date: "2025-04-30", gps: "40.73371° N, 73.99092° W" },
  "me-fam-frnds27": { note: "", emotion: "", date: "2025-04-30", gps: "40.74560° N, 73.98548° W" },
  "me-fam-frnds28": { note: "", emotion: "", date: "2016-06-03", gps: "33.62485° N, 117.82633° W" },
  "me-fam-frnds29": { note: "", emotion: "", date: "2025-08-12", gps: "37.54392° N, 126.92712° E" },
  "me-fam-frnds30": { note: "", emotion: "", date: "2023-12-02", gps: "40.74876° N, 73.98731° W" },
  "me-fam-frnds31": { note: "", emotion: "", date: "2018-05-18", gps: "33.64942° N, 117.76983° W" },
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
  "pure-joy17": { note: "", emotion: "", date: "2017-07-16", gps: "40.72377° N, 73.99649° W" },
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
      list.push({
        key: theme.prefix + i,
        theme: theme.key,
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
  return { x: cx + rad * Math.cos(th), y: cy + rad * Math.sin(th) };
}
function getThemeIndex(themeKey) {
  for (var i = 0; i < THEMES.length; i++) if (THEMES[i].key === themeKey) return i;
  return 0;
}

var stage   = document.getElementById("brain-stage");
var seqGrid = document.getElementById("sequence-grid");
var labelsBox = document.getElementById("labels");

var viewer = document.getElementById("viewer");
var closeBtn = document.getElementById("close-viewer");
var vImg  = document.getElementById("viewer-img");
var vTit  = document.getElementById("viewer-title");
var vNote = document.getElementById("viewer-note");
var vEmotion = document.getElementById("viewer-emotion");
var vDate = document.getElementById("viewer-date");
var vGPS  = document.getElementById("viewer-gps");

// Seen dots
const SEEN_KEY = 'brain_seen_v1';

try { localStorage.removeItem(SEEN_KEY); } catch (e) {}

function loadSeen(){
  try{
    var arr = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
    var set = new Set(Array.isArray(arr) ? arr.filter(x => typeof x === 'string') : []);
    if (ALL.length && set.size >= ALL.length * 0.9) return new Set();
    return set;
  }catch(e){ return new Set(); }
}

var seenSet = loadSeen();

function saveSeen(){
  localStorage.setItem(SEEN_KEY, JSON.stringify([...seenSet]));
}

function applySeenStyles(){
  dots.forEach(d => d.el.classList.toggle('seen', seenSet.has(d.info.key)));
  document.querySelectorAll('#sequence-grid .item').forEach(it => {
    var key = it.getAttribute('data-key');
    if (key) it.classList.toggle('seen', seenSet.has(key));
  });
}

function markSeen(key){
  if (!seenSet.has(key)) {
    seenSet.add(key);
    saveSeen();
    applySeenStyles();
  }
}

// Dots
var dots = [];
var dotByKey = Object.create(null);
function makeDot(info, areaIndex) {
  var base = Math.random() * (DOT_MAX - DOT_MIN) + DOT_MIN;

  var el = document.createElement("div");
  el.className = "dot " + THEMES[areaIndex].color;
  el.style.width = base + "px";
  el.style.height = base + "px";
  el.style.padding = HITPAD + "px";
  el.style.backgroundImage = "url(" + info.src + ")";
  el.style.animationDuration = (Math.random() * 2 + 4).toFixed(2) + "s";
  el.style.animationDelay    = (Math.random() * 3).toFixed(2) + "s";

  var pos = placeInCircle(CIRCLES[areaIndex]);
  var x = pos.x, y = pos.y;
  el.style.left = x + "px";
  el.style.top  = y + "px";

  var vx = rand(-0.06, 0.06), vy = rand(-0.06, 0.06);

  el.addEventListener("click", function(){ openViewer(info); markSeen(info.key); });

  var d = { el: el, x: x, y: y, vx: vx, vy: vy, w: base, h: base, pad: HITPAD, areaIndex: areaIndex, info: info, frozen:false };
  el.addEventListener("mouseenter", function(){ d.frozen = true; el.style.animationPlayState = 'paused'; });
  el.addEventListener("mouseleave", function(){
    d.frozen = false;
    d.vx = rand(-0.03, 0.03);
    d.vy = rand(-0.03, 0.03);
    el.style.animationPlayState = 'running';
  });

  stage.appendChild(el);
  return d;
}
function clearDots(){ stage.querySelectorAll(".dot").forEach(n => n.remove()); }
function buildDots(){
  clearDots(); dots.length = 0;
  dotByKey = Object.create(null);
  for (var i = 0; i < ALL.length; i++) {
    var info = ALL[i], idx = getThemeIndex(info.theme);
    var d = makeDot(info, idx);
    dots.push(d);
    dotByKey[info.key] = d;
  }
  applySeenStyles();
}
buildDots();

// Connecting lines
var linkSVG = null;
var connections = [];

function initLinkLayer(){
  if (linkSVG) return;
  linkSVG = document.createElementNS('http://www.w3.org/2000/svg','svg');
  linkSVG.classList.add('link-layer');
  linkSVG.setAttribute('width','100%');
  linkSVG.setAttribute('height','100%');
  linkSVG.setAttribute('viewBox','0 0 ' + window.innerWidth + ' ' + window.innerHeight);

  linkSVG.style.position = 'absolute';
  linkSVG.style.inset = '0';
  linkSVG.style.pointerEvents = 'none';
  linkSVG.style.zIndex = '2';
  stage.appendChild(linkSVG);
}

function connect(aKey, bKey, opts){
  initLinkLayer();
  var line = document.createElementNS('http://www.w3.org/2000/svg','line');
  line.setAttribute('class','link-line');
  line.setAttribute('stroke', (opts && opts.color) || 'rgba(255,255,255,.6)');
  line.setAttribute('stroke-width', (opts && opts.width) || 2);
  if (opts && opts.dash) line.setAttribute('stroke-dasharray', opts.dash);
  linkSVG.appendChild(line);
  connections.push({ aKey:aKey, bKey:bKey, line:line, opts:opts||{} });
}

function clearConnections(){
  connections.forEach(c => c.line && c.line.remove());
  connections.length = 0;
}

function centerOf(d){
  var w = d.el.offsetWidth;
  var h = d.el.offsetHeight;
  return { x: d.x + w/2, y: d.y + h/2 };
}

function updateConnections(){
  if (!connections.length || !linkSVG) return;

  linkSVG.setAttribute('viewBox','0 0 ' + window.innerWidth + ' ' + window.innerHeight);
  for (var i=0;i<connections.length;i++){
    var c = connections[i];
    var a = dotByKey[c.aKey];
    var b = dotByKey[c.bKey];
    if (!a || !b){
      c.line.setAttribute('opacity','0');
      continue;
    }
    var pa = centerOf(a), pb = centerOf(b);
    c.line.setAttribute('x1', pa.x);
    c.line.setAttribute('y1', pa.y);
    c.line.setAttribute('x2', pb.x);
    c.line.setAttribute('y2', pb.y);

    var hidden = a.el.classList.contains('hidden') || b.el.classList.contains('hidden');
    c.line.setAttribute('opacity', hidden ? (c.opts.hiddenOpacity || 0.18) : (c.opts.opacity || 0.8));
  }
}

window.addEventListener('resize', function(){
  if (linkSVG) linkSVG.setAttribute('viewBox','0 0 ' + window.innerWidth + ' ' + window.innerHeight);
});

var THEME_KEY_MAP = {
  coincidence: 'coincidence',
  abstract: 'abstract',
  micro: 'micro-macro',
  family: 'me-fam-frnds',
  joy: 'pure-joy',
  muse: 'muse-inspo'
};
var currentFocus = null;
var ZOOM = 2.2;
var keyEl = document.getElementById('key');
var resetBtn = document.getElementById('key-reset');

var isNeuronsMode = true;

function getThemeCenter(themeKey){
  var sx = 0, sy = 0, n = 0;
  for (var i = 0; i < dots.length; i++){
    var d = dots[i];
    if (d.info.theme !== themeKey) continue;
    var cx = d.x + (d.w + (d.pad || 0)*2) * 0.5;
    var cy = d.y + (d.h + (d.pad || 0)*2) * 0.5;
    sx += cx; sy += cy; n++;
  }
  if (n) return { x: sx/n, y: sy/n };
  var idx = getThemeIndex(themeKey);
  var c = CIRCLES[idx];
  return { x: c.cx * window.innerWidth, y: c.cy * window.innerHeight };
}

initLinkLayer();

var linesHidden = false;
var toggleBtn = null;

function refreshLinesToggleUI(){
  if (linkSVG) linkSVG.style.display = linesHidden ? 'none' : 'block';
  if (toggleBtn) {
    toggleBtn.textContent = linesHidden ? 'Show connections' : 'Hide connections';
    toggleBtn.setAttribute('aria-pressed', linesHidden ? 'true' : 'false');
  }
}

function bindToggle(){
  toggleBtn = document.getElementById('toggle-lines');
  if (!toggleBtn) {
    console.warn('#toggle-lines not found');
    return;
  }
  toggleBtn.addEventListener('click', function(){
    linesHidden = !linesHidden;
    refreshLinesToggleUI();
  });
  refreshLinesToggleUI();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindToggle);
} else {
  bindToggle();
}

window.addEventListener('resize', refreshLinesToggleUI);

// apply zoom (Neurons)
function applyFocus() {
  if (!isNeuronsMode) return;
  stage.style.transformOrigin = '0 0';
  if (!currentFocus) { stage.style.transform = 'translate(0,0) scale(1)'; return; }
  var p = getThemeCenter(currentFocus);
  var s = ZOOM, ww = window.innerWidth, wh = window.innerHeight;
  var dx = (ww * 0.5) - (p.x * s);
  var dy = (wh * 0.5) - (p.y * s);
  stage.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
}

// filter grid (Sequence)
function filterSequenceGrid(themeKey){
  var items = seqGrid.querySelectorAll('.item');
  if (!items.length) return;
  var showAll = !themeKey;
  items.forEach(function(it){
    var t = it.getAttribute('data-theme');
    it.style.display = (showAll || t === themeKey) ? '' : 'none';
  });
  if (!showAll) seqGrid.scrollTop = 0;
}

function clearFocus() {
  currentFocus = null;

  stage.style.transformOrigin = '0 0';
  stage.style.transform = 'translate(0,0) scale(1)';
  dots.forEach(d => d.el.classList.remove('big','hidden'));

  filterSequenceGrid(null);

  if (keyEl) keyEl.querySelectorAll('li').forEach(li => li.classList.remove('active'));
  if (resetBtn) resetBtn.classList.add('hide');
}

function focusTheme(themeKey) {
  if (currentFocus === themeKey) { clearFocus(); return; }
  currentFocus = themeKey;

  if (keyEl) {
    keyEl.querySelectorAll('li').forEach(function(li){
      var t = THEME_KEY_MAP[li.classList[0]];
      li.classList.toggle('active', t === themeKey);
    });
  }
  if (resetBtn) resetBtn.classList.remove('hide');

  if (isNeuronsMode) {
    dots.forEach(function(d){
      var match = (d.info.theme === themeKey);
      d.el.classList.toggle('big', match);
      d.el.classList.toggle('hidden', !match);
    });
    applyFocus();
  } else {
    filterSequenceGrid(themeKey);
  }
}

if (keyEl) {
  keyEl.querySelectorAll('li').forEach(function(li){
    li.addEventListener('click', function(e){
      e.stopPropagation();
      var theme = THEME_KEY_MAP[this.classList[0]];
      if (theme) focusTheme(theme);
    });
  });
}
if (resetBtn) resetBtn.addEventListener('click', function(e){ e.stopPropagation(); clearFocus(); });
stage.addEventListener('click', function(e){ if (e.target === stage) clearFocus(); });
window.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !viewer.classList.contains('open')) clearFocus(); });
window.addEventListener('resize', function(){ if (isNeuronsMode) applyFocus(); });

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
    (function (index) {
      var el = labelEls[index], c = CIRCLES[index];
      el.style.left = (c.cx * sw) + "px";
      el.style.top  = (c.cy * sh) + "px";
      el.onclick = function () {
        for (var k = 0; k < dots.length; k++) dots[k].el.style.opacity = (dots[k].areaIndex === index) ? "1" : "0.18";
        setTimeout(function(){ for (var k2 = 0; k2 < dots.length; k2++) dots[k2].el.style.opacity = ""; }, 2500);
      };
    })(i);
  }
}
buildLabels();
window.addEventListener("resize", positionLabels);

// Animation
var last = 0, SPEED = 0.18;
function loop(t) {
  if (!last) last = t;
  var dt = (t - last) / 16.7; last = t;
  var sw = window.innerWidth, sh = window.innerHeight;

  for (var i = 0; i < dots.length; i++) {
    var d = dots[i];
    if (d.frozen) { d.el.style.left = d.x + "px"; d.el.style.top  = d.y + "px"; continue; }

    d.x += d.vx * dt * SPEED; d.y += d.vy * dt * SPEED;

    var c = CIRCLES[d.areaIndex];
    var cx = c.cx * sw, cy = c.cy * sh, R = c.r * R_SCALE * Math.min(sw, sh);
    var rx = (d.w + (d.pad || 0) * 2) * 0.5;
    var ry = (d.h + (d.pad || 0) * 2) * 0.5;
    var pr = Math.max(rx, ry);
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

  updateConnections();

  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

buildDots();

connect('me-fam-frnds11', 'me-fam-frnds15', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('pure-joy6', 'me-fam-frnds5', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('me-fam-frnds17', 'pure-joy52', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('me-fam-frnds8', 'pure-joy27', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('coincidence21', 'pure-joy47', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('coincidence27', 'me-fam-frnds35', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('muse-inspo24', 'pure-joy11', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('me-fam-frnds25', 'pure-joy36', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('muse-inspo51', 'pure-joy21', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('micro-macro25', 'pure-joy35', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('muse-inspo52', 'coincidence11', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('pure-joy20', 'coincidence36', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('micro-macro4', 'pure-joy16', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('me-fam-frnds24', 'pure-joy37', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('me-fam-frnds22', 'pure-joy49', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('me-fam-frnds28', 'pure-joy14', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('abstract5', 'pure-joy38', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('coincidence9', 'muse-inspo55', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('coincidence25', 'micro-macro19', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('abstract1', 'micro-macro19', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('micro-macro32', 'pure-joy33', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('coincidence10', 'pure-joy50', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('pure-joy24', 'pure-joy63', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('coincidence20', 'pure-joy35', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('muse-inspo44', 'coincidence26', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('abstract2', 'muse-inspo42', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('muse-inspo54', 'pure-joy64', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('abstract7', 'me-fam-frnds9', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('pure-joy29', 'pure-joy49', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('me-fam-frnds20', 'pure-joy39', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});
connect('coincidence23', 'pure-joy43', {color:'#a2a2a2ff', width:0.8, dash:'4,6'});

// Viewer window
function openViewer(info){
  var m = (typeof META !== 'undefined' ? META[info.key] : null) || {};
  vImg.src = info.src;
  vTit.textContent = info.key;
  vNote.textContent = "Note: " + (m.note || "—");
  vEmotion.textContent = "Emotion: " + (m.emotion || "—");
  vDate.textContent = "Date: " + (m.date || "—");
  vGPS.textContent  = "GPS Coordinates: " + (m.gps || "—");
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

// Sequence grid
function buildSequence(){
  seqGrid.innerHTML = "";
  var sorted = ALL.slice(0).sort(function(a,b){ return a.key.localeCompare(b.key, undefined, {numeric:true}); });
  for (var i = 0; i < sorted.length; i++) {
    (function(info){
      var it = document.createElement("div");
      it.className = "item";
      it.setAttribute('data-key', info.key);
      it.setAttribute('data-theme', info.theme);
      it.style.backgroundImage = "url(" + info.src + ")";
      it.title = info.key;
      it.addEventListener("click", function(){ openViewer(info); markSeen(info.key); });
      seqGrid.appendChild(it);
    })(sorted[i]);
  }
  applySeenStyles();
}
buildSequence();

// Mode switching (Neurons, Sequence, Statement)
var btnNeurons     = document.getElementById("mode-neurons");
var btnSeq         = document.getElementById("mode-seq");
var btnStatements  = document.getElementById("mode-statement");
var brainStage     = document.getElementById("brain-stage");
var sequenceGrid   = document.getElementById("sequence-grid");
var statementPage = document.getElementById("statement-page");

var isNeuronsMode = true;

function setMode(mode){
  if (typeof clearFocus === "function") clearFocus();

  var neurons    = (mode === "neurons");
  var sequence   = (mode === "seq");
  var statement = (mode === "statement");

  isNeuronsMode = neurons;

  document.body.classList.toggle("neurons-mode",    neurons);
  document.body.classList.toggle("seq-mode",        sequence);
  document.body.classList.toggle("statement-mode", statement);

  if (btnNeurons){    btnNeurons.classList.toggle("active", neurons);    btnNeurons.setAttribute("aria-pressed", neurons ? "true" : "false"); }
  if (btnSeq){        btnSeq.classList.toggle("active", sequence);       btnSeq.setAttribute("aria-pressed", sequence ? "true" : "false"); }
  if (btnStatements){ btnStatements.classList.toggle("active", statement); btnStatements.setAttribute("aria-pressed", statement ? "true" : "false"); }

  if (brainStage)     brainStage.style.display     = neurons    ? "block" : "none";
  if (sequenceGrid)   sequenceGrid.style.display   = sequence   ? "block" : "none";
  if (statementPage) statementPage.style.display = statement ? "block" : "none";

  if (sequence && typeof filterSequenceGrid === "function") {
    filterSequenceGrid(currentFocus);
  }
}

if (btnNeurons)    btnNeurons.addEventListener("click", () => setMode("neurons"));
if (btnSeq)        btnSeq.addEventListener("click",     () => setMode("seq"));
if (btnStatements) btnStatements.addEventListener("click", () => setMode("statement"));

window.addEventListener("keydown", (e) => {
  if (e.key === "1") setMode("neurons");
  if (e.key === "2") setMode("seq");
  if (e.key === "3") setMode("statement");
});

setMode("neurons");