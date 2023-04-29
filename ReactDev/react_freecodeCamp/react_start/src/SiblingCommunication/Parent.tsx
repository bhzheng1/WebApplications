import React from 'react'
export interface ParentProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Parent = (props: ParentProps) => {
  return <div id="parent">{props.children}</div>;
};