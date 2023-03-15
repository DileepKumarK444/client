import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
const Edit = () => {
  // console.log("Id", id);
  const id = parseInt(useLocation().pathname.split("/")[2]);
  const [post, setPost] = useState([]);

  const navigate = useNavigate();
  const [inputs, setInpus] = useState({
    title: "",
    slug: "",
    body: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChnage = (e) => {
    setInpus((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getPosts = async () => {
      await makeRequest.get("post/getpost/" + id).then((res) => {
        console.log(res);
        setInpus(res.data);
      });

      //   console.log(res);
    };
    getPosts();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    console.log(inputs);
    await makeRequest
      .put("post/updatepost", inputs)
      .then((res) => {
        console.log(res);
        // setPost(res.data);
        if (res.status == 200) navigate("/");
      })
      .catch(function (error) {
        if (error.response.status == 406) {
          alert(error.response.data);
        } else if (error.response.status == 409) {
          alert("Data already exist");
        }
      });
  };
  return (
    <>
      <div className="col-sm-6 p10">
        <Form
          className="p-3"
          noValidate
          validated={validated}
          onSubmit={handleSave}
        >
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Enter Title"
              onChange={handleChnage}
              required
              value={inputs.title}
            />

            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              name="slug"
              type="text"
              placeholder="Enter Title"
              onChange={handleChnage}
              required
              value={inputs.slug}
            />
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Body</Form.Label>
            <Form.Control
              name="body"
              as="textarea"
              placeholder="Enter Title"
              onChange={handleChnage}
              value={inputs.body}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button type="submit">Save</Button>
            &nbsp;
            <Link to="/">
              <Button className="btn btn-secondary">Cancel</Button>
            </Link>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};
export default Edit;
