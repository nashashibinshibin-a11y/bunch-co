// ============================================================
// BUNCH & CO. — Product Data File
// ============================================================
// To add a new product, copy the product object template below
// and add it to the `products` array.
// Category counts and routes are handled automatically.
// ============================================================

import { Language, translations } from './translations';

export type Category =
  | 'Home Essentials'
  | 'Kitchen Essentials'
  | 'Car Accessories'
  | 'Daily Use Products'
  | 'New Arrivals';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface DeliveryInfo {
  note: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  packSize?: number;
  packBadgeI18n?: Record<Language, string>;
  shortDescription: string;
  description: string;
  features: string[];
  specifications: ProductSpec[];
  images: string[]; // paths relative to /public
  availability: 'in-stock' | 'out-of-stock' | 'limited';
  delivery: DeliveryInfo;
  featured: boolean;
  newArrival: boolean;
  whatsappMessage: string;
  // Localized Content Overrides
  nameI18n?: Record<Language, string>;
  shortDescriptionI18n?: Record<Language, string>;
  descriptionI18n?: Record<Language, string>;
  featuresI18n?: Record<Language, string[]>;
  specificationsI18n?: Record<Language, ProductSpec[]>;
  deliveryNoteI18n?: Record<Language, string>;
}

// ============================================================
// PRODUCTS LIST
// ============================================================

