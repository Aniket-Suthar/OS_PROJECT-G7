package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	fmt.Println("Enter your name")
	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')
	fmt.Println("Your name is :", input)
	fmt.Printf("The name type is :  %T \n", input)

	fmt.Println("Enter any number :")
	newinput, _ := reader.ReadString('\n')
	fmt.Printf("The type of readed number is: %T \n", newinput)

	convInput, err := strconv.ParseFloat(strings.TrimSpace(newinput), 64)
	if err != nil {
		fmt.Println(err)
	} else {

		fmt.Printf("The  new type is :  %T", convInput)
	}

}
