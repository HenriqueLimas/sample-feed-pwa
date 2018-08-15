package database

import (
	"database/sql/driver"
)

// Image scan the value of the image from the image composite type from the DB model
type Image struct {
	Url   string
	Title string
}

func (img *Image) Scan(src interface{}) error {
	imageData := Row(src)

	*img = Image{
		Url:   imageData[0],
		Title: imageData[1],
	}
	return nil
}

func (img Image) Value() (driver.Value, error) {
	return img, nil
}
