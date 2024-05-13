// const signupController = (req,res)=>{
//     try{
//         const {payload} = req.body
//         jwt.sign({data:payload},SECRET_KEY,{algorithm:"HS256"},(err,data)=>{
//             if(err) {
//                 console.log("Error ")
//                 throw new Error(err.message);
//             }
//             res.cookie('token',data,{
//                 maxAge:30*60*1000,
//                 httpOnly:true
//             });

//             res.status(200).json({
//                 authToken : data
//             })
//         });
//     }catch(e){
//         res.status(400).json({
//             message : e.message
//         })
//     }
// }

// module.exports = {
//     signupController,
// }