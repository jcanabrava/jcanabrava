import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { Property, Broker, Owner, PropertyType, PropertyCategory } from '../../types';
import Modal from './Modal';
import { UploadCloud, X } from 'lucide-react';

interface PropertyFormModalProps {
  property: Property | null;
  brokers: Broker[];
  owners: Owner[];
  onSave: (property: Property) => void;
  onClose: () => void;
}

const propertySchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z.number().min(0, "Preço deve ser positivo"),
  type: z.nativeEnum(PropertyType),
  category: z.nativeEnum(PropertyCategory),
  address: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(1, "Estado é obrigatório"),
    zipCode: z.string().min(1, "CEP é obrigatório"),
  }),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  area: z.number().min(0),
  brokerId: z.string().min(1, "Corretor é obrigatório"),
  ownerId: z.string().min(1, "Proprietário é obrigatório"),
});


const PropertyFormModal: React.FC<PropertyFormModalProps> = ({ property, brokers, owners, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Property, 'id' | 'images' | 'features' | 'isFeatured'>>({
    title: property?.title || '',
    description: property?.description || '',
    price: property?.price || 0,
    type: property?.type || PropertyType.APARTMENT,
    category: property?.category || PropertyCategory.URBAN,
    address: property?.address || { street: '', city: '', state: '', zipCode: '' },
    bedrooms: property?.bedrooms || 0,
    bathrooms: property?.bathrooms || 0,
    area: property?.area || 0,
    brokerId: property?.brokerId || '',
    ownerId: property?.ownerId || '',
  });
  const [images, setImages] = useState<string[]>(property?.images || []);
  const [features, setFeatures] = useState(property?.features?.join(', ') || '');
  const [isFeatured, setIsFeatured] = useState(property?.isFeatured || false);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumeric = ['price', 'bedrooms', 'bathrooms', 'area'].includes(name);
    
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : isNumeric ? Number(value) : value,
    }));
  };
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        address: {
            ...prev.address,
            [name]: value
        }
    }));
  };

  const handleImageDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      }
    });
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = propertySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach(err => {
        const path = err.path.join('.');
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    const finalProperty: Property = {
        ...formData,
        id: property?.id || '', // Handled by parent
        images: images,
        features: features.split(',').map(s => s.trim()).filter(Boolean),
        isFeatured: isFeatured,
    };
    onSave(finalProperty);
  };

  const renderError = (field: string) => errors[field] && <p className="text-sm text-red-600 mt-1">{errors[field]}</p>;
  
  return (
    <Modal title={property ? "Editar Imóvel" : "Adicionar Imóvel"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
            {renderError('title')}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
            {renderError('price')}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red">
              {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {renderError('type')}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red">
              {Object.values(PropertyCategory).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {renderError('category')}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Corretor</label>
            <select name="brokerId" value={formData.brokerId} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red">
              <option value="">Selecione</option>
              {brokers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
             {renderError('brokerId')}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Proprietário</label>
            <select name="ownerId" value={formData.ownerId} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red">
                <option value="">Selecione</option>
              {owners.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
             {renderError('ownerId')}
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"></textarea>
            {renderError('description')}
        </div>
        
        <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-medium text-gray-700 px-2">Endereço</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Rua</label>
                    <input type="text" name="street" value={formData.address.street} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
                    {renderError('address.street')}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Cidade</label>
                    <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
                    {renderError('address.city')}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <input type="text" name="state" value={formData.address.state} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
                     {renderError('address.state')}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">CEP</label>
                    <input type="text" name="zipCode" value={formData.address.zipCode} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
                     {renderError('address.zipCode')}
                </div>
            </div>
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Quartos</label>
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
                {renderError('bedrooms')}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Banheiros</label>
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
                {renderError('bathrooms')}
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Área (m²)</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
                 {renderError('area')}
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagens do Imóvel</label>
            <label 
              htmlFor="image-upload" 
              className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={handleImageDrop}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para enviar</span> ou arraste e solte</p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP, etc.</p>
              </div>
              <input id="image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>

            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img src={image} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-md" />
                            <button 
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>

         <div>
            <label className="block text-sm font-medium text-gray-700">Características (separadas por vírgula)</label>
            <input type="text" value={features} onChange={(e) => setFeatures(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-red focus:border-brand-red"/>
        </div>

        <div className="flex items-center">
            <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"/>
            <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">Imóvel em Destaque</label>
        </div>


        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="bg-brand-red text-white px-4 py-2 rounded-md font-semibold hover:bg-brand-red-dark">Salvar</button>
        </div>
      </form>
    </Modal>
  );
};

export default PropertyFormModal;