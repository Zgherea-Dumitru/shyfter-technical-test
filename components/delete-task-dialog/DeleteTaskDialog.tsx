import { Task } from "@/lib/mock-data"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

type DeleteTaskDialogPropsType = {
  task: Task
  onTaskDelete: (task: Task) => void
  onDeleteCancel: () => void
}

export default ({
  task,
  onTaskDelete,
  onDeleteCancel,
}: DeleteTaskDialogPropsType) => {
  return (
    <Dialog open={task !== null} onOpenChange={onDeleteCancel}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Delete task</DialogTitle>
        </DialogHeader>
        <span className="text-red-500">Are you sure you want to delete this task? This action cannot be undone.</span>
        <div className="flex gap-3">
          <Button
            className="flex-1"
            variant="secondary"
            onClick={onDeleteCancel}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={() => onTaskDelete(task)}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}