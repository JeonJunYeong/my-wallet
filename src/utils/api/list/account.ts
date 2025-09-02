import APIBuilder from "@/utils/api/APIBuilder";

type AccountInfo = {
  userId: string;
  userName: string;
};

export const accountApi = {
  getAccountInfo: async () => {
    return [
      { userId: "3cfd9c6d-5d1e-4c11-81c0-e075bce3684d", userName: "홍길동" },
    ] as AccountInfo[];
    // return APIBuilder.get("/api/accounts").build().call<AccountInfo>();
  },
};
