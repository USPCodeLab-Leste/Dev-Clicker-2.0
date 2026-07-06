<script>
  import StructureCard from "./StructureCard.svelte";

  import { estruturas } from "$lib/data/estruturas";
  import { gameState } from "$lib/game/state/gameState.svelte";

  const visibleStructures = $derived.by(() => {
    const unlocked = Object.values(gameState.estruturas).filter(e => e.unlocked).length;

    return estruturas.slice(0, Math.min(unlocked + 2, estruturas.length));
  });

</script>

{#each visibleStructures as estrutura (estrutura.id)}
  <StructureCard
    {estrutura}
  />
{/each}