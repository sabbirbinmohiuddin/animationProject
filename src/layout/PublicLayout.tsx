
import { NavLink, Outlet } from 'react-router'

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Navbar */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">

                <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

                    {/* Logo */}
                    <NavLink to="/" className="text-2xl font-bold tracking-tight">
                        My<span className="text-indigo-400">Website.</span>
                    </NavLink>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                        {[
                            { name: 'Home', path: '/' },
                            { name: 'About', path: '/about' },
                            { name: 'Contact', path: '/contact' },
                            { name: 'Photos', path: '/photos' },
                        ].map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/'}
                                className={({ isActive }) =>
                                    `rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 sm:px-5 sm:py-2.5 ${isActive
                                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}

                    </div>
                </nav>
            </header>

            {/* Page Content */}
            <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
                <Outlet />
            </main>

        </div>
    )
}
