<script lang="ts">
	import type { PageData } from "./$types";
	import Answers from "./Answers.svelte";
	export let data: PageData;
</script>

<Answers {...data} />
