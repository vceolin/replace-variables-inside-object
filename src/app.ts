const incompleteObject = {
    NoVariable: "Something",
    JustTheObject: "{{someObject}}",
    JustTheString: "{{name}}",
    IntegerValue: "{{integer}}",
    StringInsideOtherString: "Bla bla bla {{name}}",
    ObjectInsideString: "The acronym is {{name}}",
    VariableThatDoesntExist: "{{thisdoesntexist}}",
    ArrayToTestNestedStuff: [
        {
            JustTheObject: "{{someObject}}",
            JustTheString: "{{name}}"
        },
        {
            JustTheObject: "{{someObject}}",
            JustTheString: "{{name}}"
        }
    ]
}

const variablesToSubstitute: Record<string, unknown> = {
    someObject: { some:'value' },
    name: 'another value',
    integer: 2,
    lastName: 'this variable exists but wont be used' 
}

const replaceVariables = (objectToReplace: unknown, variables: Record<string, unknown>) => {
    let stringfiedObject = JSON.stringify(objectToReplace)
    stringfiedObject = replaceEntireProperty(stringfiedObject, variables)
    stringfiedObject = replaceSubstring(stringfiedObject, variables)
    const result = JSON.parse(stringfiedObject)
    return result
}

const replaceEntireProperty = (stringfiedObject: string, variables: Record<string, unknown>) => {
    stringfiedObject = stringfiedObject.replace(/"{{[\w]+}}"/g, (substring: string, ...args: any[]) => {
        const substringWithoutBracesAndComma = substring.substring(3, substring.length-3)
        return JSON.stringify(variablesToSubstitute[substringWithoutBracesAndComma] ?? removeAllUnescapedCommas(substring))
    })
    return stringfiedObject
}

const replaceSubstring = (stringfiedObject: string, variables: Record<string, unknown>) => {
    stringfiedObject = stringfiedObject.replace(/{{[\w]+}}/g, (substring: string, ...args: any[]) => {
        const substringWithoutBraces = substring.substring(2, substring.length-2)
        return removeAllUnescapedCommas(JSON.stringify(variablesToSubstitute[substringWithoutBraces] ?? substring))
    })
    return stringfiedObject
}

const removeAllUnescapedCommas = (stringToUnescape: string) => {
    return stringToUnescape.replace(/(?<!\\)\"/g, "")
} 

console.log(`*****BEFORE*****`, JSON.stringify(incompleteObject, null, 2))

const result = replaceVariables(incompleteObject, variablesToSubstitute)

console.log(JSON.stringify(result, undefined, 2))
console.log(`*****AFTER*****`, JSON.stringify(result, null, 2))


