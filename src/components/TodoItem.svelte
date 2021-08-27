<script>
  import SvelteMarkdown from "svelte-markdown";
  import TextMdRenderer from "./TextMDRenderer.svelte";
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

  function edit() {
    dispatch("edit", { id, title, description });
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
  <span class="title wrappable" class:completed>{title}</span>
  <button on:click={remove} class="remove btn-warning">X</button>
  <button class="btn edit" on:click={edit}>Edit</button>

  <div class:completed class="description wrappable">
    {#if description}
      <SvelteMarkdown
        source={description.trim()}
        renderers={{ html: TextMdRenderer }}
      />
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
    grid-template-columns: min-content 1em auto 2.5em 2.5em;
    grid-template-rows: auto auto;
    grid-template-areas:
      "left-border checkbox title edit remove"
      "left-border . description description .";
    grid-gap: 0.75em;
  }

  .edit {
    grid-area: edit;
    margin: auto 0;
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
    max-height: 2em;
    margin: auto auto;
  }

  .checkbox:hover {
    cursor: pointer;
  }

  .description {
    grid-area: description;
    font-size: 0.85rem;
    /* margin-left: 1em; */
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
    max-width: 2em;
    width: 2em;
    margin: auto auto;
    border-radius: 50%;
  }

  .wrappable {
    /* CREDIT https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/ */

    /* These are technically the same, but use both */
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;

    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }
</style>
