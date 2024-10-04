const UserModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleUserSignUp = async (request, response) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, role } =
      request.body;
    const file = request?.file;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !role
    ) {
     return  response.status(200).json({
        message: "please fill all the fields",
        status: false,
      });
    }

    const checkExistingUser = await UserModel.findOne({ email });

    if (checkExistingUser) {
     return  response.status(200).json({
        message: "user already exists !",
        status: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    // sign JWT
    const tokenData = {
      userId: newUser._id,
      role: newUser.role,
      email: newUser.email,
    };
    const signedToken = await jwt.sign(tokenData, process.env.JTWSECRETE, {
      expiresIn: "1d",
    })
     

    if( !signedToken )
    {
      return response.status(500).json({
        message: "Error generating token",
        status: false,
    })}
    //  send success response
    // JTWSECRETE="PASS@123"

    response.status(200).cookie("jwttoken", signedToken, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    }).json({
      message: "user created successfully",
      status: true,
      token:signedToken,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    response.status(200).json({
      message: "something went wrong in sign up ",
      status: false,
    });
  }
};

const handleUserSignIn = async (request, response) => {
  try {
    const { email, password, role } = request.body;

    if (!email || !password || !role) {
      response.status(200).json({
        message: "please fill all the fields",
        status: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      response.status(200).json({
        message: "incorrect email or password (user not found)",
        status: false,
      });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      response.status(200).json({
        message: "incorrect email or password (user not found)",
        status: false,
      });
    }

    if (user.role !== role) {
      response.status(200).json({
        message: "user account with assigned role not found",
        status: false,
      });
    }

    const tokenData = {
      userId: user._id,
      role: user.role,
      email: user.email,
    };

    const generatedToken = jwt.sign(tokenData, process.env.JTWSECRETE, {
      expiresIn: "1d",
    });

    response
      .status(200)
      .cookie("jwttoken", generatedToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .json({
        message: "login successfull",
        status: true,
        token: generatedToken,
        user,
      });
  } catch (error) {
    response.status(200).json({
      message: "something went wrong in sign in ",
      status: false,
    });
  }
};



const handleUserSignOut = async ( request , response )=> {
    try {
        
        console.log("hi");
        
        response.status(200).cookie("jwttoken","" ,{maxAge:0}).json({
          message: "logout successfull",
          status: true,
        }) ;
        
    } catch (error) {
        response.status(200).json({
            message: "something went wrong in sign out ",
            status: false,
          });
        
    }
}


const handleUserProfileUpdate = async (request, response) => {
  try {
    const { firstName, lastName, phoneNumber, bio, skills, email } = request.body;
    
    // Check if all fields are provided
    if (!firstName || !lastName || !phoneNumber || !bio || !skills || !email) {
      return response.status(400).json({
        message: "Please fill all the fields",
        status: false,
      });
    }

    const skillsArray = skills.split(",");
    const userId = request.userId;
    console.log( userId );
    

    // Find the user by ID
    let user = await UserModel.findById(userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    // Update the user data using findByIdAndUpdate for cleaner updates
    user = await UserModel.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phoneNumber,
        bio,
        "profile.skills": skillsArray,
        "profile.email": email,
      },
      { new: true } // Return the updated user
    );

    return response.status(200).json({
      message: "User profile updated successfully",
      status: true,
      user,
    });

  } catch (error) {
    console.log("Error updating profile: ", error);
    return response.status(500).json({
      message: "Something went wrong while updating profile",
      status: false,
    });
  }
};





module.exports = { // export the functions to be used in other files  
    handleUserSignUp,
    handleUserSignIn ,
    handleUserSignOut ,
    handleUserProfileUpdate
    } ;  

