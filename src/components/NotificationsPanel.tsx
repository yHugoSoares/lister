import React from "react";
import { Bell, MessageCircle, Euro, Home, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationsPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onOpenChange }) => {
  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New message from João Silva",
      description: "Is the property still available?",
      time: "2m ago",
      unread: true,
      icon: MessageCircle,
    },
    {
      id: 2,
      type: "price_drop",
      title: "Price reduced on saved property",
      description: "Modern Villa in Lisbon is now €430,000",
      time: "1h ago",
      unread: true,
      icon: Euro,
    },
    {
      id: 3,
      type: "visit",
      title: "Visit scheduled confirmed",
      description: "Your visit to Seaside Apartment is confirmed for tomorrow at 3 PM",
      time: "3h ago",
      unread: true,
      icon: Home,
    },
    {
      id: 4,
      type: "new_listing",
      title: "New property in your area",
      description: "A new property matching your criteria was just listed in Porto",
      time: "5h ago",
      unread: false,
      icon: Bell,
    },
    {
      id: 5,
      type: "offer",
      title: "Offer received",
      description: "You received an offer of €420,000 for your property",
      time: "1d ago",
      unread: false,
      icon: FileText,
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[420px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </div>
            {notifications.some(n => n.unread) && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8"
                onClick={() => {
                  // Mark all as read logic
                }}
              >
                Mark all as read
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            Stay updated with your property activities
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
          <div className="space-y-2 pr-4">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No notifications</p>
                <p className="text-sm text-muted-foreground mt-2">
                  You're all caught up!
                </p>
              </div>
            ) : (
              notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`flex gap-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                      notification.unread
                        ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                        : "border-border hover:bg-accent"
                    }`}
                    onClick={() => {
                      // Handle notification click - navigate or show details
                    }}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.unread ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <IconComponent className={`h-5 w-5 ${
                        notification.unread ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-semibold text-sm ${
                          notification.unread ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {notification.title}
                        </h3>
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.description}
                      </p>
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
