/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ============================================================================
// CONFIGURAÇÕES GERAIS E CONSTANTES EDITÁVEIS
// Todos os dados do site ficam centralizados aqui para fácil manutenção.
// ============================================================================

/**
 * Endpoint para envio do formulário de orçamento por POST JSON.
 * Fica vazio por agora conforme especificado. Se vazio, o formulário direciona diretamente para o WhatsApp.
 */
export const FORM_ENDPOINT: string = "";

/**
 * Domínio do site (provisório até o domínio oficial estar ativo).
 */
export const SITE_URL = "https://quifiltro.co.ao";

export const CONTACT_INFO = {
  whatsappDisplay: "+244 929 953 310",
  whatsappRaw: "244929953310",
  callsDisplay: "+244 938 164 611",
  callsRaw: "+244938164611",
  email: "quifiltrolda@gmail.com",
  locationDisplay: "Talatona, Luanda",
  googleMapsUrl: "https://maps.app.goo.gl/YuWnK5p4iC5xujiv9",
  hours: {
    pt: "Segunda a sexta, 8h–17h. Sábado, 8h–13h.",
    en: "Monday to Friday, 8am–5pm. Saturday, 8am–1pm.",
  },
  social: {
    facebook: "https://www.facebook.com/Quifiltro.ao",
    instagram: "https://www.instagram.com/quifiltro.ao",
    whatsapp: "https://wa.me/244929953310",
  },
};

/**
 * 21 Províncias de Angola
 */
export const PROVINCES = [
  "Bengo",
  "Benguela",
  "Bié",
  "Cabinda",
  "Cuando",
  "Cuanza Norte",
  "Cuanza Sul",
  "Cubango",
  "Cunene",
  "Huambo",
  "Huíla",
  "Icolo e Bengo",
  "Luanda",
  "Lunda Norte",
  "Lunda Sul",
  "Malanje",
  "Moxico",
  "Moxico Leste",
  "Namibe",
  "Uíge",
  "Zaire",
] as const;

export type Province = (typeof PROVINCES)[number];

export type ClientType = "casa" | "empresa" | "industria";

export interface CategoryDef {
  id: string;
  label: {
    pt: string;
    en: string;
  };
}

export const CATEGORIES: CategoryDef[] = [
  { id: "todos", label: { pt: "Todos", en: "All" } },
  { id: "sistemas-de-filtracao", label: { pt: "Sistemas de filtração", en: "Filtration Systems" } },
  { id: "osmose-reversa", label: { pt: "Osmose Reversa", en: "Reverse Osmosis" } },
  { id: "bebedouros", label: { pt: "Bebedouros", en: "Water Dispensers" } },
  { id: "filtros-e-carcacas", label: { pt: "Filtros e carcaças", en: "Filters & Housings" } },
];

