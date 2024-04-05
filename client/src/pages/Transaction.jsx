import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import HistroyTable from '../Modal/HistroyTable'
import PopupWallet from '../Modal/PopupWallet'
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import { useEditPopup } from '../context/EditPopupContext'

const Transaction = () => {
  const [Popup, setPopup] = useState(false)
  const [history, setHistory] = useState([{}])
  const [Switch, SetSwitch] = useState(0)
  
  const {editPopupVisible}=useEditPopup()

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = history.slice(indexOfFirstPost, indexOfLastPost)

  const PageNumber=[];
  for (let i = 1; i <= Math.ceil(history.length / postsPerPage); i++) {
    PageNumber.push(i)
  }
  const handlePopup = () => {
    setPopup(!Popup)
  }

  const LoadHistory = async () => {
    SetSwitch(0)
    const id = JSON.parse(localStorage.getItem('User')).id
    try {
      const response = await axios.post("http://localhost:8080/api/user/expense/history", { user_id: id });
      setHistory(response.data)
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
  const LoadIncome = async () => {
    SetSwitch(1)
    const id = JSON.parse(localStorage.getItem('User')).id
    try {
      const response = await axios.post("http://localhost:8080/api/user/expense/income", { user_id: id });
      console.log(response.data);
      setHistory(response.data)
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
  const LoadExpense = async () => {
    SetSwitch(2)
    const id = JSON.parse(localStorage.getItem('User')).id
    try {
      const response = await axios.post("http://localhost:8080/api/user/expense/expense", { user_id: id });
      // Date Format
      response.data.map((item) => {
        item.date = moment(item.date).format('YYYY-MM-DD')
      })
      setHistory(response.data)
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
 
  useEffect(() => {
    if(!editPopupVisible){
      switch(Switch){
        case 0:
          LoadHistory()
          break;
        case 1:
          LoadIncome()
          break;
        default:
          LoadExpense()
      }
    }
  }, [editPopupVisible,Switch])
  console.log(useEditPopup);
  return (
    <div className='overflow-hidden  h-[90vh]'>
      <div className={Popup ? 'block' : 'hidden'}>
        <PopupWallet Spop={setPopup} />
      </div>
      <div className='flex w-full justify-between'>
        <span className='text-3xl'>
          Transaction
        </span>
        <span onClick={handlePopup} className='p-2 bg-[#0c8ce9] rounded-md '>
          Add Transaction
        </span>
      </div>
      <div className='flex justify-between w-1/3 mx-auto mt-10 rounded-full border-2 p-2'>
        <button
          onClick={LoadHistory}
          className={Switch === 0 ? 'bg-white text-black p-2 w-[100px] rounded-full' : 'p-2 w-[100px] rounded-full'}
        >All
        </button>
        <button
          onClick={LoadIncome}
          className={Switch === 1 ? 'bg-white text-black p-2 w-[100px] rounded-full' : 'p-2 w-[100px] rounded-full'}
        >Income
        </button>
        <button
          onClick={LoadExpense}
          className={Switch === 2 ? 'bg-white text-black p-2 w-[100px] rounded-full' : 'p-2 w-[100px] rounded-full'}
        >Expense</button>
      </div>
      
      <HistroyTable   history={currentPosts} />
      {/* Button Handle flex absolute bottom-0 ml-20 mb-20 items-center */}
      <div className='flex  ml-20 mt-20 items-center'>
      <div className=''>
          <button 
          onClick={currentPage!=1?()=>setCurrentPage(currentPage-1):''}
          className={`block p-2 bg-black rounded-md border-2 border-gray-500 shadow-lg text-white text-[18px] ${currentPage!=1?'':'cursor-not-allowed'}`} ><FaAngleLeft/></button>
        </div>
        {PageNumber.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={
              currentPage === number
                ? 'ml-6 w-10 h-10 p-2 rounded-md  border-2 bg-gray-500 shadow-lg'
                : 'ml-6 w-10 h-10 p-2 bg-black rounded-md border-2 border-gray-500 shadow-lg'
            }
          >
            {number}
          </button>
        ))}
        <div className='ml-6'>
          <button 
          onClick={currentPage<PageNumber[PageNumber.length-1]?()=>setCurrentPage(currentPage+1):''}
          className={`block p-2 bg-black rounded-md border-2 border-gray-500 shadow-lg text-white text-[18px] ${
            currentPage < PageNumber[PageNumber.length - 1] ? '' : 'cursor-not-allowed'
          }`}>
            <FaAngleRight/>
          </button>
        </div>
        
        </div>
    </div>
  )
}

export default Transaction
