# Handy:
## An everyday app

---

### Description

This is my first project after completing the "Complete web dev 2022" course on Udemy. After having only ever used Express and React separately, I decided to build this app to learn how to put it all together. 

This is a web app that lets you write notes (post-it style), make checklists, put things on a calender and (if I find an API that suits my notification needs) lets you set alarms (notifications). For now, the app only handles one user, but since I want to deploy it for personnal use, I will build an authentication system (don't worry: hash and salt + social logins) to allow users to have their own Handy session.

---

### Logs

**12-14-2022:**
Made the repo public. The app is only meant to be run locally at this point (only has one user). The notes page is complete and fully functionnal and the data is stored in a local mongodb.

To run the app locally:
0. Have Node.js and run `npm install` in `Handy/server` as well as `Handy/client`
1. Start mongodb services: It may be started by default, otherwise run `mongod` in a console
2. Start the server side: In a seperate console, navigate to `Handy/server` either run `npm run dev` to run nodemon (you need to have it installed first) or `npm run start` to call node.
3. Start the client side: In another console (yes, I need to fix this launching method), navigate to `Handy/client` and run `npm start`