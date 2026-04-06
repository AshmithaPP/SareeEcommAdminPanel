import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const menuItems = [
  { name: 'Dashboard',  icon: 'dashboard',           path: '/dashboard' },
  { name: 'Products',   icon: 'inventory_2',          path: '/products' },
  { name: 'Categories', icon: 'auto_awesome_motion',  path: '/categories' },
  { name: 'Orders',     icon: 'shopping_bag',         path: '/orders' },
  { name: 'Customers',  icon: 'group',                path: '/customers' },
  { name: 'Analytics',  icon: 'insights',             path: '/analytics' },
];

const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      {isMobileOpen && (
        <div
          className={styles.overlay}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          styles.sidebar,
          isCollapsed   ? styles.isCollapsed   : '',
          isMobileOpen  ? styles.isMobileOpen  : '',
        ].filter(Boolean).join(' ')}
      >
        {/* Logo */}
        <div className={styles.logoContainer}>
          {isCollapsed && !isMobileOpen ? (
            <h1 className={styles.brandTitleMini}>SC</h1>
          ) : (
            <>
              <h1 className={styles.brandTitle}>Silk Curator</h1>
              <p className={styles.tagline}>Luxury Admin</p>
            </>
          )}
        </div>

        {/* Nav */}
        <nav className={styles.navMenu}>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.activeLink : ''].filter(Boolean).join(' ')
              }
              title={isCollapsed && !isMobileOpen ? item.name : ''}
              onClick={closeMobile}
            >
              <span className={`material-symbols-outlined ${styles.icon}`}>
                {item.icon}
              </span>
              {(!isCollapsed || isMobileOpen) && (
                <span className={styles.linkText}>{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className={styles.bottomActions}>
          <NavLink
            to="/settings"
            className={styles.bottomLink}
            onClick={closeMobile}
          >
            <span className="material-symbols-outlined">settings</span>
            {(!isCollapsed || isMobileOpen) && <span>Settings</span>}
          </NavLink>
          <button className={`${styles.bottomLink} ${styles.logout}`}>
            <span className="material-symbols-outlined">logout</span>
            {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;