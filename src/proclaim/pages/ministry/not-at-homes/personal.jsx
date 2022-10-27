import { useState } from "react";
import { Button } from "../../../../common/components/inputs/button";
import { Content } from "../../../../common/components/containers/content";
import { Form } from "./form";
import { List } from "./list";

export const Personal = ({ userID }) => {
  const [content, setContent] = useState("list");
  const [form, setForm] = useState(
    [] // <Form key="submit" userID={userID} type={content} setContent={setContent} address={[]} />
  );
  const [address, setAddress] = useState({});

  const add = () => {
    setContent("Submit");
    setForm(
      <Form
        key={Date.now()}
        userID={userID}
        type={"Submit"}
        setContent={setContent}
        address={address}
        setAddress={setAddress}
      />
    );
  };

  const update = (a, key) => {
    setAddress(a);
    setContent("Update");
    setForm(
      <Form
        key={Date.now()}
        userID={userID}
        type={"Update"}
        setContent={setContent}
        address={a}
        setAddress={setAddress}
        addressKey={key}
      />
    );
  };

  return (
    <Content bgColor={"bg-bg dark:bg-black"}>
      <div
        className={`${
          content == "Submit" || content == "Update" ? "visible" : "hidden"
        }`}
      >
        <div className=""></div>
        {form}
      </div>
      <div
        className={`mt-4 ${
          content == "Update" ? "visible" : "hidden"
        }`}
      >
      <Button action={() => setContent("list")}>Back</Button>
      </div>
      <div className={`${content == "list" ? "visible" : "hidden"}`}>
        <div className="pt-6">
          <Button action={() => add()}>Add Address</Button>
        </div>
        <List userID={userID} update={update} setAddress={setAddress}></List>
      </div>
    </Content>
  );
};
