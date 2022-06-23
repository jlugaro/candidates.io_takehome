import { Alert, Button, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../../context/context";
import styles from "../../styles/baseView.module.css";

const ManageOpeningModal = ({ openings, modalVisible, setModalVisible, selectedOpening, refreshEvent }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [buttonMessage, setButtonMessage] = useState("submit");
  const [isFailure, setIsFailure] = useState(false)
  const [opening, setOpening] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [form] = Form.useForm();
  const { createOpening, fetchSkills } = useContext(AppContext);

  const requiredFieldMessage = "This information is required";

  useEffect(async () => {
    if (selectedOpening) {
     form.setFieldsValue(selectedOpening);
     setSelectedSkills(selectedOpening.skills)
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

  const openingSubmit = async () =>  {
    if(formValidate())
      await submitForm();
  }

  const formValidate = () => {
    form.validateFields();

    let values = form.getFieldsValue();

    if(!values.client | !values.email
      | !values.neededCandidates | !values.skills)
      return false;

    return true;
  }

  const openingCreateSucess = () => {
    setIsLoading(false);
    setIsSuccess(true);
    setButtonMessage("Success!")
    openings.push(opening)
  }

  const openingCreateFailure = () => {
    setIsLoading(false);
    setIsFailure(true);
    throw 'There was an error creating the record';
  };

  const submitForm = async () => {

    setIsLoading(true)

    let values = form.getFieldsValue();

    console.log("values.client: ");
    console.log(values.client)
    console.log("values.email: ");
    console.log(values.email)
    console.log("values.neededCandidates: ");
    console.log(values.neededCandidates)
    console.log("values.skills: ");
    console.log(values.skills)
    // console.log("values.openingCreateSucess: ");
    // console.log(openingCreateSucess)
    // console.log("values.openingCreateFailure: ");
    // console.log(openingCreateFailure)
    // {values.skills.map((item) => {
    //   console.log(item);
    // })}
    if (selectedOpening) {
      await updateOpening(
        selectedOpening?._id,
        values.client,
        values.email,
        values.neededCandidates,
        values.skills
      );
    } else {
      //const resultCreateOpening = await createOpening(values.client, values.email, values.neededCandidates, values.skills, openingCreateSucess, openingCreateFailure);
      //console.log(resultCreateOpening);
    }
  };

  const openingFormInputs = (changedValues, allValues) => {
    form.setFieldsValue(allValues);
  };

  const onChange = (checkedValues) => {
    setSelectedSkills(checkedValues);
  };

  return (
      <Modal
        title="Manage Opening"
        visible={modalVisible}
        destroyOnClose={true}
        onCancel={hideModal}
        onOk={openingSubmit}
        footer={[
          <Button
            key="1"
            type="primary"
            loading={isLoading}
            onClick={openingSubmit}
            disabled={isSuccess}
          >
            {buttonMessage}
          </Button>,
        ]}
      >
        <>
          {isFailure && (
            <Alert
              message="There was an error createing your opening"
              type="error"
            />
          )}

          <Form
          layout="vertical"
          className={styles.formFields}
          form={form}
   
          onValuesChange={openingFormInputs}
        >
          <Form.Item
            label="Client"
            name="client"
            required
            rules={[{ required: true, message: requiredFieldMessage }]}
          >
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

          <Form.Item 
            label="Needed Candidates" 
            name="neededCandidates" 
            required
            rules={[{ required: true, message: requiredFieldMessage }]}>
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

export default ManageOpeningModal;