export const products: Product[] = [
  // 1. MOJILA Water Tank Filter Bag — Single Unit (₹250)
  {
    id: 'mojila-tank-filter-5micron',
    slug: 'mojila-5-micron-water-tank-filter-bag',
    name: 'MOJILA 5-Micron Water Tank Filter Bag',
    brand: 'MOJILA',
    category: 'Home Essentials',
    price: 250,
    originalPrice: undefined,
    packSize: 1,
    packBadgeI18n: {
      en: 'Single Pack',
      ml: 'സിംഗിൾ പായ്ക്ക്',
      hi: 'सिंगल पैक',
    },
    shortDescription:
      'Keep unwanted dirt and suspended particles from entering your water storage system with the MOJILA 5-Micron Water Tank Filter Bag.',
    description:
      'Keep unwanted dirt and suspended particles from entering your water storage system with the MOJILA 5-Micron Water Tank Filter Bag. Made from polypropylene material, this filter bag features a ring-collar design for convenient installation. Suitable for home water tanks, sump tanks, rooftop tanks, and industrial tanks.',
    features: [
      '5-micron filtration rating',
      'Premium PP (Polypropylene) material',
      'Corrosion-resistant construction',
      'Durable and long-lasting build',
      'Ring-collar design for secure fit',
      'Easy installation — no tools required',
    ],
    specifications: [
      { label: 'Package Contents', value: '1 Filter Bag' },
      { label: 'Filtration Rating', value: '5 Micron' },
      { label: 'Material', value: 'Polypropylene (PP)' },
      { label: 'Length', value: '20 inches' },
      { label: 'Diameter', value: '4 inches' },
      { label: 'Top Style', value: 'Sealed' },
      { label: 'Bottom Style', value: 'Ring Collar' },
    ],
    images: [
      '/images/products/mojila-tank-filter/product-main.png',
      '/images/products/mojila-tank-filter/product-specs.png',
      '/images/products/mojila-tank-filter/product-usage.png',
    ],
    availability: 'in-stock',
    delivery: {
      note: 'Delivery availability and estimated timelines are confirmed through WhatsApp. Contact us to check delivery to your location.',
    },
    featured: true,
    newArrival: true,
    whatsappMessage:
      'Hi BUNCH & CO.! I would like to order the MOJILA 5-Micron Water Tank Filter Bag for ₹250.',
    nameI18n: {
      en: 'MOJILA 5-Micron Water Tank Filter Bag',
      ml: 'MOJILA 5-മൈക്രോൺ വാട്ടർ ടാങ്ക് ഫിൽട്ടർ ബാഗ്',
      hi: 'MOJILA 5-माइक्रोन वॉटर टैंक फ़िल्टर बैग',
    },
    shortDescriptionI18n: {
      en: 'Keep unwanted dirt and suspended particles from entering your water storage system with the MOJILA 5-Micron Water Tank Filter Bag.',
      ml: 'MOJILA 5-മൈക്രോൺ വാട്ടർ ടാങ്ക് ഫിൽട്ടർ ബാഗ് ഉപയോഗിച്ച് നിങ്ങളുടെ ജലസംഭരണിയിലേക്ക് അഴുക്കും പൊടിപടലങ്ങളും കടക്കുന്നത് തടയുക.',
      hi: 'MOJILA 5-माइक्रोन वॉटर टैंक फ़िल्टर बैग से अपने पानी के स्टोरेज टैंक में अवांछित धूल और गंदगी जाने से रोकें।',
    },
    descriptionI18n: {
      en: 'Keep unwanted dirt and suspended particles from entering your water storage system with the MOJILA 5-Micron Water Tank Filter Bag. Made from polypropylene material, this filter bag features a ring-collar design for convenient installation. Suitable for home water tanks, sump tanks, rooftop tanks, and industrial tanks.',
      ml: 'MOJILA 5-മൈക്രോൺ വാട്ടർ ടാങ്ക് ഫിൽട്ടർ ബാഗ് ഉപയോഗിച്ച് നിങ്ങളുടെ ജലസംഭരണിയിലേക്ക് അഴുക്കും പൊടിപടലങ്ങളും കടക്കുന്നത് തടയുക. പോളിപ്രൊഫൈലിൻ മെറ്റീരിയൽ കൊണ്ട് നിർമ്മിച്ച ഈ ഫിൽട്ടർ ബാഗ് എളുപ്പത്തിൽ ഘടിപ്പിക്കാൻ റിംഗ്-കോളർ ഡിസൈനോടെയാണ് വരുന്നത്. വീട്ടു വാട്ടർ ടാങ്കുകൾ, സംപ് ടാങ്കുകൾ, റൂഫ്‌ടോപ്പ് ടാങ്കുകൾ, വ്യവസായ ടാങ്കുകൾ എന്നിവയ്ക്ക് അനുയോജ്യം.',
      hi: 'MOJILA 5-माइक्रोन वॉटर टैंक फ़िल्टर बैग से अपने पानी के स्टोरेज टैंक में अवांछित धूल और गंदगी जाने से रोकें। पॉलीप्रोपाइलीन सामग्री से निर्मित, इस फ़िल्टर बैग में सुविधाजनक इंस्टॉलेशन के लिए रिंग-कॉलर डिज़ाइन है। यह घरेलू पानी के टैंक, संप टैंक, छत के टैंक और औद्योगिक टैंकों के लिए उपयुक्त है।',
    },
    featuresI18n: {
      en: [
        '5-micron filtration rating',
        'Premium PP (Polypropylene) material',
        'Corrosion-resistant construction',
        'Durable and long-lasting build',
        'Ring-collar design for secure fit',
        'Easy installation — no tools required',
      ],
      ml: [
        '5-മൈക്രോൺ ഫിൽട്രേഷൻ റേറ്റിംഗ്',
        'പ്രീമിയം PP (പോളിപ്രൊഫൈലിൻ) മെറ്റീരിയൽ',
        'തുരുമ്പ് പ്രതിരോധ ശേഷിയുള്ള നിർമ്മാണം',
        'നീണ്ട ആയുസ്സും മികച്ച ഗുണനിലവാരവും',
        'സുരക്ഷിതമായി ഘടിപ്പിക്കാൻ റിംഗ്-കോളർ ഡിസൈൻ',
        'ടൂളുകൾ ഇല്ലാതെ എളുപ്പത്തിൽ ഇൻസ്റ്റാൾ ചെയ്യാം',
      ],
      hi: [
        '5-माइक्रोन फ़िल्ट्रेशन रेटिंग',
        'प्रीमियम PP (पॉलीप्रोपाइलीन) सामग्री',
        'जंग प्रतिरोधी निर्माण',
        'मजबूत और टिकाऊ बनावट',
        'सुरक्षित फिटिंग के लिए रिंग-कॉलर डिज़ाइन',
        'आसान इंस्टॉलेशन — किसी औजार की ज़रूरत नहीं',
      ],
    },
    specificationsI18n: {
      en: [
        { label: 'Package Contents', value: '1 Filter Bag' },
        { label: 'Filtration Rating', value: '5 Micron' },
        { label: 'Material', value: 'Polypropylene (PP)' },
        { label: 'Length', value: '20 inches' },
        { label: 'Diameter', value: '4 inches' },
        { label: 'Top Style', value: 'Sealed' },
        { label: 'Bottom Style', value: 'Ring Collar' },
      ],
      ml: [
        { label: 'പായ്ക്ക് ഉള്ളടക്കം', value: '1 Filter Bag' },
        { label: 'ഫിൽട്രേഷൻ റേറ്റിംഗ്', value: '5 Micron' },
        { label: 'മെറ്റീരിയൽ', value: 'Polypropylene (PP)' },
        { label: 'നീളം', value: '20 inches' },
        { label: 'വ്യാസം', value: '4 inches' },
        { label: 'മുകൾ ഭാഗം', value: 'Sealed' },
        { label: 'താഴ്ഭാഗം', value: 'Ring Collar' },
      ],
      hi: [
        { label: 'पैकेज सामग्री', value: '1 Filter Bag' },
        { label: 'फ़िल्ट्रेशन रेटिंग', value: '5 Micron' },
        { label: 'सामग्री', value: 'Polypropylene (PP)' },
        { label: 'लंबाई', value: '20 inches' },
        { label: 'व्यास', value: '4 inches' },
        { label: 'ऊपरी भाग', value: 'Sealed' },
        { label: 'निचला भाग', value: 'Ring Collar' },
      ],
    },
    deliveryNoteI18n: {
      en: 'Delivery availability and estimated timelines are confirmed through WhatsApp. Contact us to check delivery to your location.',
      ml: 'ഡെലിവറി ലഭ്യതയും സമയവും WhatsApp വഴി സ്ഥിരീകരിക്കുന്നു. നിങ്ങളുടെ സ്ഥലത്തെ ഡെലിവറി അറിയാൻ ഞങ്ങളുമായി ബന്ധപ്പെടുക.',
      hi: 'डिलीवरी उपलब्धता और अनुमानित समय सीमा WhatsApp के माध्यम से तय की जाती है। अपने स्थान पर डिलीवरी की जाँच के लिए संपर्क करें।',
    },
  },

  // 2. MOJILA Water Tank Filter Bag — Pack of 2 (₹450)
  {
    id: 'mojila-tank-filter-pack-2',
    slug: 'mojila-5-micron-water-tank-filter-bag-pack-of-2',
    name: 'MOJILA 5-Micron Water Tank Filter Bag (Pack of 2)',
    brand: 'MOJILA',
    category: 'Home Essentials',
    price: 450,
    originalPrice: 500,
    packSize: 2,
    packBadgeI18n: {
      en: 'Pack of 2',
      ml: '2 എണ്ണത്തിന്റെ പായ്ക്ക്',
      hi: '2 का पैक',
    },
    shortDescription:
      'Save with the MOJILA 5-Micron Water Tank Filter Bag 2-Pack. Polypropylene filter bags with ring-collar design for dual tanks or keeping a spare backup.',
    description:
      'Get two MOJILA 5-Micron Water Tank Filter Bags in one convenient value pack (contains 2 filter bags). Designed to keep unwanted dirt, silt, and suspended particles from entering your water storage system. Features 5-micron PP sediment filtration, corrosion-resistant build, and easy ring-collar installation. Ideal for dual-tank setups (sump and overhead tanks) or for keeping a spare replacement on hand.',
    features: [
      'Value pack of 2 filter bags (2 units included)',
      '5-micron high-efficiency sediment filtration',
      'Premium PP (Polypropylene) material',
      'Corrosion-resistant construction',
      'Ring-collar design for secure fit',
      'Ideal for dual tanks or spare replacement',
    ],
    specifications: [
      { label: 'Package Contents', value: '2 Filter Bags (Pack of 2)' },
      { label: 'Filtration Rating', value: '5 Micron' },
      { label: 'Material', value: 'Polypropylene (PP)' },
      { label: 'Length', value: '20 inches each' },
      { label: 'Diameter', value: '4 inches each' },
      { label: 'Top Style', value: 'Sealed' },
      { label: 'Bottom Style', value: 'Ring Collar' },
    ],
    images: [
      '/images/products/mojila-tank-filter/product-main.png',
      '/images/products/mojila-tank-filter/product-specs.png',
      '/images/products/mojila-tank-filter/product-usage.png',
    ],
    availability: 'in-stock',
    delivery: {
      note: 'Delivery availability and estimated timelines are confirmed through WhatsApp. Contact us to check delivery to your location.',
    },
    featured: true,
    newArrival: true,
    whatsappMessage:
      'Hi BUNCH & CO.! I would like to order the MOJILA 5-Micron Water Tank Filter Bag (Pack of 2) for ₹450.',
    nameI18n: {
      en: 'MOJILA 5-Micron Water Tank Filter Bag (Pack of 2)',
      ml: 'MOJILA 5-മൈക്രോൺ വാട്ടർ ടാങ്ക് ഫിൽട്ടർ ബാഗ് (2 എണ്ണത്തിന്റെ പായ്ക്ക്)',
      hi: 'MOJILA 5-माइक्रोन वॉटर टैंक फ़िल्टर बैग (2 का पैक)',
    },
    shortDescriptionI18n: {
      en: 'Save with the MOJILA 5-Micron Water Tank Filter Bag 2-Pack. Polypropylene filter bags with ring-collar design for dual tanks or keeping a spare backup.',
      ml: 'MOJILA 5-മൈക്രോൺ വാട്ടർ ടാങ്ക് ഫിൽട്ടർ ബാഗ് 2-പായ്ക്ക് വഴി ലാഭിക്കൂ. രണ്ട് ടാങ്കുകൾക്കോ സ്പെയർ ബാക്കപ്പ് കരുതുന്നതിനോ റിംഗ്-കോളർ പോളിപ്രൊഫൈലിൻ ഫിൽട്ടർ ബാഗുകൾ.',
      hi: 'MOJILA 5-माइक्रोन वॉटर टैंक फ़िल्टर बैग 2-पैक के साथ बचत करें। दो टैंकों या स्पेयर बैकअप रखने के लिए रिंग-कॉलर पॉलीप्रोपाइलीन फ़िल्टर बैग।',
    },
    descriptionI18n: {
      en: 'Get two MOJILA 5-Micron Water Tank Filter Bags in one convenient value pack (contains 2 filter bags). Designed to keep unwanted dirt, silt, and suspended particles from entering your water storage system. Features 5-micron PP sediment filtration, corrosion-resistant build, and easy ring-collar installation. Ideal for dual-tank setups (sump and overhead tanks) or for keeping a spare replacement on hand.',
      ml: '2 MOJILA 5-മൈക്രോൺ വാട്ടർ ടാങ്ക് ഫിൽട്ടർ ബാഗുകൾ അടങ്ങിയ വാല്യു പായ്ക്ക് (2 ഫിൽട്ടർ ബാഗുകൾ അടങ്ങിയിരിക്കുന്നു). ജലസംഭരണിയിലേക്ക് ചെളിയും അഴുക്കും പ്രവേശിക്കുന്നത് തടയാൻ പോളിപ്രൊഫൈലിൻ ഫിൽട്ടർ ബാഗുകൾ. 5-മൈക്രോൺ കാര്യക്ഷമതയും റിംഗ്-കോളർ ഇൻസ്റ്റാളേഷനും. രണ്ട് ടാങ്കുകൾ ഉള്ള വീടുകൾക്കും സ്പെയർ സൂക്ഷിക്കുന്നതിനും അനുയോജ്യം.',
      hi: 'दो MOJILA 5-माइक्रोन वॉटर टैंक फ़िल्टर बैग एक सुविधाजनक वैल्यू पैक में (इसमें 2 फ़िल्टर बैग शामिल हैं)। आपके वॉटर स्टोरेज सिस्टम में धूल, मिट्टी और गंदगी को जाने से रोकने के लिए डिज़ाइन किया गया। 5-माइक्रोन PP सेडिमेंट फ़िल्ट्रेशन और आसान रिंग-कॉलर इंस्टॉलेशन। दोहरे टैंक सेटअप या अतिरिक्त रिप्लेसमेंट रखने के लिए आदर्श।',
    },
    featuresI18n: {
      en: [
        'Value pack of 2 filter bags (2 units included)',
        '5-micron high-efficiency sediment filtration',
        'Premium PP (Polypropylene) material',
        'Corrosion-resistant construction',
        'Ring-collar design for secure fit',
        'Ideal for dual tanks or spare replacement',
      ],
      ml: [
        '2 ഫിൽട്ടർ ബാഗുകളുടെ വാല്യു പായ്ക്ക് (2 എണ്ണം അടങ്ങിയിരിക്കുന്നു)',
        '5-മൈക്രോൺ ഉയർന്ന കാര്യക്ഷമതയുള്ള ഫിൽട്രേഷൻ',
        'പ്രീമിയം PP (പോളിപ്രൊഫൈലിൻ) മെറ്റീരിയൽ',
        'തുരുമ്പ് പ്രതിരോധ ശേഷിയുള്ള നിർമ്മാണം',
        'സുരക്ഷിതമായി ഘടിപ്പിക്കാൻ റിംഗ്-കോളർ ഡിസൈൻ',
        'രണ്ട് ടാങ്കുകൾക്കോ സ്പെയർ ബാക്കപ്പിനോ അനുയോജ്യം',
      ],
      hi: [
        '2 फ़िल्टर बैग का वैल्यू पैक (2 इकाइयाँ शामिल)',
        '5-माइक्रोन उच्च-दक्षता सेडिमेंट फ़िल्ट्रेशन',
        'प्रीमियम PP (पॉलीप्रोपाइलीन) सामग्री',
        'जंग प्रतिरोधी निर्माण',
        'सुरक्षित फिटिंग के लिए रिंग-कॉलर डिज़ाइन',
        'दो टैंकों या स्पेयर रिप्लेसमेंट के लिए आदर्श',
      ],
    },
    specificationsI18n: {
      en: [
        { label: 'Package Contents', value: '2 Filter Bags (Pack of 2)' },
        { label: 'Filtration Rating', value: '5 Micron' },
        { label: 'Material', value: 'Polypropylene (PP)' },
        { label: 'Length', value: '20 inches each' },
        { label: 'Diameter', value: '4 inches each' },
        { label: 'Top Style', value: 'Sealed' },
        { label: 'Bottom Style', value: 'Ring Collar' },
      ],
      ml: [
        { label: 'പായ്ക്ക് ഉള്ളടക്കം', value: '2 Filter Bags (Pack of 2)' },
        { label: 'ഫിൽട്രേഷൻ റേറ്റിംഗ്', value: '5 Micron' },
        { label: 'മെറ്റീരിയൽ', value: 'Polypropylene (PP)' },
        { label: 'നീളം', value: '20 inches each' },
        { label: 'വ്യാസം', value: '4 inches each' },
        { label: 'മുകൾ ഭാഗം', value: 'Sealed' },
        { label: 'താഴ്ഭാഗം', value: 'Ring Collar' },
      ],
      hi: [
        { label: 'पैकेज सामग्री', value: '2 Filter Bags (Pack of 2)' },
        { label: 'फ़िल्ट्रेशन रेटिंग', value: '5 Micron' },
        { label: 'सामग्री', value: 'Polypropylene (PP)' },
        { label: 'लंबाई', value: '20 inches each' },
        { label: 'व्यास', value: '4 inches each' },
        { label: 'ऊपरी भाग', value: 'Sealed' },
        { label: 'निचला भाग', value: 'Ring Collar' },
      ],
    },
    deliveryNoteI18n: {
      en: 'Delivery availability and estimated timelines are confirmed through WhatsApp. Contact us to check delivery to your location.',
      ml: 'ഡെലിവറി ലഭ്യതയും സമയവും WhatsApp വഴി സ്ഥിരീകരിക്കുന്നു. നിങ്ങളുടെ സ്ഥലത്തെ ഡെലിവറി അറിയാൻ ഞങ്ങളുമായി ബന്ധപ്പെടുക.',
      hi: 'डिलीवरी उपलब्धता और अनुमानित समय सीमा WhatsApp के माध्यम से तय की जाती है। अपने स्थान पर डिलीवरी की जाँच के लिए संपर्क करें।',
    },
  },

  // 3. MOJILA Water Tank Filter Bag — Pack of 3 (₹699)
  {
    id: 'mojila-tank-filter-pack-3',
    slug: 'mojila-5-micron-water-tank-filter-bag-pack-of-3',
    name: 'MOJILA 5-Micron Water Tank Filter Bag (Pack of 3)',
    brand: 'MOJILA',
    category: 'Home Essentials',
    price: 699,
    originalPrice: 750,
    packSize: 3,
    packBadgeI18n: {
      en: 'Pack of 3',
      ml: '3 എണ്ണത്തിന്റെ പായ്ക്ക്',
      hi: '3 का पैक',
    },
    shortDescription:
      'Save with the MOJILA 5-Micron Water Tank Filter Bag 3-Pack. Polypropylene filter bags with ring-collar design for multiple tanks or regular replacements.',
    description:
      'Get three MOJILA 5-Micron Water Tank Filter Bags in one convenient value pack (contains 3 filter bags). Ideal for homes with multiple storage tanks (sump and overhead tanks) or for keeping spare replacements on hand. Features 5-micron PP sediment filtration, corrosion-resistant build, and easy ring-collar installation.',
    features: [
      'Value pack of 3 filter bags (3 units included)',
      '5-micron high-efficiency filtration',
      'Premium PP (Polypropylene) material',
      'Corrosion-resistant construction',
      'Ring-collar design for secure fit',
      'Ideal for multiple tanks or spare backup',
    ],
    specifications: [
      { label: 'Package Contents', value: '3 Filter Bags (Pack of 3)' },
      { label: 'Filtration Rating', value: '5 Micron' },
      { label: 'Material', value: 'Polypropylene (PP)' },
      { label: 'Length', value: '20 inches each' },
      { label: 'Diameter', value: '4 inches each' },
      { label: 'Top Style', value: 'Sealed' },
      { label: 'Bottom Style', value: 'Ring Collar' },
    ],
    images: [
      '/images/products/mojila-tank-filter/product-main.png',
      '/images/products/mojila-tank-filter/product-specs.png',
      '/images/products/mojila-tank-filter/product-usage.png',
    ],
    availability: 'in-stock',
    delivery: {
      note: 'Delivery availability and estimated timelines are confirmed through WhatsApp. Contact us to check delivery to your location.',
    },
    featured: true,
    newArrival: true,
    whatsappMessage:
      'Hi BUNCH & CO.! I would like to order the MOJILA 5-Micron Water Tank Filter Bag (Pack of 3) for ₹699.',
    nameI18n: {
      en: 'MOJILA 5-Micron Water Tank Filter Bag (Pack of 3)',
      ml: 'MOJILA 5-മൈക്രോൺ വാട്ടർ ടാങ്ക് ഫിൽട്ടർ ബാഗ് (3 എണ്ണത്തിന്റെ പായ്ക്ക്)',
      hi: 'MOJILA 5-माइक्रोन वॉटर टैंक फ़िल्टर बैग (3 का पैक)',
    },
    shortDescriptionI18n: {
      en: 'Save with the MOJILA 5-Micron Water Tank Filter Bag 3-Pack. Polypropylene filter bags with ring-collar design for multiple tanks or regular replacements.',
      ml: 'MOJILA 5-മൈക്രോൺ വാട്ടർ ടാങ്ക് ഫിൽട്ടർ ബാഗ് 3-പായ്ക്ക് വഴി ലാഭിക്കൂ. ഒന്നിലധികം ടാങ്കുകൾക്കും കൃത്യമായ മാറ്റിസ്ഥാപിക്കലിനും റിംഗ്-കോളർ പോളിപ്രൊഫൈലിൻ ഫിൽട്ടർ ബാഗുകൾ.',
      hi: 'MOJILA 5-माइक्रोन वॉटर टैंक फ़िल्टर बैग 3-पैक के साथ बचत करें। कई टैंकों या नियमित रिप्लेसमेंट के लिए रिंग-कॉलर पॉलीप्रोपाइलीन फ़िल्टर बैग।',
    },
    descriptionI18n: {
      en: 'Get three MOJILA 5-Micron Water Tank Filter Bags in one convenient value pack (contains 3 filter bags). Ideal for homes with multiple storage tanks (sump and overhead tanks) or for keeping spare replacements on hand. Features 5-micron PP sediment filtration, corrosion-resistant build, and easy ring-collar installation.',
      ml: '3 MOJILA 5-മൈക്രോൺ വാട്ടർ ടാങ്ക് ഫിൽട്ടർ ബാഗുകൾ അടങ്ങിയ വാല്യു പായ്ക്ക് (3 ഫിൽട്ടർ ബാഗുകൾ അടങ്ങിയിരിക്കുന്നു). ഒന്നിലധികം സ്റ്റോറേജ് ടാങ്കുകൾ ഉള്ള വീടുകൾക്കും സ്പെയർ ബാക്കപ്പ് കരുതുന്നതിനും ഏറ്റവും അനുയോജ്യം.',
      hi: 'तीन MOJILA 5-माइक्रोन वॉटर टैंक फ़िल्टर बैग एक सुविधाजनक वैल्यू पैक में (इसमें 3 फ़िल्टर बैग शामिल हैं)। कई स्टोरेज टैंकों (संप और ओवरहेड टैंक) वाले घरों के लिए या स्पेयर बैकअप रखने के लिए आदर्श।',
    },
    featuresI18n: {
      en: [
        'Value pack of 3 filter bags (3 units included)',
        '5-micron high-efficiency filtration',
        'Premium PP (Polypropylene) material',
        'Corrosion-resistant construction',
        'Ring-collar design for secure fit',
        'Ideal for multiple tanks or spare backup',
      ],
      ml: [
        '3 ഫിൽട്ടർ ബാഗുകളുടെ വാല്യു പായ്ക്ക് (3 എണ്ണം അടങ്ങിയിരിക്കുന്നു)',
        '5-മൈക്രോൺ ഉയർന്ന കാര്യക്ഷമതയുള്ള ഫിൽട്രേഷൻ',
        'പ്രീമിയം PP (പോളിപ്രൊഫൈലിൻ) മെറ്റീരിയൽ',
        'തുരുമ്പ് പ്രതിരോധ ശേഷിയുള്ള നിർമ്മാണം',
        'സുരക്ഷിതമായി ഘടിപ്പിക്കാൻ റിംഗ്-കോളർ ഡിസൈൻ',
        'ഒന്നിലധികം ടാങ്കുകൾക്കോ സ്പെയർ ബാക്കപ്പിനോ അനുയോജ്യം',
      ],
      hi: [
        '3 फ़िल्टर बैग का वैल्यू पैक (3 इकाइयाँ शामिल)',
        '5-माइक्रोन उच्च-दक्षता फ़िल्ट्रेशन',
        'प्रीमियम PP (पॉलीप्रोपाइलीन) सामग्री',
        'जंग प्रतिरोधी निर्माण',
        'सुरक्षित फिटिंग के लिए रिंग-कॉलर डिज़ाइन',
        'कई टैंकों या अतिरिक्त बैकअप के लिए आदर्श',
      ],
    },
    specificationsI18n: {
      en: [
        { label: 'Package Contents', value: '3 Filter Bags (Pack of 3)' },
        { label: 'Filtration Rating', value: '5 Micron' },
        { label: 'Material', value: 'Polypropylene (PP)' },
        { label: 'Length', value: '20 inches each' },
        { label: 'Diameter', value: '4 inches each' },
        { label: 'Top Style', value: 'Sealed' },
        { label: 'Bottom Style', value: 'Ring Collar' },
      ],
      ml: [
        { label: 'പായ്ക്ക് ഉള്ളടക്കം', value: '3 Filter Bags (Pack of 3)' },
        { label: 'ഫിൽട്രേഷൻ റേറ്റിംഗ്', value: '5 Micron' },
        { label: 'മെറ്റീരിയൽ', value: 'Polypropylene (PP)' },
        { label: 'നീളം', value: '20 inches each' },
        { label: 'വ്യാസം', value: '4 inches each' },
        { label: 'മുകൾ ഭാഗം', value: 'Sealed' },
        { label: 'താഴ്ഭാഗം', value: 'Ring Collar' },
      ],
      hi: [
        { label: 'पैकेज सामग्री', value: '3 Filter Bags (Pack of 3)' },
        { label: 'फ़िल्ट्रेशन रेटिंग', value: '5 Micron' },
        { label: 'सामग्री', value: 'Polypropylene (PP)' },
        { label: 'लंबाई', value: '20 inches each' },
        { label: 'व्यास', value: '4 inches each' },
        { label: 'ऊपरी भाग', value: 'Sealed' },
        { label: 'निचला भाग', value: 'Ring Collar' },
      ],
    },
    deliveryNoteI18n: {
      en: 'Delivery availability and estimated timelines are confirmed through WhatsApp. Contact us to check delivery to your location.',
      ml: 'ഡെലിവറി ലഭ്യതയും സമയവും WhatsApp വഴി സ്ഥിരീകരിക്കുന്നു. നിങ്ങളുടെ സ്ഥലത്തെ ഡെലിവറി അറിയാൻ ഞങ്ങളുമായി ബന്ധപ്പെടുക.',
      hi: 'डिलीवरी उपलब्धता और अनुमानित समय सीमा WhatsApp के माध्यम से तय की जाती है। अपने स्थान पर डिलीवरी की जाँच के लिए संपर्क करें।',
    },
  },
];

