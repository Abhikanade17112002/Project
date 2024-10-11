const companyModel = require("../models/company.model");
const cloudinary = require("../utiils/cloudinary");
const deleteServerSideFiles = require("../utiils/deleteServerSideFiles");
const handleRegisterCompany = async (request, response) => {
  try {
    const { name } = request.body;
    if (!name) {
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
      name: name,
    });

    if (existingCompany) {
      return response.status(200).json({
        message: "company already registered !",
        status: false,
      });
    }

    console.log(request.userId, "REQUEST.USERID");

    const newRegistration = await companyModel.create({
      name: name,
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
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
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

      compantWebsite,
      industry,
      description,
    } = request.body;
    const companyLogoPath = request?.file?.path;
    console.log("====================================");
    console.log(
      {
        companyName,
        companyEmail,
        companyContact,
        companyAddress,
        compantWebsite,
        industry,
        description,
      },
      request.file
    );
    console.log("====================================");

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
    if (compantWebsite) {
      updatedInfo.compantWebsite = compantWebsite;
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
