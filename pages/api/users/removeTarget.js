import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");
const Game = require("../../../models/game");

export default async function handler(req, res){
    const { gameId, eliminatorUsername, eliminated, newTarget } = req.body;
        //newTarget is the username of the new target
    try {
        await dbConnect();
        /*var eliminator;
        var g;
        try {
            eliminator = await User.findOne({userName: eliminatedUsername});
            g = await Game.findOne({_id: gameId});
        } catch(err) {
            return res.status(500).json({message: err.message});
        }*/
        
        try {
            await User.updateOne(
                {
                    userName: eliminatorUsername,
                    /*gamesPlayed: {
                        "$elemMatch": {
                            gameId: gameId
                        }
                    }*/ //Do not need elem match with array filters?
                }, 
                {
                    $push: {   
                        "gamesPlayed.$[updateGamesPlayed].targets" : newTarget
                    },
                    $inc: {
                        "gamesPlayed.$[updateGamesPlayed].eliminated" : 1
                    }
                },
                {
                    "arrayFilters": [
                        {"updateGamesPlayed.gameId" : gameId},
                    ]
                }
            );
            await Game.updateOne(
                {
                    _id: gameId,
                },
                {
                    $pull: {   
                        activePlayers : { userName: eliminated.userName }
                    },
                    $push: {
                        eliminatedPlayers : {
                            id: eliminated._id,
                            username: eliminated.userName,
                            section: eliminated.section,
                            eliminator: eliminatorUsername
                        }
                    }
                },
            )
            res.status(201).json("Successfully removed target");
        } catch(err) {
            return res.status(400).json({message: err.message});
        }

        // const result = await PlayerStatus.insertMany(players);
        // User.updateMany({userName: {$in: names}}, {$push: {gamesPlayed: {
        //     gameId: gameId,
        //     targets: [matches[(matches.find(userName)+1)%matches.length].userName],
        //     eliminated: 0,
        //     isActive: true,
        //     isWinner: false
        // }}});
        // // console.log(result);
        res.status(201).json("Successfully removed target");
    } catch (err) {
        res.status(500).json({message: err});
    }
}