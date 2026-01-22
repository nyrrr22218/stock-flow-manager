import { Result } from '@/types';

export const tabContentsCommon = (isActive: boolean) => ({
  width: { xs: '33.33%', sm: 'auto' },
  fontSize: { xs: '14px', md: '20px' },
  mx: { xs: 0, md: 2 },
  transition: '0.3s',
  color: isActive ? 'blueviolet' : 'inherit',
  fontWeight: isActive ? 'bold' : 'normal',
  borderBottom: isActive ? '3px solid blueviolet' : '3px solid transparent',
  borderRadius: '8px 8px 0 0',
  '&:hover': {
    bgcolor: 'rgba(0, 0, 0, 0.04)',
    color: 'blueviolet',
  },
});

export const signInButton = (loading: boolean) => ({
  transition: 'all 0.3s',
  transform: loading ? 'scale(0.95)' : 'scale(1)',
  opacity: loading ? 0.7 : 1,
  bgcolor: 'blueviolet',
  color: 'white',
  '&:hover': { bgcolor: 'darkorchid' },
});

export const calculateStyle = (result: Result) => ({
  display: 'inline-block',
  width: 'fit-content',
  ml: 'auto',
  pb: 0.2,
  color: result.finalRestOrder > 0 ? 'red' : 'inherit',
  fontWeight: result.finalRestOrder > 0 ? 'bold' : 'normal',
});
