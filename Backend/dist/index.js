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
            const result = yield dbclient.userBankBalance.update({
                where: {
                    username: user.username,
                },
                data: { BankBalance: newBalance },
                select: {
                    BankBalance: true,
                },
            });
            return result;
        }
        catch (_a) { }
    });
}
function GetUserBalance(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(username);
            const result = yield dbclient.userBankBalance.findFirst({
                where: {
                    username,
                },
                select: {
                    BankBalance: true,
                },
            });
            console.log("This is userbalance" + result);
            return result === null || result === void 0 ? void 0 : result.BankBalance;
        }
        catch (_a) { }
    });
}
function CreateWallet(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbclient.userWallet.create({
                data: { username: username, BTCBalance: 0, USDTBalance: 0.0 },
            });
        }
        catch (_a) { }
    });
}
function BuyAsset(datatoupdate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingvalues = yield dbclient.userWallet.findFirst({
                where: {
                    username: datatoupdate.username,
                },
                select: {
                    BTCBalance: true,
                    USDTBalance: true,
                },
            });
            const result = yield dbclient.userWallet.update({
                where: {
                    username: datatoupdate.username,
                },
                data: {
                    BTCBalance: (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance) === undefined
                        ? datatoupdate.BTC
                        : (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance) + datatoupdate.BTC,
                    USDTBalance: (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance) === undefined
                        ? existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance
                        : existingvalues.USDTBalance - datatoupdate.BTC * 100,
                },
            });
            return result;
        }
        catch (_a) { }
    });
}
function SellAsset(datatoupdate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingvalues = yield dbclient.userWallet.findFirst({
                where: {
                    username: datatoupdate.username,
                },
                select: {
                    BTCBalance: true,
                    USDTBalance: true,
                },
            });
            const result = yield dbclient.userWallet.update({
                where: {
                    username: datatoupdate.username,
                },
                data: {
                    BTCBalance: (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance) === undefined
                        ? existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance
                        : (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance) - datatoupdate.BTC,
                    USDTBalance: (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance) === undefined
                        ? existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance
                        : (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance) + datatoupdate.BTC * 100,
                },
            });
            return result;
        }
        catch (_a) { }
    });
}
app.post("/AddMoneyToBank", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const result = yield UpdateBankBalane(body);
    console.log(result);
    if (result) {
        res.status(200).json({
            message: "Money added to Bank Account",
            BankBalance: result.BankBalance,
        });
    }
    else {
        res.status(411).json({ message: "Adding Money Failed to Bank Account" });
    }
}));
app.post("/CreateBankAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield InsertNewUser(body);
    yield CreateWallet(body.username);
    res.status(200).json({ message: "New User Created" });
}));
app.get("/getUsdtBalance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    console.log(username);
    const result = yield GetUserBalance(username);
    console.log(result);
    res
        .status(200)
        .json({ message: "User Balance Fetched", BankBalance: result });
}));
app.post("/BuyAsset", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield BuyAsset(body);
    res.status(200).send({ message: "Assets Updated in db" });
}));
app.post("/SellAsset", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield SellAsset(body);
    res.status(200).send({ message: "Assets Sold are updated in db" });
}));
app.listen(3000, () => {
    console.log("App is running");
});
