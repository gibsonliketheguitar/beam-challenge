import { atom } from "jotai";

export const teamNameAtom = atom<string>("");
export const rosterAtom = atom<any>(null);
export const importModalAtom = atom<boolean>(false);
export const searchAtom = atom<string>("");
