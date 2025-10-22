import React, { useState } from 'react';
import { Owner } from '../../types';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import OwnerFormModal from './OwnerFormModal';

interface AdminOwnersTabProps {
  owners: Owner[];
  onSave: (owner: Owner) => void;
  onDelete: (id: string) => void;
}

const AdminOwnersTab: React.FC<AdminOwnersTabProps> = ({ owners, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);

  const handleAddClick = () => {
    setEditingOwner(null);
    setIsModalOpen(true);
  };
  
  const handleEditClick = (owner: Owner) => {
    setEditingOwner(owner);
    setIsModalOpen(true);
  };

  const handleSave = (owner: Owner) => {
    onSave(owner);
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && <OwnerFormModal owner={editingOwner} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-gray-800">Gerenciar Proprietários</h2>
        <button 
          onClick={handleAddClick}
          className="bg-brand-red text-white px-4 py-2 rounded-md font-semibold hover:bg-brand-red-dark transition-colors flex items-center space-x-2">
           <PlusCircle size={18} />
          <span>Adicionar Proprietário</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-brand-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Nome</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Telefone</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-brand-gray-600 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="text-brand-gray-700">
            {owners.map((owner) => (
              <tr key={owner.id} className="border-b border-brand-gray-200 hover:bg-brand-gray-50">
                <td className="py-3 px-4">{owner.name}</td>
                <td className="py-3 px-4">{owner.email}</td>
                <td className="py-3 px-4">{owner.phone}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleEditClick(owner)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                    <button onClick={() => onDelete(owner.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
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

export default AdminOwnersTab;