"use client";

import { Joyride, STATUS, type EventData, type Step } from "react-joyride";
import { useEffect, useState } from "react";

const steps: Step[] = [
  {
    target: "[data-tour='sidebar']",
    title: "Navigate operations",
    content: "Move between portfolio health, Protocol Hub readiness, AI coworker, workflows, Banking Hands, approvals, runs, audit, and integrations.",
    skipBeacon: true
  },
  {
    target: "[data-tour='topbar']",
    title: "Check status and profile",
    content: "The top bar shows search, current mode, role context, pending approvals, notifications, theme, and profile."
  },
  {
    target: "[data-tour='ask-ai']",
    title: "Ask AI anywhere",
    content: "Use this shortcut from any page to ask the compliance-aware coworker about a Banking Hand."
  }
];

export function OnboardingTour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("kyne-onboarding-seen");
    if (!seen) {
      const timer = window.setTimeout(() => setRun(true), 700);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  function handleEvent(data: EventData) {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      localStorage.setItem("kyne-onboarding-seen", "true");
      setRun(false);
    }
  }

  return (
    <Joyride
      continuous
      onEvent={handleEvent}
      run={run}
      scrollToFirstStep={false}
      steps={steps}
      options={{
        arrowColor: "#0b1d4d",
        backgroundColor: "#0b1d4d",
        overlayColor: "rgba(2, 6, 23, 0.42)",
        primaryColor: "#38bdf8",
        textColor: "#ffffff",
        zIndex: 70
      }}
      styles={{
        tooltip: {
          borderRadius: 10,
          border: "3px double #ffffff",
          boxShadow: "0 20px 50px rgba(2, 6, 23, 0.35)"
        },
        buttonPrimary: {
          borderRadius: 8,
          color: "#031332",
          fontWeight: 700
        },
        buttonBack: {
          color: "#dbeafe"
        }
      }}
    />
  );
}
