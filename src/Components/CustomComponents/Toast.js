import { Bounce, toast } from "react-toastify";

const defaultConfig = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

export const toastSuccess = (text) => toast.success(text, { ...defaultConfig });

export const toastError = (text) =>
  toast.error(text, {
    ...defaultConfig,
    theme: "colored",
  });
