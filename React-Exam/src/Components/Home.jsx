import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRoomsAsync, deleteRoomAsync } from "../Services/Action/RoomAction";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../App.css";


const Home = () => {
  const { rooms = [], loading } = useSelector((state) => state.RoomReducer);
  const { user, loading: authLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/sign-in");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(getAllRoomsAsync());
    }
  }, [dispatch, rooms.length]);

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRoomAsync(id));
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete room.");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />

      <Container fluid className="py-4 px-lg-5">
        <h2 className="text-center mb-4 fw-bold">
          Available Rooms
        </h2>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <Col xs={12} sm={6} lg={4} key={room.id}>
                  <Card className="hotel-card shadow-lg border-0 rounded-4 overflow-hidden card-hover">
                    {/* Image */}
                    <div
                      className="img-container"
                      onClick={() => handleView(room.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Img
                        src={room.image}
                        alt={room.title}
                        className="room-img"
                      />
                    </div>

                    {/* Body */}
                    <Card.Body className="p-4">
                      <div
                        onClick={() => handleView(room.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <h5 className="fw-bold mb-2">{room.number}</h5>

                        <p className="text-muted small mb-1">
                          <strong>Description:</strong> {room.desc}
                        </p>

                        <p className="text-muted small mb-1">
                          <strong>Category:</strong> {room.category}
                        </p>

                        <p className="text-muted small mb-1">
                          <strong>Bed Type:</strong> {room.bed}
                        </p>

                        <h5 className="text-success fw-bold mt-2">₹{room.price}</h5>
                      </div>

                      {/* Buttons */}
                      <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="rounded-3 px-3 py-2 shadow-sm"
                          onClick={() => handleEdit(room.id)}
                        >
                          <FaEdit />
                        </Button>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-3 px-3 py-2 shadow-sm"
                          onClick={() => handleDelete(room.id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No rooms available</p>
            )}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Home;
