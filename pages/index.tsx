import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SideNav from "@/components/SideNav";
import PageLayout from "@/components/PageLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <PageLayout title="Hone">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio blanditiis
      incidunt nobis fugiat, consectetur corrupti aperiam adipisci eos totam
      tempore cupiditate maxime officiis facere optio doloribus porro ut.
      Provident, eaque.
    </PageLayout>
  );
}
