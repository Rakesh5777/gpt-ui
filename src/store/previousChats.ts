import { atom } from "recoil";

export const previousChatsAtom = atom({
  key: "previousChatsAtom",
  default: {
    chats: [
      { name: "how to use recoil in react, and how to use recoil in angular" },
      { name: "what is best angular or react" },
      { name: "generate random number in python" },
      { name: "please open react documentation" },
    ],
  },
});
