import React, { useState } from "react";
import Input from "../Input/Input";
import styles from "./SideNav.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Button from "../Button";
import { Avatar, message } from "antd";
import { ADMIN_ROLES } from "@/utils/utils";
import { COOKIE } from "@/utils/cookies";

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
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const ROUTES = ADMIN_ROLES[auth?.user?.role || ""];

  const signOut = () => {
    if (auth) {
      axios
        .post(
          `${BASE_URL}/logout`,
          {},
          { headers: { Authorization: auth.accessToken } }
        )
        .then(() => {
          localStorage.removeItem("auth");
          COOKIE.REMOVE("auth");
          router.replace("/signin", "/signin");
        })
        .catch((res) => {
          if (res.response.status === 401) {
            localStorage.removeItem("auth");
            COOKIE.REMOVE("auth");
            router.replace("/", "/");
          }
          messageApi.error({ content: res.data.message, duration: 5 });
        });
    }
  };

  return (
    <nav className={styles.sideNavContainer}>
      {contextHolder}
      <div className={styles.logoContainer}>
        <Image
          alt=""
          src="/images/logo.png"
          width={480}
          height={20}
          className={styles.logo}
        />
      </div>
      {ROUTES?.includes("dashboard") && (
        <SideNavItem
          title="Overview"
          icon="/icons/overview.svg"
          isActive={router.route === "/dashboard"}
          url="/dashboard"
        />
      )}
      {ROUTES?.includes("search") && (
        <SideNavItem
          title="Search"
          icon="/icons/search.svg"
          isActive={router.route.split("/")[1] === "search"}
          url="/search"
        />
      )}
      {ROUTES?.includes("transactions") && (
        <SideNavItem
          title="Transactions"
          icon="/icons/transactions.svg"
          isActive={router.route.split("/")[1] === "transactions"}
          url="/transactions"
        />
      )}
      {ROUTES?.includes("cards") && (
        <SideNavItem
          title="Cards"
          icon="/icons/cards.svg"
          isActive={router.route.split("/")[1] === "cards"}
          url="/cards"
        />
      )}
      {ROUTES?.includes("giftcards") && (
        <SideNavItem
          title="Giftcards"
          icon="/icons/giftcard.svg"
          isActive={router.route.split("/")[1] === "giftcards"}
          url="/giftcards"
        />
      )}
      {ROUTES?.includes("swap") && (
        <SideNavItem
          title="Swap"
          icon="/icons/swap2.svg"
          isActive={router.route.split("/")[1] === "swap"}
          url="/swap"
        />
      )}
      {ROUTES?.includes("authorizations") && (
        <SideNavItem
          title="Authorizations"
          icon="/icons/approvals.svg"
          isActive={router.route.split("/")[1] === "approvals"}
          url="/approvals"
        />
      )}
      {ROUTES?.includes("users") && (
        <SideNavItem
          title="Users"
          icon="/icons/users-01.svg"
          isActive={router.route.split("/")[1] === "users"}
          url="/users"
        />
      )}
      {ROUTES?.includes("manual-approvals") && (
        <SideNavItem
          title="Approvals"
          icon="/icons/manual-approvals.svg"
          isActive={router.route.split("/")[1] === "manual-approvals"}
          url="/manual-approvals"
        />
      )}
      {ROUTES?.includes("reports") && (
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
      )}

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
      {ROUTES?.includes("country-settings") && (
        <SideNavItem
          title="Country settings"
          isActive={router.route.split("/")[1] === "country-settings"}
          icon="/icons/country-settings.svg"
          url="/country-settings"
        />
      )}

      <div style={{ marginBottom: 70 }} />
      {ROUTES?.includes("site-settings") && (
        <SideNavItem
          isActive={router.route.split("/")[1] === "site-settings"}
          title="Site settings"
          url="/site-settings"
          icon="/icons/site-settings.svg"
        />
      )}

      <div className={styles.divider} />
      {auth?.user && (
        <div className={styles.profileContainer}>
          <Avatar className={styles.profileAvatar} />
          {/* <img src="/images/Avatar.png" className={styles.profileAvatar} /> */}
          <div className={styles.nameContainer}>
            <p className={styles.name}>{auth?.user.fullName}</p>
            <p className={styles.email}>{auth?.user.username}</p>
          </div>
        </div>
      )}
      <div className={styles.logoutContainer}>
        <Button onClick={signOut} color="white">
          Log Out
        </Button>
      </div>
    </nav>
  );
};

export default SideNav;
