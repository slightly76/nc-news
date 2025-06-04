import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
	return (
		<footer className='footer'>
			<nav className='footer-nav'>
				<p className='footer-heading'>Jump To</p>
				<Link to='/' className='footerButton'>
					Articles
				</Link>
				<Link to='/topics' className='footerButton'>
					Topics
				</Link>
			</nav>
			<p className='footerSlug'>Copyright 2025 Chris Askew</p>
		</footer>
	);
}

export default Footer;
