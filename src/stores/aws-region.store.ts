import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AWSRegionStore = {
  region: string;
  setRegion: (region: string) => void;
};

export const useAWSRegionStore = create<AWSRegionStore>()(
  persist(
    (set) => ({
      region: "us-east-1",
      setRegion: (region: string) => set({ region }),
    }),
    {
      name: "compose/aws-region-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
