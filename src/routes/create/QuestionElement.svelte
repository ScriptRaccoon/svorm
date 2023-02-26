<script lang="ts">
	export let data: questionElement;
</script>

<p>
	<label for="question + {data.id}"> Question </label>
	<input type="text" id="question + {data.id}" bind:value={data.question} />
</p>
