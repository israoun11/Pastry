// storeHours.js
// Central source of truth for store operating hours + pickup date validation

export const STORE_OPEN_HOUR = 8; // 08:00
export const STORE_OPEN_MINUTE = 0;
export const STORE_CLOSE_HOUR = 19; // 19:30
export const STORE_CLOSE_MINUTE = 30;

const toMinutes = (h, m) => h * 60 + m;

const OPEN_MINUTES = toMinutes(STORE_OPEN_HOUR, STORE_OPEN_MINUTE);
const CLOSE_MINUTES = toMinutes(STORE_CLOSE_HOUR, STORE_CLOSE_MINUTE);

/** Is the store open right now (or at a given reference date)? */
export const isStoreOpen = (referenceDate = new Date()) => {
  const minutesNow = referenceDate.getHours() * 60 + referenceDate.getMinutes();
  return minutesNow >= OPEN_MINUTES && minutesNow < CLOSE_MINUTES;
};

/** Human readable "Open Now" / "Closed" label */
export const getStoreStatusLabel = (referenceDate = new Date()) =>
  isStoreOpen(referenceDate) ? "Open Now" : "Closed";

export const formatStoreHours = () => "8:00 AM – 7:30 PM";

/** Message for the top closed-store banner, or null if currently open */
export const getClosedBannerMessage = (referenceDate = new Date()) => {
  if (isStoreOpen(referenceDate)) return null;

  const minutesNow = referenceDate.getHours() * 60 + referenceDate.getMinutes();

  if (minutesNow < OPEN_MINUTES) {
    return "Our lab is currently closed. We open today at 8:00 AM.";
  }
  return "Our lab is currently closed. We reopen tomorrow at 8:00 AM.";
};

/** Format a Date object as YYYY-MM-DD for <input type="date" /> */
export const toDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Earliest valid pickup date (YYYY-MM-DD), accounting for:
 * - today being disabled once we're past closing time (19:30)
 * - an optional per-product notice period (in hours)
 */
export const getMinPickupDate = (noticeHours = 0, referenceDate = new Date()) => {
  const now = new Date(referenceDate);
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  let earliest = new Date(now);

  // Past closing time -> earliest possible pickup is tomorrow
  if (minutesNow >= CLOSE_MINUTES) {
    earliest.setDate(earliest.getDate() + 1);
  }

  // Apply the product's required notice window on top of "now"
  if (noticeHours > 0) {
    const noticeDate = new Date(now.getTime() + noticeHours * 60 * 60 * 1000);
    if (noticeDate > earliest) {
      earliest = noticeDate;
    }
  }

  earliest.setHours(0, 0, 0, 0);
  return toDateInputValue(earliest);
};

/** Validate a chosen pickup date string against notice hours */
export const isPickupDateValid = (dateStr, noticeHours = 0, referenceDate = new Date()) => {
  if (!dateStr) return false;
  const minDate = getMinPickupDate(noticeHours, referenceDate);
  return dateStr >= minDate;
};

/** Nicely formatted date for display, e.g. "Saturday, 22 August" */
export const formatPickupDate = (dateStr) => {
  if (!dateStr) return "No date selected";
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};