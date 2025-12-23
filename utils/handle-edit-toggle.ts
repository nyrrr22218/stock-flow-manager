import { Dispatch, SetStateAction } from 'react';

export const handleEditToggle = (setEditMode: Dispatch<SetStateAction<boolean>>) =>
  setEditMode((prev: boolean) => !prev);
