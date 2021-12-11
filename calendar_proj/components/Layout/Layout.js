import classes from './MainNavigation.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';


function MainNavigation(props) {
	const router = useRouter();                                         // Implement routing
	const username = router.query.homPage; 

  // Implement states for visiblility                             
  const [isVisible,setisVisible] = useState(false);
  const [SignOutVisible, setSignOutVisible] = useState(false);
  const [HomeVisible, setHomeVisible] = useState(false);
  const [showOptions, setshowOptions] = useState(false);

  // Send a request to log out
	async function signOut () {
		const response = await fetch('/api/LogOut', {
			//the method is 'POST'
			method: 'POST',
			body: username
			// Header is just for extra information
		});
		router.replace('/');                                                  // Redirect to the home page
	}

  // Display options functon
  const displayOptions = () => {
    showOptions ? setshowOptions(false) : setshowOptions(true);
  }

  window.onresize = ()=>{setshowOptions(false)};
	

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href={'/'+username}>
          <i className="bi bi-house-fill" onMouseEnter={()=>{setHomeVisible(true)}} onMouseLeave={()=>setHomeVisible(false)} >
            {HomeVisible ? <i>Home</i> : ''}
          </i>
        </Link>
      </div>
      <nav>
        <ul>
          <li className={classes.links}>
            <Link href={'/' +username+"/Friends"}><i>Friends</i></Link>
          </li>
          <li className={classes.links}>
            <Link href={'/' +username+"/Weather"}><i>Weather</i></Link>
          </li>
          <li className={classes.links}>
            <Link href={"/"+username+"/Calendar"}><i>Calendar</i></Link>
          </li>
          <li className={classes.links}>
            <Link href={"/" + username + "/events"}><i>Events</i></Link>
          </li>
          <li className={classes.links}>
            <Link href={'/'+username + "/News"}><i>News</i></Link>
          </li>
          <li className={classes.icons}>
            <i className={classes.hiddenButton} onClick={displayOptions}><i className={"bi bi-list"}></i></i>


            {showOptions ?
                <div className={classes.optsionsShow}>
                  <ul>
                    <li>
                      <Link href={'/' +username+"/Friends"}><i>Friends</i></Link>
                    </li>
                    <li>
                      <Link href={'/' +username+"/Weather"}><i>Weather</i></Link>
                    </li>
                    <li>
                      <Link href={"/"+username+"/Calendar"}><i>Calendar</i></Link>
                    </li>
                    <li>
                      <Link href={"/" + username + "/events"}><i>Events</i></Link>
                    </li>
                    <li>
                      <Link href={'/'+username + "/News"}><i>News</i></Link>
                    </li>
                  </ul>
                </div> : ''}
          </li>
          <li className={classes.icons} >
            {isVisible ? <span>Profile Settings </span> : ''}
            <Link href={'/'+username+"/Profile"} >
              <i className="bi bi-person-square" onMouseEnter={()=>{setisVisible(true)}} onMouseLeave={()=>setisVisible(false)} >
              </i>
            </Link> 
          </li>
          <li className={classes.icons}>
            {SignOutVisible ? <span>Sign Out </span> : ''}
            <i onClick={signOut} onMouseEnter={()=>{setSignOutVisible(true)}} onMouseLeave={()=>{setSignOutVisible(false)}}><i className="bi bi-box-arrow-right"></i></i>
          </li>
        </ul>
      </nav>
    </header>);
}

export default MainNavigation;