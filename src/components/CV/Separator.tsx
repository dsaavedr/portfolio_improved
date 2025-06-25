import { cn } from "@/lib/utils";

const Separator = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("w-full border-t-[1px] border-gray-300", className)}
    ></div>
  );
};

export default Separator;
