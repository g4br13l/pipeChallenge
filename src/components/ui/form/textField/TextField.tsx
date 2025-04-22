import { Input } from "@/components/base/input"
import { Label } from "@/components/base/label"
import { useFieldContext } from "@/components/feature/waitListForm/WaitListFormData"
import { cn } from "@/lib/utils"
import { ChangeEvent, ComponentProps } from "react"
import { FieldErrors } from "../errorsField/FieldErrors"
import { mask, MaskTypeT } from "@/lib/text/masks"




type TextFieldPropsT = {
  label?: string
  maskType?: MaskTypeT
} & ComponentProps<"input">


export function TextField({
  label,
  placeholder,
  className,
  maskType,
  ...props
}: TextFieldPropsT) {

  const field = useFieldContext<string>()
  const errorsState = field.state.meta.errors


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const prevValue = field.state.value
    const currValue = event.target.value
    if (currValue.length < prevValue.length) field.handleChange(currValue)
    else {
      const maskedVal = maskType ? mask[`${maskType}`](currValue) : currValue
      field.handleChange(maskedVal)
    }
  }



  return (

    <div className={cn('flex flex-col w-full gap-1', className)}>

      {label && (
        <Label htmlFor={field.name} className="pl-1.5">
          {label}
        </Label>
      )}

      <Input
        id={field.name}
        type="text"
        placeholder={placeholder}
        {...props}
        value={field.state.value}
        onChange={(e) => handleChange(e)}
        onBlur={field.handleBlur}
        className={errorsState.length > 0 ? 'border-destructive' : ''}
      />

      <FieldErrors errors={errorsState} />

    </div>

  )
}
