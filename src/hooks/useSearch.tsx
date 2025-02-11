import React from "react";
import { useNavigate, useLocation } from "react-router";

const useSearch = (initialSearch: string) => {
  const [search, setSearch] = React.useState(initialSearch);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (value: string) => {
    setSearch(value);
    navigate({
      pathname: location.pathname,
      search: `?page=1&limit=10&search=${value}`,
    });
  };

  return {
    search,
    handleSearch,
  };
};

export default useSearch;
