import React, { useState } from "react";
import Input from "../Input/Input";
import styles from "./SideNav.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

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
      <img src="/images/logo.png" className={styles.logo} />
      <Input
        leftIcon={<img src="/icons/search.svg" className={styles.searchIcon} />}
        placeholder="Search"
        className={styles.searchInput}
      />
      <SideNavItem title="Overview" icon="/icons/overview.svg" isActive />
      <SideNavItem
        title="Search"
        icon="/icons/search.svg"
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
            title: "Deposit (crypto)",
            url: "/transactions/deposit-crypto",
            isActive: router.route === "/transactions/deposit-crypto",
          },
          {
            title: "Withdrawal (crypto)",
            url: "/transactions/withdrawal-crypto",
            isActive: router.route === "/transactions/withdrawal-crypto",
          },
          {
            title: "Swap",
            url: "/transactions/swap",
            isActive: router.route === "/transactions/swap",
          },
          {
            title: "Utility",
            url: "/transactions/utility",
            isActive: router.route === "/transactions/utility",
          },
          {
            title: "Cards",
            url: "/transactions/cards",
            isActive: router.route === "/transactions/cards",
          },
        ]}
      />
      <SideNavItem title="Users" icon="/icons/users-01.svg" />
      <SideNavItem
        title="Manual approvals"
        icon="/icons/manual-approvals.svg"
      />
      <SideNavItem title="Reports" icon="/icons/reports.svg" />
      <SideNavItem title="Broadcasts" icon="/icons/broadcasts.svg" />
      <SideNavItem title="Rates" icon="/icons/rates.svg" />
      <SideNavItem
        title="Country settings"
        icon="/icons/country-settings.svg"
      />
      <div style={{ marginBottom: 70 }} />
      <SideNavItem title="Site settings" icon="/icons/site-settings.svg" />
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
