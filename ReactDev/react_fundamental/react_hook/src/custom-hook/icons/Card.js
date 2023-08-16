import * as React from "react";
const SvgCard = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M16 20h4v-4h-4v4Zm0-6h4v-4h-4v4Zm-6-6h4V4h-4v4Zm6 0h4V4h-4v4Zm-6 6h4v-4h-4v4Zm-6 0h4v-4H4v4Zm0 6h4v-4H4v4Zm6 0h4v-4h-4v4ZM4 8h4V4H4v4Z" />
  </svg>
);
export default SvgCard;
