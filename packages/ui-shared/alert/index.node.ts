import { BrowserWindow, dialog } from "electron";
import { AlertOptions } from "./types";

type ElectronAlertOptions = Pick<
  AlertOptions<any>,
  "title" | "message" | "type"
> & {
  buttons: string[];
};

export async function alertAsync(
  browserWindow: BrowserWindow | undefined,
  { title, message, type, buttons }: ElectronAlertOptions
) {
  let dialogTitle: string;
  switch (type) {
    case "error":
      dialogTitle = "ข้อผิดพลาด";
      break;
    case "warning":
      dialogTitle = "คำเตือน";
      break;
    default:
      dialogTitle = "แจ้งเตือน";
  }
  return (
    await dialog.showMessageBox(browserWindow, {
      title: dialogTitle,
      message: title,
      detail: message,
      buttons,
      type,
    })
  ).response;
}
