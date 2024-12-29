import React, { useState } from "react";
import DisplayTable from "./DisplayTable"; // Import the DisplayTable component
import axios from "axios";
import "./style/AdminDashboard.css";

function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState("");
  const [newRecord, setNewRecord] = useState({
    student_id: "",
    student_name: "",
    semester: "",
    year_joined: "",
    phone: "",
    password: "", // Password field for the student
    role: "", // Role field for the student
    teacher_id: "",
    teacher_name: "",
    teacher_password: "", // Password field for the teacher
    teacher_role: "", // Role field for the teacher
    receptionist_id: "",
    receptionist_name: "",
    receptionist_phone: "",
    receptionist_password: "", // Password field for the receptionist
    receptionist_role: "", // Role field for the receptionist
  });

  // Handle the section change (Student, Teacher, or Receptionist)
  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  // Add a new record based on the selected table
  const handleAddRecord = async () => {
    let url = "";
    let data = {};

    // Construct the URL and data based on the selected section
    if (selectedSection === "student-table") {
      url = "http://localhost:5000/api/admin/student-table/add";
      data = {
        student_id: newRecord.student_id,
        student_name: newRecord.student_name,
        semester: newRecord.semester,
        year_joined: newRecord.year_joined,
        phone: newRecord.phone,
        password: newRecord.password,
        role: newRecord.role,
      };
    } else if (selectedSection === "teacher-table") {
      url = "http://localhost:5000/api/admin/teacher-table/add";
      data = {
        teacher_id: newRecord.teacher_id,
        teacher_name: newRecord.teacher_name,
        password: newRecord.teacher_password,
        role: newRecord.teacher_role,
      };
    } else if (selectedSection === "receptionist-table") {
      url = "http://localhost:5000/api/admin/receptionist-table/add";
      data = {
        receptionist_id: newRecord.receptionist_id,
        receptionist_name: newRecord.receptionist_name,
        receptionist_phone: newRecord.receptionist_phone,
        password: newRecord.receptionist_password,
        role: newRecord.receptionist_role,
      };
    }

    try {
      const response = await axios.post(url, data);
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error("Error adding record:", error);
      alert("Failed to add record");
    }
  };

  // Delete a record based on the selected table
  const handleDeleteRecord = async (id) => {
    let url = "";

    // Construct the URL based on the selected section
    if (selectedSection === "student-table") {
      url = `http://localhost:5000/api/admin/student-table/delete/${id}`;
    } else if (selectedSection === "teacher-table") {
      url = `http://localhost:5000/api/admin/teacher-table/delete/${id}`;
    } else if (selectedSection === "receptionist-table") {
      url = `http://localhost:5000/api/admin/receptionist-table/delete/${id}`;
    }

    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        alert("Record deleted successfully!");
        // Optionally, you can refresh the table or perform additional actions here
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record. Please try again.");
    }
  };

  return (
    <>
      <div className="Admin-Dashboar">
        <h1>Admin Dashboard</h1>
        <div className="selectTable">
          <button onClick={() => handleSectionChange("student-table")}>
            Student Table
          </button>
          <button onClick={() => handleSectionChange("teacher-table")}>
            Teacher Table
          </button>
          <button onClick={() => handleSectionChange("receptionist-table")}>
            Receptionist Table
          </button>
        </div>

        {selectedSection && (
          <DisplayTable
            tableName={selectedSection}
            handleDeleteRecord={handleDeleteRecord}
          />
        )}

        
          {selectedSection === "student-table" && (
            <div className="input_form">

              <input
                type="text"
                name="student_id"
                placeholder="Student ID"
                value={newRecord.student_id}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="student_name"
                placeholder="Student Name"
                value={newRecord.student_name}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="semester"
                placeholder="Semester"
                value={newRecord.semester}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="year_joined"
                placeholder="Year Joined"
                value={newRecord.year_joined}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newRecord.phone}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newRecord.password}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="role"
                placeholder="Role (student, teacher, etc.)"
                value={newRecord.role}
                onChange={handleInputChange}
              />
              <button onClick={handleAddRecord}>Add Student</button>
              {/* <button onClick={handleDeleteRecord}>Deletestudent</button> */}
            </div>
          )}

          {selectedSection === "teacher-table" && (
            <div className="input_form">
              <input
                type="text"
                name="teacher_id"
                placeholder="Teacher ID"
                value={newRecord.teacher_id}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="teacher_name"
                placeholder="Teacher Name"
                value={newRecord.teacher_name}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="teacher_password"
                placeholder="Password"
                value={newRecord.teacher_password}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="teacher_role"
                placeholder="Role (teacher)"
                value={newRecord.teacher_role}
                onChange={handleInputChange}
              />
              <button onClick={handleAddRecord}>Add Teacher</button>
              {/* <button onClick={handleDeleteRecord}>DeleteReceptionist</button> */}
            </div>
          )}

          {selectedSection === "receptionist-table" && (
            <div className="input_form">
              <input
                type="text"
                name="receptionist_id"
                placeholder="Receptionist ID"
                value={newRecord.receptionist_id}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="receptionist_name"
                placeholder="Receptionist Name"
                value={newRecord.receptionist_name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="receptionist_phone"
                placeholder="Receptionist Phone"
                value={newRecord.receptionist_phone}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="receptionist_password"
                placeholder="Password"
                value={newRecord.receptionist_password}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="receptionist_role"
                placeholder="Role (receptionist)"
                value={newRecord.receptionist_role}
                onChange={handleInputChange}
              />
              <button onClick={handleAddRecord}>Add Receptionist</button>
            </div>
          )}
        </div>
   
    </>
  );
}

export default AdminDashboard;
