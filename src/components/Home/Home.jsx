import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// fa-solid fa-trash-can" /

const Home = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [delSt, setDelSt] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      await makeRequest.get("post/getposts").then((res) => {
        console.log(res);
        setPost(res.data);
      });

      //   console.log(res);
    };
    getPosts();
  }, [delSt]);

  const handleDelete = async (e) => {
    setDelSt(false);
    const id = e.target.getAttribute("data-id");
    console.log(id);
    await makeRequest.delete("post/deletepost/" + id).then((res) => {
      console.log(res);
      setDelSt(true);
      // navigate("/");
    });
  };
  //   const handileAddNew = () => {};
  return (
    <>
      <div className="col-sm-8 p-3">
        <Link to="/addnew">
          <Button>Add New</Button>
        </Link>
        {/* <img src="http://127.0.0.1:8000/uploads/1678878669.jpg" /> */}
        <Table striped bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th className="text-center">Action</th>
              {/* <th>Body</th> */}
            </tr>
          </thead>
          <tbody>
            {post && post.length > 0 ? (
              post.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.slug}</td>
                  {/* <td style={{ width: "50%" }}>{item.body}</td> */}
                  <td className="text-center">
                    <Link to={"update/" + item.id}>
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="btn btn-primary"
                      />
                    </Link>
                    &nbsp;
                    {/* <FontAwesomeIcon
                      className="btn btn-danger"
                      data-id={item.id}
                      onClick={handleDelete}
                      icon={faCoffee}
                    /> */}
                    {/* <FontAwesomeIcon
                      icon={faTrash}
                      className="btn btn-danger"
                      data-id={item.id}
                      onClick={handleDelete}
                    /> */}
                    <Button
                      className="btn btn-danger"
                      data-id={item.id}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="3">No Data</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default Home;
