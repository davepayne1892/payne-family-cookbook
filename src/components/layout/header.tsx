"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChefHat, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  
  const SUBMIT_PASSWORD = "family"; // Simple password

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SUBMIT_PASSWORD) {
      setOpen(false);
      setPassword("");
      router.push("/submit");
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Password",
        description: "Please try again.",
      });
      setPassword("");
    }
  };

  const navLinks = [
    { href: "/submit", label: "Submit Recipe", icon: PlusCircle },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-lg text-primary-foreground group-hover:bg-primary/90 transition-colors">
              <ChefHat className="h-6 w-6" />
            </div>
            <span className="text-xl font-headline font-semibold">
              Family Cookbook
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant={pathname === "/submit" ? "secondary" : "ghost"} size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Submit Recipe
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handlePasswordSubmit}>
                  <DialogHeader>
                    <DialogTitle>Enter Password</DialogTitle>
                    <DialogDescription>
                      You need a password to submit a new recipe.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="col-span-3"
                        autoFocus
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Continue</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </div>
    </header>
  );
}
