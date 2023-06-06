import { RealmContext, FormSchema } from "db/models";
import { Course } from "db/models/Course";
import { Button, ScrollView, Text, VStack } from "native-base";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "ui/form";

import { ScheduleEditor } from "../schedule/editor";
import { userStore } from "../user";

const { useRealm } = RealmContext;

const defaultValues: Partial<FormSchema<Course>> = {
  name: "",
  description: "",
};

export const CourseEditorForm = ({ course }: { course?: Course }) => {
  const { control, handleSubmit, reset } = useForm<FormSchema<Course>>();
  const realm = useRealm();
  const submit = useCallback(
    handleSubmit(({ name, description }) => {
      try {
        const { realmUser } = userStore.getState();
        if (!realmUser) {
          throw new Error("User not logged in");
        }
        const userId = realmUser.id;

        realm.write(() => {
          if (course) {
            course.name = name;
            course.description = description;
            return course;
          }
          return new Course(realm, { name, description, userId });
        });
        reset();
        //onClose();
      } catch (err) {
        console.error(err);
      }
    }),
    [reset, course],
  );

  useEffect(() => {
    if (course) {
      const { name, description } = course;
      reset({
        name,
        description,
      });
    } else {
      reset(defaultValues);
    }
  }, [course]);

  const isEdit = typeof course !== "undefined";

  return (
    <ScrollView p="4">
      <VStack space={4}>
        <VStack space={2}>
          <TextInput
            controller={{
              control,
              label: "ชื่อ",
              name: "name",
              rules: { required: true },
            }}
          />
          <TextInput
            controller={{ control, label: "คำอธิบาย", name: "description" }}
          />
        </VStack>
        <ScheduleEditor />
        <Button onPress={submit} rounded="lg" my="2">
          <Text fontWeight="medium">{isEdit ? "แก้ไข" : "เพิ่ม"}</Text>
        </Button>
      </VStack>
    </ScrollView>
  );
};
