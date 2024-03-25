import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SideNav from "@/components/SideNav";
import PageLayout from "@/components/PageLayout";
import CoinListing from "@/components/CoinListing";
import StatsCard from "@/components/Card/StatsCard";
import CustomPieChart from "@/components/Charts/PieChart";
import TrendItem from "@/components/TrendItem";
import CardListing from "@/components/CardListing";
import ServicesListing from "@/components/ServicesListing";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  let auth: any;
  // if (typeof window !== "undefined") {
  //   auth = JSON.parse(localStorage.getItem("auth") || "");
  // }


  useEffect(() => {
    router.replace("/signin");
  }, []);

  return (
    <PageLayout showHeader title="Hone">
      <></>
    </PageLayout>
  );
}
