import { useEffect, useState } from "react";

import CandidatesListView from "../components/Candidates/CandidatesListView";
import OpeningsListView from "../components/Openings/OpeningsListView";
import SkillsListView from "../components/Skills/SkillsListView";
import styles from "./../styles/layout.module.css";
import { useRouter } from "next/router";

const Layout = () => {
  const [currentTab, setCurrentTab] = useState("candidates");
  const router = useRouter();
  const screenMap = {
    candidates: <CandidatesListView />,
    skills: <SkillsListView/>,
    openings: <OpeningsListView/>,
    // skills: <h1>Skills component goes here</h1>,
    // openings: <h1>Openings component goes here</h1>,
  };

  useEffect(() => {
    async function fetchData() {
      setCurrentTab(router.query?.tab);
    }
  }, [router]);

  // useEffect(async () => {
  //   setCurrentTab(router.query?.tab);
  // }, [router]);

  const setTab = (name) => {
    router.push(`?tab=${name}`);
    setCurrentTab(name);
  };

  const getSelectorColor = (tab) => {
    return currentTab == tab ? "#3b3d43" : "";
  };

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.layoutListTop}>
          <input type="search" placeholder="Search Menu" />
        </div>
        <div className={styles.layoutContainer}>
          <div
            className={styles.elementsContainer}
            style={{ background: getSelectorColor("candidates") }}
            onClick={() => setTab("candidates")}
          >
            <div className={styles.svgContainer}></div>
            Candidates
          </div>
          <div
            className={styles.elementsContainer}
            style={{ background: getSelectorColor("openings") }}
            onClick={() => setTab("openings")}
          >
            <div className={styles.svgContainer}></div>
            Openings
          </div>
          <div
            className={styles.elementsContainer}
            style={{ background: getSelectorColor("skills") }}
            onClick={() => setTab("skills")}
          >
            <div className={styles.svgContainer}></div>
            Skills
          </div>
        </div>
      </div>
      {screenMap[currentTab]}
    </>
  );
};

export default Layout;
