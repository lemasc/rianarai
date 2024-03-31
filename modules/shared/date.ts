import {
  set,
  compareAsc,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
} from "date-fns";

const unsetTimeForDate = (date: Date) => {
  return set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
};

export const formatDateDistance = (date: Date) => {
  date = unsetTimeForDate(date);
  const now = unsetTimeForDate(new Date());
  const compareToNow = compareAsc(now, date);
  if (compareToNow === 0) {
    return "วันนี้";
  }
  const isFuture = compareToNow === -1;
  // calculate difference in days
  const daysDiff = Math.abs(differenceInDays(date, now));
  if (daysDiff === 1) {
    return isFuture ? "พรุ่งนี้" : "เมื่อวาน";
  }
  let str = "";

  if (daysDiff < 7) {
    str = daysDiff + " วัน";
  } else {
    // we catch long durations (months, years) first
    const monthsDiff = Math.abs(differenceInMonths(date, now));
    if (monthsDiff >= 12) {
      // too long, truncate to years
      const years = Math.floor(monthsDiff / 12);
      str = years + " ปี";
    } else if (monthsDiff >= 1) {
      // more than 1 month, show in months
      str = monthsDiff + " เดือน";
    } else {
      // probably less than a month, show in weeks
      const weeksDiff = Math.abs(differenceInWeeks(date, now));
      str = weeksDiff + " สัปดาห์";
    }
  }

  if (isFuture) {
    return "อีก " + str;
  } else {
    return str + "ที่แล้ว";
  }
};
