<script lang="ts">
	import { goto } from "$app/navigation";
	import { HEADINGS, LABELS, ERROR } from "@/config";
	import Asterisk from "@/lib/Asterisk.svelte";
	import Error from "@/lib/Error.svelte";
	import Loader from "@/lib/Loader.svelte";
	import Required from "@/lib/Required.svelte";

	let id: number;
	let loading = false;
	let error_message = "";

	function goto_svorm() {
		if (!id) {
			error_message = ERROR.NO_ID;
			return;
		}
		error_message = "";
		loading = true;
		goto(`/results/${id}`);
	}
</script>

<h2>{HEADINGS.RESULTS}</h2>

<Required noun="Fields" />

<form on:submit|preventDefault={goto_svorm}>
	<label>
		{LABELS.SVORM_ID}<Asterisk />
		<input type="number" bind:value={id} />
	</label>

	<menu class="small-menu">
		<button>{LABELS.SUBMIT_ID}</button>
	</menu>
</form>

<Loader {loading} />

<Error {error_message} />
