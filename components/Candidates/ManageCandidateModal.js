import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import { Modal, Button, Input, Form, Alert, Checkbox, Col, Row } from "antd";
import styles from "../../styles/baseView.module.css";

const ManageCandidateModal = ({ candidates, modalVisible, setModalVisible, selectedCandidate, refreshEvent }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [buttonMessage, setButtonMessage] = useState("submit");
  const [isFailure, setIsFailure] = useState(false)
  const [candidate, setCandidate] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [form] = Form.useForm();
  const { createCandidate, fetchSkills } = useContext(AppContext);

  const requiredFieldMessage = "This information is required";

  useEffect(async () => {
    if (selectedCandidate) {
     form.setFieldsValue(selectedCandidate);
     setSelectedSkills(selectedCandidate.skills)
   }

   await fetchSkills().then(res => {
     setSkills(res)
   })
  }, []);

  const hideModal = (e) => {
    setModalVisible(false);
    reset();
    refreshEvent();
  }

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsFailure(false);
    setButtonMessage("create");
  }

  const candidateSubmit = async () =>  {
    if(formValidate())
      await submitForm();
  }

  const formValidate = () => {
    form.validateFields();

    let values = form.getFieldsValue();

    if(!values.name | !values.email
      | !values.phone | !values.skills)
      return false;

    return true;
  }

  const candidateCreateSucess = () => {
    setIsLoading(false);
    setIsSuccess(true);
    setButtonMessage("Success!")
    candidates.push(candidate)
  }

  const candidateCreateFailure = () => {
    setIsLoading(false);
    setIsFailure(true);
    throw 'There was an error creating the record';
  };

  const submitForm = async () => {

    setIsLoading(true)

    let values = form.getFieldsValue();

    if (selectedCandidate) {
      await updateCandidate(
        selectedCandidate?._id,
        values.name,
        values.email,
        values.phone,
        values.skills
      );
    } else {
      await createCandidate(values.name, values.email, values.phone, values.skills, candidateCreateSucess, candidateCreateFailure);
    }
  };

  const candidateFormInputs = (changedValues, allValues) => {
    form.setFieldsValue(allValues);
  };

  const onChange = (checkedValues) => {
    setSelectedSkills(checkedValues);
  };

  return (
      <Modal
        title="Manage Candidate"
        visible={modalVisible}
        destroyOnClose={true}
        onCancel={hideModal}
        onOk={candidateSubmit}
        footer={[
          <Button
            key="1"
            type="primary"
            loading={isLoading}
            onClick={candidateSubmit}
            disabled={isSuccess}
          >
            {buttonMessage}
          </Button>,
        ]}
      >
        <>
          {isFailure && (
            <Alert
              message="There was an error createing your candidate"
              type="error"
            />
          )}

          <Form
          layout="vertical"
          className={styles.formFields}
          form={form}
   
          onValuesChange={candidateFormInputs}
        >
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true, message: requiredFieldMessage }]}
          >
            <Input className={styles.inputBackground} />
          </Form.Item>

          <Form.Item 
            label="Phone number" 
            name="phone" 
            required
            rules={[{ required: true, message: requiredFieldMessage }]}>
            <Input className={styles.inputBackground} />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            required
            rules={[
              { required: true, message: requiredFieldMessage,
                type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input className={styles.inputBackground} />
          </Form.Item>

          <Form.Item label="Skills" name="skills">
            <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
              {skills?.length > 0 && (
                <Row>
                  {skills?.map((skill, index) => (
                    <Col span={8} key={index}>
                      <Checkbox value={skill.name}>{skill.name}</Checkbox>
                    </Col>
                  ))}
                </Row>
              )}
            </Checkbox.Group>
          </Form.Item>
        </Form>
          
        </>
      </Modal>
  );
};

export default ManageCandidateModal;
