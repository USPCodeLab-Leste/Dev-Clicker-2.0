<script>
  import Computer from '$lib/components/left/Computer.svelte';
  import Header from '$lib/components/left/Header.svelte';
  import Table from '$lib/components/Table.svelte';
</script>

<div class="container-left">
  <Header />
  <Computer />
  <Table />
</div>

<style>
  .container-left {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;

    @media (max-width: 800px) {
      margin-top: 7rem;
    }
  }
</style>