import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export default function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <div style={{ float: "right" }}>
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size={30}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size={16} /> : <IconMoonStars size={16} />}
      </ActionIcon>
    </div>
  );
}
