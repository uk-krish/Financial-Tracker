exports.expenseQ = {
    "addExpense": "insert into expense(label,amount,date,category,user_id,choose) values(?,?,?,?,?,?)",
    // SUm of all expenses
    "SumExpense": "select sum(amount) as total from expense where user_id=? and choose='expense'",
    // sum of all income
    "SumIncome": "select sum(amount) as total from expense where user_id=? and choose='income'",
    // history get in desc order
    "History": "select * from expense where user_id=? order by id desc",
    // Get all income Desc order
    "Income":"select * from expense where user_id=? and choose='income' order by id desc",
    "Expense":"select * from expense where user_id=? and choose='expense' order by id desc",
    // Get Expense by id
    "ExpenseUpdate": "update expense set label=?, amount=?, date=?, category=?, choose=? where id=? and user_id=?",
    // Delete Expense
    "DeleteExpense": "delete from expense where id=? and user_id=?"
}