import jwt from "jsonwebtoken";

export const generatetooken= (dataset,res)=>{

    const token= jwt.sign(dataset,process.env.JWT_SECRET,{expiresIn:"1d"});
    console.log(token)
    res.cookie("test",token,{
        maxAge:1*24*60*60*1000,
        httpOnly:true,
        sameSite: "strict",
        secure:process.env.NODE_MODE !=="verifyme"
    })
}