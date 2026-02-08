import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LoginModal from "@/components/LoginModal";
import ListingCard from "@/components/ListingCard";
import AgentCard from "@/components/AgentCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/services/listingService";
import { getTopRatedAgents } from "@/services/agentService";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { t } = useLanguage();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [loginRole, setLoginRole] = React.useState<"buyer" | "seller" | null>(null);

  const { data: listings, isLoading: isLoadingListings, error: listingsError } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

  const { data: agents, isLoading: isLoadingAgents, error: agentsError } = useQuery({
    queryKey: ["top-agents"],
    queryFn: getTopRatedAgents,
  });

  const handleLoginClick = (role?: "buyer" | "seller") => {
    setLoginRole(role || null);
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Only show the first 3 listings as "featured"
  const featuredListings = listings?.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={handleLoginClick} />
      <main className="flex-grow">
        <HeroSection onLoginClick={handleLoginClick} />
        
        {/* Featured Properties Section */}
        <section className="container py-12 px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t('featured_title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('featured_subtitle')}
            </p>
          </div>

          {isLoadingListings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="aspect-square w-full rounded-xl" />
              ))}
            </div>
          ) : listingsError ? (
            <div className="text-center py-10">
              <p className="text-destructive text-lg">Error loading featured properties.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {featuredListings?.map((listing) => (
                <ListingCard key={listing.id} {...listing} />
              ))}
            </div>
          )}
        </section>

        {/* Featured Agents Section */}
        <section className="container py-12 px-4 md:px-6 bg-muted/30 rounded-[3rem] mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t('agents_title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('agents_subtitle')}
            </p>
          </div>

          {isLoadingAgents ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-[300px] w-full rounded-xl" />
              ))}
            </div>
          ) : agentsError ? (
            <div className="text-center py-10">
              <p className="text-destructive text-lg">Error loading featured agents.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents?.map((agent) => (
                <AgentCard key={agent.id} {...agent} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} initialRole={loginRole} />
    </div>
  );
};

export default Index;