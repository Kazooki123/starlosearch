<!-- ErrorDisplay.svelte -->

<script>
    export let message;
  </script>
  
  <style>
    .error {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  </style>
  
  <main>
    {#if message}
      <div class="error">{message}</div>
    {/if}
  </main>
  