import React, { useState } from 'react';
import { z } from 'zod';
import { Broker } from '../../types';
import Modal from './Modal';

interface BrokerFormModalProps {
  broker: Broker | null;
  onSave: (broker: Broker) => void;
  onClose: () => void;
}

const brokerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  whatsapp: z.string().optional(),
  licenseNumber: z.string().min(1, "Número da licença é obrigatório"),
});

const BrokerFormModal: React.FC<BrokerFormModalProps> = ({ broker, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: broker?.name || '',
    email: broker?.email || '',
    phone: broker?.phone || '',
    whatsapp: broker?.whatsapp || '',
    licenseNumber: broker?.licenseNumber || '',
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = brokerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSave({ ...formData, id: broker?.id || '' }); // id is handled by parent
  };

  const renderError = (field: string) => errors[field] && <p className="text-sm text-red-600 mt-1">{errors[field]}</p>;

  return (
    <Modal title={broker ? "Editar Corretor" : "Adicionar Corretor"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
          {renderError('name')}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
          {renderError('email')}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
          {renderError('phone')}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">WhatsApp (opcional)</label>
          <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CRECI</label>
          <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
          {renderError('licenseNumber')}
        </div>
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="bg-brand-red text-white px-4 py-2 rounded-md font-semibold hover:bg-brand-red-dark">Salvar</button>
        </div>
      </form>
    </Modal>
  );
};

export default BrokerFormModal;