<script lang="ts">
	import { LABELS } from "@/config";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
</script>

<menu>
	<button on:click={() => dispatch("question")}>
		{LABELS.ADD_QUESTION}
	</button>

	<button on:click={() => dispatch("choice")}>
		{LABELS.ADD_MULTIPLE_CHOICE}
	</button>

	<button class="secondary" on:click={() => dispatch("create")}>
		{LABELS.CREATE_SVORM}
	</button>
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
			justify-content: center;
		}
	}
</style>
