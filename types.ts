export type TManualApprovalFilter = "withdrawal" | "top-up";
export interface IAdmin {
  accessToken: string;
  user: {
    fullName: string;
    logInDate: string;
    role: string;
    username: string;
  };
}
