import { Teacher } from "db/models/Teacher";
import { useRef } from "react";
import { BottomSheetMethods, BottomSheetPage } from "ui/bottom-sheet";

import { TeacherEditorForm } from "./editor-form";

export const TeacherEditorPage = ({ teacher }: { teacher?: Teacher }) => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  return (
    <BottomSheetPage
      ref={bottomSheetRef}
      canClose
      px="6"
      py="4"
      snapPoints={["45%"]}
    >
      <TeacherEditorForm
        teacher={teacher}
        onClose={() => {
          bottomSheetRef.current?.close();
        }}
      />
    </BottomSheetPage>
  );
};
