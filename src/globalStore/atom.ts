import {atom} from 'jotai';

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
    city?: string;
    state?: string;
  }
export const isLoginClicked = atom(false);
export const userName = atom<string>("");
export const userEmail = atom<string>("");
export const isCookieSet = atom<boolean>(false);
export const defaultSize = atom<number>(10);
export const page = atom<number>(1);
export const dataCount = atom<number>(0);
export const sort = atom<string>("");
export const breeds = atom<string[]>([]);
export const minAge = atom<number>(0);
export const maxAge = atom<number>(100);
export const states = atom<string[]>([]);
export const zipCodes = atom<string[]>([]);
export const selectedDogs = atom<Dog[]>([]);
export const selectedStates = atom<string[]>([]);
export const error = atom<boolean>(false);
export const errorMessage = atom<string>("");