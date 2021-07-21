import Users from "../../dbModel/apiRegister";
import database from "../../utils/dbConnect";
import { applySession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";
database.connect();


async function getUsers(req, res) {

 const{query}=req.body;
 if(query===""){return res.send([])}
  try {
    const result = await 
    Users.find({ username: {$regex : "^" + query, $options: 'i' }}).limit(10);
    if (!result) {
     return  res.status(400).send('notFound');
    }
    res.send(result);
//     const allMatchedUsers=Users.find({ username: {$regex : "^" + query, $options: 'i' }})
// userList=userList.concat(allMatchedUsers);
// totalUsers=allMatchedUsers.length;


  } catch (error) {
    console.log(error.message);
    res.status(400).end();
    
  }
};



async function getMoreUsers(req,res){
  const {count,query}=req.body;
  const allMatchedUsers=await Users.find({ username: {$regex : "^" + query, $options: 'i' }})
const newArray = allMatchedUsers.slice(0,count);
res.send({list:newArray});
}





export default async (req,res)=>{

    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }



    switch (req.body.requestFor) {
case "getUsers" :{
    return getUsers(req,res);
}
case "getMoreUsers" :{
    return getMoreUsers(req,res);
}
       
        
            default: {
              return res.status(400).end();
            }
          }
        };
        
