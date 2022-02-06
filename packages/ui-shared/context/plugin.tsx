import React from "react";

import { AuthChangeEvent } from "@rianarai/classroom/types/events";
import RianAraiClassroom from "@rianarai/classroom/core";
import { ContextProps } from "./types";

export interface IPluginContext {
  classroom: RianAraiClassroom;
  status?: AuthChangeEvent;
}

const pluginContext = React.createContext<IPluginContext | undefined>(
  undefined
);

export const usePlugin = (): IPluginContext => {
  const ctx = React.useContext(pluginContext);
  if (!ctx) throw new Error("usePlugin: Provider not found");
  return ctx;
};

function useProvidePlugin(): IPluginContext {
  const classroom = React.useRef<RianAraiClassroom>();
  const [status, setAuthStatus] = React.useState<AuthChangeEvent | undefined>();

  React.useEffect(() => {
    classroom.current = new RianAraiClassroom();
    classroom.current.events.addListener("auth-changed", setAuthStatus);
    try {
      classroom.current.initialize();
    } catch (err) {
      console.error(err);
    }
    return () =>
      classroom.current?.events.removeListener(
        "auth-changed",
        setAuthStatus
      ) as never;
  }, [setAuthStatus]);

  return {
    classroom: classroom.current as RianAraiClassroom,
    status,
  };
}

export function PluginProvider({ children }: ContextProps) {
  const plugin = useProvidePlugin();
  return (
    <pluginContext.Provider value={plugin}>{children}</pluginContext.Provider>
  );
}
