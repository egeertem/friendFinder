const _ = require('lodash');
const friends = require('../data/friends.js');
console.log("friends is >>>", friends);
let friendsScores = _.reduce(friends, (arr, friend) => {
    arr.push(friend.scores);
    return arr;
}, [])
console.log("friendsSocre is >>>", friendsScores);
module.exports = function(app) {
    app.post('/api/friends', (req, res) => {

        console.log("req.body>>>", req.body);
        let myScore = _.reduce(_.get(req.body, 'survey', []), (memo, question) => {
            console.log("question is>>>", question);
            memo.push(question.selection);
            return memo;
        }, []);

        let scoresDifference = _.reduce(friendsScores, (scoreArray, friend) => {
            scoreArray.push(calcDifference(myScore, friend));
            return scoreArray;
        }, [])
        console.log("myScore is >>>", myScore);
        console.log("scoreDifference is >>>", scoresDifference);
        let lowestIndex = findLowestScoreIndex(scoresDifference);
        console.log("lowest is >>>", friends[lowestIndex]);
        res.json(friends[lowestIndex]);
    })
};

const calcDifference = (person1, person2) => {
    const sum = _.reduce(person1, (total, score, i) => {
        return total + Math.abs((+person1[i]) - (+person2[i]))
    }, 0);
    return sum;
}

const findLowestScoreIndex = scores => {
    return _.reduce(scores, (minIndex, score, i) => {
        if (score < scores[minIndex]) {
            return i;
        } else {
            return minIndex;
        }
    }, 0)
}