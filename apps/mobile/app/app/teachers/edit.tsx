import { WithObjectId, WithObjectIdProps } from "db/components";
import { RealmContext } from "db/models";
import { Teacher } from "db/models/Teacher";
import { TeacherEditorPage } from "mobile/features/teachers";
import { useEffect } from "react";

const { useObject } = RealmContext;

function TeacherEditPage({ objectId, showFallback }: WithObjectIdProps) {
  const teacher = useObject(Teacher, objectId);

  useEffect(() => {
    if (!teacher) {
      showFallback();
    }
  }, [showFallback, teacher]);

  return teacher ? <TeacherEditorPage teacher={teacher} /> : null;
}

export default WithObjectId(TeacherEditPage, {
  fallbackRoute: "/app/teachers",
});
