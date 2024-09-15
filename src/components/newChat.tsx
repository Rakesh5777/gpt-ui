import createIcon from "@/assets/create-icon.svg";
import { cn } from "@/lib/utils";

export const NewChatIcon = ({ iconClassName = "", divClassName = "" }) => {
  return (
    <div
      className={cn(
        "h-10 flex w-10 justify-center items-center rounded-xl hover:bg-secondary",
        divClassName
      )}
    >
      <img
        src={createIcon}
        className={cn("cursor-pointer h-[24px]", iconClassName)}
      />
    </div>
  );
};
