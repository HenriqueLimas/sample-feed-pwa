package articles

// Article type for articles
type Article struct {
	URL      string `json:"url"`
	Title    string `json:"title"`
	Subtitle string `json:"subtitle"`
	Image    string `json:"image"`
}

// Articles list of article
type Articles []Article

// MainPage list of articles
type MainPage struct {
	Headline Article  `json:"headline"`
	Articles Articles `json:"articles"`
}

// GetMainPage list latest articles
func GetMainPage() MainPage {
	return MainPage{
		Headline: Article{
			URL:      "posts/123456",
			Title:    "Snowing hard this week",
			Subtitle: "Montepelier will have a lot of snow today",
			Image:    "https://monosnap.com/file/MPTTcBp3h8e2by9o7YB4p437Ckux8g.png",
		},
		Articles: Articles{
			Article{URL: "/posts/569878", Title: "John closed", Subtitle: "John store closed yesterday", Image: "https://monosnap.com/file/QYowGO3y9hIyRH8c6FuhXsR5X9XJBU.png"},
			Article{URL: "/posts/984564", Title: "Taxi vs Uber", Subtitle: "Who will win that battle in Montepelier", Image: "https://monosnap.com/file/GOtFNlrmvq0NGgRTV8nX0K5oTuT1iZ.png"},
			Article{URL: "/posts/787878", Title: "New Graffito", Subtitle: "The wall has a new Graffito", Image: "https://monosnap.com/file/csxHA93yyHdaFd1PoL7H8eDV44f6lW.png"},
			Article{URL: "/posts/548975", Title: "Murder on downtown", Subtitle: "Yesterday downtown had a murder", Image: "https://monosnap.com/file/XN4zaQlEhCd0xtQOBWxt0RaKJQTHNz.png"},
		},
	}
}
