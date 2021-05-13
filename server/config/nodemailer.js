import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

import { GMAIL_USER, GMAIL_PASS } from './config.js';
 
export const sendMail = async (title, to, link, templatePath) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: GMAIL_USER, 
            pass: GMAIL_PASS, 
        },
    });

    // Compiling activation html template
    const filePath = path.join(path.resolve(), templatePath);
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        activation_link: link,
    };
    const htmlToSend = template(replacements);

    // send mail with defined transport object
    await transporter.sendMail({
        from: `The Code Beyond <${GMAIL_USER}>`, // sender address
        to: to, // list of receivers
        subject: title, // Subject line
        html: htmlToSend, // html body
    });
}

export const sendFeedback = async (fullName, email , subject, body) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: GMAIL_USER, 
            pass: GMAIL_PASS, 
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: `${fullName} <${email}>`, // sender address
        to: GMAIL_USER, // list of receivers
        subject: subject, // Subject line
        html: `<h3>${email}</h3>` + '<br/>' + body, // html body
    });
}
 
export const sendAnswer = async (title, to, link, templatePath, requestTitle, creatorName) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: GMAIL_USER, 
            pass: GMAIL_PASS, 
        },
    });

    // Compiling activation html template
    const filePath = path.join(path.resolve(), templatePath);
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        requestTitle: requestTitle,
        creatorName: creatorName,
        post_link: link,
    };
    const htmlToSend = template(replacements);

    // send mail with defined transport object
    await transporter.sendMail({
        from: `The Code Beyond <${GMAIL_USER}>`, // sender address
        to: to, // list of receivers
        subject: title, // Subject line
        html: htmlToSend, // html body
    });
}

