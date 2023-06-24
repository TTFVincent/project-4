import { response } from "express";
import { create } from "zustand";
import { TripLocation } from "../constants/TripLocation";

export interface UseChatGPTResponse {
  response: TripLocation[] | null;
  saveResponse: (prompt: any) => void;
}

export const useChatGPTResponse = create<UseChatGPTResponse>((set) => ({
  response: null,
  saveResponse: (response: TripLocation[]) => set(() => ({ response })),
}));
