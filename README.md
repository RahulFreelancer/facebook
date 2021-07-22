# facebook
Facebook clone project
there are 2 seprate things in this project 1 expressBackend -which is the express server and second is facebook -which is nextjs built facebook clone
here is step by step guide to clone and run this project locally 

step 1 clone the repo https://github.com/RahulFreelancer/facebook/new/master

install vsCode as your code editor ---recommended

open the terminal inside vscode and follow the steps 

step 2 go to facebook folder and install the dependencies through npm 

step 3 now go to expresBackend and install the dependencies

step 4 now install mongodb, in your local machine and also gui mongoDb compass for viewing your database 

step 5 open cmd and start your mogo database server type  "mongod --replSet rs0"

step 6 now go to facebook folder and start the dev server by typing npm run dev 
NOTE- make sure you your server gets start on port 3000 ...otherwise you have to make changes to each component manually ..

step 7 now go back to expressBackend folder with new terminal in vscode and type nodemon app.js to start your express server ;

....boom .......now go to localhost:3000 ...here is our working facebook application ...

express server is for realtime capabilities like socket connections ......


