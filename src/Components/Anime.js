import React from 'react';
import { useLocation } from 'react-router-dom';

export const Anime = () => {
	const location = useLocation();
	const { anime } = location.state || {};

	return (
		<div className='anime-details-container'>
			<div className='anime-image'>
				{anime && (
					<img
						src={anime.images.jpg.large_image_url}
						alt='animeImage'
					/>
				)}
			</div>
			<div className='anime-details'>
				{anime ? (
					<div className='info'>
						<h3>
							Rank: <span style={{ color: 'gold' }}>#</span>
							<span>{anime.rank}</span>
						</h3>
						<br />
						<h3>
							Score: <span>{anime.score} / 10</span>
						</h3>
						<br />
						<h3>
							Rating : <span>{anime.rating}</span>
						</h3>
						<br />
						<br />
						<h3>SYNOPSIS : </h3>
						<br />
						<div className='synopsis'>
							<p>{anime.synopsis}</p>
						</div>
					</div>
				) : (
					<p>No information available for this anime.</p>
				)}
			</div>
		</div>
	);
};
