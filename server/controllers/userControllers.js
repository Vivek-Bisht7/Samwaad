const TempUser = require("../models/tempUser");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  const temporaryUser = await TempUser.findOne({ email: userEmail });
  const user = await User.findOne({ userName });

  if (!temporaryUser || !temporaryUser.isVerified) {
    return res
      .status(400)
      .json({ success: false, message: "User not verified" });
  }

  if (user) {
    return res
      .status(400)
      .json({ success: false, message: "Username already exists" });
  }

  if (userName.includes(" ")) {
    return res
      .status(400)
      .json({ success: false, message: "Spaces are not allowed in username" });
  }

  try {
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = await User.create({
      userName,
      userEmail,
      userPassword: hashedPassword,
    });

    return res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.log("Error : " + err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { loginEmail, loginPassword } = req.body;

    if (!loginEmail || !loginPassword) {
      return res.status(400).json({
        success: false,
        message: "Either e-mail or password is missing",
      });
    }

    const user = await User.findOne({ userEmail: loginEmail });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found , Register first" });
    }

    const isMatch = await bcrypt.compare(loginPassword, user.userPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Information" });
    }

    if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
      console.log("SECRET is not defined in environment variables.");

      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET,
      { expiresIn: "60d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 15,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 60,
    });

    return res.status(200).json({ success: true, message: "OK" ,});

  } catch (err) {
    console.log("Error : " + err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const handleRefreshToken = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Refresh token not valid" });

    const user = await User.findById(decoded.id);

    if (!user || !user.refreshToken) {
      return res.status(403).json({ message: "Refresh token not valid" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 20000,
    });

    return res.json({ success: true, message: "Access token refreshed" });
  });
};

const handleLogout = (req,res) =>{
  try{
     res.cookie("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "Strict",
    expires: new Date(0), 
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "Strict",
    expires: new Date(0),
  })

  return res.status(200).json("Logout successfull");
  }
  catch(err){
    console.error("Error : " + err.message);
    return res.status(500).json({success:false,message:"Error : " + err.message});
  }
}

const getCurrentUser = (req,res) =>{
  const user = req.user.id;
  res.send({user});
}


const searchUser = async (req,res) => {
  let {user} = req.body;

  user = user.trim();

  if(!user){
    return res.status(400).json({success:false,message:"Enter a valid user credentials"});
  }  
  
  const temp = await User.findOne({$or:[{userName:user},{userEmail:user}]});

  if(!temp) return res.status(404).json({success:false,message:"User not found"});

  if(req.user.id==temp._id) return res.status(404).json({success:false,message:"User logged in"});
  
  res.status(200).json({success:true,message:"User found successfully",user:temp});
}

const updateProfile = async (req,res) =>{

  const user = await User.findById(req.user.id);

  user.userImage = `http://localhost:3000/profile/${req.file.filename}`
  await user.save();

}

module.exports = { registerUser, loginUser, handleRefreshToken, handleLogout,getCurrentUser,searchUser,updateProfile};
