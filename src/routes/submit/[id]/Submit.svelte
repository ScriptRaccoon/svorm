<script lang="ts">
	import MultipleChoiceSubmit from "./MultipleChoiceSubmit.svelte";
	import QuestionSubmit from "./QuestionSubmit.svelte";

	export let svorm: svorm_db;
	export let elements: element_db[];
	let submission: (string | number)[] = elements.map((e) =>
		"choices" in e ? 0 : ""
	);

	async function submit() {
		const response = await fetch("/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ elements, submission })
		});
		const data = await response.json();
		console.log(data);
	}
</script>

<h2>
	{svorm.title}
</h2>

<ul class="elements">
	{#each elements as element, index}
		<li>
			<div class="element">
				{#if "choices" in element}
					<MultipleChoiceSubmit
						bind:element
						bind:answer={submission[index]}
					/>
				{:else}
					<QuestionSubmit
						bind:element
						bind:answer={submission[index]}
					/>
				{/if}
			</div>
		</li>
	{/each}
</ul>

<p id="required">
	<sup aria-hidden="true">*</sup>required
</p>

<menu>
	<button on:click={submit}>Submit</button>
</menu>

<style>
	.elements {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block: 1rem;
	}

	.element {
		background-color: var(--light-color);
		padding: 1rem;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	sup {
		color: var(--danger-color);
	}

	menu {
		padding-block: 1rem;
		text-align: center;
	}
</style>
