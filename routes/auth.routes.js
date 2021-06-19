const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');

module.exports = function(app) {

    console.log("in the auth.routes js");
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsername,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/populateInfo", controller.populateInfo);

    app.post("/api/auth/updateSpin", controller.updateSpin);

    app.post("/api/auth/updateFactory", controller.updateFactory);

    app.post("/api/auth/updateWoods", controller.updateWoods);

    app.post("/api/auth/updateCustoms", controller.updateCustoms);

    app.post("/api/auth/updateInterchange", controller.updateInterchange);

    app.post("/api/auth/updateReserve", controller.updateReserve);

    app.post("/api/auth/updateShoreline", controller.updateShoreline);

    app.post("/api/auth/updateLab", controller.updateLab);
    
    app.post("/api/auth/removeFavorite", controller.removeFavorite);

    app.post("/api/auth/addFavorite", controller.addFavorite);

    app.post("/api/auth/updateEmail", controller.updateEmail);

    app.post("/api/auth/updateUsername", [
        verifySignUp.checkDuplicateNewUsername
    ], controller.updateUsername);
};