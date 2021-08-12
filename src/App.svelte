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
      if (titleBox) {
        titleBox.focus();
      }
      return;
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
</script>

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
  {#each todos as todo}
    <div class="todo">
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

  .add-todo-desc {
    margin-bottom: 1em;
    display: block;
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
    grid-template-columns: 2em 1em auto 2em;
    grid-template-rows: 2em auto;
    grid-template-areas:
      "checkbox . title remove"
      "checkbox . description remove";
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
  }

  .todo__checkbox {
    grid-area: checkbox;
    max-width: 1em;
  }

  .todo__description {
    grid-area: description;
    font-size: 0.85rem;
    /* margin-left: 1em; */
  }

  .todo__remove {
    grid-area: remove;
    /* height: 1.75em; */
    /* line-height: 0em; */
    display: flex;
    align-items: center;
    justify-content: center;
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
