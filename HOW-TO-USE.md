*This file looks best in a markdown previewer such as GitHub!*  
[*Show me on GitHub!*](https://github.com/micah-dev/ninerflow/blob/main/README.md)  

# NinerFlow

NinerFlow is a UNCC campus intelligence tool designed for students, staff, and visitors. NinerFlow gives users the ability to find the shortest path between buildings, explore professor ratings, see local weather and more- all within Discord.

***
### Available commands:

**TIPS:**
* NinerFlow uses Discord's Slash Commands, a powerful way to interact with Discord bots and applications.
* Slash Commands provide auto-complete, syntax-suggestions, and information about the command as you are typing it.
* To take full advantage of Slash Commands, use `enter` to jump to the next parameter and `tab` to accept a suggestion.

**NOTES:**  
* NinerFlow often replies with an embeded message containing an image. This image is meant to be seen on mobile devices, but still works on a desktop. If using NinerFlow on a desktop, simply click the `View on Web` button at the bottom of the message.

**KNOWN BUGS:** 
* The `/walk` command currently supports all buildings on campus (see `buildingdata.json`), however, some buildings cause the Google API to reply with an endpoint message longer than 2000 characters. Unfortunately, Discord does allow any messages to be over 2000 characters. To combat this, we have work arounds in place to headlessly launch a browser and take a screenshot of the reply and send the image instead. Occasionally, this fails and NinerFlow will respond with an error message, but it should not crash the client.
* The `/rate` command may cause the client to crash in some instances due to the ratemyprofessors.com website frequently changing div containers. Ninerflow may occasionally respond with an error message, but it should not crash the client.

---
#### `/help`
* Shows all available commands and basic usage.
* Ex: `/help`

<img src="https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif" width="400"/>


---
#### `/events`
* Shows UNCC calendar events, or optionally more specific events.
* Ex: `/events`  Sends all events.
* Ex: `/events recreation`  Sends recreation events.
* Ex: `/events social`  Sends social events.
* Ex: `/events entertainment`  Sends entertainment events.
* Ex: `/events info`  Sends information session events.

---
#### `/weather`
* Shows UNCC local weather.
* Ex: `/weather`

---
#### `/links`
* Shows useful web resources from NinerNet.
* Ex: `/links`

---
#### `/food`
* Shows nearby campus dining options.
* Ex: `/food`

---
#### `/walk`
* Shows the fasted walking path between two buildings a and b.
* Usage: `/walk <origin> <building>`
* Ex: `/walk Fretwell Burson`

---
#### `/bus`
* Shows UNCC bus routes.
* Ex: `/bus`

---
#### `/rate`
* Shows a professor's UNCC ratemyprofessor profile.
* Usage: `/rate <professor_name>`
* Ex: `/rate James Rudd`
* Ex: `/rate Jasmine Strickland`
* Ex: `/rate Amy Good`

---
#### `/todo list` `/todo new` `/todo delete` `/todo clear`
* Create and maintain a todo list to keep track of important tasks.

**Create a todo task:**
* Usage: `/todo new <name> <due_date> <due_time>`
* Ex: `/todo new Take out the trash 11/23/2021 11pm`

**View your todo list:**
* Usage: `/todo list`

**Delete a todo item:**
* Usage: `/todo delete <item_id>`
* Ex: `/todo delete 4`

**Delete all items in your todo list:**
* Usage: `/todo clear`

---
#### `/class list` `/class new` `/class delete` `/class clear`
* Create and maintain a class schedule to stay on top of class times.

**Create a class:**
* Usage: `/class new <name> <days_active> <start_time> <end_time>`
* Ex: `/class new Machine Learning MWF 10:10 AM 1:10 PM`

**View your classes:**
* Usage: `/class list`

**Delete a class:**
* Usage: `/class delete <item_id>`
* Ex: `/class delete 2`

**Delete all classes:**
* Usage: `/class clear`


---
#### `/brief`
* Sends the output of frequently used commands for ease-of-use.

**See your brief:**
* Usage: `/brief`

**Configure your brief preferances:**
* Usage: `/brief <enable_class_list> <enable_todo_list> <enable_weather> <enable_news>`
* Ex: `/brief True True True False`

---
#### `/privacy`
* Shows NinerFlow's privacy policy.
* Usage: `/privacy`
