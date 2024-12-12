"use client"

import { format } from "date-fns"
import { useCallback, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Task, tasks_mock, users_mock, week_days } from "@/lib/mock-data";
import Droppable from "@/components/drag-and-drop/Droppable";
import TaskDragItem from "@/components/task-drag-item/TaskDragItem";
import EditTaskForm from "@/components/edit-task-dialog/EditTaskDialog";
import DeleteTaskDialog from "@/components/delete-task-dialog/DeleteTaskDialog";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(tasks_mock);
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [deleteTask, setDeleteTask] = useState<Task | null>(null)

  const handleTaskDelete = useCallback((taskId: string) => {
    setTasks(prev => prev.filter((t) => t.id !== taskId))
  }, [])
  const handleDeleteCancel = useCallback(() => {
    setDeleteTask(null)
  }, [])

  const handleTaskEdit = useCallback((task: Task) => {
    setTasks(prev => [
      ...prev.filter((t) => t.id !== task.id),
      task
    ])
    setEditTask(null)
  }, [])
  const handleEditCancel = useCallback(() => {
    setEditTask(null)
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const taskToEdit: Task | undefined = tasks.find((t) => t.id === event.active?.id)

    if (!taskToEdit) {
      return
    }

    taskToEdit.start.setDate(event.over?.data?.current?.date.getDate())
    taskToEdit.end.setDate(event.over?.data?.current?.date.getDate())

    setTasks(prev => [
      ...prev.filter((t) => t.id !== event.active?.id),
      {
        ...taskToEdit,
        userId: event.over?.data?.current?.userId,
      }
    ]);
  }, [])

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex ml-48 divide-x border-t border-x">
        {week_days.map((d) => (
          <span key={d.getDate()} className="w-40 p-3 text-center">{format(d, 'E d')}</span>
        ))}
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="divide-y border">
          {users_mock.map((u) => (
            <div key={u.id} className="flex min-h-28 divide-x">
              <div className="w-48 p-3 flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={u.profileImg} />
                </Avatar>
                {u.name}
              </div>
              {week_days.map((d) => (
                <Droppable
                  key={`${d.getDate()}-${u.id}`}
                  id={`${d.getDate()}-${u.id}`}
                  className="w-40"
                  data={{
                    userId: u.id,
                    date: d,
                  }}
                >
                  <TaskDragItem
                    setEditTask={setEditTask}
                    setDeleteTask={setDeleteTask}
                    tasks={tasks.filter((t) => t.userId === u.id && t.start.getDate() === d.getDate())}
                  />
                </Droppable>
              ))}
            </div>
          )
          )}
        </div>
        {editTask && (
          <EditTaskForm
            task={editTask}
            onTaskEdit={handleTaskEdit}
            onEditCancel={handleEditCancel}
          />
        )}
        {deleteTask && (
          <DeleteTaskDialog
            task={deleteTask}
            onDeleteCancel={handleDeleteCancel}
            onTaskDelete={(task) => {
              handleTaskDelete(task.id)
              setDeleteTask(null)
            }}
          />
        )}
      </DndContext>
    </div>
  );
}
