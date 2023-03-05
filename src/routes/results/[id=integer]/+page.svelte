<script lang="ts">
	import type { PageData } from "./$types";
	import Results from "./Results.svelte";
	export let data: PageData;
</script>

<Results {...data} />
