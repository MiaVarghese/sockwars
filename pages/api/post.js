// import dbConnect from '../../lib/dbConnect'
// const User = require("../../models/user");

// export default async function handler(req, res){
//     const user = new User({
//         userName: "user1",
//         email: "u@gmail.com",
//         password: "pass",
//         firstName: "mary",
//         lastName: "smith",
//         section: "trumpet",
//     });

//     try {
//         await dbConnect();
//         const newUser = await user.save();
//         res.status(201).json(newUser);
//         // res.send("hi");
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// }