import React, { useState } from "react";
import Input from "../Input/Input";
import styles from "./SideNav.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const SideNavItem: React.FC<{
  title: string;
  icon: string;
  isActive?: boolean;
  url?: string;
  childrenItem?: { title: string; isActive?: boolean; url: string }[];
}> = ({ title, icon, isActive, url = "/", childrenItem = [] }) => {
  const router = useRouter();
  const [childrenActive, setChildrenActive] = useState<boolean>(false);

  const toggleChidren = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (childrenItem?.length > 0) {
      setChildrenActive(!childrenActive);
      return;
    }
    router.push(url, url);
  };
  return (
    <>
      <a
        className={styles.navItem}
        style={{ backgroundColor: isActive || childrenActive ? "#F9FAFB" : "" }}
        onClick={toggleChidren}
      >
        <img src={icon} className={styles.iconContainer} />
        <p className={styles.navItemTitle}>{title}</p>
        {childrenItem?.length > 0 && (
          <img
            src={!childrenActive ? "/icons/plus.svg" : "/icons/minus.svg"}
            width={14}
            height={14}
          />
        )}
      </a>
      <div
        className={styles.navItemChildrenContainer}
        style={{
          margin: childrenActive ? "0 16px" : 0,
          maxHeight: childrenActive ? childrenItem.length * 40 : 0,
        }}
      >
        {childrenItem?.map((item: any) => (
          <Link
            key={item.title}
            href={item.url}
            className={
              item.isActive
                ? styles.navItemChildrenActive
                : styles.navItemChildren
            }
          >
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
};

const SideNav: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.sideNavContainer}>
      <div className={styles.logoContainer}>
        <Image
          alt=""
          src="/images/logo.png"
          width={480}
          height={20}
          className={styles.logo}
        />
      </div>

      <SideNavItem
        title="Overview"
        icon="/icons/overview.svg"
        isActive={router.route === "/"}
      />
      <SideNavItem
        title="Search"
        icon="/icons/search.svg"
        isActive={router.route.split("/")[1] === "search"}
        childrenItem={[
          {
            title: "User",
            url: "/search/users",
            isActive: router.route === "/search/users",
          },
          {
            title: "Momo Topup",
            url: "/search/momo-topup",
            isActive: router.route === "/search/momo-topup",
          },
          {
            title: "Momo withdrawal",
            url: "/search/momo-withdrawal",
            isActive: router.route === "/search/momo-withdrawal",
          },
          {
            title: "Crypto transactions",
            url: "/search/crypto-transactions",
            isActive: router.route === "/search/crypto-transactions",
          },
        ]}
      />
      <SideNavItem
        title="Transactions"
        icon="/icons/transactions.svg"
        isActive={router.route.split("/")[1] === "transactions"}
        childrenItem={[
          {
            title: "Buy (Momo Topup)",
            url: "/transactions/buy-momo",
            isActive: router.route === "/transactions/buy-momo",
          },
          {
            title: "Sell (Momo withdrawal)",
            url: "/transactions/sell-momo",
            isActive: router.route === "/transactions/sell-momo",
          },
          {
            title: "Crypto transactions",
            url: "/transactions/crypto",
            isActive: router.route === "/transactions/crypto",
          },

          // {
          //   title: "Swap",
          //   url: "/transactions/swap",
          //   isActive: router.route === "/transactions/swap",
          // },
          // {
          //   title: "Utility",
          //   url: "/transactions/utility",
          //   isActive: router.route === "/transactions/utility",
          // },
          // {
          //   title: "Cards",
          //   url: "/transactions/cards",
          //   isActive: router.route === "/transactions/cards",
          // },
        ]}
      />
      <SideNavItem
        title="Users"
        icon="/icons/users-01.svg"
        isActive={router.route.split("/")[1] === "users"}
        childrenItem={[
          {
            title: "Registered",
            url: "/users/registered",
          },
          {
            title: "Unverified KYC",
            url: "/users/unverfied-kyc",
          },
          {
            title: "Disabled",
            url: "/users/disabled",
          },
        ]}
      />
      <SideNavItem
        title="Manual approvals"
        icon="/icons/manual-approvals.svg"
        isActive={router.route.split("/")[1] === "manual-approvals"}
        childrenItem={[
          {
            title: "Withdrawals",
            url: "/manual-approvals/withdrawals",
          },
          {
            title: "Top-up",
            url: "/manual-approvals/topup",
          },
          {
            title: "KYC",
            url: "/manual-approvals/withdrawals",
          },
        ]}
      />
      <SideNavItem
        title="Reports"
        icon="/icons/reports.svg"
        isActive={router.route.split("/")[1] === "reports"}
        childrenItem={[
          {
            title: "User reports",
            url: "/reports/users",
          },
          {
            title: "Transactions reports",
            url: "/reports/transactions",
          },
        ]}
      />
      <SideNavItem
        title="Broadcasts"
        icon="/icons/broadcasts.svg"
        isActive={router.route.split("/")[1] === "broadcast"}
        childrenItem={[
          {
            title: "SMS broadcast",
            url: "/broadcast/sms",
          },
          {
            title: "Email broadcast",
            url: "/broadcast/email",
          },
          {
            title: "Push notificaton",
            url: "/broadcast/push-notification",
          },
        ]}
      />
      <SideNavItem
        title="Country settings"
        isActive={router.route.split("/")[1] === "country-settings"}
        icon="/icons/country-settings.svg"
        url="/country-settings"
      />
      <div style={{ marginBottom: 70 }} />
      <SideNavItem
        isActive={router.route.split("/")[1] === "site-settings"}
        title="Site settings"
        url="/site-settings"
        icon="/icons/site-settings.svg"
      />
      <div className={styles.divider} />
      <div className={styles.profileContainer}>
        <img src="/images/Avatar.png" className={styles.profileAvatar} />
        <div className={styles.nameContainer}>
          <p className={styles.name}>Emmanuel Nkrumah</p>
          <p className={styles.email}>Emmanuel@Bitafrika.com</p>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
