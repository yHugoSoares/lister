import React from "react";
import { MapPin, Bed, Bath, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListingCardProps {
  imageUrl: string;
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
}

const ListingCard: React.FC<ListingCardProps> = ({
  imageUrl,
  title,
  address,
  price,
  beds,
  baths,
  sqft,
}) => {
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col">
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <span className="absolute bottom-3 left-3 text-white text-lg font-bold bg-primary px-3 py-1 rounded-full">
          {price.replace('$', '€')} {/* Changed to Euro */}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground flex items-center text-sm mb-4">
          <MapPin className="h-4 w-4 mr-2 text-primary" />
          {address}
        </p>
        <div className="grid grid-cols-3 gap-4 text-center text-muted-foreground text-sm mb-6">
          <div className="flex flex-col items-center">
            <Bed className="h-5 w-5 text-secondary mb-1" />
            <span>{beds} Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="h-5 w-5 text-secondary mb-1" />
            <span>{baths} Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <Ruler className="h-5 w-5 text-secondary mb-1" />
            <span>{sqft} sqft</span>
          </div>
        </div>
        <Button className="w-full mt-auto rounded-lg text-lg py-3">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ListingCard;