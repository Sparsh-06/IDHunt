"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Menu,
  LayoutDashboard,
  Lightbulb,
  DollarSign,
  UserCircle,
  LogOut,
  CloudLightning,
  Video,
  BriefcaseMedicalIcon,
  Terminal,
  LetterTextIcon,
  Info,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import User from "@/app/component/User";
import { useUser } from "@clerk/nextjs";
import { LightningBoltIcon } from "@radix-ui/react-icons";

export function SheetDemo() {
  const { isSignedIn } = useUser();

  return (
    <Sheet>
      <SheetTrigger asChild className="fixed m-5 left-5 z-10">
        <Button variant="outline">
          <Menu /> Menu
        </Button>
      </SheetTrigger>
      <SheetContent className="p-5 w-64 bg-gray-900 text-white overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <User />
          </SheetTitle>
          <Separator className="my-4" />
        </SheetHeader>

        {/* Sidebar Menu */}
        <div className="flex flex-col gap-4 mt-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2  text-white hover:bg-gray-700 justify-start "
            >
              <LayoutDashboard size={18} /> Dashboard
            </Button>
          </Link>
          <Link href={isSignedIn ? "/ideas" : "/sign-up"}>
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-left text-white hover:bg-gray-700 justify-start "
            >
              <Lightbulb size={18} /> Your Ideas
            </Button>
          </Link>
          <Link href="/ideaHunt">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-left text-white hover:bg-gray-700 justify-start "
            >
              <CloudLightning size={18} /> Validate Idea
            </Button>
          </Link>
          <Link href="/exploreIdeas">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-left text-white hover:bg-gray-700 justify-start "
            >
              <LightningBoltIcon /> Explore Ideas
            </Button>
          </Link>
          
        </div>
        <h2 className="ml-8 my-6 text-muted-foreground flex items-center gap-2">
          Launch Product
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={14} className="mt-[3px]" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">
                  Got a ready Product/Idea ? Marketise your product in the right
                  way
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>
        <div className="flex flex-col gap-4 mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger >
                <TooltipContent>
                  <p className="text-sm">
                    Coming Soon
                  </p>
                </TooltipContent>
              <div className="flex flex-col gap-4">

                <div>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2  text-muted justify-start pointer-events-none"
                  >
                    <Video size={18} /> Product Feedback
                  </Button>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2 text-left  text-muted justify-start pointer-events-none"
                  >
                    <BriefcaseMedicalIcon size={18} /> Branding
                  </Button>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2 text-left  text-muted justify-start pointer-events-none"
                  >
                    <Terminal size={18} /> Collaboration
                  </Button>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2 text-left text-muted justify-start pointer-events-none"
                  >
                    <LetterTextIcon /> Newsletter
                  </Button>
                </div>
              </div>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SheetContent>
    </Sheet>
  );
}
