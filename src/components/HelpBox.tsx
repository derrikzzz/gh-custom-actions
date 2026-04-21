import { HelpBoxProps } from "../types/HelpBox";

function HelpBox({ title, text }: HelpBoxProps) {
  return (
    <article className="p-4 rounded flex-1 text-left">
      <h2 className="text-[#97a2a2] text-[1.05rem]">{title}</h2>
      <p>{text}</p>
    </article>
  );
}

export default HelpBox;
