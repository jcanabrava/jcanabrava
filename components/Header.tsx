import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Building2, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeLinkClass = "text-brand-red font-semibold";
  const inactiveLinkClass = "text-brand-gray-600 hover:text-brand-red transition-colors";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-brand-red" />
            <span className="text-2xl font-bold text-brand-gray-800">Imovelna<span className="text-brand-red">Web.com</span></span>
          </Link>
          <nav className="flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
            >
              Início
            </NavLink>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
            >
              Área Administrativa
            </NavLink>
            <button className="bg-brand-red text-white px-4 py-2 rounded-md font-semibold hover:bg-brand-red-dark transition-colors">
              Anunciar Imóvel
            </button>
            {isAuthenticated && (
              <button onClick={handleLogout} className="text-brand-gray-600 hover:text-brand-red transition-colors flex items-center space-x-1">
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;