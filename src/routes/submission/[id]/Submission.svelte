<script lang="ts">
	import ElementSubmission from "./ElementSubmission.svelte";

	export let svorm: svorm;

	let svormSubmission: svormSubmission = {
		id: svorm.id,
		title: svorm.title,
		elements: svorm.elements.map((element) => ({ ...element, answer: null }))
	};
</script>

<h2>
	{svormSubmission.title}
</h2>

<form action="/submit" method="POST">
	<ul class="elements">
		{#each svormSubmission.elements as element}
			<li>
				<ElementSubmission bind:element />
			</li>
		{/each}
	</ul>

	<p id="required">
		<sup aria-hidden="true">*</sup>required
	</p>

	<menu>
		<button type="submit">Submit</button>
	</menu>
</form>

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
