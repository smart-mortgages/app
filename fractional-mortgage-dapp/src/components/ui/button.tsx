import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[#d2b48c] text-[#262626] shadow-xs hover:bg-[#c19a6b]",
        destructive:
          "bg-[#ff4d4f] text-white shadow-xs hover:bg-[#ff4d4f]/90 focus-visible:ring-[#ff4d4f]/20",
        outline:
          "border border-[#404040] bg-[#262626] text-[#f5f5f5] shadow-xs hover:bg-[#333333]",
        secondary:
          "bg-[#e6d2b5] text-[#262626] shadow-xs hover:bg-[#d2b48c]/80",
        ghost:
          "bg-transparent text-[#f5f5f5] hover:bg-[#333333] hover:text-[#f5f5f5]",
        link: "bg-transparent text-[#d2b48c] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
