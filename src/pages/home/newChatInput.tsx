import { cn } from "@/lib/utils";
import searchIcon from "@/assets/search-status.svg";
import sendIcon from "@/assets/arrow-up.svg";
import { useState } from "react";

export const NewChatInput = ({ className = "" }) => {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.textContent);
  };

  return (
    <div
      className={cn(
        "flex justify-between items-center p-4 w-full max-h-64",
        className
      )}
    >
      <div className="bg-secondary w-full h-full min-h-14 rounded-3xl flex items-end px-4 py-2">
        <div className="flex items-center justify-center rounded-full h-10 w-10">
          <img src={searchIcon} alt="search" />
        </div>
        <div
          contentEditable={true}
          onInput={handleChange}
          className="bg-secondary w-full h-full flex-1 flex items-center px-2 outline-none cursor-text overflow-auto"
        ></div>
        <div className="cursor-pointer flex items-center justify-center bg-primary/10 hover:bg-primary/20 rounded-full h-10 w-10">
          <img src={sendIcon} alt="search" />
        </div>
      </div>
    </div>
  );
};
