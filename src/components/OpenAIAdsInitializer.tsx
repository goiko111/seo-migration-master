import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasConsent } from "@/lib/analytics";
import { initializeOpenAIAds, isOpenAIAdsEligiblePath } from "@/lib/openaiAds";

const OpenAIAdsInitializer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenAIAdsEligiblePath(pathname)) {
      initializeOpenAIAds(hasConsent());
    }
  }, [pathname]);

  return null;
};

export default OpenAIAdsInitializer;
