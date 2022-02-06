import { Meeting } from "@rianarai/classroom";
import getLinking from "./linking";

export default function launchMeeting(meeting: Meeting) {
  const linking = getLinking();
  const dynamicLink = (meeting: string, code: string): void => {
    const params = new URLSearchParams({ confno: meeting, pwd: code });
    const host = linking.isMobile()
      ? "zoomus://zoom.us/join?"
      : "zoommtg://zoom.us/join?";
    linking.openLink(host + params.toString());
  };

  let code = meeting.code;
  if (meeting.url && linking.getCodeFromUrl(meeting.url)) {
    code = linking.getCodeFromUrl(meeting.url);
  }
  if (meeting.id && code) dynamicLink(meeting.id, code);
}
