import React, { useEffect, useState } from "react";
import Badge from "./Badge";
import "./DropCard.css";

const getTimeParts = (targetDate) => {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

const pad = (n) => String(n).padStart(2, "0");

const DropCard = ({ drop }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeParts(drop.dropEndsAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeParts(drop.dropEndsAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [drop.dropEndsAt]);

  return (
    <div className="drop-card">
      <div className="drop-card__image-wrap">
        <img src={drop.image} alt={drop.name} className="drop-card__image" loading="lazy" />
        <div className="drop-card__badges">
          <Badge type="limited" />
          {drop.photoWorthy && <Badge type="photo-worthy" />}
        </div>
      </div>

      <div className="drop-card__body">
        <h3 className="drop-card__name">{drop.name}</h3>
        <p className="drop-card__description">{drop.description}</p>

        <div className="drop-card__footer">
          <span className="drop-card__price">€{drop.price.toFixed(2)}</span>

          {timeLeft ? (
            <div className="drop-card__countdown" aria-label="Time remaining">
              <span>{pad(timeLeft.days)}d</span>
              <span>{pad(timeLeft.hours)}h</span>
              <span>{pad(timeLeft.minutes)}m</span>
              <span>{pad(timeLeft.seconds)}s</span>
            </div>
          ) : (
            <span className="drop-card__ended">Drop Ended</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropCard;