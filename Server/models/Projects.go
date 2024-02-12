package models

type Project struct {
	ID     uint   `json:"id"`
	Name   string `json:"name"`
	Data   string `json:"data"`
	UserID uint   `json:"userId"`
}