import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import EditPopup from './EditPopup';
import axios from 'axios';
import { useEditPopup } from '../context/EditPopupContext';


const HistroyTable = ({ history }) => {

  const { editPopupVisible,setEditPopupVisible } = useEditPopup()

  const [EditData, setEditData] = useState(null)

  const HandleDelete = async (id) => {
    const user_id = JSON.parse(localStorage.getItem('User')).id
    try {
      const response = await axios.delete(`http://localhost:8080/api/user/expense/delete?id=${id}&user_id=${user_id}`)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    console.log(editPopupVisible);
  })

  console.log(editPopupVisible);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 overflow-hidden">
      <div className={editPopupVisible ? 'block' : 'hidden'}>
        <EditPopup EditData={EditData} />
      </div>
      <table className=" bg-black w-[90%] mx-auto mt-5 overflow-y-scroll  text-sm text-left rtl:text-right ">
        <thead className=" ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className=''>

          {history.map((item) => {
            return (
              <tr key={item.id} className="border-b items-center">
                <th scope="row" className="px-6  py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.label}
                </th>
                <td className={item.choose === 'expense' ? 'px-6 py-4 text-red-500' : 'px-6 py-4 text-green-500'}>
                  {item.choose === 'expense' ? '-' : '+'}{item.amount}
                </td>
                <td className="px-6 py-4">
                  {moment(item.date).format('DD-MM-YYYY')}
                </td>
                <td className="px-6 py-4">
                  {item.category}
                </td>
                <td className="flex w-1/2  py-4 justify-between">
                  <div
                    onClick={() => {
                      setEditData(item);
                      setEditPopupVisible(true);
                    }}
                    className='hover:text-[#0c8ce9] text-[18px] cursor-pointer'>
                    <FaPen

                    />
                  </div>
                  <div
                    onClick={() => {
                      HandleDelete(item.id)
                    }}
                    className='hover:text-red-500 text-[18px]  cursor-pointer'>
                    <FaTrashCan />
                  </div>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  )
}

export default HistroyTable