export interface ProductItem {
  id: string;
  name: string;
  category: "sistemas-de-filtracao" | "osmose-reversa" | "bebedouros" | "filtros-e-carcacas";
  categoryLabel: {
    pt: string;
    en: string;
  };
  image: string;
  imageSm: string;
  featured: boolean;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "wf30-2-copos",
    name: "WF-30 · 2 copos",
    category: "sistemas-de-filtracao",
    categoryLabel: { pt: "Sistemas de filtração", en: "Filtration Systems" },
    image: "/products/wf30-2-copos.webp",
    imageSm: "/products/sm/wf30-2-copos.webp",
    featured: true,
  },
  {
    id: "wf30-3-copos",
    name: "WF-30 · 3 copos",
    category: "sistemas-de-filtracao",
    categoryLabel: { pt: "Sistemas de filtração", en: "Filtration Systems" },
    image: "/products/wf30-3-copos.webp",
    imageSm: "/products/sm/wf30-3-copos.webp",
    featured: true,
  },
  {
    id: "osmose-reversa-sistema",
    name: "Sistema de Osmose Reversa",
    category: "osmose-reversa",
    categoryLabel: { pt: "Osmose Reversa", en: "Reverse Osmosis" },
    image: "/products/osmose-reversa-sistema.webp",
    imageSm: "/products/sm/osmose-reversa-sistema.webp",
    featured: true,
  },
  {
    id: "osmose-reversa-quifiltro",
    name: "Osmose Reversa Quifiltro",
    category: "osmose-reversa",
    categoryLabel: { pt: "Osmose Reversa", en: "Reverse Osmosis" },
    image: "/products/osmose-reversa-quifiltro.webp",
    imageSm: "/products/sm/osmose-reversa-quifiltro.webp",
    featured: true,
  },
  {
    id: "dwp-816s-mini",
    name: "Bebedouro DWP 816S · Mini",
    category: "bebedouros",
    categoryLabel: { pt: "Bebedouros", en: "Water Dispensers" },
    image: "/products/dwp-816s-mini.webp",
    imageSm: "/products/sm/dwp-816s-mini.webp",
    featured: true,
  },
  {
    id: "dwp-816s-grande",
    name: "Bebedouro DWP 816S · Grande",
    category: "bebedouros",
    categoryLabel: { pt: "Bebedouros", en: "Water Dispensers" },
    image: "/products/dwp-816s-grande.webp",
    imageSm: "/products/sm/dwp-816s-grande.webp",
    featured: true,
  },
  {
    id: "bebedouro-mangole",
    name: "Bebedouro Mangolé",
    category: "bebedouros",
    categoryLabel: { pt: "Bebedouros", en: "Water Dispensers" },
    image: "/products/bebedouro-mangole.webp",
    imageSm: "/products/sm/bebedouro-mangole.webp",
    featured: true,
  },
  {
    id: "big-blue",
    name: "Big Blue",
    category: "filtros-e-carcacas",
    categoryLabel: { pt: "Filtros e carcaças", en: "Filters & Housings" },
    image: "/products/big-blue.webp",
    imageSm: "/products/sm/big-blue.webp",
    featured: true,
  },
  {
    id: "big-blue-mini",
    name: "Big Blue Mini",
    category: "filtros-e-carcacas",
    categoryLabel: { pt: "Filtros e carcaças", en: "Filters & Housings" },
    image: "/products/big-blue-mini.webp",
    imageSm: "/products/sm/big-blue-mini.webp",
    featured: true,
  },
  {
    id: "cartucho-filtrante",
    name: "Cartucho filtrante",
    category: "filtros-e-carcacas",
    categoryLabel: { pt: "Filtros e carcaças", en: "Filters & Housings" },
    image: "/products/cartucho-filtrante.webp",
    imageSm: "/products/sm/cartucho-filtrante.webp",
    featured: true,
  },
];

export interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: {
    pt: string;
    en: string;
  };
  sublabel: {
    pt: string;
    en: string;
  };
}

export const STATS: StatItem[] = [
  {
    id: "anos",
    value: 6,
    label: { pt: "Anos no mercado", en: "Years on the market" },
    sublabel: { pt: "Experiência consolidada em Angola", en: "Proven experience across Angola" },
  },
  {
    id: "clientes",
    value: 900,
    prefix: "+",
    label: { pt: "Clientes", en: "Satisfied clients" },
    sublabel: { pt: "Casas, empresas e indústrias atendidas", en: "Homes, businesses & industries served" },
  },
  {
    id: "maquinas",
    value: 1500,
    prefix: "+",
    label: { pt: "Máquinas vendidas", en: "Systems installed" },
    sublabel: { pt: "Equipamentos entregues com garantia", en: "High standard certified systems" },
  },
  {
    id: "provincias",
    value: 21,
    label: { pt: "Províncias atendidas", en: "Provinces served" },
    sublabel: { pt: "Entregamos em todo o país", en: "Nationwide delivery across Angola" },
  },
];

export interface ServiceItem {
  id: string;
  iconName: "ShoppingCart" | "Wrench" | "ShieldCheck" | "HelpCircle";
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
}

