import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body; 

        const existUser = await UserModel.findOne({ email });
        if (existUser) {
            return res.status(401).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hashSync(password, 10);

        const userRole = role || 'ticket clerk';

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role: userRole, 
        });

        await newUser.save();

        const roleCollections = {
            "ticket clerk": "ticket-clerk",  // Collection for ticket clerks
            "admin": "admins",                // Collection for admins
            "super admin": "super-admin",    // Collection for super admins
        };

        // Ensure the role is valid and map it to the correct collection
        if (roleCollections[userRole]) {
            const userFolder = roleCollections[userRole];  // Use this folder name for role-specific data
            return res.status(200).json({
                success: true,
                message: "User registered successfully",
                newUser,
                userFolder,  // Optional: Add this to show where the data is saved (for testing purposes)
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        console.log(error);
    }
};


const Login=async(req,res)=>{
    try {
          const {email,password}=req.body

          const user=await UserModel.findOne({email})

          if (!user) {
              return res.status(404).json({success:false,message:"Invalid credentials"})
          }

          const ispassaowrdValid= await bcryptjs.compare(password,user.password)
          if (!ispassaowrdValid) {
            return res.status(404).json({success:false,message:"Invalid credentials"})
            
          }
               const token= jwt.sign({userId:user._id},process.env.JWT_SECRET)

                res.cookie('token',token,{
                    httpOnly: true,
                    secure: false,
                    maxAge: 3600000,
                    
                })
              res.status(200).json({success:true,message:"Login successfully",user,token})

    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
        console.log(error)
    }
}
  const Logout=async(req,res)=>{
    try {
        res.clearCookie('token')
        res.status(200).json({message:"user Logout successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
        console.log(error)
    }
  }
     const CheckUser=async(req,res)=>{
            try {
                const user=req.user
                if (!user) {
                    res.status(404).json({message:'User not found'})
                }
                res.status(200).json(user)

                
            } catch (error) {
                res.status(500).json({message:"internal server error"})
                console.log(error)
                
            }
     }

export {register,Login,Logout,CheckUser}