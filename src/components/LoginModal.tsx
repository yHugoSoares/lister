import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: "buyer" | "seller" | null;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, initialRole }) => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">(initialRole || "buyer");

  React.useEffect(() => {
    if (isOpen) {
      setIsSignUp(false);
      setEmail("");
      setPassword("");
      setRole(initialRole || "buyer");
    }
  }, [isOpen, initialRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (isSignUp) {
        authService.signUp(email, password, role);
        toast.success("Account created successfully! You can now log in.");
        setIsSignUp(false);
      } else {
        const user = authService.signIn(email, password);
        login(user);
        toast.success(`Welcome back! Logged in as ${user.role}.`);
        onClose();
        navigate("/listings");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const title = isSignUp 
    ? t('signup_title') 
    : role === "seller" 
    ? t('login_seller_title') 
    : role === "buyer" 
    ? t('login_buyer_title') 
    : t('login_welcome');

  const description = isSignUp
    ? t('signup_desc')
    : role === "seller" 
    ? t('login_seller_desc') 
    : role === "buyer" 
    ? t('login_buyer_desc') 
    : t('login_generic_desc');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">{title}</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('label_email')}</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
              className="rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('label_password')}</Label>
            <Input 
              id="password" 
              type="password" 
              className="rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full rounded-md mt-2">
            {isSignUp ? t('btn_signup') : role === "seller" ? t('btn_login_seller') : t('btn_login_buyer')}
          </Button>

          {!isSignUp && (
            <Button 
              type="button"
              variant="ghost" 
              onClick={() => setRole(role === "seller" ? "buyer" : "seller")} 
              className="w-full rounded-md text-xs text-muted-foreground"
            >
              {role === "seller" ? t('btn_switch_buyer') : t('btn_switch_seller')}
            </Button>
          )}
          
          <Separator className="my-4" />
          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? t('login_prompt') : t('signup_prompt')}{" "}
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)} 
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? t('login_link') : t('signup_link')}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;