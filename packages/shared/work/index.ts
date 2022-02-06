import { CourseWork, WorkState } from "@rianarai/classroom/types";
import dayjs from "dayjs";
import colors from "./colors";

type WorkStateWithLate = WorkState | "LATE";

export function createState(
  state?: WorkState,
  work?: CourseWork
): WorkStateWithLate {
  if (!state || !work) return "CREATED";
  if (!isWorkSubmitted(state) && isLate(work)) {
    return "LATE";
  }
  return state ?? "CREATED";
}

export function isLate(work: CourseWork) {
  const dueDate = createDueDate(work);
  return dueDate && dayjs().isAfter(dueDate);
}

export function isWorkSubmitted(state?: WorkState) {
  return state && (state === "TURNED_IN" || state === "RETURNED");
}

export function createDueDate(work: CourseWork) {
  if (!work || !work.dueDate) return undefined;
  let instance = dayjs(
    [work.dueDate.year, work.dueDate.month, work.dueDate.day].join("/")
  );
  if (work.dueTime?.hours) {
    instance = instance
      .hour(work.dueTime.hours + 7)
      .minute(work.dueTime.minutes ?? 0);
  } else {
    instance = instance.hour(23).minute(59);
  }
  return instance;
}

export function getColor(state: WorkStateWithLate) {
  return colors[state] ? colors[state] : colors["DEFAULT"];
}

export function getStateName(state: WorkStateWithLate) {
  switch (state) {
    case "RETURNED":
      return "ส่งคืนแล้ว";
    case "TURNED_IN":
      return "ส่งแล้ว";
    case "LATE":
      return "เลยกำหนด";
    default:
      return "มอบหมายแล้ว";
  }
}
