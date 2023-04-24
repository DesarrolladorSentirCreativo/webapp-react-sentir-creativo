export interface MyFieldProps {
  field: {
    name: string
    value: any
    onChange: (event: React.ChangeEvent<any>) => void
    onBlur: (event: React.FocusEvent<any>) => void
  }
  form: {
    values: Record<string, any>
    errors: Record<string, any>
    touched: Record<string, any>
    handleBlur: (event: React.FocusEvent<any>) => void
    handleChange: (event: React.ChangeEvent<any>) => void
    handleSubmit: (event?: React.FormEvent<HTMLFormElement> | undefined) => void
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  }
}
