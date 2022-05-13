# replace-variables-inside-object
Made to answer this StackOverflow question: https://stackoverflow.com/questions/72229018/best-way-to-replace-strings-inside-an-javascript-object

First, install the dependencies
```
yarn install
```
Then just run it with
```
yarn start:dev
```
------------------------
## Best way to replace strings inside an JavaScript object
I have an `unknown` javascript object (let's call it `IncompleteObject` just for readability) and an array of `IVariables` which can be anything, but in the following format:
```typescript
key: string
value: unknown
```
Example:

IVariables:
```typescript
[
    { key: 'someObject', value: { some:'value' },
    { key: 'name', value: 'another value' },
    { key: 'lastName', value: 'this variable exists but wont be used' }
]
```

IncompleteObject:
```typescript
{
    ID: "SGML",
	SortAs: "{{someObject}}",
	GlossTerm: "Standard Generalized Markup Language",
	Acronym: "The acronym is {{name}}",
	GlossSee: "markup"
}
```
Expected Result:
```typescript
{
    ID: "SGML",
	SortAs: { 
        some:'value' 
    },
	GlossTerm: "Standard Generalized Markup Language",
	Acronym: "The acronym is another value",
	GlossSee: "markup"
}
```
The solution i thought was stringfying the object, replacing everything as strings and then trying to parse as JSON again (if it fails, it fails), but i'm wondering if there is a better solution to this... Also idk how to make it so that the SortAs for example becomes an object and not a string

Thanks!

*Notes:  
- The object won't necessarily have all variables, like the example.  
- The {{}} format is just an idea, i have no problem changing it since {} is used in JSON