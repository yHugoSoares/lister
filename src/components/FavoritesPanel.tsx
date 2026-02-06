import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Bed, Bath, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FavoritesPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FavoritesPanel: React.FC<FavoritesPanelProps> = ({ isOpen, onOpenChange }) => {
  const navigate = useNavigate();

  // Mock data for favorites
  const favoriteProperties = [
    {
      id: 1,
      title: "Modern Villa in Lisbon",
      location: "Lisbon, Portugal",
      price: 450000,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
      bedrooms: 4,
      bathrooms: 3,
    },
    {
      id: 2,
      title: "Seaside Apartment",
      location: "Porto, Portugal",
      price: 280000,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      id: 3,
      title: "Country House with Pool",
      location: "Algarve, Portugal",
      price: 650000,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
      bedrooms: 5,
      bathrooms: 4,
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[540px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Saved Properties
          </SheetTitle>
          <SheetDescription>
            Your favorite properties saved for later
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
          <div className="space-y-4 pr-4">
            {favoriteProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No favorites yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start saving properties you like!
                </p>
              </div>
            ) : (
              favoriteProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex gap-4 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => navigate(`/listings/${property.id}`)}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base truncate">{property.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {property.location}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Bed className="h-3 w-3" />
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-3 w-3" />
                        {property.bathrooms}
                      </span>
                    </div>
                    <p className="font-bold text-primary mt-2">
                      €{property.price.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Remove from favorites logic here
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default FavoritesPanel;
