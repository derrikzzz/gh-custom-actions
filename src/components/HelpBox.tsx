import "./HelpBox.css";

import { HelpBoxProps } from "../types/HelpBox";

function HelpBox({ title, text }: HelpBoxProps) {
  return (
    <article className="help-box">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

export default HelpBox;
