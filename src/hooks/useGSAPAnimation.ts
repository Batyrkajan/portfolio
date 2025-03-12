"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationTarget = string | object | Element | null;

interface GSAPAnimationOptions {
  trigger?: AnimationTarget;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  pin?: boolean;
  anticipatePin?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  from?: object;
  to?: object;
}

const useGSAPAnimation = (
  target: AnimationTarget,
  animation: object,
  options: GSAPAnimationOptions = {}
) => {
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const {
    trigger,
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
    markers = false,
    toggleActions = "play none none none",
    pin = false,
    anticipatePin = false,
    duration = 1,
    delay = 0,
    ease = "power2.out",
    stagger = 0,
    from,
    to,
  } = options;

  useEffect(() => {
    // Skip on server side
    if (typeof window === "undefined") return;

    // Create animation
    let config: gsap.TweenVars = {
      ...animation,
      duration,
      delay,
      ease,
      stagger,
    };

    // Clear any previous animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create animation with or without ScrollTrigger
    if (trigger) {
      config.scrollTrigger = {
        trigger: trigger,
        start,
        end,
        scrub,
        markers,
        toggleActions,
        pin,
        anticipatePin,
      };

      // Apply "from" and "to" animations with ScrollTrigger if specified
      if (from && to) {
        animationRef.current = gsap.fromTo(target, from, {
          ...to,
          scrollTrigger: config.scrollTrigger,
        });
      } else {
        animationRef.current = gsap.to(target, config);
      }
    } else {
      // Simple animation without ScrollTrigger
      if (from && to) {
        animationRef.current = gsap.fromTo(target, from, {
          ...to,
          duration,
          delay,
          ease,
        });
      } else {
        animationRef.current = gsap.to(target, config);
      }
    }

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [
    target,
    animation,
    trigger,
    start,
    end,
    scrub,
    markers,
    toggleActions,
    pin,
    anticipatePin,
    duration,
    delay,
    ease,
    stagger,
    from,
    to,
  ]);

  return animationRef;
};

export default useGSAPAnimation;
