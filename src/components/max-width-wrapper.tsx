import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("mx-auto max-w-screen-xl px-4 md:px-8 w-full", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
