const ARTISANS = [
  {
    id: 'elena-perez',
    name: 'Elena Pérez',
    specialty: 'Alfarería',
    location: 'Pomaire, Región Metropolitana',
    bio: 'Con más de 40 años moldeando la arcilla, Elena heredó de su padre y abuela el antiguo arte de la alfarería tradicional. Sus piezas narran rutinas campesinas y la vida sencilla, forjadas con la paciencia que solo otorga el oficio y el respeto sagrado por la tierra húmeda. Hoy dirige un pequeño taller familiar que mantiene viva la llama del horno a leña.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'assets/retrato-alfarera-2.webp',
    photo: 'assets/retrato-alfarera-1.webp'
  },
  {
    id: 'marcela-condori',
    name: 'Marcela Condori',
    specialty: 'Textiles',
    location: 'Colchane, Región de Tarapacá',
    bio: 'Tejedora Aymara que preserva el lenguaje textil de sus antepasados andinos. Marcela esquila, hila, tiñe con hierbas bajadas de la precordillera y teje a telar de cintura en un tiempo que desafía el ruido moderno. Sus aguayos y ponchos son auténticos libros de historia tejidos en lana de alpaca.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'assets/proceso-telar-1.webp',
    photo: 'assets/proceso-telar-2.webp'
  },
  {
    id: 'juan-carlos-valdez',
    name: 'Juan Carlos Valdéz',
    specialty: 'Madera',
    location: 'Panguipulli, Región de Los Ríos',
    bio: 'Toda una vida dedicada a darle nueva voz a las maderas caídas en los bosques del sur. Juan Carlos tiene la capacidad única de identificar la vocación de cada tocón y rama, transformando la madera de raulí y mañío en cucharas, bateas y figuras que rescatan la cosmovisión Mapuche-Huilliche.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80'
  }
];

const PRODUCTS = [
  {
    id: 'MM-CLAY-01',
    name: 'Jarro de Greda Tradicional',
    artisanId: 'elena-perez',
    material: 'Arcilla',
    description: 'Jarro genuino moldeado a mano utilizando arcilla de Pomaire, quemado pacientemente al horno de barro. Es una pieza fundamental en el hogar campesino chileno, ideal para servir agua fresca, chicha o vino templado. Su acabado terroso recuerda el aroma húmedo a tierra recién llovida.',
    price: 15000,
    dimensions: '20cm x 15cm',
    image: 'assets/producto-jarron-1.webp'
  },
  {
    id: 'MM-CLAY-02',
    name: 'Cantarito de Greda Tallado',
    artisanId: 'elena-perez',
    material: 'Arcilla',
    description: 'Cántaro de greda con grabados decorativos tradicionales de Pomaire hechos a mano. Perfecto para mantener la temperatura de líquidos o como una pieza ornamental destacada que rescata la simplicidad rústica del campo.',
    price: 12500,
    dimensions: '18cm x 12cm',
    image: 'assets/producto-jarron-2.webp'
  },
  {
    id: 'MM-TEX-01',
    name: 'Aguayo Ancestral Aymara',
    artisanId: 'marcela-condori',
    material: 'Textiles',
    description: 'Tela rectangular y multicolor tejida íntegramente a telar de cintura con cuatro orillos. Emplea lana fina de alpaca, hilada a mano y teñida tradicionalmente con plantas y minerales del altiplano. Su compleja iconografía refleja la cosmovisión andina, los ríos locales y los astros, siendo originalmente utilizado para cargar a las wawas (bebés) y semillas.',
    price: 85000,
    dimensions: '100cm x 110cm',
    image: 'assets/proceso-telar-1.webp'
  },
  {
    id: 'MM-TEX-02',
    name: 'Manta de Telar Rústico',
    artisanId: 'marcela-condori',
    material: 'Textiles',
    description: 'Hermosa manta tejida a telar con lana gruesa natural de alpaca y llama, en tonos tierra y terracota. Aporta un abrigo inigualable y un aire acogedor a cualquier espacio del hogar, perfecta para complementar un sillón o cama.',
    price: 48000,
    dimensions: '180cm x 120cm',
    image: 'assets/ambiente-hogar.webp'
  },
  {
    id: 'MM-WOOD-01',
    name: 'Batea de Raulí Tallada',
    artisanId: 'juan-carlos-valdez',
    material: 'Madera',
    description: 'Hermosa fuente labrada a partir de una única pieza de duramen de Raulí caído naturalmente. Protegida con aceites naturales y cera de abeja, está diseñada para perdurar por generaciones en la preparación del amasado o como decoración majestuosa en grandes comedores.',
    price: 45000,
    dimensions: '40cm x 25cm x 8cm',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'MM-WOOD-02',
    name: 'Set Cucharas Mañío',
    artisanId: 'juan-carlos-valdez',
    material: 'Madera',
    description: 'Dúo de cucharas culinarias talladas a punta de gubia y cuchillo en maderas suaves del sur. El mañío no transmite aromas resinosos a la comida, por lo que son la herramienta perfecta y humilde en cocciones lentas.',
    price: 18000,
    dimensions: '30cm longitud',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80'
  }
];

// Hacer las variables globales para que otros scripts las puedan acceder
window.ARTISANS = ARTISANS;
window.PRODUCTS = PRODUCTS;
