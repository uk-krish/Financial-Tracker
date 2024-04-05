import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

const PopupExpense = ({SetEditPopup,EditData}) => {
    const[IsId,SetisId]=useState(0)
    const [expense, setExpense] = useState({
        label:EditData!=null ?EditData.label: '',
        amount: EditData!=null?EditData.amount:'',
        date: EditData!=null?EditData.data:'',
        category: EditData!=null?EditData.category:'',
        user_id: JSON.parse(localStorage.getItem('User')).id,
        choose: 'expense'
    })
    useEffect(() => {
        if (EditData) {
            setExpense({
                label: EditData.label || '',
                amount: EditData.amount || '',
                date: EditData.date || '',
                category: EditData.category || '',
                user_id: JSON.parse(localStorage.getItem('User')).id,
                choose: 'expense'
            });
            SetisId(1);
        } 
        console.log(IsId);
    },[EditData,setExpense,IsId])
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(expense);
        const response = await axios.post("http://localhost:8080/api/user/expense/add", expense)
        console.log(response.data)
    }


    const HandleUpdate = async (e)=>{
        e.preventDefault()
        const e_id=EditData.id;
        const values = {
            label: expense.label,
            amount: expense.amount,
            date:moment(expense.date).format('YYYY-MM-DD'),
            category: expense.category,
            choose: expense.choose,
            id:e_id,
            user_id: expense.user_id
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
        <form action="" method="post" className='animation' >
            <div className="flex flex-col mt-5">
                <label htmlFor="label" className='text-white'>Label</label>
                <input
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-5  ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 text-white h-10 focus:ring-transparent focus:outline-transparent  sm:text-sm sm:leading-6"
                    type="text"
                    name="label"
                    value={expense.label}
                    onChange={(e) => setExpense({ ...expense, label: e.target.value })}
                    id=""
                />
            </div>
            <div className="flex flex-col mt-5">
                <label htmlFor="amount" className='text-white'>Amount</label>
                <input
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-5  ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 text-white h-10 focus:ring-transparent focus:outline-transparent  sm:text-sm sm:leading-6"
                    type="number"
                    name="amount"
                    value={expense.amount}
                    onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
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
                            type="date"
                            name="date"
                            value={moment(expense.date).format('YYYY-MM-DD')}
                            className="block w-full rounded-md border-0 py-1.5   pl-10 pr-5  ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 text-white h-10 focus:ring-transparent focus:outline-transparent  sm:text-sm sm:leading-6" placeholder="Select date"
                            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                        />
                    </div>
                </div>
                <div className='ml-5'>
                    <select
                        id="category"
                        name="category"
                        value={expense.category}
                        className="p-2 rounded-md border-2 border-[#d1d5db] bg-[#171b21] focus:ring-2 focus:ring-inset text-white focus:ring-transparent sm:text-sm"
                        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Education">Education</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Subscription">Subscription</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Transport">Transport</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Gift">Gift</option>
                        <option value="Investment">Investment</option>
                        <option value="Others">Others</option>
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

export default PopupExpense
