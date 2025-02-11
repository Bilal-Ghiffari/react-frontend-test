import React from "react";
import { useNavigate, useSearchParams } from "react-router";

type usePaginationProps = {
  initialLimit: number;
  initialPage: number;
};

export default function usePagination({
  initialLimit,
  initialPage,
}: usePaginationProps) {
  const [searchParams] = useSearchParams();
  const [page, setPage] = React.useState<number>(initialPage);
  const navigate = useNavigate();

  const handlePagination = (page: number, pageSize: number) => {
    let newQuery: { [key: string]: string } = {};
    searchParams.forEach((param, key) => {
      newQuery[key] = param;
    });
    newQuery.page = page.toString();
    newQuery.limit = pageSize.toString() || initialLimit.toString();

    const UrlSearchParams = new URLSearchParams(newQuery).toString();
    navigate(`?${UrlSearchParams}`, { replace: true });
    setPage(page);
  };

  return {
    page,
    setPage,
    handlePagination,
  };
}
