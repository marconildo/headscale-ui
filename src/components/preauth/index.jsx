import { useEffect, useState } from "react";
import { getUsers } from "../../api/UsersApi";
import { getPreauthKeys } from "../../api/PreAuthKeyApi";
import { DataTable } from "mantine-datatable";
import { Title, Badge, Container, Grid, Checkbox, Select, Button } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import NewPreauthkey from "./newPreauthkey";
import dayjs from "dayjs";

const PAGE_SIZE = 10;

const PreAuthKey = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [opened, setOpened] = useState(true);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [fetching, setFetching] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [available, setAvailableOnly] = useState(true);
  const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    getUsers()
      .then((result) => {
        if (result && result.length > 0) setUser(result[0]);

        setUsers(
          result.map((user) => ({
            value: user.name,
            label: user.name
          }))
        );
      })
      .catch((error) => {})
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    getPreauthKeys(user?.name ?? user?.value)
      .then((result) => {
        setData(result);
        setPage(1);
      })
      .catch((error) => {})
      .finally(() => setFetching(false));
  }, [user]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const dataFilter = data.filter(({ name, expiration }) => {
      if (available && new Date(expiration) < new Date()) return false;
      if (
        debouncedQuery !== "" &&
        !`${name} ${givenName} ${user.name}`
          .toLowerCase()
          .includes(debouncedQuery.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
    setTotalRecords(dataFilter.length);
    setRecords(dataFilter.slice(from, to));
  }, [data, page, debouncedQuery, available]);

  return (
    <Container size="xl">
      <Title order={2}>Pre Authkey</Title>
      <Grid align="center" mt="sm">
        <Grid.Col span={4}>
          <Select
            data={users}
            label="User"
            value={user?.name ?? user?.value}
            onChange={(e) => {
              const item = users.find((user) => user.value === e);
              console.log(item);
              setUser(item);
              setPage(1);
            }}
          />
        </Grid.Col>
        <Grid.Col xs={4} sm={3} style={{ paddingTop: "33px" }}>
          <Checkbox
            label="Available only"
            checked={available}
            onChange={(e) => {
              setAvailableOnly(e.currentTarget.checked);
              setPage(1);
            }}
          />
        </Grid.Col>
        <Grid.Col
          xs={4}
          sm={5}
          style={{ paddingTop: "33px", display: "flex", justifycontent: "right" }}
        >
          <Button>New Pre Authkey</Button>
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
        noRecordsText="No pre authkey registered in Headscale"
        columns={[
          { accessor: "id", sortable: true, textAlignment: "center" },
          { accessor: "key", sortable: true },
          { accessor: "user", sortable: true },
          {
            accessor: "ephemeral",
            sortable: true,
            textAlignment: "center",
            render: ({ ephemeral }) =>
              !ephemeral ? (
                <Badge radius="sm" variant="dot">
                  No
                </Badge>
              ) : (
                <Badge color="yellow" radius="sm" variant="dot">
                  Yes
                </Badge>
              )
          },
          {
            accessor: "reusable",
            sortable: true,
            textAlignment: "center",
            render: ({ reusable }) =>
              !reusable ? (
                <Badge radius="sm" variant="dot">
                  No
                </Badge>
              ) : (
                <Badge color="yellow" radius="sm" variant="dot">
                  Yes
                </Badge>
              )
          },
          {
            accessor: "used",
            sortable: true,
            textAlignment: "center",
            render: ({ used }) =>
              used ? (
                <Badge radius="sm" variant="dot">
                  Yes
                </Badge>
              ) : (
                <Badge color="yellow" radius="sm" variant="dot">
                  No
                </Badge>
              )
          },
          {
            accessor: "expiration",
            sortable: true,
            textAlignment: "center",
            render: ({ expiration }) =>
              new Date(expiration) > new Date() ? (
                <Badge color="green" radius="sm" variant="dot">
                  No
                </Badge>
              ) : (
                <Badge color="red" radius="sm" variant="dot">
                  Yes
                </Badge>
              )
          },
          {
            accessor: "createdAt",
            sortable: true,
            render: ({ createdAt }) => dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss")
          },
          {
            accessor: "expiration",
            sortable: true,
            render: ({ expiration }) => dayjs(expiration).format("DD/MM/YYYY HH:mm:ss")
          }
        ]}
      />
      {opened && <NewPreauthkey opened users={users} />}
    </Container>
  );
};

export default PreAuthKey;
