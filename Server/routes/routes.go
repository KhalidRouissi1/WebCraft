package routes

import (
	"webcraft/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Post("/api/logout", controllers.Logout)
	app.Get("/api/user", controllers.User)
	app.Get("/api/projects", controllers.GetUserProjects)

	// Project Routes
	app.Post("/api/project", controllers.CreateProject)
	app.Get("/api/project/:id", controllers.GetProject)
	app.Put("/api/project/:id", controllers.UpdateProject)
	app.Delete("/api/project/:id", controllers.DeleteProject)

}
