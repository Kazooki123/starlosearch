<script>
  import { onMount } from "svelte";
  
  export let error;
  
  onMount(() => {
    console.log(error);
  });
  </script>
  
  <div>
    <h1>Error</h1>
    <p>{error}</p>
  </div>