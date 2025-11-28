'use client'

import { useButton } from "@/hooks/buttons/useButton";
import { ButtonProps } from "@/interfaces/buttonInterfaces/button";

export default function ButtonComponent({type, content, icon, onClick}:ButtonProps) {
  const style = useButton(type);

  return (
    <div>
        <button className={style} onClick={onClick}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}>
            {icon}
            {content}
            </span>
        </button>
    </div>
  )
}