import { Fragment, useState } from "react";
import toastr from "toastr";
import { ShoppiesContext } from "./store/shoppies_context";
import SearchResults from "./search_results";
import { nominationStore } from "./store/localstore";
import MoviesNominated from "./nomination_list";

const API_URL = "http://www.omdbapi.com/?apikey=74bf9c4a";

let Shoppies = () => {
	let [searchVal, setSearchVal] = useState();
	let [searchResults, setSearchResults] = useState([]);
	let [nominations, setNominations] = useState(nominationStore());

	let search = (e) => {
		let search_query = e.target.value;

		if (search_query.trim() !== "") {
			fetch(`${API_URL}&s=${search_query}`)
				.then((res) => res.json())
				.then((movies) => {
					switch (movies.Response) {
						case "True":
							setSearchVal(search_query);
							setSearchResults(movies.Search);
							break;

						default:
							setSearchResults([]);
							break;
					}
				})
				.catch((err) =>
					toastr.error("Network offline, please check your connection")
				);
		} else {
			setSearchResults([]);
		}
	};

	return (
		<Fragment>
			<div className="app-body">
				<main className="w-75 mx-auto pt-5">
					<div className="jumbotron bg-light p-4 rounded-3">
						<h3 className="highlight-text">The Shoppies!</h3>
						<p className="lead" style={{ fontSize: "16px" }}>
							Search for your favorite movies and put them up for nomination on
							the{" "}
							<span className="highlight-text">
								Movie Awards for Entrepreneurs
							</span>
						</p>
						<input
							type="text"
							className="form-control"
							onKeyUp={(e) => search(e)}
							placeholder="Search for movie by title"
						/>
					</div>

					<div className="d-flex mt-5 gap-5 flex-wrap">
						<ShoppiesContext.Provider
							value={{
								searchVal,
								setSearchResults,
								searchResults,
								nominations,
								setNominations,
								toastr,
							}}
						>
							<SearchResults />
							<MoviesNominated />
						</ShoppiesContext.Provider>
					</div>
				</main>
			</div>
		</Fragment>
	);
};

export default Shoppies;
