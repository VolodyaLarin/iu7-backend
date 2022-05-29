export type CasResultModel =
  | {
      status: "ok";
      login?: string;
    }
  | {
      status: "fail";
    };

export default interface CasService {
  generateLink: () => string;
  checkTicket: (ticket: string) => Promise<CasResultModel>;
}
