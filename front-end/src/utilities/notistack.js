import { useSnackbar } from 'notistack';

const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenAlertVariant = (message, variant) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
  };

  return { handleOpenAlertVariant };
};
export default useCustomSnackbar;
