import * as React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-md">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-lg">
        <DropdownMenuItem 
          onClick={() => setLanguage("en")} 
          className={`rounded-md ${language === 'en' ? 'bg-accent' : ''}`}
        >
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("pt")} 
          className={`rounded-md ${language === 'pt' ? 'bg-accent' : ''}`}
        >
          Português (PT)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}