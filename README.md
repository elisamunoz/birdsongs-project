# Birdsongs of the World.

Birdsongs of the World is a website dedicated to sharing bird sounds from all over the world. Whether you are a research scientist, a birder, or simply curious about a sound you heard out the window, we invite you to listen, download, and explore the bird sound recordings in the collection. This website has been possible thanks to the [Xeno-Canto Api](https://www.xeno-canto.org/article/153).

## UX

My goal is to create a user-friendly interactive frontend development project. The color scheme was taken from the predominant colours of the picture in the Home section.

![Home section](https://github.com/elisamunoz/birdsongs-project/blob/master/assets/images/mockup-images/multi-device-mockup.png)

I used [Moqups](https://moqups.com/) to do the previous design of this project. [Here is the link for the mockups](https://github.com/elisamunoz/birdsongs-project/tree/master/assets/images/mockup-images).
The sections of the website are:

### Home:

For this section I wanted to create a simple landing page, for this I took [Google](https://www.google.com) as main inspiration. On this section I created a dropdown with a list of countries and a search bar where you can search birds by genus or scientific name or even a combination of them. It also has an extra button which I named “Surprise me” button, when pressing it gives a random bird from a small list I created previously. The buttons call the API and renders the information in the next sections.

#### Search result:

This section shows the result of the search made at the Home screen. It shows the information in a table using the [Data Table](https://datatables.net/) and modifying it. This table shows birds from a country or genus in particular. When pressing “more” sends you to the Bird File section.

#### Bird file:

In here you can find more information about the recording chosen, a player where you can listen to the chosen bird and a map showing where the recording was taken.

### About:

Here is where I have a small summary of the Readme file.

### Surprised?:

In this section you can see images of the 5 birds I chose for the "Surprise Me" button.

## Technologies

- HTML
- CSS
- Javascript
- JQuery
- Bootstrap (4.3.1)
- Font Awesome (5.11.2)
- Google Fonts
- Google Maps API
- Data Table

## Features

- Connects to a third party API to obtain data and geolocate some of the information using Google Maps
- DOM creation
- Transparent to Solid navbar
- Smoothie scroll to a specific element
- Parallax effect

## Testing

- Error message when pressing "Search" button with search fields empty
- "No data available message" when the information is not found in the API
- An image is shown in replace of Google Maps when location is not available in the API 

Since I started the project and after every modification, I have tested the website for mobile and desktop size using Chrome Dev Tool, I have also tested it on my mobile device. Once I finished the sections, I tested for every link I have clicking on them. To test user experience I sent the link of the project to my family and friends I validated the HTML code using the [W3C Markup Validation Service](https://validator.w3.org/).

## Deployment

My project was made using Visual Studio and I used GitHub to create an external version control repository to create back ups in case of unexpected major errors.

- I created a new workspace in Visual Studio, creating all files and folders necessary.
- Imported the libraries I was going to use
- Created a new repository in GitHub making regular commits and push to save my work.
- This project is hosted and deployed using GitHub pages. The link to my website is: [Birdsongs of the World](https://elisamunoz.github.io/birdsongs-project/)

To run this project locally:

- Click on the “Clone or Download” button
- Copy the URL
- Open a bash terminal and move it to a directory
- Type “git clone” and paste the URL

## Credits

This website has been possible to the [Xeno-Canto API](https://www.xeno-canto.org/article/153). All images were taken from [Pixabay](https://pixabay.com/) and [Google Images](https://images.google.com/).

[Lost bird image](https://github.com/elisamunoz/birdsongs-project/blob/master/assets/images/lostbird.jpg) was taken from [this website](https://www.behance.net/gallery/51327889/Tourist-Pigeon) and modified by my friend Noemi Fernandez to adapt it to my project.

Features were taken and modified from these websites:

- Transparent to Solid navbar: [Codepen Pen](https://codepen.io/sonorangirl/pen/XmRBjq).
- Smoothie scroll to a specific element: [A Beautiful Site](https://www.abeautifulsite.net/smoothly-scroll-to-an-element-without-a-jquery-plugin-2)
- Parallax effect: [Codepen Pen](https://codepen.io/corneliuslabuschagne/pen/rNaNgdB?editors=1000)
