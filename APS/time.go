package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Welcome to Time Study of GoLang")
	currTime := time.Now()

	fmt.Println(currTime)

	fmt.Println(currTime.Format("01-02-2006 Monday 15:04:05"))

	createDate := time.Date(2330, time.September, 24, 4, 22, 23, 12, time.UTC)
	fmt.Println(createDate)

	timeINNanoSince1970 := time.Now().UnixNano()
	fmt.Println(timeINNanoSince1970)

}