// ============================================================
// KERALA DISTRICTS
// ============================================================

export const KERALA_DISTRICTS = [
  'Alappuzha',
  'Ernakulam',
  'Idukki',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Kottayam',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Pathanamthitta',
  'Thiruvananthapuram',
  'Thrissur',
  'Wayanad',
  'Other (Outside Kerala)',
] as const;

// ============================================================
// ALL 28 INDIAN STATES (Mandatory Delivery Selection)
// ============================================================

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const;

// ============================================================
// ALL 8 INDIAN UNION TERRITORIES (Mandatory Delivery Selection)
// ============================================================

export const INDIAN_UNION_TERRITORIES = [
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
] as const;

// Unified List of all 36 Indian States and Union Territories (Alphabetical)
export const ALL_INDIAN_STATES_AND_UT = [
  ...INDIAN_STATES,
  ...INDIAN_UNION_TERRITORIES,
].sort((a, b) => a.localeCompare(b));

// ============================================================
// CATEGORIES METADATA
// ============================================================

export interface CategoryMeta {
  name: Category;
  icon: string;
  description: string;
}

export const categories: CategoryMeta[] = [
  {
    name: 'Home Essentials',
    icon: '🏠',
    description: 'Everyday solutions for home and kitchen maintenance',
  },
  {
    name: 'Kitchen Essentials',
    icon: '🍳',
    description: 'Quality tools for effortless cooking and dining',
  },
  {
    name: 'Car Accessories',
    icon: '🚗',
    description: 'Practical accessories for car care and comfort',
  },
  {
    name: 'Daily Use Products',
    icon: '✨',
    description: 'Thoughtful finds that make everyday life simpler',
  },
  {
    name: 'New Arrivals',
    icon: '✨',
    description: 'Latest additions to our collection',
  },
];

