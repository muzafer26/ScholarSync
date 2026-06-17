
"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  onChestOpen: () => void;
};

export function InteractiveTreasureChest({ onChestOpen }: Props) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (!isOpening) {
      setIsOpening(true);
    }
  };
  
  const handleAnimationEnd = (e: React.AnimationEvent<SVGGElement>) => {
    if (e.animationName === 'openChestTop') {
      // Add a slight delay for effect before showing cards
      setTimeout(() => {
        onChestOpen();
      }, 300);
    }
  };

  return (
    <div id="chest-wrap" onClick={handleClick} className="cursor-pointer">
      <svg
        id="chest"
        className={cn({ "shake-chest": !isOpening, "open-chest": isOpening })}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
      >
        <g id="chest-bottom">
          <path className="cls-16" d="M68.8,363.8H431.2a15,15,0,0,0,15-15V245.3H53.8V348.8A15,15,0,0,0,68.8,363.8Z"/>
          <path className="cls-1" d="M431.2,356.5H68.8a7.7,7.7,0,0,1-7.7-7.7V252.6h377.8v96.2A7.7,7.7,0,0,1,431.2,356.5Z"/>
          <path className="cls-4" d="M109.4,356.5V252.6h-33v96.2a15,15,0,0,0,15,15h18Z"/>
          <path className="cls-4" d="M423.9,252.6V356.5h-33V252.6Z"/>
          <rect className="cls-4" x="76.4" y="252.6" width="347.5" height="23.5"/>
          <path className="cls-2" d="M446.2,348.8V245.3H53.8V348.8a15,15,0,0,0,15,15H431.2A15,15,0,0,0,446.2,348.8Z" style={{fill: "none", stroke: "#3c2415", strokeMiterlimit: 10, strokeWidth: "15px"}}/>
        </g>
        <g id="chest-top" onAnimationEnd={handleAnimationEnd}>
          <path className="cls-1" d="M431.2,137.5H68.8a15,15,0,0,0-15,15V252.8H446.2V152.5A15,15,0,0,0,431.2,137.5Z"/>
          <path className="cls-16" d="M68.8,245.5H431.2a7.7,7.7,0,0,0,7.7-7.7V152.5a7.7,7.7,0,0,0-7.7-7.7H68.8a7.7,7.7,0,0,0-7.7,7.7v85.3A7.7,7.7,0,0,0,68.8,245.5Z"/>
          <path className="cls-4" d="M109.4,245.5V144.8h-33v85.3a15,15,0,0,0,15,15h18Z"/>
          <path className="cls-4" d="M423.9,144.8V245.5h-33V144.8Z"/>
          <path className="cls-2" d="M446.2,152.5V252.8H53.8V152.5a15,15,0,0,1,15-15H431.2A15,15,0,0,1,446.2,152.5Z" style={{fill: "none", stroke: "#3c2415", strokeMiterlimit: 10, strokeWidth: "15px"}}/>
          <path className="cls-5" d="M431.2,137.5c0-48.7-85.7-87.5-181.2-87.5S68.8,88.8,68.8,137.5Z"/>
          <path className="cls-1" d="M250,57.3c90,0,173.9,35.9,173.9,80.2H76.1C76.1,93.2,160,57.3,250,57.3Z"/>
          <path className="cls-2" d="M431.2,137.5C431.2,88.8,345.5,50,250,50S68.8,88.8,68.8,137.5Z" style={{fill: "none", stroke: "#3c2415", strokeMiterlimit: 10, strokeWidth: "15px"}}/>
        </g>
        <g id="chest-lock">
          <path className="cls-3" d="M279.4,263.8H220.6a11.3,11.3,0,0,1-11.3-11.3V218.1a11.3,11.3,0,0,1,11.3-11.3h58.8a11.3,11.3,0,0,1,11.3,11.3v34.4A11.3,11.3,0,0,1,279.4,263.8Z"/>
          <circle className="cls-6" cx="250" cy="242.5" r="8.8"/>
          <path className="cls-10" d="M250,233.8a8.8,8.8,0,1,1-8.8,8.7A8.8,8.8,0,0,1,250,233.8Z"/>
        </g>
        <g id="chest-sparkles">
          <path id="sparkle_mid" className="cls-25" d="M250,117.5l-12.5,12.5,12.5,12.5,12.5-12.5Z"/>
          <path id="sparkle_left" className="cls-25" d="M187.5,150l-12.5,12.5,12.5,12.5,12.5-12.5Z"/>
          <path id="sparkle_right" className="cls-25" d="M312.5,150l-12.5,12.5,12.5,12.5,12.5-12.5Z"/>
        </g>
      </svg>
    </div>
  );
}
