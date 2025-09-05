import ResponsiveGridLayout from "@/layouts/ResponsiveGridLayout";
import Table from "@/components/Table/Table";
import { useAccountStore } from "@/stores/useAccount";
import { useEffect, useState } from "react";
import { useTableStore } from "@/stores/useTable";
import ExpandableTable from "@/components/Table/ExpandableTable";
import {accountApi} from "@/utils/api/list/account";
import {useModal} from "@/stores/useModal";
import OrderBuyModal from "@/templates/Coin/Order/Modal/OrderBuyModal";
type Props = {
  value: string;
};

const columns = [
  { key: "userId", label: "ID", sortable: true },
  { key: "userName", label: "Name", sortable: true },
];


export default function InfoTableGroupTemplate({ value }: Props) {
  const { getAccountInfo } = useAccountStore();

    const { open } = useModal();


  const [data, setData] = useState<{ userId: string; userName: string }[]>([]);
  const [detailData,setDetailData] = useState([]);
  const [detailDataOrderInfo,setDetailDataOrderInfo]= useState([]);
  const [selectName,setSelectName] = useState("");
  const [selectCount,setSelectCount] = useState("0");
  const [closeSide,setCloseSide] = useState("");
  const [selectUserId,setSelectUserId] = useState("");
  const [orderType,setOrderType] = useState<'open' | 'close'>('open');
  const [selectOrderId,setSelectOrderId] = useState('')


  useEffect(() => {
    getAccountInfo().then((data) => setData(data));
  }, []);

  useEffect(()=> {
      console.log("Select Count :::" , selectCount);
  },[selectCount])

  const onRowSelect = async (data: { userId: string; userName: string }) => {
      const result = await accountApi.getOrderInfo(data.userId);
      setDetailData(result);
      setSelectUserId(data.userId)
  };

  const onDetailRowSelect = async (data) => {
      const result = await accountApi.getDetailOrderInfo(data.name,data.userId);
        setSelectName(data.name);
      setDetailDataOrderInfo(result);

  }

  const callPopup = async (col) => {
      setSelectCount(col.count);
      setCloseSide(col.side === 'buy' ? 'sell' : 'buy');
      setSelectOrderId(col.orderId);
      setOrderType('close')
      open()
  }

  const closeOrder = (col,row) => {
      accountApi.callOrder('allClose',selectUserId,selectOrderId,row.name,"0","0");
  }

  const openOrder = (col) => {
       setSelectCount(col.count);
       setCloseSide(col.side === 'buy' ? 'sell' : 'buy');

      setOrderType('open')

      open()
  }

  const handleSave = (name: string, count: string, side: string) => {
    accountApi.callOrder(orderType,selectUserId,selectOrderId,name,count,side);
} ;

  const renderSubRow = (row) => {
      return (
          <div className="p-4">
              <table className="min-w-full border-collapse border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <thead className="bg-gray-100">
                  <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">
                          Side
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">
                          Price
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">
                          Count
                      </th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 border-b">
                          Pnl
                      </th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 border-b">
                          Action
                      </th>

                  </tr>
                  </thead>
                  <tbody>
                  {detailDataOrderInfo.map((item, index) => (
                      <tr
                          key={index}
                          className="hover:bg-gray-50 transition"
                      >
                          <td className="px-4 py-2 border-b">{item.side}</td>
                          <td className="px-4 py-2 border-b">{item.price}</td>
                          <td className="px-4 py-2 border-b">{item.count}</td>
                          <td className="px-4 py-2 border-b">{item.pnl.toFixed(3)}</td>
                          <td className="px-4 py-2 border-b text-center">
                              <button
                                  className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition"
                                  onClick={()=>{callPopup(item)}}
                              >
                                  정리
                              </button>
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      );
  }

    const detailColumns = [
        {key: "name", label:"NAME"},
        {key: "", label:"구매",button: true,onButtonClick:openOrder},
        {key: "", label:"정리",button: true,onButtonClick:closeOrder},
        //   {key: "count", label:"COUNT"}
    ]


  return (
    <ResponsiveGridLayout cols={1}>
      <Table
        columns={columns}
        data={data}
        pageSize={10}
        searchable
        onRowSelect={onRowSelect}
      />
      <Table
        data={detailData}
        columns={detailColumns}
        pageSize={5}
        onRowSelect={onDetailRowSelect}
        onButtonClick={closeOrder}
        renderSubRow={renderSubRow}
      />
        <OrderBuyModal name={selectName} count={selectCount} side={closeSide} onSave={handleSave} />
    </ResponsiveGridLayout>
  );
}
