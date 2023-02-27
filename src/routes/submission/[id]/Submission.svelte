<script lang="ts">
	import ElementSubmission from "./ElementSubmission.svelte";

	export let svorm: svorm;

	let submission: svorm_submission = {
		id: svorm.id,
		title: svorm.title,
		elements: svorm.elements.map((element) => ({
			...element,
			answer: null
		}))
	};

	async function submit() {
		const response = await fetch("/submission", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(submission)
		});
		const data = await response.json();
		console.log(data);
	}
</script>

<h2>
	{submission.title}
</h2>

<ul class="elements">
	{#each submission.elements as element}
		<li>
			<ElementSubmission bind:element />
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

	sup {
		color: var(--danger-color);
	}

	menu {
		padding-block: 1rem;
		text-align: center;
	}
</style>
