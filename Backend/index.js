import express from "express";
import {
  addBooking,
  deleteBooking,
  getBooking,
  getBookingById,
  updateBooking,
} from "./database.js";
import cors from "cors";

const app = express();
const port = process.env.NODE_PORT || 3001; //port-binding
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, () => {
  console.log(`app listing on port ${port}`);
});

app.get("/get-booking", async (req, res) => {
  const result = await getBooking();
  result
    ? setSuccessResponse(res, result, "success")
    : setFailureResponse(res, result, "No Booking Found");
});

app.get("/get-booking/:id", async (req, res) => {
  const result = await getBookingById(req.params.id);
  result
    ? setSuccessResponse(res, result, "success")
    : setFailureResponse(res, result, "No Booking Found");
});

app.post("/add-booking", async (req, res) => {
  const { name, date, hours } = req.body;
  if (name && date && hours) {
    const result = await addBooking(req.body);
    const { data, message, pass } = result;
    pass
      ? setSuccessResponse(res, data, message)
      : setFailureResponse(res, data, message);
  } else {
    setFailureResponse(res, {}, "Somthing Went Wrong");
  }
});

app.post("/update-booking", async (req, res) => {
  const { id, name, date, hours } = req.body;
  if (id && name && date && hours) {
    const result = await updateBooking(req.body);
    result
      ? setSuccessResponse(res, result, "success")
      : setFailureResponse(res, result, "Somthing Went Wrong");
  } else {
    setFailureResponse(res, {}, "Somthing Went Wrong");
  }
});

app.delete("/delete-booking/:id", async (req, res) => {
  if (req.params.id) {
    const result = await deleteBooking(req.params.id);
    result
      ? setSuccessResponse(res, result, "success")
      : setFailureResponse(res, result, "Booking Not Cancelled");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ returnCode: 500, data: {}, message: "Something broke!" });
});

function setSuccessResponse(response, result, msg) {
  const res = { returnCode: 200, data: result, message: msg };
  response.set({
    "Content-type": "application/json",
  });
  response.status(200).json(res);
}

function setFailureResponse(response, result, msg) {
  const res = { returnCode: 400, data: result, message: msg };
  response.set({
    "Content-type": "application/json",
  });
  response.status(400).json(res);
}
