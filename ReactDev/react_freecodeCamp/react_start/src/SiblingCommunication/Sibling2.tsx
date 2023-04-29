import React from 'react'

export interface Sibling2Props {
    age: number;
    notifyParent: () => void;
  }
  
  export const Sibling2 = (props: Sibling2Props) => {
    return (
      <div id="sibling2">
        <div>Sibling2 age is {props.age}</div>
        <div>
          <button
            onClick={() => {
              props.notifyParent();
            }}
          >
            Click me
          </button>
        </div>
      </div>
    );
  };
