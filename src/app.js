//* Dependencias
const express = require("express");
const passport = require("passport");
const path = require("path");

require("./middleware/auth.middleware")(passport);

//* Variables de entorno
const { port } = require("./config");

//* Archivos de rutas
const userRouter = require("./users/users.routes").router;
const authRouter = require("./auth/auth.routes").router;

const { db } = require("./utils/database"); //* Sequelize

//* Configuraciones iniciales
const app = express();

//* Authenticate database credentials
db.authenticate()
    .then(() => console.log("Database Authenticated"))
    .catch(err => console.log(err));

db.sync()
    .then(() => console.log("Database synced."))
    .catch(err => console.log(err));

app.use(express.json()); //? Esta configuración es para habilitar el req.body

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/uploads/:imgName", (req, res) => {
    const imgName = req.params.imgName;
    res.status(200).sendFile(path.resolve("uploads/") + "/" + imgName);
});

app.get(
    "/ejemplo",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.status(200).json({
            message: "credenciales",
            email: req.user.email,
        });
    }
);

app.listen(port, () => {
    console.log(`Server "Kame House" started at port ${port}`);
});
