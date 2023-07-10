// eslint-disable-next-line no-undef
const baseAPI = process.env.API_BASE_URL;

export const api = {
  search: {
    Word: baseAPI + "/v2.0/officeaddin/word-content/search",
    Excel: baseAPI + "/v2.0/officeaddin/excel-content/search",
    PowerPoint: baseAPI + "/v2.0/officeaddin/ppt-content/search?subcategoryIds=d0f06dda-fe75-4534-8a4d-46b91b2aefd4",
  },
  detail: {
    Word: baseAPI + "/v2.0/officeaddin/word-content/detail/",
    Excel: baseAPI + "/v2.0/officeaddin/excel-content/detail/",
    PowerPoint: baseAPI + "/v2.0/officeaddin/ppt-content/detail/",
  },
  tag: {
    url: baseAPI + "/v2.0/officeaddin/tagfeature",
    cat: {
      Word: "WORD",
      Excel: "EXCEL",
      PowerPoint: "PPT",
    },
  },
};
