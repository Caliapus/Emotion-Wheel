# Emotions List
> A webapp meant to trace and to monitor the emotions we're experiencing daily.
If you're like me, andf like many others, you suck at identifying and expressing what you're feeling exactly. And that leaves room to interpretations and labeling. To tacke a small part of this problem, **Emotions List** is an interactive web application that allows to daily monitor the emotions. You can navigate from a core emotion to its associated feelings and precise feelings, providing a way to understand, categorize and monitor your emotional experiences. The structure is taken from this wheel of emotions:

![wheel of emotions](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Emotions_wheel.png/484px-Emotions_wheel.png)

# How it works 

You start by chosing your basic emotion, then choose the feeling closest to what you feel and finish by picking one of the two the precise feelings indicated. You can have multiple emotions in the same time. It's ok.   
Each time the submit button is pressed, a line is added in feelings .csv with the date and the selected feelings. 
 
 :construction: Demo site
 :construction: Screenshots

The classification of the emotions, taken directly from the wheel of emotions is kept in the **emotion-data.js** file. 

# How can I use it
1. Check out the :construction: demo site 
2. Clone the repository to your local machine or to your web server. Open index.html in a web browser to start exploring emotions.
When the submit button is pressed, if PHP is (correctly) installed, a **feelings.csv** file should be saved . 

# Work in progress
- write a proper README.md
- make the interface more presentable
- limit the number of emotions to be submited
- change the mechanics to make it nicer
- add the hour to the submitted feeling(s) 
  
