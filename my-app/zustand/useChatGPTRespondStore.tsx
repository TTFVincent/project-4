import { response } from "express";
import { create } from "zustand";

interface UseChatGPTRespond {
  respond: object;
  saveRespond: (prompt: any) => void;
}

export const useChatGPTRespond = create<UseChatGPTRespond>((set) => ({
  respond: {},
  saveRespond: (state: any) => set(() => ({ respond: state })),
}));
