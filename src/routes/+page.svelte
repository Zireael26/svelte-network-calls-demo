<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const baseUrl = 'https://svelte-course-21f19-default-rtdb.firebaseio.com/';
	interface Hobby {
		id: string;
		name: string;
	}

	let hobbies: Array<Hobby> = [];
	let currentHobby = '';
	let isLoading = false;

	export let data: PageData;

	onMount(async () => {
		isLoading = true;
		let existingHobbies = [];
		for (const hobby in data.hobbies) {
			existingHobbies.push({ id: hobby, name: data.hobbies[hobby] });
		}
		hobbies = [...existingHobbies];
		isLoading = false;
	});

	function addHobby() {
		isLoading = true;
		const tempHobbyId = Math.random().toString();
		fetch(`${baseUrl}/hobbies.json`, {
			method: 'POST',
			body: JSON.stringify(currentHobby),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((resData) => {
				const idxToFix = hobbies.findIndex((hobby) => hobby.id === tempHobbyId);
				hobbies[idxToFix].id = resData.name;
				console.log(hobbies);
			});
		hobbies = [{ id: tempHobbyId, name: currentHobby }, ...hobbies];
		currentHobby = '';
		isLoading = false;
	}
</script>

<label for="hobby">Hobby</label>
<input type="text" id="hobby" bind:value={currentHobby} />
<button on:click={addHobby}>Add Hobby</button>

{#if isLoading}
	<p>Loading...</p>
{:else}
	<ul>
		{#each hobbies as hobby (hobby.id)}
			<li transition:fade animate:flip={{ duration: 500 }}>{hobby.name}</li>
		{/each}
	</ul>
{/if}
