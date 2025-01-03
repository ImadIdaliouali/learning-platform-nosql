// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function getAllCourses(req, res) {
  // TODO: Implémenter la récupération de tous les cours
  // Utiliser les services pour la logique réutilisable
  try {
    const courses = await mongoService.findMany("courses", {});
    if (!courses) {
      return res.status(404).json({ error: "Courses not found" });
    }
    res.json(courses);
  } catch (error) {
    console.error("Error getting all courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const course = req.body;
    const insertedCourse = await mongoService.insertOne("courses", course);
    if (!insertedCourse) {
      return res.status(400).json({ error: "Failed to create course" });
    }
    res.status(201).json({ _id: insertedCourse.insertedId, ...course });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCourse(req, res) {
  // TODO: Implémenter la récupération d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    const course = await mongoService.findOneById("courses", courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCourse(req, res) {
  // TODO: Implémenter la mise à jour d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    const course = req.body;
    const updatedCourse = await mongoService.updateOne(
      "courses",
      courseId,
      course
    );
    if (!updatedCourse) {
      return res.status(400).json({ error: "Failed to update course" });
    }
    res.json({ _id: courseId, ...course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteCourse(req, res) {
  // TODO: Implémenter la suppression d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    const deletedCourse = await mongoService.deleteOne("courses", courseId);
    if (!deletedCourse) {
      return res.status(400).json({ error: "Failed to delete course" });
    }
    res.json({ _id: courseId });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
};
