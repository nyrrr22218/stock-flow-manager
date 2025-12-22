import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <>
      <AppBar sx={{ height: '60px' }}>
        <Typography variant="h3">Headerです</Typography>
      </AppBar>
      <Toolbar sx={{ height: '60px' }}>下用</Toolbar>
    </>
  );
}
