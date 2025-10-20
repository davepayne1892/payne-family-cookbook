"use client";

import { useState, useEffect } from "react";
import { SubmitRecipeForm } from "@/components/submit-recipe-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SUBMIT_PASSWORD = "family"; // Simple password

export default function SubmitPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("recipe_submit_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SUBMIT_PASSWORD) {
      sessionStorage.setItem("recipe_submit_auth", "true");
      setIsAuthenticated(true);
      setPassword("");
      toast({
        title: "Access Granted",
        description: "You can now submit a recipe.",
        className: "bg-primary text-primary-foreground",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Password",
        description: "Please try again.",
      });
      setPassword("");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={true} onOpenChange={handleGoBack}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
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
               <Button type="button" variant="outline" onClick={handleGoBack}>Go Back</Button>
               <Button type="submit">Continue</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">
          Share a Recipe
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Add your favorite recipe to the family collection.
        </p>
      </div>
      <SubmitRecipeForm />
    </div>
  );
}
