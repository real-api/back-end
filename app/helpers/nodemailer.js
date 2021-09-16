const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport")
module.exports = async function SendVerificationMail(to, token, password) {
    const transporter = nodeMailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'coffeeLearngroup',
            pass: '23._r+eg*RGR-65ef'
        }
    }))
    const mailOptions = {
        from: "coffeeLearngroup@gmail.com",
        to,
        subject: "Verify your Real-API email address",
        html: `
<div style="padding : 10px; border : 1px solid #a1a1a1">
<p>You have selected this email address as your new RealAPi. <br />
To verify this email address belongs to you, We sent your login Token validation to your email:
</p>
<h2>YOUR-TOKEN : </h2>
<h5>${token}</h5>
<hr/>
Use this Token to send your requests to your user panel in the API <br/>
for login on your account you send request to auth/login with body : <br/>
You must use the token in the request header as follows:<br/>
<pre>
headers:
    {
        "authorization" : "Bearer YourToken"
    } 
</pre>
<hr/>
<h2>YOUT_Auth_INFO : </h2>
<h5>E-mail : ${to} </h5>
<h5>PASSWORD : ${password} </h5>
<hr/>
<p>
Use the following information to login to your account and proceed according to the document on the website : 
<br/>
<a href="google.com">docs for you</a>
<br/>
Why did you receive this email? <br/>
To prevent malicious and unknown people from entering this program,<br />
    as well as sending new notifications and updates to you, dear programmer and developer
</p>
</div>
        `
    };

    const result = await transporter.sendMail(mailOptions).then(info => {
        console.log(`messageID : ${info.messageId.split("@")[0].substring(1)}`);
        return {
            message: 'Your Token was successfully sent to your email'
        }
    }).catch(err => {
        throw { status: 500, message: 'Your email has not been sent. Try again' }
    })
    console.log(result);
    return result
}