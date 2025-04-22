import { ZodIssue } from "zod"



type FieldErrorsPropsT = {
  errors: ZodIssue[] | undefined
}


export function FieldErrors({ errors }: FieldErrorsPropsT) {

  return (

    <div className="flex flex-col gap-1 mx-1.5">

      {/* {JSON.stringify(errors, null, 2)} */}

      {
        errors?.map((error, index) => (
          <small
            key={index}
            className="mt-0 text-destructive"
          >
            {error.message}
          </small>
        ))
      }

    </div>
  )
}
