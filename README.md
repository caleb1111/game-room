**Site: https://cscc09gameroom.herokuapp.com**

Notes: 403 error stops the site from working since most things use sockets to work. It is caused from CORS with react + socket io. We’ve searched the internet for the problem, but no one seems to have the same problem (it’s always 404 or something in conjunction with iinode or nodebb). The app works fully in localHost (in which is also included in the repo in GameRoom folder) with all features: game, chat, friend list, player list, shop, profiles, paypal.



Also for the game, the ships that you place cannot be displayed.

**CSCC09 Proposal**

**Team members: ZhiHong(Caleb) Chen, Yishuai Wang, TianJi Liu**

**Project Title:** Game Room

**Description of Web Application**

This web application is a game lobby similar to the one within QQ Game Lobby.

![img](https://lh3.googleusercontent.com/5zzZukS1WyyLJXVpQ2E3kh0FIb5Jm-NIPbjqsp9fOt4vpu-Sy0ETWx75JaxELEoc9cVb9Et-3_f0JJtMgDZZnOEGTKeJDUxG26v3WKgMNuogo_oLed5fLbD2M4Gbmj7mP7McYN7_)

(Old UI, but same idea from <http://m.yyxt.com/pc/16209.html> )

This is an application where people can join game rooms with others, chat and play games together in different sessions. Users can view each other’s profiles and customize their own, showing off their own accolades. Users can also use points earned from the game to buy profile customization items within a shop or use real money to buy points (hopefully try to get the microtransactions part to work). 

**User Account Signup and Login**

In this app, users may signup with an account and customize their profile with descriptions and a profile picture (should we do this?  Yes, file upload xd). Unauthenticated users won’t be able to access the lobby and cannot interact with the app without signing up. There will be no support for guest accounts.

![img](https://lh6.googleusercontent.com/g6I8r1_I00V6it_z636x4padAoHqt_PeyZJM_qJwpx1eVcwdYM34JJkk9zR00bofL5USGw339KATlb23SOliSF1ifnwww4ZyLGG9EkZzTFFDXllfQ_s_aL-6tJU8JvgebR-fYbE4)

(Sign Up page - This is just a prototype for the login page. UI will be improved when implementing.)

![img](https://lh5.googleusercontent.com/RAWFTnAhWK2ii_f2a6QmtyA-VUU7YdTQsuLPqaCNTdyQOx8QbqfjA13Mx4ZBmz8eGq2XDbgVj8cdqGp-kF-cwKc6O-WMLHVVVPN3QNMxQg42oPEkQH7WbESCqqMshO6hYKj1Fjpw)

(Login page - This is just a prototype for the login page. UI will be improved when implementing.)

**Lobby**

Only the users who signed up are able to log in to the lobby. Once a user logged in, they will be presented with the lobby. Users are able to create game rooms in the lobby. They can also choose to join existing game rooms and play with other users. In the lobby itself, users will be able to chat with each other and there will be a list of users that are inside the server. Users will be able to view each other’s profile and add each other as friends. There will be the ability for users to message friends in a private conversation. Each player will also win points for playing the game and they can spend their points.

Users will also see a large section with open game sessions (like in the image in the description) and they will be able to join an open session. With the session open, 

**Shop**

Users will be able to browse the shop and buy different customization items for their profile. Such items could be backgrounds, profile borders, trophies that are displayed on the profile, maybe a section that allows people to leave messages on their profiles like what we have been doing in the labs and small badges for accolades and maybe rankings. We also want to have the ability for people to use real money to buy points using an api (probably paypal api) and make monetary requests with paypal. Since this is just a school project, the costs will be set as low as possible to test. 

**Game**

The game will be battleship as that is simple and easy to create. 2 players can join the session and once they ready up, they will be placed into the game. The game will proceed regularly with plays taking turns trying to sink each other’s ships until someone wins by selecting a box within the grid and confirming their move. Once a winner has been decided, the players will be displayed a end of game screen and returned to the lobby. Players will win points based on whether they won or not and how much damage they did.

![img](https://lh5.googleusercontent.com/i73IgQsPXlYnPf8LBgU5O2HKu-fTHFsz6i_SNwdHsQ7-S2jAFEz_xXPEDBQGrmF3rb14bu2OiG1kvixMWysiHhCqJMPbK11yJAUwfaxvjUwLXcHUNngOVa82ZihD6Wakusk8HmIk)

(A screenshot of BattleShip game from <https://www.youtube.com/watch?v=M3bhTq7pQaU> )

**Manage User Profile**

Users will have their own profile page where they can choose to change their name or profile image through uploading. They can customize their own profile with items the bought from the shop and set up their own descriptions such as “About me” and some sort of small blog. Other users can view other profiles and request to be their friend, but cannot edit them. 

**Key Features of the Beta Version**

We would like to have the login, the user profile and most of the lobby completed. Users should be able to create their account and edit their profile settings. Also the basic UI of the game. In the lobby itself, we would like to have the list of users complete and have the ability to chat with each other. We would also like to have the ability to go to each other’s profile. Database should store the profiles and user information. Users should also be able to sign back out. 

**Key Features of the Final Version**

- User Sign in and Sign up with an account

- - User account will be stored in database
  - User will be able to stayed log in for future visits until they manually sign out

- User once signed in, they will access the lobby

- - Lobby will have multiple game sessions that a user can click to join
  - Users are able to chat with each other in the lobby and the game room
  - Once everyone in a game session is ready, the game will start
  - Full implementation of the game’s functionality and the ability for users to get points
  - Users will be able to view each others profiles and add each other as friends and message their friends
  - Users will be able to customize their own profile. 
  - Users can sign out

- Users in the lobby can access the shop

- - Shop items can be bought with points from the game or from microtransactions
  - Buying items will subtract the cost with the amount of points the user has.

- Users once joined a game and both players readied up, they will begin the game

- - Battleship - users will take turns making moves in attempt to destroy each other’s ships
  - Once someone wins, results will be displayed and both player will gain points. Player can add each other as friends. (Maybe) If both players add each other as friends but not accept the friend request, it will count as accepting the request. 
  - After, both players will be able to return to the lobby.

**Technology that We Will Use**

- Socket io to connect players in the game session 
- React
- Heroku
- MongoDB to store usernames and password, user profiles, friend lists etc
- HTML5 & CSS3 cool effects for designing a good UI
- Styled components for designing a good UI
- Paypal API (maybe another monetary api)
- Konva Canvas
- CORS

**Top 5 Challenges**

1. Socket io in conjunction with react while dealing with CORS all at the same time
2. Learning React and able to use it to implement a fully functioned web-app in six week will be quite challenging. Using canvas in react since canvas is not natively supported.
3. Styled components will be another challenge when designing the UI -> Creating visually appealing images to use in the website
4. Implementing the game that will work in a browser, creating a web game that will be able to run on a browser and communicate with other players to create a multiplayer session.
5. Using the Paypal api to create microtransactions where users will be able to pay real money for in app currency and how to implement this