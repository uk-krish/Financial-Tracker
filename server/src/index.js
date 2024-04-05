const express=require('express')
const dotenv=require('dotenv');
const cors=require('cors')

const app = express();
dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())
const port = process.env.PORT;

app.use("/api/user/",require('./router/authRouter')) 
app.use("/api/user/expense/",require('./router/expenseRouter')) 


app.listen(port, () => console.log(`Server listening on port ${port}`));
