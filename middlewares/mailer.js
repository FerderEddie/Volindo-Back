// Importing nodemailer module to send emails through Node.js
const mailer = require("nodemailer");

// Importing dotenv to access environment variables
require('dotenv').config();

module.exports = {
    // Middleware function to send a mail with the ad details
  mailerMiddleware: async (req, res, next) => {
    try {
        // Creating a transport object to send emails using Gmail service
      const transport = mailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.GMAIL_PASSKEY },
      });

      // Destructuring request body to extract ad details
      const {
        advertisementName,
        budgetAmount,
        budgetAndDaysValue,
        daysValue,
        finalStartDate,
        finalFinishDate,
        numberOfClicks,
        numberOfLeads,
        numberOfViews,
        previewTextValue,
        socialValue,
        totalPrice,
        transactionFee,
        typeValue,
        uploadedFiles,
        email,
      } = req.body;

      // Creating a mail object with a structured HTML body
      const mail = {
        to: email,
        subject: "Volindo",
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #202020; padding: 20px; border-radius: 10px; text-transform: capitalize; width: 90%; color: whitesmoke; text-align: center; font-size: 1.2em;">

   

        <div style="padding: 6px; background-color: #303030;border: solid 2px #AACD5F; border-radius: 5px; text-align: center; width: 90%; margin: 0 auto; margin-bottom: 35px;margin-top: 20px;">
        <h1 style="color: whitesmoke; text-align:center; font-size: 1.8em;">
            Your Advertisement <br> Have Been Created Successfully
        </h1>

        <p style="margin-block: 10px; padding: 5px;">
        <strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">
            Advertisement ID
        </strong>
        ${req.body.advertisementId}
        </p>
        </div>
    

        <div style="border-top: 2px solid #343a40; margin: 25px auto; width:90%;"></div>
        
        
        <div style="margin-bottom: 20px;">
        <p style="margin: 5px; padding: 5px;"><strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">Advertisement Name</strong> ${advertisementName}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="margin: 5px; padding: 5px;"><strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">Social Network</strong> ${socialValue}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="margin: 5px; padding: 5px;"><strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">Advertisement Type</strong> ${typeValue}</p>
        </div>

        <div style="border-top: 2px solid #343a40; margin: 25px auto; width:90%;">
        </div>
        
    
        
    
        <p><strong style="font-size: 1.1em;color:#AACD5F;">Uploaded Images/Videos</strong></p>
        <ul style="list-style-type: none; padding: 0; margin-bottom: 25px;margin-top: 25px; font-size: 0.8em;">
        ${
          uploadedFiles && uploadedFiles.length > 0
            ? uploadedFiles
                .map(
                  (file) =>
                    `<li style="background-color: #e9ecef; color:#212529; border-radius: 5px; padding: 5px; display: inline-block; margin-bottom: 10px;">
                        <a href="${file.file}" style="color:#212529; text-decoration: none;" target="_blank">
                          ${file.name}
                        </a>
                    </li>`
                )
                .join("")
            : "<li style='background-color: #e9ecef; color:#212529;  border-radius: 5px; padding: 5px; display: inline-block; margin-right: 5px; margin-bottom: 6px;'>none</li>"
        }
      </ul>
      
      <div style="border-top: 2px solid #343a40; margin-top: 25px;margin-bottom: 25px;width:90%;margin:0 auto;">

      </div>
      

      <div style="text-align: center; color: whitesmoke; margin-bottom: 20px;margin-top: 30px;">
      <strong style="font-size: 1.1em;color:#AACD5F;">Preview Text</strong>
      </div>
      <div style="color: whitesmoke; line-height: 1.5;width:90%; text-align: center; margin: 0 auto; border-radius: 5px; background-color: #2b2b2b; padding: ${
        previewTextValue ? "16px" : "5px"
      };">
          ${previewTextValue ? previewTextValue : "none"}
      </div>



      <div style="width: 90%; margin: 0 auto; border-bottom: 2px solid #343a40;margin-top:40px;"></div>


    
      <div style="display: flex; justify-content: center; margin: 0 auto; font-size: 1em;">
      <div style="display: inline-block; padding: 20px;text-align: center; margin: 24px auto;width:80%;">
          <p style="color: whitesmoke; margin: 0 0 5px 0; line-height: 1.5;"><strong style="color:#AACD5F;">Advertisement Start Date</strong> <br> ${finalStartDate}</p>
          <hr style="border: 0.5px solid #6c757d; margin: 10px 0;">
          <p style="color: whitesmoke; margin: 5px 0 0 0; line-height: 1.5;"><strong style="color:#AACD5F;">Advertisement Finish Date</strong> <br> ${finalFinishDate}</p>
          <hr style="border: 0.5px solid #6c757d; margin: 10px 0;">
          <p style="color: whitesmoke; margin: 5px 0 0 0; line-height: 1.5;"><strong style="color:#AACD5F;">Total Days:</strong> ${daysValue}</p>
      </div>
    </div>


    <div style="border-top: 2px solid #343a40; margin-top: 25px;width:90%;margin:0 auto;"></div>
    

    <div style="margin-top:25px;">
    <div style="margin-bottom: 20px;">
        <p style="margin: 5px; padding: 5px;">
            <strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">Daily Budget Amount</strong> ${budgetAmount}$
        </p>
    </div>
    <div style="display: flex;direction:row;justify-content:space-evenly;width:100%;">
        <div style="width:33.33%;">
            <p style="margin: 5px; padding: 5px;">
                <strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">Expected Clicks per Day</strong> ${numberOfClicks}
            </p>
        </div>
        <div style="width:33.33%;">
            <p style="margin: 5px; padding: 5px;">
                <strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">Expected Leads per Day</strong> ${numberOfLeads}
            </p>
        </div>
        <div style="width:33.33%;">
            <p style="margin: 5px; padding: 5px;">
                <strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">Expected Views per Day</strong> ${numberOfViews}
            </p>
        </div>
    </div>
