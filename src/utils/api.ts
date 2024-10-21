import { Payment } from "../types/payment";
import db from "./../db.json";

export const simulateApi = (): Promise<Payment[]> =>
  new Promise((resolve, rej) => {
    setTimeout(() => {
      if (Date.now() % 2 === 0) {
        resolve(db as Payment[]);
      } else {
        rej("Simulate error");
      }
    }, 3000);
  });
