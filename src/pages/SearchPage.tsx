import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  const [transactionType, setTransactionType] = useState<string>("any");
  const [propertyType, setPropertyType] = useState<string>("any");
  const [district, setDistrict] = useState<string>("any");
  const [municipality, setMunicipality] = useState<string>("any");
  const [parish, setParish] = useState<string>("any");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("any");
  const [bathrooms, setBathrooms] = useState<string>("any");
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
      transactionType,
      propertyType,
      district,
      municipality,
      parish,
      minPrice: minPrice || "0",
      maxPrice: maxPrice || "999999999",
      bedrooms,
      bathrooms,
      area: selectedArea ? JSON.stringify(selectedArea) : "",
    });
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={handleLoginClick} />
      <main className="flex-grow container py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-5">
            <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden h-[calc(100vh-16rem)]">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">{t('search_select_area')}</h2>
                <p className="text-sm text-muted-foreground">{t('search_select_area_desc')}</p>
              </div>
              <MapAreaSelector onAreaSelected={setSelectedArea} />
            </div>
          </div>

          {/* Filters Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl p-4 shadow-lg border border-border h-[calc(100vh-16rem)]">
              <h2 className="text-xl font-bold mb-3">{t('search_filters')}</h2>

              {/* Transaction Type */}
              <div className="space-y-1 mb-3">
                <Label className="text-sm font-semibold">{t('search_transaction_type')}</Label>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('search_any')}</SelectItem>
                    <SelectItem value="sale">{t('search_sale')}</SelectItem>
                    <SelectItem value="rent">{t('search_rent')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="space-y-1 mb-3">
                <Label className="text-sm font-semibold">{t('search_property_type')}</Label>
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
                    <SelectItem value="land">{t('search_land')}</SelectItem>
                    <SelectItem value="commercial">{t('search_commercial')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* District */}
              <div className="space-y-1 mb-3">
                <Label className="text-sm font-semibold">{t('search_district')}</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('search_any')}</SelectItem>
                    <SelectItem value="lisboa">Lisboa</SelectItem>
                    <SelectItem value="porto">Porto</SelectItem>
                    <SelectItem value="faro">Faro</SelectItem>
                    <SelectItem value="braga">Braga</SelectItem>
                    <SelectItem value="coimbra">Coimbra</SelectItem>
                    <SelectItem value="setubal">Setúbal</SelectItem>
                    <SelectItem value="aveiro">Aveiro</SelectItem>
                    <SelectItem value="viseu">Viseu</SelectItem>
                    <SelectItem value="leiria">Leiria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Municipality */}
              <div className="space-y-1 mb-3">
                <Label className="text-sm font-semibold">{t('search_municipality')}</Label>
                <Select value={municipality} onValueChange={setMunicipality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('search_any')}</SelectItem>
                    <SelectItem value="lisboa">Lisboa</SelectItem>
                    <SelectItem value="cascais">Cascais</SelectItem>
                    <SelectItem value="sintra">Sintra</SelectItem>
                    <SelectItem value="loures">Loures</SelectItem>
                    <SelectItem value="oeiras">Oeiras</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Parish */}
              <div className="space-y-1 mb-3">
                <Label className="text-sm font-semibold">{t('search_parish')}</Label>
                <Select value={parish} onValueChange={setParish}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('search_any')}</SelectItem>
                    <SelectItem value="alvalade">Alvalade</SelectItem>
                    <SelectItem value="benfica">Benfica</SelectItem>
                    <SelectItem value="campo-de-ourique">Campo de Ourique</SelectItem>
                    <SelectItem value="estrela">Estrela</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="space-y-1">
                  <Label className="text-sm font-semibold">{t('search_min_price')}</Label>
                  <Input
                    type="number"
                    placeholder="€0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-semibold">{t('search_max_price')}</Label>
                  <Input
                    type="number"
                    placeholder="€999,999,999"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="space-y-1">
                  <Label className="text-sm font-semibold">{t('search_bedrooms')}</Label>
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
                <div className="space-y-1">
                  <Label className="text-sm font-semibold">{t('search_bathrooms')}</Label>
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
              </div>

              <Button 
                onClick={handleSearch} 
                className="w-full rounded-xl mt-4"
              >
                <Search className="mr-2 h-5 w-5" />
                {t('search_button')}
              </Button>
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
