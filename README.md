# Re(act)-Mail [![Build Status](https://travis-ci.com/jason-heinowitz/NM-Coding-Challenge.svg?branch=dev)](https://travis-ci.com/jason-heinowitz/NM-Coding-Challenge)

A Northwestern Mutual coding challenge.

Bootstrapped with [react-kickstart](https://www.npmjs.com/package/react-ks) ([Github](https://github.com/jason-heinowitz/react-ks)), a base application custom developed by Jason Heinowitz. Inspired by [create-react-app](https://github.com/facebook/create-react-app).

# About

A modern, minimilistic take on  an email service for exclusive use within the [postql.io](https://postql.io) ([Github](https://github.com/oslabs-beta/PostQL)) environment. Re-mail features an over 80% TypeScript codebase, Redux-Saga, and and extensible REST api.

The REST API is configured to use the ![dotenv](https://www.npmjs.com/package/dotenv) package. Using the following environment variables will enable you to run this application:

`USER_DATABASE="postgres://yqeexiir:HzS4a-3tJ2ZrJeaEsb7fxL_Ns1NLupKT@ruby.db.elephantsql.com:5432/yqeexiir"
JWT_SECRET="McQfTjWnZr4u7xADGJaNdRgUkXp2s5v8yB?EHMbPeShVmYq3t6w9zCF"
EMAIL_DATABASE="mongodb+srv://admin:NR1bti5H3xM0gMru@cluster0.35z4u.mongodb.net/email"`

Docker is required to run locally.

# How to use

![Login and registration forms on the home page](https://i.imgur.com/EBzntLd.png "Home page forms")Upon reaching the home page, you will be greeted with the log in and registration forms, both of which contain descriptive error messages should an error occur when submitting either.
***
![Email inbox with logout and compose buttons](https://i.imgur.com/XVC8tne.png "Empty inbox")After successfully logging in or registering, you will be greeted with an empty inbox. Click compose to continue to the new email form.
***
![Compose new email form with recipients, subject, and body fields](https://i.imgur.com/WaKkGWw.png "Compose email form")
You can send an email to any @postql.io address. Multiple recipients are comma-delimited.
***
![Email will let user know that an empty subject and/or body is intentional](https://i.imgur.com/3eJQtpA.png "Email without subject nor body") If you decide to not send a subject and/or body, it will be clearly communicated to the recipient.
