import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar.jsx';
import DashProfile from '../components/DashProfile';


//admin dashboard can have diff tabs like seeing comments,posts made and profile. location will be to identify path to the profile

export default function Dashboard() {
  const location = useLocation();
  //console.log(location);
  const [tab, setTab] = useState('')

  //useeffect to fetch the tab we are in
  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    //console.log(tabFromUrl);

    if(tabFromUrl) {
      setTab(tabFromUrl)
    }

    //when location.search changes, render useeffect
  }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
     <div className="md:w-56">
       {/* creating sidebar components in the dashboard */}
       <DashSidebar />
     </div>
      {/* dashboard profile */}
      {tab === 'profile' && <DashProfile />}
    </div>
  )
}
