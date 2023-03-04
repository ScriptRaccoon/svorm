<script>
	import { HEADINGS, TEXT } from "@/config";
</script>

<h1>{HEADINGS.TITLE}</h1>

<p>
	{TEXT.DESCRIPTION}
</p>

<p>
	{TEXT.DELETE_NOTICE}
</p>

<p>{@html TEXT.GITHUB}</p>

<style>
	p {
		margin-bottom: 0.75rem;
	}
</style>
