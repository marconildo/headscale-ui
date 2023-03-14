import React from "react";
import {
  AppShell,
  Group,
  Tabs,
  Burger,
  createStyles,
  Container,
  Center
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../assets/images/headscale_dots.png";
import DarkModeToggle from "../components/common/DarkModeToggle";
import Navigation from "../routes";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: 5
  },
  mainSection: {
    paddingBottom: theme.spacing.sm
  },
  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none"
    }
  },
  tabsList: {
    borderBottom: "0 !important"
  },
  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },
  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1]
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2]
    }
  },
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`
  }
}));

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, theme, cx } = useStyles();

  const getCurrentTab = () => {
    let tab = "";
    switch (location.pathname) {
      case "/":
      case "/machines":
        tab = "tbMachines";
        break;
      case "/users":
        tab = "tbUsers";
        break;
      case "/acl":
        tab = "tbACL";
        break;
      case "/settings":
        tab = "tbSettings";
        break;
    }
    return tab;
  };

  const changeTab = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <AppShell
      padding="md"
      fixed={false}
      header={
        <div className={classes.header}>
          <Container className={classes.mainSection}>
            <Group position="apart">
              <img style={{ height: "60px" }} src={Logo} alt="Logo" />
              <Burger
                opened={opened}
                onClick={toggle}
                className={classes.burger}
                size="sm"
              />
              <DarkModeToggle />
            </Group>
          </Container>
          <Container>
            <Tabs
              defaultValue={getCurrentTab()}
              variant="outline"
              classNames={{
                root: classes.tabs,
                tabsList: classes.tabsList,
                tab: classes.tab
              }}
            >
              <Tabs.List>
                <Tabs.Tab
                  icon={<i className="fa-sharp fa-regular fa-computer" />}
                  value="tbMachines"
                  key={1}
                  onClick={() => changeTab("machines")}
                >
                  Machines
                </Tabs.Tab>
                <Tabs.Tab
                  icon={<i className="fa-regular fa-users" />}
                  value="tbUsers"
                  key={3}
                  onClick={() => changeTab("users")}
                >
                  Users
                </Tabs.Tab>
                <Tabs.Tab
                  icon={<i className="fa-regular fa-binary-lock"></i>}
                  value="tbPreAuthKey"
                >
                  Pre Auth Key
                </Tabs.Tab>
                <Tabs.Tab
                  icon={<i className="fa-regular fa-key" />}
                  value="tbApikey"
                  key={4}
                >
                  Api key
                </Tabs.Tab>
                <Tabs.Tab
                  icon={<i className="fa-regular fa-lock-keyhole" />}
                  value="tbACL"
                  key={4}
                  onClick={() => changeTab("acl")}
                >
                  Access Controls
                </Tabs.Tab>
                <Tabs.Tab
                  icon={<i className="fa-solid fa-screwdriver-wrench" />}
                  value="tbSettings"
                  key={5}
                  onClick={() => changeTab("settings")}
                >
                  Settings
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Container>
        </div>
      }
      footer={
        <div className={classes.footer}>
          <Center mt="md">Headscale UI</Center>
        </div>
      }
    >
      <Navigation />
    </AppShell>
  );
};

export default MainPage;
