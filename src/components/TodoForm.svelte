<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let prompt = "Add a task!";
  export let descPrompt = "Task description";
  export let title = "";
  export let desc = "";

  function sendTodo(e) {
    if (e !== "button" && e.code !== "Enter") return;

    // Add an event to be listened to by the parent
    dispatch("submit", { title, desc });

    title = "";
    desc = "";
  }
</script>

<input
  type="text"
  bind:value={title}
  placeholder={prompt}
  on:keydown={sendTodo}
  class="title"
/>
<button class="btn submit" on:click={() => sendTodo("button")}> Ok </button>
<textarea type="text" bind:value={desc} placeholder={descPrompt} class="desc" />

<style>
  .title {
    margin-bottom: 0.25em;
    width: 30em;
    max-width: 75%;
  }

  .desc {
    margin-bottom: 0.25em;
    display: block;
    width: 30em;
    max-width: 75%;
  }

  .submit {
    display: inline-block;
    border-radius: 50%;
  }
</style>
