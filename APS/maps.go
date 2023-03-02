package main

import "fmt"

func main() {
	fmt.Println("Maps in GoLang...")

	//Defining a map
	Roll_name := make(map[int]string)
	Roll_name[1] = "Aniket"
	Roll_name[2] = "Prayag"
	Roll_name[3] = "Jugal"
	Roll_name[4] = "Umang"

	//By Default Maps are sorted
	fmt.Println("The Student Data is :", Roll_name)

	//"delete" keyword used to remove a particular item from Map
	delete(Roll_name, 3)
	fmt.Println("The Updated  Student Data is :", Roll_name)

	//For-Each loop used to get the value of the Map
	fmt.Println("The New Student Data is :")
	for value, key := range Roll_name {
		fmt.Printf("The Roll no of %v is %v\n", value, key)
	}

}
