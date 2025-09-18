import ResponsiveGridLayout from "@/layouts/ResponsiveGridLayout";
import Table from "@/components/Table/Table";
import { useAccountStore } from "@/stores/useAccount";
import React, { useEffect, useState } from "react";
import { accountApi } from "@/utils/api/list/account";
import { useModal } from "@/stores/useModal";
import OrderBuyModal from "@/templates/Coin/Order/Modal/OrderBuyModal";
import { FlexRatio } from "@/layouts/Common/FlexRatioLayout/FlexRatio";
import Card from "@/components/Card/Card";
import { Label } from "@/components/Label/Label";
import { Box } from "@/components/Box/Box";
import { SelectableBox } from "@/components/Box/SelectableBox";
import { Title } from "@/components/Text/Title";
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

  const [data, setData] = useState<{ userId: string; userName: string;balance:{total:number,unrealisedPnl:number,free:number} }[]>([]);
  const [detailData, setDetailData] = useState([]);
  const [detailDataOrderInfo, setDetailDataOrderInfo] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectName, setSelectName] = useState("");
  const [selectCount, setSelectCount] = useState("0");
  const [closeSide, setCloseSide] = useState("");
  const [selectUserId, setSelectUserId] = useState("");
  const [orderType, setOrderType] = useState<"open" | "close">("open");
  const [selectOrderId, setSelectOrderId] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getAccountInfo().then((data) => setData(data));
  }, []);

  const onRowSelect = async (data: { userId: string; userName: string }) => {
    const result = await accountApi.getOrderInfo(data.userId);

    setSelectedGroup(selectedGroup === data.userId ? null : data.userId);
    setDetailData(result);

    // setSelectUserId(data.userId);
  };

  const onDetailRowSelect = async (data) => {
    const result = await accountApi.getDetailOrderInfo(data.name, data.userId);
    setDetailDataOrderInfo(result.sort((a, b) => {
      // 1️⃣ side 문자열 기준 정렬
      const sideCompare = a.side.localeCompare(b.side, 'en', { sensitivity: 'base' });
      if (sideCompare !== 0) return sideCompare;

      // 2️⃣ count 숫자 기준 정렬 (같은 side일 경우)
      return b.pnl - a.pnl; // 오름차순
      // return b.count - a.count; // 내림차순
    }));
    setSelectName(data.name);
  };

  const callPopup =  (col) => {
     setOrderType("close");
     setSelectCount(col.count);
     setCloseSide(col.side === "buy" ? "sell" : "buy");
     setSelectOrderId(col.orderId);
     setSelectUserId(col.userId);
     setIsReady(true);

    open()

  };

  const closeOrder = (row) => {
    accountApi.callOrder(
      "allClose",
      row.userId,
      row.orderId,
      row.name,
      "0",
      "0",
    );
  };

  const openOrder = async (row: {
    count: string;
    id: string;
    name: string;
    orderId: string;
    price: number;
    side: string;
    userId: string;
  }) => {
     setSelectName(row.name);
     setOrderType("open");
     setSelectCount("0");
     setCloseSide("buy");
     setSelectOrderId(row.orderId);
     setSelectUserId(row.userId);
     setIsReady(true);

    open();
  };

  const handleSave = (
    orderType: "open" | "close",
    name: string,
    count: string,
    side: string,
  ) => {
    setIsReady(false);
    console.log(
      "Params :::",
      orderType,
      name,
      count,
      side,
      selectUserId,
      selectOrderId,
    );

    accountApi.callOrder(
      orderType,
      selectUserId,
      selectOrderId,
      name,
      count,
      side,
    );
  };

  const renderSubRow = () => {
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
            {detailDataOrderInfo.map(
              (
                item: {
                  side: string;
                  price: string;
                  count: string;
                  pnl: number;
                },
                index,
              ) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className={`px-4 py-2 border-b ${item.side === 'buy' ? 'text-green-400' : 'text-blue-400'}`}>{item.side}</td>
                  <td className="px-4 py-2 border-b">{item.price}</td>
                  <td className="px-4 py-2 border-b">{item.count}</td>
                  <td className={`${'px-4 py-2 border-b'} ${item.pnl === 0 ? '' : item.pnl > 0 ? 'text-green-400' : 'text-red-400'}`}>{item.pnl.toFixed(3)}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition"
                      onClick={() => {
                        callPopup(item);
                      }}
                    >
                      정리
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const detailColumns = [
    { key: "name", label: "NAME" },
    { key: "", label: "구매", button: true, onButtonClick: openOrder },
    { key: "", label: "정리", button: true, onButtonClick: closeOrder },
  ];

  useEffect(() => {
    if (isReady) {
      open();
      setIsReady(false); // 다시 초기화
    }
  }, [isReady, orderType, selectCount, closeSide, selectOrderId, selectUserId]);

  return (
    // <ResponsiveGridLayout cols={1}>
    <div className="p-6 space-y-10">
      <FlexRatio left={1} right={2} gap={4}>
        <Card title="그룹 정보">
          {data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <SelectableBox
                  key={index}
                  selected={selectedGroup === item.userId}
                  onSelect={() => onRowSelect(item)}
                >
                  <Label text=  {item.userName} theme={"blue"} />
                  <div className={"m-1 inline-block float-right"}>
                    <Title level={3} align="right" className={"inline-block"}> {(item.balance.total+item.balance.unrealisedPnl).toFixed(3)}</Title>
                    <Title level={5} align="right">

                      &nbsp;({ (item.balance.free+item.balance.unrealisedPnl).toFixed(3)})
                    </Title>

                  </div>
                </SelectableBox>
                <div className={"mb-4"}></div>
              </React.Fragment>
            );
          })}
        </Card>
        <Card title="상세 정보">
          <Table
            data={detailData}
            columns={detailColumns}
            pageSize={5}
            onRowSelect={onDetailRowSelect}
            renderSubRow={renderSubRow}
          />
        </Card>
      </FlexRatio>
      <OrderBuyModal
        orderTYpe={orderType}
        name={selectName}
        count={selectCount}
        side={closeSide}
        onSave={handleSave}
      />
    </div>
    // </ResponsiveGridLayout>
  );
}
