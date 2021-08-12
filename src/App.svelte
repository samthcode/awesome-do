<script>
  let uid = 1;
  let todos = [
    {
      id: uid++,
      completed: true,
      title: "Open the best todo-list web-app in the world!",
      description:
        "Type your todo in the box above to begin improving your productivity.",
    },
    {
      id: uid++,
      completed: false,
      title: "Go shopping",
      description: "Go shopping and get some stuff.",
    },
    {
      id: uid++,
      completed: false,
      title: "Eat some food",
    },
    {
      id: uid++,
      completed: false,
      title:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis sint ratione facilis, natus cum labore eos quasi eum porro. Quam, est natus repellat ab ipsam ut accusamus tempore necessitatibus, perspiciatis, temporibus dicta iure! Necessitatibus, dignissimos nisi, accusantium corrupti illum culpa libero debitis ratione veritatis maiores quae sit ipsa iste consequuntur?",
      description: "Hello world",
    },
  ];

  function removeTodo(id) {
    let index = todos.indexOf(todos.find((e) => e.id === id));
    if (index > -1) {
      todos.splice(index, 1);
      todos = todos;
    } else {
      console.error(`Error - removeTodo(): Could not find todo with id ${id}`);
    }
  }

  let newTitle = "";
  let newDescription = "";
  let titleBox = undefined;
  let descBox = undefined;

  function addTodo(event) {
    if (event.code !== "Enter") return;
    if (newTitle === "") {
      newTitle = "New Todo";
    }
    let newTodo = {
      id: uid++,
      completed: false,
      title: newTitle,
      description: newDescription,
    };
    todos = [...todos, newTodo];
    newTitle = "";
    newDescription = "";
    if (titleBox) {
      titleBox.focus();
    }
  }

  function focusOnDesc(event) {
    if (event.code !== "Enter" || !descBox) return;
    descBox.focus();
  }

  let filterValue = "all";

  let todosToShow = [...todos];

  $: switch (filterValue) {
    case "all":
      todosToShow = [...todos];
      break;
    case "todo":
      todosToShow = todos.filter((e) => !e.completed);
      break;
    case "completed":
      todosToShow = todos.filter((e) => e.completed);
  }
</script>

<svelte:head>
  <title>AwesomeDo</title>
</svelte:head>

<header>
  <h1 class="header__title">
    <span class="green">Awesome</span><span class="dark-green">Do</span>
  </h1>
  <div class="header__body">The best Todo App, made in Britain</div>
</header>
<main>
  <input
    type="text"
    bind:value={newTitle}
    placeholder="Add a task!"
    on:keydown={focusOnDesc}
    class="add-todo"
    bind:this={titleBox}
  />
  <input
    type="textarea"
    bind:value={newDescription}
    placeholder="Task description"
    on:keydown={addTodo}
    class="add-todo-desc"
    bind:this={descBox}
  />
  Filter todos by:
  <select class="filter-todos" bind:value={filterValue}>
    <option value="all">All</option>
    <option value="todo">To Do</option>
    <option value="completed">Completed</option>
  </select>
  {#if todos.length === 0 || todos.every((e) => e.completed)}
    <div class="congrats">
      <h2 class="congrats__title">
        Well done! You have completed every Todo for today!
      </h2>
      <div class="congrats__body">
        Why not go for a walk, or simply relax in front of the telly.
      </div>
    </div>
  {/if}
  {#each todosToShow as todo}
    <div class="todo">
      <div class="todo__border-left" />
      <input
        type="checkbox"
        class="todo__checkbox"
        bind:checked={todo.completed}
      />
      <span class="todo__title" class:completed={todo.completed}
        >{todo.title}</span
      >
      <button
        on:click={() => {
          removeTodo(todo.id);
        }}
        class="todo__remove">X</button
      >

      <div class:completed={todo.completed} class="todo__description">
        {#if todo.description}
          {todo.description}
        {/if}
      </div>
    </div>
  {/each}
</main>

<style>
  :root {
    --clr-green: green;
    --clr-dark-green: darkgreen;
  }
  * {
    margin: 0;
    box-sizing: border-box;
  }

  span.green {
    color: var(--clr-green);
  }

  span.dark-green {
    color: var(--clr-dark-green);
  }

  header {
    background-color: #efefef;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-inline: 2em;
    margin-bottom: 1.5em;
  }

  .header__body {
    font-weight: 600;
  }

  main {
    padding-inline: 2em;
  }

  .add-todo {
    margin-bottom: 0.25em;
    width: 30em;
    max-width: 50%;
  }

  .add-todo-desc {
    margin-bottom: 0.25em;
    display: block;
    width: 30em;
    max-width: 50%;
  }

  .filter-todos {
    margin-bottom: 1em;
  }

  .completed {
    text-decoration: line-through;
    font-style: italic;
    opacity: 0.7;
  }

  .todo {
    /* border: 1px solid grey; */
    border-radius: 5px;
    display: grid;
    grid-template-columns: min-content 1em auto 2em;
    grid-template-rows: auto auto;
    grid-template-areas:
      "left-border checkbox title remove"
      "left-border checkbox description remove";
    grid-column-gap: 1em;
  }

  .todo + .todo {
    margin-top: 1em;
  }

  .todo:last-of-type {
    margin-bottom: 1em;
  }

  .todo__title {
    grid-area: title;
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break: break-all;
  }

  .todo__border-left {
    grid-area: left-border;
    width: 0.1em;
    border-radius: 2px;
    background-color: green;
  }

  .todo__checkbox {
    grid-area: checkbox;
    max-width: 1em;
  }

  .todo__checkbox:hover {
    cursor: pointer;
  }

  .todo__description {
    grid-area: description;
    font-size: 0.85rem;
    /* margin-left: 1em; */
    word-wrap: break-word;
    word-break: break-all;
  }

  .todo__remove {
    grid-area: remove;
    /* height: 1.75em; */
    /* line-height: 0em; */
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 2em;
  }

  .congrats {
    margin-bottom: 1em;
  }

  .congrats__title {
    color: green;
    font-size: 20px;
  }

  .congrats__body {
    font-style: italic;
  }
</style>