</div>


<div style="border-top: 2px solid #343a40; width:90%; margin:0 auto; margin-top: 30px;"></div>

    
    <br>
    
    <div style="margin-bottom: 20px;">
    <p style="margin: 5px; padding: 5px;">
        <strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">Daily Budget <span style= color:white;text-transform:lowercase;>x</span> Days Amount</strong> ${budgetAndDaysValue}$
    </p>
    </div>
    <div style="margin-bottom: 20px;">
        <p style="margin: 5px; padding: 5px;">
            <strong style="display: block; margin-bottom: 4px; font-size: 1.1em;color:#AACD5F;">Transaction Fee 4%</strong> ${transactionFee}$
        </p>
    </div>
    <div style="padding: 10px; background-color: #303030;border: solid 2px #AACD5F;  border-radius: 5px; text-align: center; width: 95%; margin: 0 auto; margin-bottom: 20px;">
        <p style="font-weight: bold; font-size: 1.1em;">
            <strong>Total Price For ${daysValue} Days:</strong> <strong style= color:#AACD5F;>${totalPrice}$</strong>
        </p>
    </div>


    <div style="border-top: 2px solid #343a40; width:90%; margin:0 auto; margin-top: 35px;"></div>
    

    <div style="padding: 10px; text-align: center; margin: 0 auto; font-size: 1em;">
    <p style="margin-top: 20px; text-align: center; color: whitesmoke; font-size: 1.1em; font-weight: bold;">
        Thank you for choosing <span style="color:#AACD5F;"> Volindo </span> 
    </p>
    <p style="text-align: center; color: whitesmoke; font-size: 0.8em;">
        Our marketing team will contact you soon
    </p>
    </div>
    
    </div>
            `,
      };

      // Sending the email and then calling the next middleware
      await transport.sendMail(mail);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
