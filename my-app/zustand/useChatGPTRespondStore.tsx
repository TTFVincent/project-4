import { response } from "express";
import { create } from "zustand";
import { TripLocation } from "../constants/TripLocation";

interface UseChatGPTRespond {
  response: TripLocation[] | null;
  saveRespond: (prompt: any) => void;
}

export const useChatGPTRespond = create<UseChatGPTRespond>((set) => ({
  response: null,
  saveRespond: (response: TripLocation[]) => set(() => ({ response })),
}));
