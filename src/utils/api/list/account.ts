import APIBuilder from "@/utils/api/APIBuilder";

type AccountInfo = {
  userId: string;
  userName: string;
};

export const accountApi = {
  getAccountInfo: async () => {

    const data = await APIBuilder.get("/order/get/user/list").build().call<AccountInfo>()
    return data['data'] as AccountInfo[];
  },
  getOrderInfo: async(id: string) => {
    const data = await  APIBuilder.get("/order/get/list",).params({id}).build().call()

    const unique = data['data'].filter(
        (item, index, self) =>
            index === self.findIndex((t) => t.name === item.name)
    );

    return unique;
  },
  getDetailOrderInfo: async(name: string,userId: string) => {

    const data = await APIBuilder.get("/order/get/detail/list").params({name,userId}).build().call();

    return data['data'];
  },
  callOrder: async(type:'open' | 'close' | 'allClose' ,userId: string,orderId: string,name: string,count:string ,side: string)=>{

    const data = await APIBuilder.post("/order/call",{type,userId,name,count,side,orderId}).build().call();

    // return data['data'];
  }



};
