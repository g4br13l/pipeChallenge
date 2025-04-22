import { CheckboxField } from "@/components/ui/form/checkboxField/CheckboxField";
import { SubmitButton } from "@/components/ui/form/submitButton/SubmitButton";
import { TextField } from "@/components/ui/form/textField/TextField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { z } from 'zod';


/**
 *  Tanstack Form
 */

export const {
  fieldContext,
  useFieldContext,
  formContext,
  useFormContext
} = createFormHookContexts()


export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    CheckboxField
  },
  formComponents: {
    SubmitButton
  },
  fieldContext,
  formContext,
})



/**
 * Zod Validations
 */

const errMsg = {
  min: (n: number) => `This field must have at least ${n.toString()} character(s)`,
  max: (n: number) => `This field must have at most ${n.toString()} character(s)`
}

export const waitListFormSchema = z.object({
  name: z.string()
    .min(3, errMsg.min(3))
    .max(30, errMsg.max(30)),
  email: z.string()
    .email()
    .max(50, errMsg.max(50)),
  phone: z.string()
    .refine((arg: string) => {
      const phoneRegEx = /^(?:\+?(\d{1,3}) ?)?([(]?(\d{2,3})[)]? ?)?(((\d{4,5}))[- ]?(\d{3,4}))$/
      return phoneRegEx.test(arg)
    }, 'Invalid phone'),
  allNotifications: z.boolean(),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  allowPhoneCall: z.boolean()
})
export type WaitListFormFieldsT = z.infer<typeof waitListFormSchema>
export type WaitListFormCheckableFieldsT =
  Pick<WaitListFormFieldsT, 'allNotifications' | 'emailNotifications' | 'smsNotifications'>


/**
 * Form Utils
*/

export function setAllProps(obj: WaitListFormCheckableFieldsT, value: boolean) {
  return Object.fromEntries(
    Object.entries(obj).map(([key]) => [key, value])
  ) as WaitListFormCheckableFieldsT
}

export function almostAllSubitemsEqualTo(obj: WaitListFormCheckableFieldsT, verifyValue: boolean) {
  return Object.entries(obj)
    .filter(([key, value]) => (key !== 'allNotifications' && value !== verifyValue))
    .length <= 1
}
