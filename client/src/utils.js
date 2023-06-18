import logo from './logo.png'
import './styles/index.css'

const Header = () => 
    <header className="main-header">
        <a href="/" className="logo">
            <img src={logo} alt="Grosharies"/>
            <div className="logo-name">Grosharies</div>
        </a>

        <nav className="main-nav">
            <ul>
            <li><a 
            href="/login">Login</a></li>

            <li><a 
            href="https://github.com/enesbkoca/Grosharies">GitHub</a></li>
            </ul>
        </nav>
    </header>;

const Footer = () => 
    <footer className="main-footer">
        <nav className="main-nav">
            <ul>
                <li><a 
                    href="/about">About</a>
                </li>
                <li>
                    Made by Enes 2023
                </li>
            </ul>
        </nav>
    </footer>;

export {Header, Footer}