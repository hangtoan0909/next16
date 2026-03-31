import { nextApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';

export type ParamBusinessRegistration = {
  q: string;
};

export type ResponseBusiness = {
  company: string;
  raw?: {
    EndDt: string;
    TaxTypeCd: string;
    bno: string;
    bstt: string;
    bsttcd: string;
    cno: string;
    company: string;
    taxtype: string;
  };
};

export type ParamBusinessBank = {
  account_num: string;
  account_holder_info_type?: '1' | 'N';
  account_holder_info: string;
  bank_code_std?: string;
};

export type VerifyBusinessBankResponse = {
  tran_dtime: string;
  bank_tran_id: string;
  result: BankVerifyResult;
};

export type BankVerifyResult = {
  api_tran_id: string;
  rsp_code?: string;
  rsp_message?: string;
  api_tran_dtm?: string;

  bank_tran_id?: string;
  bank_tran_date?: string;

  bank_code_tran: string;
  bank_rsp_code?: string;
  bank_rsp_message?: string;

  bank_code_std: string;
  bank_code_sub?: string;
  bank_name?: string;

  account_num: string;
  account_holder_info_type?: string;
  account_holder_info?: string;

  account_holder_name?: string;
  account_type?: string;
  savings_bank_name?: string;
  account_seq?: string;
};

export const BusinessAPI = {
  verifyBusinessRegistration: (params: ParamBusinessRegistration) =>
    nextApi.get(API_ROUTES.INSPECTION.VERIFY_BUSINESS, params),

  verifyBusinessBank: (params: ParamBusinessBank) => nextApi.post(API_ROUTES.INSPECTION.VERIFY_BANK, params),
};
