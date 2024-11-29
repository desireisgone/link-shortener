import { Grid2, Typography } from "@mui/material";
import { MainInput } from "./components/MainInput";
import { LogOut } from "./components/LogOut";

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

        <LogOut />
      </Grid2>

      <Grid2
        container
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
      >
        <MainInput />
      </Grid2>
    </Grid2>
  );
}
