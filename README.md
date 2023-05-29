# MERN STACK IMPLEMENTATION - 2
# Social-Media-app
 This Repo has both frontend(client) and backend(server) related files of this website.Frontend is present in branch rima and backend is present in branch main.
 Description: This is an COMPLETE Fullstack Responsive MERN App with Auth, Likes, Dark Mode | React,Redux, MongoDB, MUI.
 
##Functionality.
1. User Login and Register
2. On succesful login a JWT token is send from Backend and the user is directed to Home page.
3. HOME PAGE: It contains User Widget,Userpost Widget, POSTS widget,Advertisement Widget and Friendlist widget and a Navbar 
    3.1. User Widget : It contains user Image, User Name,Loaction,Job,Number of friends
    3.2. Userpost Widget : User can post any thing like Description with or without an Image.On clicking Post button which is in the widget the post is shown in the feed along with all feed posts
    3.3. POSTS widget : It contains all posts of Users. Where a particular post contains post user's name,picture, Add friend/remove friend button, post description and post Image(if any) 
    3.4. Advertisement Widget (Not functional hard coded)
    3.5. Friendlist widget : Shows all user friends. There is a button beside each friend (Remove friend button : on clicking the button user can remove the particular friend from his FriendList => NO LONGER FRIENDS)
    3.6  NAVBAR : it contains the website name(on click it will redirect us to home page) and also dark mode mode (on click changes dark mode to light mode and vice versa) and few Icons(message,notifications... => not functional yet)
4. User Profile page : On clicking on any user's username we will be directed to this page where we can see particular user's userwidget,friends list and user posts(only)
5. Jwt Authentication
6. Database used is Mongodb. All the login information and Users information is store in the database.
7. Front end is Developed using React js and Redux toolkit is used to store state. 
8. Material Ui is used for few Components ,Icons. 
