import React, { useState, useCallback } from 'react';
import { Building, Users, UserSquare } from 'lucide-react';
import { PROPERTIES, BROKERS, OWNERS } from '../constants';
import { Property, Broker, Owner } from '../types';
import AdminPropertiesTab from '../components/admin/AdminPropertiesTab';
import AdminBrokersTab from '../components/admin/AdminBrokersTab';
import AdminOwnersTab from '../components/admin/AdminOwnersTab';

type AdminTab = 'properties' | 'brokers' | 'owners';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('properties');
  
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [brokers, setBrokers] = useState<Broker[]>(BROKERS);
  const [owners, setOwners] = useState<Owner[]>(OWNERS);

  const handleSaveProperty = useCallback((prop: Property) => {
    setProperties(prev => {
      const index = prev.findIndex(p => p.id === prop.id);
      if (index > -1) {
        const newProps = [...prev];
        newProps[index] = prop;
        return newProps;
      }
      return [...prev, { ...prop, id: `prop-${Date.now()}` }];
    });
  }, []);

  const handleDeleteProperty = useCallback((id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleSaveBroker = useCallback((broker: Broker) => {
     setBrokers(prev => {
      const index = prev.findIndex(b => b.id === broker.id);
      if (index > -1) {
        const newBrokers = [...prev];
        newBrokers[index] = broker;
        return newBrokers;
      }
      return [...prev, { ...broker, id: `broker-${Date.now()}` }];
    });
  }, []);

  const handleDeleteBroker = useCallback((id: string) => {
    setBrokers(prev => prev.filter(b => b.id !== id));
  }, []);

 const handleSaveOwner = useCallback((owner: Owner) => {
    setOwners(prev => {
      const index = prev.findIndex(o => o.id === owner.id);
      if (index > -1) {
        const newOwners = [...prev];
        newOwners[index] = owner;
        return newOwners;
      }
      return [...prev, { ...owner, id: `owner-${Date.now()}` }];
    });
  }, []);

  const handleDeleteOwner = useCallback((id: string) => {
    setOwners(prev => prev.filter(o => o.id !== id));
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'properties':
        return <AdminPropertiesTab properties={properties} brokers={brokers} owners={owners} onSave={handleSaveProperty} onDelete={handleDeleteProperty} />;
      case 'brokers':
        return <AdminBrokersTab brokers={brokers} onSave={handleSaveBroker} onDelete={handleDeleteBroker} />;
      case 'owners':
        return <AdminOwnersTab owners={owners} onSave={handleSaveOwner} onDelete={handleDeleteOwner} />;
      default:
        return null;
    }
  };

  const TabButton = ({ tabName, icon: Icon, label }: { tabName: AdminTab, icon: React.ElementType, label: string }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center space-x-2 px-4 py-3 font-semibold rounded-t-lg transition-colors ${
        activeTab === tabName
          ? 'bg-white text-brand-red border-b-2 border-brand-red'
          : 'bg-transparent text-brand-gray-600 hover:bg-brand-gray-200'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-brand-gray-800 mb-8">Painel Administrativo</h1>
      <div className="flex border-b border-brand-gray-300">
        <TabButton tabName="properties" icon={Building} label="Imóveis" />
        <TabButton tabName="brokers" icon={Users} label="Corretores" />
        <TabButton tabName="owners" icon={UserSquare} label="Proprietários" />
      </div>
      <div className="bg-white p-6 rounded-b-lg shadow-md">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPage;