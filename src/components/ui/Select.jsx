import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-slate-300 dark:border-slate-700 bg-transparent [&>option]:bg-white dark:[&>option]:bg-slate-900 px-3 py-2 text-sm shadow-sm ring-offset-slate-50 dark:ring-offset-slate-950 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

export { Select };
