# Technical Assessment 
This technical assessment was written as a single-page webapp using the React framework.

## Node packages used 
* react, react-dom, react-scripts, react-router-dom
* react-bootstrap-icons (icon library)
* d3 (for the graphs)
* react-redux, redux, @reduxjs/toolkit (for storing comments)
* enzyme, enzyme-adapter-react-16, jest (for testing)

## Installation and running
To run the app you'll need to install Node.js from [here](https://nodejs.org/en/)
1. Download the repository and extract it to your desktop.
2. From a CLI, run the command "npm install" and let it install all the packages.
3. Once installed, run the command "npm start" and the app should open on a new tab in your browser. If it doesn't, go to http://localhost:3000

## My approach
* Started off creating blank node project using npm init. Then, from a project I had done on my own, I copied over some basic files and folders, namely the public folder and the things I needed out of the src folder.
* Read over the spec provided and tried to figure out what components I'd need to build it. Tried to make sense of the data and  imagine what business would have this sort of logic. Tried to figure out structure of the data the graphs are using.
* After that, I got started with programming. I added the components for the different pages and the Header. 
* The Header was the first thing I made. I just added all the elements I'd need and didn't worry too much about the styles.
* The Home page was next. I added the headings and buttons, and got started on the GraphView. 
* To be able to test the graphs, I created some random data in JSON format. I put the file in a data folder within src and called it newOrders.json
* Generating the graphs was a bit of a challenge as I hadn't touched D3.js in years but it wasn't too bad to get them up and running.
* After the 2 small graphs, I added the Orders over Time view. As you had requested to see AJAX be used to fetch json data and that data be used to generate graphs, I got to searching for data. I found a public api on [Coingecko](https://api.coingecko.com/api/v3/coins/bitcoin-cash/market_chart?vs_currency=eur&days=60&interval=daily) and used it to fetch the last 60 days of BCH price, in euro, and made a graph out of it.
* For the comments section, I used a public api to fetch [cat facts](https://cat-fact.herokuapp.com/facts) in order to simulate previous comments left by buyers. For the "buyer" images, I pull images from a public api for [random kitten images](http://placekitten.com/200/300).
* The comments, once fetched are stored in a redux store, and then rendered in the CommentSection component.
* The Customers page works simply as a way to add reviews (comments). You select whether you want to leave a star rating or a comment or both, and when you hit Submit, the comment gets added to the redux store. It is rendered at the bottom of the comments section the next time you visit the Home page.

## What I would do differently
* The way I generate the tooltip on the Orders over Time graph isn't great. I basically append pieces of an svg to the focus area every time the cursor moves. I tried to see how it would react on a graph with more data and it crashed the app. Next time around I'd try to figure out a different way to do this.
* If I had more time I would add functionality to the New view and Create new report buttons. I had a plan for the New view button to display a form within a modal where the user would select the different attributes for a new GraphView. I was also thinking the search bar could be used to search comments.
* The pages under the Units section I wasn't too sure about but I would have tried to implement at least something for them.
