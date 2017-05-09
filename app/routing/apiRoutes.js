// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends
// ===============================================================================

var friends = require("../data/friends");
var user;

module.exports = function(app) {
    //API GET Requests
    //handles when user "visits a page"
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    app.get("/api/friends", function(req, res) {
        res.json(friends);

    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a friends request... this data is then sent to the server...
    // Then the server saves the data to the friendsData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
        console.log("POST")

        //create a bestMatch Object
        var bestMatch = {
          name: "",
          photo: "",
          variance: 50
        };

        var userData = req.body;
        console.log(userData);
        var userName = userData.name;
        var userPhoto = userData.photo;
        var userScores = userData.scores;

        console.log("Friends");
        console.log(friends)
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            console.log("This is the Friends name: " + currentFriend.name);

            console.log("THIS IS THE FRIEND #"+i+1+" SCORE: " + currentFriend.scores)
            var totalDifference = 0;
            for (var j = 0; j < currentFriend.scores.length; j++) {
                console.log("THIS IS THE FRIENDS SCORE: " + currentFriend.scores[j]);
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(currentFriend.scores[j]));
            }
            console.log("THIS IS THE TOTAL DIFFERENCE: " + totalDifference)

            if (totalDifference <= bestMatch.variance) {

                // Reset the bestMatch to be the new friend.
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.variance = totalDifference;
            }
        }
        console.log("Your new best friend is: " + bestMatch.name)
        console.log("With a Difference score of: " + bestMatch.variance)
        res.json(bestMatch)
        console.log("=======================")
        console.log("=======================")
        console.log("=======================")



        // var totalVariance = 0;

        // for (var i = 0; i < userData.length; i++){
        //  console.log("THIS IS FRIENDS NAME: " + userData[i].name);
        // }

        // assign id to the name
        // create an array of ids called userArray
        //create scoreArray for each id
        //push all results into an object
        // loop through userarray and print scoresArray for each user
        //
        // req.body.scores and each instance of friendsData[i].scores


        //

    });
};
// console.log(friendsData);
