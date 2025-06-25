import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const Title = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn("my-5 flex items-center justify-center gap-3", className)}
    >
      {children}
    </div>
  );
};

export default Title;
