const {
    getMovieAndActor,
    checkMovieAndActor,
  } = require('../services/collections.service');
  
    /**
     * Get Movie and Actor
     */
    const getMovieAndActorHandler = async (_req, res, next) => {
    try {
        const collections = await getMovieAndActor();
        res.status(200).send(collections);
    } catch (err) {
        next(err);
    }
    };
    
    /**
     * Check the answer
     */
     const checkMovieAndActorHandler = async (req, res, next) => {
      try {
          const {id_film, id_actor} = req.body;
          const answer = await checkMovieAndActor(id_film, id_actor);
          res.status(200).send(answer);
      } catch (err) {
          next(err);
      }
      };
  
  module.exports = {
    getMovieAndActorHandler,
    checkMovieAndActorHandler,
  };
  