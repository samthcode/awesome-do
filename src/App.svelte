<script>
  import { v4 as uuidGeneratorV4 } from "uuid";
  import TodoForm from "./components/TodoForm.svelte";
  import TodoItem from "./components/TodoItem.svelte";
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

  function removeTodo(e) {
    let id = e.detail;
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

  function removeAll() {
    $todos = [];
  }

  function removeCompleted() {
    $todos = $todos.filter((e) => !e.completed);
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
  <button class="btn btn-ok" on:click={removeCompleted}>Remove Completed</button
  >
  <button class="btn btn-warning" on:click={removeAll}>Remove All</button>
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
      <TodoItem {...todo} on:remove={removeTodo} />
    </div>
  {/each}
</main>

<style>
  :global(:root) {
    --clr-green: green;
    --clr-dark-green: darkgreen;
    --clr-accent: #efefef;
    --clr-accent-dark: rgb(204, 199, 199);
  }
  :global(*) {
    margin: 0;
    box-sizing: border-box;
  }

  :global(.btn) {
    border-radius: 0.5em;
    border: 0.02em solid var(--clr-accent-dark);
  }

  :global(.btn-ok) {
    background: var(--clr-green);
    color: white;
  }

  :global(.btn-warning) {
    background: red;
    color: white;
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

  .todo + .todo {
    margin-top: 1em;
  }

  .todo:last-of-type {
    margin-bottom: 1em;
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
