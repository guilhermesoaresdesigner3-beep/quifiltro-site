import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const productsDir = path.resolve('public/products');
const productsSmDir = path.resolve('public/products/sm');
const aboutDir = path.resolve('public/about');

fs.mkdirSync(productsDir, { recursive: true });
fs.mkdirSync(productsSmDir, { recursive: true });
fs.mkdirSync(aboutDir, { recursive: true });

// 1. Quifiltro Logo (Standard & White)
const createLogoSvg = (isWhite = false) => `
<svg width="600" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00D2FF" />
      <stop offset="60%" stop-color="#00B4F0" />
      <stop offset="100%" stop-color="#1E7BFF" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Gota de Água Estilizada com Ondulações Internas -->
  <g transform="translate(40, 15)">
    <path d="M 50 10 C 50 10 15 65 15 88 C 15 110 32 125 50 125 C 68 125 85 110 85 88 C 85 65 50 10 50 10 Z" fill="url(#dropGrad)" filter="url(#glow)"/>
    <path d="M 50 25 C 50 25 28 68 28 85 C 28 92 31 100 37 105 C 33 97 34 88 40 80 C 47 70 50 48 50 25 Z" fill="#FFFFFF" opacity="0.45"/>
    <circle cx="50" cy="85" r="9" fill="#FFFFFF" opacity="0.85"/>
  </g>

  <!-- Tipografia Quifiltro -->
  <text x="160" y="90" font-family="'Montserrat', sans-serif" font-size="52" font-weight="800" letter-spacing="-0.5" fill="${isWhite ? '#FFFFFF' : '#062E73'}">
    QUI<tspan fill="#00B4F0">FILTRO</tspan>
  </text>
  <text x="162" y="116" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600" letter-spacing="4" fill="${isWhite ? '#CFE6FF' : '#0A4BB5'}">
    FILTRAÇÃO &amp; PURIFICAÇÃO DE ÁGUA
  </text>
</svg>
`;

// 2. Imagem da Secção Quem Somos (Técnico / Instalação)
const createInstallationSvg = () => `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020B24" />
      <stop offset="50%" stop-color="#061A4A" />
      <stop offset="100%" stop-color="#0A3A8F" />
    </linearGradient>
    <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1E7BFF" />
      <stop offset="50%" stop-color="#00B4F0" />
      <stop offset="100%" stop-color="#CFE6FF" />
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bgGrad)" rx="24"/>
  
  <!-- Linhas técnicas de circuito de água -->
  <g stroke="#00B4F0" stroke-width="2" opacity="0.35" fill="none">
    <path d="M 50 100 H 750 V 500 H 50 Z" />
    <path d="M 120 150 V 450 M 240 150 V 450 M 360 150 V 450 M 480 150 V 450 M 600 150 V 450" />
    <circle cx="400" cy="300" r="180" stroke-dasharray="8 8" />
  </g>

  <!-- Filtro Central Moderno Instalado -->
  <g transform="translate(260, 100)">
    <!-- Base e Carcaça Tripla -->
    <rect x="0" y="40" width="280" height="40" rx="8" fill="#0A4BB5" stroke="#00B4F0" stroke-width="2"/>
    <!-- Manômetro -->
    <circle cx="140" cy="20" r="18" fill="#FFFFFF" stroke="#00B4F0" stroke-width="3"/>
    <line x1="140" y1="20" x2="148" y2="12" stroke="#1E7BFF" stroke-width="2"/>

    <!-- 3 Cilindros Translúcidos com água pura -->
    <rect x="15" y="85" width="65" height="260" rx="14" fill="#00B4F0" fill-opacity="0.25" stroke="#00B4F0" stroke-width="2"/>
    <rect x="105" y="85" width="70" height="260" rx="14" fill="#1E7BFF" fill-opacity="0.3" stroke="#00B4F0" stroke-width="2"/>
    <rect x="200" y="85" width="65" height="260" rx="14" fill="#00B4F0" fill-opacity="0.25" stroke="#00B4F0" stroke-width="2"/>

    <!-- Elementos filtrantes internos -->
    <rect x="25" y="105" width="45" height="220" rx="8" fill="#FFFFFF" opacity="0.8"/>
    <rect x="115" y="105" width="50" height="220" rx="8" fill="#1E293B" opacity="0.85"/>
    <rect x="210" y="105" width="45" height="220" rx="8" fill="#E2E8F0" opacity="0.8"/>

    <!-- Tubulações de inox polido -->
    <path d="M -60 60 H 0 M 280 60 H 340 V 380 H 220" stroke="url(#pipeGrad)" stroke-width="8" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Brilho e Crachá de Qualidade Quifiltro -->
  <circle cx="400" cy="460" r="45" fill="#00B4F0" fill-opacity="0.2" />
  <text x="400" y="520" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">
    MONTAGEM &amp; MANUTENÇÃO CERTIFICADA
  </text>
  <text x="400" y="545" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="500" fill="#CFE6FF">
    Técnicos qualificados em todo o território angolano
  </text>
</svg>
`;

