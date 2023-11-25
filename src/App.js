import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AddToList } from './Components/AddToList';
import { Anime } from './Components/Anime';
import { AnimeList } from './Components/AnimeList';
import { RemoveFromList } from './Components/RemoveFromList';
import './Components/style.css';
function App() {
	const [search, setSearch] = useState('jujutsu');
	const [animeData, setAnimeData] = useState();
	const [animeInfo, setAnimeInfo] = useState();
	const [myAnimeList, setMyAnimeList] = useState([]);
	const addTo = (anime) => {
		const index = myAnimeList.findIndex(
			(myanime) => myanime.mal_id === anime.mal_id
		);

		if (index < 0) {
			const newArray = [...myAnimeList, anime];
			setMyAnimeList(newArray);
			localStorage.setItem('myAnimeList', JSON.stringify(newArray));
		}
	};

	const removeFrom = (anime) => {
		const newArray = myAnimeList.filter(
			(myanime) => myanime.mal_id !== anime.mal_id
		);
		setMyAnimeList(newArray);
		localStorage.setItem('myAnimeList', JSON.stringify(newArray));
	};
	const getMyAnimeListFromLocalStorage = () => {
		const storedData = localStorage.getItem('myAnimeList');
		if (storedData) {
			setMyAnimeList(JSON.parse(storedData));
		}
	};
	useEffect(() => {
		getMyAnimeListFromLocalStorage();
	}, []);

	const getData = async () => {
		const res = await fetch(
			`https://api.jikan.moe/v4/anime?q=${search}&limit=20`
		);
		const resData = await res.json();
		setAnimeData(resData.data);
	};
	useEffect(() => {
		getData();
	}, [search]);

	return (
		<Router>
			<div className='header'>
				<h1>
					<Link to={'/'} className='custom-link'>
						Animio
					</Link>
				</h1>

				<div className='search-box'>
					<input
						type='search'
						placeholder='Search ... '
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>

			<Routes>
				<Route
					path='/'
					element={
						<div className='container'>
							<div className='anime-row'>
								<h2 className='text-heading'>Anime List</h2>
								<div className='row'>
									<AnimeList
										animelist={animeData}
										setAnimeInfo={setAnimeInfo}
										animeComponent={AddToList}
										handleList={(anime) => addTo(anime)}
									/>
								</div>
								<h2 className='text-heading'>My favorites</h2>
								<div className='row'>
									<AnimeList
										animelist={myAnimeList}
										setAnimeInfo={setAnimeInfo}
										animeComponent={RemoveFromList}
										handleList={(anime) =>
											removeFrom(anime)
										}
									/>
								</div>
							</div>
						</div>
					}
				/>
				<Route
					path='/anime/:id'
					element={<Anime animelist={animeData} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
