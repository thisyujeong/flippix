<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="header">
	<div class="header-id">
		<h1>Digital Flip Clock</h1>
		<p>ⓒ thisyujeong</p>
	</div>

	<ThemeToggle />
</header>

<style lang="scss" scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		text-align: center;
		padding: 24px 0;
	}

	.header-id {
		h1 {
			margin: 0;
			font-weight: 500;
			font-size: 20px;
		}
		p {
			margin-top: 0.4em;
			font-size: 14px;
			opacity: 0.75;
		}
	}
</style>
