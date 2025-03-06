const jobModel = require("../models/job.model");
const user = require("../models/user.model");
const axios = require("axios")
const reccomandationController = async (request,response) =>{

    try {
        const data = request.body;
        // console.log(data);
        
        // console.log(data.userInfo.skills);
        // ,"skills":data?.userInfo.profile.skills
        const filtertedUserInfo = {"name":data?.userInfo.firstname + " " + data?.userInfo.lastname , "skills": data.userInfo.skills} ;
        const FiltredInternshipData = data.internships.map((internship)=>{
            return {
                 "jobId": internship?._id , "jd":internship.description ,"title":internship.title , "company":internship.company.companyName ,"location":internship.location, "requirements" :internship.requirements
            }
        });
        // console.log("Received  User data:", filtertedUserInfo);
        // console.log("Received  Internship data:", FiltredInternshipData);

        // console.log("THIS" ,{
        //     "student": filtertedUserInfo,
        //     "internships": FiltredInternshipData,
        //     // "jd":
        //     "top_n": 2,
        //     "min_similarity": 0.1
        // });
        

        // Make the API call and await the response
        const apiResponse = await axios.post("http://0.0.0.0:8000/recommendations/", {
            "student": filtertedUserInfo,
            "internships": FiltredInternshipData,
            "top_n": 2,
            "min_similarity": 0.1
        });

        console.log("API Response:", apiResponse.data );

        // Send API response back to the client
        response.json({
            message: "Success",
            status: "Success",
            recommendations: apiResponse.data // Return the response from external API
        });

    } catch (error) {
        console.error("Error calling external API:", error.message);
        response.status(500).json({
            message: "Error fetching recommendations",
            error: error.message
        });
    }
}


const analyserController = async (request,response) =>{

    try {
        const data = request.body;
        console.log(data,"DATA DATA");
        
        const apiResponse = await axios.post("http://127.0.0.1:8000/analyze", data);

        console.log("API Response:", apiResponse.data );
        // Send API response back to the client
        response.json({
            message: "Success",
            status: "Success",
            "data":apiResponse.data
           // Return the response from external API
        });

    } catch (error) {
        console.error("Error calling external API:", error.message);
        response.status(500).json({
            message: "Error fetching recommendations",
            error: error.message
        });
    }
}


module.exports = {
    reccomandationController ,
    analyserController
}