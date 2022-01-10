import { UserTypeEnumType } from "@energyweb/zero-protocol-labs-api-client";

export type WizardFormValues = {
  userType: UserTypeEnumType | null;
  wirePayment: boolean;
  cryptoPayment: boolean;
  emailAddress: string;
  [key: string]: any;
}
