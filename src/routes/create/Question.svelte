<script lang="ts">
	export let element: question_create;
	export let index: number;
</script>

<p>
	<label for="question{index}"> Question </label>
	<input
		type="text"
		id="question{index}"
		bind:value={element.question}
	/>
</p>
