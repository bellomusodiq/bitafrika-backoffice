import React from "react";
import StatsCard from "../Card/StatsCard";
import styles from "./ServicesListing.module.css";
import { ServicesListingProps } from "./types";

const ServicesListing: React.FC<ServicesListingProps> = ({
  title,
  services,
}) => (
  <StatsCard headerTitle={title}>
    <div style={{ padding: "0 24px" }}>
      {services?.map((service, i) => (
        <React.Fragment key={service.name}>
          <div className={styles.coinItem}>
            <img src={service.icon} />
            <p className={styles.coinName}>{service.name}</p>
            <span
              style={{
                backgroundColor:
                  service.status === "Disabled" ? "#FEF3F2" : "#F6FEF9",
                color: service.status === "Disabled" ? "#F04438" : "#099250",
              }}
              className={styles.status}
            >
              <div
                className={styles.indicator}
                style={{
                  backgroundColor:
                    service.status === "Disabled" ? "#F04438" : "#099250",
                }}
              />{" "}
              {service.status}
            </span>
          </div>
          {i !== services.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  </StatsCard>
);

export default ServicesListing;
