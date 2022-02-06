import React from "react";
import { SWRConfig } from "swr";
import options from "./options";

export default function SWRContext({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 30 * 1000,
        focusThrottleInterval: 10 * 1000,
        ...options,
      }}
    >
      {children}
    </SWRConfig>
  );
}
