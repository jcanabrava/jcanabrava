import React from 'react';
import { Building2, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray-800 text-brand-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="w-8 h-8 text-brand-red" />
              <span className="text-2xl font-bold text-white">Imovelna<span className="text-brand-red">Web.com</span></span>
            </div>
            <p className="text-sm">Encontre o imóvel dos seus sonhos conosco.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white">Carreiras</a></li>
              <li><a href="#" className="hover:text-white">Imprensa</a></li>
              <li><a href="#" className="hover:text-white">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Anunciantes</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Anuncie seu Imóvel</a></li>
              <li><a href="#" className="hover:text-white">Planos e Preços</a></li>
              <li><a href="#" className="hover:text-white">Portal do Corretor</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ImovelnaWeb.com. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;