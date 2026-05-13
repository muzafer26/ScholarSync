
"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  onOpened?: () => void;
};

export function InteractiveDoor({ isOpen, onToggle, onOpened }: Props) {
  const onOpenedCalled = useRef(false);

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    // We only care about the transform property finishing to avoid multiple calls
    if (event.propertyName !== 'transform') return;

    if (isOpen && !onOpenedCalled.current) {
      onOpened?.();
      onOpenedCalled.current = true;
    }
  };

  const handleClick = () => {
    // Prevent toggling again if it's already opening/open
    if (!isOpen) {
      onToggle();
    }
  }

  return (
    <div className="door-container" onClick={handleClick} title="Click to open">
      <div className="door-frame">
        <div 
          className={cn("door", { open: isOpen })}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="door-face door-front">
            <div className="door-panel" />
            <div className="door-handle" />
            <div className="door-panel" />
          </div>
          <div className="door-face door-back" />
        </div>
      </div>
      <div className={cn("door-glow", { open: isOpen })} />
    </div>
  );
}
