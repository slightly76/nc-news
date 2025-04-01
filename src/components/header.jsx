import React from 'react';
import ncnLogo from '../assets/ncnewslogo.png';
import userAvatar from '../assets/icons/icon-avatar.svg';
import './header.css';

const activePage = 'dummy page';

function Header() {
	
	return (
	<header className="header">
		<div className="top-container">
			<a href="" target="_blank">
          		<img src={ncnLogo} className="logo" alt="NC News logo" />
        	</a>
			<div className="text-container">
				<p className="headline">NC News</p>
				<p className="tagline">push someone's buttons today!</p>
			</div>
		</div>
		

		<div className="bottom-container">
			<p className="activePage">{activePage}</p>
			<img src={userAvatar} className="user" alt="user avatar" />
		</div>
	
	</header>
	);
}

export default Header;
