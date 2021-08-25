<script>
  import { v4 as uuidGeneratorV4 } from "uuid";
  import TodoForm from "./components/TodoForm.svelte";
  import { todos, unsubscribe } from "./stores.js";
  import { onDestroy, onMount } from "svelte";
  onDestroy(unsubscribe); // Prevent memory leaks
  onMount(() => {
    if (localStorage.getItem("hasVisitedSinceIdUpdate") === null) {
      $todos.forEach((i) => {
        i.id = uuidGeneratorV4();
      });

      localStorage.setItem("hasVisitedSinceIdUpdate", true);
    }
  });

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
      id: uuidGeneratorV4(),
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

  $: console.log(todosToShow);
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
<div class="options">
  <TodoForm on:submit={(e) => addTodo(e.detail)} />
  Filter todos by:
  <select class="filter-todos" bind:value={filterValue}>
    <option value="all">All</option>
    <option value="todo">To Do</option>
    <option value="completed">Completed</option>
  </select>
</div>
<main>
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
  :global(:root) {
    --clr-green: green;
    --clr-dark-green: darkgreen;
    --clr-accent: #efefef;
  }
  :global(*) {
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
    background-color: var(--clr-accent);
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-inline: 2em;
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

  /* OPTIONS */

  .options {
    width: 100%;
    background: var(--clr-accent);
    margin-bottom: 1.5em;
    padding-inline: 2em;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
  }

  /* TODO ITEMS */

  .completed {
    text-decoration: line-through;
    font-style: italic;
    opacity: 0.7;
  }

  .todo {
    /* border: 1px solid grey; */
    border-radius: 5px;
    background: var(--clr-accent);
    padding: 0.5em;
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
    max-width: 2em;
    margin: auto 0;
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
    white-space: pre-wrap;
  }

  .todo__remove {
    grid-area: remove;
    /* height: 1.75em; */
    /* line-height: 0em; */
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 2em;
    margin: auto 0;
    border-radius: 50%;
  }

  /* ALL TASKS COMPLETED */

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
