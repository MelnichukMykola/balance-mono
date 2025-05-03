import { enqueueSnackbar } from "notistack";

export default (error) => {
  const message =
    error?.response?.data?.error || error?.message || "Unknown error occurred";

  enqueueSnackbar(message, { variant: "error" });
};
