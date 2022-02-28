const express = require('express');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'manager',
    database : 'internal'
});

var isconnected = false; 

connection.connect((error,result)=>
                                {
                                  if(error==null)  {
                                      console.log("Connected");
                                      isconnected = true;
                                  }
                                  else{
                                      console.log("Not connected");
                                      isconnected = false;
                                  }
                                })

var students = null;
let app = express();

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
//displayall
app.get("/students",(request,response)=>{
    if(isconnected){
        connection.query(`SELECT * FROM student`,(error,result)=>{
            if(error == null){
                students = result;
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify(students));
            }
            else{
                console.log("QueryFailes");
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify({"message":"QueryFailed"}));
            }
        })
    }
    else{
        console.log("Mysql Connection Failed");
        response.send("Mysql Connection Failed");
    }
})
//add student
app.post("/students",(request,response)=>{
    if(isconnected){
        let insertion = request.body;
        connection.query(`INSERT INTO student VALUES (${insertion.roll_no},'${insertion.name}',
        '${insertion.class}','${insertion.division}','${insertion.dob}',${insertion.parent_mob_no})`,(error,result)=>{
            if(error == null){
                response.setHeader("Content-Type","Application/json");
                response.send(JSON.stringify(result));
            }else{
                console.log("QueryFailes");
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify({"message":"QueryFailed"}));
            }
        })
    }else{
        console.log("Mysql Connection Failed");
        response.send("Mysql Connection Failed");
    }
})
//findbyrollno
app.get("/students/:roll_no",(request,response)=>{
    if(isconnected){
        // let insertion = request.body;
        connection.query(`SELECT * FROM student WHERE roll_no=${request.params.roll_no}`,(error,result)=>{
            if(error == null){
                students = result;
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify(students));
            }
            else{
                console.log("QueryFailes");
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify({"message":"QueryFailed"}));
            }
        })
    }
    else{
        console.log("Mysql Connection Failed");
        response.send("Mysql Connection Failed");
    }
})
//editclassanddivision
app.put("/students/:roll_no",(request,response)=>{
    if(isconnected){
        let insertion = request.body;
        connection.query(`UPDATE student SET class="${insertion.class}",division="${insertion.division}" 
        WHERE roll_no=${request.params.roll_no}`,(error,result)=>{
            if(error == null){
                response.setHeader("Content-Type","Application/json");
                response.send(JSON.stringify(result));
            }else{
                console.log("QueryFailes");
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify({"message":"QueryFailed"}));
            }
        })
    }else{
        console.log("Mysql Connection Failed");
        response.send("Mysql Connection Failed");
    }
})
//deletestudent
app.delete("/students/:roll_no",(request,response)=>{
    if(isconnected){
        // let students = null;
        connection.query(`DELETE FROM student WHERE roll_no=${request.params.roll_no}`,(error,result)=>{
            if(error == null){
                students = result;
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify(students));
            }
            else{
                console.log("QueryFailes");
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify({"message":"QueryFailed"}));
            }
        })
    }
    else{
        console.log("Mysql Connection Failed");
        response.send("Mysql Connection Failed");
    }
})
//fetchallbyclass
app.get("/studentsc/:class",(request,response)=>{
    if(isconnected){
        // let insertion = request.body;
        connection.query(`SELECT * FROM student WHERE class="${request.params.class}"`,(error,result)=>{
            if(error == null){
                students = result;
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify(students));
            }
            else{
                console.log("QueryFailes");
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify({"message":"QueryFailed"}));
            }
        })
    }
    else{
        console.log("Mysql Connection Failed");
        response.send("Mysql Connection Failed");
    }
})
//fetchbybirthyear
app.get("/studentsb/:year",(request,response)=>{
    if(isconnected){
        let insertion = request.body;
        connection.query(`SELECT * FROM student WHERE YEAR(dob)=${request.params.year}`,(error,result)=>{
            if(error == null){
                students = result;
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify(students));
            }
            else{
                console.log("QueryFailes");
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.send(JSON.stringify({"message":"QueryFailed"}));
            }
        })
    }
    else{
        console.log("Mysql Connection Failed");
        response.send("Mysql Connection Failed");
    }
})
app.listen(9898,()=>{
    console.log("Server started listening at port no 9898")
})