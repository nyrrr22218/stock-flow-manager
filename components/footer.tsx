import { Box, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ textAlign: 'center', bgcolor: '#c19a6b', py: '5px', mt: '10', height: '80px' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link
          target="_blank"
          color="inherit"
          href="https://docs.google.com/forms/d/e/1FAIpQLSembPoKJ5hspVCyvB7KFGG6LtSgHRJGbX5I42ptobodInQcRA/viewform?usp=header"
        >
          不具合・お問い合わせはこちら
        </Link>
        <Link target="_blank" color="inherit" href="https://github.com/nyrrr22218">
          Go to My GitHub
        </Link>
      </Box>
      <Typography>© 2025 Stock-Flow-Manager All rights reserved.</Typography>
    </Box>
  );
}
