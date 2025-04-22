import { Button, buttonVariants } from "@/components/base/button"
import { useFormContext } from "@/components/feature/waitListForm/WaitListFormData"
import { cn } from "@/lib/utils"
import { useStore } from "@tanstack/react-form"
import { VariantProps } from "class-variance-authority"
import { ComponentProps, ReactNode } from "react"



type SubmitButtonPropsT = {
  children: ReactNode
  asChild?: boolean
} & ComponentProps<"button">
  & VariantProps<typeof buttonVariants>


export function SubmitButton({
  children,
  className,
  ...props
}: SubmitButtonPropsT) {

  const form = useFormContext()
  const [isSubmitting, canSubmit, isSubmitSuccessful] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
    state.isSubmitSuccessful
  ])


  return (

    <div className="w-full">
      {isSubmitSuccessful && (
        <strong className="text-accent-foreground">
          Registration made successfully
        </strong>
      )}
      <Button
        type="submit"
        className={cn("w-full my-4", className)}
        disabled={isSubmitting || !canSubmit}
        {...props}
      >
        {children}
      </Button>
    </div>

  )
}
