"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CookingPot } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type HandsFreeModeProps = {
  recipeTitle: string;
  steps: string[];
};

export function HandsFreeMode({ recipeTitle, steps }: HandsFreeModeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  if (steps.length === 0) {
    return null;
  }

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <CookingPot className="mr-2 h-5 w-5" />
          Start Cooking
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl md:max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-primary">
            {recipeTitle}
          </DialogTitle>
          <DialogDescription>
            Step {currentStep + 1} of {steps.length}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow flex items-center justify-center text-center p-4 md:p-6 bg-secondary/50 rounded-lg">
          <p className="text-2xl md:text-4xl leading-relaxed">
            {steps[currentStep].replace(/^\d+\.\s*/, '')}
          </p>
        </div>
        
        <div className="pt-4">
          <Progress value={progressPercentage} className="w-full" />
        </div>

        <DialogFooter className="!justify-between pt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={goToPrevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
             <Button size="lg" onClick={goToNextStep} >
                Next
                <ChevronRight className="ml-2 h-5 w-5" />
             </Button>
          ) : (
            <Button size="lg" onClick={() => setIsOpen(false)} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Finish
              <CookingPot className="ml-2 h-5 w-5" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
