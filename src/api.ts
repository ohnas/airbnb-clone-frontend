import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}/`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me/`).then((response) => response.data);
// user/me -> 오류발생
// user/me/ -> 마지막에 '/' 있어야 오류 발생하지 않음(backend 서버의 url.py에서 설정한url이 동일해야함)

export const logOut = () =>
  instance.post(`users/log-out/`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }).then((response) => response.data);
// user/log-out -> 오류발생
// user/log-out/ -> 마지막에 '/' 있어야 오류 발생하지 않음(backend 서버의 url.py에서 설정한url이 동일해야함)

export const githubLogIn = (code: string) =>
  instance
    .post(
      `/users/github/`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
// user/github -> 오류발생
// user/github/ -> 마지막에 '/' 있어야 오류 발생하지 않음(backend 서버의 url.py에서 설정한url이 동일해야함)