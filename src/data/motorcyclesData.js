export const INITIAL_MOTORCYCLES = [
  {
    id: 'moto-1',
    brand: 'Yamaha',
    model: 'YZF-R1',
    year: 2024,
    price: 18500,
    mileage: 3200,
    engine: 998,
    horsepower: 200,
    transmission: '6-Speed Manual with Quickshifter',
    fuelType: 'Petrol',
    type: 'Superbike',
    color: 'Icon Blue',
    condition: 'Used',
    location: 'Los Angeles, CA',
    featured: true,
    status: 'active',
    createdAt: '2025-01-15',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immaculate 2024 Yamaha YZF-R1 with MotoGP-derived CP4 crossplane engine. Fitted with authentic Akrapovič titanium exhaust, Gilles Tooling adjustable rearsets, zero scratches, always garaged in climate-controlled storage. Comes with complete service history, all 3 keys (including red master key), and valid factory warranty until 2026.',
    features: [
      'CP4 998cc Crossplane Inline-4',
      'Brembo Stylema Calipers',
      '6-Axis IMU with Lean Angle Traction Control',
      'Up/Down Quick Shift System (QSS)',
      'Full Color 4.2" TFT Instrumentation',
      'Launch Control & Slide Control System'
    ],
    seller: {
      id: 'seller-1',
      name: 'Alex Rossi',
      phone: '+1 (555) 234-8901',
      email: 'alex.rossi@motomarket.io',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      reviewsCount: 28,
      verified: true,
      memberSince: 'March 2021',
      responseTime: 'Under 15 mins'
    }
  },
  {
    id: 'moto-2',
    brand: 'Ducati',
    model: 'Panigale V4 S',
    year: 2023,
    price: 28900,
    mileage: 2100,
    engine: 1103,
    horsepower: 215,
    transmission: '6-Speed with Ducati Quick Shift EVO 2',
    fuelType: 'Petrol',
    type: 'Superbike',
    color: 'Ducati Red',
    condition: 'Certified Pre-Owned',
    location: 'Miami, FL',
    featured: true,
    status: 'active',
    createdAt: '2025-01-20',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Pinnacle of Italian superbike engineering. 2023 Ducati Panigale V4 S equipped with Öhlins Smart EC 2.0 electronic suspension, Marchesini forged aluminum rims, and full carbon aerodynamic biplane wings. Fresh Desmo service completed at official Ducati dealership.',
    features: [
      'Desmosedici Stradale 1,103cc 90° V4',
      'Öhlins Smart EC 2.0 Electronic Suspension',
      'Marchesini Forged Aluminum Wheels',
      'Ducati Traction Control DTC EVO 3',
      'Cornering ABS EVO & Slide Control',
      'Akrapovič Racing Exhaust Included'
    ],
    seller: {
      id: 'seller-2',
      name: 'Marco Bellini (Ducati Specialist)',
      phone: '+1 (555) 789-3412',
      email: 'marco.bellini@motomarket.io',
      location: 'Miami, FL',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      reviewsCount: 42,
      verified: true,
      memberSince: 'January 2019',
      responseTime: 'Under 5 mins'
    }
  },
  {
    id: 'moto-3',
    brand: 'Kawasaki',
    model: 'Ninja ZX-10R',
    year: 2024,
    price: 17800,
    mileage: 850,
    engine: 998,
    horsepower: 203,
    transmission: '6-Speed with KQS Quickshifter',
    fuelType: 'Petrol',
    type: 'Superbike',
    color: 'Lime Green / Ebony',
    condition: 'New',
    location: 'Austin, TX',
    featured: true,
    status: 'active',
    createdAt: '2025-02-01',
    images: [
      'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Virtually brand new 2024 Kawasaki Ninja ZX-10R WorldSBK replica. Integrated aerodynamic winglets generating 17% more downforce, Showa Balance Free Front Fork (BFF), and cruise control for street commutes. Showroom condition, 0 drops, transferable manufacturer warranty.',
    features: [
      '998cc DOHC 16-Valve Inline-4',
      'Integrated Aerodynamic Winglets',
      'Showa BFF & BFRC Rear Shock',
      'Kawasaki Cornering Management (KCMF)',
      'Full Color TFT with Smartphone Connectivity',
      'Electronic Cruise Control'
    ],
    seller: {
      id: 'seller-3',
      name: 'Apex Superbikes Austin',
      phone: '+1 (555) 456-7890',
      email: 'sales@apexsuperbikes.com',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.8,
      reviewsCount: 65,
      verified: true,
      memberSince: 'June 2020',
      responseTime: 'Within 30 mins'
    }
  },
  {
    id: 'moto-4',
    brand: 'Honda',
    model: 'CBR1000RR-R Fireblade SP',
    year: 2023,
    price: 24500,
    mileage: 4500,
    engine: 1000,
    horsepower: 214,
    transmission: '6-Speed Manual with Quickshifter',
    fuelType: 'Petrol',
    type: 'Superbike',
    color: 'Grand Prix Red HRC',
    condition: 'Used',
    location: 'Chicago, IL',
    featured: true,
    status: 'active',
    createdAt: '2025-01-28',
    images: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Honda RC213V-S MotoGP tech for the road! 2023 CBR1000RR-R SP equipped with Öhlins Smart-EC second generation suspension, Brembo Stylema brakes, and titanium Akrapovič factory silencer. Meticulously maintained with oil changes every 1,500 miles.',
    features: [
      'RC213V-Derived 1000cc Inline-4 Engine',
      'Öhlins Electronic Dynamic Suspension',
      'Brembo Stylema Front Calipers',
      '9-Level Honda Selectable Torque Control',
      'Full Titanium Akrapovič Silencer',
      'Aerodynamic MotoGP Winglets'
    ],
    seller: {
      id: 'seller-4',
      name: 'David Miller',
      phone: '+1 (555) 912-3456',
      email: 'dmiller.cbr@motomarket.io',
      location: 'Chicago, IL',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      reviewsCount: 19,
      verified: true,
      memberSince: 'September 2022',
      responseTime: 'Under 1 hour'
    }
  },
  {
    id: 'moto-5',
    brand: 'Aprilia',
    model: 'RSV4 Factory 1100',
    year: 2024,
    price: 26200,
    mileage: 1800,
    engine: 1099,
    horsepower: 217,
    transmission: '6-Speed with AQS Quickshifter',
    fuelType: 'Petrol',
    type: 'Superbike',
    color: 'Aprilia Black',
    condition: 'Used',
    location: 'San Diego, CA',
    featured: true,
    status: 'active',
    createdAt: '2025-02-05',
    images: [
      'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The definitive track weapon with 217 HP 65° V4 symphony. Features forged aluminum wheels, Öhlins Smart EC 2.0 semi-active suspension system, integrated winglets inside the double fairing, and full APRC electronic package.',
    features: [
      '1,099cc 65° V4 High Output Engine',
      'Öhlins Semi-Active Electronic Suspension',
      'APRC Suite (Traction, Wheelie, Launch Control)',
      'Brembo Stylema Monobloc Calipers',
      'Forged Aluminum Lightweight Wheels',
      'Dual-Fairing Aerodynamic Package'
    ],
    seller: {
      id: 'seller-5',
      name: 'Sofia Hernandez',
      phone: '+1 (555) 678-1234',
      email: 'sofia.rsv4@motomarket.io',
      location: 'San Diego, CA',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      reviewsCount: 31,
      verified: true,
      memberSince: 'April 2021',
      responseTime: 'Under 10 mins'
    }
  },
  {
    id: 'moto-6',
    brand: 'Yamaha',
    model: 'MT-09 SP',
    year: 2024,
    price: 12299,
    mileage: 1200,
    engine: 890,
    horsepower: 119,
    transmission: '6-Speed with 3rd-Gen Quickshifter',
    fuelType: 'Petrol',
    type: 'Naked',
    color: 'Icon Performance',
    condition: 'Used',
    location: 'Seattle, WA',
    featured: false,
    status: 'active',
    createdAt: '2025-02-08',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The Dark Side of Japan in its highest SP spec! High-grade KYB DLC forks and Öhlins fully adjustable rear shock. Includes Brembo radial master cylinder and dedicated R1M-inspired brushed aluminum swingarm.',
    features: [
      '890cc CP3 Liquid-Cooled Triple',
      'Öhlins Fully Adjustable Rear Shock',
      'KYB Gold DLC Front Suspension',
      'Cruise Control & Keyless Smart Key',
      '5" Full-Color TFT Screen with Garmin Nav',
      'Brembo Radial Master Cylinder'
    ],
    seller: {
      id: 'seller-6',
      name: 'Ryan Campbell',
      phone: '+1 (555) 321-7654',
      email: 'ryan.campbell@motomarket.io',
      location: 'Seattle, WA',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      rating: 4.7,
      reviewsCount: 14,
      verified: true,
      memberSince: 'November 2022',
      responseTime: 'Within 2 hours'
    }
  },
  {
    id: 'moto-7',
    brand: 'Kawasaki',
    model: 'Z900',
    year: 2023,
    price: 9400,
    mileage: 6800,
    engine: 948,
    horsepower: 125,
    transmission: '6-Speed Manual',
    fuelType: 'Petrol',
    type: 'Naked',
    color: 'Metallic Spark Black / Green',
    condition: 'Used',
    location: 'Denver, CO',
    featured: false,
    status: 'active',
    createdAt: '2025-01-18',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Aggressive Sugomi streetfighter with intoxicating inline-four intake growl. Upgraded with Yoshimura AT2 slip-on exhaust, R&G tail tidy, and Oxford heated grips. New Dunlop Roadsmart IV tires installed last month.',
    features: [
      '948cc Liquid-Cooled Inline-4',
      'KTRC (Kawasaki Traction Control)',
      'Integrated Riding Modes (Sport, Road, Rain)',
      'TFT Color Display with Bluetooth Rideology',
      'Assist & Slipper Clutch'
    ],
    seller: {
      id: 'seller-7',
      name: 'Marcus Stone',
      phone: '+1 (555) 876-5432',
      email: 'mstone@motomarket.io',
      location: 'Denver, CO',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      rating: 4.8,
      reviewsCount: 22,
      verified: true,
      memberSince: 'July 2021',
      responseTime: 'Under 30 mins'
    }
  },
  {
    id: 'moto-8',
    brand: 'Honda',
    model: 'CRF1100L Africa Twin Adventure Sports',
    year: 2024,
    price: 17999,
    mileage: 4100,
    engine: 1084,
    horsepower: 102,
    transmission: 'DCT Dual-Clutch Automatic / Paddle Shift',
    fuelType: 'Petrol',
    type: 'Adventure',
    color: 'Pearl Glare White Tricolor',
    condition: 'Used',
    location: 'Phoenix, AZ',
    featured: true,
    status: 'active',
    createdAt: '2025-02-10',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ultimate globe-trotting adventure bike. Equipped with Showa EERA electronic suspension, large 24.8L fuel tank, Apple CarPlay / Android Auto touchscreen, full aluminum Honda touring panniers, and Barkbusters handguards.',
    features: [
      '1,084cc Parallel-Twin Engine with 270° Crank',
      'Showa EERA Electronically Equipped Suspension',
      '6-Speed Dual Clutch Transmission (DCT)',
      '6.5-Inch Multi-Information Touchscreen Display',
      'Cornering LED Headlights with DRL',
      'Full 3-Piece Aluminum Luggage System'
    ],
    seller: {
      id: 'seller-8',
      name: 'Desert Moto Adventures',
      phone: '+1 (555) 345-9876',
      email: 'sales@desertmotoaz.com',
      location: 'Phoenix, AZ',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      reviewsCount: 57,
      verified: true,
      memberSince: 'March 2018',
      responseTime: 'Under 15 mins'
    }
  },
  {
    id: 'moto-9',
    brand: 'Ducati',
    model: 'Streetfighter V4',
    year: 2024,
    price: 22800,
    mileage: 1500,
    engine: 1103,
    horsepower: 208,
    transmission: '6-Speed with Quickshifter EVO 2',
    fuelType: 'Petrol',
    type: 'Naked',
    color: 'Dark Stealth',
    condition: 'Used',
    location: 'Dallas, TX',
    featured: true,
    status: 'active',
    createdAt: '2025-02-12',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The Fight Formula: Panigale V4 stripped of fairings, high handlebars, 208 HP, and biplane aerodynamic wings. Sleek Dark Stealth livery, tail tidy, full ceramic coating, and barcode tire scrub-in only.',
    features: [
      'Desmosedici Stradale 1,103cc V4',
      'Biplane Aerodynamic Wings',
      'Brembo Stylema Monobloc Calipers',
      'Ducati Slide Control & Wheelie Control',
      'Riding Modes: Race, Sport, Street'
    ],
    seller: {
      id: 'seller-2',
      name: 'Marco Bellini (Ducati Specialist)',
      phone: '+1 (555) 789-3412',
      email: 'marco.bellini@motomarket.io',
      location: 'Dallas, TX',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      reviewsCount: 42,
      verified: true,
      memberSince: 'January 2019',
      responseTime: 'Under 5 mins'
    }
  },
  {
    id: 'moto-10',
    brand: 'Aprilia',
    model: 'RS 660',
    year: 2023,
    price: 11499,
    mileage: 3800,
    engine: 659,
    horsepower: 100,
    transmission: '6-Speed with Quickshifter',
    fuelType: 'Petrol',
    type: 'Sport',
    color: 'Acid Gold',
    condition: 'Used',
    location: 'Portland, OR',
    featured: false,
    status: 'active',
    createdAt: '2025-01-25',
    images: [
      'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Iconic middleweight twin in standout Acid Gold. Lightweight aluminum chassis (169 kg dry), full LED headlight with bending light functions, comprehensive APRC electronics package. Never tracked, commuter miles only.',
    features: [
      '659cc Forward-Facing Parallel Twin',
      'APRC Electronics Suite with Cruise Control',
      'Cornering ABS & Multiple Engine Maps',
      'Kayaba 41mm Inverted Front Forks',
      'TFT Color Screen with Bluetooth Connectivity'
    ],
    seller: {
      id: 'seller-9',
      name: 'Elena Wood',
      phone: '+1 (555) 765-4321',
      email: 'elena.rs660@motomarket.io',
      location: 'Portland, OR',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      reviewsCount: 11,
      verified: true,
      memberSince: 'August 2022',
      responseTime: 'Under 20 mins'
    }
  },
  {
    id: 'moto-11',
    brand: 'Yamaha',
    model: 'Ténéré 700 World Raid',
    year: 2024,
    price: 13400,
    mileage: 2300,
    engine: 689,
    horsepower: 73,
    transmission: '6-Speed Manual',
    fuelType: 'Petrol',
    type: 'Adventure',
    color: 'Midnight Black',
    condition: 'Certified Pre-Owned',
    location: 'Salt Lake City, UT',
    featured: false,
    status: 'active',
    createdAt: '2025-02-14',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The Dakar rally champion for enthusiasts! 23-litre dual side-mounted fuel tanks giving 500km range. KYB 43mm long-travel forks, Öhlins adjustable steering damper, and 3-mode switchable ABS for off-road dominance.',
    features: [
      '689cc High-Torque CP2 Engine',
      '23-Litre Dual Side-Mounted Fuel Tanks',
      'Öhlins Adjustable Steering Damper',
      'KYB 43mm Kashima Coated Front Forks',
      '5" Vertical Color TFT Connected Display'
    ],
    seller: {
      id: 'seller-1',
      name: 'Alex Rossi',
      phone: '+1 (555) 234-8901',
      email: 'alex.rossi@motomarket.io',
      location: 'Salt Lake City, UT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      reviewsCount: 28,
      verified: true,
      memberSince: 'March 2021',
      responseTime: 'Under 15 mins'
    }
  },
  {
    id: 'moto-12',
    brand: 'Kawasaki',
    model: 'Ninja H2 Carbon',
    year: 2023,
    price: 34999,
    mileage: 1100,
    engine: 998,
    horsepower: 231,
    transmission: '6-Speed Dog-Ring with KQS',
    fuelType: 'Petrol',
    type: 'Superbike',
    color: 'Mirror Coated Matte Spark Black',
    condition: 'Certified Pre-Owned',
    location: 'Las Vegas, NV',
    featured: true,
    status: 'active',
    createdAt: '2025-01-10',
    images: [
      'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Limited edition supercharged hyperbike. Carbon fiber upper cowl, aerospace-engineered planetary centrifugal supercharger, Brembo Stylema calipers, and self-healing clear coat paint. A true collector motorcycle.',
    features: [
      '998cc In-House Supercharged Inline-4',
      'Carbon-Fiber Reinforced Polymer Fairing',
      'Öhlins TTX36 Rear Shock',
      'Brembo Stylema Monobloc Calipers',
      'Highly Durable Self-Healing Paint'
    ],
    seller: {
      id: 'seller-3',
      name: 'Apex Superbikes Austin',
      phone: '+1 (555) 456-7890',
      email: 'sales@apexsuperbikes.com',
      location: 'Las Vegas, NV',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.8,
      reviewsCount: 65,
      verified: true,
      memberSince: 'June 2020',
      responseTime: 'Within 30 mins'
    }
  }
];

export const MOTORCYCLE_TYPES = [
  'All Types',
  'Superbike',
  'Sport',
  'Naked',
  'Cruiser',
  'Touring',
  'Adventure',
  'Scooter'
];

export const MOTORCYCLE_CONDITIONS = [
  'All Conditions',
  'New',
  'Used',
  'Certified Pre-Owned'
];

export const TRANSMISSION_TYPES = [
  'All Transmissions',
  'Manual',
  'Quickshifter',
  'Automatic / DCT'
];

export const FUEL_TYPES = [
  'All Fuel Types',
  'Petrol',
  'Electric',
  'Hybrid'
];
