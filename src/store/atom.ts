import { atom } from "jotai";
import { STARTER } from "../utils/constant/PLAYER";

export const teamNameAtom = atom<string>("");
export const rosterAtom = atom<any>(null);
export const starterAtom = atom((get) => {
  const roster = get(rosterAtom) || [];
  return roster.filter((player: any) => player[STARTER] === "Yes");
});
export const importModalAtom = atom<boolean>(false);
export const searchAtom = atom<string>("");
