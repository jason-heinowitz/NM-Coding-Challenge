# Re(act)-Mail [![Build Status](https://travis-ci.com/jason-heinowitz/NM-Coding-Challenge.svg?branch=dev)](https://travis-ci.com/jason-heinowitz/NM-Coding-Challenge)

A Northwestern Mutual coding challenge.

Bootstrapped with [react-kickstart](https://www.npmjs.com/package/react-ks) ([Github](https://github.com/jason-heinowitz/react-ks)), a ground-up development inspired by [create-react-app](https://github.com/facebook/create-react-app).

# About

A modern, minimilistic take on  an email service for exclusive use within the [postql.io](https://postql.io) ([Github](https://github.com/oslabs-beta/PostQL)) environment. Featuring an over 80% TypeScript codebase, Redux-Saga, and and extensible REST api, I present: Re-Mail.

Don't have Docker? Visit live at [email.postql.io](https://email.postql.io).

# How to use

![Login and registration forms on the home page](https://i.imgur.com/EBzntLd.png "Home page forms")Upon reaching the home page, you will be greeted with the log in and registration forms, both of which contain descriptive error messages should an error occur when submitting either.

![Email inbox with logout and compose buttons](https://i.imgur.com/XVC8tne.png "Empty inbox")After successfully logging in or registering, you will be greeted with an empty inbox. Click compose to continue to the new email form.

![Compose new email form with recipients, subject, and body fields](https://i.imgur.com/WaKkGWw.png "Compose email form")
You can send an email to any @postql.io address.

![Email will let user know that an empty subject and/or body is intentional](https://i.imgur.com/3eJQtpA.png "Email without subject nor body") If you decide to not send a subject and/or body, it will be clearly communicated to the recipient.
