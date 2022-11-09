import { AxiosError } from "axios";
import {
  showNotification as mantineNotification,
  NotificationProps,
} from "@mantine/notifications";
import { NotificationType } from "../types/utils";

const getErrorMessage = (err: unknown, fallback = "Something went wrong") => {
  let errMsg = "";
  if (err instanceof AxiosError) {
    errMsg = err?.response?.data?.message;
  } else if (typeof err === "string" || typeof err === "number") {
    errMsg = err.toString();
  }
  return errMsg || fallback;
};

const showNotification = ({
  type = "default",
  ...extendedOptions
}: NotificationProps & { type?: NotificationType }) => {
  let options: NotificationProps = extendedOptions;
  const extednedFields: Partial<NotificationProps> = {};
  switch (type) {
    case "danger":
      extednedFields.title = "Error";
      extednedFields.color = "red";
      break;
    case "info":
    case "default":
      extednedFields.title = "Info";
      extednedFields.color = "blue";
      break;
    case "success":
      extednedFields.title = "Success";
      extednedFields.color = "teal";
      break;
    case "warning":
      extednedFields.title = "Warning";
      extednedFields.color = "yellow";
      break;
  }
  options = {
    // using passed values first and then extended values
    ...extednedFields,
    ...options,
  };
  return mantineNotification(options);
};

export { getErrorMessage, showNotification };
