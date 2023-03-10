import { useEffect, useState } from "react";
import { getMachines } from "../../api/Machines";
import { DataTable } from "mantine-datatable";
import { Box } from "@mantine/core";

const PAGE_SIZE = 15;

const Machines = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));

  useEffect(() => {
    getMachines()
      .then((result) => {
        console.log(result);
        setData(result);
        setPage(1);
      })
      .catch((error) => {})
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data.slice(from, to));
  }, [page]);

  return (
    <Box>
      <DataTable
        withBorder
        withColumnBorders
        highlightOnHover
        borderRadius="sm"
        records={records}
        minHeight={450}
        striped
        verticalAlignment="center"
        shadow="sm"
        loaderVariant="oval"
        loaderBackgroundBlur={2}
        recordsPerPage={PAGE_SIZE}
        totalRecords={data.length}
        fetching={fetching}
        page={page}
        onPageChange={(p) => setPage(p)}
        noRecordsText="No machine registered in Headscale"
        columns={[
          { accessor: "id", sortable: true, },
          { accessor: "name", sortable: true, },
          { accessor: "givenName", sortable: true, },
          { accessor: "createdAt", sortable: true, },
          { accessor: "lastSeen", sortable: true, }
        ]}
      />
    </Box>
  );
};

export default Machines;
