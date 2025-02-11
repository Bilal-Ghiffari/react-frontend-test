// import { ICommonTableProps } from "@/utils/type";
import { Table, TableProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface ICommonTableProps<T> extends TableProps<T> {
  columns: TableProps<T>["columns"];
  dataSource: T[];
  loading: boolean;
  rowKey: string;
  size?: SizeType;
}

const CommonTable = <T extends {}>({
  columns,
  dataSource,
  loading,
  rowKey,
  size,
}: ICommonTableProps<T>) => {
  return (
    <Table
      size={size}
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={false}
      scroll={{ scrollToFirstRowOnChange: true, x: "max-content" }}
    />
  );
};

export default CommonTable;
