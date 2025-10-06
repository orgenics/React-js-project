import { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [task, setTask] = useState({
    task: '',
    type: '',
    priority: '',
    person: '',
    img: '',
    members: [],
  });

  const [taskList, setTaskList] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [personOptions] = useState(['Garrison', 'Scout Regiment', 'Military Police']);
  const [memberOptions] = useState(['Ervin Smith', 'Eren Yeager', 'Armin Arlert']);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    getLocalstorageData();
  }, []);

  const getLocalstorageData = () => {
    try {
      const data = JSON.parse(localStorage.getItem('taskdata'));
      if (data) {
        setTaskList(data);
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
      setTaskList([]);
    } finally {
      setLoading(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const currentMembers = task.members || [];
      let newMembers;

      if (checked) {
        newMembers = [...currentMembers, value];
      } else {
        newMembers = currentMembers.filter((member) => member !== value);
      }
      setTask({ ...task, members: newMembers });
      setErrors({ ...errors, members: '' });
    } else {
      setTask({ ...task, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!task.task.trim()) newErrors.task = 'Task name is required.';
    if (!task.type.trim()) newErrors.type = 'Task type is required.';
    if (!task.priority.trim()) newErrors.priority = 'Please select a priority.';
    if (task.members.length === 0) newErrors.members = 'Select at least one member.';
    if (!task.person.trim()) newErrors.person = 'Please select a person.';
    if (!task.img.trim()) newErrors.img = 'Image URL is required.';
    else if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(task.img.trim())) {
      newErrors.img = 'Please enter a valid image URL.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitData = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix validation errors before submitting!', { position: 'bottom-right' });
      return;
    }

    const newList = [...taskList];

    if (editIndex !== -1) {
      newList[editIndex] = task;
      toast.info('Record Updated Successfully!', { position: 'bottom-right' });
    } else {
      const newTask = { ...task, id: new Date().getTime() };
      newList.push(newTask);
      toast.success('Record Added Successfully!', { position: 'bottom-right' });
    }

    setTaskList(newList);
    localStorage.setItem('taskdata', JSON.stringify(newList));

    setTask({
      task: '',
      type: '',
      priority: '',
      person: '',
      img: '',
      members: [],
    });
    setEditIndex(-1);
    setErrors({});
  };

  const removeData = (id) => {
    const newList = taskList.filter(item => item.id !== id);
    localStorage.setItem('taskdata', JSON.stringify(newList));
    setTaskList(newList);
    toast.warn('Record Deleted!', { position: 'bottom-right' });
  };

  const updateData = (id) => {
    const pos = taskList.findIndex((v) => v.id === id);
    if (pos !== -1) {
      setTask(taskList[pos]);
      setEditIndex(pos);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <Container>
        <h1 style={{ textAlign: 'center', marginTop: 20 }}>Task Manager</h1>

        <form onSubmit={submitData}>
          <table border={1} align="center" cellPadding={10}>
            <tbody>
              <tr>
                <td>Enter Task:</td>
                <td>
                  <input type="text" name="task" value={task.task} onChange={handleInputChange} />
                  {errors.task && <div className="error-text">{errors.task}</div>}
                </td>
              </tr>
              <tr>
                <td>Enter Type:</td>
                <td>
                  <input type="text" name="type" value={task.type} onChange={handleInputChange} />
                  {errors.type && <div className="error-text">{errors.type}</div>}
                </td>
              </tr>
              <tr>
                <td>Select Priority:</td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="priority"
                      value="urgent"
                      onChange={handleInputChange}
                      checked={task.priority === 'urgent'}
                    />{' '}
                    Urgent
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <input
                      type="radio"
                      name="priority"
                      value="overdue"
                      onChange={handleInputChange}
                      checked={task.priority === 'overdue'}
                    />{' '}
                    Overdue
                  </label>
                  {errors.priority && <div className="error-text">{errors.priority}</div>}
                </td>
              </tr>

              <tr>
                <td>Select Members:</td>
                <td>
                  {memberOptions.map((member) => (
                    <span key={member}>
                      <input
                        type="checkbox"
                        name="members"
                        value={member}
                        checked={task.members.includes(member)}
                        onChange={handleInputChange}
                      />{' '}
                      {member}&nbsp;
                    </span>
                  ))}
                  {errors.members && <div className="error-text">{errors.members}</div>}
                </td>
              </tr>

              <tr>
                <td>Select Person:</td>
                <td>
                  <select name="person" value={task.person} onChange={handleInputChange}>
                    <option value="">---select person---</option>
                    {personOptions.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  {errors.person && <div className="error-text">{errors.person}</div>}
                </td>
              </tr>

              <tr>
                <td>Image URL:</td>
                <td>
                  <input type="text" name="img" value={task.img} onChange={handleInputChange} />
                  {errors.img && <div className="error-text">{errors.img}</div>}
                </td>
              </tr>

              <tr>
                <td></td>
                <td style={{ textAlign: 'center' }}>
                  <input
                    type="submit"
                    value={editIndex !== -1 ? 'Update' : 'Add'}
                    className="submit-btn"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <br />
        <br />

        <table border={1} align="center" cellPadding={8}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Image</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Person</th>
              <th>Members</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              <tr><td colSpan="8" style={{ textAlign: "center" }}>Loading...</td></tr>
            ) : taskList.length > 0 ? (
              taskList.map((v, i) => (
                <tr key={v.id}>
                  <td>{i + 1}</td>
                  <td>{v.task}</td>
                  <td><img src={v.img} height={100} alt={v.task} /></td>
                  <td>{v.type}</td>
                  <td>{v.priority}</td>
                  <td>{v.person}</td>
                  <td>{v.members.join(', ')}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-delete" onClick={() => removeData(v.id)}>Delete</button>
                      <button className="btn-update" onClick={() => updateData(v.id)}>Update</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8" style={{ textAlign: "center" }}>No Records Found</td></tr>
            )}
          </tbody>
        </table>
        <ToastContainer />
      </Container>
    </>
  );
}

export default App;
