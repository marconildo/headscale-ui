import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";

const ButtonDelete = () => {
  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete record",
      centered: true,
      children: (
        <Text>
          Are you sure you want to delete? This action is permanent and it is not possible to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed")
    });

  return (
    <>
      <Tooltip withArrow label="Delete">
        <ActionIcon
          onClick={(e) => {
            e.stopPropagation();
            openDeleteModal();
          }}
          color="blue"
          variant="transparent"
        >
          <i className="fa-regular fa-trash-can"></i>
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default ButtonDelete;
