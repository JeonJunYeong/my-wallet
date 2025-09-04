import ResponsiveGridLayout from "@/layouts/ResponsiveGridLayout";
import Table from "@/components/Table/Table";
import { useAccountStore } from "@/stores/useAccount";
import { useEffect, useState } from "react";
import { useTableStore } from "@/stores/useTable";
import ExpandableTable from "@/components/Table/ExpandableTable";
import {accountApi} from "@/utils/api/list/account";
type Props = {
  value: string;
};

const columns = [
  { key: "userId", label: "ID", sortable: true },
  { key: "userName", label: "Name", sortable: true },
];

const detailColumns = [
  {key: "name", label:"NAME"},
    {key: "", label:"구매",button: true},
  // {key: "price", label:"PRICE"},
  //   {key: "count", label:"COUNT"}
]

export default function InfoTableGroupTemplate({ value }: Props) {
  const { getAccountInfo } = useAccountStore();

  const [data, setData] = useState<{ userId: string; userName: string }[]>([]);
  const [detailData,setDetailData] = useState([]);
  const [detailDataOrderInfo,setDetailDataOrderInfo]= useState([]);

  useEffect(() => {
    getAccountInfo().then((data) => setData(data));
  }, []);

  const onRowSelect = async (data: { userId: string; userName: string }) => {
      const result = await accountApi.getOrderInfo(data.userId);
      setDetailData(result);
  };

  const onDetailRowSelect = async (data) => {
      const result = await accountApi.getDetailOrderInfo(data.name);

      console.log(result)
      setDetailDataOrderInfo(result);

  }

  const callPopup = () => {
      console.log('callPopup')
  }

  const renderSubRow = (row) => {
      // const result = await accountApi.getDetailOrderInfo(data.name);
      //
      // console.log(result)

      console.log('detailDataOrderInfo',detailDataOrderInfo)

      const result = detailDataOrderInfo.map((item, index) => (
          <div key={index} className="flex gap-2">
              <div>{item.side}</div>
              <div>{item.price}</div>
              <div>{item.count}</div>
          </div>
      ));

      return <>{result}</>;

  }


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
        onButtonClick={callPopup}
        renderSubRow={renderSubRow}
      />
    </ResponsiveGridLayout>
  );
}
