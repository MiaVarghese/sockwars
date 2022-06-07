import dbConnect from '../../lib/dbConnect'
const User = require("../../models/user");

function findPosition(players, matches, d) {
    for (let i=0; i<players.length; i++) {
        if (!players[i]) {
            continue;
        }
        var currUser = players[i];

        if (matches.length===0) {
            matches.push(currUser);
            players[i] = null;
        } else {
            var j=0;
            //loop through possible places to insert in matches
            while (j<matches.length) {
                var k=0;
                //compare to d spaces forward and d spaces back
                while (k<d) {
                    var forward = (j+k)%matches.length;
                    var back = (j-k)-1;
                    while (back<0) {
                        back = matches.length + back;
                    }

                    if (currUser.section===matches[back].section) {
                        break;
                    } else if (currUser.section===matches[forward].section) {
                        break
                    }

                    k++;
                    if (k==d) {
                        matches.splice(j, 0, currUser);
                        players[i]=null;
                        j=matches.length;
                    }
                }
                j++;
            }
        }
    }

    var result = [players, matches];
    return result;
}

function matchTargets(players, d) {
    var matches = [];
    while(matches.length!==players.length) {
        var size = matches.length;
        var result = findPosition(players, matches, d);
        matches = result[1];
        // console.log(matches);
        if (size==result[1].length) {
            return [false];
        }
    }

    return matches;
}

export default async function handler(req, res){
    console.log("here");
    console.log(req.body)
    var matches = matchTargets(req.body.players, 2);
    res.json(matches);
}