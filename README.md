# Project Title
Commutity

## 1. Project Description
"Stay in the loop of your commute!"
It is extremely difficult to 
Commutity is a community-based app that provides information on any issues users may encounter
during commutes through the use of user posts. 

## 2. Names of Contributors
List team members and/or short bio's here... 
* Ella
* Luke Chung
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Translink Data

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Create an account and log in
* Use bottom navbar to navigate to different pages (Home, Post, Profile)
* Scroll post feed to see posts
* Select filters to filter post feed

## 5. Known Bugs and Limitations
Here are some known bugs:
* User is able to pick a bus stop number that does not correlate to the bus route number
Here are some limitations:
* There is no way to logout (no logout button)
* There is no way to delete your account from firebase

## 6. Features for Future
What we'd like to build in the future:
* Ability to comment on posts
* Liking posts and displaying the number of likes
* Using relational database to refine filters feature
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo

├── images                   # Folder for images
    /app-icon.png            # Created by Ella
    /commute-background.jpeg # https://rare-gallery.com/540907-blur-blurry.html
    /default-post-img.jpg    # Created by Ella 
    /help-icon.png           # https://icon-library.com/icon/help-icon-png-0.html 
    /home-icon.png           # https://icons8.com/icons/search-by-image edited
    /home-seleced-icon.png   # Home icon colour edited
    /post-icon.png           # https://icons8.com/icon/37839/add 
    /post-selected-icon.png  # Post icon colour edited
    /profile-icon.png        # https://icons8.com/icon/14736/customer 
    /profile-selected-icon.png # Profile icon colour edited

├── scripts                  # Folder for scripts
    /authentication.js       # Logging into firebase system
    /eachPost.js             # JS for eachPost.html
    /firebaseAPI_template.js # Template for others to user their own firebase project
    /main.js                 # JS for main.html
    /posting.js              # JS for posting.html
    /profile.js              # JS for profile.js
    /script.js               # Logout function and function that takes user to login page if not signed in
    /search_filters.js       # JS related to filters feature
    /skeleton.js             # JS for loading navbar and footer onto html pages
    /transit_data.js         # Arrays containing data for different filter options

├── styles                   # Folder for styles
    /main.css                # Styling for main.html
    /profile.css             # Styling for profile.html
    /style.css               # Extra styling

├── text                     # Folder for html files that are loaded in (nav and footer)
    /nav_after_login.html    # Navbar after user has logged in
    /nav_before_login.html   # Navbar before user has logged in

├── index.html               # Landing page with welcome banner and login
├── login.html               # Login page
├── main.html                # Home page with post feed
├── posting.html             # Posting form page
├── thanks.html              # Thank you msg page after posting
```


