package models

type User struct {
    Id       uint   `json:"id"`
    Name     string `json:"name"`
    Email    string `json:"email" gorm:"unique"`
    Password []byte
    IsAdmin  bool   `json:"isAdmin"`
	Projects []Project `json:"projects" gorm:"foreignKey:UserID"` 
}
