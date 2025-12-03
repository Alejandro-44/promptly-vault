import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function UserCard() {
  const { data: user } = useCurrentUser();

  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <Avatar sx={{ backgroundColor: "#f14b09ff", width: 96, height: 96 }}>
          {user?.username.slice(0, 2).toUpperCase()}
        </Avatar>
        <Typography>{user?.username}</Typography>
      </Stack>
    </Box>
  );
}
