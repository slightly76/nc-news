import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
	return (
		<footer className='footer'>
			<nav className='footer-nav'>
				<p className='footer-heading'>Navigate</p>
				<div className='bottom-row'>
					<Link to='/' className='footerButton'>
						Articles
					</Link>
					<Link to='/topics' className='footerButton'>
						Topics
					</Link>
				</div>
			</nav>
			<p className='footerSlug'>Copyright 2025 Chris Askew</p>
		</footer>
	);
}

export default Footer;
