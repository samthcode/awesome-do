import { writable } from "svelte/store";
let stored = localStorage.getItem("todos");
let todosJSON;
if (stored) {
  try {
    todosJSON = JSON.parse(stored);
  } catch (error) {
    console.error(`Error parsing todos JSON: "${error}". JSON: "${stored}"`);
    todosJSON = [];
  }
} else {
  todosJSON = [
    {
      id: Math.floor(Math.random() * 100000000),
      completed: true,
      title: "Open the best todo-list web-app in the world!",
      description:
        "Type your todo in the box above to begin improving your productivity.",
    },
    {
      id: Math.floor(Math.random() * 100000000),
      completed: false,
      title: "Go shopping",
      description: "Go shopping and get some stuff.",
    },
    {
      id: Math.floor(Math.random() * 100000000),
      completed: false,
      title: "Eat some food",
    },
    {
      id: Math.floor(Math.random() * 100000000),
      completed: false,
      title:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis sint ratione facilis, natus cum labore eos quasi eum porro. Quam, est natus repellat ab ipsam ut accusamus tempore necessitatibus, perspiciatis, temporibus dicta iure! Necessitatibus, dignissimos nisi, accusantium corrupti illum culpa libero debitis ratione veritatis maiores quae sit ipsa iste consequuntur?",
      description: "Hello world",
    },
  ];
}
export let todos = writable(todosJSON);
export const unsubscribe = todos.subscribe((val) =>
  localStorage.setItem("todos", JSON.stringify(val))
);
