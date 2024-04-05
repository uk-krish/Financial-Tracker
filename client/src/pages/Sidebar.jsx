import React,{useEffect, useState} from 'react'
import { FaAngleLeft,
    FaAngleRight,
    FaHouse,
    FaArrowRightArrowLeft,
    FaTags,
    FaRegUser,
    FaArrowRightFromBracket,
   } from "react-icons/fa6";
import logo from '../assets/logo.png'
import { Link, useParams } from 'react-router-dom';
const Sidebar = () => {
    const param=useParams(  )
    const username=localStorage.getItem('User');
    const[active, setActive] = useState(false)
    const [SidebarData, setSidebarData] = React.useState( [
        {
            id: 1,
            title: 'Dashboard',
            icon: <FaHouse />,
            active: true

        },
        {
            id:2,
            title:'Transcations',
            icon:<FaArrowRightArrowLeft/>,
            active: false
        },
        {
            id:3,
            title:'Settings',
            icon:<FaTags/>,
            active: false
        },
        {
            id:4,
            title:'profile',
            icon:<FaRegUser />,
            active: false
        }
    ])
    const handleActive = () => {
        setActive(!active)
    }
    const handleItemClick = (id) => {
        const updatedData = SidebarData.map(item => {
          if (item.id === id) {
            return { ...item, active: true };
          } else {
            return { ...item, active: false };
          }
        });
        setSidebarData(updatedData);
        localStorage.setItem('activeItem', id);
      };
      useEffect(() => {
        const activeItemId = localStorage.getItem('activeItem');
        if (activeItemId) {
            const updatedData = SidebarData.map(item => {
                if (item.id === parseInt(activeItemId)) {
                    return { ...item, active: true };
                } else {
                    return { ...item, active: false };
                }
            });
            setSidebarData(updatedData);
        }
    }, []); 
    return (
      <>
        <div className={`w-[200px] ${active?'hidden':'md:block hidden'} h-screen justify-between bg-black `}>
            <div className='justify-between flex flex-col h-full'>
                <div className='flex relative mx-auto flex-col justify-center w-full items-center' >
                <div className='flex items-center'>
                    <img className='w-14 mt-5' src={logo} alt="" />
                    <span
                     onClick={handleActive}
                     className='mt-7 -mr-4 p-2 rounded-full bg-[#5c85e7] absolute z-10 right-0'>
                    <FaAngleLeft/>
                    </span>
                    </div>
                    <div className='text-white items-center  w-full mt-20'>
                        {SidebarData.map((item) => {
                            return (
                                <Link to={item.title.toLowerCase() === 'dashboard' ? `/${JSON.parse(localStorage.getItem('User')).username}` : item.title.toLowerCase()} key={item.id} className={`flex items-center text-[18px]  w-full mb-8 relative ${item.active ? 'active' : 'icons'}`}
                                onClick={() => handleItemClick(item.id)}
                                >
                                    <span className='flex items-center  p-3'>
                                    {item.icon}
                                    <p className='ml-2'>{item.title}</p>
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <div className='text-center items-center flex justify-center mb-10'>
                        Logout
                        <span className='ml-2'>
                        <FaArrowRightFromBracket/>
                        </span>
                        </div>
                </div>
            </div>
        </div>
        {/* Responsive */}
        <div className={`w-[100px] relative ${active?'sm:block hidden':'sm:hidden block'} h-screen justify-between bg-black  `}>
            <div className='justify-between flex flex-col h-full'>
                <div className='flex mx-auto flex-col justify-center w-full items-center' >
                    <div className='flex items-center'>
                    <img className='w-14 mt-5' src={logo} alt="" />
                    <span 
                    onClick={handleActive}
                    className='mt-7 -mr-4 p-2 rounded-full bg-[#5c85e7] absolute z-10 right-0'>
                    <FaAngleRight/>
                    </span>
                    </div>
                    
                    <div className='text-white items-center  w-full mt-20'>
                        {SidebarData.map((item) => {
                            return (
                                <Link to={item.title.toLowerCase() === 'dashboard' ? `/${JSON.parse(localStorage.getItem('User')).username}` : item.title.toLowerCase()} key={item.id} className={`flex items-center text-[18px]  w-full mb-8 relative ${item.active ? 'active' : 'icons'}`}
                                onClick={() => handleItemClick(item.id)}
                                >
                                    <span className='flex items-center  p-3 justify-center text-[20px] mx-auto '>
                                    {item.icon}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <div className='text-center items-center flex justify-center mb-10'>
                        <span className='ml-2 text-[20px]'>
                        <FaArrowRightFromBracket/>
                        </span>
                        </div>
                </div>
            </div>
        </div>
      </>
    )
}

export default Sidebar