export const SERVICES: ServiceItem[] = [
  {
    id: "venda",
    iconName: "ShoppingCart",
    title: { pt: "Venda", en: "Sales" },
    description: {
      pt: "Sistemas de filtração, osmose reversa, bebedouros e filtros para casa, empresa e indústria.",
      en: "Filtration systems, reverse osmosis, water dispensers and replacement filters for homes, businesses and industries.",
    },
  },
  {
    id: "montagem",
    iconName: "Wrench",
    title: { pt: "Montagem", en: "Installation" },
    description: {
      pt: "Instalação feita pelos nossos técnicos, adaptada ao seu espaço e à sua instalação.",
      en: "Installation carried out by our technical experts, fully adapted to your space and plumbing setup.",
    },
  },
  {
    id: "manutencao",
    iconName: "ShieldCheck",
    title: { pt: "Manutenção", en: "Maintenance" },
    description: {
      pt: "Verificação regular do sistema e troca dos filtros, conforme a utilização e a recomendação técnica.",
      en: "Regular system inspection and timely filter replacement according to usage and technical guidelines.",
    },
  },
  {
    id: "consultoria",
    iconName: "HelpCircle",
    title: { pt: "Consultoria", en: "Consultancy" },
    description: {
      pt: "Ajudamos a escolher o sistema certo, de acordo com a água de que precisa, o espaço e a instalação existente.",
      en: "We help you select the ideal system based on your water source, space requirements and existing plumbing.",
    },
  },
];

export interface TextDictionary {
  nav: {
    inicio: string;
    produtos: string;
    maisVendidos: string;
    servicos: string;
    quemSomos: string;
    contactos: string;
    skipToContent: string;
    quickExit: string;
    themeToggle: string;
    liteModeToggle: string;
    languageToggle: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    text: string;
    ctaQuote: string;
    ctaWhatsApp: string;
    altHeroImage: string;
  };
  stats: {
    tag: string;
    title: string;
    subtitle: string;
    mapTag: string;
    mapTitle: string;
    mapSubtitle: string;
    provincesBadge: string;
  };
  products: {
    tag: string;
    title: string;
    subtitle: string;
    addToQuote: string;
    addedToQuote: string;
    removeFromQuote: string;
  };
  bestsellers: {
    tag: string;
    title: string;
    subtitle: string;
    carouselControls: {
      prev: string;
      next: string;
      pause: string;
      play: string;
    };
  };
  services: {
    tag: string;
    title: string;
    subtitle: string;
  };
  about: {
    tag: string;
    title: string;
    text: string;
    altPhoto: string;
  };
  contacts: {
    tag: string;
    title: string;
    subtitle: string;
    whatsappTitle: string;
    whatsappBtn: string;
    phoneTitle: string;
    phoneBtn: string;
    emailTitle: string;
    locationTitle: string;
    directionsBtn: string;
    hoursTitle: string;
    visitText: string;
  };
  drawer: {
    title: string;
    emptyTitle: string;
    emptyText: string;
    selectedProducts: string;
    remove: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    provinceLabel: string;
    provinceSelectPlaceholder: string;
    clientTypeLabel: string;
    clientTypes: {
      casa: string;
      empresa: string;
      industria: string;
    };
    messageLabel: string;
    messagePlaceholder: string;
    privacyConsent: string;
    privacyLink: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    validationErrors: {
      name: string;
      phone: string;
      province: string;
      clientType: string;
      emptyProducts: string;
    };
    floatingBtn: string;
  };
  privacyModal: {
    title: string;
    close: string;
    whoWeAreTitle: string;
    whoWeAreText: string;
    dataCollectedTitle: string;
    dataCollectedText: string;
    purposeTitle: string;
    purposeText: string;
    sharingTitle: string;
    sharingText: string;
    rightsTitle: string;
    rightsText: string;
    cookiesTitle: string;
    cookiesText: string;
  };
  footer: {
    tagline: string;
    linksTitle: string;
    contactTitle: string;
    socialTitle: string;
    privacyLink: string;
    rightsReserved: string;
  };
  liteModeBanner: string;
}

