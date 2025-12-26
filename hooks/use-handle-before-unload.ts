import { useEffect } from 'react';

export const useHandleBeforeUnload = (editMode: boolean) => {
  useEffect(() => {
    if (!editMode) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [editMode]);
};
