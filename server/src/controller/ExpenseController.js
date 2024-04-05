const Dbconnection = require('../config/DBconfig');
const { expenseQ } = require('../model/expenseQuery');
const con = Dbconnection();
const dotenv = require('dotenv');
dotenv.config();

exports.addExpense = async (req, res) => {
    try {
        const { label, category, amount, date, user_id, choose } = req.body;
        (await con).query(expenseQ.addExpense, [label, amount, date, category, user_id, choose], (err, data) => {
            if (err)
                return res.json(err)
            return res.json({ message: "Added Successfully!!" })
        })
    } catch (error) {
        console.error(error);
    }
}
exports.sumExpense = async (req, res) => {
    try {
        const { user_id } = req.body;
        (await con).query(expenseQ.SumExpense, [user_id], (err, data) => {
            if (err)
                return res.json(err)
            return res.json(data)
        })
    } catch (error) {
        console.error(error);
    }
}

exports.sumIncome = async (req, res) => {
    console.log(req.body);
    try {
        const { user_id } = req.body;
        (await con).query(expenseQ.SumIncome, [user_id], (err, data) => {
            if (err)
                return res.json(err)
            return res.json(data)
        })
    } catch (error) {
        console.error(error);
    }
}

exports.history = async (req, res) => {
    try {
        const { user_id } = req.body;
        (await con).query(expenseQ.History, [user_id], (err, data) => {
            if (err)
                return res.json(err)
            return res.json(data)
        })
    } catch (error) {
        console.error(error);
    }
}
exports.income = async (req, res) => {
    try {
        const { user_id } = req.body;
        (await con).query(expenseQ.Income, [user_id], (err, data) => {
            if (err)
                return res.json(err)
            return res.json(data)
        })
    } catch (error) {
        console.error(error);
    }
}
exports.expense = async (req, res) => {
    try {
        const { user_id } = req.body;
        (await con).query(expenseQ.Expense, [user_id], (err, data) => {
            if (err)
                return res.json(err)
            return res.json(data)
        })
    } catch (error) {
        console.error(error);
    }
}

exports.update = async (req, res) => {
    try {
        const { label, amount, date, category, choose, id, user_id } = req.body;
        (await con).query(expenseQ.ExpenseUpdate, [label, amount, date, category, choose, id, user_id], (err, data) => {
            if (err)
                return res.json(err)
            return res.json({ message: "Updated Successfully!!" })
        })
    } catch (error) {
        console.error(error);
    }
}
exports.Delete = async (req, res) => {
    try {
        const { id, user_id } = req.query;
        console.log(id, user_id);
        (await con).query(expenseQ.DeleteExpense, [id, user_id], (err, data) => {
            if (err)
                return res.json(err)
            return res.json({ message: "Deleted Successfully!!" })
        })
    } catch (error) {
        console.error(error);
    }
}
