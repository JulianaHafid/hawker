# hawker

Purpose of this project is to increase the profiling of hawkers in Singapore. With user reviews and ratings,
it will increases hawker's profile.

Stack:
Backend - Nodejs/Express
Frontend - Templating Engine: Pug/Jade
Database - MongoDB
Deployment - Heroku

To run on local:

Install all dependencies as per app.js, imported modules.
run nodemon --exec npm start

Web app can browsed: https://hawkersg.herokuapp.com/

Current prototype allows users the following functionalities,
--------------------------------------------------------------
v1:
1) Sign Up
2) Login via facebook
3) Select search by clicking on each cuisine search button
4) Click on "Rice Garden" Stall (as other stalls were hardcoded to serve as a prototype example) to see more info on the hawker.
5) Make a review but user needs to login first to be able to see the Make Review button to allow user to make review.
6) View review made, new reviews will be at the bottom of the page.


Update: Issue with "MemoryStore is not designed for a production environment". You may have issues browsing it on Heroku has been fixed.
10 Sept -
<Fix>
/use mongo-connect expression session
/specifiy node engine version in package.json
/google key API updated.
