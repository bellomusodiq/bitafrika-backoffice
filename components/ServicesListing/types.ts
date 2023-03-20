export interface ServicesListingProps {
  title: string;
  services: {
    icon: string;
    name: string;
    status: "Active" | "Disabled";
  }[];
}
