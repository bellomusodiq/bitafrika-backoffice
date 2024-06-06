export const getStatusCode = (status: string) => {
  switch (status.toLowerCase()) {
    case "all":
    case "confirmed":
    case "success":
    case "verified":
    case "card - active":
      return "success";
    case "success":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "error";
    default:
      return "error";
  }
};
