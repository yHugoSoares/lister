import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface ChatPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onOpenChange }) => {
  // Mock data for chat conversations
  const chatConversations = [
    {
      id: 1,
      name: "João Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
      lastMessage: "Is the property still available?",
      time: "2m ago",
      unread: 1,
      property: "Modern Villa in Lisbon",
    },
    {
      id: 2,
      name: "Maria Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      lastMessage: "Can we schedule a visit?",
      time: "1h ago",
      unread: 1,
      property: "Seaside Apartment",
    },
    {
      id: 3,
      name: "Pedro Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
      lastMessage: "Thank you for the information!",
      time: "3h ago",
      unread: 0,
      property: "Country House with Pool",
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[540px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Messages
          </SheetTitle>
          <SheetDescription>
            Your conversations with buyers and sellers
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
          <div className="space-y-2 pr-4">
            {chatConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No messages yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start a conversation about a property!
                </p>
              </div>
            ) : (
              chatConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => {
                    // Open full chat view
                    onOpenChange(false);
                    // Navigate to chat page or open chat dialog
                  }}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.property}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {conversation.time}
                        </span>
                        {conversation.unread > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-background">
          <div className="flex gap-2">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button>Send</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatPanel;
