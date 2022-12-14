import {
  showNotification as mantineShowNotification,
  NotificationProps,
  updateNotification as mantineUpdateNotification,
} from "@mantine/notifications";
import { NotificationType } from "../../../types/utils";

function createNotificationProps<
  T extends NotificationProps & { type?: NotificationType; id?: string }
>({ type = "default", ...extendedOptions }: T) {
  let options: Omit<T, "type"> = extendedOptions;
  const extendedFields: Partial<Omit<T, "type">> = {};
  switch (type) {
    case "danger":
      extendedFields.title = "Error";
      extendedFields.color = "red";
      break;
    case "info":
    case "default":
      extendedFields.title = "Info";
      extendedFields.color = "blue";
      break;
    case "success":
      extendedFields.title = "Success";
      extendedFields.color = "teal";
      break;
    case "warning":
      extendedFields.title = "Warning";
      extendedFields.color = "yellow";
      break;
  }
  options = {
    // using passed values first and then extended values
    ...extendedFields,
    ...options,
  };
  return options;
}

const showNotification = (
  options: NotificationProps & { type?: NotificationType }
) => {
  return mantineShowNotification(createNotificationProps(options));
};

const updateNotification = (
  options: NotificationProps & { type?: NotificationType; id: string }
) => {
  return mantineUpdateNotification(
    createNotificationProps<typeof options>(options)
  );
};

export { showNotification, updateNotification };
