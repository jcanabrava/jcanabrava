
import { Property, Broker, Owner, PropertyType, PropertyCategory } from './types';

export const BROKERS: Broker[] = [
  { id: 'broker-1', name: 'Carlos Ferreira', email: 'carlos.f@imoveis.com', phone: '(11) 98765-4321', whatsapp: '5511987654321', licenseNumber: 'CRECI-SP 12345' },
  { id: 'broker-2', name: 'Ana Souza', email: 'ana.s@imoveis.com', phone: '(21) 91234-5678', whatsapp: '5521912345678', licenseNumber: 'CRECI-RJ 54321' }
];

export const OWNERS: Owner[] = [
  { id: 'owner-1', name: 'Marcos Silva', email: 'marcos@email.com', phone: '(31) 99999-8888' },
  { id: 'owner-2', name: 'Juliana Pereira', email: 'juliana@email.com', phone: '(41) 98888-7777' },
  { id: 'owner-3', name: 'Ricardo Oliveira', email: 'ricardo@email.com', phone: '(51) 97777-6666' }
];

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Apartamento Moderno no Centro',
    description: 'Lindo apartamento com 3 quartos, suíte e varanda gourmet. Totalmente mobiliado e com vista para o parque da cidade.',
    price: 750000,
    type: PropertyType.APARTMENT,
    category: PropertyCategory.URBAN,
    address: { street: 'Av. Paulista, 1000', city: 'São Paulo', state: 'SP', zipCode: '01310-100' },
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: ['https://picsum.photos/seed/prop1/800/600', 'https://picsum.photos/seed/prop1-2/800/600'],
    brokerId: 'broker-1',
    ownerId: 'owner-1',
    features: ['Piscina', 'Academia', 'Salão de Festas', 'Portaria 24h'],
    isFeatured: true
  },
  {
    id: 'prop-2',
    title: 'Casa Espaçosa com Piscina',
    description: 'Casa de condomínio com 4 suítes, amplo jardim, piscina e área de churrasqueira. Perfeita para famílias.',
    price: 1200000,
    type: PropertyType.HOUSE,
    category: PropertyCategory.URBAN,
    address: { street: 'Rua das Flores, 50', city: 'Rio de Janeiro', state: 'RJ', zipCode: '22050-002' },
    bedrooms: 4,
    bathrooms: 5,
    area: 300,
    images: ['https://picsum.photos/seed/prop2/800/600', 'https://picsum.photos/seed/prop2-2/800/600'],
    brokerId: 'broker-2',
    ownerId: 'owner-2',
    features: ['Piscina', 'Churrasqueira', 'Jardim', 'Garagem para 4 carros'],
    isFeatured: true
  },
  {
    id: 'prop-3',
    title: 'Sítio Aconchegante nas Montanhas',
    description: 'Sítio com casa principal, casa de caseiro, lago para pesca e muita área verde. Ideal para descanso.',
    price: 980000,
    type: PropertyType.SMALL_FARM,
    category: PropertyCategory.RURAL,
    address: { street: 'Estrada da Montanha, km 5', city: 'Petrópolis', state: 'RJ', zipCode: '25651-070' },
    bedrooms: 5,
    bathrooms: 4,
    area: 50000,
    images: ['https://picsum.photos/seed/prop3/800/600', 'https://picsum.photos/seed/prop3-2/800/600'],
    brokerId: 'broker-2',
    ownerId: 'owner-3',
    features: ['Lago', 'Pomar', 'Casa de Caseiro', 'Nascente'],
    isFeatured: false
  },
   {
    id: 'prop-4',
    title: 'Loft Industrial em Área Nobre',
    description: 'Loft com pé direito duplo, design industrial e acabamentos de alta qualidade. Conceito aberto e moderno.',
    price: 650000,
    type: PropertyType.LOFT,
    category: PropertyCategory.URBAN,
    address: { street: 'Rua Oscar Freire, 200', city: 'São Paulo', state: 'SP', zipCode: '01426-000' },
    bedrooms: 1,
    bathrooms: 2,
    area: 90,
    images: ['https://picsum.photos/seed/prop4/800/600'],
    brokerId: 'broker-1',
    ownerId: 'owner-1',
    features: ['Pé Direito Duplo', 'Design Moderno', 'Cozinha Americana'],
    isFeatured: true
  },
  {
    id: 'prop-5',
    title: 'Terreno Plano em Condomínio Fechado',
    description: 'Excelente terreno plano, pronto para construir, em condomínio com infraestrutura completa de lazer e segurança.',
    price: 350000,
    type: PropertyType.LAND,
    category: PropertyCategory.URBAN,
    address: { street: 'Condomínio Vale Verde, Lote 25', city: 'Curitiba', state: 'PR', zipCode: '80010-010' },
    bedrooms: 0,
    bathrooms: 0,
    area: 1000,
    images: ['https://picsum.photos/seed/prop5/800/600'],
    brokerId: 'broker-1',
    ownerId: 'owner-2',
    features: ['Segurança 24h', 'Clube', 'Área Verde'],
    isFeatured: false
  },
  {
    id: 'prop-6',
    title: 'Fazenda Produtiva com Sede Histórica',
    description: 'Fazenda com grande área para plantio e criação, com sede histórica preservada. Inclui maquinário.',
    price: 5500000,
    type: PropertyType.FARM,
    category: PropertyCategory.RURAL,
    address: { street: 'Rodovia BR-116, km 300', city: 'Juiz de Fora', state: 'MG', zipCode: '36030-000' },
    bedrooms: 8,
    bathrooms: 10,
    area: 1000000,
    images: ['https://picsum.photos/seed/prop6/800/600'],
    brokerId: 'broker-2',
    ownerId: 'owner-3',
    features: ['Sede Histórica', 'Curral', 'Maquinário', 'Rio'],
    isFeatured: true
  },
];