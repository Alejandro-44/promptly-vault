import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

export const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position='relative'>
      <Toolbar sx={{ justifyContent: "space-between"}} >
        <Box>
          <Typography variant='h5' component="h2">
            <Link to="/">Promptly Vault</Link>
          </Typography>
        </Box>
        <Box>
          <Button startIcon={<LogIn />} onClick={() => navigate('/login')} color='inherit'>SignIn</Button>
          <Button onClick={() => navigate('/register')} color='inherit'>SignUp</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
