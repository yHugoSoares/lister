import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import MapAreaSelector from "@/components/MapAreaSelector";
import { Search } from "lucide-react";

const SearchPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState<"buyer" | "seller" | null>(null);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [bedrooms, setBedrooms] = useState<string>("any");
  const [bathrooms, setBathrooms] = useState<string>("any");
  const [propertyType, setPropertyType] = useState<string>("any");
  const [selectedArea, setSelectedArea] = useState<any>(null);

  const handleLoginClick = (role?: "buyer" | "seller") => {
    setLoginRole(role || null);
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSearch = () => {
    // Navigate to listings page with filters as query params
    const params = new URLSearchParams({
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      propertyType: propertyType,
      area: selectedArea ? JSON.stringify(selectedArea) : "",
    });
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={handleLoginClick} />
      <main className="flex-grow container py-8 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          {t('search_title')}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t('search_subtitle')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <h2 className="text-2xl font-bold mb-6">{t('search_filters')}</h2>

              {/* Price Range */}
              <div className="space-y-4 mb-6">
                <Label className="text-base font-semibold">{t('search_price_range')}</Label>
                <div className="space-y-2">
                  <Slider
                    min={0}
                    max={1000000}
                    step={10000}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>€{priceRange[0].toLocaleString()}</span>
                    <span>€{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2 mb-6">
                <Label className="text-base font-semibold">{t('search_bedrooms')}</Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('search_any')}</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bathrooms */}
              <div className="space-y-2 mb-6">
                <Label className="text-base font-semibold">{t('search_bathrooms')}</Label>
                <Select value={bathrooms} onValueChange={setBathrooms}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('search_any')}</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="space-y-2 mb-6">
                <Label className="text-base font-semibold">{t('search_property_type')}</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('search_any')}</SelectItem>
                    <SelectItem value="house">{t('search_house')}</SelectItem>
                    <SelectItem value="apartment">{t('search_apartment')}</SelectItem>
                    <SelectItem value="condo">{t('search_condo')}</SelectItem>
                    <SelectItem value="townhouse">{t('search_townhouse')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSearch} 
                className="w-full rounded-lg"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                {t('search_button')}
              </Button>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">{t('search_select_area')}</h2>
                <p className="text-sm text-muted-foreground">{t('search_select_area_desc')}</p>
              </div>
              <MapAreaSelector onAreaSelected={setSelectedArea} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal} 
        initialRole={loginRole} 
      />
    </div>
  );
};

export default SearchPage;
