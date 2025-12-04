import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import { useUserStore } from "../contexts";

export default function UserCard() {
  const user = useUserStore((state) => state.user);

  return (
    <Card >
      <CardContent>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar sx={{ backgroundColor: "#f14b09ff", width: 128, height: 128, fontSize: 48 }}>
            {user?.username.slice(0, 2).toUpperCase()}
          </Avatar>
          <Typography sx={{ alignSelf: "start"}} variant="h5" component="h1" >{user?.username}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
