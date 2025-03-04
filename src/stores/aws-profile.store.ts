import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AWSProfileStore = {
  profile: string;
  setProfile: (region: string) => void;
};

export const useAWSProfileStore = create<AWSProfileStore>()(
  persist(
    (set) => ({
      profile: "",
      setProfile: (profile: string) => set({ profile }),
    }),
    {
      name: "compose/aws-profile-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
