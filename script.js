/**
 * ============================================================================
 * FIT CHECK — PREMIUM PERSONAL FASHION & STYLING STUDIO
 * Full Vanilla JavaScript Implementation
 * Your style. Your rules.
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. STORAGE KEYS & DATA CONSTANTS
     ========================================================================== */
  const STORAGE_KEYS = {
    WARDROBE: 'fitcheck_wardrobe_v1',
    OUTFITS: 'fitcheck_outfits_v1',
    PLANNER: 'fitcheck_planner_v1',
    COLLECTIONS: 'fitcheck_collections_v1',
    CHALLENGES: 'fitcheck_challenges_v1',
    PREFERENCES: 'fitcheck_preferences_v1'
  };

  // Elegant inline SVG fallback for offline / disconnected environments
  const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'%3E%3Crect width='100%25' height='100%25' fill='%23EEE8DF'/%3E%3Cg fill='none' stroke='%23702B40' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M300 280 L240 330 L270 330 L270 540 L330 540 L330 330 L360 330 Z' opacity='0.7'/%3E%3Ccircle cx='300' cy='250' r='18' opacity='0.7'/%3E%3Ctext x='300' y='590' text-anchor='middle' fill='%23211F1E' font-family='sans-serif' font-size='18' letter-spacing='3' opacity='0.6'%3EFIT CHECK STUDIO%3C/text%3E%3C/g%3E%3C/svg%3E";
  window.FALLBACK_IMAGE = FALLBACK_IMAGE;

  // High quality curated fashion image presets with reliable CDN URLs & inline fallback
  const SAMPLE_IMAGES = {
    // Tops
    linenShirt: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    cashmereKnit: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    charcoalTee: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    silkBlouse: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80',
    hoodieStreet: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    
    // Bottoms
    pleatedTrousers: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    rawDenim: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    tailoredChinos: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    pleatedSkirt: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',

    // One-piece
    boilerSuit: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    minimalistDress: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    kaftanFlow: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',

    // Outerwear
    navyBlazer: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    trenchCoat: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    leatherJacket: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    woolWrapCoat: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',

    // Footwear
    chunkyLoafers: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    whiteSneakers: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    chelseaBoots: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    leatherSlides: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',

    // Accessories
    leatherTote: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    silkScarf: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    sunglasses: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    brassCuff: 'https://images.unsplash.com/photo-1611591475852-c2084c8a221b?auto=format&fit=crop&w=800&q=80'
  };

  // Subcategories mapping
  const CATEGORY_SUBCATEGORIES = {
    'Tops': ['Shirts', 'T-shirts', 'Blouses', 'Sweaters', 'Hoodies', 'Tank tops', 'Polos', 'Other tops'],
    'Bottoms': ['Trousers', 'Jeans', 'Chinos', 'Shorts', 'Skirts', 'Joggers', 'Other bottoms'],
    'One-piece garments': ['Dresses', 'Jumpsuits', 'Playsuits', 'Overalls', 'Traditional one-piece garments'],
    'Outerwear': ['Blazers', 'Jackets', 'Coats', 'Cardigans', 'Vests'],
    'Footwear': ['Loafers', 'Sneakers', 'Boots', 'Flats', 'Heels', 'Sandals', 'Formal shoes'],
    'Accessories': ['Bags', 'Belts', 'Watches', 'Sunglasses', 'Glasses', 'Jewellery', 'Hats', 'Caps', 'Scarves', 'Ties', 'Other accessories'],
    'Custom': ['Custom Garment']
  };

  // Curated gender-inclusive starter items
  const INITIAL_WARDROBE = [
    {
      id: 'item_1',
      name: 'Oversized Crisp Cotton Poplin Shirt',
      category: 'Tops',
      subcategory: 'Shirts',
      color: 'White',
      secondaryColor: 'None',
      pattern: 'Solid',
      material: '100% Organic Cotton',
      aesthetic: 'Minimalist',
      occasions: ['Work', 'Casual outing', 'Brunch'],
      weather: 'Warm',
      season: 'All-year',
      notes: 'Crisp editorial collar. Wear open over tees or buttoned up with wide trousers.',
      image: SAMPLE_IMAGES.linenShirt,
      isFavorite: true,
      wearCount: 4,
      dateAdded: '2026-11-01'
    },
    {
      id: 'item_2',
      name: 'Pleated Wide-Leg Wool Trousers',
      category: 'Bottoms',
      subcategory: 'Trousers',
      color: 'Charcoal',
      secondaryColor: 'None',
      pattern: 'Solid',
      material: 'Lightweight Wool Blend',
      aesthetic: 'Quiet luxury',
      occasions: ['Work', 'Business meeting', 'Formal event', 'Dinner'],
      weather: 'Cool',
      season: 'Autumn',
      notes: 'High-rise silhouette with deep front pleats and fluid drape.',
      image: SAMPLE_IMAGES.pleatedTrousers,
      isFavorite: true,
      wearCount: 6,
      dateAdded: '2026-11-01'
    },
    {
      id: 'item_3',
      name: 'Structured Double-Breasted Blazer',
      category: 'Outerwear',
      subcategory: 'Blazers',
      color: 'Navy',
      secondaryColor: 'Brass buttons',
      pattern: 'Solid',
      material: 'Italian Wool Twill',
      aesthetic: 'Corporate chic',
      occasions: ['Work', 'Business meeting', 'Job interview', 'Formal event'],
      weather: 'Cool',
      season: 'All-year',
      notes: 'Strong shoulder line, relaxed torso fit. Instant authority and polish.',
      image: SAMPLE_IMAGES.navyBlazer,
      isFavorite: true,
      wearCount: 5,
      dateAdded: '2026-11-01'
    },
    {
      id: 'item_4',
      name: 'Chunky Lug-Sole Polished Loafers',
      category: 'Footwear',
      subcategory: 'Loafers',
      color: 'Black',
      secondaryColor: 'Silver hardware',
      pattern: 'Solid',
      material: 'Full-Grain Calfskin',
      aesthetic: 'Smart casual',
      occasions: ['Work', 'Casual outing', 'Brunch', 'Date'],
      weather: 'All-weather',
      season: 'All-year',
      notes: 'Substantial profile that anchors wide-leg trousers and tailored shorts.',
      image: SAMPLE_IMAGES.chunkyLoafers,
      isFavorite: true,
      wearCount: 8,
      dateAdded: '2026-11-02'
    },
    {
      id: 'item_5',
      name: 'Architectural Minimalist Tote Bag',
      category: 'Accessories',
      subcategory: 'Bags',
      color: 'Black',
      secondaryColor: 'None',
      pattern: 'Solid',
      material: 'Smooth Matte Leather',
      aesthetic: 'Minimalist',
      occasions: ['Work', 'Travel', 'Casual outing'],
      weather: 'All-weather',
      season: 'All-year',
      notes: 'Fits a 15-inch laptop and daily essentials. Clean geometric lines.',
      image: SAMPLE_IMAGES.leatherTote,
      isFavorite: false,
      wearCount: 9,
      dateAdded: '2026-11-02'
    },
    {
      id: 'item_6',
      name: 'Ribbed Cashmere Knit Crewneck',
      category: 'Tops',
      subcategory: 'Sweaters',
      color: 'Beige',
      secondaryColor: 'Ivory',
      pattern: 'Textured weave',
      material: 'Pure Cashmere',
      aesthetic: 'Old money',
      occasions: ['Work', 'Casual outing', 'Travel', 'Staying at home'],
      weather: 'Cool',
      season: 'Winter',
      notes: 'Ultra-soft relaxed knit in warm camel taupe.',
      image: SAMPLE_IMAGES.cashmereKnit,
      isFavorite: true,
      wearCount: 3,
      dateAdded: '2026-11-03'
    },
    {
      id: 'item_7',
      name: 'Relaxed Selvedge Straight Jeans',
      category: 'Bottoms',
      subcategory: 'Jeans',
      color: 'Blue',
      secondaryColor: 'None',
      pattern: 'Solid',
      material: '13oz Japanese Raw Denim',
      aesthetic: 'Streetwear',
      occasions: ['Casual outing', 'Brunch', 'Travel'],
      weather: 'All-weather',
      season: 'All-year',
      notes: 'Mid-rise straight cut with clean selvedge cuffs.',
      image: SAMPLE_IMAGES.rawDenim,
      isFavorite: false,
      wearCount: 7,
      dateAdded: '2026-11-03'
    },
    {
      id: 'item_8',
      name: 'Minimalist Clean Leather Court Sneakers',
      category: 'Footwear',
      subcategory: 'Sneakers',
      color: 'White',
      secondaryColor: 'Off-white sole',
      pattern: 'Solid',
      material: 'Nappa Leather',
      aesthetic: 'Minimalist',
      occasions: ['Casual outing', 'Travel', 'Work', 'Brunch'],
      weather: 'Warm',
      season: 'All-year',
      notes: 'Sleek unbranded low-tops that bridge tailoring and off-duty dressing.',
      image: SAMPLE_IMAGES.whiteSneakers,
      isFavorite: false,
      wearCount: 11,
      dateAdded: '2026-11-04'
    },
    {
      id: 'item_9',
      name: 'Fluid Silk Habotai Scarf',
      category: 'Accessories',
      subcategory: 'Scarves',
      color: 'Terracotta',
      secondaryColor: 'Gold print',
      pattern: 'Abstract',
      material: '100% Habotai Silk',
      aesthetic: 'Afrocentric',
      occasions: ['Work', 'Date', 'Party', 'Formal event'],
      weather: 'All-weather',
      season: 'All-year',
      notes: 'Can be draped, tied in neckerchief knot or worn as headwrap.',
      image: SAMPLE_IMAGES.silkScarf,
      isFavorite: true,
      wearCount: 4,
      dateAdded: '2026-11-04'
    },
    {
      id: 'item_10',
      name: 'Relaxed Oversized Storm Trench Coat',
      category: 'Outerwear',
      subcategory: 'Coats',
      color: 'Beige',
      secondaryColor: 'Tortoiseshell buttons',
      pattern: 'Solid',
      material: 'Water-resistant Cotton Gabardine',
      aesthetic: 'Classic',
      occasions: ['Work', 'Casual outing', 'Travel'],
      weather: 'Rainy',
      season: 'Autumn',
      notes: 'Dramatic longline silhouette with raglan sleeves and storm flap.',
      image: SAMPLE_IMAGES.trenchCoat,
      isFavorite: true,
      wearCount: 5,
      dateAdded: '2026-11-05'
    },
    {
      id: 'item_11',
      name: 'Contemporary Utility Boiler Suit',
      category: 'One-piece garments',
      subcategory: 'Jumpsuits',
      color: 'Black',
      secondaryColor: 'Matte black hardware',
      pattern: 'Solid',
      material: 'Crisp Cotton Twill',
      aesthetic: 'Androgynous',
      occasions: ['Work', 'Casual outing', 'Creative and media'],
      weather: 'Cool',
      season: 'All-year',
      notes: 'Concealed front zip, tapered ankles and belted waist.',
      image: SAMPLE_IMAGES.boilerSuit,
      isFavorite: true,
      wearCount: 2,
      dateAdded: '2026-11-05'
    },
    {
      id: 'item_12',
      name: 'Square-Toe Chelsea Ankle Boots',
      category: 'Footwear',
      subcategory: 'Boots',
      color: 'Burgundy',
      secondaryColor: 'Black elastic',
      pattern: 'Solid',
      material: 'Polished Box Leather',
      aesthetic: 'Edgy',
      occasions: ['Date', 'Night out', 'Work', 'Formal event'],
      weather: 'Cold',
      season: 'Winter',
      notes: 'Architectural beveled heel in rich deep oxblood burgundy.',
      image: SAMPLE_IMAGES.chelseaBoots,
      isFavorite: false,
      wearCount: 3,
      dateAdded: '2026-11-06'
    }
  ];

  // Initial Curated Outfits referencing the starter items
  const INITIAL_OUTFITS = [
    {
      id: 'outfit_1',
      name: 'Creative Studio Strategy Session',
      itemIds: ['item_1', 'item_2', 'item_3', 'item_4', 'item_5'],
      aesthetic: 'Quiet luxury',
      mood: 'Confident and powerful',
      occasion: 'Work',
      weather: 'Cool',
      collection: 'Workwear',
      notes: 'Clean tailoring anchored by the navy double-breasted blazer and chunky loafers. High-contrast white poplin collar creates sharp focal point.',
      dateCreated: '2026-11-06'
    },
    {
      id: 'outfit_2',
      name: 'Autumn Gallery Promenade',
      itemIds: ['item_6', 'item_2', 'item_10', 'item_8', 'item_9'],
      aesthetic: 'Minimalist',
      mood: 'Effortlessly chic',
      occasion: 'Casual outing',
      weather: 'Cool',
      collection: 'Weekend Looks',
      notes: 'Harmonious tonal layering: camel cashmere against charcoal pleated trousers, tied together with the terracotta silk scarf and longline trench.',
      dateCreated: '2026-11-07'
    },
    {
      id: 'outfit_3',
      name: 'Monochrome Architectural Evening',
      itemIds: ['item_11', 'item_12', 'item_5'],
      aesthetic: 'Androgynous',
      mood: 'Bold and expressive',
      occasion: 'Date',
      weather: 'Cool',
      collection: 'Date Night',
      notes: 'Streamlined utility boiler suit in deep charcoal black, elevated by rich burgundy square-toe boots and minimalist leather tote.',
      dateCreated: '2026-11-08'
    }
  ];

  // Curated Discover Inspiration Cards
  const DISCOVER_INSPIRATION = [
    {
      id: 'disc_1',
      title: 'The Neo-Classic Tailored Drape',
      aesthetic: 'Quiet luxury',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      breakdown: 'Unstructured double-faced wool coat, wide-leg ecru trousers, silk mock-neck knit, minimal loafers.',
      occasions: ['Work', 'Business meeting', 'Brunch'],
      weather: 'Cool',
      season: 'Autumn'
    },
    {
      id: 'disc_2',
      title: 'Monochrome Streetwear Architecture',
      aesthetic: 'Streetwear',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
      breakdown: 'Heavyweight boxy chore coat, relaxed washed denim, chunky leather boots, structured cap.',
      occasions: ['Casual outing', 'Travel', 'Night out'],
      weather: 'Warm',
      season: 'Spring'
    },
    {
      id: 'disc_3',
      title: 'Contemporary Afrocentric Elegance',
      aesthetic: 'Afrocentric',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      breakdown: 'Vibrant geometric printed draped tunic, tailored pleated trousers, sculptural brass jewelry, oxblood loafers.',
      occasions: ['Formal event', 'Party', 'Date'],
      weather: 'Warm',
      season: 'All-year'
    },
    {
      id: 'disc_4',
      title: 'Androgynous Fluid Suiting',
      aesthetic: 'Androgynous',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      breakdown: 'Oversized charcoal wool blazer, open-collar silk blouse, pleated Bermuda shorts, white court sneakers.',
      occasions: ['Work', 'Brunch', 'Gallery opening'],
      weather: 'Warm',
      season: 'Summer'
    },
    {
      id: 'disc_5',
      title: 'Avant-Garde Architectural Layers',
      aesthetic: 'Avant-garde',
      image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80',
      breakdown: 'Asymmetrical wrap vest, structured drop-crotch trousers, high-collar tunic, square-toe boots.',
      occasions: ['Creative and media', 'Party', 'Night out'],
      weather: 'Cool',
      season: 'Autumn'
    },
    {
      id: 'disc_6',
      title: 'Effortless Coastal Minimalist',
      aesthetic: 'Minimalist',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      breakdown: 'Relaxed linen camp shirt, raw ecru chinos, woven leather slides, minimalist tortoiseshell sunglasses.',
      occasions: ['Casual outing', 'Vacation', 'Brunch'],
      weather: 'Hot and sunny',
      season: 'Summer'
    },
    {
      id: 'disc_7',
      title: 'Vintage Academic / Old Money Tailoring',
      aesthetic: 'Old money',
      image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
      breakdown: 'Cable-knit cricket sweater, tailored pleated cords, oxford button-down, horsebit loafers.',
      occasions: ['Work', 'Casual outing', 'Travel'],
      weather: 'Cool',
      season: 'Autumn'
    },
    {
      id: 'disc_8',
      title: 'Techwear Urban Commuter',
      aesthetic: 'Techwear',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      breakdown: 'Waterproof modular shell jacket, articulated cargo trousers, trail runners, cross-body chest rig.',
      occasions: ['Travel', 'Fieldwork', 'Casual outing'],
      weather: 'Rainy',
      season: 'All-year'
    }
  ];

  // Rotating Styling Challenges
  const FIT_CHALLENGES = [
    {
      id: 'chal_1',
      title: 'The Three-Colour Rule',
      subtitle: 'Harmonise exactly three distinct hues',
      rule: 'Build an outfit using strictly three tones (e.g. Burgundy, Warm Ivory, and Charcoal). Avoid additional accent shades and observe how cohesive the silhouette feels.',
      suggestedAesthetic: 'Quiet luxury',
      targetCategory: 'All-around'
    },
    {
      id: 'chal_2',
      title: 'One Item, Three Ways',
      subtitle: 'Maximise your wardrobe rotation',
      rule: 'Select a hero garment (like your pleated trousers or crisp white shirt) and create three completely different looks: Workwear, Off-duty, and Evening.',
      suggestedAesthetic: 'Minimalist',
      targetCategory: 'Tops or Bottoms'
    },
    {
      id: 'chal_3',
      title: 'Main Character Energy',
      subtitle: 'Dress for the movie poster of your life',
      rule: 'Construct a look that unapologetically expresses your highest self. Combine bold textures, statement outerwear, or striking footwear.',
      suggestedAesthetic: 'Avant-garde',
      targetCategory: 'Outerwear'
    },
    {
      id: 'chal_4',
      title: 'The Budget Illusion',
      subtitle: 'Rich aesthetic, zero spend',
      rule: 'Style an ultra-luxurious, expensive-looking outfit entirely with existing pieces through monochrome tonal layering, meticulous tucking, and polished shoes.',
      suggestedAesthetic: 'Old money',
      targetCategory: 'Quiet luxury'
    },
    {
      id: 'chal_5',
      title: 'Opposites Attract',
      subtitle: 'Juxtapose two clashing aesthetics',
      rule: 'Fuse tailored formal suiting with casual streetwear, or rugged denim with delicate silk. Tension is where modern style happens.',
      suggestedAesthetic: 'Streetwear & Corporate',
      targetCategory: 'Tailoring'
    },
    {
      id: 'chal_6',
      title: 'Weather Report',
      subtitle: 'High fashion under stormy skies',
      rule: 'Style an outfit designed for unpredictable precipitation or damp autumn breezes without sacrificing editorial elegance.',
      suggestedAesthetic: 'Classic',
      targetCategory: 'Outerwear & Boots'
    },
    {
      id: 'chal_7',
      title: 'Character Study',
      subtitle: 'Channel a fictional muse',
      rule: 'Reinterpret a classic literary or cinematic archetype through modern gender-inclusive tailoring and considered details.',
      suggestedAesthetic: 'Vintage',
      targetCategory: 'Full Silhouette'
    },
    {
      id: 'chal_8',
      title: 'The Monday Reset',
      subtitle: 'Start the week with sartorial intention',
      rule: 'Craft a crisp, energizing outfit that prepares you for high-stakes decision making, meetings, and focused momentum.',
      suggestedAesthetic: 'Smart casual',
      targetCategory: 'Blazers & Shirts'
    },
    {
      id: 'chal_9',
      title: 'Accessory Overload',
      subtitle: 'Build from the hardware outwards',
      rule: 'Choose an extraordinary accessory first (scarf, bag, watch, or jewelry) and build the garments around complementing that single piece.',
      suggestedAesthetic: 'Creative',
      targetCategory: 'Accessories'
    }
  ];

  const DEFAULT_COLLECTIONS = [
    'All Looks',
    'My Favourite Looks',
    'Workwear',
    'Weekend Looks',
    'Date Night',
    'Travel Wardrobe',
    'Traditional Fits',
    'Outfits to Try'
  ];

  /* ==========================================================================
     2. APP STATE
     ========================================================================== */
  const state = {
    wardrobe: [],
    outfits: [],
    planner: {}, // keyed by YYYY-MM-DD
    collections: [],
    challenges: [],
    preferences: {
      username: 'Alex',
      defaultDressCode: 'Smart casual',
      tempUnit: 'C'
    },
    currentNav: 'home',
    closetFilter: {
      category: 'all',
      aesthetic: '',
      color: '',
      occasion: '',
      sort: 'recent',
      search: '',
      onlyFavorites: false
    },
    styleLabBoard: {
      'Outerwear': null,
      'Accessories-Head': null,
      'Tops': null,
      'One-piece garments': null,
      'Bottoms': null,
      'Footwear': null,
      'Accessories-Bag': null
    },
    styleLabEditingOutfitId: null,
    activeChallenge: null,
    plannerCurrentWeekStart: getStartOfWeek(new Date()),
    lookbookActiveCollection: 'All Looks',
    lookbookSearch: '',
    lookbookSort: 'newest',
    discoverActiveFilter: 'all',
    assistantRecommendations: {
      closetRecs: [],
      discoverRecs: []
    }
  };

  /* ==========================================================================
     3. INITIALIZATION & LOCALSTORAGE MANAGEMENT
     ========================================================================== */
  function initApp() {
    loadFromLocalStorage();
    setupDateAndGreeting();
    setupNavigationListeners();
    setupClosetListeners();
    setupStyleLabListeners();
    setupLookbookListeners();
    setupDiscoverListeners();
    setupModalListeners();
    updateStorageMeter();
    
    // Select rotating daily challenge
    selectDailyChallenge();

    // Render active views
    renderHomeDashboard();
    renderCloset();
    renderStyleLabBoard();
    renderWeeklyPlanner();
    renderLookbook();
    renderDiscoverGallery();
    renderChallengesView();

    // Setup photo drop zone
    setupImageUploadHandlers();

    // Listen to hash changes if present
    window.addEventListener('popstate', handlePopState);
  }

  function loadFromLocalStorage() {
    try {
      const storedWardrobe = localStorage.getItem(STORAGE_KEYS.WARDROBE);
      state.wardrobe = storedWardrobe ? JSON.parse(storedWardrobe) : INITIAL_WARDROBE;

      const storedOutfits = localStorage.getItem(STORAGE_KEYS.OUTFITS);
      state.outfits = storedOutfits ? JSON.parse(storedOutfits) : INITIAL_OUTFITS;

      const storedCollections = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      state.collections = storedCollections ? JSON.parse(storedCollections) : DEFAULT_COLLECTIONS;

      const storedPlanner = localStorage.getItem(STORAGE_KEYS.PLANNER);
      if (storedPlanner) {
        state.planner = JSON.parse(storedPlanner);
      } else {
        // Build initial weekly schedule for current week
        const todayStr = formatDateISO(new Date());
        const start = getStartOfWeek(new Date());
        const mon = formatDateISO(start);
        const wed = formatDateISO(addDays(start, 2));
        const sat = formatDateISO(addDays(start, 5));

        state.planner = {
          [mon]: {
            outfitId: 'outfit_1',
            eventName: 'Monday Strategy & Kickoff',
            occasion: 'Work',
            location: 'Studio Headquarters',
            notes: 'Sharp tailoring to set the tone for the week.'
          },
          [wed]: {
            outfitId: 'outfit_2',
            eventName: 'Midweek Architecture Walk',
            occasion: 'Casual outing',
            location: 'Gallery District',
            notes: 'Warm layering with cashmere and trench.'
          },
          [sat]: {
            outfitId: 'outfit_3',
            eventName: 'Dinner & Vernissage',
            occasion: 'Date',
            location: 'Downtown Lounge',
            notes: 'Sculptural silhouette with burgundy square-toe boots.'
          }
        };
      }

      const storedChallenges = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
      state.challenges = storedChallenges ? JSON.parse(storedChallenges) : [];

      const storedPrefs = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (storedPrefs) {
        state.preferences = Object.assign(state.preferences, JSON.parse(storedPrefs));
      }

      // Persist defaults on fresh run
      if (!storedWardrobe) saveWardrobeToStorage();
      if (!storedOutfits) saveOutfitsToStorage();
      if (!storedCollections) saveCollectionsToStorage();
      if (!storedPlanner) savePlannerToStorage();
    } catch (err) {
      console.warn('Error loading localStorage:', err);
      state.wardrobe = INITIAL_WARDROBE;
      state.outfits = INITIAL_OUTFITS;
      state.collections = DEFAULT_COLLECTIONS;
    }
  }

  function saveWardrobeToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.WARDROBE, JSON.stringify(state.wardrobe));
      updateStorageMeter();
    } catch (e) {
      handleStorageQuotaExceeded(e);
    }
  }

  function saveOutfitsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(state.outfits));
      updateStorageMeter();
    } catch (e) {
      handleStorageQuotaExceeded(e);
    }
  }

  function savePlannerToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.PLANNER, JSON.stringify(state.planner));
      updateStorageMeter();
    } catch (e) {
      handleStorageQuotaExceeded(e);
    }
  }

  function saveCollectionsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(state.collections));
      updateStorageMeter();
    } catch (e) {
      handleStorageQuotaExceeded(e);
    }
  }

  function saveChallengesToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(state.challenges));
      updateStorageMeter();
    } catch (e) {
      handleStorageQuotaExceeded(e);
    }
  }

  function savePreferencesToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(state.preferences));
    } catch (e) {
      console.error(e);
    }
  }

  function handleStorageQuotaExceeded(e) {
    showToast('Storage limit warning. Consider exporting a backup or using compressed images.', 'error');
    console.error('LocalStorage quota exceeded:', e);
  }

  function updateStorageMeter() {
    let totalBytes = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalBytes += (localStorage[key].length + key.length) * 2;
      }
    }
    const kb = (totalBytes / 1024).toFixed(1);
    const display = document.getElementById('storage-used-display');
    const bar = document.getElementById('storage-bar-fill');
    if (display) display.textContent = `${kb} KB / ~5,000 KB`;
    if (bar) {
      const pct = Math.min(100, Math.max(2, (totalBytes / (5 * 1024 * 1024)) * 100));
      bar.style.width = `${pct}%`;
      bar.style.backgroundColor = pct > 80 ? 'var(--color-danger)' : 'var(--accent-burgundy)';
    }
  }

  /* ==========================================================================
     4. DATE, GREETING & ROTATING CHALLENGE
     ========================================================================== */
  function setupDateAndGreeting() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatted = now.toLocaleDateString('en-US', options);

    const hour = now.getHours();
    let timeGreeting = 'Welcome';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    const dateElem = document.getElementById('hero-live-date');
    const greetingElem = document.getElementById('hero-live-greeting');
    const initialsElem = document.getElementById('user-initials');

    if (dateElem) dateElem.textContent = dateFormatted;
    if (greetingElem) greetingElem.textContent = `${timeGreeting}, ${state.preferences.username}`;
    if (initialsElem) {
      const letters = state.preferences.username.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'FC';
      initialsElem.textContent = letters;
    }
  }

  function selectDailyChallenge() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % FIT_CHALLENGES.length;
    state.activeChallenge = FIT_CHALLENGES[index];
  }

  /* ==========================================================================
     5. NAVIGATION & VIEW SWITCHING
     ========================================================================== */
  function navigateTo(sectionId, options = {}) {
    state.currentNav = sectionId;

    // Toggle content sections
    document.querySelectorAll('.content-section').forEach(sec => {
      sec.classList.remove('active');
    });
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update Desktop Nav Active Pill
    document.querySelectorAll('.desktop-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-nav') === sectionId);
    });

    // Update Mobile Nav Links
    document.querySelectorAll('.mobile-nav-link').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-nav') === sectionId);
    });

    // Update Mobile Bottom Nav
    document.querySelectorAll('.mobile-bottom-nav .mob-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-nav') === sectionId);
    });

    // Handle deep-link options
    if (sectionId === 'closet') {
      if (options.filterFavorites) {
        state.closetFilter.onlyFavorites = true;
        const favBtn = document.getElementById('closet-fav-toggle');
        if (favBtn) favBtn.classList.add('is-fav');
      }
      renderCloset();
    } else if (sectionId === 'stylelab') {
      if (options.addItemId) {
        const item = state.wardrobe.find(i => i.id === options.addItemId);
        if (item) assignItemToBoardSlot(item);
      }
      if (options.challengePrompt) {
        showToast(`Challenge loaded: ${options.challengePrompt}`, 'info');
      }
      renderStyleLabBoard();
    } else if (sectionId === 'home') {
      renderHomeDashboard();
    } else if (sectionId === 'planner') {
      renderWeeklyPlanner();
    } else if (sectionId === 'lookbook') {
      renderLookbook();
    } else if (sectionId === 'challenges') {
      renderChallengesView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.navigateTo = navigateTo; // Export to global for HTML inline onclicks

  function setupNavigationListeners() {
    // Desktop Nav Clicks
    document.querySelectorAll('.desktop-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const nav = btn.getAttribute('data-nav');
        navigateTo(nav);
      });
    });

    // Mobile Nav Clicks
    document.querySelectorAll('.mobile-nav-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const nav = btn.getAttribute('data-nav');
        closeMobileMenu();
        navigateTo(nav);
      });
    });

    // Mobile Bottom Nav
    document.querySelectorAll('.mobile-bottom-nav .mob-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const nav = btn.getAttribute('data-nav');
        navigateTo(nav);
      });
    });

    // Mobile Drawer open/close
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('close-mobile-drawer');
    const drawer = document.getElementById('mobile-drawer');

    if (toggleBtn) toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (drawer) {
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeMobileMenu();
      });
    }

    // Header Quick Buttons
    const quickAdd = document.getElementById('quick-add-btn');
    if (quickAdd) quickAdd.addEventListener('click', () => openAddItemModal());

    const quickStyle = document.getElementById('style-me-quick-btn');
    if (quickStyle) quickStyle.addEventListener('click', () => navigateTo('assistant'));

    const prefBtn = document.getElementById('profile-settings-btn');
    if (prefBtn) prefBtn.addEventListener('click', () => openPreferencesDrawer());

    const searchBtn = document.getElementById('global-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        navigateTo('closet');
        const closetInput = document.getElementById('closet-search-input');
        if (closetInput) closetInput.focus();
      });
    }
  }

  function closeMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.remove('open');
  }
  window.closeMobileMenu = closeMobileMenu;

  function handlePopState() {
    // Fallback simple routing if needed
  }

  /* ==========================================================================
     6. HOME DASHBOARD RENDERING
     ========================================================================== */
  function renderHomeDashboard() {
    setupDateAndGreeting();
    renderDashboardMetrics();
    renderHomeTodaySpotlight();
    renderHomeWeekGlance();
    renderHomeChallengeBanner();
    renderHomeRecentOutfits();
    renderHomeInspirationSnippet();
  }

  function renderDashboardMetrics() {
    const itemsCount = state.wardrobe.length;
    const outfitsCount = state.outfits.length;

    // Planned this week count
    const start = getStartOfWeek(new Date());
    let plannedCount = 0;
    for (let i = 0; i < 7; i++) {
      const d = formatDateISO(addDays(start, i));
      if (state.planner[d] && state.planner[d].outfitId) plannedCount++;
    }

    const favCount = state.wardrobe.filter(i => i.isFavorite).length;

    const elItems = document.getElementById('metric-items-count');
    const elOutfits = document.getElementById('metric-outfits-count');
    const elPlanned = document.getElementById('metric-planned-count');
    const elFavs = document.getElementById('metric-favorites-count');

    if (elItems) elItems.textContent = itemsCount;
    if (elOutfits) elOutfits.textContent = outfitsCount;
    if (elPlanned) elPlanned.textContent = plannedCount;
    if (elFavs) elFavs.textContent = favCount;
  }

  function renderHomeTodaySpotlight() {
    const container = document.getElementById('home-today-spotlight');
    if (!container) return;

    // Pick an outfit for today from the planner or first saved outfit
    const todayStr = formatDateISO(new Date());
    let outfit = null;
    let eventName = 'Featured Studio Curated Look';

    if (state.planner[todayStr] && state.planner[todayStr].outfitId) {
      outfit = state.outfits.find(o => o.id === state.planner[todayStr].outfitId);
      eventName = state.planner[todayStr].eventName || eventName;
    }

    if (!outfit && state.outfits.length > 0) {
      outfit = state.outfits[0];
    }

    if (!outfit) {
      container.innerHTML = `
        <div class="spotlight-header">
          <span class="spotlight-tag">TODAY'S STYLE SPOTLIGHT</span>
          <span class="spotlight-weather-chip">Mild & Clear</span>
        </div>
        <h4 class="spotlight-title">Ready for Your First Signature Fit</h4>
        <p class="spotlight-desc">Create your signature looks in the Style Lab or run the Personal Styling Assistant to generate curated daily recommendations.</p>
        <button class="btn btn-primary btn-block" onclick="navigateTo('assistant')">Generate Today's Style</button>
      `;
      return;
    }

    // Resolve garment images
    const garmentPieces = outfit.itemIds.map(id => state.wardrobe.find(w => w.id === id)).filter(Boolean);
    const thumbsHtml = garmentPieces.slice(0, 3).map(p => `
      <div class="spotlight-img-wrap" title="${escapeHtml(p.name)}">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
      </div>
    `).join('');

    container.innerHTML = `
      <div class="spotlight-header">
        <span class="spotlight-tag">TODAY'S STYLE SPOTLIGHT</span>
        <span class="spotlight-weather-chip">${escapeHtml(outfit.weather || 'Warm')}</span>
      </div>
      <div>
        <h4 class="spotlight-title">${escapeHtml(outfit.name)}</h4>
        <p class="spotlight-desc">${escapeHtml(outfit.notes || 'A balanced silhouette combining effortless tailoring and texture.')}</p>
      </div>
      <div class="spotlight-visual-row">
        ${thumbsHtml}
      </div>
      <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
        <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="loadOutfitToStyleLab('${outfit.id}')">Open in Studio</button>
        <button class="btn btn-outline btn-sm" onclick="openAssignPlannerModal('${outfit.id}')">Schedule</button>
      </div>
    `;
  }

  function renderHomeWeekGlance() {
    const container = document.getElementById('home-week-glance');
    if (!container) return;

    const start = getStartOfWeek(new Date());
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const todayStr = formatDateISO(new Date());

    let html = '';
    for (let i = 0; i < 7; i++) {
      const d = addDays(start, i);
      const iso = formatDateISO(d);
      const plan = state.planner[iso];
      const isToday = iso === todayStr;

      let outfit = null;
      if (plan && plan.outfitId) {
        outfit = state.outfits.find(o => o.id === plan.outfitId);
      }

      html += `
        <div class="glance-day-card ${isToday ? 'today' : ''} ${outfit ? 'has-outfit' : ''}" onclick="navigateTo('planner')">
          <div>
            <div class="glance-day-name">${dayNames[i]}</div>
            <div class="glance-day-date">${d.getDate()}</div>
          </div>
          ${outfit ? `
            <div class="glance-outfit-preview">
              ${(outfit.itemIds || []).slice(0, 2).map(id => {
                const item = state.wardrobe.find(w => w.id === id);
                return item ? `<img src="${escapeHtml(item.image)}" class="glance-thumb" alt="${escapeHtml(item.name)}">` : '';
              }).join('')}
            </div>
            <div class="glance-card-action">${escapeHtml(outfit.name.substring(0, 16))}...</div>
          ` : `
            <div class="glance-empty-slot">Unplanned</div>
            <div class="glance-card-action">+ Plan</div>
          `}
        </div>
      `;
    }
    container.innerHTML = html;
  }

  function renderHomeChallengeBanner() {
    const banner = document.getElementById('home-challenge-banner');
    if (!banner || !state.activeChallenge) return;

    banner.innerHTML = `
      <div class="challenge-banner-content">
        <span class="challenge-badge">DAILY FIT CHALLENGE</span>
        <h3 class="challenge-title">${escapeHtml(state.activeChallenge.title)}</h3>
        <p class="challenge-desc">${escapeHtml(state.activeChallenge.rule)}</p>
      </div>
      <button class="btn btn-primary btn-lg" onclick="acceptFitChallenge('${state.activeChallenge.id}')">
        Accept Challenge →
      </button>
    `;
  }

  function renderHomeRecentOutfits() {
    const container = document.getElementById('home-recent-outfits');
    if (!container) return;

    const recent = state.outfits.slice(-3).reverse();
    if (recent.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-style: italic;">No outfits created yet. Launch the Style Lab to compose your first look.</p>`;
      return;
    }

    container.innerHTML = recent.map(outfit => renderOutfitCardHtml(outfit)).join('');
  }

  function renderHomeInspirationSnippet() {
    const container = document.getElementById('home-inspiration-snippet');
    if (!container) return;

    const sample = DISCOVER_INSPIRATION.slice(0, 3);
    container.innerHTML = sample.map(item => renderInspirationCardHtml(item)).join('');
  }

  /* ==========================================================================
     7. MY CLOSET (DIGITAL WARDROBE)
     ========================================================================== */
  function setupClosetListeners() {
    // Category tabs
    const categoryTabs = document.getElementById('closet-category-tabs');
    if (categoryTabs) {
      categoryTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.pill-btn');
        if (!btn) return;
        categoryTabs.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.closetFilter.category = btn.getAttribute('data-category');
        renderCloset();
      });
    }

    // Search input
    const searchInput = document.getElementById('closet-search-input');
    const clearBtn = document.getElementById('closet-search-clear');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.closetFilter.search = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.classList.toggle('hidden', !state.closetFilter.search);
        renderCloset();
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.closetFilter.search = '';
        clearBtn.classList.add('hidden');
        renderCloset();
      });
    }

    // Dropdown filters
    const filterAesthetic = document.getElementById('closet-filter-aesthetic');
    if (filterAesthetic) {
      filterAesthetic.addEventListener('change', (e) => {
        state.closetFilter.aesthetic = e.target.value;
        renderCloset();
      });
    }

    const filterColor = document.getElementById('closet-filter-color');
    if (filterColor) {
      filterColor.addEventListener('change', (e) => {
        state.closetFilter.color = e.target.value;
        renderCloset();
      });
    }

    const filterOccasion = document.getElementById('closet-filter-occasion');
    if (filterOccasion) {
      filterOccasion.addEventListener('change', (e) => {
        state.closetFilter.occasion = e.target.value;
        renderCloset();
      });
    }

    const sortSelect = document.getElementById('closet-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.closetFilter.sort = e.target.value;
        renderCloset();
      });
    }

    // Favorite filter toggle
    const favToggle = document.getElementById('closet-fav-toggle');
    if (favToggle) {
      favToggle.addEventListener('click', () => {
        state.closetFilter.onlyFavorites = !state.closetFilter.onlyFavorites;
        favToggle.classList.toggle('is-fav', state.closetFilter.onlyFavorites);
        renderCloset();
      });
    }
  }

  function renderCloset() {
    const grid = document.getElementById('closet-items-grid');
    const emptyState = document.getElementById('closet-empty-state');
    const counter = document.getElementById('closet-counter');
    const activeTagsBox = document.getElementById('closet-active-tags');
    if (!grid) return;

    let items = state.wardrobe.slice();

    // 1. Filter by category
    if (state.closetFilter.category !== 'all') {
      items = items.filter(i => i.category === state.closetFilter.category);
    }

    // 2. Filter by search
    if (state.closetFilter.search) {
      const q = state.closetFilter.search;
      items = items.filter(i => {
        const haystack = `${i.name} ${i.color} ${i.material || ''} ${i.aesthetic || ''} ${i.notes || ''} ${i.subcategory || ''}`.toLowerCase();
        return haystack.includes(q);
      });
    }

    // 3. Filter by aesthetic
    if (state.closetFilter.aesthetic) {
      items = items.filter(i => i.aesthetic === state.closetFilter.aesthetic);
    }

    // 4. Filter by color
    if (state.closetFilter.color) {
      items = items.filter(i => i.color && i.color.toLowerCase().includes(state.closetFilter.color.toLowerCase()));
    }

    // 5. Filter by occasion
    if (state.closetFilter.occasion) {
      items = items.filter(i => (i.occasions || []).includes(state.closetFilter.occasion));
    }

    // 6. Favorites only
    if (state.closetFilter.onlyFavorites) {
      items = items.filter(i => i.isFavorite);
    }

    // 7. Sort
    if (state.closetFilter.sort === 'alpha') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.closetFilter.sort === 'favorites') {
      items.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
    } else {
      // Recent (newest first)
      items.reverse();
    }

    // Update Counter
    if (counter) {
      counter.textContent = `Showing ${items.length} ${items.length === 1 ? 'garment' : 'garments'}`;
    }

    // Active filter tags
    if (activeTagsBox) {
      let tagsHtml = '';
      if (state.closetFilter.category !== 'all') {
        tagsHtml += `<span class="filter-chip">${escapeHtml(state.closetFilter.category)} <button onclick="resetClosetFilter('category')">×</button></span>`;
      }
      if (state.closetFilter.aesthetic) {
        tagsHtml += `<span class="filter-chip">${escapeHtml(state.closetFilter.aesthetic)} <button onclick="resetClosetFilter('aesthetic')">×</button></span>`;
      }
      if (state.closetFilter.color) {
        tagsHtml += `<span class="filter-chip">${escapeHtml(state.closetFilter.color)} <button onclick="resetClosetFilter('color')">×</button></span>`;
      }
      if (state.closetFilter.occasion) {
        tagsHtml += `<span class="filter-chip">${escapeHtml(state.closetFilter.occasion)} <button onclick="resetClosetFilter('occasion')">×</button></span>`;
      }
      if (state.closetFilter.onlyFavorites) {
        tagsHtml += `<span class="filter-chip">Favorites Only <button onclick="resetClosetFilter('favorites')">×</button></span>`;
      }
      activeTagsBox.innerHTML = tagsHtml;
    }

    // Empty state handling
    if (items.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    } else {
      if (emptyState) emptyState.classList.add('hidden');
    }

    // Render Cards
    grid.innerHTML = items.map(item => `
      <div class="garment-card" onclick="openItemDetailModal('${item.id}')">
        <div class="garment-img-wrap">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
          <button class="garment-fav-btn ${item.isFavorite ? 'is-fav' : ''}" onclick="toggleGarmentFavorite(event, '${item.id}')" title="Favorite">
            <svg class="svg-icon sm" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" stroke-width="1.8" fill="${item.isFavorite ? 'currentColor' : 'none'}"/></svg>
          </button>
          <span class="garment-category-tag">${escapeHtml(item.subcategory || item.category)}</span>
        </div>
        <div class="garment-info">
          <h4 class="garment-name">${escapeHtml(item.name)}</h4>
          <div class="garment-meta-row">
            <span class="color-swatch-dot" style="background-color: ${getColorHex(item.color)};"></span>
            <span>${escapeHtml(item.color)}</span>
            <span class="garment-aesthetic-badge" style="margin-left: auto;">${escapeHtml(item.aesthetic)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function resetClosetFilter(type) {
    if (type === 'category') {
      state.closetFilter.category = 'all';
      document.querySelectorAll('#closet-category-tabs .pill-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-category') === 'all');
      });
    } else if (type === 'aesthetic') {
      state.closetFilter.aesthetic = '';
      const el = document.getElementById('closet-filter-aesthetic');
      if (el) el.value = '';
    } else if (type === 'color') {
      state.closetFilter.color = '';
      const el = document.getElementById('closet-filter-color');
      if (el) el.value = '';
    } else if (type === 'occasion') {
      state.closetFilter.occasion = '';
      const el = document.getElementById('closet-filter-occasion');
      if (el) el.value = '';
    } else if (type === 'favorites') {
      state.closetFilter.onlyFavorites = false;
      const favBtn = document.getElementById('closet-fav-toggle');
      if (favBtn) favBtn.classList.remove('is-fav');
    }
    renderCloset();
  }
  window.resetClosetFilter = resetClosetFilter;

  function toggleGarmentFavorite(e, itemId) {
    e.stopPropagation();
    const item = state.wardrobe.find(i => i.id === itemId);
    if (!item) return;
    item.isFavorite = !item.isFavorite;
    saveWardrobeToStorage();
    renderCloset();
    renderDashboardMetrics();
    showToast(item.isFavorite ? `Added "${item.name}" to favorites` : `Removed from favorites`, 'info');
  }
  window.toggleGarmentFavorite = toggleGarmentFavorite;

  /* ==========================================================================
     8. ADD & EDIT GARMENT MODAL & CANVAS IMAGE COMPRESSION
     ========================================================================== */
  function openAddItemModal(editItemId = null) {
    const modal = document.getElementById('modal-item');
    const form = document.getElementById('form-item');
    const title = document.getElementById('modal-item-title');
    const idInput = document.getElementById('item-id');
    const preview = document.getElementById('image-preview');
    const placeholder = document.getElementById('image-placeholder');

    form.reset();
    idInput.value = '';
    preview.src = '';
    preview.classList.add('hidden');
    placeholder.classList.remove('hidden');

    // Populate subcategories
    updateSubcategoriesDropdown();

    if (editItemId) {
      const item = state.wardrobe.find(i => i.id === editItemId);
      if (item) {
        title.textContent = 'Edit Garment Details';
        idInput.value = item.id;
        document.getElementById('item-name').value = item.name;
        document.getElementById('item-category').value = item.category;
        updateSubcategoriesDropdown(item.subcategory);
        document.getElementById('item-color').value = item.color;
        document.getElementById('item-secondary-color').value = item.secondaryColor || '';
        document.getElementById('item-pattern').value = item.pattern || 'Solid';
        document.getElementById('item-material').value = item.material || '';
        document.getElementById('item-aesthetic').value = item.aesthetic || 'Minimalist';
        document.getElementById('item-weather').value = item.weather || 'All-weather';
        document.getElementById('item-season').value = item.season || 'All-year';
        document.getElementById('item-notes').value = item.notes || '';

        // Occasions checks
        const occasionCheckboxes = document.querySelectorAll('#item-occasions-picker input');
        occasionCheckboxes.forEach(cb => {
          cb.checked = (item.occasions || []).includes(cb.value);
        });

        // Image
        if (item.image) {
          preview.src = item.image;
          preview.classList.remove('hidden');
          placeholder.classList.add('hidden');
        }
      }
    } else {
      title.textContent = 'Add Garment to Closet';
      // Default sample image
      preview.src = SAMPLE_IMAGES.linenShirt;
      preview.classList.remove('hidden');
      placeholder.classList.add('hidden');
    }

    openModal('modal-item');
  }
  window.openAddItemModal = openAddItemModal;

  function updateSubcategoriesDropdown(selectedVal = null) {
    const category = document.getElementById('item-category').value;
    const subSelect = document.getElementById('item-subcategory');
    if (!subSelect) return;

    const list = CATEGORY_SUBCATEGORIES[category] || ['Other'];
    subSelect.innerHTML = list.map(sub => `
      <option value="${escapeHtml(sub)}" ${selectedVal === sub ? 'selected' : ''}>${escapeHtml(sub)}</option>
    `).join('');
  }
  window.updateSubcategoriesDropdown = updateSubcategoriesDropdown;

  function setupImageUploadHandlers() {
    const dropZone = document.getElementById('image-drop-zone');
    const fileInput = document.getElementById('item-image-file');
    const preview = document.getElementById('image-preview');
    const placeholder = document.getElementById('image-placeholder');

    if (!dropZone || !fileInput) return;

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--accent-burgundy)';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'var(--warm-grey)';
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--warm-grey)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processUploadedImage(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        processUploadedImage(fileInput.files[0]);
      }
    });
  }

  // Pure Canvas Image Compression: Max 800px, 0.75 quality JPEG
  function processUploadedImage(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 800;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.76);
        const preview = document.getElementById('image-preview');
        const placeholder = document.getElementById('image-placeholder');

        if (preview && placeholder) {
          preview.src = compressedDataUrl;
          preview.classList.remove('hidden');
          placeholder.classList.add('hidden');
        }
        showToast('Image compressed & ready for studio', 'success');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function showPresetSamplePhotos() {
    const tray = document.getElementById('preset-photos-picker');
    if (!tray) return;

    if (!tray.classList.contains('hidden')) {
      tray.classList.add('hidden');
      return;
    }

    tray.innerHTML = Object.entries(SAMPLE_IMAGES).map(([name, url]) => `
      <img src="${url}" class="preset-thumb" title="${name}" onclick="selectPresetPhoto('${url}')">
    `).join('');
    tray.classList.remove('hidden');
  }
  window.showPresetSamplePhotos = showPresetSamplePhotos;

  function selectPresetPhoto(url) {
    const preview = document.getElementById('image-preview');
    const placeholder = document.getElementById('image-placeholder');
    const tray = document.getElementById('preset-photos-picker');

    if (preview && placeholder) {
      preview.src = url;
      preview.classList.remove('hidden');
      placeholder.classList.add('hidden');
    }
    if (tray) tray.classList.add('hidden');
  }
  window.selectPresetPhoto = selectPresetPhoto;

  function handleItemFormSubmit(e) {
    e.preventDefault();
    const idInput = document.getElementById('item-id');
    const isEdit = !!idInput.value;

    const preview = document.getElementById('image-preview');
    const imageUrl = preview && !preview.classList.contains('hidden') ? preview.src : SAMPLE_IMAGES.linenShirt;

    // Selected Occasions
    const occasions = Array.from(document.querySelectorAll('#item-occasions-picker input:checked')).map(cb => cb.value);

    const newItem = {
      id: isEdit ? idInput.value : `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: document.getElementById('item-name').value.trim(),
      category: document.getElementById('item-category').value,
      subcategory: document.getElementById('item-subcategory').value,
      color: document.getElementById('item-color').value,
      secondaryColor: document.getElementById('item-secondary-color').value.trim() || 'None',
      pattern: document.getElementById('item-pattern').value,
      material: document.getElementById('item-material').value.trim() || 'Natural textile',
      aesthetic: document.getElementById('item-aesthetic').value,
      occasions: occasions.length > 0 ? occasions : ['Work', 'Casual outing'],
      weather: document.getElementById('item-weather').value,
      season: document.getElementById('item-season').value,
      notes: document.getElementById('item-notes').value.trim(),
      image: imageUrl,
      isFavorite: isEdit ? (state.wardrobe.find(i => i.id === idInput.value)?.isFavorite || false) : false,
      wearCount: isEdit ? (state.wardrobe.find(i => i.id === idInput.value)?.wearCount || 0) : 0,
      dateAdded: isEdit ? (state.wardrobe.find(i => i.id === idInput.value)?.dateAdded || formatDateISO(new Date())) : formatDateISO(new Date())
    };

    if (isEdit) {
      const idx = state.wardrobe.findIndex(i => i.id === newItem.id);
      if (idx !== -1) state.wardrobe[idx] = newItem;
      showToast(`Updated "${newItem.name}"`, 'success');
    } else {
      state.wardrobe.push(newItem);
      showToast(`Added "${newItem.name}" to your closet`, 'success');
    }

    saveWardrobeToStorage();
    closeModal('modal-item');
    renderCloset();
    renderDashboardMetrics();
    renderStyleLabBoard(); // Refresh drawer
  }
  window.handleItemFormSubmit = handleItemFormSubmit;

  /* ==========================================================================
     9. ITEM DETAIL VIEW & DELETION
     ========================================================================== */
  function openItemDetailModal(itemId) {
    const item = state.wardrobe.find(i => i.id === itemId);
    if (!item) return;

    const title = document.getElementById('detail-item-title');
    const body = document.getElementById('detail-item-body');
    const footer = document.getElementById('detail-item-footer');

    if (title) title.textContent = item.name;

    if (body) {
      body.innerHTML = `
        <div class="detail-modal-layout">
          <div class="detail-img-wrap">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
          </div>
          <div class="detail-content">
            <span class="detail-category-eyebrow">${escapeHtml(item.category)} • ${escapeHtml(item.subcategory)}</span>
            <h3 class="detail-name">${escapeHtml(item.name)}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">${escapeHtml(item.notes || 'No specific styling notes added.')}</p>

            <table class="detail-meta-table">
              <tr>
                <td>Aesthetic:</td>
                <td><span class="garment-aesthetic-badge">${escapeHtml(item.aesthetic)}</span></td>
              </tr>
              <tr>
                <td>Primary Colour:</td>
                <td>
                  <span class="color-swatch-dot" style="background-color:${getColorHex(item.color)};"></span>
                  ${escapeHtml(item.color)} ${item.secondaryColor && item.secondaryColor !== 'None' ? `(${escapeHtml(item.secondaryColor)})` : ''}
                </td>
              </tr>
              <tr>
                <td>Material:</td>
                <td>${escapeHtml(item.material || 'Natural textile')}</td>
              </tr>
              <tr>
                <td>Pattern:</td>
                <td>${escapeHtml(item.pattern || 'Solid')}</td>
              </tr>
              <tr>
                <td>Weather:</td>
                <td>${escapeHtml(item.weather)}</td>
              </tr>
              <tr>
                <td>Occasions:</td>
                <td>${(item.occasions || []).join(', ') || 'Any'}</td>
              </tr>
              <tr>
                <td>Times Styled:</td>
                <td>${item.wearCount || 0} times</td>
              </tr>
            </table>
          </div>
        </div>
      `;
    }

    if (footer) {
      footer.innerHTML = `
        <button class="btn btn-outline text-danger" onclick="confirmDeleteItem('${item.id}')">Delete Garment</button>
        <button class="btn btn-secondary" onclick="closeModal('modal-item-detail'); openAddItemModal('${item.id}')">Edit</button>
        <button class="btn btn-primary" onclick="closeModal('modal-item-detail'); navigateTo('stylelab', {addItemId: '${item.id}'})">
          Place on Styling Board →
        </button>
      `;
    }

    openModal('modal-item-detail');
  }
  window.openItemDetailModal = openItemDetailModal;

  function confirmDeleteItem(itemId) {
    const item = state.wardrobe.find(i => i.id === itemId);
    if (!item) return;

    closeModal('modal-item-detail');
    showConfirmDialog(
      'Remove Garment',
      `Are you sure you want to remove "${item.name}" from your closet? It will also be removed from any outfits using it.`,
      () => {
        // Delete item
        state.wardrobe = state.wardrobe.filter(i => i.id !== itemId);
        saveWardrobeToStorage();

        // Clean references from saved outfits gracefully
        state.outfits.forEach(outfit => {
          outfit.itemIds = (outfit.itemIds || []).filter(id => id !== itemId);
        });
        saveOutfitsToStorage();

        // Clean from Style Lab if active
        for (let slot in state.styleLabBoard) {
          if (state.styleLabBoard[slot] === itemId) {
            state.styleLabBoard[slot] = null;
          }
        }

        renderCloset();
        renderDashboardMetrics();
        renderStyleLabBoard();
        renderLookbook();
        showToast(`Removed "${item.name}" from closet`, 'info');
      }
    );
  }
  window.confirmDeleteItem = confirmDeleteItem;

  /* ==========================================================================
     10. STYLE LAB (OUTFIT CREATION STUDIO)
     ========================================================================== */
  function setupStyleLabListeners() {
    // Clear board
    const clearBtn = document.getElementById('stylelab-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        for (let k in state.styleLabBoard) state.styleLabBoard[k] = null;
        state.styleLabEditingOutfitId = null;
        renderStyleLabBoard();
        showToast('Styling board cleared', 'info');
      });
    }

    // Save Outfit button
    const saveBtn = document.getElementById('stylelab-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        openSaveOutfitModal();
      });
    }

    // Export board as PNG
    const exportBtn = document.getElementById('stylelab-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        exportStylingBoardAsPNG();
      });
    }

    // Drawer category filter tabs
    const drawerTabs = document.getElementById('stylelab-drawer-tabs');
    if (drawerTabs) {
      drawerTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.drawer-tab');
        if (!btn) return;
        drawerTabs.querySelectorAll('.drawer-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderStyleLabDrawerItems(btn.getAttribute('data-drawer-cat'));
      });
    }

    // Drawer search
    const drawerSearch = document.getElementById('stylelab-drawer-search');
    if (drawerSearch) {
      drawerSearch.addEventListener('input', (e) => {
        const activeTab = document.querySelector('.drawer-tab.active')?.getAttribute('data-drawer-cat') || 'all';
        renderStyleLabDrawerItems(activeTab, e.target.value.trim().toLowerCase());
      });
    }
  }

  function assignItemToBoardSlot(item) {
    if (item.category === 'Tops') {
      state.styleLabBoard['Tops'] = item.id;
      // If one piece is selected, clear it to avoid incompatible silhouette
      state.styleLabBoard['One-piece garments'] = null;
    } else if (item.category === 'Bottoms') {
      state.styleLabBoard['Bottoms'] = item.id;
      state.styleLabBoard['One-piece garments'] = null;
    } else if (item.category === 'One-piece garments') {
      state.styleLabBoard['One-piece garments'] = item.id;
      // Clear tops and bottoms
      state.styleLabBoard['Tops'] = null;
      state.styleLabBoard['Bottoms'] = null;
    } else if (item.category === 'Outerwear') {
      state.styleLabBoard['Outerwear'] = item.id;
    } else if (item.category === 'Footwear') {
      state.styleLabBoard['Footwear'] = item.id;
    } else if (item.category === 'Accessories') {
      if (['Hats', 'Caps', 'Glasses', 'Sunglasses', 'Scarves'].includes(item.subcategory)) {
        state.styleLabBoard['Accessories-Head'] = item.id;
      } else {
        state.styleLabBoard['Accessories-Bag'] = item.id;
      }
    } else {
      // Custom category fits in accessories
      state.styleLabBoard['Accessories-Bag'] = item.id;
    }

    renderStyleLabBoard();
    showToast(`Placed ${item.name} on board`, 'success');
  }

  function renderStyleLabBoard() {
    const slots = [
      { key: 'Outerwear', id: 'slot-outerwear', defaultLabel: '+ Add Outerwear' },
      { key: 'Accessories-Head', id: 'slot-accessories-head', defaultLabel: '+ Add Hat / Scarf' },
      { key: 'Tops', id: 'slot-tops', defaultLabel: '+ Add Top' },
      { key: 'One-piece garments', id: 'slot-onepiece', defaultLabel: '+ Add One-Piece' },
      { key: 'Bottoms', id: 'slot-bottoms', defaultLabel: '+ Add Bottom' },
      { key: 'Footwear', id: 'slot-footwear', defaultLabel: '+ Add Footwear' },
      { key: 'Accessories-Bag', id: 'slot-accessories-bag', defaultLabel: '+ Add Bag / Acc' }
    ];

    slots.forEach(slot => {
      const container = document.getElementById(slot.id);
      const parentSlot = container ? container.closest('.board-slot') : null;
      if (!container) return;

      if (parentSlot) {
        parentSlot.ondragover = (e) => {
          e.preventDefault();
          parentSlot.classList.add('slot-drag-hover');
        };
        parentSlot.ondragleave = () => {
          parentSlot.classList.remove('slot-drag-hover');
        };
        parentSlot.ondrop = (e) => {
          e.preventDefault();
          parentSlot.classList.remove('slot-drag-hover');
          const draggedItemId = e.dataTransfer.getData('text/plain');
          if (draggedItemId) {
            const item = state.wardrobe.find(i => i.id === draggedItemId);
            if (item) assignItemToBoardSlot(item);
          }
        };
      }

      const itemId = state.styleLabBoard[slot.key];
      const item = itemId ? state.wardrobe.find(i => i.id === itemId) : null;

      if (item) {
        if (parentSlot) parentSlot.classList.add('has-item');
        container.innerHTML = `
          <div class="slot-filled-card" draggable="true" ondragstart="handleDrawerDragStart(event, '${item.id}')">
            <img src="${escapeHtml(item.image)}" class="slot-item-thumb" alt="${escapeHtml(item.name)}" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
            <div class="slot-item-info">
              <span class="slot-item-name">${escapeHtml(item.name)}</span>
              <span class="slot-item-meta">${escapeHtml(item.color)} • ${escapeHtml(item.aesthetic)}</span>
            </div>
            <button class="slot-remove-btn" onclick="removeSlotItem('${slot.key}')" title="Remove piece">×</button>
          </div>
        `;
      } else {
        if (parentSlot) parentSlot.classList.remove('has-item');
        container.innerHTML = `
          <button class="slot-add-btn" onclick="openSlotPicker('${slot.key}')">${slot.defaultLabel}</button>
        `;
      }
    });

    renderStyleLabDrawerItems();
    analyzeStyleLabHarmony();
    renderCompleteTheLook();
  }

  function removeSlotItem(slotKey) {
    state.styleLabBoard[slotKey] = null;
    renderStyleLabBoard();
  }
  window.removeSlotItem = removeSlotItem;

  function openSlotPicker(category) {
    const activeTab = category === 'Accessories-Head' || category === 'Accessories-Bag' ? 'Accessories' : category;
    const tabBtn = document.querySelector(`.drawer-tab[data-drawer-cat="${activeTab}"]`);
    if (tabBtn) tabBtn.click();
    showToast(`Select a piece from the drawer on the right`, 'info');
  }
  window.openSlotPicker = openSlotPicker;

  function renderStyleLabDrawerItems(cat = 'all', searchQuery = '') {
    const container = document.getElementById('stylelab-drawer-items');
    if (!container) return;

    let items = state.wardrobe.slice();
    if (cat !== 'all') {
      items = items.filter(i => i.category === cat);
    }
    if (searchQuery) {
      items = items.filter(i => `${i.name} ${i.color} ${i.aesthetic}`.toLowerCase().includes(searchQuery));
    }

    if (items.length === 0) {
      container.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); padding:1rem; text-align:center;">No items found. Add items to your closet.</p>`;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="drawer-item-row" onclick="handleDrawerItemClick('${item.id}')">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
        <div class="drawer-item-meta">
          <span class="drawer-item-name">${escapeHtml(item.name)}</span>
          <span class="drawer-item-cat">${escapeHtml(item.subcategory || item.category)} • ${escapeHtml(item.color)}</span>
        </div>
        <span style="font-size:1.1rem; color:var(--accent-burgundy);">+</span>
      </div>
    `).join('');
  }

  function handleDrawerItemClick(itemId) {
    const item = state.wardrobe.find(i => i.id === itemId);
    if (item) assignItemToBoardSlot(item);
  }
  window.handleDrawerItemClick = handleDrawerItemClick;

  // Harmony & Balance analysis
  function analyzeStyleLabHarmony() {
    const textElem = document.getElementById('stylelab-harmony-text');
    const badge = document.getElementById('stylelab-harmony-badge');
    const dot = badge ? badge.querySelector('.harmony-dot') : null;
    if (!textElem || !badge) return;

    const hasTop = !!state.styleLabBoard['Tops'];
    const hasBottom = !!state.styleLabBoard['Bottoms'];
    const hasOnePiece = !!state.styleLabBoard['One-piece garments'];
    const hasShoes = !!state.styleLabBoard['Footwear'];
    const hasOuter = !!state.styleLabBoard['Outerwear'];
    const hasAcc = !!state.styleLabBoard['Accessories-Head'] || !!state.styleLabBoard['Accessories-Bag'];

    const piecesCount = Object.values(state.styleLabBoard).filter(Boolean).length;

    if (piecesCount === 0) {
      textElem.textContent = 'Select pieces to analyse composition balance';
      if (dot) dot.className = 'harmony-dot';
      return;
    }

    const hasCore = (hasTop && hasBottom) || hasOnePiece;

    if (hasCore && hasShoes) {
      textElem.textContent = hasOuter || hasAcc ? 'Balanced silhouette • Ready to save' : 'Solid foundation • Add accessories to complete';
      if (dot) dot.className = 'harmony-dot good';
    } else if (hasCore) {
      textElem.textContent = 'Structure set • Footwear needed';
      if (dot) dot.className = 'harmony-dot';
    } else {
      textElem.textContent = 'Incomplete outfit structure (needs Top + Bottom or One-Piece)';
      if (dot) dot.className = 'harmony-dot';
    }
  }

  // Complete the Look: Intelligent Accessory Matching
  function renderCompleteTheLook() {
    const container = document.getElementById('ctl-suggestions-list');
    if (!container) return;

    const boardItemIds = Object.values(state.styleLabBoard).filter(Boolean);
    const boardItems = boardItemIds.map(id => state.wardrobe.find(i => i.id === id)).filter(Boolean);

    if (boardItems.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; font-size: 0.85rem; color: var(--text-muted); font-style: italic; padding: 0.5rem 0;">
          Add clothing items to your board above to receive intelligent accessory pairings.
        </div>
      `;
      return;
    }

    // Determine current aesthetic and dominant colors
    const aesthetics = boardItems.map(i => i.aesthetic);
    const primaryAesthetic = getMostFrequent(aesthetics) || 'Minimalist';
    const currentColors = boardItems.map(i => i.color);

    // Look for accessories in user's wardrobe that aren't already on the board
    const ownedAccessories = state.wardrobe.filter(i => {
      return (i.category === 'Accessories' || i.category === 'Footwear') && !boardItemIds.includes(i.id);
    });

    const suggestions = [];

    // Prioritize owned matching accessories
    ownedAccessories.forEach(acc => {
      let score = 0;
      if (acc.aesthetic === primaryAesthetic) score += 3;
      if (isColorHarmonious(acc.color, currentColors)) score += 2;
      suggestions.push({
        item: acc,
        isOwned: true,
        score: score,
        why: `Matches your outfit's ${primaryAesthetic} aesthetic and coordinates with ${acc.color} tones.`
      });
    });

    // Add curated inspiration accessories if few owned
    if (suggestions.length < 3) {
      suggestions.push({
        item: {
          name: 'Sculptural Brushed Brass Cuff',
          image: SAMPLE_IMAGES.brassCuff,
          color: 'Gold',
          aesthetic: primaryAesthetic
        },
        isOwned: false,
        score: 1,
        why: `Warm metallic hardware brings polish to neutral tailored silhouettes.`
      });
      suggestions.push({
        item: {
          name: 'Amber Acetate Sunglasses',
          image: SAMPLE_IMAGES.sunglasses,
          color: 'Amber',
          aesthetic: primaryAesthetic
        },
        isOwned: false,
        score: 1,
        why: `Structured eyewear provides a defined focal point to off-duty layers.`
      });
    }

    suggestions.sort((a, b) => b.score - a.score);

    container.innerHTML = suggestions.slice(0, 4).map(s => `
      <div class="ctl-item-card">
        <img src="${escapeHtml(s.item.image)}" class="ctl-thumb" alt="${escapeHtml(s.item.name)}" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
        <div class="ctl-item-title">${escapeHtml(s.item.name)}</div>
        <div class="ctl-item-why">${escapeHtml(s.why)}</div>
        ${s.isOwned ? `
          <button class="btn btn-secondary btn-sm" onclick="handleDrawerItemClick('${s.item.id}')" style="margin-top:auto;">+ Add to Board</button>
        ` : `
          <span style="font-size:0.7rem; color:var(--accent-burgundy); font-weight:600; margin-top:auto;">Suggested Inspiration</span>
        `}
      </div>
    `).join('');
  }

  function openSaveOutfitModal() {
    const itemIds = Object.values(state.styleLabBoard).filter(Boolean);
    if (itemIds.length < 2) {
      showToast('Please place at least two garments on the styling board', 'error');
      return;
    }

    const modal = document.getElementById('modal-save-outfit');
    const form = document.getElementById('form-save-outfit');
    const colSelect = document.getElementById('outfit-collection');
    form.reset();

    // Populate collections
    if (colSelect) {
      colSelect.innerHTML = state.collections.map(col => `
        <option value="${escapeHtml(col)}">${escapeHtml(col)}</option>
      `).join('');
    }

    // Auto-fill aesthetic from items
    const boardItems = itemIds.map(id => state.wardrobe.find(i => i.id === id)).filter(Boolean);
    const aesthetics = boardItems.map(i => i.aesthetic);
    const primaryAesthetic = getMostFrequent(aesthetics) || 'Quiet luxury';

    const aestheticSelect = document.getElementById('outfit-aesthetic');
    if (aestheticSelect) aestheticSelect.value = primaryAesthetic;

    openModal('modal-save-outfit');
  }

  function handleSaveOutfitSubmit(e) {
    e.preventDefault();
    const itemIds = Object.values(state.styleLabBoard).filter(Boolean);

    const newOutfit = {
      id: state.styleLabEditingOutfitId || `outfit_${Date.now()}`,
      name: document.getElementById('outfit-name').value.trim(),
      itemIds: itemIds,
      aesthetic: document.getElementById('outfit-aesthetic').value,
      mood: document.getElementById('outfit-mood').value,
      occasion: document.getElementById('outfit-occasion').value,
      weather: document.getElementById('outfit-weather').value,
      collection: document.getElementById('outfit-collection').value,
      notes: document.getElementById('outfit-notes').value.trim(),
      dateCreated: formatDateISO(new Date())
    };

    if (state.styleLabEditingOutfitId) {
      const idx = state.outfits.findIndex(o => o.id === state.styleLabEditingOutfitId);
      if (idx !== -1) state.outfits[idx] = newOutfit;
      showToast(`Updated outfit "${newOutfit.name}"`, 'success');
      state.styleLabEditingOutfitId = null;
    } else {
      state.outfits.push(newOutfit);
      showToast(`Saved "${newOutfit.name}" to Lookbook`, 'success');
    }

    // If an active challenge is in progress, mark submission
    if (state.activeChallenge) {
      state.challenges.push({
        id: `sub_${Date.now()}`,
        challengeId: state.activeChallenge.id,
        challengeTitle: state.activeChallenge.title,
        outfitId: newOutfit.id,
        dateSubmitted: formatDateISO(new Date())
      });
      saveChallengesToStorage();
    }

    saveOutfitsToStorage();
    closeModal('modal-save-outfit');
    renderDashboardMetrics();
    renderLookbook();
  }
  window.handleSaveOutfitSubmit = handleSaveOutfitSubmit;

  function loadOutfitToStyleLab(outfitId) {
    const outfit = state.outfits.find(o => o.id === outfitId);
    if (!outfit) return;

    // Reset board
    for (let k in state.styleLabBoard) state.styleLabBoard[k] = null;

    outfit.itemIds.forEach(id => {
      const item = state.wardrobe.find(i => i.id === id);
      if (item) assignItemToBoardSlot(item);
    });

    state.styleLabEditingOutfitId = outfit.id;
    navigateTo('stylelab');
    showToast(`Loaded "${outfit.name}" into Style Lab`, 'info');
  }
  window.loadOutfitToStyleLab = loadOutfitToStyleLab;

  // Pure HTML5 Canvas Outfit Export
  function exportStylingBoardAsPNG() {
    const itemIds = Object.values(state.styleLabBoard).filter(Boolean);
    if (itemIds.length === 0) {
      showToast('Styling board is empty. Add pieces before exporting.', 'error');
      return;
    }

    const items = itemIds.map(id => state.wardrobe.find(i => i.id === id)).filter(Boolean);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1400;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#F7F4EF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle editorial border
    ctx.strokeStyle = '#D8D1C8';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Editorial Header
    ctx.fillStyle = '#702B40';
    ctx.font = '700 18px "DM Sans", sans-serif';
    ctx.fillText('FIT CHECK STUDIO • EDITORIAL COMPOSITION', 80, 100);

    ctx.fillStyle = '#211F1E';
    ctx.font = '700 44px "Playfair Display", serif';
    ctx.fillText('Signature Look Composition', 80, 160);

    ctx.fillStyle = '#6E6861';
    ctx.font = '500 20px "DM Sans", sans-serif';
    ctx.fillText(`Curated on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, 80, 200);

    // Draw images in a neat grid
    const total = items.length;
    const cols = total <= 4 ? 2 : 3;
    const rows = Math.ceil(total / cols);

    const startX = 80;
    const startY = 250;
    const gridW = canvas.width - 160;
    const gridH = 920;
    const cellW = (gridW - (cols - 1) * 25) / cols;
    const cellH = (gridH - (rows - 1) * 25) / rows;

    let loadedCount = 0;
    items.forEach((item, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = startX + col * (cellW + 25);
      const y = startY + row * (cellH + 25);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw white frame
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x, y, cellW, cellH);

        // Aspect ratio cover
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + 10, y + 10, cellW - 20, cellH - 70);
        ctx.clip();

        const imgRatio = img.width / img.height;
        const targetW = cellW - 20;
        const targetH = cellH - 70;
        const targetRatio = targetW / targetH;

        let renderW, renderH, offsetX, offsetY;
        if (imgRatio > targetRatio) {
          renderH = targetH;
          renderW = targetH * imgRatio;
          offsetX = (targetW - renderW) / 2;
          offsetY = 0;
        } else {
          renderW = targetW;
          renderH = targetW / imgRatio;
          offsetX = 0;
          offsetY = (targetH - renderH) / 2;
        }

        ctx.drawImage(img, x + 10 + offsetX, y + 10 + offsetY, renderW, renderH);
        ctx.restore();

        // Caption
        ctx.fillStyle = '#211F1E';
        ctx.font = '600 16px "DM Sans", sans-serif';
        const truncated = item.name.length > 24 ? item.name.substring(0, 22) + '...' : item.name;
        ctx.fillText(truncated, x + 15, y + cellH - 35);

        ctx.fillStyle = '#702B40';
        ctx.font = '500 13px "DM Sans", sans-serif';
        ctx.fillText(`${item.category.toUpperCase()} • ${item.color}`, x + 15, y + cellH - 16);

        loadedCount++;
        if (loadedCount === total) {
          finishExport();
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === total) finishExport();
      };
      img.src = item.image;
    });

    function finishExport() {
      // Watermark
      ctx.fillStyle = '#8C847A';
      ctx.font = '600 14px "DM Sans", sans-serif';
      ctx.fillText('FIT CHECK — YOUR STYLE. YOUR RULES.', 80, canvas.height - 70);

      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `fit-check-composition-${Date.now()}.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      showToast('Exported styling board as PNG', 'success');
    }
  }

  /* ==========================================================================
     11. THE PERSONAL STYLING ASSISTANT (SIGNATURE FEATURE)
     ========================================================================== */
  function handleAssistantSubmit(e) {
    e.preventDefault();

    // 1. Gather criteria
    const moodInput = document.querySelector('input[name="mood"]:checked')?.value || 'Effortlessly chic';
    const customMood = document.getElementById('custom-mood-text')?.value.trim();
    const mood = moodInput === 'Custom' && customMood ? customMood : moodInput;

    const weather = document.querySelector('input[name="weather"]:checked')?.value || 'Warm';
    const occasion = document.querySelector('input[name="occasion"]:checked')?.value || 'Work';
    const profession = document.getElementById('criteria-profession')?.value || 'Creative and media';
    const dresscode = document.getElementById('criteria-dresscode')?.value || 'Smart casual';
    const day = document.getElementById('criteria-day')?.value || 'Monday';
    const targetDate = document.getElementById('criteria-target-date')?.value || '';

    const aestheticInputs = Array.from(document.querySelectorAll('#criteria-aesthetics-grid input:checked')).map(cb => cb.value);
    const selectedAesthetics = aestheticInputs.length > 0 ? aestheticInputs : ['Quiet luxury', 'Smart casual'];

    // 2. Run Intelligent Rules-Based Styling Engine
    const { closetRecs, discoverRecs } = runStylingRecommendationEngine({
      mood,
      weather,
      occasion,
      profession,
      dresscode,
      day,
      aesthetics: selectedAesthetics
    });

    state.assistantRecommendations = { closetRecs, discoverRecs };

    // Update headline
    const headline = document.getElementById('results-headline');
    const subtext = document.getElementById('results-subtext');
    if (headline) headline.textContent = `Curated Looks for ${day} (${weather})`;
    if (subtext) subtext.textContent = `Aesthetic: ${selectedAesthetics.join(', ')} • Mood: ${mood} • Dress Code: ${dresscode}`;

    // Render results
    renderAssistantResults();

    // Scroll to results
    const resultsSection = document.getElementById('assistant-results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Curated recommendations generated', 'success');
  }
  window.handleAssistantSubmit = handleAssistantSubmit;

  // Toggle custom mood input
  document.querySelectorAll('input[name="mood"]').forEach(r => {
    r.addEventListener('change', () => {
      const customWrap = document.getElementById('custom-mood-wrap');
      if (customWrap) {
        customWrap.classList.toggle('hidden', r.value !== 'Custom');
      }
    });
  });

  function runStylingRecommendationEngine(params) {
    const { mood, weather, occasion, profession, dresscode, day, aesthetics } = params;

    // Filter available wardrobe pieces by criteria suitability
    const tops = state.wardrobe.filter(i => i.category === 'Tops');
    const bottoms = state.wardrobe.filter(i => i.category === 'Bottoms');
    const onepieces = state.wardrobe.filter(i => i.category === 'One-piece garments');
    const outerwears = state.wardrobe.filter(i => i.category === 'Outerwear');
    const footwear = state.wardrobe.filter(i => i.category === 'Footwear');
    const accessories = state.wardrobe.filter(i => i.category === 'Accessories');

    const closetRecs = [];

    // Helper: Score an item based on styling criteria
    function scoreItem(item) {
      let score = 0;
      if (aesthetics.includes(item.aesthetic)) score += 4;
      if ((item.occasions || []).includes(occasion)) score += 3;
      if (item.weather === weather || item.weather === 'All-weather') score += 2;
      if (item.isFavorite) score += 1;
      return score;
    }

    // A. Strategy 1: Top + Bottom combination
    tops.forEach(top => {
      bottoms.forEach(bottom => {
        let comboScore = scoreItem(top) + scoreItem(bottom);

        // Colour coordination bonus
        if (isColorHarmonious(top.color, [bottom.color])) comboScore += 3;

        // Formality check for dresscode
        if (dresscode.includes('formal') && (top.subcategory === 'T-shirts' || bottom.subcategory === 'Shorts')) {
          comboScore -= 6;
        }

        // Outerwear needed if cool, cold, rainy, or windy
        let pickedOuter = null;
        if (['Cool', 'Cold', 'Rainy', 'Windy'].includes(weather) && outerwears.length > 0) {
          const sortedOuter = outerwears.slice().sort((a, b) => scoreItem(b) - scoreItem(a));
          pickedOuter = sortedOuter[0];
          comboScore += scoreItem(pickedOuter);
        }

        // Pick best footwear
        let pickedShoes = null;
        if (footwear.length > 0) {
          const sortedShoes = footwear.slice().sort((a, b) => scoreItem(b) - scoreItem(a));
          pickedShoes = sortedShoes[0];
          comboScore += scoreItem(pickedShoes);
        }

        // Pick best accessory
        let pickedAcc = null;
        if (accessories.length > 0) {
          const sortedAcc = accessories.slice().sort((a, b) => scoreItem(b) - scoreItem(a));
          pickedAcc = sortedAcc[0];
        }

        const itemIds = [top.id, bottom.id];
        if (pickedOuter) itemIds.push(pickedOuter.id);
        if (pickedShoes) itemIds.push(pickedShoes.id);
        if (pickedAcc) itemIds.push(pickedAcc.id);

        closetRecs.push({
          id: `rec_${Date.now()}_${closetRecs.length}`,
          name: `${aesthetics[0] || 'Studio'} ${day} Ensemble`,
          itemIds: itemIds,
          aesthetic: top.aesthetic || aesthetics[0],
          mood: mood,
          occasion: occasion,
          weather: weather,
          why: `The ${top.name} pairs effortlessly with the ${bottom.name}. ${isColorHarmonious(top.color, [bottom.color]) ? 'The tonal color harmony reflects a cohesive, intentional palette.' : 'The structured lines anchor the look cleanly.'} Ideal for ${dresscode} standards.`,
          score: comboScore
        });
      });
    });

    // B. Strategy 2: One-Piece Garment
    onepieces.forEach(piece => {
      let comboScore = scoreItem(piece) * 2;
      let pickedOuter = null;
      if (['Cool', 'Cold', 'Rainy', 'Windy'].includes(weather) && outerwears.length > 0) {
        pickedOuter = outerwears[0];
        comboScore += scoreItem(pickedOuter);
      }
      let pickedShoes = footwear[0] || null;
      if (pickedShoes) comboScore += scoreItem(pickedShoes);
      let pickedAcc = accessories[0] || null;

      const itemIds = [piece.id];
      if (pickedOuter) itemIds.push(pickedOuter.id);
      if (pickedShoes) itemIds.push(pickedShoes.id);
      if (pickedAcc) itemIds.push(pickedAcc.id);

      closetRecs.push({
        id: `rec_${Date.now()}_${closetRecs.length}`,
        name: `Monolithic ${piece.name.split(' ')[0]} Statement`,
        itemIds: itemIds,
        aesthetic: piece.aesthetic || aesthetics[0],
        mood: mood,
        occasion: occasion,
        weather: weather,
        why: `A fluid one-piece silhouette with strong editorial presence. Perfectly suited for ${occasion} while projecting ${mood}.`,
        score: comboScore
      });
    });

    // Sort closet recommendations by score
    closetRecs.sort((a, b) => b.score - a.score);
    const topClosetRecs = closetRecs.slice(0, 3);

    // C. Discover New Looks: Filter curated inspiration matching criteria
    let discoverRecs = DISCOVER_INSPIRATION.filter(item => {
      return aesthetics.includes(item.aesthetic) || (item.occasions || []).includes(occasion);
    });
    if (discoverRecs.length === 0) {
      discoverRecs = DISCOVER_INSPIRATION.slice(0, 3);
    }

    return { closetRecs: topClosetRecs, discoverRecs };
  }

  function renderAssistantResults() {
    const closetList = document.getElementById('closet-recommendations-list');
    const discoverList = document.getElementById('discover-recommendations-list');
    const closetBadge = document.getElementById('closet-recs-count');
    const discoverBadge = document.getElementById('discover-recs-count');

    const closetRecs = state.assistantRecommendations.closetRecs;
    const discoverRecs = state.assistantRecommendations.discoverRecs;

    if (closetBadge) closetBadge.textContent = closetRecs.length;
    if (discoverBadge) discoverBadge.textContent = discoverRecs.length;

    // Render Closet Recs
    if (closetList) {
      if (closetRecs.length === 0) {
        closetList.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1;">
            <h4 class="empty-title">More Wardrobe Items Needed</h4>
            <p class="empty-desc">You don't have enough suitable pieces in your closet to build a full look for these exact criteria. Check the Discover tab for inspiration or add items to your closet.</p>
            <button class="btn btn-primary" onclick="openAddItemModal()">+ Add Clothing Items</button>
          </div>
        `;
      } else {
        closetList.innerHTML = closetRecs.map(rec => {
          const pieces = rec.itemIds.map(id => state.wardrobe.find(i => i.id === id)).filter(Boolean);
          const thumbsHtml = pieces.map(p => `
            <img src="${escapeHtml(p.image)}" class="rec-garment-thumb" alt="${escapeHtml(p.name)}" title="${escapeHtml(p.name)}" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
          `).join('');

          const breakdownHtml = pieces.map(p => `
            <li><strong>${escapeHtml(p.category)}:</strong> ${escapeHtml(p.name)} (${escapeHtml(p.color)})</li>
          `).join('');

          return `
            <div class="rec-outfit-card">
              <div class="rec-visual-header">
                <span class="rec-source-badge">STYLE MY CLOSET</span>
                ${thumbsHtml}
              </div>
              <div class="rec-body">
                <h4 class="rec-title">${escapeHtml(rec.name)}</h4>
                <div class="rec-tags-row">
                  <span class="rec-tag">${escapeHtml(rec.aesthetic)}</span>
                  <span class="rec-tag">${escapeHtml(rec.mood)}</span>
                  <span class="rec-tag">${escapeHtml(rec.weather)}</span>
                  <span class="rec-tag">${escapeHtml(rec.occasion)}</span>
                </div>
                <div class="rec-breakdown">
                  <div class="rec-breakdown-title">Garment Breakdown</div>
                  <ul class="rec-breakdown-list">
                    ${breakdownHtml}
                  </ul>
                </div>
                <p class="rec-why">“${escapeHtml(rec.why)}”</p>
                <div class="rec-actions">
                  <button class="btn btn-primary btn-sm" onclick="saveRecommendedOutfit('${escapeHtml(JSON.stringify(rec).replace(/'/g, '&apos;'))}')">Save Look</button>
                  <button class="btn btn-secondary btn-sm" onclick="loadRecToStyleLab('${escapeHtml(JSON.stringify(rec.itemIds).replace(/'/g, '&apos;'))}')">Style Lab</button>
                  <button class="btn btn-outline btn-sm" onclick="quickScheduleRec('${escapeHtml(JSON.stringify(rec).replace(/'/g, '&apos;'))}')">Plan</button>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Render Discover Recs
    if (discoverList) {
      discoverList.innerHTML = discoverRecs.map(item => `
        <div class="rec-outfit-card">
          <div class="rec-visual-header" style="padding:0; min-height:220px; display:block;">
            <span class="rec-source-badge" style="z-index:2;">DISCOVER NEW LOOKS</span>
            <img src="${escapeHtml(item.image)}" style="width:100%; height:220px; object-fit:cover;" alt="${escapeHtml(item.title)}">
          </div>
          <div class="rec-body">
            <h4 class="rec-title">${escapeHtml(item.title)}</h4>
            <div class="rec-tags-row">
              <span class="rec-tag">${escapeHtml(item.aesthetic)}</span>
              <span class="rec-tag">${escapeHtml(item.weather || 'Warm')}</span>
            </div>
            <div class="rec-breakdown">
              <div class="rec-breakdown-title">Key Elements</div>
              <p style="font-size:0.825rem; color:var(--text-muted);">${escapeHtml(item.breakdown)}</p>
            </div>
            <div class="rec-actions">
              <button class="btn btn-primary btn-sm" onclick="recreateInspirationLook('${item.id}')">Recreate Look</button>
              <button class="btn btn-secondary btn-sm" onclick="saveInspirationToLookbook('${item.id}')">Save to Lookbook</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  function switchRecTab(tab) {
    const btnCloset = document.getElementById('tab-btn-closet-recs');
    const btnDiscover = document.getElementById('tab-btn-discover-recs');
    const panelCloset = document.getElementById('tab-content-closet-recs');
    const panelDiscover = document.getElementById('tab-content-discover-recs');

    if (tab === 'closet') {
      if (btnCloset) btnCloset.classList.add('active');
      if (btnDiscover) btnDiscover.classList.remove('active');
      if (panelCloset) panelCloset.classList.add('active');
      if (panelDiscover) panelDiscover.classList.remove('active');
    } else {
      if (btnCloset) btnCloset.classList.remove('active');
      if (btnDiscover) btnDiscover.classList.add('active');
      if (panelCloset) panelCloset.classList.remove('active');
      if (panelDiscover) panelDiscover.classList.add('active');
    }
  }
  window.switchRecTab = switchRecTab;

  function saveRecommendedOutfit(jsonStr) {
    try {
      const rec = JSON.parse(jsonStr.replace(/&apos;/g, "'"));
      const newOutfit = {
        id: `outfit_${Date.now()}`,
        name: rec.name,
        itemIds: rec.itemIds,
        aesthetic: rec.aesthetic,
        mood: rec.mood,
        occasion: rec.occasion,
        weather: rec.weather,
        collection: 'All Looks',
        notes: rec.why,
        dateCreated: formatDateISO(new Date())
      };
      state.outfits.push(newOutfit);
      saveOutfitsToStorage();
      renderDashboardMetrics();
      renderLookbook();
      showToast(`Saved "${newOutfit.name}" to Lookbook`, 'success');
    } catch (e) {
      console.error(e);
    }
  }
  window.saveRecommendedOutfit = saveRecommendedOutfit;

  function loadRecToStyleLab(itemIdsJson) {
    try {
      const ids = JSON.parse(itemIdsJson.replace(/&apos;/g, "'"));
      for (let k in state.styleLabBoard) state.styleLabBoard[k] = null;
      ids.forEach(id => {
        const item = state.wardrobe.find(i => i.id === id);
        if (item) assignItemToBoardSlot(item);
      });
      navigateTo('stylelab');
    } catch (e) {
      console.error(e);
    }
  }
  window.loadRecToStyleLab = loadRecToStyleLab;

  function quickScheduleRec(jsonStr) {
    saveRecommendedOutfit(jsonStr);
    navigateTo('planner');
    showToast('Outfit saved! Select a day to schedule it', 'info');
  }
  window.quickScheduleRec = quickScheduleRec;

  /* ==========================================================================
     12. DISCOVER (FASHION INSPIRATION)
     ========================================================================== */
  function setupDiscoverListeners() {
    const filtersBar = document.getElementById('discover-aesthetic-filters');
    if (!filtersBar) return;

    filtersBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      filtersBar.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.discoverActiveFilter = btn.getAttribute('data-discover-filter');
      renderDiscoverGallery();
    });
  }

  function renderDiscoverGallery() {
    const gallery = document.getElementById('discover-gallery');
    if (!gallery) return;

    let items = DISCOVER_INSPIRATION;
    if (state.discoverActiveFilter !== 'all') {
      items = items.filter(i => i.aesthetic.toLowerCase().includes(state.discoverActiveFilter.toLowerCase()));
    }

    gallery.innerHTML = items.map(item => renderInspirationCardHtml(item)).join('');
  }

  function renderInspirationCardHtml(item) {
    return `
      <div class="inspiration-card">
        <div class="inspiration-img-wrap">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
          <span class="inspiration-aesthetic-badge">${escapeHtml(item.aesthetic)}</span>
        </div>
        <div class="inspiration-body">
          <h4 class="inspiration-title">${escapeHtml(item.title)}</h4>
          <p class="inspiration-breakdown">${escapeHtml(item.breakdown)}</p>
          <div class="inspiration-chips-row">
            ${(item.occasions || []).map(o => `<span class="rec-tag">${escapeHtml(o)}</span>`).join('')}
            <span class="rec-tag">${escapeHtml(item.weather || 'Warm')}</span>
          </div>
          <div class="inspiration-actions">
            <button class="btn btn-primary btn-sm" onclick="recreateInspirationLook('${item.id}')">Recreate in Studio</button>
            <button class="btn btn-outline btn-sm" onclick="saveInspirationToLookbook('${item.id}')">Save to Lookbook</button>
          </div>
        </div>
      </div>
    `;
  }

  function recreateInspirationLook(inspirationId) {
    const insp = DISCOVER_INSPIRATION.find(i => i.id === inspirationId);
    if (!insp) return;

    // Open style lab and attempt to place matching items from closet
    for (let k in state.styleLabBoard) state.styleLabBoard[k] = null;

    const matchingItems = state.wardrobe.filter(w => w.aesthetic === insp.aesthetic);
    if (matchingItems.length > 0) {
      matchingItems.slice(0, 3).forEach(item => assignItemToBoardSlot(item));
      showToast(`Pre-loaded pieces matching "${insp.title}"`, 'info');
    } else if (state.wardrobe.length > 0) {
      assignItemToBoardSlot(state.wardrobe[0]);
      showToast(`Loaded studio to recreate "${insp.title}"`, 'info');
    }
    navigateTo('stylelab');
  }
  window.recreateInspirationLook = recreateInspirationLook;

  function saveInspirationToLookbook(inspirationId) {
    const insp = DISCOVER_INSPIRATION.find(i => i.id === inspirationId);
    if (!insp) return;

    // Check if "Outfits to Try" collection exists, or add to it
    if (!state.collections.includes('Outfits to Try')) {
      state.collections.push('Outfits to Try');
      saveCollectionsToStorage();
    }

    // Save as a Lookbook item
    const newOutfit = {
      id: `insp_${Date.now()}`,
      name: insp.title,
      itemIds: state.wardrobe.slice(0, 3).map(i => i.id),
      aesthetic: insp.aesthetic,
      mood: 'Effortlessly chic',
      occasion: insp.occasions ? insp.occasions[0] : 'Casual outing',
      weather: insp.weather || 'Warm',
      collection: 'Outfits to Try',
      notes: `Inspiration: ${insp.breakdown}`,
      dateCreated: formatDateISO(new Date())
    };

    state.outfits.push(newOutfit);
    saveOutfitsToStorage();
    renderDashboardMetrics();
    renderLookbook();
    showToast(`Saved "${insp.title}" to Lookbook (Outfits to Try)`, 'success');
  }
  window.saveInspirationToLookbook = saveInspirationToLookbook;

  /* ==========================================================================
     13. WEEKLY PLANNER
     ========================================================================== */
  function renderWeeklyPlanner() {
    const container = document.getElementById('weekly-planner-days');
    const title = document.getElementById('planner-week-title');
    const badge = document.getElementById('planner-status-badge');
    if (!container) return;

    const start = state.plannerCurrentWeekStart;
    const end = addDays(start, 6);
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const todayStr = formatDateISO(new Date());

    if (title) {
      title.textContent = `Week of ${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }

    let plannedCount = 0;
    let daysHtml = '';

    for (let i = 0; i < 7; i++) {
      const d = addDays(start, i);
      const iso = formatDateISO(d);
      const plan = state.planner[iso];
      const isToday = iso === todayStr;

      let outfit = null;
      if (plan && plan.outfitId) {
        outfit = state.outfits.find(o => o.id === plan.outfitId);
        if (outfit) plannedCount++;
      }

      daysHtml += `
        <div class="planner-day-card ${isToday ? 'is-today' : ''}">
          <div class="planner-day-header">
            <div>
              <h4 class="planner-day-title">${dayNames[i]}</h4>
              <span class="planner-day-date">${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            ${isToday ? `<span class="badge-dot" style="width:8px; height:8px;" title="Today"></span>` : ''}
          </div>

          <div class="planner-plan-container">
            ${outfit ? `
              <div class="planned-outfit-box">
                <div class="planned-visual-row">
                  ${(outfit.itemIds || []).map(id => {
                    const item = state.wardrobe.find(w => w.id === id);
                    return item ? `<img src="${escapeHtml(item.image)}" class="planned-thumb" alt="${escapeHtml(item.name)}" title="${escapeHtml(item.name)}">` : '';
                  }).join('')}
                </div>
                <div class="planned-details">
                  <span class="planned-outfit-name">${escapeHtml(outfit.name)}</span>
                  ${plan.eventName ? `<span class="planned-event-tag">📌 ${escapeHtml(plan.eventName)}</span>` : ''}
                  ${plan.location ? `<span class="planned-location-notes">📍 ${escapeHtml(plan.location)}</span>` : ''}
                  ${plan.notes ? `<p class="planned-location-notes">“${escapeHtml(plan.notes)}”</p>` : ''}
                </div>
                <div class="planned-actions-row">
                  <button class="btn btn-outline btn-sm" onclick="openAssignPlannerModal('${outfit.id}', '${iso}')">Change</button>
                  <button class="btn btn-outline btn-sm" onclick="duplicatePlannedDay('${iso}')" title="Duplicate to another day">Duplicate</button>
                  <button class="btn btn-outline btn-sm text-danger" onclick="removePlannedDay('${iso}')" title="Remove plan">×</button>
                </div>
              </div>
            ` : `
              <div class="planner-empty-box">
                <span class="planner-empty-text">No outfit scheduled</span>
                <button class="btn btn-primary btn-sm" onclick="openAssignPlannerModal(null, '${iso}')">+ Plan Look</button>
                <button class="btn btn-link" style="font-size:0.75rem;" onclick="styleForSpecificDay('${dayNames[i]}', '${iso}')">Style with Assistant</button>
              </div>
            `}
          </div>
        </div>
      `;
    }

    container.innerHTML = daysHtml;
    if (badge) badge.textContent = `${plannedCount} of 7 Days Planned`;
    renderDashboardMetrics();
  }

  function changePlannerWeek(offsetWeeks) {
    state.plannerCurrentWeekStart = addDays(state.plannerCurrentWeekStart, offsetWeeks * 7);
    renderWeeklyPlanner();
  }
  window.changePlannerWeek = changePlannerWeek;

  function jumpToCurrentWeek() {
    state.plannerCurrentWeekStart = getStartOfWeek(new Date());
    renderWeeklyPlanner();
  }
  window.jumpToCurrentWeek = jumpToCurrentWeek;

  function openAssignPlannerModal(preselectedOutfitId = null, targetDate = null) {
    const modal = document.getElementById('modal-assign-planner');
    const select = document.getElementById('assign-outfit-select');
    const dateInput = document.getElementById('assign-target-date');
    const eventName = document.getElementById('assign-event-name');
    const location = document.getElementById('assign-location');
    const notes = document.getElementById('assign-notes');

    dateInput.value = targetDate || formatDateISO(new Date());

    if (state.outfits.length === 0) {
      showToast('No saved outfits available. Create an outfit first.', 'error');
      return;
    }

    select.innerHTML = state.outfits.map(o => `
      <option value="${o.id}" ${preselectedOutfitId === o.id ? 'selected' : ''}>${escapeHtml(o.name)} (${escapeHtml(o.aesthetic)})</option>
    `).join('');

    // Pre-fill existing data if day is planned
    const existing = state.planner[dateInput.value];
    if (existing) {
      eventName.value = existing.eventName || '';
      location.value = existing.location || '';
      notes.value = existing.notes || '';
      if (existing.outfitId) select.value = existing.outfitId;
    } else {
      eventName.value = '';
      location.value = '';
      notes.value = '';
    }

    openModal('modal-assign-planner');
  }
  window.openAssignPlannerModal = openAssignPlannerModal;

  function handleAssignPlannerSubmit(e) {
    e.preventDefault();
    const date = document.getElementById('assign-target-date').value;
    const outfitId = document.getElementById('assign-outfit-select').value;
    const eventName = document.getElementById('assign-event-name').value.trim();
    const occasion = document.getElementById('assign-occasion').value;
    const location = document.getElementById('assign-location').value.trim();
    const notes = document.getElementById('assign-notes').value.trim();

    state.planner[date] = {
      outfitId,
      eventName,
      occasion,
      location,
      notes
    };

    savePlannerToStorage();
    closeModal('modal-assign-planner');
    renderWeeklyPlanner();
    renderHomeTodaySpotlight();
    renderHomeWeekGlance();
    showToast('Look scheduled successfully in planner', 'success');
  }
  window.handleAssignPlannerSubmit = handleAssignPlannerSubmit;

  function removePlannedDay(dateStr) {
    delete state.planner[dateStr];
    savePlannerToStorage();
    renderWeeklyPlanner();
    renderHomeTodaySpotlight();
    renderHomeWeekGlance();
    showToast('Removed planned outfit for this day', 'info');
  }
  window.removePlannedDay = removePlannedDay;

  function duplicatePlannedDay(dateStr) {
    const existing = state.planner[dateStr];
    if (!existing) return;

    // Pick next day
    const nextDay = formatDateISO(addDays(new Date(dateStr), 1));
    state.planner[nextDay] = Object.assign({}, existing);
    savePlannerToStorage();
    renderWeeklyPlanner();
    showToast(`Duplicated outfit to ${nextDay}`, 'success');
  }
  window.duplicatePlannedDay = duplicatePlannedDay;

  function styleForSpecificDay(dayName, dateStr) {
    navigateTo('assistant');
    const daySelect = document.getElementById('criteria-day');
    const dateField = document.getElementById('criteria-target-date');
    if (daySelect) daySelect.value = dayName;
    if (dateField) dateField.value = dateStr;
  }
  window.styleForSpecificDay = styleForSpecificDay;

  /* ==========================================================================
     14. MY LOOKBOOK
     ========================================================================== */
  function setupLookbookListeners() {
    const searchInput = document.getElementById('lookbook-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.lookbookSearch = e.target.value.trim().toLowerCase();
        renderLookbook();
      });
    }

    const sortSelect = document.getElementById('lookbook-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.lookbookSort = e.target.value;
        renderLookbook();
      });
    }
  }

  function renderLookbook() {
    renderLookbookCollectionsBar();
    renderLookbookOutfitsGrid();
  }

  function renderLookbookCollectionsBar() {
    const tabsBar = document.getElementById('lookbook-collection-tabs');
    if (!tabsBar) return;

    tabsBar.innerHTML = state.collections.map(col => `
      <button class="pill-btn ${state.lookbookActiveCollection === col ? 'active' : ''}" onclick="selectLookbookCollection('${escapeHtml(col)}')">
        ${escapeHtml(col)}
      </button>
    `).join('');
  }

  function selectLookbookCollection(colName) {
    state.lookbookActiveCollection = colName;
    renderLookbook();
  }
  window.selectLookbookCollection = selectLookbookCollection;

  function renderLookbookOutfitsGrid() {
    const grid = document.getElementById('lookbook-outfits-grid');
    const emptyState = document.getElementById('lookbook-empty-state');
    if (!grid) return;

    let outfits = state.outfits.slice();

    // Collection filter
    if (state.lookbookActiveCollection !== 'All Looks') {
      if (state.lookbookActiveCollection === 'My Favourite Looks') {
        outfits = outfits.filter(o => o.isFavorite);
      } else {
        outfits = outfits.filter(o => o.collection === state.lookbookActiveCollection);
      }
    }

    // Search filter
    if (state.lookbookSearch) {
      const q = state.lookbookSearch;
      outfits = outfits.filter(o => {
        return `${o.name} ${o.aesthetic} ${o.mood || ''} ${o.occasion || ''} ${o.notes || ''}`.toLowerCase().includes(q);
      });
    }

    // Sort
    if (state.lookbookSort === 'oldest') {
      outfits.sort((a, b) => (a.dateCreated || '').localeCompare(b.dateCreated || ''));
    } else if (state.lookbookSort === 'alpha') {
      outfits.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      outfits.reverse();
    }

    if (outfits.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    } else {
      if (emptyState) emptyState.classList.add('hidden');
    }

    grid.innerHTML = outfits.map(outfit => renderOutfitCardHtml(outfit)).join('');
  }

  function renderOutfitCardHtml(outfit) {
    const pieces = (outfit.itemIds || []).map(id => state.wardrobe.find(i => i.id === id)).filter(Boolean);
    const thumbsHtml = pieces.map(p => `
      <img src="${escapeHtml(p.image)}" class="outfit-collage-thumb" alt="${escapeHtml(p.name)}" title="${escapeHtml(p.name)}" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
    `).join('');

    return `
      <div class="outfit-card">
        <div class="outfit-collage-header">
          <span class="outfit-aesthetic-pill">${escapeHtml(outfit.aesthetic || 'Editorial')}</span>
          ${thumbsHtml}
        </div>
        <div class="outfit-card-body">
          <h4 class="outfit-card-name">${escapeHtml(outfit.name)}</h4>
          <div class="outfit-chips-row">
            ${outfit.mood ? `<span class="rec-tag">${escapeHtml(outfit.mood)}</span>` : ''}
            ${outfit.occasion ? `<span class="rec-tag">${escapeHtml(outfit.occasion)}</span>` : ''}
            ${outfit.weather ? `<span class="rec-tag">${escapeHtml(outfit.weather)}</span>` : ''}
          </div>
          <p class="outfit-notes-text">${escapeHtml(outfit.notes || 'No description added.')}</p>
          <div class="outfit-card-actions">
            <button class="btn btn-secondary btn-sm" onclick="loadOutfitToStyleLab('${outfit.id}')">Edit in Studio</button>
            <button class="btn btn-outline btn-sm" onclick="exportOutfitCardAsPNG('${outfit.id}')" title="Export as PNG">Export</button>
            <button class="btn btn-outline btn-sm" onclick="shareOutfit('${outfit.id}')" title="Share Outfit">Share</button>
            <button class="btn btn-outline btn-sm text-danger" onclick="deleteOutfit('${outfit.id}')" title="Delete">×</button>
          </div>
        </div>
      </div>
    `;
  }

  function openCreateCollectionModal() {
    const form = document.getElementById('form-collection');
    if (form) form.reset();
    openModal('modal-collection');
  }
  window.openCreateCollectionModal = openCreateCollectionModal;

  function handleCreateCollectionSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('new-collection-name');
    const name = input.value.trim();
    if (!name) return;

    if (!state.collections.includes(name)) {
      state.collections.push(name);
      saveCollectionsToStorage();
      renderLookbook();
      showToast(`Created collection "${name}"`, 'success');
    }
    closeModal('modal-collection');
  }
  window.handleCreateCollectionSubmit = handleCreateCollectionSubmit;

  function deleteOutfit(outfitId) {
    const outfit = state.outfits.find(o => o.id === outfitId);
    if (!outfit) return;

    showConfirmDialog(
      'Delete Outfit',
      `Are you sure you want to delete "${outfit.name}" from your Lookbook?`,
      () => {
        state.outfits = state.outfits.filter(o => o.id !== outfitId);
        saveOutfitsToStorage();

        // Clean from planner
        for (let d in state.planner) {
          if (state.planner[d].outfitId === outfitId) {
            delete state.planner[d];
          }
        }
        savePlannerToStorage();

        renderLookbook();
        renderDashboardMetrics();
        renderWeeklyPlanner();
        showToast(`Deleted outfit "${outfit.name}"`, 'info');
      }
    );
  }
  window.deleteOutfit = deleteOutfit;

  // Web Share API with Clipboard Fallback
  function shareOutfit(outfitId) {
    const outfit = state.outfits.find(o => o.id === outfitId);
    if (!outfit) return;

    const pieces = (outfit.itemIds || []).map(id => state.wardrobe.find(i => i.id === id)).filter(Boolean);
    const pieceNames = pieces.map(p => `• ${p.name}`).join('\n');
    const shareText = `FIT CHECK — ${outfit.name}\nAesthetic: ${outfit.aesthetic}\nMood: ${outfit.mood || 'Editorial'}\n\nGarments:\n${pieceNames}\n\nYour style. Your rules.`;

    if (navigator.share) {
      navigator.share({
        title: `FIT CHECK: ${outfit.name}`,
        text: shareText
      }).catch(err => {
        // Fallback to clipboard
        copyTextToClipboard(shareText);
      });
    } else {
      copyTextToClipboard(shareText);
    }
  }
  window.shareOutfit = shareOutfit;

  function copyTextToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Outfit breakdown copied to clipboard!', 'success');
      }).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  }

  function fallbackCopyText(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Outfit breakdown copied to clipboard!', 'success');
  }

  function exportOutfitCardAsPNG(outfitId) {
    const outfit = state.outfits.find(o => o.id === outfitId);
    if (!outfit) return;

    const pieces = (outfit.itemIds || []).map(id => state.wardrobe.find(i => i.id === id)).filter(Boolean);
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');

    // Warm ivory bg
    ctx.fillStyle = '#F7F4EF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#D8D1C8';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    ctx.fillStyle = '#702B40';
    ctx.font = '700 16px "DM Sans", sans-serif';
    ctx.fillText('FIT CHECK • SIGNATURE LOOKBOOK', 60, 80);

    ctx.fillStyle = '#211F1E';
    ctx.font = '700 36px "Playfair Display", serif';
    ctx.fillText(outfit.name, 60, 130);

    ctx.fillStyle = '#6E6861';
    ctx.font = '500 16px "DM Sans", sans-serif';
    ctx.fillText(`${outfit.aesthetic} • Mood: ${outfit.mood || 'Chic'} • Occasion: ${outfit.occasion || 'General'}`, 60, 165);

    // Grid of garments
    const total = pieces.length;
    const cols = total <= 3 ? total : 2;
    const rows = Math.ceil(total / cols);
    const startX = 60;
    const startY = 210;
    const gridW = canvas.width - 120;
    const gridH = 850;
    const cellW = (gridW - (cols - 1) * 20) / cols;
    const cellH = (gridH - (rows - 1) * 20) / rows;

    let loaded = 0;
    pieces.forEach((p, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = startX + col * (cellW + 20);
      const y = startY + row * (cellH + 20);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x, y, cellW, cellH);

        ctx.save();
        ctx.beginPath();
        ctx.rect(x + 10, y + 10, cellW - 20, cellH - 60);
        ctx.clip();
        ctx.drawImage(img, x + 10, y + 10, cellW - 20, cellH - 60);
        ctx.restore();

        ctx.fillStyle = '#211F1E';
        ctx.font = '600 14px "DM Sans", sans-serif';
        ctx.fillText(p.name.substring(0, 24), x + 15, y + cellH - 30);

        ctx.fillStyle = '#702B40';
        ctx.font = '500 12px "DM Sans", sans-serif';
        ctx.fillText(`${p.category} (${p.color})`, x + 15, y + cellH - 12);

        loaded++;
        if (loaded === total) finish();
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) finish();
      };
      img.src = p.image;
    });

    function finish() {
      ctx.fillStyle = '#8C847A';
      ctx.font = '600 14px "DM Sans", sans-serif';
      ctx.fillText('FIT CHECK — YOUR STYLE. YOUR RULES.', 60, canvas.height - 50);

      const a = document.createElement('a');
      a.download = `fit-check-${outfit.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
      a.href = canvas.toDataURL('image/png');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Exported outfit card as PNG', 'success');
    }
  }
  window.exportOutfitCardAsPNG = exportOutfitCardAsPNG;

  /* ==========================================================================
     15. THE FIT CHALLENGE
     ========================================================================== */
  function renderChallengesView() {
    renderFeaturedChallenge();
    renderChallengesCatalog();
    renderChallengeSubmissions();
  }

  function renderFeaturedChallenge() {
    const container = document.getElementById('featured-challenge-display');
    if (!container || !state.activeChallenge) return;

    container.innerHTML = `
      <span class="challenge-badge">FEATURED ROTATING PROMPT</span>
      <h3 style="font-family:var(--font-serif); font-size:2.2rem; font-weight:700; color:var(--text-charcoal); margin: 0.6rem 0;">${escapeHtml(state.activeChallenge.title)}</h3>
      <p style="font-size:1.1rem; color:var(--text-charcoal); font-weight:500; margin-bottom:0.8rem;">${escapeHtml(state.activeChallenge.subtitle)}</p>
      <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.6; max-width:750px; margin-bottom:1.8rem;">${escapeHtml(state.activeChallenge.rule)}</p>
      
      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <button class="btn btn-primary btn-lg" onclick="acceptFitChallenge('${state.activeChallenge.id}')">
          Accept & Build in Style Lab →
        </button>
      </div>
    `;
  }

  function renderChallengesCatalog() {
    const grid = document.getElementById('challenges-catalog-grid');
    if (!grid) return;

    grid.innerHTML = FIT_CHALLENGES.map(ch => `
      <div class="challenge-catalog-card">
        <div>
          <span class="spotlight-tag" style="margin-bottom:0.5rem; display:inline-block;">${escapeHtml(ch.suggestedAesthetic)}</span>
          <h4 class="challenge-cat-title">${escapeHtml(ch.title)}</h4>
          <p class="challenge-cat-rule">${escapeHtml(ch.rule)}</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="acceptFitChallenge('${ch.id}')">
          Take This Challenge →
        </button>
      </div>
    `).join('');
  }

  function renderChallengeSubmissions() {
    const grid = document.getElementById('challenge-submissions-grid');
    if (!grid) return;

    if (state.challenges.length === 0) {
      grid.innerHTML = `<p style="grid-column:1/-1; color:var(--text-muted); font-style:italic;">No challenge fits saved yet. Accept a challenge above and save your outfit in Style Lab.</p>`;
      return;
    }

    const outfitCards = state.challenges.map(sub => {
      const outfit = state.outfits.find(o => o.id === sub.outfitId);
      if (!outfit) return '';
      return `
        <div style="display:flex; flex-direction:column;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--accent-burgundy); text-transform:uppercase; margin-bottom:0.4rem;">
            Challenge: ${escapeHtml(sub.challengeTitle)}
          </span>
          ${renderOutfitCardHtml(outfit)}
        </div>
      `;
    }).filter(Boolean);

    grid.innerHTML = outfitCards.join('');
  }

  function acceptFitChallenge(challengeId) {
    const ch = FIT_CHALLENGES.find(c => c.id === challengeId);
    if (!ch) return;
    state.activeChallenge = ch;
    navigateTo('stylelab', { challengePrompt: `${ch.title}: ${ch.rule}` });
  }
  window.acceptFitChallenge = acceptFitChallenge;

  /* ==========================================================================
     16. PREFERENCES & DATA BACKUP / RESTORE
     ========================================================================== */
  function openPreferencesDrawer() {
    const userField = document.getElementById('pref-username');
    const dresscodeField = document.getElementById('pref-default-dresscode');

    if (userField) userField.value = state.preferences.username;
    if (dresscodeField) dresscodeField.value = state.preferences.defaultDressCode;

    updateStorageMeter();
    openModal('drawer-preferences');
  }
  window.openPreferencesDrawer = openPreferencesDrawer;

  function saveUserPreferences() {
    const userField = document.getElementById('pref-username');
    const dresscodeField = document.getElementById('pref-default-dresscode');

    if (userField && userField.value.trim()) {
      state.preferences.username = userField.value.trim();
    }
    if (dresscodeField) {
      state.preferences.defaultDressCode = dresscodeField.value;
    }

    savePreferencesToStorage();
    setupDateAndGreeting();
    closeModal('drawer-preferences');
    showToast('Preferences updated successfully', 'success');
  }
  window.saveUserPreferences = saveUserPreferences;

  function exportDataBackup() {
    const backupData = {
      app: 'FIT CHECK',
      version: '1.0',
      exportDate: new Date().toISOString(),
      wardrobe: state.wardrobe,
      outfits: state.outfits,
      planner: state.planner,
      collections: state.collections,
      challenges: state.challenges,
      preferences: state.preferences
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fit-check-backup-${formatDateISO(new Date())}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Data backup JSON file exported', 'success');
  }
  window.exportDataBackup = exportDataBackup;

  function handleImportBackup(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const data = JSON.parse(event.target.result);
        if (!data.wardrobe || !data.outfits) {
          throw new Error('Invalid FIT CHECK backup format');
        }

        state.wardrobe = data.wardrobe;
        state.outfits = data.outfits;
        if (data.planner) state.planner = data.planner;
        if (data.collections) state.collections = data.collections;
        if (data.challenges) state.challenges = data.challenges;
        if (data.preferences) state.preferences = data.preferences;

        saveWardrobeToStorage();
        saveOutfitsToStorage();
        savePlannerToStorage();
        saveCollectionsToStorage();
        saveChallengesToStorage();
        savePreferencesToStorage();

        closeModal('drawer-preferences');
        renderHomeDashboard();
        renderCloset();
        renderStyleLabBoard();
        renderWeeklyPlanner();
        renderLookbook();

        showToast('Backup restored successfully!', 'success');
      } catch (err) {
        showToast('Error importing file: invalid backup JSON', 'error');
        console.error(err);
      }
    };
    reader.readAsText(file);
  }
  window.handleImportBackup = handleImportBackup;

  function confirmResetDemoData() {
    showConfirmDialog(
      'Reset to Studio Demo Data',
      'This will reset your wardrobe, outfits, and plans back to the default curated studio configuration. Are you sure?',
      () => {
        state.wardrobe = INITIAL_WARDROBE;
        state.outfits = INITIAL_OUTFITS;
        state.collections = DEFAULT_COLLECTIONS;
        state.challenges = [];
        state.preferences = { username: 'Alex', defaultDressCode: 'Smart casual', tempUnit: 'C' };

        saveWardrobeToStorage();
        saveOutfitsToStorage();
        saveCollectionsToStorage();
        saveChallengesToStorage();
        savePreferencesToStorage();

        closeModal('drawer-preferences');
        renderHomeDashboard();
        renderCloset();
        renderStyleLabBoard();
        renderWeeklyPlanner();
        renderLookbook();
        showToast('Reset to studio demo data completed', 'info');
      }
    );
  }
  window.confirmResetDemoData = confirmResetDemoData;

  /* ==========================================================================
     17. MODAL & CONFIRMATION HELPERS
     ========================================================================== */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }
  window.openModal = openModal;

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }
  window.closeModal = closeModal;

  function setupModalListeners() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show').forEach(m => {
          m.classList.remove('show');
        });
        document.body.style.overflow = '';
      }
    });
  }

  function showConfirmDialog(title, message, onConfirm) {
    const modal = document.getElementById('modal-confirm');
    const titleEl = document.getElementById('confirm-title');
    const msgEl = document.getElementById('confirm-message');
    const okBtn = document.getElementById('confirm-btn-ok');
    const cancelBtn = document.getElementById('confirm-btn-cancel');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;

    const cleanup = () => {
      closeModal('modal-confirm');
      okBtn.onclick = null;
      cancelBtn.onclick = null;
    };

    okBtn.onclick = () => {
      cleanup();
      if (typeof onConfirm === 'function') onConfirm();
    };

    cancelBtn.onclick = () => {
      cleanup();
    };

    openModal('modal-confirm');
  }

  /* ==========================================================================
     18. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  function showToast(message, type = 'info', duration = 3400) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span style="flex:1;">${escapeHtml(message)}</span>
      <button style="background:none; border:none; color:inherit; font-size:1.1rem; cursor:pointer;" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, duration);
  }
  window.showToast = showToast;

  /* ==========================================================================
     19. UTILITY FUNCTIONS
     ========================================================================== */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDateISO(d) {
    const date = new Date(d);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }

  function addDays(d, days) {
    const result = new Date(d);
    result.setDate(result.getDate() + days);
    return result;
  }

  function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function getColorHex(colorName) {
    const map = {
      'Black': '#1A1817',
      'White': '#FFFFFF',
      'Ivory': '#F7F4EF',
      'Beige': '#D2B48C',
      'Brown': '#5C4033',
      'Charcoal': '#2E2B2A',
      'Grey': '#8C847A',
      'Navy': '#1B263B',
      'Blue': '#415A77',
      'Burgundy': '#702B40',
      'Olive': '#556B2F',
      'Forest Green': '#1E3F20',
      'Terracotta': '#C86446',
      'Mustard': '#D4A373',
      'Gold': '#C5A059',
      'Silver': '#C0C0C0',
      'Multicolour': 'linear-gradient(135deg, #702B40, #C5A059)'
    };
    return map[colorName] || '#A99B8B';
  }

  function isColorHarmonious(color1, otherColors) {
    if (!otherColors || otherColors.length === 0) return true;
    const neutrals = ['Black', 'White', 'Ivory', 'Beige', 'Grey', 'Charcoal', 'Navy'];
    if (neutrals.includes(color1)) return true;
    const allNeutrals = otherColors.every(c => neutrals.includes(c));
    if (allNeutrals) return true;
    return otherColors.includes(color1);
  }

  function getMostFrequent(arr) {
    if (!arr || arr.length === 0) return null;
    const counts = {};
    let maxItem = arr[0];
    let maxCount = 1;
    for (let i = 0; i < arr.length; i++) {
      const el = arr[i];
      counts[el] = (counts[el] || 0) + 1;
      if (counts[el] > maxCount) {
        maxCount = counts[el];
        maxItem = el;
      }
    }
    return maxItem;
  }

  // DOM Content Loaded Execution
  document.addEventListener('DOMContentLoaded', initApp);

})();
