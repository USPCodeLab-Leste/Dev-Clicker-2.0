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

  /* SALSICHINHAS */
  .computer-codelines {
    position: relative;
    pointer-events: none;
    top: 10.7%;
    max-width: 270px;
    width: 63%;
    height: 41.2%;
  }

  .computer-codelines--wrapper {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(30, 1fr);
    gap: 2px;
  }

  .code-line-wrapper {
    --fs: .2em;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 5px;
  }

  .code-line {
    height: 100%;
    flex: 1;
    display: flex;
    gap: 2px;
    margin-left: 0;
  }

  .line-number {
    position: absolute;
    margin-left: 2px;
    font-family: monospace;
    font-size: var(--fs);
    color: var(--c2);
  }

  .code-block {
    /* height: calc(var(--fs)/2); */
    border-radius: 3px;
    transition: width 0.3s;
  }

  body.evil .line-number {
    color: #3e777d;
  }

  body.matrix .code-block, body.evil .code-block  {
    background-color: #008080 !important; 
  }
</style>