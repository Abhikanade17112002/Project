const companyModel = require("../models/company.model");



const handleRegisterCompany = async ( request , response ) =>{
    try {
        const { name } = request.body ;
        if( ! name  )
        {
            return response.status(200).json({
                message:"company name required !" ,                             
                status :false,
            })
        }


        if( request.user.role === "student" )
        {
            return response.status(200).json({
                message:"only recuruter are allowed to register a company" ,
                status :false,
                })
        }


        const existingCompany = await companyModel.findOne({
            name : name
        }) ;


        if(existingCompany)
        {
            return response.status(200).json({
                message:"company already registered !" ,
                status :false,
            })
        }

        console.log(request.userId,"REQUEST.USERID");
        
        const newRegistration = await companyModel.create({
            name : name ,
            userId : request?.userId 
        })


        return response.status(200).json({
            message:"company registered successfully !" ,
            status :true,
            company : newRegistration
        })
    } catch (error) {
        
        console.log("SOMETHING WENT WRONGB IN COMPANY REGISTRATION",error);
    }
} ;





const handleGetAllUserCreatedCompany = async (req, res) => {
    try {
        const userId = req.userId; // logged in user id
        const companies = await companyModel.find({ userId });
        if (!companies) {
            return res.status(200).json({
                message: "no user created companies found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log("something went wrong in get user companies",error);
    }
}
// get company by id
 const handleGetCompanyById = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const company = await companyModel.findById(companyId);
        if (!company) {
            return res.status(200).json({
                message: "company not found.",
                success: false
            })
        }
        return res.status(200).json({
         
            company,
            success: true
        })
    } catch (error) {
        console.log("something went wrong in get company By Id ",error);
    }
}
const handleUpdateCompanyDetails = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        // idhar cloudinary ayega
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        // const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location };

        const company = await companyModel.findByIdAndUpdate(req.params.companyId, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"company information updated.",
            success:true,
            company
        })

    } catch (error) {
        console.log(error);
    }
}




module.exports = {handleRegisterCompany,handleGetAllUserCreatedCompany,handleGetCompanyById,handleUpdateCompanyDetails} ;