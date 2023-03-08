import React from "react";
import { useDisclosure } from '@mantine/hooks';
import {
  Input,
  Box,
  useMantineTheme,
  LoadingOverlay,
  PasswordInput,
  Button,
  Modal,
  Group
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "./login.scss";

const Login = () => {
  const theme = useMantineTheme();
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <Modal
      opened={true}
      title="Headscale Server Settings"
      closeOnClickOutside={false}
      onClose={() => {}}
      size="lg"
      overlayBlur={3}
      overlayOpacity={0.55}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      centered
    >
      <Box>
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <form>
          <Input.Wrapper
            label="Headscale Server"
            withAsterisk
            description="URL for your headscale server instance"
          >
            <Input placeholder="https://hs.yourdomain.com.au" />
          </Input.Wrapper>
          <PasswordInput
            withAsterisk
            mt="md"
            label="Headscale API Key"
            placeholder="******************"
            description="Generate an API key for your headscale instance and place it here."
          />
          <Group spacing="xs" position="center" mt="md">
            <Button variant="outline">Clear Server Settings</Button>
            <Button variant="light">Test Server Settings</Button>
            <Button>Save API Key</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default Login;
