const mongoose = require('mongoose');
const mailgun = require('mailgun-js');
const keys = require('../config/keys');

const mg = mailgun({ apiKey: keys.mailgunAPI, domain: keys.mailgunDomain });

const Email = mongoose.model('emails');

module.exports = app => {
  app.post('/api/contact', async (req, res) => {
    const { senderName, senderEmail, body } = req.body;

    // build subject line string
    const subjectLine = () => {
      // use 'PROD' or 'DEV' accordingly
      let str = `${process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'}`;
      // add app identifier
      str += '-REDDIT-USER-RANKER-MESSAGE';

      return str;
    };

    // message object
    const data = {
      from: `${senderName} <${senderEmail}>`,
      to: '',
      subject: subjectLine(),
      text: body
    };

    // send email
    const info = await mg
      .messages()
      .send(data)
      .catch(err => {
        console.error(err);
        res
          .status(400)
          .send({ error: err, message: 'Email could not be sent' });
      });

    // log mailgun response
    console.log(info);

    // will save to db even if not sent.
    // if not sent, will set successfullyDelivered as false
    // useful for bugs / analytics
    const email = await new Email({
      senderName,
      senderEmail,
      subject: data.subject,
      body,
      successfullyDelivered: !!info // if not sent, will be undefined, -> false
    })
      .save()
      .catch(err => {
        console.error(err);
        res.send({
          error: err,
          message: "Couldn't save email to the database"
        });
      });

    // log mongodb response
    console.log(email);

    res.send({});
  });
};
