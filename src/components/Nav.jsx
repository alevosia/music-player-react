import { FaMusic } from 'react-icons/fa'

export const Nav = ({ isLibraryOpen, setIsLibraryOpen }) => {
    return (
        <nav className={`${isLibraryOpen ? 'squeezed' : ''}`}>
            <h1>Waves</h1>
            <button
                onClick={() => setIsLibraryOpen((isOpen) => !isOpen)}
                className={`${isLibraryOpen ? 'open' : ''}`}
            >
                <FaMusic />
                Library
            </button>
        </nav>
    )
}
