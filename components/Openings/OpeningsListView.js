import { useContext, useEffect, useState } from "react"

import { AppContext } from "../../context/context"
import ManageOpeningModal from './ManageOpeningModal'
import PageHeader from "../PageHeader"
import styles from "../../styles/baseView.module.css"

const OpeningsListView = () => {
  const { fetchOpenings } = useContext(AppContext);
  const [openings, setOpenings] = useState([]);
  const [selectedOpening, setSelectedOpening] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(async () => {
    init();
  }, []);

  async function init() {
    await fetchOpenings().then((res) => {
      setOpenings(res);
    });
  }

  const handleEditEvent = (opening) => {
    alert('not implemented');
  };

  const displayModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div className="view" style={{overflowY: "scroll"}}>
        <PageHeader settingsTab="Openings" />
        <div className="section">
          <h3 className="title">Manage Openings</h3>

          {openings?.length > 0 && (
            <>
              <div className={styles.card}>
                {openings?.map((opening, index) => (
                  <div className={styles.cardItem} key={index}>
                    {opening.client} <br />
                    {opening.email} <br />
                    {"available positions: " + opening.neededCandidates} <br/>
                    {opening.skills?.length > 0 && ( <>
                  needed skills: {opening.skills?.map((skill, index) => (
                      <>{skill.name + " "}</>
                  ))}
                  </>
              )}
                    <button
                      onClick={() => handleEditEvent(opening)}
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
            Add Opening
          </button>
        </div>
      </div>
      {modalVisible &&
        <ManageOpeningModal
          openings={openings}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          selectedOpening={selectedOpening}
          refreshEvent={init}
        />
      }
    </>
  );
};

export default OpeningsListView;
