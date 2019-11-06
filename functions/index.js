const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'igorpraxedeslinux@gmail.com',
        pass: ''
    }
});


exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        const dest = req.body.email;
        const title = req.body.title;
        const content = req.body.content;

        const mailOptions = {
            from: 'Your Account Name <igorpraxedeslinux@gmail.com>',
            to: dest,
            subject: title,
            html: content ? content : `<p style="font-size: 16px;"></p>

                Sem conteudo
                <br />
                ${content}
            `
        };
  
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });