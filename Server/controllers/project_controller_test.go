package controllers

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"strconv"
	"testing"
	"webcraft/models"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockDB struct {
	mock.Mock
}

func (m *MockDB) Create(value interface{}) error {
	args := m.Called(value)
	return args.Error(0)
}

func (m *MockDB) Where(query string, args ...interface{}) *MockDB {
	m.Called(query, args)
	return m
}

func (m *MockDB) First(dest interface{}) error {
	args := m.Called(dest)
	return args.Error(0)
}

func (m *MockDB) Save(value interface{}) error {
	args := m.Called(value)
	return args.Error(0)
}

func (m *MockDB) Delete(value interface{}) error {
	args := m.Called(value)
	return args.Error(0)
}

func setupApp(mockDB *MockDB) *fiber.App {
	app := fiber.New()

	app.Post("/projects", func(c *fiber.Ctx) error {
		var project models.Project
		if err := c.BodyParser(&project); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}

		if err := mockDB.Create(&project); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create project"})
		}

		return c.Status(fiber.StatusCreated).JSON(project)
	})

	app.Get("/projects/:id", func(c *fiber.Ctx) error {
		id, err := strconv.ParseUint(c.Params("id"), 10, 64)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid project ID"})
		}

		project := models.Project{ID: uint(id)}
		if err := mockDB.First(&project); err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Project not found"})
		}

		return c.JSON(project)
	})

	app.Put("/projects/:id", func(c *fiber.Ctx) error {
		id, err := strconv.ParseUint(c.Params("id"), 10, 64)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid project ID"})
		}

		var updatedProject models.Project
		if err := c.BodyParser(&updatedProject); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}
		updatedProject.ID = uint(id)

		existingProject := models.Project{ID: uint(id)}
		if err := mockDB.First(&existingProject); err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Project not found"})
		}

		if err := mockDB.Save(&updatedProject); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update project"})
		}

		return c.JSON(updatedProject)
	})

	app.Delete("/projects/:id", func(c *fiber.Ctx) error {
		id, err := strconv.ParseUint(c.Params("id"), 10, 64)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid project ID"})
		}

		project := models.Project{ID: uint(id)}
		if err := mockDB.Delete(&project); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete project"})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Project deleted successfully"})
	})

	return app
}

func TestCreateProject(t *testing.T) {
	mockDB := new(MockDB)
	app := setupApp(mockDB)

	inputProject := models.Project{
		Name:   "Test Project",
		Data:   "Sample Data",
		UserID: 1,
	}


	mockDB.On("Create", mock.MatchedBy(func(project *models.Project) bool {
		return project.Name == inputProject.Name &&
			project.Data == inputProject.Data &&
			project.UserID == inputProject.UserID
	})).Return(nil).Run(func(args mock.Arguments) {
		project := args.Get(0).(*models.Project)
		project.ID = 1 
	})

	body, _ := json.Marshal(inputProject)
	req := httptest.NewRequest("POST", "/projects", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	res, err := app.Test(req, -1)
	assert.NoError(t, err)
	assert.Equal(t, fiber.StatusCreated, res.StatusCode)

	var responseProject models.Project
	json.NewDecoder(res.Body).Decode(&responseProject)
	assert.NotZero(t, responseProject.ID)
	assert.Equal(t, inputProject.Name, responseProject.Name)
	assert.Equal(t, inputProject.Data, responseProject.Data)
	assert.Equal(t, inputProject.UserID, responseProject.UserID)

	mockDB.AssertExpectations(t)
}

func TestGetProject(t *testing.T) {
	mockDB := new(MockDB)
	app := setupApp(mockDB)

	projectID := uint(1)
	returnProject := models.Project{
		ID:     projectID,
		Name:   "Test Project",
		Data:   "Sample Data",
		UserID: 1,
	}

	mockDB.On("First", &models.Project{ID: projectID}).Return(nil).Run(func(args mock.Arguments) {
		arg := args.Get(0).(*models.Project)
		*arg = returnProject
	})

	req := httptest.NewRequest("GET", "/projects/"+strconv.Itoa(int(projectID)), nil)
	res, err := app.Test(req, -1)

	assert.NoError(t, err)
	assert.Equal(t, fiber.StatusOK, res.StatusCode)

	var responseProject models.Project
	json.NewDecoder(res.Body).Decode(&responseProject)
	assert.Equal(t, returnProject, responseProject)

	mockDB.AssertExpectations(t)
}

func TestUpdateProject(t *testing.T) {
	mockDB := new(MockDB)
	app := setupApp(mockDB)

	projectID := uint(1)
	existingProject := models.Project{
		ID:     projectID,
		Name:   "Test Project",
		Data:   "Sample Data",
		UserID: 1,
	}

	updatedProject := models.Project{
		ID:     projectID,
		Name:   "Updated Project Name",
		Data:   "Updated Sample Data",
		UserID: 1,
	}

	mockDB.On("First", &models.Project{ID: projectID}).Return(nil).Run(func(args mock.Arguments) {
		arg := args.Get(0).(*models.Project)
		*arg = existingProject
	})
	mockDB.On("Save", mock.MatchedBy(func(project *models.Project) bool {
		return project.ID == updatedProject.ID &&
			project.Name == updatedProject.Name &&
			project.Data == updatedProject.Data &&
			project.UserID == updatedProject.UserID
	})).Return(nil)

	body, _ := json.Marshal(updatedProject)
	req := httptest.NewRequest("PUT", "/projects/"+strconv.Itoa(int(projectID)), bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	res, err := app.Test(req, -1)
	assert.NoError(t, err)
	assert.Equal(t, fiber.StatusOK, res.StatusCode)

	var responseProject models.Project
	json.NewDecoder(res.Body).Decode(&responseProject)
	assert.Equal(t, updatedProject, responseProject)

	mockDB.AssertExpectations(t)
}

func TestDeleteProject(t *testing.T) {
	mockDB := new(MockDB)
	app := setupApp(mockDB)

	projectID := uint(1)

	mockDB.On("Delete", &models.Project{ID: projectID}).Return(nil)

	req := httptest.NewRequest("DELETE", "/projects/"+strconv.Itoa(int(projectID)), nil)
	res, err := app.Test(req, -1)
	
	assert.NoError(t, err)
	assert.Equal(t, fiber.StatusOK, res.StatusCode)

	var response map[string]string
	json.NewDecoder(res.Body).Decode(&response)
	assert.Equal(t, "Project deleted successfully", response["message"])

	mockDB.AssertExpectations(t)
}