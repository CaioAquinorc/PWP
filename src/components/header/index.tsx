import props from '@/types/props';
import './header.css';

export default function Header({ titulo, subtitulo, OnLogOut } : props) {
    return (
        <header className="header">
            <h1 className="header-title">{titulo}</h1>
            <p className="header-subtite">{subtitulo}</p>
            <button className="btn-secondary btn-logout" onClick={OnLogOut}>
                Log Out
            </button>
        </header>
    );
}