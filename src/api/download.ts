// eslint-disable-next-line @typescript-eslint/no-unused-vars
import App from "../taskpane/components/App";
import { get } from "../utils/request";

export function getDonloadFile(downloadUrl) {
  return get(downloadUrl);
}

export function getDonloadUrl(contentId) {
  let headers = {
    Authorization: "Basic T2ZmaWNlQWRkaW46SDRjazR0aDBu", // account for test
  };
  let url = "https://api.officeplus.cn/api/v2.0/officeaddin/content/" + contentId + "/download-url";
  return get(url, {
    headers,
  });
}
