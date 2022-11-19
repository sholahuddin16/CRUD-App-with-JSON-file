import express from "express";
import fs from "fs";
import { createAccount, deleteAccountData, filterDataAccount, filterDataSample, getDataAccount, getDataSample, updateAccountData } from "../Controllers/readData.js";

const router = express.Router();

//sample
router.get('/sample', getDataSample);
router.get('/sample/filter', filterDataSample);

//account
router.get('/account', getDataAccount);
router.get('/account/filter', filterDataAccount);
router.post('/account/add', createAccount);
router.patch('/account/update/:username', updateAccountData);
router.delete('/account/delete/:username', deleteAccountData);

export default router;