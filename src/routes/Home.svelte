<script>
	import { HEADINGS, TEXT } from "@/config";
</script>

<h1>{HEADINGS.TITLE}</h1>

<p class="teaser">
	{TEXT.TEASER}
</p>

<p>
	{@html TEXT.DESCRIPTION}
</p>

<p>
	{TEXT.DELETE_NOTICE}
</p>

<p>{@html TEXT.GITHUB}</p>

<style>
	p {
		margin-bottom: 0.75rem;
	}
	.teaser {
		text-align: center;
		font-style: italic;
		font-size: 1.25rem;
		color: var(--primary-color);
	}
</style>
