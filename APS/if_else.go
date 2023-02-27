package main

import "fmt"

func main() {
	fmt.Println("If else conditionals in GO")

	var count int = 99

	if count2 := 101; count == 100 && count2 > 100 {
		fmt.Println("Equals to 100")
	} else if count > 100 {
		fmt.Println("Count is greater than 100")
	} else {
		fmt.Println("Less than 100")
	}
}
