import styles from "../../styles/baseView.module.css"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/context"
import PageHeader from "../PageHeader"
import ManageCandidateModal from './ManageCandidateModal'

const CandidatesListView = () => {
  const { fetchCandidates } = useContext(AppContext);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(async () => {
    init();
  }, []);

  async function init() {
    await fetchCandidates().then((res) => {
      setCandidates(res);
    });
  }

  const handleEditEvent = (candidate) => {
    alert('not implemented');
  };

  const displayModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div className="view">
        <PageHeader settingsTab="Candidates" />
        <div className="section">
          <h3 className="title">Manage Candidates</h3>

          {candidates?.length > 0 && (
            <>
              <div className={styles.card}>
                {candidates?.map((candidate, index) => (
                  <div className={styles.cardItem} key={index}>
                    {candidate.name} <br />
                    {candidate.phone} <br />
                    {candidate.email}
                    <button
                      onClick={() => handleEditEvent(candidate)}
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
            Add Candidate
          </button>
        </div>
      </div>
      {modalVisible &&
        <ManageCandidateModal
          candidates={candidates}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          selectedCandidate={selectedCandidate}
          refreshEvent={init}
        />
      }
    </>
  );
};

export default CandidatesListView;
