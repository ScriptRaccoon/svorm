<script lang="ts">
	import Fa from "svelte-fa";
	import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
	export let show: boolean = true;
</script>

{#if show}
	<span class="asterisk danger" aria-hidden="true"
		><Fa icon={faAsterisk} scale="0.5" /></span
	>
	<span class="visually-hidden">required</span>
{/if}

<style>
	.asterisk {
		display: inline-block;
		transform: translateY(-0.2em);
	}
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		left: -10000px;
	}
</style>
