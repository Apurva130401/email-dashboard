"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, PlusSquare, Trash2, ChevronsLeft, Menu, Paperclip, X } from "lucide-react";
import { getNinaResponse } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "nina";
  image?: string; // base64 encoded image
}

interface Chat {
  id: string;
  messages: Message[];
}

const ChatMessage = ({ message }: { message: Message }) => {
  const isNina = message.sender === 'nina';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-start gap-3", isNina ? "justify-start" : "justify-end")}
    >
      {isNina && (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/nina.svg" alt="Nina" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "p-3 rounded-lg max-w-md shadow-md",
          isNina
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {message.image && <img src={message.image} alt="user upload" className="rounded-md mb-2" />}
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
          }}
        >
          {message.text}
        </ReactMarkdown>
      </div>
      {!isNina && (
        <Avatar className="w-8 h-8">
          <AvatarImage src="" alt="User" />
          <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
};


const NinaPage = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem("chatHistory");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setChatHistory(parsedHistory);
      if (parsedHistory.length > 0) {
        setCurrentChatId(parsedHistory[0].id);
      } else {
        handleNewChat();
      }
    } else {
      handleNewChat();
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    } else {
        localStorage.removeItem("chatHistory");
    }
  }, [chatHistory]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      messages: [
        {
          id: 1,
          text: "Hello! I'm Nina, your AI assistant. How can I help you today?",
          sender: "nina",
        },
      ],
    };
    setChatHistory([newChat, ...chatHistory]);
    setCurrentChatId(newChat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
    setChatHistory(updatedHistory);
    if (currentChatId === chatId) {
      if (updatedHistory.length > 0) {
        setCurrentChatId(updatedHistory[0].id);
      } else {
        handleNewChat();
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const handleSendMessage = async () => {
    if ((inputValue.trim() || selectedImage) && currentChatId) {
      let imagePart = null;
      let imageUrl: string | undefined = undefined;
      if (selectedImage) {
        imagePart = await fileToGenerativePart(selectedImage);
        imageUrl = URL.createObjectURL(selectedImage);
      }

      const userMessage: Message = { id: Date.now(), text: inputValue, sender: "user", image: imageUrl };
      
      const updatedChatHistory = chatHistory.map(chat => {
        if (chat.id === currentChatId) {
          return { ...chat, messages: [...chat.messages, userMessage] };
        }
        return chat;
      });
      setChatHistory(updatedChatHistory);
      
      setInputValue("");
      setSelectedImage(null);
      setIsLoading(true);

      const currentChat = updatedChatHistory.find(chat => chat.id === currentChatId);
      const historyForApi = currentChat ? currentChat.messages.slice(0, -1) : [];

      const ninaResponse = await getNinaResponse(inputValue, historyForApi.map(m => ({ text: m.text, sender: m.sender })), imagePart ? [imagePart] : undefined);
      const ninaMessage: Message = { id: Date.now() + 1, text: ninaResponse, sender: "nina" };
      
      const finalChatHistory = updatedChatHistory.map(chat => {
        if (chat.id === currentChatId) {
          return { ...chat, messages: [...chat.messages, ninaMessage] };
        }
        return chat;
      });
      setChatHistory(finalChatHistory);
      
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory, currentChatId]);

  const currentMessages = chatHistory.find(chat => chat.id === currentChatId)?.messages || [];

  return (
    <div className="h-full flex bg-background text-foreground">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <Card className="h-full rounded-none border-r border-border bg-muted/40">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold tracking-tight">Chat History</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={handleNewChat}>
                      <PlusSquare className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                      <ChevronsLeft className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ScrollArea className="h-[calc(100vh-8rem)]">
                  <div className="space-y-2">
                    {chatHistory.map(chat => (
                      <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                          currentChatId === chat.id ? 'bg-primary/10' : 'hover:bg-primary/5'
                        )}
                      >
                        <div onClick={() => setCurrentChatId(chat.id)} className="flex-1 truncate">
                          <p className="text-sm font-medium truncate">{chat.messages.find(m => m.sender === 'user')?.text || 'New Chat'}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteChat(chat.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col bg-gradient-to-br from-background to-muted/20">
        <header className="p-4 flex items-center gap-4 border-b border-border">
            {!isSidebarOpen && (
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                    <Menu className="h-5 w-5" />
                </Button>
            )}
            <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                    <AvatarImage src="/nina.svg" alt="Nina" />
                    <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Chat with Nina</h1>
                    <p className="text-sm text-muted-foreground">Your AI assistant for SyncFlo</p>
                </div>
            </div>
        </header>
        
        <main className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6 max-w-4xl mx-auto">
              {currentMessages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/nina.svg" alt="Nina" />
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg max-w-md bg-muted shadow-md">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-6 border-t border-border">
            {selectedImage && (
              <div className="relative max-w-4xl mx-auto mb-4">
                <img src={URL.createObjectURL(selectedImage)} alt="preview" className="h-24 w-24 object-cover rounded-md" />
                <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-6 w-6" onClick={() => setSelectedImage(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="relative max-w-4xl mx-auto">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message to Nina, or upload an image..."
                className="h-12 rounded-full pl-12 pr-16 text-base"
                disabled={isLoading}
              />
              <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full" onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="h-5 w-5" />
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              <Button onClick={handleSendMessage} disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NinaPage;