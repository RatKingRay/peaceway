# Peaceway

## Overview
---
When you're in a certain mood it's difficult to remember what helps you get into a better state of mind. Peaceway is an app that features customizable exercise menus, an interface for creating notes and reminders, and a place to keep track of your weekly budget.

### Exercise
The exercise page features a drop-down menu of emotions that will load the user's set of notes or instructions they like to be reminded of when they're feeling a certain mood. Next to the display box is a form that allows the input of additional notes/instructions to the currently selected emotion menu.

### Notes
This page allows each user to input however many notes they'd like, view previously created notes, and delete any note. There is also an option to select if a note in creation is more of a "venting" note that the user might not want to stay around permanently.

### Budget
This page allows each user to enter the amount of money they'd like to limit themselves to spending each week. This weekly allowance is then displayed and another form allows for the inputting of how much money a user has spend so far which will update the currently displayed budget value. Another button resets the current budget value as if a new week has started.

### User Pages

Pages like login and register allow users to sign up for the application with their own account. A profile page additionally allows users to edit their email and password.

## Roadmap
---
Future additions will include the following:
* Being able to add custom emotions for the exercise tables
* Adding the functionality for notes to automatically wipe after several hours if the option "Is this a vent?" is ticked.
* After 7 days from the budget's creation it will automatically refresh with the current weekly budget allowance and subtract the previous week's carryover if the value was in the negative range

## Installation
---
1. Download [node.js](https://nodejs.org/en/) 
2. Download [MySQL](https://dev.mysql.com/downloads/mysql/) for your operating system using default settings, make note of your username and password
3. Navigate to where you downloaded the Peaceway project files
4. Install the following dependecies
```bash
npm init
```
```bash
npm install dotenv
```
```bash
npm install express
```
```bash
npm install mysql2
```
```bash
npm install nodemon --save-dev
```
5. Create a file named `.env` in the top level of the folder and insert the following code with the MySQL installation information from step 2
```bash
MYSQL_USERNAME = yourUsernameHere
MYSQL_PASSWORD = yourPasswordHere
MYSQL_HOST = "localhost"
MYSQL_DATABASE = "web_db"
```
6. Finally, run the application by navigating to the Peaceway directory and running
```bash
npm run dev
```

## Software Used
---
### Front-end
* HTML
* CSS
* Javascript

### Back-end
* Dotenv
* Express
* Nodemon
* MySQL
* Node.js

### Misc
* Visio (for ER diagram creation)
* Word (For ER rules)
* Visual Studio Code

## ERD Screenshot
---
![Project ER Diagram](https://ibb.co/k8NdzQm)
* **Exercise:** 5 empty exercises are created by default for each user and are identified with the use of a foreign key. Each table has a unique emotion stored in the *exercise_mood* field consisting of: *sad*, *anxious*, *bored*, *happy*, and *angry*. 0-5 of the available tables may be updated by the user with information stored in the *instructions* field.

* **Note:** Notes are associated with the user who created them through use of a foreign key. Content for note submission is stored in the *content* field, and a date of creation along with the *is_vent* field will be used in future versions to automatically delete the indicated note entry after a span of several hours.

* **Budget:** Each user is associated with an empty budget table through the user of a foreign key. The table can be updated with the weekly allowance stored in the *weeklyLimit* field, and the current amount for each week is stored in the *WeeklyCurrent* field. By default this field is equal to the value of the *weeklyLimit* allowance, and then any deductions are subtracted and the value is then stored. The *lastWeekCarryover* will be used in future versions so that at the start of a new week if the user went over budget and the *weeklyCurrent* went into negative values the new week will be started with weekly allowance minus last week's debt.

* **User:** Basic information about the user is stored here. Some data may be updated in the profile page.

## Demo Screenshots
---
### Registration Page
![Registration page](https://ibb.co/H7T35ZG)

### Login Form
![Login Form](https://ibb.co/wSBFQ4D)

### Profile Forms
![Profile Forms](https://ibb.co/179pkp0)

### Note Page
![Note Page](https://ibb.co/bRkkhs7)

### Exercise Page
![Exercise Page](https://ibb.co/ryVN3vC)

### Budget Page
![Budget Page](https://ibb.co/dWgGRpJ)

## Known Issues
---
* Primary keys are not included in every table as they led to some error in table creation, but are not necessary.
* Currently doesn't seem to work on FireFox for unknown reasons
* The styling for the notes page is not designed to handle large inputs, and should at some point be updated with responsiveness to large amount of characters