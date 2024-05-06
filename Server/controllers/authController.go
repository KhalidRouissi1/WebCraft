package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"
	"webcraft/database"
	"webcraft/models"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}

	database.DB.Create(&user)
	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User
	database.DB.Where("email=?", data["email"]).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.Id)),
		ExpiresAt: jwt.At(time.Now().Add(time.Hour * 24)), // 1 day

	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		return err // Return the error here
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: false,
		Path:     "/",
		SameSite: "None", // Set SameSite attribute to "None"
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{"Message": "Success Login"})
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	fmt.Println(cookie)
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	database.DB.Where("id = ?", claims.Issuer).First(&user)

	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: false,
		SameSite: "None",
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func GetUserProjects(c *fiber.Ctx) error {

	userID, err := GetUserIDFromCookie(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "unauthenticated"})

	}
	var projects []models.Project
	if err := database.DB.Where("user_id = ?", userID).Find(&projects).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch user projects"})
	}

	return c.JSON(projects)
}

func GetUserIDFromCookie(c *fiber.Ctx) (uint, error) {
	cookie := c.Cookies("jwt")
	fmt.Println("The Cookie is: ", cookie)

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return 0, err
	}

	claims := token.Claims.(*jwt.StandardClaims)

	// Parse userID from string to uint
	userID, err := strconv.ParseUint(claims.Issuer, 10, 64)
	if err != nil {
		return 0, err
	}

	return uint(userID), nil
}
