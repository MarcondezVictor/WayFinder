export interface CostBreakdown {
  lodging: number; // Avg cost per night in EUR
  food: number; // Daily food cost in EUR
  transport: number; // Avg public transit ticket/short ride in EUR
  diningOut: number; // Mid-range restaurant meal for one in EUR
  localSim: number; // Cost of 10GB mobile data in EUR
  indexRating: "Low" | "Medium" | "High" | "Very High";
}

export interface PointOfInterest {
  name: string;
  description: string;
  imageUrl: string;
}

export interface CountryData {
  id: string;
  name: string;
  slug: string;
  isoCode: string;
  flagEmoji: string;
  tagline: string;
  description: string;
  imageUrl: string;
  visaInfo: string;
  passportInfo: string;
  safetyScore: number; // 1-10 (10 being safest)
  safetyDetails: string;
  climateType: string;
  climateDetails: string;
  avgCostDaily: number; // Total estimated average daily budget in EUR
  costsDetails: CostBreakdown;
  pointsOfInterest: PointOfInterest[];
}

export const countriesData: CountryData[] = [
  {
    id: "1",
    name: "Portugal",
    slug: "portugal",
    isoCode: "PT",
    flagEmoji: "🇵🇹",
    tagline: "Land of discovery, golden coastlines, and historic charm.",
    description: "Nestled on the Iberian Peninsula, Portugal offers a rich historical legacy, world-class beaches, spectacular cuisine (like the famous Pasteis de Nata), and a welcoming climate that makes it one of Europe's top relocation and travel destinations.",
    imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
    visaInfo: "EU/EEA citizens do not need a visa. Americans, Canadians, and UK citizens can enter for tourism visa-free for up to 90 days in any 180-day period. For long-term stays, Portugal offers the popular D7 Passive Income Visa, D2 Entrepreneur Visa, and Digital Nomad Visas.",
    passportInfo: "Passports must be valid for at least 3 months beyond the planned departure date from the Schengen Area, and must have been issued within the last 10 years.",
    safetyScore: 9,
    safetyDetails: "Consistently ranked among the top 10 safest countries globally in the Global Peace Index. Low crime rates, friendly locals, and a highly stable political environment. Normal travel precautions apply in busy tourist zones regarding pickpocketing.",
    climateType: "Mediterranean",
    climateDetails: "Mild winters and hot, dry summers. With over 300 days of sunshine annually, the southern Algarve region is highly temperate, while the north is cooler and wetter.",
    avgCostDaily: 75,
    costsDetails: {
      lodging: 45,
      food: 20,
      transport: 5,
      diningOut: 12,
      localSim: 10,
      indexRating: "Medium",
    },
    pointsOfInterest: [
      {
        name: "Belém Tower (Lisbon)",
        description: "A 16th-century fortified tower that served as a ceremonial gateway to Lisbon and played a key role in maritime discoveries.",
        imageUrl: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Pena Palace (Sintra)",
        description: "A Romanticist palace standing on a hilltop in the Sintra Mountains, famous for its vivid colors and eclectic architecture.",
        imageUrl: "https://images.unsplash.com/photo-1579970080444-bd9eed0e7bf6?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Luís I Bridge (Porto)",
        description: "An iconic double-deck metal arch bridge that spans the River Douro, connecting Porto with Vila Nova de Gaia.",
        imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=600&q=80",
      }
    ]
  },
  {
    id: "2",
    name: "Brazil",
    slug: "brazil",
    isoCode: "BR",
    flagEmoji: "🇧🇷",
    tagline: "A vibrant continent-sized country of carnival, rain forest, and beaches.",
    description: "Brazil is synonymous with high energy, natural wonders like the Amazon and Iguaçu Falls, world-famous beaches like Copacabana, and a vibrant cultural tapestry built upon music, dance, and diverse cultural groups.",
    imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    visaInfo: "Visa exemptions exist for many nationalities (including EU, UK, and South American citizens) for tourist stays of up to 90 days. US, Canadian, and Australian passport holders may require an e-Visa. Brazil also recently launched an attractive Digital Nomad Visa.",
    passportInfo: "Passport must be valid for the duration of the stay. It is recommended to have at least 6 months validity.",
    safetyScore: 5,
    safetyDetails: "Crime rates can be high in major urban centers, especially in specific neighborhoods. Travelers are advised to avoid displaying expensive items, be cautious after dark, use registered taxis or ride-shares, and follow local advice.",
    climateType: "Tropical & Subtropical",
    climateDetails: "Mostly warm and humid year-round due to the equator crossing the north. The south has distinct four seasons with cooler winters.",
    avgCostDaily: 50,
    costsDetails: {
      lodging: 28,
      food: 14,
      transport: 3,
      diningOut: 8,
      localSim: 8,
      indexRating: "Low",
    },
    pointsOfInterest: [
      {
        name: "Christ the Redeemer (Rio de Janeiro)",
        description: "An iconic Art Deco statue of Jesus Christ overlooking Rio de Janeiro from the summit of Mount Corcovado.",
        imageUrl: "https://images.unsplash.com/photo-1564659995183-715fab39a6ec?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Iguaçu Falls (Foz do Iguaçu)",
        description: "A spectacular collection of 275 waterfalls spanning the border between Brazil and Argentina, surrounded by lush rainforest.",
        imageUrl: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Pelourinho (Salvador)",
        description: "The historic center of Salvador, Bahia, renowned for its colorful Portuguese colonial architecture and vibrant Afro-Brazilian culture.",
        imageUrl: "https://images.unsplash.com/photo-1599408162145-899009b4c110?auto=format&fit=crop&w=600&q=80",
      }
    ]
  },
  {
    id: "3",
    name: "Ukraine",
    slug: "ukraine",
    isoCode: "UA",
    flagEmoji: "🇺🇦",
    tagline: "A land of brave hearts, golden domes, and vast golden fields.",
    description: "Ukraine is Eastern Europe's second-largest country, rich in history, ancient cathedrals, beautiful diverse landscapes, and a warm, incredibly resilient culture. Despite current challenges, its cultural impact and technological spirit remain globally respected.",
    imageUrl: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=1200&q=80",
    visaInfo: "Citizens of the US, EU, UK, Canada, and many others enjoy visa-free entry for up to 90 days within 180 days for tourism and business purposes.",
    passportInfo: "Passports must be valid for at least 3 months after the planned date of departure and have been issued within the last 10 years.",
    safetyScore: 3,
    safetyDetails: "Due to the ongoing war, the country is currently under martial law. Air alerts and drone/missile strikes occur nationwide. Highly advised against all non-essential travel except for verified humanitarian or official purposes with proper security protocols.",
    climateType: "Moderate Continental",
    climateDetails: "Cold winters with snow and warm, sunny summers. The southern coast on the Black Sea historically has a milder, sub-Mediterranean climate.",
    avgCostDaily: 35,
    costsDetails: {
      lodging: 18,
      food: 10,
      transport: 2,
      diningOut: 6,
      localSim: 5,
      indexRating: "Low",
    },
    pointsOfInterest: [
      {
        name: "St. Sophia's Cathedral (Kyiv)",
        description: "An outstanding architectural monument of Kyivan Rus' founded in the 11th century, famed for its breathtaking golden domes and mosaics.",
        imageUrl: "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Lviv Old Town",
        description: "A UNESCO World Heritage site known for its medieval layout, Renaissance and Baroque architecture, and vibrant coffeehouse culture.",
        imageUrl: "https://images.unsplash.com/photo-1569429597341-39e1ff51e604?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Carpathian Mountains",
        description: "A beautiful range offering pristine pine forests, high-altitude alpine meadows, hiking trails, and traditional Hutsul culture.",
        imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
      }
    ]
  },
  {
    id: "4",
    name: "France",
    slug: "france",
    isoCode: "FR",
    flagEmoji: "🇫🇷",
    tagline: "The global home of art, fashion, gastronomy, and romance.",
    description: "France has been the world's most popular tourist destination for decades. From the romantic streets of Paris to the sunny vineyards of Bordeaux and the glamorous French Riviera, it offers unparalleled cultural wealth and scenic beauty.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    visaInfo: "EU/EEA citizens have full freedom of movement. US, Canadian, UK, and Australian citizens do not need a visa for up to 90 days in the Schengen Area.",
    passportInfo: "Passports must be valid for at least 3 months beyond the planned departure date from the Schengen Area, and must have been issued within the last 10 years.",
    safetyScore: 8,
    safetyDetails: "A generally safe country for travelers. Primary concerns are pickpocketing and scams in major tourist areas like Paris, and occasional political demonstrations. Usual urban precautions should be taken.",
    climateType: "Temperate & Mediterranean",
    climateDetails: "Cool winters and warm summers in Paris and northern France. Southern France has a dry, hot Mediterranean climate with warm winters.",
    avgCostDaily: 110,
    costsDetails: {
      lodging: 65,
      food: 28,
      transport: 6,
      diningOut: 18,
      localSim: 12,
      indexRating: "High",
    },
    pointsOfInterest: [
      {
        name: "Eiffel Tower (Paris)",
        description: "The global icon of France, this massive iron lattice tower stands on the Champ de Mars, towering over the Paris skyline.",
        imageUrl: "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Palace of Versailles",
        description: "The principal royal residence of France from 1682 until the French Revolution, famed for its breathtaking Hall of Mirrors and vast gardens.",
        imageUrl: "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Mont Saint-Michel (Normandy)",
        description: "A stunning tidal island and medieval abbey rising dramatically from the sea flats off the coast of Normandy.",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
      }
    ]
  },
  {
    id: "5",
    name: "Spain",
    slug: "spain",
    isoCode: "ES",
    flagEmoji: "🇪🇸",
    tagline: "Sun-drenched plazas, vibrant festivals, and historic marvels.",
    description: "Spain is a captivating combination of sunny weather, beautiful beaches, regional tapestries (from Catalonia to Andalusia), historic architecture (including Islamic palatial forts), and dynamic lifestyle characterized by late-night tapas and siestas.",
    imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80",
    visaInfo: "EU/EEA citizens enjoy full freedom of movement. US, Canadian, UK, and Australian citizens do not need a visa for up to 90 days in the Schengen Area. Spain also has an extremely popular Digital Nomad Visa.",
    passportInfo: "Passports must be valid for at least 3 months beyond the planned departure date from the Schengen Area.",
    safetyScore: 8,
    safetyDetails: " Spain is one of the safest countries in Europe. Petty crime like pickpocketing is common in major metropolitan areas, especially Barcelona and Madrid, and on public transport. Always guard belongings.",
    climateType: "Mediterranean & Semi-Arid",
    climateDetails: "Hot, dry summers and mild, wet winters. Central Spain (Madrid) has a more continental climate with cold winters and very hot summers.",
    avgCostDaily: 80,
    costsDetails: {
      lodging: 48,
      food: 22,
      transport: 4,
      diningOut: 14,
      localSim: 10,
      indexRating: "Medium",
    },
    pointsOfInterest: [
      {
        name: "La Sagrada Família (Barcelona)",
        description: "Antoni Gaudí's unfinished masterpiece, an astonishing organic modernist basilica that has been under construction since 1882.",
        imageUrl: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "The Alhambra (Granada)",
        description: "A monumental palace and fortress complex originally built by Moorish monarchs, showing Spain's incredible Islamic art legacy.",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Plaza de España (Seville)",
        description: "A breathtaking semi-circular brick palace complex built in 1928, highlighting Andalusian tilework and beautiful canals.",
        imageUrl: "https://images.unsplash.com/photo-1523531294919-4bea7c65e894?auto=format&fit=crop&w=600&q=80",
      }
    ]
  },
  {
    id: "6",
    name: "United States",
    slug: "united-states",
    isoCode: "US",
    flagEmoji: "🇺🇸",
    tagline: "Vast landscapes, towering skylines, and cinematic road trips.",
    description: "The United States is an epic destination spanning six time zones, offering everything from historic metropolitan hubs like New York and Chicago to spectacular national parks like Yellowstone and the Grand Canyon.",
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
    visaInfo: "Citizens of 41 countries (including most of EU, UK, Japan, Australia) can enter visa-free for up to 90 days under the Visa Waiver Program via an ESTA authorization. Others must apply for a B1/B2 Visitor Visa.",
    passportInfo: "Passports must be valid for at least 6 months beyond the intended period of stay, though exemptions apply to 'Six Month Club' members (including EU and UK).",
    safetyScore: 7,
    safetyDetails: "Generally safe for travelers, though crime conditions vary significantly between cities and neighborhoods. Visitors are advised to research urban neighborhoods beforehand, be alert at night, and take normal safety precautions.",
    climateType: "Extremely Diverse",
    climateDetails: "Ranges from tropical (Hawaii, Florida) and arid desert (Nevada) to temperate-marine (Pacific Northwest) and subarctic (Alaska).",
    avgCostDaily: 160,
    costsDetails: {
      lodging: 100,
      food: 38,
      transport: 12,
      diningOut: 25,
      localSim: 25,
      indexRating: "Very High",
    },
    pointsOfInterest: [
      {
        name: "Statue of Liberty (New York)",
        description: "A colossal neoclassical copper sculpture on Liberty Island in New York Harbor, symbolizing freedom and welcoming immigrants.",
        imageUrl: "https://images.unsplash.com/photo-1522083165195-3427ec0297be?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Grand Canyon (Arizona)",
        description: "A massive, breathtaking gorge carved by the Colorado River, famous for its layered red rock formations and immense scale.",
        imageUrl: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Golden Gate Bridge (San Francisco)",
        description: "A world-famous orange suspension bridge spanning the golden gate strait, connecting San Francisco to Marin County.",
        imageUrl: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80",
      }
    ]
  },
  {
    id: "7",
    name: "Japan",
    slug: "japan",
    isoCode: "JP",
    flagEmoji: "🇯🇵",
    tagline: "Hyper-modern neon cities blended with deep ancient traditions.",
    description: "Japan is an island nation that perfectly blends cutting-edge technology, neon-lit bullet trains, and anime districts with serene Shinto shrines, Zen gardens, majestic temples, and beautiful cherry blossom seasons.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    visaInfo: "Japan has visa exemption agreements with 70 countries (including EU, US, Canada, UK, Australia) for short-term stays of up to 90 days. A new digital nomad visa was recently launched in 2024.",
    passportInfo: "Passports must be valid for the duration of the intended stay. No minimum validity period is mandated by law, but having 6 months is safe.",
    safetyScore: 10,
    safetyDetails: "Consistently ranked as one of the safest countries in the world. Extremely low rates of petty and violent crime. It is safe to walk alone at night, though travelers should watch for common tourist district nightlife scams.",
    climateType: "Temperate & Alpine",
    climateDetails: "Four distinct, beautiful seasons. Hot, humid summers and cold, snowy winters in the north. Spring (cherry blossoms) and Autumn (foliage) are peak seasons.",
    avgCostDaily: 105,
    costsDetails: {
      lodging: 60,
      food: 26,
      transport: 8,
      diningOut: 15,
      localSim: 18,
      indexRating: "High",
    },
    pointsOfInterest: [
      {
        name: "Mount Fuji",
        description: "An active stratovolcano and Japan's highest mountain, offering a majestic, snow-capped silhouette that has inspired art for centuries.",
        imageUrl: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Fushimi Inari Shrine (Kyoto)",
        description: "An important Shinto shrine famous for its stunning path of over 10,000 vibrant orange vermilion torii gates winding up the mountain.",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Shibuya Crossing (Tokyo)",
        description: "The world's busiest pedestrian intersection, located in front of Shibuya Station, surrounded by giant screens and neon lights.",
        imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=600&q=80",
      }
    ]
  },
  {
    id: "8",
    name: "United Kingdom",
    slug: "united-kingdom",
    isoCode: "GB",
    flagEmoji: "🇬🇧",
    tagline: "Rolling green countryside, medieval castles, and royal heritage.",
    description: "The UK, comprising England, Scotland, Wales, and Northern Ireland, offers a captivating mixture of historic castles, iconic academic cities, rugged coastlines, and a vibrant cultural sphere dominated by theater, music, and pubs.",
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    visaInfo: "EU/EEA, US, Canadian, and Australian citizens do not need a visa for tourist visits of up to 6 months. For working or long-term stays, various points-based visa routes are required.",
    passportInfo: "Passports must be valid for the duration of the stay. It should be in good condition.",
    safetyScore: 8,
    safetyDetails: "A safe country overall. Minor crimes like phone snatching and pickpocketing are common in busy areas of London and other major cities. Safe to travel by public transport night and day.",
    climateType: "Temperate Maritime",
    climateDetails: "Cool, damp, and highly changeable. The UK has mild winters and warm, humid summers, with rainfall evenly distributed throughout the year.",
    avgCostDaily: 125,
    costsDetails: {
      lodging: 75,
      food: 30,
      transport: 8,
      diningOut: 20,
      localSim: 10,
      indexRating: "High",
    },
    pointsOfInterest: [
      {
        name: "Big Ben & Westminster (London)",
        description: "The stunning gothic Palace of Westminster and its world-famous clock tower, standing majestically on the River Thames.",
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Edinburgh Castle (Scotland)",
        description: "A historic fortress dominating the skyline of Edinburgh, built atop the volcanic Castle Rock.",
        imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Stonehenge (Wiltshire)",
        description: "A mysterious prehistoric monument consisting of a ring of standing stones, dating back to 3000 BC.",
        imageUrl: "https://images.unsplash.com/photo-1507731739823-5e881400e28e?auto=format&fit=crop&w=600&q=80",
      }
    ]
  },
  {
    id: "9",
    name: "Italy",
    slug: "italy",
    isoCode: "IT",
    flagEmoji: "🇮🇹",
    tagline: "Vibrant coastal villages, ruins of empire, and culinary perfection.",
    description: "Italy holds the largest number of UNESCO World Heritage sites in the world. From the ruins of Rome and canals of Venice to the breathtaking Amalfi Coast and Tuscan hills, it offers a legendary cultural and culinary experience.",
    imageUrl: "https://images.unsplash.com/photo-1529260830199-445826f3fbe5?auto=format&fit=crop&w=1200&q=80",
    visaInfo: "EU/EEA citizens enjoy full freedom of movement. US, Canadian, UK, and Australian citizens do not need a visa for up to 90 days in the Schengen Area.",
    passportInfo: "Passports must be valid for at least 3 months beyond the planned departure date from the Schengen Area.",
    safetyScore: 8,
    safetyDetails: "Very safe for travelers. The main concern is pickpocketing in tourist hotspots like Rome's Colosseum, Florence, and Venice. Always keep valuables in secure pockets.",
    climateType: "Mediterranean",
    climateDetails: "Hot, dry summers and mild, wet winters. Central and northern regions can get cold and snowy during the winter months.",
    avgCostDaily: 90,
    costsDetails: {
      lodging: 55,
      food: 24,
      transport: 5,
      diningOut: 15,
      localSim: 10,
      indexRating: "Medium",
    },
    pointsOfInterest: [
      {
        name: "The Colosseum (Rome)",
        description: "An immense oval amphitheater in the center of Rome, the largest ancient amphitheater ever built by the Roman Empire.",
        imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Duomo di Firenze (Florence)",
        description: "The spectacular cathedral of Florence, renowned for its giant brick dome engineered by Filippo Brunelleschi.",
        imageUrl: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Amalfi Coast",
        description: "A stunning stretch of mountainous coastline dotted with pastel-colored fishing villages clinging to steep cliffs.",
        imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80",
      }
    ]
  }
];
