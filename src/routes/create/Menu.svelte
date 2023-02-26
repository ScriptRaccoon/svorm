<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
</script>

<menu>
	<button on:click={() => dispatch("question")}>Add a question</button>
	<button on:click={() => dispatch("choice")}>Add a choice</button>
	<button on:click={() => dispatch("finish")}>Finish svorm</button>
</menu>