// 3. Gerador de Produtos Realistas em Vetor
const createProductSvg = (id, name, category) => {
  let graphic = '';

  if (id.includes('wf30')) {
    const is3Cups = id.includes('3-copos');
    graphic = `
      <!-- WF-30 Suporte Superior -->
      <rect x="120" y="90" width="${is3Cups ? 360 : 260}" height="45" rx="10" fill="#0A3A8F" stroke="#00B4F0" stroke-width="3"/>
      <!-- Conectores e Manômetro -->
      <circle cx="${is3Cups ? 300 : 250}" cy="65" r="22" fill="#FFFFFF" stroke="#00B4F0" stroke-width="3"/>
      <line x1="${is3Cups ? 300 : 250}" y1="65" x2="${is3Cups ? 312 : 262}" cy2="56" stroke="#1E7BFF" stroke-width="3"/>
      <!-- Copos Filtrantes Azuis Translúcidos -->
      <rect x="135" y="140" width="95" height="320" rx="16" fill="#00B4F0" fill-opacity="0.3" stroke="#00B4F0" stroke-width="3"/>
      <rect x="150" y="160" width="65" height="270" rx="8" fill="#FFFFFF" opacity="0.85"/>
      <rect x="250" y="140" width="95" height="320" rx="16" fill="#1E7BFF" fill-opacity="0.3" stroke="#00B4F0" stroke-width="3"/>
      <rect x="265" y="160" width="65" height="270" rx="8" fill="#04122E" opacity="0.7"/>
      ${is3Cups ? `
      <rect x="365" y="140" width="95" height="320" rx="16" fill="#00B4F0" fill-opacity="0.3" stroke="#00B4F0" stroke-width="3"/>
      <rect x="380" y="160" width="65" height="270" rx="8" fill="#F8FAFC" opacity="0.9"/>
      ` : ''}
    `;
  } else if (id.includes('osmose-reversa')) {
    graphic = `
      <!-- Sistema de Osmose Reversa com Tanque Pressurizado e Membrana -->
      <!-- Tanque de Pressão -->
      <ellipse cx="190" cy="240" rx="90" ry="110" fill="#F8FAFC" stroke="#00B4F0" stroke-width="3"/>
      <rect x="175" y="115" width="30" height="25" fill="#0A4BB5" rx="4"/>
      <!-- Cartuchos Triplos da Base -->
      <rect x="310" y="120" width="220" height="35" rx="6" fill="#0A3A8F" stroke="#00B4F0" stroke-width="2"/>
      <rect x="320" y="160" width="55" height="200" rx="10" fill="#00B4F0" fill-opacity="0.3" stroke="#00B4F0" stroke-width="2"/>
      <rect x="390" y="160" width="55" height="200" rx="10" fill="#1E7BFF" fill-opacity="0.3" stroke="#00B4F0" stroke-width="2"/>
      <rect x="460" y="160" width="55" height="200" rx="10" fill="#00B4F0" fill-opacity="0.3" stroke="#00B4F0" stroke-width="2"/>
      <!-- Membrana Superior Horizontal -->
      <rect x="300" y="70" width="240" height="42" rx="21" fill="#FFFFFF" stroke="#00B4F0" stroke-width="3"/>
      <path d="M 270 200 C 270 120 300 85 320 85" fill="none" stroke="#00B4F0" stroke-width="4"/>
      <!-- Torneira de Água Purificada -->
      <path d="M 540 280 V 220 Q 540 180 510 180 H 490" fill="none" stroke="#E2E8F0" stroke-width="6" stroke-linecap="round"/>
    `;
  } else if (id.includes('dwp-816s') || id.includes('bebedouro')) {
    const isMini = id.includes('mini');
    const isMangole = id.includes('mangole');
    graphic = `
      <!-- Bebedouro Moderno Quifiltro -->
      <rect x="${isMini ? 190 : 210}" y="${isMini ? 120 : 60}" width="${isMini ? 220 : 180}" height="${isMini ? 340 : 440}" rx="18" fill="#FFFFFF" stroke="#00B4F0" stroke-width="3"/>
      <!-- Área de Dispensa com Torneiras Quente/Fria -->
      <rect x="${isMini ? 215 : 230}" y="${isMini ? 170 : 130}" width="${isMini ? 170 : 140}" height="140" rx="10" fill="#061A4A" stroke="#00B4F0" stroke-width="2"/>
      <!-- Bicas de Água -->
      <circle cx="${isMini ? 260 : 270}" cy="${isMini ? 200 : 160}" r="12" fill="#1E7BFF"/>
      <circle cx="${isMini ? 340 : 330}" cy="${isMini ? 200 : 160}" r="12" fill="#EF4444"/>
      <!-- Bandeja Pingadeira -->
      <rect x="${isMini ? 225 : 240}" y="${isMini ? 290 : 250}" width="${isMini ? 150 : 120}" height="15" rx="4" fill="#94A3B8"/>
      <!-- Garrafão Superior ou Conexão Direta -->
      ${isMangole ? `
      <ellipse cx="300" cy="70" rx="60" ry="40" fill="#00B4F0" fill-opacity="0.5" stroke="#00B4F0" stroke-width="2"/>
      ` : `
      <circle cx="300" cy="${isMini ? 145 : 95}" r="8" fill="#00B4F0"/>
      `}
      <!-- Logo do Produto -->
      <text x="300" y="${isMini ? 400 : 380}" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" fill="#062E73">
        QUIFILTRO
      </text>
    `;
  } else if (id.includes('big-blue')) {
    const isMini = id.includes('mini');
    graphic = `
      <!-- Carcaça Industrial Big Blue (Corpo Azul Profundo Resistente) -->
      <!-- Cabeçote com Válvula de Alívio -->
      <rect x="200" y="80" width="200" height="60" rx="12" fill="#04122E" stroke="#00B4F0" stroke-width="3"/>
      <circle cx="300" cy="65" r="14" fill="#EF4444" stroke="#FFFFFF" stroke-width="2"/>
      <!-- Conexões 1" -->
      <rect x="155" y="95" width="45" height="30" rx="4" fill="#0A3A8F"/>
      <rect x="400" y="95" width="45" height="30" rx="4" fill="#0A3A8F"/>
      <!-- Vaso Big Blue Robusto -->
      <rect x="215" y="145" width="170" height="${isMini ? 240 : 340}" rx="20" fill="#0A4BB5" stroke="#00B4F0" stroke-width="3"/>
      <!-- Estrias de Reforço Estrutural -->
      <line x1="240" y1="165" x2="240" y2="${isMini ? 365 : 465}" stroke="#1E7BFF" stroke-width="4"/>
      <line x1="270" y1="165" x2="270" y2="${isMini ? 365 : 465}" stroke="#00B4F0" stroke-width="3"/>
      <line x1="300" y1="165" x2="300" y2="${isMini ? 365 : 465}" stroke="#1E7BFF" stroke-width="4"/>
      <line x1="330" y1="165" x2="330" y2="${isMini ? 365 : 465}" stroke="#00B4F0" stroke-width="3"/>
      <line x1="360" y1="165" x2="360" y2="${isMini ? 365 : 465}" stroke="#1E7BFF" stroke-width="4"/>
    `;
  } else {
    // Cartucho filtrante
    graphic = `
      <!-- Cartucho Filtrante de Polipropileno e Carvão Ativado -->
      <rect x="230" y="80" width="140" height="380" rx="18" fill="#F8FAFC" stroke="#00B4F0" stroke-width="3"/>
      <!-- Ranhuras do cartucho plissado/ranhurado -->
      ${Array.from({ length: 14 }).map((_, i) => `
        <line x1="230" y1="${110 + i * 24}" x2="370" y2="${110 + i * 24}" stroke="#CBD5E1" stroke-width="2"/>
      `).join('')}
      <!-- Anel de vedação de silicone topo e fundo -->
      <rect x="220" y="72" width="160" height="16" rx="4" fill="#00B4F0"/>
      <rect x="220" y="452" width="160" height="16" rx="4" fill="#00B4F0"/>
      <!-- Núcleo central perfurado -->
      <rect x="285" y="65" width="30" height="410" rx="6" fill="#0A3A8F" opacity="0.6"/>
    `;
  }

  return `
  <svg width="600" height="540" viewBox="0 0 600 540" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Brilho radial claro conforme regra do prompt: branco 14% para transparente -->
      <radialGradient id="productHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.28" />
        <stop offset="60%" stop-color="#00B4F0" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#00B4F0" stop-opacity="0" />
      </radialGradient>
      <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#00B4F0" flood-opacity="0.3"/>
      </filter>
    </defs>

    <!-- Halo luminoso de fundo -->
    <circle cx="300" cy="270" r="230" fill="url(#productHalo)"/>

    <!-- Elemento Gráfico Central do Produto -->
    <g filter="url(#dropShadow)">
      ${graphic}
    </g>

    <!-- Etiqueta de Marca -->
    <text x="300" y="515" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700" letter-spacing="1" fill="#00B4F0">
      QUIFILTRO ANGOLA
    </text>
  </svg>
  `;
};

