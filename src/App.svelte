<script>
  import TodoForm from "./components/TodoForm.svelte";
  import { todos, unsubscribe } from "./stores.js";
  import { onDestroy } from "svelte";
  onDestroy(unsubscribe); // Prevent memory leaks

  function removeTodo(id) {
    let index = $todos.indexOf($todos.find((e) => e.id === id));
    if (index > -1) {
      $todos.splice(index, 1);
      $todos = $todos;
    } else {
      console.error(`Error - removeTodo(): Could not find todo with id ${id}`);
    }
  }

  function addTodo({ title, desc }) {
    let newTodo = {
      id: Math.floor(Math.random() * 100000000),
      completed: false,
      title,
      description: desc,
    };
    $todos = [...$todos, newTodo];
  }

  let filterValue = "all";

  let todosToShow = [...$todos];

  $: switch (filterValue) {
    case "all":
      todosToShow = [...$todos];
      break;
    case "todo":
      todosToShow = $todos.filter((e) => !e.completed);
      break;
    case "completed":
      todosToShow = $todos.filter((e) => e.completed);
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
  <TodoForm on:submit={(e) => addTodo(e.detail)} />
  Filter todos by:
  <select class="filter-todos" bind:value={filterValue}>
    <option value="all">All</option>
    <option value="todo">To Do</option>
    <option value="completed">Completed</option>
  </select>
  {#if $todos.length === 0 || $todos.every((e) => e.completed)}
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
        on:change={(e) => {
          $todos.filter((val) => val.id === todo.id)[0].completed =
            e.target.checked;
          $todos = $todos;
        }}
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
      "left-border . description remove";
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
    font-weight: bold;
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
    white-space: pre;
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
