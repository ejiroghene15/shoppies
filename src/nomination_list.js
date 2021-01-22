import { Fragment, useContext } from "react";
import { saveNomination } from "./store/localstore";
import { ShoppiesContext } from "./store/shoppies_context";

const MoviesNominated = () => {
	let { nominations, setNominations, toastr } = useContext(ShoppiesContext);

	let remove_nomitation = (movie) => {
		let new_list = nominations.filter((m) => m.imdbID !== movie.imdbID);
		saveNomination(new_list);
		setNominations(new_list);
		toastr.info(
			`<b>${movie.Title}</b> has been removed from your nominated movies `
		);
	};

	return (
		<Fragment>
			{nominations.length > 0 ? (
				<section className="col mb-5">
					<div className="card">
						<div className="card-header">
							<h6 className="card-title m-0 py-2">
								<span className="text-capitalize">
									<span className="pe-2">Movies Nomitated</span>
									<span className="badge badge-nominate-color d-inline movie-count">
										{nominations.length}
									</span>
								</span>
							</h6>
						</div>
						<ul
							className="list-group rounded-0"
							style={{ maxHeight: "300px", overflowY: "auto" }}
						>
							{nominations.map((movie, key) => (
								<li
									className="list-group-item d-flex justify-content-between align-items-center py-0"
									key={key}
								>
									<div className="d-flex align-items-center">
										<img src={movie.Poster} alt="" height="70" width="70" />
										<p className="p-3 align-self-center mt-3">
											<span className="highlight-text">{movie.Title}</span>{" "}
											<br />
											<small>{movie.Year}</small>
										</p>
									</div>

									<span
										className="badge badge-nominate-color pointer"
										onClick={() => remove_nomitation(movie)}
									>
										<i class="bx bx-trash icon"></i>
									</span>
								</li>
							))}
						</ul>
					</div>
				</section>
			) : null}
		</Fragment>
	);
};

export default MoviesNominated;
