import React, { useState } from 'react';
import { Broker } from '../../types';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import BrokerFormModal from './BrokerFormModal';

interface AdminBrokersTabProps {
  brokers: Broker[];
  onSave: (broker: Broker) => void;
  onDelete: (id: string) => void;
}

const AdminBrokersTab: React.FC<AdminBrokersTabProps> = ({ brokers, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBroker, setEditingBroker] = useState<Broker | null>(null);

  const handleAddClick = () => {
    setEditingBroker(null);
    setIsModalOpen(true);
  };
  
  const handleEditClick = (broker: Broker) => {
    setEditingBroker(broker);
    setIsModalOpen(true);
  };

  const handleSave = (broker: Broker) => {
    onSave(broker);
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && <BrokerFormModal broker={editingBroker} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-gray-800">Gerenciar Corretores</h2>
        <button 
          onClick={handleAddClick}
          className="bg-brand-red text-white px-4 py-2 rounded-md font-semibold hover:bg-brand-red-dark transition-colors flex items-center space-x-2">
          <PlusCircle size={18}/>
          <span>Adicionar Corretor</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-brand-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Nome</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Telefone</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">CRECI</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="text-brand-gray-700">
            {brokers.map((broker) => (
              <tr key={broker.id} className="border-b border-brand-gray-200 hover:bg-brand-gray-50">
                <td className="py-3 px-4">{broker.name}</td>
                <td className="py-3 px-4">{broker.email}</td>
                <td className="py-3 px-4">{broker.phone}</td>
                <td className="py-3 px-4">{broker.licenseNumber}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleEditClick(broker)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                    <button onClick={() => onDelete(broker.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBrokersTab;