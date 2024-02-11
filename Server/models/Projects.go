package models



type Project struct {
    ID      uint   `json:"id"`
    Name    string `json:"name"`
    Content string `json:"content" gorm:"type:LONGTEXT"`
	UserID  uint   `json:"userId" gorm:"index"` 
}
