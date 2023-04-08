import { createRealmContext } from "@realm/react";

import { Subject } from "./Subject";
import { Teacher } from "./Teacher";
import { Work } from "./Work";

export const RealmContext = createRealmContext({
  schema: [Work, Teacher, Subject],
});
