<script lang="ts">
	export let element: question_db;
	export let answer: string | number;
</script>

<h3>
	{element.question}{#if element.required}
		<sup aria-hidden="true" aria-describedby="required">*</sup>
	{/if}
</h3>

<p>
	<label for="answer{element.id}">Answer</label>
	<input type="text" id="answer{element.id}" bind:value={answer} />
</p>

<style>
	sup {
		color: var(--danger-color);
	}
</style>
