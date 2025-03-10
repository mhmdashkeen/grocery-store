import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

export default function PaginationComponent({ handlePagination }) {
  const [page, setPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const pageSize = 100;
  const filteredProductsList = useSelector(
    (state) => state.products.filteredProductsList
  );

  const handleChange = (event, value) => {
    setPage(value);
    handlePagination(value - 1, pageSize);
  };

  React.useEffect(() => {
    setTotalCount(filteredProductsList.length);
  }, [filteredProductsList]);

  React.useEffect(() => {
    setPageCount(Math.ceil(totalCount / pageSize));
  }, [totalCount]);

  // console.log("Page", page, "TOT", totalCount, "AA", pageCount, "aa", filteredProductsList);
  if (totalCount <= pageSize) {
    return null;
  }
  return (
    <Stack
      spacing={2}
      sx={{
        marginTop: "1.5rem",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Pagination count={pageCount} page={page} onChange={handleChange} />
    </Stack>
  );
}
