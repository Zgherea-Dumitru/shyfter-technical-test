
export const hour_rate = 15

export type Category = {
  id: string
  name: string
  color: string
}

export type Task = {
  id: string
  userId: string
  categoryId: string
  start: Date
  end: Date
}

export type User = {
  id: string
  name: string
  profileImg: string
}

export const categories_mock = [
  {
    id: "1",
    name: "OPENING",
    color: "#ffffff"
  },
  {
    id: "2",
    name: "CLOSING",
    color: "#ffffff"
  },
  {
    id: "3",
    name: "TRUCK",
    color: "#121212"
  },
  {
    id: "4",
    name: "SICK",
    color: "#121212"
  },
  {
    id: "5",
    name: "HOLIDAY",
    color: "#121212"
  },
]

export const tasks_mock: Task[] = [
  {
    id: "1",
    userId: "1",
    categoryId: "1",
    start: new Date("2024-12-12 10:00"),
    end: new Date("2024-12-12 18:00"),
  },
  {
    id: "2",
    userId: "2",
    categoryId: "2",
    start: new Date("2024-12-09 07:30"),
    end: new Date("2024-12-09 17:00"),
  },
  {
    id: "3",
    userId: "3",
    categoryId: "3",
    start: new Date("2024-12-10 09:15"),
    end: new Date("2024-12-10 17:45"),
  },
]

export const users_mock: User[] = [
  {
    id: "1",
    name: "John Doe",
    profileImg: "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
  },
  {
    id: "2",
    name: "Louis De Ville",
    profileImg: "https://www.shareicon.net/download/2016/05/24/770118_people_512x512.png"
  },
  {
    id: "3",
    name: "Jim Carrey",
    profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gXPWxo_fQPzvP2TNGFtHzqQiChF6VklO68Fydsig_A69sVnizAMg_bxzCLvFEDMpwI8&usqp=CAU"
  },
]

export const week_days: Date[] = [
  new Date("2024-12-09"),
  new Date("2024-12-10"),
  new Date("2024-12-11"),
  new Date("2024-12-12"),
  new Date("2024-12-13"),
  new Date("2024-12-14"),
  new Date("2024-12-15"),
]