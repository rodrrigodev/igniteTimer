import styled from "styled-components";

export const HistoryContainer = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 3.5rem;

    h1{
        font-size: 1.5rem;
        color: ${props=> props.theme["gray-100"]}
    }
`

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table{
        min-width: 600px;
        width: 100%;
        border-collapse: collapse;
    }

    th{
        background-color: ${props=> props.theme["gray-600"]};
        padding: 1rem;
        text-align: left;
        color: ${props=> props.theme["gray-100"]};
        font-size: .875rem;
        line-height: 1.6;

        &:first-child{
            border-top-left-radius: 8px;
            padding-left: 1.5rem;
        }

        &:last-child{
            border-top-right-radius: 8px;
            padding-right: 1.5rem;
        }
    }

    td{
        background-color: ${props=> props.theme["gray-700"]};
        border-top: 4px solid ${props=> props.theme["gray-800"]};
        padding: 1rem;
        font-size: .875rem;
        line-height: 1.6;

        &:first-child{
            width: 50%;
            padding-left: 1.5rem;
        }

        &:last-child{
            padding-right: 1.5rem;
        }
    }

`

const STATUS_COLORS = {
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500'
} as const
// as const means that the inferred types for the  STATUS_COLORS object are marked as read-only and cannot be modified.
//To understand more... remove the as const and put the mouse on const to see the diferente between
//Read more here: https://mainawycliffe.dev/blog/const-assertion-in-typescript/

interface StatusProps{
    statusColor: keyof typeof STATUS_COLORS
}


export const Status = styled.span<StatusProps>`
    display: flex;
    align-items: center;
    gap: .5rem;

    &::before{
        content: "";
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        background-color: ${props=> props.theme[STATUS_COLORS[props.statusColor]]};
    }
`

/*
To understand the keyof typeof usage in TypeScript, first you need to understand what are literal types and union of literal types. So, I'll explain these concepts first and then explain keyof and typeof individually in detail. After that, I'll come back to enum to answer what is asked in the question. It's a long answer but examples are easy to understand.

Literal types
Literal types in TypeScript are more specific types of string, number or boolean. For example, "Hello World" is a string, but a string is not "Hello World". "Hello World" is a more specific type of type string, so it is a literal type.

A literal type can be declared as following:

type Greeting = "Hello"
This means that the object of type Greeting can have only a string value "Hello" and no other string value or any other value of any other type as shown in the following code:

let greeting: Greeting
greeting = "Hello" // OK
greeting = "Hi"    // Error: Type '"Hi"' is not assignable to type '"Hello"'
Literal types are not useful on their own, however when combined with union types, type aliases and type guards they become powerful.

Following is an example of union of literal types:

type Greeting = "Hello" | "Hi" | "Welcome"
Now the object of type Greeting can have the value either "Hello", "Hi" or "Welcome".

let greeting: Greeting
greeting = "Hello"       // OK
greeting = "Hi"          // OK
greeting = "Welcome"     // OK
greeting = "GoodEvening" // Error: Type '"GoodEvening"' is not assignable to type 'Greeting'
keyof only
keyof of some type T gives you a new type that is a union of literal types and these literal types are the names of the properties of T. The resulting type is a subtype of string.

For example, consider the following interface:

interface Person {
    name: string
    age: number
    location: string
}
Using the keyof operator on the type Person will give you a new type as shown in the following code:

type SomeNewType = keyof Person
This SomeNewType is a union of literal types ("name" | "age" | "location") that is made from the properties of type Person.

Now you can create objects of type SomeNewType:

let newTypeObject: SomeNewType
newTypeObject = "name"           // OK
newTypeObject = "age"            // OK
newTypeObject = "location"       // OK
newTypeObject = "anyOtherValue"  // Error...

To understand the keyof typeof usage in TypeScript, first you need to understand what are literal types and union of literal types. So, I'll explain these concepts first and then explain keyof and typeof individually in detail. After that, I'll come back to enum to answer what is asked in the question. It's a long answer but examples are easy to understand.

Literal types
Literal types in TypeScript are more specific types of string, number or boolean. For example, "Hello World" is a string, but a string is not "Hello World". "Hello World" is a more specific type of type string, so it is a literal type.

A literal type can be declared as following:

type Greeting = "Hello"
This means that the object of type Greeting can have only a string value "Hello" and no other string value or any other value of any other type as shown in the following code:

let greeting: Greeting
greeting = "Hello" // OK
greeting = "Hi"    // Error: Type '"Hi"' is not assignable to type '"Hello"'
Literal types are not useful on their own, however when combined with union types, type aliases and type guards they become powerful.

Following is an example of union of literal types:

type Greeting = "Hello" | "Hi" | "Welcome"
Now the object of type Greeting can have the value either "Hello", "Hi" or "Welcome".

let greeting: Greeting
greeting = "Hello"       // OK
greeting = "Hi"          // OK
greeting = "Welcome"     // OK
greeting = "GoodEvening" // Error: Type '"GoodEvening"' is not assignable to type 'Greeting'
keyof only
keyof of some type T gives you a new type that is a union of literal types and these literal types are the names of the properties of T. The resulting type is a subtype of string.

For example, consider the following interface:

interface Person {
    name: string
    age: number
    location: string
}
Using the keyof operator on the type Person will give you a new type as shown in the following code:

type SomeNewType = keyof Person
This SomeNewType is a union of literal types ("name" | "age" | "location") that is made from the properties of type Person.

Now you can create objects of type SomeNewType:

let newTypeObject: SomeNewType
newTypeObject = "name"           // OK
newTypeObject = "age"            // OK
newTypeObject = "location"       // OK
newTypeObject = "anyOtherValue"  // Error...
keyof typeof together on an object
As you might already know, the typeof operator gives you the type of an object. In the above example of Person interface, we already knew the type, so we just had to use the keyof operator on type Person.

But what to do when we don't know the type of an object or we just have a value and not a type of that value like the following?

const bmw = { name: "BMW", power: "1000hp" }
This is where we use keyof typeof together.

The typeof bmw gives you the type: { name: string, power: string }

And then keyof operator gives you the literal type union as shown in the following code:

type CarLiteralType = keyof typeof bmw

let carPropertyLiteral: CarLiteralType
carPropertyLiteral = "name"       // OK
carPropertyLiteral = "power"      // OK
carPropertyLiteral = "anyOther"   // Error...

https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript
/*/