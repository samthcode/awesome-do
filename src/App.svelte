<script>
  import { v4 as uuidGeneratorV4 } from "uuid";
  import TodoForm from "./components/TodoForm.svelte";
  import TodoItem from "./components/TodoItem.svelte";
  import Header from "./components/Header.svelte";
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

  function getTodoByID(id) {
    let todo = $todos.filter((i) => i.id === editingID)[0];
    return todo ? todo : null;
  }

  function idOrError(id) {
    let todo = getTodoByID(id);
    if (!todo) {
      console.error(`Error - idOrError(): Could not find todo with id ${id}`);
    }
    return todo;
  }

  let editing = false;
  let editingID;
  let editingOriginalTitle = null;
  let editingOriginalDesc = null;

  function resetEditing() {
    editing = false;
    editingID = null;
    editingOriginalTitle = null;
    editingOriginalDesc = null;
  }

  function startEdit(e) {
    editing = true;
    // ({ id, title, description } = e.detail);
    editingID = e.detail.id;
    editingOriginalTitle = e.detail.title;
    editingOriginalDesc = e.detail.description;
  }

  function editTodo(e) {
    let { title, desc } = e.detail;
    // console.log(`title: ${title} desc: ${desc}`);
    if (!editing || !editingID) return;

    let todo = idOrError(editingID);
    if (!todo) return;

    if (title) {
      todo.title = title;
    } else {
      todo.title = "New Todo";
    }
    todo.description = desc;

    $todos = $todos;

    resetEditing();
  }

  function removeTodo(e) {
    let id = e.detail;
    let index = $todos.indexOf($todos.find((e) => e.id === id));
    if (index > -1) {
      $todos.splice(index, 1);
      $todos = $todos;
      if (id === editingID) {
        resetEditing();
      }
    } else {
      console.error(`Error - removeTodo(): Could not find todo with id ${id}`);
    }
  }

  function addTodo({ title, desc }) {
    if (!title && !desc) {
      return;
    }

    let newTodo = {
      id: uuidGeneratorV4(),
      completed: false,
      title: title ? title : "New Todo",
      description: desc,
    };
    $todos = [...$todos, newTodo];
  }

  function removeAll() {
    $todos = [];
    resetEditing();
  }

  function removeCompleted() {
    if ($todos.filter((e) => e.completed).some((i) => i.id === editingID)) {
      resetEditing();
    }
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
</script>

<svelte:head>
  <title>AwesomeDo</title>
</svelte:head>

<Header />
<div class="options">
  {#if editing}
    <TodoForm
      on:submit={editTodo}
      prompt="Edit your todo..."
      descPrompt="Edit your description..."
      title={editingOriginalTitle}
      desc={editingOriginalDesc}
    />
  {:else}
    <TodoForm on:submit={(e) => addTodo(e.detail)} />
  {/if}
  Filter todos by:
  <select class="filter-todos" bind:value={filterValue}>
    <option value="all">All</option>
    <option value="todo">To Do</option>
    <option value="completed">Completed</option>
  </select>
  <button class="btn btn-ok" on:click={removeCompleted}>Remove Completed</button
  >
  <button class="btn btn-warning rm-all" on:click={removeAll}>Remove All</button
  >
</div>
<main>
  {#if $todos.length === 0 || $todos.every((e) => e.completed)}
    <div class="congrats">
      <h2 class="congrats__title">
        Well done! You have completed every Todo for today!
      </h2>
      <div class="little">
        Why not go for a walk, or simply relax in front of the telly.
      </div>
    </div>
  {/if}
  {#if todosToShow.length === 0}
    <span class="little">
      There are currently no tasks in this filter group. Try switching to
      another to see your tasks!
    </span>
  {/if}
  {#each todosToShow as todo}
    <div class="todo">
      <TodoItem {...todo} on:remove={removeTodo} on:edit={startEdit} />
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

  :global(span.green) {
    color: var(--clr-green);
  }

  :global(span.dark-green) {
    color: var(--clr-dark-green);
  }

  main {
    padding-inline: 2em;
    padding-bottom: 1em;
  }

  .filter-todos {
    margin-bottom: 1em;
    margin-top: 1em;
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

  .rm-all {
    margin-bottom: 1em;
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

  .little {
    font-size: 15px;
    font-style: italic;
  }
</style>