// ============================================================
// HELPERS
// ============================================================

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival);
}

export function getCategoryCount(category: Category): number {
  return products.filter((p) => p.category === category).length;
}

/**
 * Returns the product with localized strings according to active language
 */
export function getLocalizedProduct(product: Product, lang: Language): Product {
  return {
    ...product,
    name: product.nameI18n?.[lang] || product.name,
    shortDescription: product.shortDescriptionI18n?.[lang] || product.shortDescription,
    description: product.descriptionI18n?.[lang] || product.description,
    features: product.featuresI18n?.[lang] || product.features,
    specifications: product.specificationsI18n?.[lang] || product.specifications,
    delivery: {
      note: product.deliveryNoteI18n?.[lang] || product.delivery.note,
    },
  };
}

export const WHATSAPP_NUMBER = '918921267174';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function getWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

// ============================================================
// ORDER FORM DATA & WHATSAPP MESSAGE FORMATTING
// ============================================================

export interface OrderFormData {
  fullName: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  quantity: number;
}

/**
 * Generates the official BUNCH & CO. WhatsApp order message in the selected language.
 * Clearly communicates pack quantity and individual filter bag counts without ambiguity.
 */
export function buildWhatsAppOrderMessage(
  product: Product,
  formData: OrderFormData,
  lang: Language = 'en'
): string {
  const tWa = translations[lang]?.whatsappMessage || translations.en.whatsappMessage;
  const totalAmount = product.price * formData.quantity;
  const localizedProductName = product.nameI18n?.[lang] || product.name;

  // Language-specific Pack / Unit formatting to ensure zero confusion between pack count and individual bags
  let quantityText = `${formData.quantity}`;
  if (product.packSize && product.packSize > 1) {
    const totalBags = formData.quantity * product.packSize;
    if (lang === 'ml') {
      quantityText = `${formData.quantity} പായ്ക്ക് (ആകെ ${totalBags} ഫിൽട്ടർ ബാഗുകൾ)`;
    } else if (lang === 'hi') {
      quantityText = `${formData.quantity} पैक (कुल ${totalBags} फ़िल्टर बैग)`;
    } else {
      quantityText = `${formData.quantity} ${formData.quantity === 1 ? 'Pack' : 'Packs'} (${totalBags} filter bags total)`;
    }
  } else {
    if (lang === 'ml') {
      quantityText = `${formData.quantity} എണ്ണം (1 ഫിൽട്ടർ ബാഗ്)`;
    } else if (lang === 'hi') {
      quantityText = `${formData.quantity} इकाई (1 फ़िल्टर बैग)`;
    } else {
      quantityText = `${formData.quantity} ${formData.quantity === 1 ? 'Unit' : 'Units'} (1 filter bag)`;
    }
  }

  return `${tWa.greeting}

${tWa.orderSection}
${tWa.productLabel}: ${localizedProductName}
${tWa.quantityLabel}: ${quantityText}
${tWa.unitPriceLabel}: ₹${product.price}
${tWa.totalAmountLabel}: ₹${totalAmount}

${tWa.customerSection}
${tWa.fullNameLabel}: ${formData.fullName.trim()}
${tWa.phoneLabel}: ${formData.phone.trim()}
${tWa.addressLabel}: ${formData.address.trim()}
${tWa.districtLabel}: ${formData.district.trim()}
${tWa.stateLabel}: ${formData.state.trim()}
${tWa.pincodeLabel}: ${formData.pincode.trim()}

${tWa.closing}

${tWa.thankYou}`;
}

/**
 * Builds the WhatsApp click-to-chat URL and validates length limits.
 */
export function generateWhatsAppOrderLink(
  product: Product,
  formData: OrderFormData,
  lang: Language = 'en'
): { url: string; message: string; isTooLong: boolean } {
  const message = buildWhatsAppOrderMessage(product, formData, lang);
  const encoded = encodeURIComponent(message);
  const url = `${WHATSAPP_BASE_URL}?text=${encoded}`;
  // Safe limit for WhatsApp URLs across mobile apps & browsers is ~2000 chars
  const isTooLong = url.length > 2000;
  return { url, message, isTooLong };
}
