<script>
	import { TEXT } from "@/config";
</script>

<nav>
	<ul>
		<li>
			<a href="/">{TEXT.HOME}</a>
		</li>
		<li>
			<a href="/create">{TEXT.CREATE_SVORM}</a>
		</li>
		<li>
			<a href="/answer">{TEXT.ANSWER_SVORM}</a>
		</li>
	</ul>
</nav>

<style lang="scss">
	nav {
		padding: 0.75rem;
		background-color: var(--primary-color);
		color: white;
		font-size: 1rem;
	}
	ul {
		margin: 0 auto;
		display: flex;
		justify-content: center;
		list-style-type: none;
		gap: 1.2rem;
	}
	a {
		text-underline-offset: 0.2em;
	}
</style>
