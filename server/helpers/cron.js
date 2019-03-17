const User = require('../models/user');
const Project = require('../models/project');
const cron = require('node-cron');
const kue = require('kue');
const queue = kue.createQueue();
const sendEmail = require('./nodemailer');

module.exports = () => {
  kue.app.listen(3006);

  const everyDays = '0 0 1 * *';

  cron.schedule(everyDays, () => {
    Project
      .find()
      .populate('invite')
      .then((projects) => {
        if(projects){
          projects.forEach(project => {
            if(project.invite){
              let userPromise = [];
              project.invite.forEach(user => {
                userPromise.push(new Promise ((resolve, reject) => {
                  User
                    .findById(user._id)
                    .then((user) => {
                        queue.create('send-notif-email', {
                        title: 'Someone Invite You To Join Project',
                        user: user
                      }).save()
                  })
                }))
              })
              Promise.all(userPromise)
                .then(resolve => {
                  console.log(resolve);
                })
                .catch(error => {
                  console.log(error);
                })
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  });

  queue.process('send-notif-email', (job, done) => {
    setTimeout(() => {
      sendEmail(job.data.user)
      done()
    }, 1000);
  })
}
