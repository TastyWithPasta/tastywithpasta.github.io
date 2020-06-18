<script>
	import { Route, Router } from "svelte-routing";
	import Header from './common/Header.svelte';
	import Menu from './common/Menu.svelte';
	import Article from './common/Article.svelte';
	import Footer from './common/Footer.svelte';
</script>

<div class="container debug-border">
	<Header/>
	<Menu/>
	<Article/>
	<Footer/>
</div>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	/* Larger than mobile screen */
	@media (min-width: 40.0rem) {

	}

	/* Larger than tablet screen */
	@media (min-width: 80.0rem) {
		
	}

	/* Larger than desktop screen */
	@media (min-width: 120.0rem) {
		
	}
</style>