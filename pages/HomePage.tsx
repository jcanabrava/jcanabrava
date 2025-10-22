import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { PROPERTIES } from '../constants';
import { Property, PropertyType } from '../types';
import { Search, MapPin, Building, Home, DollarSign } from 'lucide-react';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>('all');

  const featuredProperties = useMemo(() => {
    return PROPERTIES.filter(p => p.isFeatured)
      .filter(p => propertyType === 'all' || p.type === propertyType)
      .filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.address.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, propertyType]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[550px] sm:h-[500px]" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Encontre o imóvel ideal para você</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">Milhares de casas, apartamentos e terrenos para alugar ou comprar.</p>
          
          <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-2xl text-brand-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input
                  type="text"
                  placeholder="Cidade, bairro ou rua..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input type="text" placeholder="Preço até" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red" />
              </div>
              <button className="w-full bg-brand-red text-white font-bold py-3 rounded-md hover:bg-brand-red-dark transition-colors flex items-center justify-center">
                <Search size={20} className="mr-2"/>
                Buscar
              </button>
            </div>
            <div className="pt-4 mt-4 border-t border-brand-gray-200">
              <div className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => setPropertyType('all')}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                    propertyType === 'all' 
                      ? 'bg-brand-red text-white shadow' 
                      : 'bg-brand-gray-200 text-brand-gray-700 hover:bg-brand-gray-300'
                  }`}
                >
                  Todos os Tipos
                </button>
                {Object.values(PropertyType).map(type => (
                  <button 
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                      propertyType === type 
                        ? 'bg-brand-red text-white shadow' 
                        : 'bg-brand-gray-200 text-brand-gray-700 hover:bg-brand-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-brand-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-brand-gray-800 mb-2">Imóveis em Destaque</h2>
          <p className="text-center text-brand-gray-600 mb-12">As melhores oportunidades selecionadas para você.</p>
          
          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <Link to={`/property/${property.id}`} key={property.id}>
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-brand-gray-600">Nenhum imóvel encontrado com os critérios selecionados.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;