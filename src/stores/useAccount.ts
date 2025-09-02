import { create } from "zustand";
import { accountApi } from "@/utils/api/list/account";

interface AccountState {
  getAccountInfo: () => Promise<any>;
}

export const useAccountStore = create<AccountState>((set) => ({
  getAccountInfo: async () => {
    return await accountApi.getAccountInfo();
  },
}));
