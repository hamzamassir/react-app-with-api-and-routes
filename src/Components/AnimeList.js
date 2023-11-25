import React from 'react';
import { useNavigate } from 'react-router-dom';
export const AnimeList = ({
	animelist,
	setAnimeInfo,
	animeComponent,
	handleList
}) => {
	const AddToList = animeComponent;
	const navigate = useNavigate();
	const handleClick = (anime) => {
		navigate(`/anime/${anime.mal_id}`, { state: { anime } });
	};

	return (
		<>
			{animelist
				? animelist.map((anime, index) => {
						return (
							<div
								className='card'
								key={index}
								onClick={() => handleClick(anime)}
							>
								<img
									src={anime.images.jpg.large_image_url}
									alt='animeImage'
								/>
								<div className='anime-info'>
									<h4>{anime.title}</h4>
									<div
										className='overlay'
										onClick={(e) => {
											// Stop the click event propagation when the overlay is clicked
											e.stopPropagation();
											handleList(anime);
										}}
									>
										<h4>{anime.year}</h4>
										<AddToList />
									</div>
								</div>
							</div>
						);
				  })
				: 'Not Found'}
		</>
	);
};
