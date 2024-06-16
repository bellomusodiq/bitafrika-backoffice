export const getStatusCode = (status: string = "") => {
  switch (status.toLowerCase()) {
    case "all":
    case "confirmed":
    case "approved":
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

export const ADMIN_ROLES: { [k: string]: string[] } = {
  BLACKSWAN: [
    "dashboard",
    "assets",
    "search",
    "transactions",
    "cards",
    "giftcards",
    "swap",
    "authorizations",
    "users",
    "manual-approvals",
    "reports",
    "country-settings",
    "site-settings",
  ],
  SUPER_ADMIN: [
    "search",
    "transactions",
    "cards",
    "giftcards",
    "swap",
    "users",
    "manual-approvals",
    "authorizations",
    "reports",
    "country-settings",
    "site-settings",
  ],
  NANO_ADMIN: ["search", "transactions", "cards", "giftcards", "swap", "users"],
  OPERATIONAL_ADMIN: [
    "search",
    "transactions",
    "cards",
    "giftcards",
    "swap",
    "users",
    "manual-approvals",
  ],
  MANAGER_ADMIN: [
    "search",
    "transactions",
    "cards",
    "giftcards",
    "swap",
    "users",
    "manual-approvals",
    "reports",
    "country-settings",
  ],
};

export const getPermissions = () => {
  // ADMIN_ROLES: {
  //   NANO: "NANO_ADMIN",
  //   OPERATIONAL: "OPERATIONAL_ADMIN",
  //   MANAGER: "MANAGER_ADMIN",
  //   SUPER: "SUPER_ADMIN",
  //   BLACK_SWAN: "BLACKSWAN" // (root)
  // },

  const permissions = {};
};
