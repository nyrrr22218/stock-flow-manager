export const gridCommon = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: 2,
};

export const buttonCommonStyles = {
  display: 'flex',
  gap: 5,
  mt: 4,
  mb: 4,
  justifyContent: 'right',
};

export const paperCommon = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  '&:hover': { boxShadow: 3 },
};
