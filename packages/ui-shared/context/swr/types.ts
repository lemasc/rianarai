import { ComponentProps } from "react";
import { SWRConfig } from "swr";

export type SWRConfigValue = ComponentProps<typeof SWRConfig>["value"];
