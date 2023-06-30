const express = require("express");
import * as functions from "firebase-functions";



export const testUserApp = express();

testUserApp.post("/", async (req, res) => {

    functions.logger.debug("CALLING ENDPOINT TEST FUNCTION")

    try {
        res.status(200).json({ message: "SUCCESSFUL TEST" })
    } catch (err) {
        functions.logger.debug("TEST FAILED (somehow...)")
        res.status(500).json({ message: "TEST FAILED (somehow...)" })
    }

})