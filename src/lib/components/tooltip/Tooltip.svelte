<script>
  import TooltipContent from './TooltipContent.svelte';
  import { tooltip } from '$lib/stores/tooltip.svelte.js';
</script>

{#if tooltip.visible}
  <TooltipContent
    item={tooltip.item}
    anchor={tooltip.anchor}
  />
{/if}