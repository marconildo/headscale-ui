import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Select,
  Box,
  useMantineTheme,
  LoadingOverlay,
  MultiSelect,
  Button,
  Switch,
  Modal,
  Group
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";

const schema = Yup.object().shape({
  user: Yup.string().required("This field is required.")
});

const NewPreAuthKey = ({ opened, users }) => {
  const [tags, setTags] = useState([]);
  const [visible, loading] = useDisclosure(false);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      expiration: new Date()
    },
    validate: yupResolver(schema)
  });

  const cancel = () => {};

  const saveForm = (data) => {};

  return (
    <Modal
      opened={opened}
      title="New Pre Authkey"
      closeOnClickOutside={false}
      onClose={() => {}}
      size="md"
      overlayBlur={3}
      overlayOpacity={0.55}
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      centered
    >
      <Box>
        <form onSubmit={form.onSubmit((values) => saveForm(values))}>
          <Select
            withAsterisk
            placeholder="Select a User"
            label="User"
            data={users}
            {...form.getInputProps("user")}
          />
          <Switch.Group>
            <Group mt="xs">
              <Switch value="reusable" label="Reusable" />
              <Switch value="ephemeral" label="Ephemeral" />
            </Group>
          </Switch.Group>
          <DatePicker
            placeholder="Choose an expiration date"
            minDate={new Date()}
            label="Expiration"
            mt="md"
            {...form.getInputProps("expiration")}
          />
          <MultiSelect
            searchable
            placeholder="Insert ACL tags"
            label="ACL Tags"
            data={tags}
            creatable
            mt="md"
            getCreateLabel={(query) => `+ TAG: ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setTags((current) => [...current, item]);
              return item;
            }}
          />
          <Group spacing="xs" position="right" mt="md">
            <Button onClick={() => cancel()} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default NewPreAuthKey;
