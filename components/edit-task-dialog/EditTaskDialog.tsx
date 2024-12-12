"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { categories_mock, Task, users_mock } from "@/lib/mock-data"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import EditTaskFormField from "@/components/edit-task-dialog/EditTaskFormField"

const hours: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
const minutes: string[] = ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]

const formSchema = z.object({
  categoryId: z.string().min(1),
  userId: z.string().min(1),
  startHour: z.string().min(1),
  startMinute: z.string().min(1),
  endHour: z.string().min(1),
  endMinute: z.string().min(1),
})

type EditTaskFormPropsType = {
  task: Task
  onTaskEdit: (task: Task) => void
  onEditCancel: () => void
}

export default ({ task, onTaskEdit, onEditCancel }: EditTaskFormPropsType) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: task.categoryId,
      userId: task.userId,
      startHour: task.start.getHours().toString(),
      startMinute: task.start.getMinutes().toString(),
      endHour: task.end.getHours().toString(),
      endMinute: task.end.getMinutes().toString(),
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newStart = task.start
    const newEnd = task.end

    newStart.setHours(parseInt(values.startHour))
    newStart.setMinutes(parseInt(values.startMinute))
    newEnd.setHours(parseInt(values.endHour))
    newEnd.setMinutes(parseInt(values.endMinute))

    onTaskEdit({
      id: task.id,
      categoryId: values.categoryId,
      userId: values.userId,
      start: newStart,
      end: newEnd
    })
  }

  return (
    <Sheet open={task !== null} onOpenChange={() => onEditCancel()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit task</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full h-full flex flex-col">
            <EditTaskFormField
              name="categoryId"
              formLabel="Category"
              placeholder="Select a category"
              options={categories_mock.map((c) => ({ label: c.name, value: c.id }))}
            />
            <EditTaskFormField
              name="userId"
              formLabel="User"
              placeholder="Select an user"
              options={users_mock.map((u) => ({ label: u.name, value: u.id }))}
            />
            <div className="flex justify-between">
              <div className="flex items-end gap-2">
                <EditTaskFormField
                  name="startHour"
                  formLabel="Start"
                  placeholder="12"
                  options={hours.map((h) => ({ label: h, value: h }))}
                />
                <span className="h-9">:</span>
                <EditTaskFormField
                  name="startMinute"
                  placeholder="00"
                  options={minutes.map((m) => ({ label: m, value: m }))}
                />
              </div>
              <div className="flex items-end gap-2">
                <EditTaskFormField
                  name="endHour"
                  formLabel="End"
                  placeholder="18"
                  options={hours.map((h) => ({ label: h, value: h }))}
                />
                <span className="h-9">:</span>
                <EditTaskFormField
                  name="endMinute"
                  placeholder="00"
                  options={minutes.map((m) => ({ label: m, value: m }))}
                />
              </div>
            </div>
            <div className="flex gap-3 !mt-auto !mb-5">
              <Button className="flex-1" variant="secondary" onClick={onEditCancel}>Cancel</Button>
              <Button className="flex-1" type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
