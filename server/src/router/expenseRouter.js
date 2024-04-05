const express = require('express');
const { addExpense, sumExpense, sumIncome, history, income, expense,  update, Delete,} = require('../controller/ExpenseController');
const router=express.Router();

router.post('/add',addExpense);
router.post("/sumexpense",sumExpense);
router.post('/sumincome',sumIncome);
router.post('/history',history)
router.post('/income',income)
router.post('/expense',expense)
router.post('/update',update)
router.delete('/delete',Delete)




module.exports=router;