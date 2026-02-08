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
  // Format price with Euro symbol
  const formatPrice = (price: string | number) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    return `${numericPrice.toLocaleString('pt-PT')} €`;
  };

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col aspect-square max-w-sm">
      <div className="relative h-44 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <span className="absolute bottom-2 left-2 text-white text-base font-bold bg-primary px-2.5 py-1 rounded-lg shadow-md">
          {formatPrice(price)}
        </span>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-foreground mb-1 line-clamp-1">{title}</h3>
        <p className="text-muted-foreground flex items-center text-xs mb-2 line-clamp-1">
          <MapPin className="h-3 w-3 mr-1 text-primary flex-shrink-0" />
          {address}
        </p>
        <div className="grid grid-cols-3 gap-1 text-center text-muted-foreground text-xs mb-2">
          <div className="flex flex-col items-center">
            <Bed className="h-4 w-4 text-secondary mb-0.5" />
            <span>{beds} Bed{beds !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="h-4 w-4 text-secondary mb-0.5" />
            <span>{baths} Bath{baths !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-col items-center">
            <Ruler className="h-4 w-4 text-secondary mb-0.5" />
            <span>{sqft}m²</span>
          </div>
        </div>
        <Button className="w-full mt-auto rounded-lg text-sm py-2">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ListingCard;