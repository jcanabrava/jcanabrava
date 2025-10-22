
import React from 'react';
import { MapPin, BedDouble, Bath, Car, Ruler } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
      <img src={property.images[0]} alt={property.title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <p className="text-2xl font-bold text-brand-gray-800">
          R$ {property.price.toLocaleString('pt-BR')}
        </p>
        <h3 className="text-lg font-semibold text-brand-gray-900 mt-2 truncate">{property.title}</h3>
        <div className="flex items-center text-brand-gray-600 mt-1">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span className="truncate">{property.address.city}, {property.address.state}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-brand-gray-200 flex justify-between text-sm text-brand-gray-700">
          <div className="flex items-center space-x-2">
            <BedDouble size={20} />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bath size={20} />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Ruler size={20} />
            <span>{property.area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
