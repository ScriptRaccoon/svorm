<script lang="ts">
	export let element: questionElement;
</script>

<p>
	<label for="question + {element.id}"> Question </label>
	<input type="text" id="question + {element.id}" bind:value={element.question} />
</p>
