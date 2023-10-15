import { useEffect, useState } from "react";
import { getUsers } from "../../api/UsersApi";
import { DataTable } from "mantine-datatable";
import {
  Title,
  Container,
  Grid,
  TextInput,
  Button,
  Group,
  Tooltip,
  ActionIcon
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import dayjs from "dayjs";
import ButtonDelete from "../common/buttonDelete";

const PAGE_SIZE = 10;

const Users = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [fetching, setFetching] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const dataFilter = data.filter(({ name }) => {
      if (
        debouncedQuery !== "" &&
        !`${name}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
    setTotalRecords(dataFilter.length);
    setRecords(dataFilter.slice(from, to));
  }, [page, debouncedQuery]);

  useEffect(() => {
    getUsers()
      .then((result) => {
        setData(result);
        setPage(1);
      })
      .catch((error) => {})
      .finally(() => setFetching(false));
  }, []);

  return (
    <Container size="xl">
      <Title order={2}>Users</Title>
      <Grid align="center" mt="sm">
        <Grid.Col span={7}>
          <TextInput
            placeholder="Search users..."
            icon={<i className="fa-solid fa-magnifying-glass" />}
            value={query}
            onChange={(e) => {
              setQuery(e.currentTarget.value);
              setPage(1);
            }}
          />
        </Grid.Col>
        <Grid.Col
          xs={4}
          sm={5}
          style={{ paddingTop: "33px", display: "flex", justifyContent: "end" }}
        >
          <Button>New User</Button>
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
        noRecordsText="No users registered in Headscale"
        columns={[
          { accessor: "id", sortable: true, textAlignment: "center" },
          { accessor: "name", sortable: true },
          {
            accessor: "createdAt",
            sortable: true,
            render: ({ createdAt }) => dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss")
          },
          {
            accessor: "actions",
            title: "",
            width: 80,
            render: (item) => (
              <Group spacing={1} noWrap>
                <Tooltip withArrow label="Rename">
                  <ActionIcon color="blue" variant="transparent">
                    <i className="fa-solid fa-text-size"></i>
                  </ActionIcon>
                </Tooltip>
                <ButtonDelete />
              </Group>
            )
          }
        ]}
      />
    </Container>
  );
};

export default Users;
