<script lang="ts">
	export let element: multiple_choice_db;
	export let answer: number;
</script>

<h3>
	{element.question}{#if element.required}
		<sup aria-hidden="true" aria-describedby="required">*</sup>
	{/if}
</h3>

<div class="choices">
	{#each element.choices as choice, index}
		<label>
			<input type="radio" value={index} bind:group={answer} />
			<span>{choice}</span>
		</label>
	{/each}
</div>

<style>
	.choices {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	sup {
		color: var(--danger-color);
	}
</style>
