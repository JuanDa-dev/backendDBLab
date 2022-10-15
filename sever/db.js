import  {createPool} from 'mysql/promise'; 

export const pool = createPool({
   host: 'localhost', 
   port: 3306, 
   user: 'root',
   password: 'abc123',
   database: 'mydb'
})



