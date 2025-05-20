<script>
	import '@fontsource-variable/inter';
	let { children } = $props();
</script>

<nav>
	<a href="/">Fontsource</a>
	<a href="/local">Local fonts</a>
</nav>

{@render children()}