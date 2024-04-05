import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Top_Dash = () => {

    const [Income, setIncome] = useState(0)
    const[Expense,setExpense]=useState(0)

    const LoadIncome = async () => {
        const id = JSON.parse(localStorage.getItem('User')).id;
        try {
            const response = await axios.post("http://localhost:8080/api/user/expense/sumincome", { user_id: id });
            setIncome(response.data[0].total)
        } 
        catch (error) {
            console.error("Error occurred:", error);
        }
    }

    const LoadExpense = async () => {
        const id = JSON.parse(localStorage.getItem('User')).id;
        try {
            const response = await axios.post("http://localhost:8080/api/user/expense/sumexpense", { user_id: id });
            setExpense(response.data[0].total==null?0:response.data[0].total)
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    useEffect(() => {
        LoadIncome()
        LoadExpense()
    })



    return (
        <div className='flex max-w-[1200px] flex-wrap mx-auto justify-between mt-10'>
            <div className='w-[350px] mt-5 bg-black justify-center flex flex-col items-center h-28'>
                <p>Wallet</p>
                <p className='mt-2' >₹ {Income-Expense}</p>
            </div>

            <div className='w-[350px] mt-5 bg-black justify-center flex flex-col items-center h-28'>
                <p>Income</p>
                <p className='mt-2' >₹ {Income}</p>
            </div>

            <div className='w-[350px] mt-5 bg-[black] justify-center flex flex-col items-center h-28'>
                <p>Spend</p>
                <p className='mt-2' >₹ {Expense}</p>
            </div></div>
    )
}

export default Top_Dash