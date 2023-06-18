import logo from './logo.png'


const Header = () => 
    <header>
        <a href="/" className="logo">
            <img src={logo} alt="Grosharies"/>
            <div className="logo-name">Grosharies</div>
        </a>

        <nav>
            <ul>
            <li><a 
            href="/login">Login</a></li>
            <li><a 
            href="/about">About</a></li>
            <li><a 
            href="https://github.com/enesbkoca/Grosharies">Source Code</a></li>
            </ul>
        </nav>
    </header>;

const Footer = () => 
    <footer>
        Enes © 2023
    </footer>;

export {Header, Footer}