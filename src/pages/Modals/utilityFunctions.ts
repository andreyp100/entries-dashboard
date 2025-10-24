export const setFormValue = (form: any, field: string, value: string | number | boolean, setFunction: React.SetStateAction<any>) => {
  return setFunction({
    ...form,
    [field]: ["sum", "limit"].includes(field) ? parseFloat(value as string) : value
  })
}
