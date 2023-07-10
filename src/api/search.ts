// eslint-disable-next-line @typescript-eslint/no-unused-vars
import App from "../taskpane/components/App";
import { get } from "../utils/request";
import { api } from "./config";

export interface SearchParams {
  keywords?: string;
  ordering?: string;
  size?: string;
  start?: string;
  l2Tags?: string[]
}

export function getSearchedData(params) {
  let host = App.host.toString();
  return get(api.search[host], { params });
}

export function getDetailData(contentId) {
  let host = App.host.toString();
  let url = api.detail[host] + contentId;
  return get(url, {});
}
