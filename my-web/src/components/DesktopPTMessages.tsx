import { useState } from "react";
import { ArrowLeft, Send, Search, Phone, Video, MoreVertical } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Message {
  id: number;
  sender: "pt" | "client";
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  client: {
    name: string;
    image: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
}

interface DesktopPTMessagesProps {
  onBack: () => void;
  initialClientName?: string;
}

const conversations: Conversation[] = [
  {
    id: 1,
    client: {
      name: "John Davis",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400"
    },
    lastMessage: "See you tomorrow at 6 AM!",
    lastMessageTime: "2m ago",
    unread: 2,
    online: true
  },
  {
    id: 2,
    client: {
      name: "Sarah Martinez",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    },
    lastMessage: "Can we reschedule Friday's session?",
    lastMessageTime: "1h ago",
    unread: 1,
    online: true
  },
  {
    id: 3,
    client: {
      name: "Mike Roberts",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    lastMessage: "Thanks for the nutrition plan!",
    lastMessageTime: "3h ago",
    unread: 0,
    online: false
  },
  {
    id: 4,
    client: {
      name: "Emma Wilson",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    },
    lastMessage: "Great session today, feeling pumped!",
    lastMessageTime: "Yesterday",
    unread: 0,
    online: false
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "client",
    text: "Hi Marcus! Looking forward to our session tomorrow.",
    time: "10:23 AM"
  },
  {
    id: 2,
    sender: "pt",
    text: "Hey John! Yes, me too. We'll focus on upper body tomorrow. Make sure you're well rested!",
    time: "10:25 AM"
  },
  {
    id: 3,
    sender: "client",
    text: "Perfect! Should I bring anything specific?",
    time: "10:27 AM"
  },
  {
    id: 4,
    sender: "pt",
    text: "Just your water bottle and gloves. I'll have everything else ready.",
    time: "10:28 AM"
  },
  {
    id: 5,
    sender: "client",
    text: "See you tomorrow at 6 AM!",
    time: "10:30 AM"
  }
];

export function DesktopPTMessages({ onBack, initialClientName }: DesktopPTMessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeConversation = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would add the message to the conversation
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <h1 className="text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">Connect with your clients</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-[350px_1fr] gap-6 h-[700px]">
          {/* Conversations List */}
          <Card className="border-border bg-card flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-border cursor-pointer transition-colors ${
                    selectedConversation === conversation.id
                      ? "bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={conversation.client.image}
                          alt={conversation.client.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-foreground text-sm truncate">
                          {conversation.client.name}
                        </h4>
                        <span className="text-muted-foreground text-xs flex-shrink-0">
                          {conversation.lastMessageTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <div className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="border-border bg-card flex flex-col">
            {activeConversation && (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={activeConversation.client.image}
                          alt={activeConversation.client.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {activeConversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-foreground">{activeConversation.client.name}</h3>
                      <p className="text-muted-foreground text-xs">
                        {activeConversation.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "pt" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          message.sender === "pt"
                            ? "bg-primary text-white"
                            : "bg-muted text-foreground"
                        } rounded-[12px] p-4`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-2 ${
                            message.sender === "pt" ? "text-white/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      className="flex-1 bg-background border-border"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-primary text-white gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
