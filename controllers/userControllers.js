import User from  '../models/user.js'
import jwt from 'jsonwebtoken'

export function postUsers(req,res){

  const user = req.body
 
  const newUser = new User(user)
  newUser.save().then(

    ()=>{
      res.json({
        message : "User created successfully"
      })
    }
  )
  .catch((err) => {
    console.error(err); // Log the error for debugging
    res.json({
      message: "User creation failed",
      error: err.message // Send a more user-friendly error message
    });
  });
  }

// export function loginUser(req,res){
//   const credentials = req.body

 

//   User.findOne({email : credentials.email, password :credentials.password}).then(
//     (user)=>{

      

//       if(user == null){

//         res.status(403).json({
//           message : "User not found"
//         })


        
        

//       }else{

       

//         const payload = {
//           id: user._id,
//           email: user.email,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           type: user.type,
       
//         };
  

//         const token = jwt.sign(payload, "secret" );

//         res.json({
//           message : "User found",
//           user : user,
//           token : token
//         })
        
//       }
//     }
//   )
// }



export function loginUser(req, res) {
  const credentials = req.body;

  User.findOne({ email: credentials.email, password: credentials.password }).then((user) => {
    if (user == null) {
      res.status(403).json({
        message: "User not found"
      });
    } else {
      const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type
      };

      // Sign the token with an expiration time (1 hour)
      const token = jwt.sign(payload, process.env.JWT_KEY);

      res.json({
        message: "User found",
        user: user,
        token: token
      });
    }
  });
}





