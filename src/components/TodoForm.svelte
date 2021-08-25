<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let title = "";
  let desc = "";

  function sendTodo(e) {
    if (e !== "button" && e.code !== "Enter") return;

    if (!title) {
      return;
    }

    // Add an event to be listened to by the parent
    dispatch("submit", { title, desc });

    title = "";
    desc = "";
  }
</script>

<input
  type="text"
  bind:value={title}
  placeholder="Add a task!"
  on:keydown={sendTodo}
  class="title"
/>
<button class="submit" on:click={() => sendTodo("button")}> Ok </button>
<textarea
  type="text"
  bind:value={desc}
  placeholder="Task description"
  class="desc"
/>

<style>
  .title {
    margin-bottom: 0.25em;
    width: 30em;
    max-width: 50%;
  }

  .desc {
    margin-bottom: 0.25em;
    display: block;
    width: 30em;
    max-width: 50%;
  }

  .submit {
    display: inline-block;
    border-radius: 50%;
  }
</style>
