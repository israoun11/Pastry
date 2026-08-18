import React, { useEffect, useState } from "react";
import { isStoreOpen, getClosedBannerMessage } from "../utils/storeHours";
import "./StoreStatusBanner.css";

const StoreStatusBanner = () => {
  const [closedMessage, setClosedMessage] = useState(getClosedBannerMessage());

  // Re-check every minute so the banner appears/disappears live at 8:00 / 19:30
  useEffect(() => {
    const interval = setInterval(() => {
      setClosedMessage(getClosedBannerMessage());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (isStoreOpen() || !closedMessage) return null;

  return (
    <div className="store-status-banner" role="status">
      <p>{closedMessage}</p>
    </div>
  );
};

export default StoreStatusBanner;