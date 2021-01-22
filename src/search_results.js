import { Fragment, useContext } from "react";
import swal from "sweetalert";
import { nominationStore, saveNomination } from "./store/localstore";
import { ShoppiesContext } from "./store/shoppies_context";

const SearchResults = () => {
	let {
		searchResults,
		setSearchResults,
		searchVal,
		nominations,
		setNominations,
		toastr,
	} = useContext(ShoppiesContext);

	let nominate_movie = (e) => {
		let existing_nominations = nominationStore();
		if (nominations.length < 5) {
			existing_nominations.push(e);
			saveNomination(existing_nominations);
			setNominations(nominations.concat(e));
			toastr.success(`<b>${e.Title}</b> has been added to nominated movies `);
			setSearchResults(searchResults.map((movies) => movies));
			if (nominations.length + 1 === 5) {
				swal({
					text: "You've reached the maximum number of nominations allowed",
					icon: "success",
					className: "text-right",
				});
			}
		}
		if (nominations.length === 5) {
			swal({
				text: "Nomination limit reached, you cannot nominate any more movies",
				icon: "warning",
				className: "text-right",
			});
		}
	};

	let nomination_list = nominationStore();

	return (
		<Fragment>
			{searchResults.length > 0 ? (
				<section className="col">
					<div className="card">
						<div className="card-header">
							<h6 className="card-title m-0 py-2">
								Search results for&nbsp;
								<span className="text-capitalize highlight-text">
									{searchVal}
								</span>
							</h6>
						</div>
						<ul
							className="list-group rounded-0"
							style={{ maxHeight: "300px", overflowY: "scroll" }}
						>
							{searchResults.map((movie, key) => {
								movie.is_nominated = false;
								if (nomination_list.length) {
									nomination_list.forEach((m) => {
										if (m.imdbID === movie.imdbID) {
											return (movie.is_nominated = true);
										}
									});
								}
								return (
									<li
										className="list-group-item d-flex justify-content-between align-items-center py-0"
										key={key}
									>
										<div className="d-flex align-items-center">
											<img src={movie.Poster} alt="" height="70" width="70" />
											<p className="p-3 align-self-center mt-3">
												<span className="highlight-text">{movie.Title}</span> <br />
												<small>{movie.Year}</small>
											</p>
										</div>
										{movie.is_nominated ? (
											<span className="badge bg-success border-0" disabled>
												Nominated
											</span>
										) : (
											<span
												className="badge badge-nominate-color pointer"
												onClick={() => nominate_movie(movie)}
											>
												Nominate
											</span>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				</section>
			) : null}
		</Fragment>
	);
};

export default SearchResults;
