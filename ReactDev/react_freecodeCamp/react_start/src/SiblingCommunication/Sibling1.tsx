import React from 'react'

export interface Sibling1Props {
    name: string;
  }
  
  export const Sibling1 = (props: Sibling1Props) => {
    return <div id="sibling1">Sibling1 name is: {props.name}</div>;
  };