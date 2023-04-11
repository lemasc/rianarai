import BottomSheet from "@gorhom/bottom-sheet";
import { WithObjectId, WithObjectIdProps } from "db/components";
import { RealmContext } from "db/models";
import { Teacher } from "db/models/Teacher";
import { useEffect, useRef } from "react";
import { BottomSheetAlertPage } from "ui/bottom-sheet";

const { useRealm, useObject } = RealmContext;

function TeacherDeletePage({ objectId, showFallback }: WithObjectIdProps) {
  const ref = useRef<BottomSheet>(null);

  const realm = useRealm();
  const teacher = useObject(Teacher, objectId);

  const deleteAction = () => {
    realm.write(() => {
      realm.delete(teacher);
    });
  };

  useEffect(() => {
    if (!teacher) {
      showFallback();
    }
  }, [showFallback, teacher]);

  return (
    <BottomSheetAlertPage
      ref={ref}
      title="ลบครูผู้สอน"
      message="คุณต้องการลบครูผู้สอนหรือไม่"
      buttons={[
        {
          text: "ยกเลิก",
          type: "close",
          variant: "outline",
          colorScheme: "red",
        },
        {
          text: "ลบ",
          onPress: deleteAction,
          colorScheme: "red",
        },
      ]}
    />
  );
}

export default WithObjectId(TeacherDeletePage, {
  fallbackRoute: "/app/teachers",
});
