import { atom } from "recoil";

export let queryAtom = atom({
  key: "query",
  default: [],
});

export let selectedQAtom = atom({
  key: "selectedQuery",
  default: {},
});

export let savedLayoutsAtom = atom({
  key: "savedLayouts",
  default: [],
});
