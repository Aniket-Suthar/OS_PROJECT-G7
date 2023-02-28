package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	fmt.Println("Dice Game In Golang !!! ")

	rand.Seed(time.Now().UnixNano())

	/* generates Random Number Between 0 to 5 */
	diceNumber := rand.Intn(6) + 1

	fmt.Println("The value of Dice is ", diceNumber)

	// there is by default break in Go

	switch diceNumber {
	case 1:
		fmt.Println("You can move 1 step . ")
	case 2:
		fmt.Println("You can move 2 step . ")
	case 3:
		fmt.Println("You can move 3 step . ")
		// fallthrough allows us to execute the next statement below it
		fallthrough
	case 4:
		fmt.Println("You can move 4 step . ")
	case 5:
		fmt.Println("You can move 5 step . ")
	case 6:
		fmt.Println("You can move 6 step . You can play again ")
	default:
		fmt.Println("Can't be Performed Please Enter valid Number....")
	}
}
