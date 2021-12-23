import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Evoucher } from "../entity/Evoucher";
import { validate } from "class-validator";
import { Code } from "../entity/Code";
import { generateNumber, generateString } from "../helpers";
import { PaymentTypes } from "../constant/PaymentType";
var qr = require("qr-image");
const path = require("path");
const fs = require("fs");
var jwt = require("jsonwebtoken");
const asyncTest = () => {
  console.log("1");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("1");
    }, 2000);
  });
};
const asyncTestTimer = async () => {
  console.log("2");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2");
    }, 1000);
  });
};
const asyncTest2 = async (name) => {
  for (let index = 0; index < 500; index++) {
    const data = await asyncTest();
    console.log(index, name);
  }
  return "foo";
};
export class EvoucherController {
  private EvoucherRepository = getRepository(Evoucher);
  private CodeRepository = getRepository(Code);

  all = async (request: Request, response: Response, next: NextFunction) => {
    asyncTest().then((zxc) => {
      console.log("receiving" + zxc);
    });
    asyncTestTimer().then((zxc) => {
      console.log("receiving" + zxc);
    });
    var page = request.query.page;
    return response.send(
      await this.EvoucherRepository.find({
        // take: 10,
        // skip: 10 * page
      })
    );
  };

  one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      return response.send(
        await this.EvoucherRepository.findOne(request.params.id)
      );
    } catch (error) {
      return response.status(404).send(error);
    }
  };

  changeActive = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      var voucher = await this.EvoucherRepository.findOne(request.params.id);
      voucher.active = !voucher.active;

      return response.send(await this.EvoucherRepository.save(voucher));
    } catch (error) {
      return response.status(422).send(error);
    }
  };
  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      var data: Evoucher = request.body;
      data.expiry_date = new Date(data.expiry_date);
      var voucher = this.EvoucherRepository.create(data);

      return response.send(
        await this.EvoucherRepository.update(request.params.id, voucher)
      );
    } catch (error) {
      return response.status(422).send(error);
    }
  };

  generatePromoCode = async () => {
    var code = generateString(5) + generateNumber(6);
    var isCodeExisted = await this.CodeRepository.findOne({ promo_code: code });
    if (isCodeExisted) {
      return this.generatePromoCode();
    }
    return code;
  };

  createCode = async (quantity, voucher, name) => {
    for (var i = 0; i < quantity; i++) {
      var code = await this.generatePromoCode();
      //   var qr_img = qr.imageSync(code, { type: "png" });
      console.log(i);
      var store_path = path.resolve(`src/qr_img/${i}.png`);
      //   await fs.writeFileSync(store_path, qr_img);
      console.log("storing qr code to " + store_path + name);
      //   var codeData = {
      //     evoucher: voucher,
      //     promo_code: code,
      //     qr_image: `${code}.png`,
      //   };
      //   this.CodeRepository.save(codeData);
    }
  };

  save = async (request: Request, response: Response, next: NextFunction) => {
    try {
      var data: Evoucher = request.body;
      data.expiry_date = new Date(data.expiry_date);

      var voucher = this.EvoucherRepository.create(data);
      voucher = await this.EvoucherRepository.save(voucher);
      this.createCode(data.quantity, voucher, "first");
      this.createCode(data.quantity, voucher, "second");

      return response.send(voucher);
    } catch (error) {
      return response.status(422).send(error);
    }
  };

  login = async (request: Request, response: Response, next: NextFunction) => {
    var token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10000, ///10000days
        name: "admin",
      },
      process.env.SECRET_KEY
    );
    return response.send({
      token,
    });
  };
  paymentList = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    return response.send(PaymentTypes);
  };
}
