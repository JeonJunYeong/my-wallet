import ResponsiveGridLayout from "@/layouts/ResponsiveGridLayout";
import Table from "@/components/Table/Table";
import { useAccountStore } from "@/stores/useAccount";
import { useEffect, useState } from "react";
import { useTableStore } from "@/stores/useTable";
import ExpandableTable from "@/components/Table/ExpandableTable";
type Props = {
  value: string;
};

const users: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "010-1234-5678",
    role: "Admin",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "010-2345-6789",
    role: "User",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "010-3456-7890",
    role: "User",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "010-4567-8901",
    role: "Manager",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    phone: "010-5678-9012",
    role: "User",
  },
];

export default function InfoTableGroupTemplate({ value }: Props) {
  const { getAccountInfo } = useAccountStore();

  const [data, setData] = useState<{ userId: string; userName: string }[]>([]);
  const columns = [
    { key: "userId", label: "ID", sortable: true },
    { key: "userName", label: "Name", sortable: true },
  ];

  useEffect(() => {
    getAccountInfo().then((data) => setData(data));
  }, []);

  const onRowSelect = (data: { userId: string; userName: string }) => {
    console.log("selected index:", data);
  };

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
        data={users}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
        ]}
        pageSize={5}
        onRowSelect={(row) => console.log("Selected:", row)}
        renderSubRow={(row) => (
          <div>
            <p>Email: {row.email}</p>
            <p>Phone: {row.phone}</p>
          </div>
        )}
      />
    </ResponsiveGridLayout>
  );
}
