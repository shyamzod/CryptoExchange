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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const dbclient = new client_1.PrismaClient();
function InsertNewUser(userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(userdata);
            if (userdata != undefined || userdata != null) {
                const result = yield dbclient.userBankBalance.create({
                    data: {
                        Branch: userdata.Branch,
                        username: userdata.username,
                        BankBalance: userdata.BankBalance,
                    },
                });
                return result.Id;
            }
        }
        catch (_a) {
            console.log("Error Occured while adding user in db");
        }
    });
}
function UpdateBankBalane(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingBalance = yield dbclient.userBankBalance.findFirst({
                where: { username: user.username },
                select: {
                    BankBalance: true,
                },
            });
            const newBalance = (existingBalance === null || existingBalance === void 0 ? void 0 : existingBalance.BankBalance) === undefined ||
                (existingBalance === null || existingBalance === void 0 ? void 0 : existingBalance.BankBalance) == null
                ? user.moneytoadd
                : existingBalance.BankBalance + user.moneytoadd;
            yield dbclient.userBankBalance.update({
                where: {
                    username: user.username,
                },
                data: { BankBalance: newBalance },
            });
            return true;
        }
        catch (_a) { }
    });
}
app.post("/AddMoneyToBank", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const result = yield UpdateBankBalane(body);
    if (result) {
        res.status(200).json({
            message: "Money added to Bank Account",
        });
    }
    else {
        res.status(411).json({ message: "Adding Money Failed to Bank Account" });
    }
}));
app.post("/CreateBankAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield InsertNewUser(body);
    res.status(200).json({ message: "New User Created" });
}));
app.listen(3000, () => {
    console.log("App is running");
});
