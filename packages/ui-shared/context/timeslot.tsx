import React from "react";
import dayjs from "dayjs";

import {
  State,
  TimeSlots,
  TimeSlotsMemory,
} from "@rianarai/classroom/types/meeting";
import { useSchedule } from "@rianarai/classroom";
import { useAuth } from "./auth";
import { ContextProps } from "./types";

export interface Schedule {
  [days: string]: TimeSlots[];
}

export interface ITimeSlotContext {
  /**
   * Current day. (Sunday, Monday, ...)
   */
  curDay: string;
  /**
   * The global Date instance, shared between components.
   */
  date: Date;
  /**
   * The slots that are currently running.
   */
  slots: TimeSlotsMemory;
  /**
   * The current timetable state.
   */
  state: State;
  /**
   * Indicates whether the next slot is in time or not.
   */
  nextSlot: boolean;
}

const timeslotContext = React.createContext<ITimeSlotContext | undefined>(
  undefined
);

export const useTimeslot = (): ITimeSlotContext => {
  const ctx = React.useContext(timeslotContext);
  if (!ctx) throw new Error("useTimeslot must be within TimeSlotProvider");
  return ctx;
};

/**
 * The application requires a background service,
 * which will listen and update slots according to the current time.
 *
 * We move the same logic code into a seperate global context
 * to make it simpler to do any other tasks (such as notifications).
 */
function useProvideTimeslot(): ITimeSlotContext {
  const { metadata } = useAuth();
  const { data: schedule } = useSchedule();
  const [currentClass, setClass] = React.useState<string | null>(null);
  const [nextSlot, setNextSlot] = React.useState(false);
  const [slots, setSlots] = React.useState<TimeSlotsMemory>({
    active: null,
    next: null,
  });
  const [state, setState] = React.useState<State>("");
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const [date, setDate] = React.useState(new Date());
  const [curDay, setCurDay] = React.useState<string>("sunday");

  React.useEffect(() => {
    const timerID = setInterval(() => {
      const d = new Date();
      setDate(d);
      setCurDay(days[d.getDay()]);
    }, 1000);
    return () => clearInterval(timerID);
  });

  // Main logic code.
  React.useEffect(() => {
    if (!metadata) {
      setClass(null);
      return;
    }
    function getActualTime(t: string): string {
      return dayjs()
        .hour(parseInt(t.slice(0, 2)))
        .minute(parseInt(t.slice(3)))
        .subtract(10, "minutes")
        .format("HH:mm");
    }
    const inTimeRange = (time: string, slot: TimeSlots): boolean => {
      return slot && time >= getActualTime(slot.start) && time <= slot.end;
    };
    const inNextRange = (
      time: string,
      slot: TimeSlots,
      next: TimeSlots
    ): boolean => {
      return (
        slot && next && time >= getActualTime(next.start) && time < slot.end
      );
    };
    if (!schedule) return setState("");
    if (schedule[curDay]) {
      // We generate it ourselves instead of relying toLocaleTimeString (locale affects the result string)
      const timeString = [date.getHours(), date.getMinutes()]
        .map((no) => no.toString().padStart(2, "0"))
        .join(":");
      const target = schedule[curDay];
      // If the time is still in range, don't check anything.
      if (
        slots.active &&
        slots.next &&
        inTimeRange(timeString, slots.active) &&
        metadata.class === currentClass
      ) {
        setNextSlot(inNextRange(timeString, slots.active, slots.next));
        setState("active");
        return;
      }

      // Out of range, start recheck
      if (timeString < getActualTime(target[0].start)) {
        setSlots({ active: null, next: target[0] });
        setState("start");
        return;
      }
      if (timeString > target[target.length - 1].end) {
        setSlots({ active: null, next: null });
        setState("end");
        return;
      }
      for (let i = 0; i < target.length; i++) {
        if (inTimeRange(timeString, target[i])) {
          setSlots({
            active: target[i],
            next: target[i + 1] ? target[i + 1] : null,
          });
          setState("active");
          setNextSlot(inNextRange(timeString, target[i], target[i + 1]));
        } else if (
          target[i + 1] &&
          timeString > target[i].end &&
          timeString < getActualTime(target[i + 1].start)
        ) {
          setSlots({ active: null, next: target[i + 1] });
          setState("break");
        }
      }
      setClass(metadata.class.toString());
      return;
    }
    setSlots({ active: null, next: null });
    setState("active");
  }, [
    schedule,
    curDay,
    date,
    metadata,
    slots.next,
    slots.active,
    currentClass,
  ]);

  // Notifications
  /* useEffect(() => {
    if (router.pathname.includes('splash')) return
    function send(slot: TimeSlots, now?: boolean): void {
      setNotif((notif) => {
        if (notif) notif.close()
        const newNotif = new Notification(
          `รายวิชา${now ? 'ปัจจุบัน' : 'ต่อไป'} - ${slot.start} น.`,
          {
            body: `${slot.code.join('/')} (${slot.teacher.join('/')})`,
          }
        )
        newNotif.onclick = () => {
          emitEvent('focus-window')
          router.replace('/')
        }
        return newNotif
      })
    }
    if (slots.active !== null && !splash) {
      send(slots.active, true)
      setSplash(true)
    } else if (state === 'active' && slots.next !== null && nextSlot) {
      send(slots.next)
    }
  }, [slots.next, slots.active, nextSlot, router, state, splash])*/

  return {
    date,
    curDay,
    slots,
    state,
    nextSlot,
  };
}

export function TimeslotProvider({ children }: ContextProps) {
  const timeslot = useProvideTimeslot();
  return (
    <timeslotContext.Provider value={timeslot}>
      {children}
    </timeslotContext.Provider>
  );
}
