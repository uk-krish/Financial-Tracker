import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaX } from 'react-icons/fa6'
import PopupIncome from './PopupIncome'
import PopupExpense from './PopupExpense'
const PopupWallet = ({ Spop }) => {
    const clickX = () => {
        Spop(false)
    }
    const [isSelect, setIsSelect] = useState(true)
    return (
        <div className='relative bg_popup h-max'>
            <div className="form mt-10">
                <div
                    onClick={clickX}
                    className='absolute right-0 mr-6'>
                    <FaX />
                </div>
                <div className="switch_box mt-7 w-3/4 flex bg-transparent rounded-full border-2 border-white justify-between relative  mx-auto p-1">
                    <button
                        onClick={() => setIsSelect(true)}
                        className={isSelect ? 'bg-white text-black rounded-full p-2 w-1/2' : 'p-1 w-1/2'} >Income</button>
                    <button
                        onClick={() => setIsSelect(false)}
                        className={!isSelect ? 'bg-white text-black rounded-full p-2 w-1/2' : 'p-1 w-1/2'} >Expense</button>
                </div>
                <div className='flex '>
                    <div className={isSelect ? 'block ' : 'hidden'}>
                        <PopupIncome />
                    </div>
                    <div className={!isSelect ? 'block' : 'hidden'}>
                        <PopupExpense />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupWallet
