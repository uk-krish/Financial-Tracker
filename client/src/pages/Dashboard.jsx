import React, { useEffect, useState } from 'react'
import Top_Dash from './Top_Dash'
import PopupIncome from '../Modal/PopupWallet'
import axios from 'axios'
import moment from 'moment'
const Dashboard = () => {
    const [Popup, setPopup] = useState(false)
    const [history, setHistory] = useState([{}])
    const handlePopup = () => {
        setPopup(!Popup)
    }

    const LoadHistory = async () => {
        const id = JSON.parse(localStorage.getItem('User')).id
        try {
            const response = await axios.post("http://localhost:8080/api/user/expense/history", { user_id: id });
            setHistory(response.data)
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    useEffect(()=>{
        LoadHistory()
    })

    return (
        <div className='overflow-hidden  h-[90vh]'
        >
            <div className={Popup ? 'block' : 'hidden'}>
                <PopupIncome Spop={setPopup} />
            </div>
            <div className='flex w-full justify-between'>
                <span className='text-3xl'>
                    Dashboard
                </span>
                <span onClick={handlePopup} className='p-2 bg-[#0c8ce9] rounded-md '>
                    Add Transaction
                </span>
            </div>
            <div >
                <Top_Dash />

            </div>
            {/* Last Transaction */}
            <div>
                <h1 className='mt-5 text-[20px]'>Last Transaction</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className=" bg-black w-[90%] mx-auto mt-5  text-sm text-left rtl:text-right ">
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
                            </tr>
                        </thead>
                        <tbody className=''>

                            {history.map((item) => {
                                return (
                                    <tr key={item.id} className="border-b items-center">
                                        <th scope="row" className="px-6  py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.label}
                                        </th>
                                        <td className={item.choose==='expense'?'px-6 py-4 text-red-500':'px-6 py-4 text-green-500'}>
                                            {item.choose === 'expense' ? '-' : '+'}{item.amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(item.date).format('DD-MM-YYYY')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.category}
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Dashboard