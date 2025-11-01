"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ArrowUp, ArrowDown, Star } from "lucide-react";

interface Idea {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  title: string;
  description: string;
}

const mockIdeas: Idea[] = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "/diverse-woman-portrait.png",
    },
    title: "AI-powered code review assistant",
    description:
      "An intelligent system that automatically reviews pull requests, suggests improvements, and catches potential bugs before they reach production. It learns from your team's coding patterns and adapts to your style guide.",
  },
  {
    id: 2,
    user: {
      name: "Marcus Johnson",
      avatar: "/man.jpg",
    },
    title: "Real-time collaboration whiteboard",
    description:
      "A virtual whiteboard that allows teams to brainstorm together in real-time, with features like sticky notes, drawing tools, and the ability to import images and documents. Perfect for remote teams.",
  },
  {
    id: 3,
    user: {
      name: "Emily Rodriguez",
      avatar: "/professional-woman.png",
    },
    title: "Sustainable shopping tracker",
    description:
      "Track the environmental impact of your purchases and get suggestions for more sustainable alternatives. Includes carbon footprint calculations and connects you with eco-friendly brands.",
  },
];

function IdeaTile({ idea }: { idea: Idea }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [upvotes, setUpvotes] = React.useState(0);
  const [downvotes, setDownvotes] = React.useState(0);
  const [starred, setStarred] = React.useState(false);

  return (
    <div className="w-full">
      <div className="flex items-start gap-3 p-6">
        <Avatar className="size-10 shrink-0">
          <AvatarImage
            src={idea.user.avatar || "/placeholder.svg"}
            alt={idea.user.name}
          />
          <AvatarFallback>{idea.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">{idea.user.name}</div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-left hover:underline"
          >
            {idea.title}
          </button>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setUpvotes((prev) => prev + 1)}
          >
            <ArrowUp className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setDownvotes((prev) => prev + 1)}
          >
            <ArrowDown className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setStarred(!starred)}
          >
            <Star className={`size-4 ${starred ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="px-6 pb-6 pl-16 text-sm text-muted-foreground">
          {idea.description}
        </div>
      )}
      <Separator />
    </div>
  );
}

function SidebarToggleButton() {
  const { open } = useSidebar();

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-300"
      style={{
        right: open ? "40vw" : "0",
      }}
    >
      <SidebarTrigger />
    </div>
  );
}

export function IdeasSidebarShadcn({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      {children}
      <Sidebar
        side="right"
        collapsible="offcanvas"
        className="border-l"
        style={{ "--sidebar-width": "40vw" } as React.CSSProperties}
      >
        <SidebarHeader className="border-b">
          <div className="flex items-center justify-between p-2">
            <h2 className="text-lg font-semibold">Trending Ideas</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Upcoming</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex flex-col">
                {mockIdeas.map((idea) => (
                  <IdeaTile key={idea.id} idea={idea} />
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarToggleButton />
    </SidebarProvider>
  );
}
