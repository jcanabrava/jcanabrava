import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTIES, BROKERS } from '../constants';
import { MapPin, BedDouble, Bath, Ruler, CheckCircle, Mail, Phone, MessageSquare } from 'lucide-react';

const WhatsAppIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);


const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState<string | null>(null);

  const property = useMemo(() => PROPERTIES.find(p => p.id === id), [id]);
  const broker = useMemo(() => property ? BROKERS.find(b => b.id === property.brokerId) : undefined, [property]);

  if (!property) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-brand-gray-800">Imóvel não encontrado</h1>
        <p className="text-brand-gray-600 mt-4">O imóvel que você está procurando não existe ou foi removido.</p>
        <Link to="/" className="mt-8 inline-block bg-brand-red text-white px-6 py-3 rounded-md font-semibold hover:bg-brand-red-dark transition-colors">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const currentImage = mainImage || property.images[0];

  return (
    <div className="bg-brand-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div>
              <img src={currentImage} alt={property.title} className="w-full h-[400px] object-cover rounded-lg mb-4" />
              <div className="flex space-x-2 overflow-x-auto">
                {property.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${property.title} - view ${index + 1}`}
                    className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 ${currentImage === img ? 'border-brand-red' : 'border-transparent'}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 pb-6 border-b border-brand-gray-200">
              <h1 className="text-4xl font-bold text-brand-gray-900">{property.title}</h1>
              <div className="flex items-center text-brand-gray-600 mt-2">
                <MapPin size={18} className="mr-2 flex-shrink-0" />
                <span>{`${property.address.street}, ${property.address.city}, ${property.address.state}`}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 pb-6 border-b border-brand-gray-200">
              <div className="flex items-center space-x-3">
                <BedDouble size={32} className="text-brand-red" />
                <div>
                  <p className="font-semibold text-lg">{property.bedrooms}</p>
                  <p className="text-sm text-brand-gray-600">Quartos</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Bath size={32} className="text-brand-red" />
                <div>
                  <p className="font-semibold text-lg">{property.bathrooms}</p>
                  <p className="text-sm text-brand-gray-600">Banheiros</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Ruler size={32} className="text-brand-red" />
                <div>
                  <p className="font-semibold text-lg">{property.area} m²</p>
                  <p className="text-sm text-brand-gray-600">Área</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-brand-gray-800 mb-4">Descrição</h2>
              <p className="text-brand-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {property.features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-brand-gray-800 mb-4">Características</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.features.map(feature => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle size={18} className="text-green-500" />
                      <span className="text-brand-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <p className="text-brand-gray-600">Valor do Imóvel</p>
                <p className="text-4xl font-bold text-brand-gray-900 mt-1">
                  R$ {property.price.toLocaleString('pt-BR')}
                </p>
              </div>

              {broker && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-brand-gray-800 mb-4">Fale com o corretor</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-brand-gray-200 flex items-center justify-center text-brand-gray-500 font-bold text-2xl">
                      {broker.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-gray-800">{broker.name}</p>
                      <p className="text-sm text-brand-gray-600">{broker.licenseNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Phone size={16} className="mr-3 text-brand-gray-500"/>
                      <span>{broker.phone}</span>
                    </div>
                    <div className="flex items-center">
                       <Mail size={16} className="mr-3 text-brand-gray-500"/>
                      <span>{broker.email}</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                     {broker.whatsapp && (
                       <a 
                        href={`https://wa.me/${broker.whatsapp}?text=${encodeURIComponent(`Olá, tenho interesse no imóvel: ${property.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                       >
                         <WhatsAppIcon />
                         <span>WhatsApp</span>
                       </a>
                     )}
                    <button className="w-full bg-brand-red text-white font-bold py-3 rounded-md hover:bg-brand-red-dark transition-colors flex items-center justify-center space-x-2">
                      <MessageSquare size={20} />
                      <span>Enviar Mensagem</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;