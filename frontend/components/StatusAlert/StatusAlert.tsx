import { Snackbar, Alert } from "@mui/material";
import { StatusModalProps } from "./types";

export function StatusAlert({
  openAlert,
  setOpenAlert,
  error,
}: StatusModalProps) {
  let modalContent = "Успешно";
  if (error) {
    modalContent = error;
  }
  const severity = modalContent === "Успешно" ? "success" : "error";

  return (
    <Snackbar open={openAlert} autoHideDuration={2500} onClose={setOpenAlert}>
      <Alert onClose={setOpenAlert} severity={severity} variant="filled">
        {modalContent}
      </Alert>
    </Snackbar>
  );
}
