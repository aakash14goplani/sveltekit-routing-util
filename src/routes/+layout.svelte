<script lang="ts">
	import { goto } from '$app/navigation';
	import { route } from '$lib/routing-utils';

	function navigateTo(url: string) {
		/* route(url, {
			params: { slug: value },
			query: { urlSearchParam: value }
		}); */
		goto(url);
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="app">
	<header>
		<nav>
			<input type="checkbox" id="check" />
			<label for="check" class="checkbtn">
				<i class="fas fa-bars"></i>
			</label>
			<label class="logo">Routing</label>
			<ul>
				<li><a class="active" on:click={() => navigateTo('/page-a')}>Page A</a></li>
				<li><a on:click={() => navigateTo('/page-a/page-aa')}>Page AA</a></li>
				<li><a on:click={() => navigateTo('/page-a/page-aa/1234')}>Page A with slugs</a></li>
				<li><a on:click={() => navigateTo('/page-b')}>Page B</a></li>
				<li><a on:click={() => navigateTo('/page-c')}>Page C</a></li>
				<li><a on:click={() => navigateTo('/page-c/abc/pqr')}>Page C with slugs</a></li>
			</ul>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<footer></footer>
</div>

<style lang="scss">
	nav {
		background-color: green;
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
	}

	.logo {
		font-size: 1.5rem;
	}

	ul {
		display: flex;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	ul li {
		margin-right: 20px;
	}

	ul li a {
		color: white;
		text-decoration: none;
		transition: color 0.3s;
    cursor: pointer;
	}

	ul li a:hover {
		color: lightgreen;
	}

	.checkbtn {
		font-size: 30px;
		color: white;
		cursor: pointer;
		display: none;
	}

	#check {
		display: none;
	}

	@media (max-width: 768px) {
		.checkbtn {
			display: block;
			order: 1;
			margin-right: 20px;
		}

		ul {
			position: fixed;
			top: 80px;
			right: -100%;
			background-color: green;
			width: 100%;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			transition: all 0.3s;
		}

		ul li {
			margin: 20px 0;
		}

		ul li a {
			font-size: 20px;
      cursor: pointer;
		}

		#check:checked ~ ul {
			right: 0;
		}
	}
</style>
