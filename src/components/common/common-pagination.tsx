import { Pagination } from "antd";
import * as React from "react";

interface ICommonPaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

const CommonPagination: React.FunctionComponent<ICommonPaginationProps> = ({
  current,
  onChange,
  pageSize,
  total,
}) => {
  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
    />
  );
};

export default CommonPagination;
