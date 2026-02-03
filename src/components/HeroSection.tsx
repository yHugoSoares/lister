import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  onLoginClick: (role: "buyer" | "seller") => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick }) => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full pt-32 pb-48 md:pt-48 md:pb-64 lg:pt-64 lg:pb-80 flex flex-col items-center justify-center text-center overflow-hidden bg-background">
      {/* Background Image - Top Half */}
      <div 
        className="absolute top-0 left-0 right-0 h-[65%] z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="container px-4 md:px-6 z-10 max-w-4xl relative">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight drop-shadow-lg">
          {t('hero_title')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-2xl mx-auto drop-shadow-md">
          {t('hero_subtitle')}
        </p>
        
        {/* Buttons Container Box - Positioned at the transition */}
        <div className="mt-8 p-8 md:p-10 bg-card rounded-[2rem] border border-border shadow-2xl inline-block mx-auto">
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button 
              size="lg" 
              className="rounded-xl px-10 py-8 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 h-auto bg-primary hover:bg-primary/90 text-primary-foreground border-none" 
              onClick={() => onLoginClick("buyer")}
            >
              {t('hero_buy_btn')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-xl px-10 py-8 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 h-auto bg-background hover:bg-muted text-foreground border-border" 
              onClick={() => onLoginClick("seller")}
            >
              {t('hero_sell_btn')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
      </div>
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
      `}</style>
    </section>
  );
};

export default HeroSection;