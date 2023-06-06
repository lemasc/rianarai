import { createRealmContext } from "@realm/react";

import { Course } from "./Course";
import { Teacher } from "./Teacher";
import { Work } from "./Work";

export const RealmContext = createRealmContext({
  schema: [Work, Teacher, Course],
  deleteRealmIfMigrationNeeded: true,
});

export type FormSchema<T> = Omit<
  T,
  | keyof Realm.Object
  | ExtractPropertyNamesOfType<T, Function>
  | ExtractPropertyNamesOfType<T, Realm.Collection<any>>
  | ExtractPropertyNamesOfType<T, Realm.Dictionary>
  // ObjectID can't be set directly as a string value or whatever
  | ExtractPropertyNamesOfType<T, Realm.BSON.ObjectId>
>;
