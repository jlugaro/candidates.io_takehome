import { Alert, Button, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../../context/context";
import styles from "../../styles/baseView.module.css";

const ManageSkillModal = ({ skills, modalVisible, setModalVisible, selectedSkill, refreshEvent }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [buttonMessage, setButtonMessage] = useState("submit");
  const [isFailure, setIsFailure] = useState(false)
  const [skill, setSkill] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState(false);
  //const [skills, setSkills] = useState([]);
  const [form] = Form.useForm();
  const { createSkill, fetchSkills} = useContext(AppContext);

  const requiredFieldMessage = "This information is required";

  useEffect(async () => {
    if (selectedSkill) {
     form.setFieldsValue(selectedSkill);
     setSelectedSkills(selectedSkill)
   }

   await fetchSkills().then(res => {
     setSkills(res)
   })
  }, []);

  // useEffect(() => {
  //   async () => {
  //     if (selectedSkill) {
  //       form.setFieldsValue(selectedSkill);
  //       setSelectedSkills(selectedSkill.skills)
  //     }
   
  //     await fetchSkills().then(res => {
  //       setSelectedSkills(res)
  //     })
  //   }
  // }, []);

  // useEffect(async () => {
  //   if (selectedSkill) {
  //    form.setFieldsValue(selectedSkill);
  //    setSelectedSkills(selectedSkill.skills)
  //  }

  //  await fetchSkills().then(res => {
  //    setSkills(res)
  //  })
  // }, []);

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

  const skillSubmit = async () =>  {
    if(formValidate())
      await submitForm();
  }

  const formValidate = () => {
    form.validateFields();

    let values = form.getFieldsValue();

    if(!values.name)
      return false;

    return true;
  }

  const skillCreateSucess = () => {
    setIsLoading(false);
    setIsSuccess(true);
    setButtonMessage("Success!")
    skills.push(skill)
  }

  const skillCreateFailure = () => {
    setIsLoading(false);
    setIsFailure(true);
    throw 'There was an error creating the record';
  };

  const submitForm = async () => {

    setIsLoading(true)

    let values = form.getFieldsValue();

    if (selectedSkill) {
      await updateSkill(
        selectedSkill?._id,
        values.name,
      );
    } else {
      await createSkill(values.name, skillCreateSucess, skillCreateFailure);
    }
    
  };

  const skillFormInputs = (changedValues, allValues) => {
    form.setFieldsValue(allValues);
  };

  const onChange = (checkedValues) => {
    setSelectedSkills(checkedValues);
  };

  return (
      <Modal
        title="Manage Skill"
        visible={modalVisible}
        destroyOnClose={true}
        onCancel={hideModal}
        onOk={skillSubmit}
        footer={[
          <Button
            key="1"
            type="primary"
            loading={isLoading}
            onClick={skillSubmit}
            disabled={isSuccess}
          >
            {buttonMessage}
          </Button>,
        ]}
      >
        <>
          {isFailure && (
            <Alert
              message="There was an error creating your skill"
              type="error"
            />
          )}

          <Form
          layout="vertical"
          className={styles.formFields}
          form={form}
   
          onValuesChange={skillFormInputs}
        >
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true, message: requiredFieldMessage }]}
          >
            <Input className={styles.inputBackground} />
          </Form.Item>
        </Form>
          
        </>
      </Modal>
  );
};

export default ManageSkillModal;
