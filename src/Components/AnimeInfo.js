import React from 'react';

export const AnimeInfo = (props) => {
	const {
		title,
		images: {
			jpg: { large_image_url }
		},
		rank,
		score,
		synopsis,
		rating
	} = props.animeInfo;
	return (
		<>
			<div className='anime-content'>
				<h3>{title}</h3>
				<br />
				<img src={large_image_url} alt='' />
				<br />
				<br />
				<div className='info'>
					<h3>
						Rank: <span style={{ color: 'gold' }}>#</span>
						<span>{rank}</span>
					</h3>
					<h3>
						Score: <span>{score} / 10</span>
					</h3>
					<h3>
						Rating : <span>{rating}</span>
					</h3>
					<br />
					<h3>SYNOPSIS : </h3>
					<br />
					<div className='synopsis'>
						<p>{synopsis}</p>
					</div>
				</div>
			</div>
		</>
	);
};
