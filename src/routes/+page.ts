import type { PageLoad } from './$types';

const baseUrl = 'https://svelte-course-21f19-default-rtdb.firebaseio.com/';

export const load = (async ({ fetch }) => {
	const res = await fetch(`${baseUrl}/hobbies.json`);
	const hobbies = await res.json();

	return {
		hobbies
	};
}) satisfies PageLoad;
