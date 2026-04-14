"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroGreeting from "@/components/panel/dashboard/HeroGreeting";
import ProjectStatus from "@/components/panel/dashboard/ProjectStatus";
import ActionItems from "@/components/panel/dashboard/ActionItems";
import QuickStats from "@/components/panel/dashboard/QuickStats";
import ActivityFeed from "@/components/panel/dashboard/ActivityFeed";
import WelcomeOverlay from "@/components/panel/onboarding/WelcomeOverlay";
import SpotlightTour from "@/components/panel/onboarding/SpotlightTour";
import FirstAction from "@/components/panel/onboarding/FirstAction";

const ONBOARDING_KEY = "makeit_onboarding_done";
type OnboardingStep = "welcome" | "tour" | "firstAction" | null;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: {
    duration: 0.4,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

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
      <div className="flex flex-col gap-3.5">
        {/* Greeting */}
        <HeroGreeting />

        {/* Project status (2/3) + Actions (1/3) */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div className="col-span-2" {...fadeUp(0.04)}>
            <ProjectStatus />
          </motion.div>
          <motion.div className="col-span-1" {...fadeUp(0.08)} data-tour="actions">
            <ActionItems />
          </motion.div>
        </div>

        {/* Stats with sparklines */}
        <motion.div {...fadeUp(0.12)}>
          <QuickStats />
        </motion.div>

        {/* Activity */}
        <motion.div {...fadeUp(0.16)}>
          <ActivityFeed />
        </motion.div>
      </div>

      {/* Onboarding */}
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
