<script lang="ts">
	import { goto } from "$app/navigation";
	import { ERROR, HEADINGS, LABELS } from "@/config";
	import Asterisk from "@/lib/Asterisk.svelte";
	import Error from "@/lib/Error.svelte";
	import Loader from "@/lib/Loader.svelte";
	import Required from "@/lib/Required.svelte";
	import { onMount } from "svelte";

	let id: number;
	let input: HTMLElement;
	let loading = false;
	let error_message = "";

	function goto_svorm() {
		if (!id) {
			error_message = ERROR.NO_ID;
			return;
		}
		error_message = "";
		loading = true;
		goto(`/answer/${id}`);
	}

	onMount(() => {
		input?.focus();
	});
</script>

<h2>{HEADINGS.ANSWER}</h2>

<Required noun="Fields" />

<form on:submit|preventDefault={goto_svorm}>
	<label>
		{LABELS.SVORM_ID}<Asterisk />
		<input type="number" bind:value={id} bind:this={input} />
	</label>

	<menu class="small-menu">
		<button>{LABELS.SUBMIT_ID}</button>
	</menu>
</form>

<Loader {loading} />

<Error {error_message} />
