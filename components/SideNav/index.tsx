import React from "react";
import Input from "../Input/Input";
import styles from "./SideNav.module.css";

const SideNavItem: React.FC<{
  title: string;
  icon: string;
  isActive?: boolean;
}> = ({ title, icon, isActive }) => (
  <a
    className={styles.navItem}
    style={{ backgroundColor: isActive ? "#F9FAFB" : "" }}
  >
    <img src={icon} className={styles.iconContainer} />
    <p className={styles.navItemTitle}>{title}</p>
  </a>
);

const SideNav: React.FC = () => {
  return (
    <nav className={styles.sideNavContainer}>
      <img src="/images/logo.png" className={styles.logo} />
      <Input
        leftIcon={<img src="/icons/search.svg" className={styles.searchIcon} />}
        placeholder="Search"
        className={styles.searchInput}
      />
      <SideNavItem title="Overview" icon="/icons/overview.svg" isActive />
      <SideNavItem title="Search" icon="/icons/search.svg" />
      <SideNavItem title="Transactions" icon="/icons/transactions.svg" />
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
