// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({ 
//                 message: "User not authenticated", 
//                 success: false
//             });
//         }

//         const decoded = await jwt.verify(token, process.env.SECRET_KEY);
//         if (!decoded) {
//             return res.status(401).json({ 
//                 message: "Invalid token", 
//                 success: false
//             });
//         }

//         req.id = decoded.userId;
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error", success: false });
//     }
// };

// export default isAuthenticated;



// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({
//                 message: "User not authenticated",
//                 success: false,
//             })
//         }
//         const decode = await jwt.verify(token, process.env.SECRET_KEY);
//         if(!decode){
//             return res.status(401).json({
//                 message:"Invalid token",
//                 success:false
//             })
//         };
//         req.id = decode.userId;
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// }
// export default isAuthenticated;


import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId;  // Add the user ID to the request object
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Authentication error",
            success: false,
        });
    }
};

export default isAuthenticated;
