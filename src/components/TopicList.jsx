import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePageTitle } from './PageTitleContext';
import './topicsList.css';

function TopicList() {
	const [listTopics, setListTopics] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { setPageTitle } = usePageTitle();

	useEffect(() => {
		setIsLoading(true);
		setPageTitle('Topics');

		axios
			.get('https://slightly76-does-nc-news.onrender.com/api/topics')

			.then((topicsResult) => {
				setListTopics(topicsResult.data.topics);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, [setPageTitle]);

	if (isLoading) return <p className='message'>Please wait, loading...</p>;

	return (
		<>
			<div className='topicListContainer'>
				<div className='topicList'>
					{listTopics.map((topic) => {
						return (
							<div className='topicListCard' key={topic.slug}>
								<Link to={`/topics/${topic.slug}`} className='topicListTitle'>
									{topic.slug}
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default TopicList;
