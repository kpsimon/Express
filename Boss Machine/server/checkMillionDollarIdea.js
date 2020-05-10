const checkMillionDollarIdea = (req, res, next) => {
    const worth = Number(req.body.numWeeks) * Number(req.body.weeklyRevenue);
    if(numWeeks && weeklyRevenue && !isNaN(worth) && worth >= 1000000)
    {
        next();
    }
    else
    {
        res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
