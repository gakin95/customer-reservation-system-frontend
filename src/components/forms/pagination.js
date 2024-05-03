import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationControlled({
  totalNumberOfPages = 10,
  handlePaginationChange,
  page
}) {

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalNumberOfPages}
        page={page}
        onChange={handlePaginationChange}
        color="primary"
      />
    </Stack>
  );
}
