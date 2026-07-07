<script>
	import favicon from '$lib/assets/pc.ico';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>DevClicker</title>
</svelte:head>

{@render children()}
