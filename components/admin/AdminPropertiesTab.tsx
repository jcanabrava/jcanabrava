import React, { useState } from 'react';
import { Property, Broker, Owner } from '../../types';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import PropertyFormModal from './PropertyFormModal';

interface AdminPropertiesTabProps {
  properties: Property[];
  brokers: Broker[];
  owners: Owner[];
  onSave: (property: Property) => void;
  onDelete: (id: string) => void;
}

const AdminPropertiesTab: React.FC<AdminPropertiesTabProps> = ({ properties, brokers, owners, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handleAddClick = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };
  
  const handleEditClick = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleSave = (property: Property) => {
    onSave(property);
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && <PropertyFormModal property={editingProperty} brokers={brokers} owners={owners} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-gray-800">Gerenciar Imóveis</h2>
        <button 
          onClick={handleAddClick}
          className="bg-brand-red text-white px-4 py-2 rounded-md font-semibold hover:bg-brand-red-dark transition-colors flex items-center space-x-2"
        >
          <PlusCircle size={18} />
          <span>Adicionar Imóvel</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-brand-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Título</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Tipo</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Preço</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Corretor</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="text-brand-gray-700">
            {properties.map((prop) => {
              const broker = brokers.find(b => b.id === prop.brokerId);
              return (
                <tr key={prop.id} className="border-b border-brand-gray-200 hover:bg-brand-gray-50">
                  <td className="py-3 px-4">{prop.title}</td>
                  <td className="py-3 px-4">{prop.type}</td>
                  <td className="py-3 px-4">R$ {prop.price.toLocaleString('pt-BR')}</td>
                  <td className="py-3 px-4">{broker?.name || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => handleEditClick(prop)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                      <button onClick={() => onDelete(prop.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPropertiesTab;