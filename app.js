const express = require("express");
var cors = require("cors");
var logger = require("morgan");
var dotenv = require("dotenv");
var helmet = require("helmet");
const session = require('express-session');
const { authJwt, emailMdw, errorHandler, ware } = require("./auth/middleware");
const emailRouter = require("./email/email.route");
const smsRouter = require("./sms/sms.route");

const { sequelize } = require("./models");
const {
  companyRouter,
  mediaRouter,
  parameterRouter,
  vehicleRouter,
  addressRouter,
  productRouter,
  productItemRouter,
  proposalRouter,
  offerRouter,
  processRouter,
  processItemRouter,
  processGroupRouter,
  processSubGroupRouter,
  menuRouter,
  companyApprovalRouter,
} = require("./src/api.router");

dotenv.config();

const port = process.env.PORT || 3300;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(helmet());

// middleware
app.use(authJwt.setHeader);
//app.use(authJwt.verifyToken);
//app.use(authJwt.isAdmin);

 // yeni bir redis istemcisi oluşturduk
 //const client = redis.createClient();
 // oturum modeli
 app.use(session({
     secret: "user_id",
     resave: true,
     saveUninitialized: true,
 }));

app.use("/company", companyRouter);
app.use("/media", mediaRouter);
app.use("/parameter", parameterRouter);
app.use("/vehicle", vehicleRouter);
app.use("/address", addressRouter);
app.use("/product", productRouter);
app.use("/product-item", productItemRouter);
app.use("/proposal", proposalRouter);
app.use("/offer", offerRouter);
app.use("/process", processRouter);
app.use("/process-item", processItemRouter);
app.use("/process-group", processGroupRouter);
app.use("/process-sub-group", processSubGroupRouter);
app.use("/menu", menuRouter);
app.use("/company-approval", companyApprovalRouter);

//mail-sms
app.use("/api/email", emailRouter);
app.use("/api/sms", smsRouter);

//auth
//routes
require("./auth/routes/auth.routes")(app);
require("./auth/routes/user.routes")(app);


//app.use(emailMdw.send);

//helmet bu işlemi de yapıo
//app.disable('x-powered-by'); // güvenlik gerekçesiyle server tipi gönderilmiyor

if (process.env.NODE_ENV === "docker") {
  const { db } = require("./models");
  db.sync({ force: true }).then(() => {
    console.log("Drop and Resync Database with { force: true }");
  });
}
app.use(ware);

app.use(errorHandler);



app.listen({ port }, async () => {
  console.log("Server up on http://localhost:" + port);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
