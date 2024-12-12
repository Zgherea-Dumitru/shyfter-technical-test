import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge";
import { categories_mock, hour_rate, Task } from "@/lib/mock-data";
import Draggable from "@/components/drag-and-drop/Draggable";

type TaskDragItemPropsType = {
  tasks: Task[]
  setEditTask: (task: Task) => void
  setDeleteTask: (task: Task) => void
}

export default ({
  tasks,
  setEditTask,
  setDeleteTask
}: TaskDragItemPropsType) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {tasks.map((t) => {
        const category = categories_mock.find((c) => c.id === t.categoryId)
        const hourDifference = t.end.getHours() - t.start.getHours()

        return (
          <ContextMenu key={t.id} modal={false}>
            <Draggable key={t.id} id={t.id} className="w-full">
              <ContextMenuTrigger className="flex flex-col items-start m-2 p-2 border rounded-md bg-white">
                <span className="text-lg">
                  {format(t.start, 'HH:mm')} - {format(t.end, 'HH:mm')}
                </span>
                <span className="flex gap-2 mb-1">
                  <span>{hourDifference}h</span>
                  <span>{hourDifference * hour_rate}€</span>
                </span>
                <Badge className={`w-full font-light !bg-[${category?.color}]`}>{category?.name}</Badge>
              </ContextMenuTrigger>
            </Draggable>
            <ContextMenuContent>
              <ContextMenuItem
                onMouseDown={() => {
                  setEditTask(t)
                }}>
                Edit
              </ContextMenuItem>
              <ContextMenuItem
                onMouseDown={() => {
                  setDeleteTask(t)
                }}>
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )
      })}
    </div>
  )
}
