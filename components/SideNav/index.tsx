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
        isActive={router.route === "/dashboard"}
        url="/dashboard"
      />
      <SideNavItem
        title="Search"
        icon="/icons/search.svg"
        isActive={router.route.split("/")[1] === "search"}
        url="/search"
      />
      <SideNavItem
        title="Transactions"
        icon="/icons/transactions.svg"
        isActive={router.route.split("/")[1] === "transactions"}
        url="/transactions"
      />
      <SideNavItem
        title="Cards"
        icon="/icons/cards.svg"
        isActive={router.route.split("/")[1] === "cards"}
        url="/cards"
      />
      <SideNavItem
        title="Giftcards"
        icon="/icons/cards.svg"
        isActive={router.route.split("/")[1] === "giftcards"}
        url="/giftcards"
      />
      <SideNavItem
        title="Swap"
        icon="/icons/swap2.svg"
        isActive={router.route.split("/")[1] === "swap"}
        url="/swap"
      />
      <SideNavItem
        title="Approvals"
        icon="/icons/approvals.svg"
        isActive={router.route.split("/")[1] === "approvals"}
        url="/approvals"
      />
      <SideNavItem
        title="Users"
        icon="/icons/users-01.svg"
        isActive={router.route.split("/")[1] === "users"}
        url="/users"
      />
      <SideNavItem
        title="Manual approvals"
        icon="/icons/manual-approvals.svg"
        isActive={router.route.split("/")[1] === "manual-approvals"}
        url="/manual-approvals"
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
      {/* <SideNavItem
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
      /> */}
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
