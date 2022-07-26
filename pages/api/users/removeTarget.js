import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");
const Game = require("../../../models/game");

export default async function handler(req, res){
    const { gameId, eliminatorUsername, eliminated, newTarget } = req.body;
        //the eliminator username gets passed here
        //the eliminated WHOLE OBJECT gets passed here
        //newTarget is the username of the new target
    try {
        await dbConnect();
        
        await Game.updateOne({_id: gameId,},
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
        );

        var game = await Game.findOne({_id: gameId});
        console.log(game);

        if (game.activePlayers.length===1) {
            //if there is only one player left
            game.status = "ended";
            game.winner = eliminatorUsername;
            await game.save();
            
            var winner = await User.updateOne({userName: eliminatorUsername}, 
                {
                    $inc: {   
                        "statistics.gamesWon" : 1, 
                        "gamesPlayed.$[updateGamesPlayed].eliminated" : 1, 
                        "statistics.eliminations" : 1
                    },
                    $set: {"gamesPlayed.$[updateGamesPlayed].isWinner": true}
                },
                {"arrayFilters": [{"updateGamesPlayed.gameId" : gameId}]}
            );
        } else {
            await User.updateOne(
                {
                    userName: eliminatorUsername,
                }, 
                {
                    $push: {   
                        "gamesPlayed.$[updateGamesPlayed].targets" : newTarget
                    },
                    $inc: {
                        "gamesPlayed.$[updateGamesPlayed].eliminated" : 1
                    },
                    $inc: {
                        "statistics.$[updateGamesPlayed].eliminations" : 1
                    }
                },
                {
                    "arrayFilters": [
                        {"updateGamesPlayed.gameId" : gameId},
                    ]
                }
            );
        }

        await User.updateOne(
            {
                userName: eliminated.userName,
            }, 
            {
                $set: {   
                    "gamesPlayed.$[updateGamesPlayed].isActive" : false
                },
            },
            {
                "arrayFilters": [
                    {"updateGamesPlayed.gameId" : gameId},
                ]
            }
        );

        res.status(201).json("Successfully removed target");
    } catch (err) {
        res.status(500).json({message: err});
    }
}