async function buildAssets() {
  console.log('Rendering Quifiltro vector graphics into high-fidelity WebP and PNG assets...');

  // 1. Logos
  const logoLightSvg = Buffer.from(createLogoSvg(false));
  const logoWhiteSvg = Buffer.from(createLogoSvg(true));
  await sharp(logoLightSvg).png().toFile(path.join(publicDir, 'logo.png'));
  await sharp(logoWhiteSvg).png().toFile(path.join(publicDir, 'logo-white.png'));

  // 2. About section image
  const installSvg = Buffer.from(createInstallationSvg());
  await sharp(installSvg).webp({ quality: 90 }).toFile(path.join(aboutDir, 'installation.webp'));

  // 3. Products
  const products = [
    { id: 'wf30-2-copos', name: 'WF-30 · 2 copos', category: 'sistemas-de-filtracao' },
    { id: 'wf30-3-copos', name: 'WF-30 · 3 copos', category: 'sistemas-de-filtracao' },
    { id: 'osmose-reversa-sistema', name: 'Sistema de Osmose Reversa', category: 'osmose-reversa' },
    { id: 'osmose-reversa-quifiltro', name: 'Osmose Reversa Quifiltro', category: 'osmose-reversa' },
    { id: 'dwp-816s-mini', name: 'Bebedouro DWP 816S · Mini', category: 'bebedouros' },
    { id: 'dwp-816s-grande', name: 'Bebedouro DWP 816S · Grande', category: 'bebedouros' },
    { id: 'bebedouro-mangole', name: 'Bebedouro Mangolé', category: 'bebedouros' },
    { id: 'big-blue', name: 'Big Blue', category: 'filtros-e-carcacas' },
    { id: 'big-blue-mini', name: 'Big Blue Mini', category: 'filtros-e-carcacas' },
    { id: 'cartucho-filtrante', name: 'Cartucho filtrante', category: 'filtros-e-carcacas' },
  ];

  for (const prod of products) {
    const prodSvg = Buffer.from(createProductSvg(prod.id, prod.name, prod.category));
    // Standard size WebP
    await sharp(prodSvg).resize(600, 540).webp({ quality: 90 }).toFile(path.join(productsDir, `${prod.id}.webp`));
    // Small size WebP (lite mode)
    await sharp(prodSvg).resize(300, 270).webp({ quality: 75 }).toFile(path.join(productsSmDir, `${prod.id}.webp`));
  }

  console.log('Successfully generated all placeholder assets in /public !');
}

buildAssets().catch(err => {
  console.error('Failed to generate assets:', err);
  process.exit(1);
});
