<script>
  import { todos } from "../stores";
  import { createEventDispatcher } from "svelte";
  export let id;
  export let completed;
  export let title;
  export let description;

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch("remove", id);
  }
</script>

<div class="todo">
  <div class="border-left" />
  <input
    type="checkbox"
    class="checkbox"
    bind:checked={completed}
    on:change={(e) => {
      $todos.filter((val) => val.id === id)[0].completed = e.target.checked;
      $todos = $todos;
    }}
  />
  <span class="title" class:completed>{title}</span>
  <button on:click={remove} class="remove">X</button>

  <div class:completed class="description">
    {#if description}
      {description}
    {/if}
  </div>
</div>

<style>
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

  .completed {
    text-decoration: line-through;
    font-style: italic;
    opacity: 0.7;
  }

  .title {
    grid-area: title;
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break: break-all;
    font-weight: bold;
  }

  .border-left {
    grid-area: left-border;
    width: 0.1em;
    border-radius: 2px;
    background-color: green;
  }

  .checkbox {
    grid-area: checkbox;
    max-width: 2em;
    margin: auto 0;
  }

  .checkbox:hover {
    cursor: pointer;
  }

  .description {
    grid-area: description;
    font-size: 0.85rem;
    /* margin-left: 1em; */
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .remove {
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
</style>
