<script lang="ts">
	export let element: question_submission;
	export let index: number;
</script>

<h3>
	{element.question}{#if element.required}
		<sup aria-hidden="true" aria-describedby="required">*</sup>
	{/if}
</h3>

<p>
	<label for="answer{index}">Answer</label>
	<input type="text" id="answer{index}" bind:value={element.answer} />
</p>

<style>
	sup {
		color: var(--danger-color);
	}
</style>
