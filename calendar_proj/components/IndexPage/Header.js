import Link from 'next/link';
import classes from '../Layout/MainNavigation.module.css'

const Header = () => {
    return (
        <header className={classes.header}>
          <div className={classes.logo}><Link href='/'><i className="bi bi-house-fill"> Home</i></Link></div>
          <nav>
            <ul>
              <li>
                <Link href='/SignIn'><i>Sign in</i></Link>
              </li>
              <li>
                <Link href='/SignIn/SignUp'><i>Sign up</i></Link>
              </li>
              <li>
                <Link href='/AboutUs'><i>About Us</i></Link>
              </li>
            </ul>
          </nav>
        </header>
    )
}

export default Header
