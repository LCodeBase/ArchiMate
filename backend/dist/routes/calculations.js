"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calculations_1 = require("../controllers/calculations");
const router = (0, express_1.Router)();
router.post('/wall', calculations_1.calculateWall);
router.post('/slab', calculations_1.calculateSlab);
exports.default = router;
