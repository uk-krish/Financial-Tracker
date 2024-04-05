import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const PopupIncome = ({ SetEditPopup,EditData }) => {
    const [IsId, SetisId] = useState(0)
    const [income, setIncome] = useState({
        label: EditData != null ? EditData.label : '',
        amount: EditData != null ? EditData.amount : '',
        date: EditData != null ? EditData.data : '',
        category: EditData != null ? EditData.category : '',
        user_id: JSON.parse(localStorage.getItem('User')).id,
        choose: 'income'
    })
    useEffect(() => {
        if (EditData) {
            setIncome({
                label: EditData.label || '',
                amount: EditData.amount || '',
                date: EditData.date || '',
                category: EditData.category || '',
                user_id: JSON.parse(localStorage.getItem('User')).id,
                choose: 'income'
            });
            SetisId(1);
            console.log(EditData);
        }
        console.log(IsId);
    }, [EditData, setIncome, IsId])


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(income);
        const response = await axios.post("http://localhost:8080/api/user/expense/add", income)
        console.log(response.data)
    }

    const HandleUpdate = async (e)=>{
        e.preventDefault()
        const e_id=EditData.id;
        const values = {
            label: income.label,
            amount: income.amount,
            date:moment(income.date).format('YYYY-MM-DD'),
            category: income.category,
            choose: income.choose,
            id:e_id,
            user_id: income.user_id
        }
        try {
            const response=await axios.post("http://localhost:8080/api/user/expense/update",values)
            console.log(response.data);
            SetEditPopup(false)
        } catch (error) {
            console.log(console.error());
        }

    }


    return (
        <form action="" method="post ">
            <div className="flex flex-col mt-5">
                <label htmlFor="label" className='text-white'>Label</label>
                <input
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-5  ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 text-white h-10 focus:ring-transparent focus:outline-transparent  sm:text-sm sm:leading-6"
                    type="text"
                    name="label"
                    value={income.label}
                    onChange={(e) => setIncome({ ...income, label: e.target.value })}
                    id=""
                />
            </div>
            <div className="flex flex-col mt-5">
                <label htmlFor="amount" className='text-white'>Amount</label>
                <input
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-5  ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 text-white h-10 focus:ring-transparent focus:outline-transparent  sm:text-sm sm:leading-6"
                    type="number"
                    name="amount"
                    value={income.amount}
                    onChange={(e) => setIncome({ ...income, amount: e.target.value })}
                    id=""
                />
            </div>
            <span className='mt-5 w-full flex'>
                <label htmlFor="date" className='text-white'>Date</label>
            </span>
            <div className="flex w-full justify-between items-center ">
                <div>
                    <div className="relative ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            onChange={(e) => setIncome({ ...income, date: e.target.value })}
                            type="date"
                            name='date'
                            value={moment(income.date).format('YYYY-MM-DD')}
                            className="block w-full rounded-md border-0 py-1.5   pl-10 pr-5  ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 text-white h-10 focus:ring-transparent focus:outline-transparent  sm:text-sm sm:leading-6" placeholder="Select date" />
                    </div>
                </div>
                <div className='ml-5'>
                    <select id="category"
                        name="category"
                        value={income.category}
                        className="p-2 rounded-md border-2 border-[#d1d5db] bg-[#171b21] focus:ring-2 focus:ring-inset text-white focus:ring-transparent sm:text-sm"
                        onChange={(e) => setIncome({ ...income, category: e.target.value })}
                    >
                        <option selected disabled>Select Source</option>
                        <option>Salary</option>
                        <option>Invest</option>
                        <option>Business</option>
                        <option>Unearned</option>
                    </select>
                </div>
            </div>
            <div className='mt-5 flex justify-center p-2'>
                <input
                    className='bg-white text-black p-2 w-full rounded-md'
                    onClick={IsId === 1 ? HandleUpdate : handleSubmit}
                    type="submit"
                    value={IsId === 1?'Update':'Add'} />
            </div>

        </form>
    )
}

export default PopupIncome