import express from "express"; 
import {
  addOrder,
  getorders,
  getmyorders,
  getorderById,
  payorder,
  deliverorder
} from "../controller/ordercontroller.js";

import { checkAuth } from "../middleware/checkAuth.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();

router.post("/", checkAuth, addOrder);
router.get("/", checkAuth, checkAdmin, getorders);
router.get("/myorder", checkAuth, getmyorders);
router.get("/:id", checkAuth, getorderById);
router.put("/pay/:id", checkAuth, payorder);
router.put("/deliver/:id", checkAuth, checkAdmin, deliverorder);

export default router;

