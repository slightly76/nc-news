import react from 'react';
import ncnLogo from '../assets/ncnewslogo.png';

const activePage = 'dummy';

function Header() {
	console.log('header was here');
	return (
		<header>
			 <a href="" target="_blank">
          <img src={ncnLogo} className="logo" alt="NC News logo" />
        </a>
		<p>banana</p>
		</header>
	);
}

export default Header;
