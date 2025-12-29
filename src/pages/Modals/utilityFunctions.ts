import type { ICategoryMonth } from "../../types/types"

export const setFormValue = (form: any, field: string, value: string | number | boolean | ICategoryMonth, setFunction: React.SetStateAction<any>) => {
  return setFunction({
    ...form,
    [field]: ["sum", "limit"].includes(field) ? parseFloat(value as string) : value
  })
}
