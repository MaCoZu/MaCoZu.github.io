// src/components/mdxComponents.tsx
import React from 'react';
import XLink from './XLink';

const components = {
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <XLink href={href}>{children}</XLink>
  ),
};

export default components;
