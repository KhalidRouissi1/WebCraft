package routes
import 	(
	"github.com/gofiber/fiber/v2"
	"webcraft/controllers"
)



func Setup(app *fiber.App){
	app.Post("/api/register",controllers.Register)
	app.Post("/api/login",controllers.Login)
	app.Post("/api/logout",controllers.Logout)
	app.Get("/api/user",controllers.User)

	
}

