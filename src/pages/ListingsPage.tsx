import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import ListingCard from "@/components/ListingCard";
import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/services/listingService";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

const ListingsPage = () => {
  const { t } = useLanguage();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [loginRole, setLoginRole] = React.useState<"buyer" | "seller" | null>(null);

  const { data: listings, isLoading, error } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

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
      <main className="flex-grow container py-16 px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">{t('listings_title')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
          {t('listings_subtitle')}
        </p>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[400px] w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <p className="text-destructive text-lg">Error loading listings: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings?.map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        )}
        <p className="mt-16 text-muted-foreground text-lg">
          {t('listings_not_found')}{' '}
          <a href="#" className="text-primary hover:underline">{t('listings_contact')}</a>{' '}
          {t('listings_contact_suffix')}
        </p>
      </main>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} initialRole={loginRole} />
    </div>
  );
};

export default ListingsPage;