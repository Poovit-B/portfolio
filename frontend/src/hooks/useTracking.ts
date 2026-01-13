import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analyticsApi } from "../services/api";

// Generate or get session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

// Track page views automatically
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const sessionId = getSessionId();
    const path = location.pathname + location.hash;

    // Don't track admin pages
    if (path.includes("/login") || path.includes("/dashboard")) {
      return;
    }

    analyticsApi.trackPageView(path, sessionId);
  }, [location]);
};

// Track click events
export const trackClick = (
  elementId: string,
  elementText?: string,
  elementType?: string,
  href?: string
) => {
  const sessionId = getSessionId();
  const path = window.location.pathname + window.location.hash;

  analyticsApi.trackClick({
    elementId,
    elementText,
    elementType,
    path,
    href,
    sessionId,
  });
};

// HOC to add click tracking to buttons/links
export const withTracking = (
  onClick: (() => void) | undefined,
  elementId: string,
  elementText?: string
) => {
  return () => {
    trackClick(elementId, elementText, "button");
    onClick?.();
  };
};
