import { Checkbox } from "@/components/base/checkbox";
import { Label } from "@/components/base/label";
import {
  useFieldContext
} from "@/components/feature/waitListForm/WaitListFormData";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";



type SwitchFieldPropsT = {
  label?: string
  checked?: boolean
  toggleLinkedChecked?: (fieldName: string) => void
} & HTMLAttributes<HTMLDivElement>


export function CheckboxField({
  label,
  checked = true,
  toggleLinkedChecked,
  className,
  ...props
}: SwitchFieldPropsT) {


  const field = useFieldContext<boolean>()


  return (

    <div
      className={cn(
        "flex items-center gap-2 hover:cursor-pointer *:hover:cursor-pointer",
        className
      )}
      {...props}
    >
      <Checkbox
        id={field.name}
        checked={toggleLinkedChecked ? checked : field.state.value}
        onCheckedChange={(value: boolean) => {
          toggleLinkedChecked?.(`${field.name}`)
          field.handleChange(value)
        }}
      />

      <Label htmlFor={field.name}>
        {label}
      </Label>
    </div>

  )
}
