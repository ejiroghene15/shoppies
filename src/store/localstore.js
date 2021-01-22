// create store if doesn't exist

export const NOMINATION_LIST_STORE = "nominations_list";

if (localStorage.getItem(NOMINATION_LIST_STORE) == null) {
	localStorage.setItem(NOMINATION_LIST_STORE, JSON.stringify([]));
}

export const nominationStore = () =>
	JSON.parse(localStorage.getItem(NOMINATION_LIST_STORE));

export const saveNomination = (movie) =>
	localStorage.setItem(NOMINATION_LIST_STORE, JSON.stringify(movie));
