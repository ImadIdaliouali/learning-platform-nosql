const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

/* Students collection
{
  _id: ObjectId("5f8d0f5b9d3e7a1b2c3d4e61"),
  name: "Alice Smith",
  email: "alice.smith@example.com",
  enrolledCourses: [
    {
      courseId: ObjectId("5f8d0f5b9d3e7a1b2c3d4e5f"),
      title: "Introduction to Web Development",
      enrollmentDate: ISODate("2023-02-01T00:00:00Z"),
    },
    {
      courseId: ObjectId("5f8d0f5b9d3e7a1b2c3d4e62"),
      title: "Python Programming Fundamentals",
      enrollmentDate: ISODate("2023-03-15T00:00:00Z"),
    }
  ],
}
*/

async function getAllStudents(req, res) {
  try {
    const students = await mongoService.findMany("students");
    if (!students) {
      return res.status(404).json({ error: "Students not found" });
    }
    res.json(students);
  } catch (error) {
    console.error("Failed to get students:", error);
    res.status(500).json({ error: "Failed to get students" });
  }
}

async function createStudent(req, res) {
  try {
    const student = {
      ...req.body,
      enrolledCourses: [],
    };
    const insertedStudent = await mongoService.insertOne("students", student);
    if (!insertedStudent) {
      return res.status(400).json({ error: "Failed to create student" });
    }
    res.status(201).json({ _id: insertedStudent.insertedId, ...student });
  } catch (error) {
    console.error("Failed to create student:", error);
    res.status(500).json({ error: "Failed to create student" });
  }
}

async function getStudent(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
    const student = await mongoService.findOneById("students", studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Failed to get student:", error);
    res.status(500).json({ error: "Failed to get student" });
  }
}

async function updateStudent(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
    const student = req.body;
    const updatedStudent = await mongoService.updateOne(
      "students",
      studentId,
      student
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ _id: studentId, ...student });
  } catch (error) {
    console.error("Failed to update student:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
}

async function deleteStudent(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
    const deletedStudent = await mongoService.deleteOne("students", studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ _id: studentId });
  } catch (error) {
    console.error("Failed to delete student:", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
}

async function enrollCourse(req, res) {
  try {
    // Enroll student in a course
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
    const courseId = req.body.courseId;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    const course = await mongoService.findOneById("courses", courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const student = await mongoService.findOneById("students", studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    // Check if student is already enrolled in the course
    const isEnrolled = student.enrolledCourses.some(
      (enrollment) => enrollment.courseId.toString() === courseId
    );
    if (isEnrolled) {
      return res.status(400).json({ error: "Student already enrolled" });
    }
    // Enroll student in the course
    const enrollment = {
      courseId: new ObjectId(courseId),
      title: course.title,
      enrollmentDate: new Date(),
    };
    const updatedStudent = await mongoService.updateOne("students", studentId, {
      $push: { enrolledCourses: enrollment },
    });
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    // Increment course enrollment count
    const updatedCourse = await mongoService.updateOne("courses", courseId, {
      $inc: { enrollmentCount: 1 },
    });
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(enrollment);
  } catch (error) {
    console.error("Failed to enroll course:", error);
    res.status(500).json({ error: "Failed to enroll course" });
  }
}

async function getStudentEnrolledCourses(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
    const student = await mongoService.findOneById("students", studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student.enrolledCourses);
  } catch (error) {
    console.error("Failed to get student enrolled courses:", error);
    res.status(500).json({ error: "Failed to get student enrolled courses" });
  }
}

module.exports = {
  getAllStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  enrollCourse,
  getStudentEnrolledCourses,
};
