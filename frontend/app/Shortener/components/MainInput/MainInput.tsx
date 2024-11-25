import { Button, Grid2, OutlinedInput } from "@mui/material";
import styles from "./MainInput.module.scss";

export function MainInput() {
  return (
    <Grid2 container justifyContent={"center"} sx={{ width: "100%" }} gap={2}>
      <Grid2 container sx={{ width: "100%" }} justifyContent={"center"}>
        <OutlinedInput
          className={styles.input}
          placeholder="Введите ссылку для сокращения"
          sx={{ width: { xs: "80%", sm: "50%" } }}
        />
      </Grid2>

      <Grid2>
        <Button className={styles.btn} variant="outlined">
          Сократить
        </Button>
      </Grid2>
    </Grid2>
  );
}
