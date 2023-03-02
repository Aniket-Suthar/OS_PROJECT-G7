package main

import "fmt"

func main() {
	fmt.Println("Pointers In GOLANG")
	var pointer *int
	fmt.Println("Without Initialisation , pointer is ", pointer)

	number := 100

	// referencing to memory of num1
	ptr_num1 := &number
	fmt.Println("Value of address of num1 ", ptr_num1)
	fmt.Println("Value of variable num1 ", *ptr_num1)

	*ptr_num1 *= 2
	fmt.Println("Value of variable num1 after Pointer Operation ", number)

}
