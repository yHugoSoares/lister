import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    nav_listings: "Listings",
    nav_buy: "Buy",
    nav_sell: "Sell",
    nav_news: "News",
    hero_title: "Find the Property of Your Dreams",
    hero_subtitle: "Discover the perfect property or connect with eager buyers. Your journey starts here.",
    hero_buy_btn: "Search Property",
    hero_sell_btn: "Receive Professional Proposals",
    featured_title: "Featured Properties",
    featured_subtitle: "Explore our most exclusive and sought-after listings available right now.",
    agents_title: "Featured Agents",
    agents_subtitle: "Work with the top-rated real estate professionals in the industry.",
    why_title: "Why Choose Lister?",
    why_subtitle: "We offer a seamless experience for both buyers and sellers, with advanced search filters, expert guidance, and a secure platform for all your real estate needs.",
    feature_1_title: "Vast Listings",
    feature_1_desc: "Explore thousands of properties tailored to your preferences.",
    feature_2_title: "Expert Agents",
    feature_2_desc: "Connect with experienced agents ready to assist you.",
    feature_3_title: "Secure Transactions",
    feature_3_desc: "Our platform ensures safe and transparent dealings.",
    footer_rights: "All rights reserved.",
    login_buyer_title: "Buyer Login",
    login_seller_title: "Seller Login",
    login_welcome: "Welcome Back!",
    login_buyer_desc: "Sign in to find and save your favorite homes.",
    login_seller_desc: "Access your dashboard to manage your property listings.",
    login_generic_desc: "Choose your path to continue.",
    signup_title: "Create Account",
    signup_desc: "Join Lister to start your real estate journey.",
    label_email: "Email",
    label_password: "Password",
    btn_login_buyer: "Login as Buyer",
    btn_login_seller: "Login as Seller",
    btn_signup: "Sign Up",
    btn_switch_buyer: "Switch to Buyer Login",
    btn_switch_seller: "Switch to Seller Login",
    signup_prompt: "Don't have an account?",
    login_prompt: "Already have an account?",
    signup_link: "Sign Up",
    login_link: "Login",
    listings_title: "Discover Your Next Property",
    listings_subtitle: "Explore our hand-picked selection of properties, from cozy apartments to spacious family homes. Find the perfect place that fits your lifestyle.",
    listings_not_found: "Can't find what you're looking for?",
    listings_contact: "Contact us",
    listings_contact_suffix: "for personalized assistance!"
  },
  pt: {
    nav_listings: "Anúncios",
    nav_buy: "Comprar",
    nav_sell: "Vender",
    nav_news: "Notícias",
    hero_title: "Encontre o Imovel dos seus sonhos",
    hero_subtitle: "Descubra a propriedade perfeita ou conecte-se com compradores interessados. Sua jornada começa aqui.",
    hero_buy_btn: "Procurar Propriedade",
    hero_sell_btn: "Receber propostas Profissionais",
    featured_title: "Imóveis em Destaque",
    featured_subtitle: "Explore nossos anúncios mais exclusivos e procurados disponíveis agora.",
    agents_title: "Agentes em Destaque",
    agents_subtitle: "Trabalhe com os profissionais imobiliários mais bem avaliados do setor.",
    why_title: "Por que escolher a Lister?",
    why_subtitle: "Oferecemos uma experiência perfeita para compradores e vendedores, com filtros de pesquisa avançados, orientação especializada e uma plataforma segura para todas as suas necessidades imobiliárias.",
    feature_1_title: "Vastos Anúncios",
    feature_1_desc: "Explore milhares de propriedades adaptadas às suas preferências.",
    feature_2_title: "Agentes Especialistas",
    feature_2_desc: "Connecte-se com agentes experientes prontos para ajudá-lo.",
    feature_3_title: "Transações Seguras",
    feature_3_desc: "Nossa plataforma garante negociações seguras e transparentes.",
    footer_rights: "Todos os direitos reservados.",
    login_buyer_title: "Login do Comprador",
    login_seller_title: "Login do Vendedor",
    login_welcome: "Bem-vindo de volta!",
    login_buyer_desc: "Faça login para encontrar e salvar suas casas favoritas.",
    login_seller_desc: "Acesse seu painel para gerenciar seus anúncios de imóveis.",
    login_generic_desc: "Escolha seu caminho para continuar.",
    signup_title: "Criar Conta",
    signup_desc: "Junte-se à Lister para começar sua jornada imobiliária.",
    label_email: "E-mail",
    label_password: "Senha",
    btn_login_buyer: "Entrar como Comprador",
    btn_login_seller: "Entrar como Vendedor",
    btn_signup: "Cadastrar",
    btn_switch_buyer: "Mudar para Login de Comprador",
    btn_switch_seller: "Mudar para Login de Vendedor",
    signup_prompt: "Não tem uma conta?",
    login_prompt: "Já tem uma conta?",
    signup_link: "Cadastre-se",
    login_link: "Entrar",
    listings_title: "Descubra sua Próxima Propriedade",
    listings_subtitle: "Explore nossa seleção escolhida a dedo de propriedades, de apartamentos aconchegantes a casas de família espaçosas. Encontre o lugar perfeito que se adapta ao seu estilo de vida.",
    listings_not_found: "Não consegue encontrar o que procura?",
    listings_contact: "Entre em contato",
    listings_contact_suffix: "para assistência personalizada!"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};