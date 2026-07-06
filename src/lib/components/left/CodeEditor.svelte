<script>
  import { codeEditor } from "$lib/stores/codeEditor.svelte";
</script>

<div class="computer computer-codelines">
  <div class="computer-codelines--wrapper">
    {#each codeEditor.lines as line (line.id)}
      <div class="code-line-wrapper">
    
        <div class="line-number">
          {line.number}
        </div>
    
        <div
          class="code-line"
          style:margin-left={`calc(${String(line.number).length} * 0.41 * var(--fs) + 8px + ${line.indent * 15}px)`}
        >
    
          {#each line.blocks as block}
            <div
              class="code-block"
              style:width={`${block.width}%`}
              style:background-color={block.color}
            >
            </div>
          {/each}
    
        </div>
    
      </div>
    {/each}
  </div>
</div>


<style>
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

  :global(body.evil) .line-number {
    color: #3e777d;
  }

  :global(body.matrix) .code-block, :global(body.evil) .code-block  {
    background-color: #008080 !important; 
  }
</style>