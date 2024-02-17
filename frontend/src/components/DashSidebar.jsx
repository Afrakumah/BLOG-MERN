import React,{ useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import {Link, useLocation} from 'react-router-dom'


//to go to profile tab when we click on profile in the sidebar

export default function DashSidebar() {
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark">
            Profile
          </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
