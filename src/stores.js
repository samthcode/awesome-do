import { writable } from "svelte/store";
import { v4 as uuidGeneratorV4 } from "uuid";
export let todos = writable(
  JSON.parse(localStorage.getItem("todos")) || [
    {
      id: uuidGeneratorV4(),
      completed: true,
      title: "Open the best todo-list web-app in the world!",
      description:
        "Type your todo in the box above to begin improving your productivity.",
    },
    {
      id: uuidGeneratorV4(),
      completed: false,
      title: "Go shopping",
      description:
        "Go shopping and get some stuff.\n\n+ Meat\n+ Bread\n+ Cheese\n+ More Cheese",
    },
    {
      id: uuidGeneratorV4(),
      completed: false,
      title: "Eat some food",
    },
    {
      id: uuidGeneratorV4(),
      completed: false,
      title:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis sint ratione facilis, natus cum labore eos quasi eum porro. Quam, est natus repellat ab ipsam ut accusamus tempore necessitatibus, perspiciatis, temporibus dicta iure! Necessitatibus, dignissimos nisi, accusantium corrupti illum culpa libero debitis ratione veritatis maiores quae sit ipsa iste consequuntur?",
      description: "Hello world",
    },
  ]
);
export const unsubscribe = todos.subscribe((val) =>
  localStorage.setItem("todos", JSON.stringify(val))
);
