import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import ListingCard from "@/components/ListingCard";
import MapAreaSelector from "@/components/MapAreaSelector";
import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/services/listingService";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Filter } from "lucide-react";

const ListingsPage = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [loginRole, setLoginRole] = React.useState<"buyer" | "seller" | null>(null);
  const [isMapDialogOpen, setIsMapDialogOpen] = React.useState(false);
  
  // Filter states
  const [transactionType, setTransactionType] = React.useState<string>(searchParams.get('transactionType') || "any");
  const [propertyType, setPropertyType] = React.useState<string>(searchParams.get('propertyType') || "any");
  const [district, setDistrict] = React.useState<string>(searchParams.get('district') || "any");
  const [municipality, setMunicipality] = React.useState<string>(searchParams.get('municipality') || "any");
  const [parish, setParish] = React.useState<string>(searchParams.get('parish') || "any");
  const [minPrice, setMinPrice] = React.useState<string>(searchParams.get('minPrice') || "");
  const [maxPrice, setMaxPrice] = React.useState<string>(searchParams.get('maxPrice') || "");
  const [bedrooms, setBedrooms] = React.useState<string>(searchParams.get('bedrooms') || "any");
  const [bathrooms, setBathrooms] = React.useState<string>(searchParams.get('bathrooms') || "any");
  const [selectedArea, setSelectedArea] = React.useState<any>(
    searchParams.get('area') ? JSON.parse(searchParams.get('area')!) : null
  );

  // Extract all filter params from URL
  const filters = React.useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return {
      transactionType: params.get('transactionType') || undefined,
      propertyType: params.get('propertyType') || undefined,
      district: params.get('district') || undefined,
      municipality: params.get('municipality') || undefined,
      parish: params.get('parish') || undefined,
      minPrice: params.get('minPrice') || undefined,
      maxPrice: params.get('maxPrice') || undefined,
      bedrooms: params.get('bedrooms') || undefined,
      bathrooms: params.get('bathrooms') || undefined,
      area: params.get('area') || undefined,
    };
  }, [searchParams]);

  const { data: listings, isLoading, error } = useQuery({
    queryKey: ["listings", filters],
    queryFn: () => getListings(filters),
  });

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (transactionType !== 'any') params.set('transactionType', transactionType);
    if (propertyType !== 'any') params.set('propertyType', propertyType);
    if (district !== 'any') params.set('district', district);
    if (municipality !== 'any') params.set('municipality', municipality);
    if (parish !== 'any') params.set('parish', parish);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms !== 'any') params.set('bedrooms', bedrooms);
    if (bathrooms !== 'any') params.set('bathrooms', bathrooms);
    if (selectedArea) params.set('area', JSON.stringify(selectedArea));
    
    setSearchParams(params);
  };

  const handleAreaSelected = (area: any) => {
    setSelectedArea(area);
    setIsMapDialogOpen(false);
    // Apply filters automatically after selecting area
    setTimeout(() => applyFilters(), 0);
  };

  const clearArea = () => {
    setSelectedArea(null);
    const params = new URLSearchParams(searchParams);
    params.delete('area');
    setSearchParams(params);
  };

  const handleLoginClick = (role?: "buyer" | "seller") => {
    setLoginRole(role || null);
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={handleLoginClick} />
      <main className="flex-grow py-8 px-4 md:px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-4 shadow-lg border border-border sticky top-4">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5" />
                  <h2 className="text-lg font-bold">{t('search_filters')}</h2>
                </div>

              {/* Map Area Selector */}
              <div className="mb-4">
                <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      {selectedArea ? t('change_area') || 'Change Area' : t('select_area') || 'Select Area'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>{t('search_select_area')}</DialogTitle>
                    </DialogHeader>
                    <div className="h-[600px]">
                      <MapAreaSelector onAreaSelected={handleAreaSelected} />
                    </div>
                  </DialogContent>
                </Dialog>
                {selectedArea && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-2 text-xs" 
                    onClick={clearArea}
                  >
                    {t('clear_area')}
                  </Button>
                )}
              </div>

              {/* Transaction Type */}
              <div className="space-y-1 mb-3">
                <Label className="text-sm font-semibold">{t('search_transaction_type')}</Label>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger className="h-9">
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
                  <SelectTrigger className="h-9">
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
                  <SelectTrigger className="h-9">
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
                  <SelectTrigger className="h-9">
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
                  <SelectTrigger className="h-9">
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
                  <Label className="text-xs font-semibold">{t('search_min_price')}</Label>
                  <Input
                    type="number"
                    placeholder="€0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">{t('search_max_price')}</Label>
                  <Input
                    type="number"
                    placeholder="€999,999"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">{t('search_bedrooms')}</Label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger className="h-9">
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
                  <Label className="text-xs font-semibold">{t('search_bathrooms')}</Label>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger className="h-9">
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
                onClick={applyFilters} 
                className="w-full rounded-lg"
              >
                {t('search_button') || 'Apply Filters'}
              </Button>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <Skeleton key={index} className="aspect-square w-full rounded-xl" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive text-lg">{t('error_loading_listings')}: {error.message}</p>
              </div>
            ) : listings && listings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} {...listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">{t('no_listings_found')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    <Footer />
    <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} initialRole={loginRole} />
    </div>
  );
};

export default ListingsPage;