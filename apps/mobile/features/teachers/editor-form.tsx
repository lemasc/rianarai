import { RealmContext, FormSchema } from "db/models";
import { Teacher } from "db/models/Teacher";
import { Button, Heading, Text, VStack } from "native-base";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "ui/form";

import { userStore } from "../user";

const { useRealm } = RealmContext;

const defaultValues: Partial<FormSchema<Teacher>> = {
  name: "",
  description: "",
};

export const TeacherEditorForm = ({
  teacher,
  onClose,
}: {
  teacher?: Teacher;
  onClose: () => void;
}) => {
  const { control, handleSubmit, reset } = useForm<FormSchema<Teacher>>();
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
          if (teacher) {
            teacher.name = name;
            teacher.description = description;
            return teacher;
          }
          return new Teacher(realm, { name, description, userId });
        });
        reset();
        onClose();
      } catch (err) {
        console.error(err);
      }
    }),
    [reset, onClose, teacher],
  );

  useEffect(() => {
    if (teacher) {
      const { name, description } = teacher;
      reset({
        name,
        description,
      });
    } else {
      reset(defaultValues);
    }
  }, [teacher]);

  const isEdit = typeof teacher !== "undefined";

  return (
    <VStack space={2}>
      <Heading>{isEdit ? "แก้ไข" : "เพิ่ม"}รายวิชา</Heading>
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
      <Button onPress={submit} rounded="lg" my="2">
        <Text fontWeight="medium">{isEdit ? "แก้ไข" : "เพิ่ม"}</Text>
      </Button>
    </VStack>
  );
};
