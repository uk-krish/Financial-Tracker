import React from 'react'
import PopupExpense from './PopupExpense';
import { FaX } from 'react-icons/fa6';
import PopupIncome from './PopupIncome';
import { useEditPopup } from '../context/EditPopupContext';

const EditPopup = ({ EditData }) => {
    const { editPopupVisible, setEditPopupVisible } = useEditPopup();
    const clickX = () => {
        setEditPopupVisible(false)
    }
    console.log(editPopupVisible);
    return (
        <div className='relative bg_popup h-max'>
             <div className="form mt-10">
                <div
                    onClick={clickX}
                    className='absolute right-0 mr-6 cursor-pointer'>
                    <FaX />
                </div>
            <div className='flex'>
                {
                    EditData!=null? EditData.choose==='expense'? <PopupExpense EditData={EditData}/>:<PopupIncome  EditData={EditData}/>:''
                }
            
            </div>
            </div>
        </div>
    )
}

export default EditPopup
