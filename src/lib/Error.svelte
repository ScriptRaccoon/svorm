<script>
	import { scroll_to_bottom } from "@/utils";
	import { tick } from "svelte";

	export let error_message = "";
	$: if (error_message) {
		tick().then(scroll_to_bottom);
	}
</script>

{#if error_message}
	<p class="error">
		{error_message}
	</p>
{/if}

<style>
	.error {
		color: var(--danger-color);
		font-weight: bold;
		padding-block: 1rem;
	}
</style>
