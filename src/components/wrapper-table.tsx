import { SizeType } from "antd/es/config-provider/SizeContext";
import * as React from "react";
import CommonTable from "./common/common-table";

interface IWrapperTableProps<T> {
  tableData: T[];
  tableConfig: {
    columns: Array<any>;
    rowKey: string;
    size?: SizeType;
  };
  isShowPagination?: boolean;
  pagination?: React.ReactNode;
  loading: boolean;
}

const WrapperTable = <T extends {}>({
  tableData,
  tableConfig,
  isShowPagination = false,
  pagination,
  loading,
}: IWrapperTableProps<T>) => {
  const getTableConfig = () => ({
    columns: tableConfig.columns,
    dataSource: tableData,
    rowKey: tableConfig.rowKey || "key",
    size: tableConfig.size,
  });
  return (
    <section className="bg-[#ffffff] px-6 py-8 rounded-2xl">
      <CommonTable {...getTableConfig()} loading={loading} />
      {isShowPagination && <div className="mt-10">{pagination}</div>}
    </section>
  );
};

export default WrapperTable;
