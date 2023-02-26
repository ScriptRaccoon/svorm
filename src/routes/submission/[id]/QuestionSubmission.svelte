<script lang="ts">
	export let element: questionSubmission;
</script>

<h3>
	{element.question}{#if element.required}
		<sup aria-hidden="true" aria-describedby="required">*</sup>
	{/if}
</h3>

<p>
	<label for="answer + {element.id}">Answer</label>
	<input
		type="text"
		id="answer + {element.id}"
		bind:value={element.answer}
	/>
</p>

<style>
	sup {
		color: var(--danger-color);
	}
</style>
