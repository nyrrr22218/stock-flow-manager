'use client';

import { domAnimation, LazyMotion, m } from 'framer-motion';

export const SignInMotion = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};
