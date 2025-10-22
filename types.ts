
export enum PropertyType {
  APARTMENT = 'Apartamento',
  HOUSE = 'Casa',
  LOFT = 'Loft',
  LOT = 'Lote',
  INN = 'Pousada',
  LAND = 'Terreno',
  SMALL_FARM = 'Sítio',
  FARM = 'Fazenda'
}

export enum PropertyCategory {
  URBAN = 'Urbano',
  RURAL = 'Rural'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  category: PropertyCategory;
  address: Address;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  images: string[];
  brokerId: string;
  ownerId: string;
  features: string[];
  isFeatured: boolean;
}

export interface Broker {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  licenseNumber: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
}