import Request from "../index";

export function getPageListRequest(url: string, data: any) {
  return Request.post({
    url,
    data,
  });
}

export function deleteUserRequest(url: string) {
  // console.log("delete URL:", url);
  return Request.delete({
    url,
  });
}

export function createPageDataRequest(url: string, data: any) {
  return Request.post({
    url,
    data,
  });
}

export function editPageDataRequest(url: string, data: any) {
  return Request.patch({
    url,
    data,
  });
}
