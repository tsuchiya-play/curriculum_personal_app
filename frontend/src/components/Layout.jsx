import Header from "./Header"

function Layout({ children, isLoggedIn, onLogout }) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
            <main>{children}</main>
        </>
    )
}

export default Layout
