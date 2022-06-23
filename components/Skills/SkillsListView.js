import { useContext, useEffect, useState } from "react"

import { AppContext } from "../../context/context"
import ManageSkillModal from './ManageSkillModal'
import PageHeader from "../PageHeader"
import styles from "../../styles/baseView.module.css"

const SkillsListView = () => {
  const { fetchSkills } = useContext(AppContext);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    await fetchSkills().then((res) => {
      setSkills(res);
    });
  }

  const handleEditEvent = (skill) => {
    alert('not implemented');
  };

  const displayModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div className="view" style={{overflowY: "scroll"}}>
        <PageHeader settingsTab="Skills" />
        <div className="section">
          <h3 className="title">Manage Skills</h3>

          {skills?.length > 0 && (
            <>
              <div className={styles.card}>
                {skills?.map((skill, index) => (
                  <div className={styles.cardItem} key={index}>
                    {skill.name} <br />
                    {skill.phone} <br />
                    {skill.email}
                    <button
                      onClick={() => handleEditEvent(skill)}
                      className={styles.btn}
                    >
                      edit
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          <button
            className="ant-btn ant-btn-primary ant-btn-block"
            style={{ marginTop: "2rem" }}
            onClick={() => displayModal()}
          >
            Add Skill
          </button>
        </div>
      </div>
      {modalVisible &&
        <ManageSkillModal
          skills={skills}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          selectedSkill={selectedSkill}
          refreshEvent={init}
        />
      }
    </>
  );
};

export default SkillsListView;
