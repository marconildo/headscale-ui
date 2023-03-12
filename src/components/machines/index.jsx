import { useEffect, useState } from "react";
import { getMachines } from "../../api/Machines";
import { DataTable } from "mantine-datatable";
import { Title, Badge, Container, Grid, Checkbox, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import dayjs from "dayjs";
import sortBy from 'lodash/sortBy';

const PAGE_SIZE = 10;

const Machines = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [fetching, setFetching] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [onlineOnly, setOnlineOnly] = useState(true);
  const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));
  const [debouncedQuery] = useDebouncedValue(query, 200);

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
    //const source = sortBy(data, sortStatus.columnAccessor);
    const dataFilter = data.filter(({ name, givenName, user, online }) => {
      if (onlineOnly && !online) return false;
      if (
        debouncedQuery !== "" &&
        !`${name} ${givenName} ${user.name}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
    setTotalRecords(dataFilter.length);
    setRecords(dataFilter.slice(from, to));
  }, [page, debouncedQuery, onlineOnly]);

  return (
    <Container size="xl">
      <Title order={2}>Machines</Title>
      <Grid align="center" mt="sm">
        <Grid.Col span={4}>
          <TextInput
            placeholder="Search machines..."
            icon={<i className="fa-solid fa-magnifying-glass" />}
            value={query}
            onChange={(e) => {
              setQuery(e.currentTarget.value);
              setPage(1);
            }}
          />
        </Grid.Col>
        <Grid.Col xs={4} sm={3}>
          <Checkbox
            label="Online only"
            checked={onlineOnly}
            onChange={(e) => {
              setOnlineOnly(e.currentTarget.checked);
              setPage(1);
            }}
          />
        </Grid.Col>
      </Grid>
      <DataTable
        mt="md"
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
        totalRecords={totalRecords === 0 ? 1 : totalRecords}
        fetching={fetching}
        page={page}
        onPageChange={(p) => setPage(p)}
        noRecordsText="No machine registered in Headscale"
        columns={[
          { accessor: "id", sortable: true, textAlignment: "center" },
          { accessor: "name", sortable: true },
          { accessor: "givenName", sortable: true },
          { accessor: "user.name", sortable: true },
          {
            accessor: "ipAddresses",
            textAlignment: "center",
            render: ({ ipAddresses }) => ipAddresses.sort()[0]
          },
          {
            accessor: "createdAt",
            sortable: true,
            render: ({ createdAt }) => dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss")
          },
          {
            accessor: "lastSeen",
            sortable: true,
            render: ({ lastSeen }) => dayjs(lastSeen).format("DD/MM/YYYY HH:mm:ss")
          },
          {
            accessor: "online",
            sortable: true,
            textAlignment: "center",
            render: ({ online }) =>
              online ? (
                <Badge color="green" radius="sm" variant="dot">
                  Online
                </Badge>
              ) : (
                <Badge color="red" radius="sm" variant="dot">
                  Offline
                </Badge>
              )
          }
        ]}
      />
    </Container>
  );
};

export default Machines;