export const TEXTS: Record<"pt" | "en", TextDictionary> = {
  pt: {
    nav: {
      inicio: "Início",
      produtos: "Produtos",
      maisVendidos: "Mais vendidos",
      servicos: "Serviços",
      quemSomos: "Quem somos",
      contactos: "Contactos",
      skipToContent: "Saltar para o conteúdo",
      quickExit: "Saída rápida",
      themeToggle: "Alternar tema claro/escuro",
      liteModeToggle: "Alternar modo leve de poupança",
      languageToggle: "Mudar para inglês (EN)",
      menuOpen: "Abrir menu de navegação",
      menuClose: "Fechar menu",
    },
    hero: {
      tag: "SISTEMAS DE ÁGUA",
      titleLine1: "Beber água.",
      titleLine2: "Preservar a vida.",
      subtitle: "Mais saúde para sua família.",
      text: "Sistemas de filtração, osmose reversa e bebedouros para casas, empresas e indústrias, em toda Angola.",
      ctaQuote: "Pedir orçamento",
      ctaWhatsApp: "Falar no WhatsApp",
      altHeroImage: "Sistema de purificação e filtração WF-30 Quifiltro",
    },
    stats: {
      tag: "O NOSSO IMPACTO",
      title: "Soluções de confiança para todo o país",
      subtitle: "Compromisso diário com a qualidade da água em Angola.",
      mapTag: "COBERTURA TOTAL",
      mapTitle: "Entregamos nas 21 províncias de Angola.",
      mapSubtitle: "Equipa técnica e logística pronta para atender a sua necessidade em qualquer ponto do território nacional.",
      provincesBadge: "21 Províncias",
    },
    products: {
      tag: "PRODUTOS",
      title: "Os nossos produtos",
      subtitle: "Escolha os produtos e peça o seu orçamento. Respondemos assim que vermos o seu pedido.",
      addToQuote: "Pedir orçamento",
      addedToQuote: "Adicionado ✓",
      removeFromQuote: "Remover da lista",
    },
    bestsellers: {
      tag: "MAIS PROCURADOS",
      title: "Mais vendidos",
      subtitle: "Os equipamentos de filtração e purificação com maior procura pelas famílias e empresas angolanas.",
      carouselControls: {
        prev: "Cartão anterior",
        next: "Próximo cartão",
        pause: "Pausar animação",
        play: "Reproduzir animação",
      },
    },
    services: {
      tag: "SERVIÇOS",
      title: "Soluções completas de água",
      subtitle: "Acompanhamento profissional desde o aconselhamento técnico à assistência regular.",
    },
    about: {
      tag: "QUEM SOMOS",
      title: "Especialistas em água pura em Angola",
      text: "A Quifiltro ajuda famílias, empresas e indústrias a ter água mais limpa para beber e usar. Vendemos, instalamos e fazemos a manutenção de sistemas de filtração e purificação de água, em todo o território nacional.",
      altPhoto: "Instalação profissional de sistema de filtração pela equipa Quifiltro",
    },
    contacts: {
      tag: "CONTACTOS",
      title: "Fale connosco",
      subtitle: "Estamos disponíveis para tirar as suas dúvidas e preparar a proposta adequada ao seu espaço.",
      whatsappTitle: "Atendimento no WhatsApp",
      whatsappBtn: "Conversar no WhatsApp",
      phoneTitle: "Chamadas telefónicas",
      phoneBtn: "Ligar agora",
      emailTitle: "Correio eletrónico",
      locationTitle: "Localização",
      directionsBtn: "Como chegar no mapa",
      hoursTitle: "Horário de funcionamento",
      visitText: "Pode visitar-nos nas nossas instalações.",
    },
    drawer: {
      title: "Lista de orçamento",
      emptyTitle: "A sua lista está vazia",
      emptyText: "Escolha os equipamentos no catálogo para compor o seu pedido de orçamento.",
      selectedProducts: "Produtos selecionados",
      remove: "Remover",
      formTitle: "Dados para o orçamento",
      nameLabel: "Nome completo *",
      namePlaceholder: "ex.: Manuel Silva",
      phoneLabel: "Número de telefone *",
      phonePlaceholder: "ex.: +244 923 000 000",
      provinceLabel: "Província *",
      provinceSelectPlaceholder: "Selecione a província",
      clientTypeLabel: "Tipo de cliente *",
      clientTypes: {
        casa: "Casa",
        empresa: "Empresa",
        industria: "Indústria",
      },
      messageLabel: "Mensagem (opcional)",
      messagePlaceholder: "Descreva detalhes do local ou da água...",
      privacyConsent: "Ao enviar, aceita o nosso",
      privacyLink: "Aviso de Privacidade",
      submitBtn: "Pedir orçamento",
      submitting: "A processar...",
      successTitle: "Pedido enviado!",
      successMessage: "Respondemos assim que vermos o seu pedido. Obrigado pela confiança na Quifiltro.",
      validationErrors: {
        name: "Por favor, indique o seu nome.",
        phone: "Por favor, indique um telefone válido.",
        province: "Por favor, selecione a província de entrega.",
        clientType: "Por favor, selecione o tipo de cliente.",
        emptyProducts: "Adicione pelo menos um produto à sua lista antes de pedir o orçamento.",
      },
      floatingBtn: "Lista de orçamento",
    },
    privacyModal: {
      title: "Aviso de Privacidade",
      close: "Fechar aviso de privacidade",
      whoWeAreTitle: "Quem somos",
      whoWeAreText: "A Quifiltro é uma empresa angolana especializada em sistemas de filtração e purificação de água, localizada em Talatona, Luanda (email: quifiltrolda@gmail.com).",
      dataCollectedTitle: "Dados recolhidos",
      dataCollectedText: "Recolhemos apenas os dados estritamente necessários para a elaboração e envio do seu orçamento: nome, telefone, província, tipo de cliente (Casa, Empresa ou Indústria), mensagem opcional e a relação dos produtos selecionados.",
      purposeTitle: "Finalidade",
      purposeText: "Os seus dados destinam-se exclusivamente a responder ao seu pedido de orçamento e a prestar os esclarecimentos comerciais solicitados.",
      sharingTitle: "Comunicação e terceiros",
      sharingText: "Os dados podem transitar pelos serviços de envio de formulários e pela plataforma WhatsApp quando optar por concluir o pedido através desse canal. Não vendemos nem partilhamos os seus dados com terceiros para fins de marketing.",
      rightsTitle: "Os seus direitos",
      rightsText: "Pode a qualquer momento solicitar a confirmação, correção ou eliminação dos seus dados de contacto enviando uma mensagem para quifiltrolda@gmail.com.",
      cookiesTitle: "Cookies e armazenamento local",
      cookiesText: "O site não utiliza cookies de publicidade nem de medição/estatística. Apenas guardamos no seu navegador (armazenamento local) as suas preferências técnicas (idioma, tema claro/escuro, modo leve) e a lista temporária de produtos selecionados.",
    },
    footer: {
      tagline: "Mais saúde para sua família.",
      linksTitle: "Navegação",
      contactTitle: "Contactos",
      socialTitle: "Redes sociais",
      privacyLink: "Aviso de Privacidade",
      rightsReserved: "Todos os direitos reservados.",
    },
    liteModeBanner: "Modo leve ativo (economia de dados e movimento reduzido)",
  },
  en: {
    nav: {
      inicio: "Home",
      produtos: "Products",
      maisVendidos: "Bestsellers",
      servicos: "Services",
      quemSomos: "About us",
      contactos: "Contact",
      skipToContent: "Skip to content",
      quickExit: "Quick exit",
      themeToggle: "Toggle light/dark theme",
      liteModeToggle: "Toggle data-saver lite mode",
      languageToggle: "Switch to Portuguese (PT)",
      menuOpen: "Open navigation menu",
      menuClose: "Close menu",
    },
    hero: {
      tag: "WATER SYSTEMS",
      titleLine1: "Drink water.",
      titleLine2: "Preserve life.",
      subtitle: "More health for your family.",
      text: "Water filtration systems, reverse osmosis and water dispensers for homes, businesses and industries across Angola.",
      ctaQuote: "Request a quote",
      ctaWhatsApp: "Chat on WhatsApp",
      altHeroImage: "Quifiltro WF-30 water filtration system",
    },
    stats: {
      tag: "OUR TRACK RECORD",
      title: "Trusted water solutions across Angola",
      subtitle: "Everyday commitment to water quality and reliability.",
      mapTag: "NATIONWIDE REACH",
      mapTitle: "We deliver to all 21 provinces of Angola.",
      mapSubtitle: "Our logistics and technical staff are ready to assist you anywhere in the national territory.",
      provincesBadge: "21 Provinces",
    },
    products: {
      tag: "PRODUCTS",
      title: "Our products",
      subtitle: "Select the equipment you need and request your quote. We respond as soon as we see your request.",
      addToQuote: "Request quote",
      addedToQuote: "Added ✓",
      removeFromQuote: "Remove from list",
    },
    bestsellers: {
      tag: "FEATURED",
      title: "Bestsellers",
      subtitle: "The most requested water filtration and purification equipment for homes and enterprises.",
      carouselControls: {
        prev: "Previous card",
        next: "Next card",
        pause: "Pause animation",
        play: "Play animation",
      },
    },
    services: {
      tag: "SERVICES",
      title: "Complete water solutions",
      subtitle: "End-to-end service from technical consultation to regular preventive maintenance.",
    },
    about: {
      tag: "ABOUT US",
      title: "Pure water specialists in Angola",
      text: "Quifiltro helps families, businesses and industries get cleaner water for drinking and daily use. We sell, install, and service water filtration and purification systems throughout Angola.",
      altPhoto: "Professional installation of water filtration system by Quifiltro staff",
    },
    contacts: {
      tag: "CONTACT US",
      title: "Get in touch",
      subtitle: "We are available to answer your technical questions and prepare a customized proposal.",
      whatsappTitle: "WhatsApp Support",
      whatsappBtn: "Chat on WhatsApp",
      phoneTitle: "Phone Calls",
      phoneBtn: "Call now",
      emailTitle: "Email",
      locationTitle: "Location",
      directionsBtn: "Directions on Maps",
      hoursTitle: "Business Hours",
      visitText: "You are welcome to visit our premises.",
    },
    drawer: {
      title: "Quote request list",
      emptyTitle: "Your quote list is empty",
      emptyText: "Browse our product catalog and add equipment to request an estimate.",
      selectedProducts: "Selected equipment",
      remove: "Remove",
      formTitle: "Quote contact details",
      nameLabel: "Full name *",
      namePlaceholder: "e.g., Manuel Silva",
      phoneLabel: "Phone number *",
      phonePlaceholder: "e.g., +244 923 000 000",
      provinceLabel: "Province *",
      provinceSelectPlaceholder: "Select province",
      clientTypeLabel: "Client type *",
      clientTypes: {
        casa: "Home",
        empresa: "Business",
        industria: "Industry",
      },
      messageLabel: "Message (optional)",
      messagePlaceholder: "Tell us about your water setup or requirements...",
      privacyConsent: "By submitting, you agree to our",
      privacyLink: "Privacy Notice",
      submitBtn: "Request quote",
      submitting: "Processing...",
      successTitle: "Request sent!",
      successMessage: "We respond as soon as we receive your request. Thank you for trusting Quifiltro.",
      validationErrors: {
        name: "Please enter your full name.",
        phone: "Please enter a valid telephone number.",
        province: "Please choose your delivery province.",
        clientType: "Please choose your client type.",
        emptyProducts: "Add at least one product to your quote list before submitting.",
      },
      floatingBtn: "Quote list",
    },
    privacyModal: {
      title: "Privacy Notice",
      close: "Close privacy notice",
      whoWeAreTitle: "Who we are",
      whoWeAreText: "Quifiltro is an Angolan company specializing in water filtration and purification systems, located in Talatona, Luanda (email: quifiltrolda@gmail.com).",
      dataCollectedTitle: "Data collected",
      dataCollectedText: "We collect only information strictly necessary to process your quote request: full name, telephone, province, client type (Home, Business, or Industry), optional message, and selected equipment.",
      purposeTitle: "Purpose of processing",
      purposeText: "Your information is used solely to respond to your inquiry and provide technical/commercial proposals.",
      sharingTitle: "Third-party sharing",
      sharingText: "Data may transit through the form dispatch provider and WhatsApp platform when you submit your quote. We never sell or share your data for advertising purposes.",
      rightsTitle: "Your rights",
      rightsText: "You may at any time request access, rectification, or deletion of your contact details by writing to quifiltrolda@gmail.com.",
      cookiesTitle: "Cookies and local storage",
      cookiesText: "This website does not use tracking, advertising, or marketing cookies. We only store essential technical preferences in your browser (chosen language, dark/light theme, lite mode) and your temporary quote cart.",
    },
    footer: {
      tagline: "More health for your family.",
      linksTitle: "Navigation",
      contactTitle: "Contact",
      socialTitle: "Social Media",
      privacyLink: "Privacy Notice",
      rightsReserved: "All rights reserved.",
    },
    liteModeBanner: "Lite mode active (data-saver & reduced motion enabled)",
  },
};
