import Cookies from "js-cookie";

interface IOptions {
  expires: Date | number;
}

export const COOKIE = {
  SET: (name: string, value: string, options?: IOptions) =>
    Cookies.set(name, value, options),
  GET: (name: string) => Cookies.get(name),
  REMOVE: (name: string) => Cookies.remove(name),
};
