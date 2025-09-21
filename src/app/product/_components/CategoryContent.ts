// data/categoryContent.ts

export interface ContentBlock {
    type: 'heading' | 'paragraph' | 'points';
    level?: 2 | 3 | 4; // for headings
    text?: string; // for headings and paragraphs
    items?: string[]; // for bullet points
  }
  
  export interface CategorySection {
    sectionTitle: string;
    content: ContentBlock[];
  }
  
  export interface CategoryContent {
    categoryName: string;
    description?: string; // Optional main category description
    sections: CategorySection[];
  }
  
  export const categoryContentData: Record<string, CategoryContent> = {
    "ASHTRAY": {
      categoryName: "Premium Ashtrays Collection",
      description: "Elevate your smoking experience with our carefully curated selection of premium ashtrays. From crystal-clear elegance to modern functionality, our collection combines style with practicality for the discerning smoker.",
      sections: [
        {
          sectionTitle: "RAW Ashtrays – Where Style and Smoke Unite",
          content: [
            {
              type: 'paragraph',
              text: 'Elevate your smoking experience with the legendary RAW Ashtray—a fusion of classic elegance and contemporary craftsmanship. Delicately crafted for the aficionado, every ashtray is a fashion statement that combines utility with the unmistakable style of RAW.'
            },
            {
              type: 'points',
              items: [
                'Crystal-Clear Elegance: Handmade from top-quality lead-free crystal glass, RAW ashtrays provide high-quality elegance without compromising safety',
                'Heavyweight Construction: Weighing in at a hefty 3.5 lbs, these ashtrays are made to last and capture the feel of mid-century Art Deco originals',
                'Scratch-Resistant Base: Velvet-bottomed bases protect your surfaces and feel high-end',
                'Magnetic Packaging: Adorned in a thin, magnetically sealed holder with the RAW logo stamped—great for gift-giving or showcasing',
                'Octagonal Shape: Strong, geometric look providing any space with a retro flair, it\'s not only an ashtray—it\'s a centerpiece'
              ]
            }
          ]
        },
        {
          sectionTitle: "Lotus Ashtrays: The Perfect Blend of Functionality and Design",
          content: [
            {
              type: 'paragraph',
              text: 'Lotus Ashtrays are thoughtful smoking accessories that incorporate both design and function. Made from first-rate materials such as metal, ceramic, and melamine, Lotus Ashtrays are made to last and withstand the rigors of smoking.'
            },
            {
              type: 'points',
              items: [
                'Several models, including the awesome Lotus Nomad Rectangular 2-Stick Ashtray, have several cigar rests so you can enjoy your smoke without having to bother holding your cigar',
                'Dishwasher Safe: Many of the Lotus Ashtrays are dishwasher-safe for easy cleaning, which makes cleaning up simple',
                'Stylish Designs: Lotus Ashtrays are great gifts for cigar smokers, and models such as the Lotus Road Trip Travel Ashtray are designed to fit in most automobile cup holders to accommodate while driving'
              ]
            }
          ]
        },
        {
          sectionTitle: "Specialty Ashtrays Collection",
          content: [
            {
              type: 'paragraph',
              text: 'Explore our diverse range of specialty ashtrays including silicone, ceramic, aluminum, and novelty designs. Each category offers unique benefits for different preferences and environments.'
            },
            {
              type: 'heading',
              level: 4,
              text: 'ROOR Crystal Cut Ashtray'
            },
            {
              type: 'paragraph',
              text: 'The ROOR Crystal Cut Ashtray is a luxury accessory that combines aesthetics and functional design, making it an essential addition for smokers and collectors.'
            },
            {
              type: 'points',
              items: [
                'Quality Crystal Material: Made from durable lead-free crystal, this ashtray is built to last with an elegant finish',
                'Great Design: With a beautiful crystal cut design, it adds an air of sophistication to any location',
                'Multiple Uses: While primarily intended for use as an ashtray, its appearance lends itself to being used as a decorative piece or jewelry tray',
                'Size: Weighs approximately 10 oz, with a diameter of about 3.75" and height of 1"'
              ]
            }
          ]
        }
      ]
    },
  
    "CIGAR HOT": {
      categoryName: "Hot Selling Cigars",
      description: "Discover our most popular and trending cigar selections. These hot-selling cigars represent the finest in tobacco craftsmanship and customer favorites.",
      sections: [
        {
          sectionTitle: "Premium Selection",
          content: [
            {
              type: 'paragraph',
              text: 'Our hot-selling cigar collection features the most sought-after brands and blends in the market today.'
            },
            {
              type: 'points',
              items: [
                'Trending tobacco blends and popular flavor profiles',
                'Premium construction and quality assurance',
                'Customer favorites and bestsellers',
                'Limited edition and seasonal offerings',
                'Various sizes and strength options available'
              ]
            }
          ]
        }
      ]
    },
  
    "CIGAR BY BRAND NEW": {
      categoryName: "New Cigar Brands",
      description: "Explore the latest additions to our cigar collection. Featuring new brands, innovative blends, and fresh takes on classic tobacco traditions.",
      sections: [
        {
          sectionTitle: "Latest Brand Arrivals",
          content: [
            {
              type: 'paragraph',
              text: 'Stay ahead of the curve with our newest cigar brand offerings, featuring innovative blends and exciting new tobacco experiences.'
            },
            {
              type: 'points',
              items: [
                'Newly launched cigar brands and manufacturers',
                'Innovative tobacco blending techniques',
                'Fresh flavor profiles and unique characteristics',
                'Limited initial releases and exclusive offerings',
                'Emerging artisan and boutique cigar makers'
              ]
            }
          ]
        }
      ]
    },
  
    "CIGAR ACCESSORIES": {
      categoryName: "Premium Cigar Accessories",
      description: "Complete your cigar experience with our comprehensive selection of premium accessories. From cutters and lighters to humidors and ashtrays.",
      sections: [
        {
          sectionTitle: "Essential Cigar Tools",
          content: [
            {
              type: 'paragraph',
              text: 'Enhance your cigar smoking experience with professional-grade accessories designed for the discerning aficionado.'
            },
            {
              type: 'points',
              items: [
                'Premium cigar cutters and guillotines',
                'Torch lighters and cigar-specific lighting solutions',
                'Humidors and storage solutions for optimal preservation',
                'Specialized cigar ashtrays with multiple rests',
                'Travel cases and portable accessories',
                'Cigar stands and display accessories'
              ]
            }
          ]
        },
        {
          sectionTitle: "Wooden Cigar Accessories",
          content: [
            {
              type: 'paragraph',
              text: 'Based on our premium collection, the Kingstar Square Wooden Ashtray with Cutter represents the pinnacle of cigar accessory craftsmanship.'
            },
            {
              type: 'points',
              items: [
                'Material: Made with quality wood for durability and elegant appearance',
                'Design: Square design with four notches to hold cigars securely in place',
                'Built-in Cutter: Includes integrated cigar cutter for convenience',
                'Storage Compartment: Features drawer or compartment for lighters, cutters, or matches',
                'Finish: Polished wood finish that maintains natural grain beauty',
                'Size: Typically measures around 8" x 8" x 1.5" providing ample space'
              ]
            }
          ]
        }
      ]
    },
  
    "ADULT NOVELTYHOT": {
      categoryName: "Adult Novelty Items",
      description: "Explore our adult novelty collection featuring unique and entertaining items for mature audiences.",
      sections: [
        {
          sectionTitle: "Novelty Collection",
          content: [
            {
              type: 'paragraph',
              text: 'Our adult novelty section offers a curated selection of entertaining and unique items designed for adult customers.'
            },
            {
              type: 'points',
              items: [
                'Age-restricted novelty items and entertainment products',
                'Unique gifts and conversation starters',
                'Adult-themed accessories and collectibles',
                'Humorous and entertaining novelty items',
                'Specialty adult entertainment accessories'
              ]
            }
          ]
        }
      ]
    },
  
    "BRANDED APPARELS & MERCHANDISE": {
      categoryName: "Branded Apparel & Merchandise",
      description: "Show your style with our collection of branded apparel and merchandise. Featuring popular brands and custom designs.",
      sections: [
        {
          sectionTitle: "Brand Collection",
          content: [
            {
              type: 'paragraph',
              text: 'Express your personality with our extensive collection of branded apparel and merchandise from top smoking and lifestyle brands.'
            },
            {
              type: 'points',
              items: [
                'T-shirts, hoodies, and branded clothing',
                'Hats, caps, and headwear collection',
                'Brand merchandise and collectibles',
                'Custom designs and limited editions',
                'Lifestyle accessories and promotional items'
              ]
            }
          ]
        }
      ]
    },
  
    "DETOX + SYNTHETICSHOT": {
      categoryName: "Detox & Synthetic Products",
      description: "Professional detox solutions and synthetic products for various testing and cleansing needs.",
      sections: [
        {
          sectionTitle: "Detox Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Comprehensive detox and cleansing products designed for various purification and testing requirements.'
            },
            {
              type: 'points',
              items: [
                'Detox drinks and cleansing solutions',
                'Synthetic testing products',
                'Cleansing supplements and vitamins',
                'Quick detox and emergency solutions',
                'Professional-grade testing alternatives'
              ]
            }
          ]
        }
      ]
    },
  
    "GENERAL MERCHANDISE": {
      categoryName: "General Merchandise",
      description: "A diverse collection of general merchandise and everyday items to complement your shopping experience.",
      sections: [
        {
          sectionTitle: "Everyday Essentials",
          content: [
            {
              type: 'paragraph',
              text: 'Discover our general merchandise collection featuring everyday essentials and convenience items.'
            },
            {
              type: 'points',
              items: [
                'Everyday convenience items and essentials',
                'General retail merchandise and accessories',
                'Impulse buy items and small gifts',
                'Practical tools and gadgets',
                'Miscellaneous retail products'
              ]
            }
          ]
        }
      ]
    },
  
    "INCENSE + SCENTS + SPRAYS": {
      categoryName: "Incense, Scents & Sprays",
      description: "Create the perfect atmosphere with our collection of incense, room scents, and aromatic sprays.",
      sections: [
        {
          sectionTitle: "Aromatic Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Transform your space with our comprehensive collection of incense, scents, and aromatic sprays designed to create the perfect ambiance.'
            },
            {
              type: 'points',
              items: [
                'Traditional incense sticks and cones',
                'Room sprays and air fresheners',
                'Essential oil blends and aromatherapy products',
                'Scented candles and wax melts',
                'Odor elimination and neutralizing sprays'
              ]
            }
          ]
        }
      ]
    },
  
    "MEDICINE + ENERGY": {
      categoryName: "Medicine & Energy Products",
      description: "Boost your energy and wellness with our selection of energy products and health supplements.",
      sections: [
        {
          sectionTitle: "Energy & Wellness",
          content: [
            {
              type: 'paragraph',
              text: 'Enhance your daily energy and wellness routine with our carefully selected energy and health products.'
            },
            {
              type: 'points',
              items: [
                'Energy drinks and performance enhancers',
                'Health supplements and vitamins',
                'Natural energy boosters and herbs',
                'Recovery and wellness products',
                'Nutritional supplements and health aids'
              ]
            }
          ]
        }
      ]
    },
  
    "PHONE ACCESSORIES": {
      categoryName: "Phone Accessories",
      description: "Complete your mobile experience with our extensive collection of phone accessories and protective gear.",
      sections: [
        {
          sectionTitle: "Mobile Essentials",
          content: [
            {
              type: 'paragraph',
              text: 'Protect and enhance your mobile device with our comprehensive collection of phone accessories.'
            },
            {
              type: 'points',
              items: [
                'Protective cases and covers for all major brands',
                'Screen protectors and tempered glass',
                'Charging cables and wireless chargers',
                'Phone stands and mounts',
                'Bluetooth accessories and audio solutions'
              ]
            }
          ]
        }
      ]
    },
  
    "PHONE CARDS": {
      categoryName: "Phone Cards & Prepaid Services",
      description: "Stay connected with our selection of phone cards and prepaid communication services.",
      sections: [
        {
          sectionTitle: "Communication Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Keep in touch with our convenient phone card and prepaid service options for domestic and international calling.'
            },
            {
              type: 'points',
              items: [
                'Prepaid phone cards for domestic calling',
                'International calling cards and minutes',
                'Carrier-specific prepaid cards',
                'Data cards and internet access solutions',
                'Gift cards for major mobile carriers'
              ]
            }
          ]
        }
      ]
    },
  
    "510 THREAD BATTERIES": {
      categoryName: "510 Thread Batteries",
      description: "Power your vaping experience with our collection of reliable 510 thread batteries and compatible accessories.",
      sections: [
        {
          sectionTitle: "Vape Battery Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Ensure consistent performance with our selection of high-quality 510 thread batteries designed for optimal vaping experiences.'
            },
            {
              type: 'points',
              items: [
                'Variable voltage 510 thread batteries',
                'Compact and portable battery designs',
                'USB charging and quick-charge options',
                'Button-activated and draw-activated models',
                'Compatible with standard 510 thread cartridges'
              ]
            }
          ]
        }
      ]
    },
  
    "DRY + WAX ACCESSORIES": {
      categoryName: "Dry Herb & Wax Accessories",
      description: "Enhance your dry herb and wax vaping with our comprehensive collection of specialized accessories.",
      sections: [
        {
          sectionTitle: "Vaping Accessories",
          content: [
            {
              type: 'paragraph',
              text: 'Complete your dry herb and wax vaping setup with our professional-grade accessories designed for optimal performance.'
            },
            {
              type: 'points',
              items: [
                'Specialized vaping tools and dabbing accessories',
                'Cleaning kits and maintenance supplies',
                'Replacement parts and components',
                'Storage containers and organization solutions',
                'Temperature control and precision tools'
              ]
            }
          ]
        }
      ]
    },
  
    "DRY + WAX VAPORIZERS": {
      categoryName: "Dry Herb & Wax Vaporizers",
      description: "Experience superior vaping with our premium collection of dry herb and wax vaporizers.",
      sections: [
        {
          sectionTitle: "Premium Vaporizers",
          content: [
            {
              type: 'paragraph',
              text: 'Discover the ultimate vaping experience with our carefully curated selection of dry herb and wax vaporizers.'
            },
            {
              type: 'points',
              items: [
                'Portable and desktop vaporizer models',
                'Temperature control and precision heating',
                'Dual-use devices for herbs and concentrates',
                'Long-lasting battery life and fast charging',
                'Easy maintenance and user-friendly designs'
              ]
            }
          ]
        }
      ]
    },
  
    "GLASS ACCESSORIES": {
      categoryName: "Glass Accessories",
      description: "Premium glass accessories and smoking essentials crafted for quality and style.",
      sections: [
        {
          sectionTitle: "Quality Glass Collection",
          content: [
            {
              type: 'paragraph',
              text: 'AMG Glass Wholesale provides premium quality glass products at discounted wholesale prices. Our glass items are manufactured with precision and care meeting the highest quality standards.'
            },
            {
              type: 'points',
              items: [
                'Premium quality glass products for retail and hospitality',
                'Extensive selection of glassware for various sectors',
                'Better craftsmanship with attention to detail',
                'Bulk pricing and reliable shipping options',
                'Custom glass items and specialized products'
              ]
            }
          ]
        }
      ]
    },
  
    "GLASS CLEANER + ACCESSORIES": {
      categoryName: "Glass Cleaning Solutions",
      description: "Keep your glass pieces crystal clear with our specialized cleaning products and maintenance accessories.",
      sections: [
        {
          sectionTitle: "Cleaning Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Maintain the clarity and functionality of your glass pieces with our professional-grade cleaning solutions.'
            },
            {
              type: 'points',
              items: [
                'Specialized glass cleaning formulas',
                'Cleaning brushes and pipe cleaners',
                'Alcohol-based cleaning solutions',
                'Maintenance kits and cleaning accessories',
                'Eco-friendly and safe cleaning products'
              ]
            }
          ]
        }
      ]
    },
  
    "GLASS PIPES": {
      categoryName: "Glass Pipes Collection",
      description: "Explore our extensive collection of premium glass pipes, featuring artistic designs and functional excellence.",
      sections: [
        {
          sectionTitle: "Artisan Glass Pipes",
          content: [
            {
              type: 'paragraph',
              text: 'Discover our carefully curated collection of glass pipes, combining artistic beauty with superior functionality.'
            },
            {
              type: 'points',
              items: [
                'Hand-blown glass pipes with unique designs',
                'Various sizes and styles for different preferences',
                'Borosilicate glass construction for durability',
                'Artistic and decorative glass pieces',
                'Easy-to-clean and maintain designs'
              ]
            }
          ]
        }
      ]
    },
  
    "HAND PIPES": {
      categoryName: "Hand Pipes Collection",
      description: "Premium hand pipes crafted for portability and performance. Perfect for personal use and on-the-go smoking.",
      sections: [
        {
          sectionTitle: "Portable Smoking Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Our hand pipe collection offers portable and convenient smoking solutions with premium craftsmanship and design.'
            },
            {
              type: 'points',
              items: [
                'Compact and portable hand pipe designs',
                'Various materials including glass, metal, and wood',
                'Easy-to-use and beginner-friendly options',
                'Artistic and functional designs',
                'Durable construction for everyday use'
              ]
            }
          ]
        }
      ]
    },
  
    "HERBAL NON TOBACCO": {
      categoryName: "Herbal Non-Tobacco Products",
      description: "Natural herbal smoking blends and non-tobacco alternatives for a pure, additive-free experience.",
      sections: [
        {
          sectionTitle: "Natural Alternatives",
          content: [
            {
              type: 'paragraph',
              text: 'Explore our collection of natural herbal smoking blends and tobacco alternatives for a pure smoking experience.'
            },
            {
              type: 'points',
              items: [
                'Natural herbal smoking blends and mixtures',
                'Tobacco-free alternatives and substitutes',
                'Organic and additive-free herbal products',
                'Traditional herbal smoking materials',
                'Aromatherapy and wellness herbal blends'
              ]
            }
          ]
        }
      ]
    },
  
    "HOOKAH ACCESSORIES": {
      categoryName: "Complete Hookah Accessories Collection",
      description: "Enhance your hookah smoking experience with our comprehensive range of accessories. From hoses and bowls to cleaning supplies and heat management devices.",
      sections: [
        {
          sectionTitle: "Essential Hookah Components",
          content: [
            {
              type: 'paragraph',
              text: 'Hookah accessories are a variety of products that can improve your hookah smoking experience. This collection consists of essential components that enhance functionality and enjoyment.'
            },
            {
              type: 'points',
              items: [
                'Hoses: Flexible tubes that allow you to inhale the smoke',
                'Bowls: Containers where the shisha tobacco is placed and heated',
                'Charcoal holders: Devices meant to hold and manage the heat source',
                'Tongs: Tools to safely handle hot coals',
                'Cleaning brushes: Utensils that help preserve the cleanliness of your hookah',
                'Mouth tips: Small disposable or reusable mouth tips that allow you to share the hookah hygienically',
                'Heat management devices: Tools that help manage the heat that is applied to the tobacco',
                'Wind covers: Covers that protect your hookah from wind'
              ]
            }
          ]
        }
      ]
    },
  
    "HOOKAH BOWLS": {
      categoryName: "Hookah Bowls",
      description: "Premium hookah bowls designed for optimal heat distribution and enhanced smoking sessions.",
      sections: [
        {
          sectionTitle: "Premium Bowl Collection",
          content: [
            {
              type: 'paragraph',
              text: 'Enhance your hookah sessions with our collection of premium bowls designed for optimal tobacco heating and flavor delivery.'
            },
            {
              type: 'points',
              items: [
                'Clay and ceramic bowls for traditional smoking',
                'Silicone bowls for easy cleaning and durability',
                'Phunnel bowls for juice retention',
                'Vortex bowls for improved airflow',
                'Various sizes for different session lengths'
              ]
            }
          ]
        }
      ]
    },
  
    "HOOKAH BURNERS": {
      categoryName: "Hookah Coal Burners",
      description: "Professional coal heating solutions for consistent and safe charcoal preparation.",
      sections: [
        {
          sectionTitle: "Coal Heating Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Ensure perfectly heated coals every time with our professional-grade hookah coal burners and heating devices.'
            },
            {
              type: 'points',
              items: [
                'Electric coal burners for indoor use',
                'Portable and countertop burner models',
                'Fast and even coal heating technology',
                'Safety features and temperature controls',
                'Easy-to-clean and maintain designs'
              ]
            }
          ]
        }
      ]
    },
  
    "HOOKAH COALS": {
      categoryName: "Hookah Charcoal",
      description: "Premium hookah charcoal for clean burning and optimal heat management during your smoking sessions.",
      sections: [
        {
          sectionTitle: "Quality Charcoal Selection",
          content: [
            {
              type: 'paragraph',
              text: 'Experience the difference with our premium hookah charcoal selection, designed for clean burning and consistent heat.'
            },
            {
              type: 'points',
              items: [
                'Natural coconut charcoal for clean burning',
                'Quick-light charcoal for convenience',
                'Long-lasting and consistent heat output',
                'Low ash production and minimal odor',
                'Various sizes and pack quantities available'
              ]
            }
          ]
        }
      ]
    },
  
    "HOOKAH HOSES": {
      categoryName: "Hookah Hoses",
      description: "Premium hookah hoses designed for smooth airflow and enhanced smoking pleasure.",
      sections: [
        {
          sectionTitle: "Premium Hose Collection",
          content: [
            {
              type: 'paragraph',
              text: 'Upgrade your hookah experience with our collection of premium hoses designed for optimal airflow and comfort.'
            },
            {
              type: 'points',
              items: [
                'Washable and non-washable hose options',
                'Various lengths and diameters for different setups',
                'Leather, silicone, and traditional materials',
                'Comfortable handles and mouthpieces',
                'Easy-to-clean and maintain designs'
              ]
            }
          ]
        }
      ]
    },
  
    "HOOKAH TIPS": {
      categoryName: "Hookah Mouthpieces & Tips",
      description: "Hygienic and comfortable hookah tips and mouthpieces for shared smoking sessions.",
      sections: [
        {
          sectionTitle: "Hygienic Smoking Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Maintain hygiene and comfort during shared hookah sessions with our collection of disposable and reusable tips.'
            },
            {
              type: 'points',
              items: [
                'Disposable plastic mouthpieces for hygiene',
                'Reusable metal and glass tips',
                'Various sizes to fit different hose types',
                'Comfortable and ergonomic designs',
                'Bulk packaging for commercial use'
              ]
            }
          ]
        }
      ]
    },
  
    "HOOKAHS": {
      categoryName: "Complete Hookah Collection",
      description: "Premium hookahs ranging from traditional designs to modern innovations. Perfect for personal use or commercial establishments.",
      sections: [
        {
          sectionTitle: "Traditional & Modern Hookahs",
          content: [
            {
              type: 'paragraph',
              text: 'Discover our extensive hookah collection featuring traditional craftsmanship and modern innovations for the ultimate smoking experience.'
            },
            {
              type: 'points',
              items: [
                'Traditional brass and copper hookahs',
                'Modern stainless steel and glass designs',
                'Portable and travel-friendly models',
                'Multi-hose hookahs for group sessions',
                'Complete starter sets with all accessories'
              ]
            }
          ]
        }
      ]
    },
  
    "KRATOM": {
      categoryName: "Kratom Products",
      description: "Premium kratom products sourced from quality suppliers. Various strains and forms available.",
      sections: [
        {
          sectionTitle: "Quality Kratom Selection",
          content: [
            {
              type: 'paragraph',
              text: 'Explore our carefully sourced kratom products featuring various strains and potencies for different preferences.'
            },
            {
              type: 'points',
              items: [
                'Red, green, and white vein kratom varieties',
                'Powder, capsule, and extract forms',
                'Lab-tested for purity and potency',
                'Various package sizes and bulk options',
                'Sustainably sourced from reputable suppliers'
              ]
            }
          ]
        }
      ]
    },
  
    "GRINDERS": {
      categoryName: "Herb Grinders",
      description: "Professional-grade herb grinders for consistent and efficient grinding. Available in various materials and sizes.",
      sections: [
        {
          sectionTitle: "Precision Grinding Tools",
          content: [
            {
              type: 'paragraph',
              text: 'Achieve perfect consistency with our collection of professional herb grinders designed for efficiency and durability.'
            },
            {
              type: 'points',
              items: [
                'Multi-chamber grinders with pollen catchers',
                'Metal, acrylic, and wooden grinder options',
                'Various sizes from pocket to large desktop models',
                'Sharp teeth for efficient grinding',
                'Easy-to-clean and maintain designs'
              ]
            }
          ]
        }
      ]
    },
  
    "JARS/SEALED BAGS": {
      categoryName: "Storage Solutions",
      description: "Keep your products fresh with our collection of airtight jars and sealed storage bags.",
      sections: [
        {
          sectionTitle: "Preservation & Storage",
          content: [
            {
              type: 'paragraph',
              text: 'Maintain freshness and quality with our professional storage solutions designed to preserve your products.'
            },
            {
              type: 'points',
              items: [
                'Airtight glass jars with secure lids',
                'Vacuum-sealed storage bags',
                'Various sizes from small to bulk storage',
                'UV-resistant and moisture-proof options',
                'Child-resistant and tamper-evident designs'
              ]
            }
          ]
        }
      ]
    },
  
    "RAW ACCESSORIES": {
      categoryName: "RAW Brand Accessories",
      description: "Complete your RAW experience with authentic RAW brand accessories and smoking essentials.",
      sections: [
        {
          sectionTitle: "RAW Brand Collection",
          content: [
            {
              type: 'paragraph',
              text: 'Discover the complete RAW experience with our authentic collection of RAW brand accessories and smoking essentials.'
            },
            {
              type: 'points',
              items: [
                'RAW rolling trays in various sizes',
                'RAW storage containers and cases',
                'RAW branded tools and accessories',
                'Limited edition and collectible items',
                'Complete RAW smoking kits and bundles'
              ]
            }
          ]
        }
      ]
    },
  
    "ROLLING PAPER + FILTERSH": {
      categoryName: "Rolling Papers & Filters",
      description: "Premium rolling papers and filters for the perfect smoking experience. Various sizes and materials available.",
      sections: [
        {
          sectionTitle: "Rolling Essentials",
          content: [
            {
              type: 'paragraph',
              text: 'Create the perfect roll with our comprehensive selection of rolling papers and filters from top brands.'
            },
            {
              type: 'points',
              items: [
                'Various paper sizes from single wide to king size',
                'Natural and flavored rolling paper options',
                'Pre-rolled cones for convenience',
                'Filter tips and roach materials',
                'Organic and hemp-based paper alternatives'
              ]
            }
          ]
        }
      ]
    },
  
    "SCALES": {
      categoryName: "Precision Scales",
      description: "Accurate digital scales for precise measurements. Professional-grade instruments for various weighing needs.",
      sections: [
        {
          sectionTitle: "Professional Weighing Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Ensure accurate measurements with our collection of precision digital scales designed for professional use.'
            },
            {
              type: 'points',
              items: [
                'High-precision digital scales with accurate readings',
                'Compact and portable scale designs',
                'Various weight capacities and measurement units',
                'Calibration weights and maintenance tools',
                'Durable construction for everyday use'
              ]
            }
          ]
        }
      ]
    },
  
    "SMOKE ACCESSORIES": {
      categoryName: "Smoking Accessories",
      description: "Complete your smoking setup with our comprehensive collection of essential smoking accessories.",
      sections: [
        {
          sectionTitle: "Essential Smoking Tools",
          content: [
            {
              type: 'paragraph',
              text: 'Enhance your smoking experience with our carefully curated collection of essential accessories and tools.'
            },
            {
              type: 'points',
              items: [
                'Rolling machines and rolling aids',
                'Poker tools and packing accessories',
                'Cleaning supplies and maintenance kits',
                'Storage solutions and organizers',
                'Miscellaneous smoking tools and gadgets'
              ]
            }
          ]
        }
      ]
    },
  
    "TRAYS": {
      categoryName: "Rolling Trays",
      description: "Organize your smoking essentials with our collection of premium rolling trays in various sizes and designs.",
      sections: [
        {
          sectionTitle: "Rolling Organization",
          content: [
            {
              type: 'paragraph',
              text: 'Keep your smoking area organized with our collection of functional and stylish rolling trays.'
            },
            {
              type: 'points',
              items: [
                'Metal, wood, and glass rolling tray options',
                'Various sizes from pocket to desktop',
                'Magnetic and compartmentalized designs',
                'Artistic and branded tray collections',
                'Easy-to-clean and durable construction'
              ]
            }
          ]
        }
      ]
    },
  
    "BUTANE + LIGHTER FLUID": {
      categoryName: "Butane & Lighter Fluids",
      description: "Premium butane and lighter fluids for optimal lighter performance and reliability.",
      sections: [
        {
          sectionTitle: "Fuel Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Keep your lighters performing at their best with our selection of premium butane and lighter fluids.'
            },
            {
              type: 'points',
              items: [
                'High-quality butane refill canisters',
                'Zippo and standard lighter fluids',
                'Various canister sizes and refill options',
                'Ultra-refined butane for clean burning',
                'Professional-grade fuel solutions'
              ]
            }
          ]
        }
      ]
    },
  
    "BIG TORCHES": {
      categoryName: "Large Torch Lighters",
      description: "Heavy-duty torch lighters for demanding applications. Professional-grade flame control and reliability.",
      sections: [
        {
          sectionTitle: "Heavy-Duty Torch Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Power through demanding lighting tasks with our collection of heavy-duty torch lighters designed for professional use.'
            },
            {
              type: 'points',
              items: [
                'High-output flame torch lighters',
                'Refillable and adjustable flame control',
                'Durable construction for heavy use',
                'Safety locks and ergonomic designs',
                'Various sizes and fuel capacities'
              ]
            }
          ]
        }
      ]
    },
  
    "LIGHTERS": {
      categoryName: "Premium Lighters Collection",
      description: "Discover our comprehensive collection of premium lighters, from iconic designs to high-performance models.",
      sections: [
        {
          sectionTitle: "Complete Lighter Collection",
          content: [
            {
              type: 'paragraph',
              text: 'Experience reliability and style with our extensive collection of premium lighters for every need and preference.'
            },
            {
              type: 'points',
              items: [
                'Disposable and refillable lighter options',
                'Windproof and weather-resistant designs',
                'Various fuel types: butane, fluid, and electric',
                'Artistic and collectible lighter designs',
                'Professional and everyday use models'
              ]
            }
          ]
        }
      ]
    },
  
    "MINI TORCHES": {
      categoryName: "Mini Torch Lighters",
      description: "Compact and portable torch lighters perfect for precision lighting and everyday use.",
      sections: [
        {
          sectionTitle: "Portable Precision",
          content: [
            {
              type: 'paragraph',
              text: 'Achieve precise lighting with our collection of compact mini torch lighters designed for portability and performance.'
            },
            {
              type: 'points',
              items: [
                'Compact and pocket-friendly designs',
                'Adjustable flame intensity controls',
                'Refillable butane fuel systems',
                'Reliable ignition and wind resistance',
                'Various colors and style options'
              ]
            }
          ]
        }
      ]
    },
  
    "ZIPPO LIGHTERS": {
      categoryName: "Authentic Zippo Lighters Collection",
      description: "Discover our comprehensive collection of authentic Zippo lighters, known for their iconic design, rugged construction, and lifetime warranty. Perfect for retailers, gift shops, and personal use.",
      sections: [
        {
          sectionTitle: "Wholesale Zippo Lighters – High-Quality Windproof Lighters for Retailers",
          content: [
            {
              type: 'paragraph',
              text: 'Much has been said about Zippo lighters in the past, and rightly so, because Zippo lighters are durable, reliable, and iconic with the "click" sound. As a retailer or distributor you have the opportunity to offer Zippo lighters to give your products more credibility, and appeal to customers looking for a quality product with style.'
            },
            {
              type: 'points',
              items: [
                'Authentic Zippo Quality: Each lighter is made in the USA and is backed by their lifetime guarantee - "It works or we fix it free™"',
                'Choice of Designs: These lighters come in a variety of designs from brushed chrome, high polish stainless steel to specialty designs with artwork, logos, and customizable engravings',
                'Refillable and Windproof: Zippo lighters are refillable, which provides great long-term value and windproof design helps weather the elements in various conditions',
                'Bulk Packaging: Available in bulk or lots such as assorted packs of 12 lighters, which suit various customers'
              ]
            }
          ]
        },
        {
          sectionTitle: "Wholesale Zippos – Premium Lighters for Any Event",
          content: [
            {
              type: 'paragraph',
              text: 'Wholesale Zippos is your source for 100% authentic Zippo lighters at great bulk pricing. Known for their iconic design, rugged construction, and lifetime warranty, Zippo lighters are excellent products to stock if you are a retailer, gift shop, or distributor who wants quality products to sell and hand out in a stylish way.'
            },
            {
              type: 'points',
              items: [
                'Authentic Zippo products with guaranteed quality',
                'Wide variety of styles, finishes and designs',
                'Wholesale pricing for volume orders',
                'Ideal for retail stores, promotional giveaways and gifts',
                'Fast shipping and great customer service'
              ]
            }
          ]
        }
      ]
    },
  
    "WHIP CREAM CHARGERS": {
      categoryName: "Professional Whipped Cream Solutions",
      description: "Premium nitrous oxide chargers and dispensers for culinary applications. Perfect for creating fresh whipped cream, foams, mousses, and cocktail infusions in professional and home kitchens.",
      sections: [
        {
          sectionTitle: "Special Blue Whipped Cream Chargers – Premium N₂O for Food and Beverage Preparations",
          content: [
            {
              type: 'paragraph',
              text: 'Special Blue whipped cream chargers are high-quality nitrous oxide (N₂O) injector cartridges for use with whipped cream dispensers. Work with fresh whipped cream, foams, mousses, or infuse cocktails.'
            },
            {
              type: 'points',
              items: [
                'Pure N₂O Gas: Each charger contains 8g of food-grade nitrous oxide, allowing for a consistent, high-quality whipped cream',
                'Compatibility: Special Blue whipped cream chargers are designed to fit most standard whipped cream dispensers and can be used for any culinary application',
                'Rugged Construction: Special Blue chargers are made from recyclable steel, are leak-proof, and are put through rigorous safety checks to meet US and EU standards',
                'Pack Sizes: Can be purchased through various pack sizes (from 24, 50 and 100) for home use or for busy professional kitchens'
              ]
            },
            {
              type: 'heading',
              level: 4,
              text: 'Usage Tips'
            },
            {
              type: 'points',
              items: [
                'Use one Charger per 0.5L Dispenser: To produce the best whipped cream, use one charger per 0.5L whipped cream dispenser',
                'Storage: It is ideal to store whipped cream chargers in a cool and dry place',
                'Safety: Always refer to the manufacturer\'s directions for your particular model of dispenser and use in accordance with their direction and safety precautions'
              ]
            }
          ]
        },
        {
          sectionTitle: "Crememax – Upgrade Your Creaming Game",
          content: [
            {
              type: 'paragraph',
              text: 'Crememax is your trusted source for premium quality cream related products and accessories that prioritize convenience, consistency, and superior performance across the kitchen, café, or restaurant. If it has to do with making light, fluffy whipped cream or any variation of gourmet desserts, Crememax has the ideal quality solution for all those serious home chefs or professionals to try.'
            },
            {
              type: 'paragraph',
              text: 'Crememax distributors high quality cream chargers, dispensers, and all related peripheries that provide for a smooth operation, desired texture, or perfect result almost every time. With an emphasis on safety through the use of safe, quality, construction practices. Efficiency, and convenience to consumers - every product that becomes a part of the Crememax family is manufactured from the best materials, and processes which are pre- and post-tested in accordance with international / domestic standards.'
            },
            {
              type: 'points',
              items: [
                'Premium, food-safe cream chargers',
                'Simple to operate dispensers for culinary exploration & creativity',
                'Accessories that help to enhance the product performance & ease of use',
                'Informed and unmatched customer services and guidance'
              ]
            }
          ]
        }
      ]
    },
  
    "WHIP CREAM DISPENSERS": {
      categoryName: "Whipped Cream Dispensers",
      description: "Professional-grade whipped cream dispensers for creating perfect whipped cream, foams, and culinary creations.",
      sections: [
        {
          sectionTitle: "Professional Dispensing Solutions",
          content: [
            {
              type: 'paragraph',
              text: 'Create perfect whipped cream and culinary foams with our collection of professional-grade cream dispensers.'
            },
            {
              type: 'points',
              items: [
                'Various sizes from 0.25L to 1L capacity',
                'Stainless steel construction for durability',
                'Compatible with standard N₂O chargers',
                'Professional-grade seals and pressure systems',
                'Easy-to-clean and dishwasher-safe components'
              ]
            }
          ]
        }
      ]
    }
  };
  
  // Helper function to get content for a category
  export const getCategoryContent = (categoryKey: string): CategoryContent | null => {
    return categoryContentData[categoryKey] || null;
  };
  
  // Helper function to check if category has content
  export const hasCategoryContent = (categoryKey: string): boolean => {
    return categoryKey in categoryContentData;
  };
  
  // Helper function to get all available categories with content
  export const getAvailableCategories = (): string[] => {
    return Object.keys(categoryContentData);
  };
  
  // Helper function to get category sections count
  export const getCategorySectionsCount = (categoryKey: string): number => {
    const content = getCategoryContent(categoryKey);
    return content?.sections.length || 0;
  };