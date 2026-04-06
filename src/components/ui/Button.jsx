import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-blue-600 text-white shadow hover:bg-blue-700": variant === "primary",
          "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700": variant === "secondary",
          "bg-red-500 text-white shadow-sm hover:bg-red-600": variant === "destructive",
          "border border-slate-200 dark:border-slate-700 bg-transparent shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100": variant === "outline",
          "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100": variant === "ghost",
        },
        {
          "h-9 px-4 py-2": size === "default",
          "h-8 rounded-md px-3 text-xs": size === "sm",
          "h-10 rounded-md px-8": size === "lg",
          "h-9 w-9": size === "icon",
        },
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
