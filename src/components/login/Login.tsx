import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  TextInput,
  Box,
  useMantineTheme,
  LoadingOverlay,
  PasswordInput,
  Button,
  Modal,
  Group
} from "@mantine/core";
import Logo from "../../assets/images/headscale.png";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import * as Yup from "yup";
import "./login.scss";

const schema = Yup.object().shape({
  urlServer: Yup.string()
    .required("This field is required.")
    .matches(
      /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))$/,
      {
        message: "Headscale URL is not a valid url",
        excludeEmptyString: true
      }
    ),
  apiKey: Yup.string().required("This field is required.")
});

const Login = () => {
  const theme = useMantineTheme();
  const [visible, loading] = useDisclosure(false);
  const [opened, setOpened] = useState(true);

  const form = useForm({
    initialValues: {
      urlServer: "",
      apiKey: ""
    },
    validate: yupResolver(schema)
  });

  const saveForm = (data) => {
    if (!form.isValid()) return;

    // loading.toggle();

    // setTimeout(() => {
    //   loading.close();
    //   setOpened(false);
    // }, 3000);
  };

  const clearForm = () => {
    form.reset();
    form.clearErrors();
  };

  const testConnection = () => {
    form.clearErrors();
    form.validate();
    if (!form.isValid()) return;
    // loading.toggle();
    // setTimeout(() => {
    //   loading.close();
    //   showNotification({
    //     title: "Network error",
    //     autoClose: 5000,
    //     message: "Hey there, your code is awesome! 🤥",
    //     color: 'red',
    //     icon: <i class="fa-light fa-circle-exclamation" />,
    //     disallowClose: true,
    //   });
    // }, 3000);
  };

  return (
    <Modal
      opened={opened}
      title={<img width={200} src={Logo} />}
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
        <form onSubmit={form.onSubmit((values) => saveForm(values))}>
          <TextInput
            placeholder="https://hs.yourdomain.com.au"
            description="URL for your headscale server instance"
            label="Headscale URL"
            withAsterisk
            {...form.getInputProps("urlServer")}
          />
          <PasswordInput
            withAsterisk
            mt="md"
            label="Headscale API Key"
            placeholder="******************"
            description="Generate an API key for your headscale instance and place it here."
            {...form.getInputProps("apiKey")}
          />
          <Group spacing="xs" position="center" mt="md">
            <Button onClick={() => clearForm()} variant="outline">
              Clear Server Settings
            </Button>
            <Button onClick={() => testConnection()} variant="light">
              Test Server Settings
            </Button>
            <Button type="submit">Save API Key</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default Login;
