import Alert from "react-bootstrap/Alert";

const MessageBox = (props) => {
  return (
    <Alert variant={props.variant || "info"}>
     {props.Children}
    </Alert>
  );
};

export default MessageBox;
