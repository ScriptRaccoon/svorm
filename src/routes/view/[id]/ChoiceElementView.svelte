<script lang="ts">
	export let element: choiceElementView;
</script>

<h3>
	{element.prompt}{#if element.required}
		<sup aria-hidden="true" aria-describedby="required">*</sup>
	{/if}
</h3>

<div class="choices">
	{#each element.choices as choice, index}
		<label>
			<input type="radio" name={element.id} value={index} bind:group={element.answer} />
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
