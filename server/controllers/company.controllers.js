const companyModel = require("../models/company.model");
const cloudinary = require("../utiils/cloudinary");
const deleteServerSideFiles = require("../utiils/deleteServerSideFiles");
const handleRegisterCompany = async (request, response) => {
  try {
    const { companyName } = request.body;
    console.log('====================================');
    console.log(companyName,"companyName");
    console.log('====================================');
    if (!companyName) {
      return response.status(200).json({
        message: "company name required !",
        status: false,
      });
    }

    if (request.user.role === "student") {
      return response.status(200).json({
        message: "only recuruter are allowed to register a company",
        status: false,
      });
    }

    const existingCompany = await companyModel.findOne({
      companyName: companyName,
    });

    if (existingCompany) {
      return response.status(200).json({
        message: "company already registered !",
        status: false,
      });
    }

   

    const newRegistration = await companyModel.create({
      companyName: companyName,
      userId: request?.userId,
    });

    return response.status(200).json({
      message: "company registered successfully !",
      status: true,
      company: newRegistration,
    });
  } catch (error) {
    console.log("SOMETHING WENT WRONGB IN COMPANY REGISTRATION", error);
  }
};

const handleGetAllUserCreatedCompany = async (req, res) => {
  try {
    const userId = req.userId; // logged in user id
    const companies = await companyModel.find({ userId });
    if (!companies) {
      return res.status(200).json({
        message: "no user created companies found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "fetched all user companies succesfully",
      companies,
      status: true,
    });
  } catch (error) {
    console.log("something went wrong in get user companies", error);
  }
};
// get company by id
const handleGetCompanyById = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const company = await companyModel.findById(companyId);
    if (!company) {
      return res.status(200).json({
        message: "company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log("something went wrong in get company By Id ", error);
  }
};
const handleUpdateCompanyDetails = async (request, response) => {
  try {
    const {
      companyName,
      companyEmail,
      companyContact,
      companyAddress,
      companyWebsite,
      industry,
      description,
    } = request.body;
    const companyLogoPath = request?.file?.path;


    let companyLogoURL = await cloudinary.uploader.upload(companyLogoPath);

    let updatedInfo = {};
    if (companyName) {
      updatedInfo.companyName = companyName;
    }
    if (companyEmail) {
      updatedInfo.companyEmail = companyEmail;
    }
    if (companyContact) {
      updatedInfo.companyContact = companyContact;
    }
    if (companyAddress) {
      updatedInfo.companyAddress = companyAddress;
    }
    if (companyWebsite) {
      updatedInfo.companyWebsite = companyWebsite;
    }
    if (industry) {
      updatedInfo.industry = industry;
    }
    if (description) {
      updatedInfo.description = description;
    }
    if (companyLogoURL) {
      updatedInfo.companyLogo = companyLogoURL.secure_url;
    }

    const updatedCompanyInfo = await companyModel.findByIdAndUpdate(
      request.params.companyId,
      updatedInfo,
      { new: true }
    );

    if (!updatedCompanyInfo) {
      return response.status(200).json({
        message: "company not found.",
        status: false,
      });
    }
    return response.status(200).json({
      message: "company information updated.",
      status: true,
      company:updatedCompanyInfo
    });
    deleteServerSideFiles(companyLogoPath);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleRegisterCompany,
  handleGetAllUserCreatedCompany,
  handleGetCompanyById,
  handleUpdateCompanyDetails,
};
