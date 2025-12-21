import { useCallback, useState } from 'react';

export const useHandleEditToggle = (initialMode: boolean = false) => {
  const [editMode, setEditMode] = useState<boolean>(initialMode);
  const handleEditToggle = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);
  return {
    editMode,
    setEditMode,
    handleEditToggle,
  };
};
