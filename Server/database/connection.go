package database

import (
	"webcraft/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

	var DB *gorm.DB


func Connect(){
	dsn := "host=localhost user=postgres password=root dbname=webcraft port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if(err !=nil){
		panic("could not connect to the database")
	}
	DB = db
	db.AutoMigrate(&models.User{},&models.Project{})
}

