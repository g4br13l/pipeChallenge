import { useState } from "react";
import {
  almostAllSubitemsEqualTo,
  setAllProps,
  useAppForm,
  WaitListFormCheckableFieldsT,
  WaitListFormFieldsT,
  waitListFormSchema
} from "./WaitListFormData";




type handleGenericToggleCheckedFnT = (fieldName: string) => void


type WaitListFormPropsT = {
  handleFormSubmit: (value: WaitListFormFieldsT) => void
}


export function WaitListForm({ handleFormSubmit }: WaitListFormPropsT) {


  const [checkedState, setCheckedState] = useState<WaitListFormCheckableFieldsT>({
    allNotifications: true,
    emailNotifications: true,
    smsNotifications: true
  })


  const handleToggleChecked = (fieldName: keyof WaitListFormCheckableFieldsT) => {

    if (fieldName === 'allNotifications') {
      setCheckedState((prev) => setAllProps(prev, !prev.allNotifications))
    }
    else setCheckedState((prev) => {
      const newValue = !prev[fieldName]
      let allNotificationsVal: boolean = prev.allNotifications
      if (!newValue && almostAllSubitemsEqualTo(prev, false)) allNotificationsVal = false
      if (newValue && almostAllSubitemsEqualTo(prev, true)) allNotificationsVal = true
      return {
        ...prev,
        allNotifications: allNotificationsVal,
        [fieldName]: newValue
      }
    })
  }

  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      allNotifications: checkedState.allNotifications,
      emailNotifications: checkedState.emailNotifications,
      smsNotifications: checkedState.smsNotifications,
      allowPhoneCall: Boolean(true)
    } satisfies WaitListFormFieldsT,
    validators: {
      onSubmit: waitListFormSchema
    },
    onSubmit: ({ value }) => handleFormSubmit(value),
    asyncDebounceMs: 500,
  })


  return (

    <div className="flex flex-col gap-4">

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >

        <form.AppField
          name="name"
          children={(f) => (
            <f.TextField label="Name" />
          )}
        />

        <form.AppField
          name="email"
          children={(f) => (
            <f.TextField label="Email" />
          )}
        />

        <form.AppField
          name="phone"
          children={(f) => (
            <f.TextField label="Phone" maskType="phone" />
          )}
        />

        <form.AppForm>
          <form.SubmitButton>
            Save
          </form.SubmitButton>
        </form.AppForm>

        <div className="flex flex-col gap-4 my-6">

          <small className="mb-2">
            Would you like to be notified when the product is available?
          </small>

          <form.AppField
            name="allNotifications"
            children={(f) => (
              <f.CheckboxField
                label="Allow all notifications"
                checked={checkedState.allNotifications}
                toggleLinkedChecked={handleToggleChecked as handleGenericToggleCheckedFnT}
              />
            )}
          />

          <div className="flex flex-col gap-3 pl-6">

            <form.AppField
              name="emailNotifications"
              children={(f) => (
                <f.CheckboxField
                  label="Email notifications"
                  checked={checkedState.emailNotifications}
                  toggleLinkedChecked={handleToggleChecked as handleGenericToggleCheckedFnT}
                />
              )}
            />

            <form.AppField
              name="smsNotifications"
              children={(f) => (
                <f.CheckboxField
                  label="SMS notifications"
                  checked={checkedState.smsNotifications}
                  toggleLinkedChecked={handleToggleChecked as handleGenericToggleCheckedFnT}
                />
              )}
            />

          </div>

          <form.AppField
            name="allowPhoneCall"
            children={(f) => (
              <f.CheckboxField
                label="Allow phone call"
                checked={true}
              />
            )}
          />

        </div>

      </form>

    </div >

  )
}

