"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import HeroGreeting from "@/components/panel/dashboard/HeroGreeting";
import ActionQueue from "@/components/panel/dashboard/ActionQueue";
import ProjectContext from "@/components/panel/dashboard/ProjectContext";
import WelcomeOverlay from "@/components/panel/onboarding/WelcomeOverlay";
import SpotlightTour from "@/components/panel/onboarding/SpotlightTour";
import FirstAction from "@/components/panel/onboarding/FirstAction";

const ONBOARDING_KEY = "makeit_onboarding_done";
type OnboardingStep = "welcome" | "tour" | "firstAction" | null;

// W produkcji — liczba pochodzi z API
const ACTION_COUNT = 2;

export default function PanelPage() {
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const done = localStorage.getItem(ONBOARDING_KEY);
      if (!done) setOnboardingStep("welcome");
    }
  }, []);

  const finishOnboarding = useCallback(() => {
    setOnboardingStep(null);
    localStorage.setItem(ONBOARDING_KEY, "true");
  }, []);

  return (
    <>
      {/*
        max-w-[720px] — celowo węższy niż reszta portalu (1060px).
        Ten ekran ma jeden cel: jeden klik. Węższy = bardziej skupiony.
      */}
      <div className="max-w-[720px] flex flex-col gap-8">
        <HeroGreeting actionCount={ACTION_COUNT} />
        <ActionQueue />
        <ProjectContext />
      </div>

      <AnimatePresence>
        {onboardingStep === "welcome" && (
          <WelcomeOverlay onContinue={() => setOnboardingStep("tour")} />
        )}
        {onboardingStep === "tour" && (
          <SpotlightTour onComplete={() => setOnboardingStep("firstAction")} />
        )}
        {onboardingStep === "firstAction" && (
          <FirstAction
            onAction={() => {
              finishOnboarding();
              window.location.href = "/panel/design-review";
            }}
            onSkip={finishOnboarding}
          />
        )}
      </AnimatePresence>
    </>
  );
}
