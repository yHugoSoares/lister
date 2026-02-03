import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-border/40 bg-background/80 py-6 text-center text-sm text-muted-foreground">
      <div className="container px-4 md:px-6">
        <p>&copy; {new Date().getFullYear()} Lister. {t('footer_rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;