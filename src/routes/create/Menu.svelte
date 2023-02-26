<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
</script>

<menu>
	<button on:click={() => dispatch("question")}>Add question</button>
	<button on:click={() => dispatch("choice")}>Add choice</button>
	<button on:click={() => dispatch("finish")}>Finish svorm</button>
</menu>

<style lang="scss">
	menu {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 0.5rem;
		padding-block: 1rem;
		@media (min-width: 30rem) {
			flex-direction: row;
			& :last-child {
				margin-left: auto;
			}
		}
	}
</style>
