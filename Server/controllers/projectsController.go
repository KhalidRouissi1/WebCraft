package controllers

import (
	"fmt"
	"strconv"
	"webcraft/database"
	"webcraft/models"

	"github.com/gofiber/fiber/v2"
)

// CreateProject handles POST requests to create a new project for a user
func  CreateProject(c *fiber.Ctx) error {
	var project models.Project
    if err := c.BodyParser(&project); err != nil {
        // Print out the error for debugging
        fmt.Println("Error parsing request body:", err)
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }


    // Here you would typically authenticate the user and retrieve their ID

    userID, err := GetUserIDFromCookie(c)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "unauthenticated"})
    }
    project.UserID = userID

    // Save project to the database
    if err := database.DB.Create(&project).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create project"})
    }

    return c.Status(fiber.StatusCreated).JSON(project)
}

// GetProject handles GET requests to retrieve a specific project by ID
func  GetProject(c *fiber.Ctx) error {
    id, err := strconv.ParseUint(c.Params("id"), 10, 64)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid project ID"})
    }

    var project models.Project
    if err := database.DB.Where("id = ?", id).First(&project).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Project not found"})
    }

    return c.JSON(project)
}

// UpdateProject handles PUT requests to update an existing project
func  UpdateProject(c *fiber.Ctx) error {
    id, err := strconv.ParseUint(c.Params("id"), 10, 64)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid project ID"})
    }

    var project models.Project
    if err := database.DB.Where("id = ?", id).First(&project).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Project not found"})
    }

    if err := c.BodyParser(&project); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }

    // Save updated project to the database
    if err := database.DB.Save(&project).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update project"})
    }

    return c.JSON(project)
}

// DeleteProject handles DELETE requests to delete an existing project
func  DeleteProject(c *fiber.Ctx) error {
    id, err := strconv.ParseUint(c.Params("id"), 10, 64)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid project ID"})
    }

    // Delete project from the database
    if err := database.DB.Where("id = ?", id).Delete(&models.Project{}).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete project"})
    }

    return c.JSON(fiber.Map{"message": "Project deleted successfully"})
}
