<script>
  export let href = "";
  export let title = undefined;
  export let text = "";
</script>

<img src={href} {title} alt={text} />

<style>
  img {
    max-width: min(20em, 100%);
  }
</style>
