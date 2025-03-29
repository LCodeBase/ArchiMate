"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSlab = exports.calculateWall = void 0;
const calculations_1 = require("../services/calculations");
const calculateWall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dimensions = req.body;
        const result = (0, calculations_1.calculateWallMaterials)(dimensions);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao calcular materiais da parede' });
    }
});
exports.calculateWall = calculateWall;
const calculateSlab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dimensions = req.body;
        const result = (0, calculations_1.calculateSlabMaterials)(dimensions);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao calcular materiais da laje' });
    }
});
exports.calculateSlab = calculateSlab;
