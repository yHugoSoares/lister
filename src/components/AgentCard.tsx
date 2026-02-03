import React from "react";
import { Star, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AgentCardProps {
  name: string;
  role: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  specialization: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  name,
  role,
  imageUrl,
  rating,
  reviewsCount,
  specialization,
}) => {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <Avatar className="h-24 w-24 border-4 border-primary/10 group-hover:border-primary/30 transition-colors">
            <AvatarImage src={imageUrl} alt={name} className="object-cover" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg">
            <Award className="h-4 w-4" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-primary font-medium mb-3">{role}</p>
        <div className="flex items-center justify-center mb-4">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-bold text-foreground mr-1">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground text-xs">({reviewsCount} reviews)</span>
        </div>
        <div className="bg-muted/50 rounded-full px-4 py-1 text-xs text-muted-foreground">
          {specialization}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;