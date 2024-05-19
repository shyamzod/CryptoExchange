import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors());
app.use(express.json());

const dbclient = new PrismaClient();

interface user {
  Branch: string;
  username: string;
  BankBalance: number;
}
interface AddMoneyToBank {
  username: string;
  moneytoadd: number;
}

async function InsertNewUser(userdata: user) {
  try {
    console.log(userdata);
    if (userdata != undefined || userdata != null) {
      const result = await dbclient.userBankBalance.create({
        data: {
          Branch: userdata.Branch,
          username: userdata.username,
          BankBalance: userdata.BankBalance,
        },
      });
      return result.Id;
    }
  } catch {
    console.log("Error Occured while adding user in db");
  }
}

async function UpdateBankBalane(user: AddMoneyToBank) {
  try {
    const existingBalance = await dbclient.userBankBalance.findFirst({
      where: { username: user.username },
      select: {
        BankBalance: true,
      },
    });
    const newBalance =
      existingBalance?.BankBalance === undefined ||
      existingBalance?.BankBalance == null
        ? user.moneytoadd
        : existingBalance.BankBalance + user.moneytoadd;
    await dbclient.userBankBalance.update({
      where: {
        username: user.username,
      },
      data: { BankBalance: newBalance },
    });
    return true;
  } catch {}
}

app.post("/AddMoneyToBank", async (req, res) => {
  const body = req.body;
  console.log(body);
  const result = await UpdateBankBalane(body);
  if (result) {
    res.status(200).json({
      message: "Money added to Bank Account",
    });
  } else {
    res.status(411).json({ message: "Adding Money Failed to Bank Account" });
  }
});

app.post("/CreateBankAccount", async (req, res) => {
  const body = req.body;
  await InsertNewUser(body);
  res.status(200).json({ message: "New User Created" });
});

app.listen(3000, () => {
  console.log("App is running");
});
