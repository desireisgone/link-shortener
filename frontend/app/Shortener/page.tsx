import { Grid2, Typography } from "@mui/material";
import { MainInput } from "./components/MainInput";
import { User } from "./components/User";

export default function ShortenerPage() {
  return (
    <Grid2 container gap={25}>
      <Grid2
        container
        sx={{ borderBottom: 2, borderBottomColor: "rgb(56, 116, 203)" }}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={24} fontWeight={600}>
          Сокращатель ссылок
        </Typography>

        <User />
      </Grid2>

      <MainInput />
    </Grid2>
  );
}
