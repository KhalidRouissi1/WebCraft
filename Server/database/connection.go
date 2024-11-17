package database

import (
	"fmt"
	"log"
	"os"
	"webcraft/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// Connect initializes a connection to the PostgreSQL database using GORM.
// It reads Environment Variables from the .env
// Example Usage:
// Call `database.Connect()` during the initialization of your application to set up the database connection.
// Note:
// Ensure the `.env` file exists and contains the required variables.
func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")
	sslmode := os.Getenv("DB_SSLMODE")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		host, user, password, dbname, port, sslmode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}

	DB = db

	err = db.AutoMigrate(&models.User{}, &models.Project{})
	if err != nil {
		log.Fatalf("Error during migration: %v", err)
	}
}
