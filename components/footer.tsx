import { Box, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ textAlign: 'center', bgcolor: '#c19a6b', py: '5px', mt: '10', height: '80px' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Typography>問題報告時のフォーム作成予定</Typography>
        <aaa></aaa>
        <Link color="inherit" href="https://github.com/nyrrr22218">
          Go to My GitHub
        </Link>
      </Box>
      <Typography>© 2025 Stock-Flow-Manager All rights reserved.</Typography>
    </Box>
  );
}
