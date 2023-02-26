<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
</script>

<menu>
	<button on:click={() => dispatch("question")}>
		Add simple question
	</button>
	<button on:click={() => dispatch("choice")}>
		Add multiple choice question
	</button>
	<button on:click={() => dispatch("finish")}>Finish svorm</button>
</menu>

<style lang="scss">
	menu {
		display: flex;
		gap: 0.5rem;
		padding-block: 1rem;
		flex-direction: column;

		@media (min-width: 32rem) {
			flex-direction: row;
			flex-wrap: wrap;
		}
	}
</style>
