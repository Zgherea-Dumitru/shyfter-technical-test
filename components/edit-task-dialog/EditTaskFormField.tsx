import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type EditTaskFormFieldProps = {
  name: string
  formLabel?: string
  placeholder?: string
  options: {
    value: string,
    label: string
  }[]
}

export default ({
  name,
  formLabel,
  placeholder,
  options
}: EditTaskFormFieldProps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <FormMessage />
        </ FormItem>
      )}
    />
  )
}