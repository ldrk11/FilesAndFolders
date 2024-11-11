import fs from 'node:fs'
import path from 'node:path'
const readlineSync = require('readline-sync');

const programLocation = process.argv[2] ?? undefined
var folders: any
if (!programLocation){
    console.error("No input given")
    process.exit(1)
}
if (!fs.existsSync(programLocation)){
    console.error("Folder doesn't exist")
    process.exit(1)
}

function removeStartAndEndSlash(string: string){
    let newString = path.normalize(string)
    if (newString.startsWith(path.sep)){
        newString = newString.substring(1,newString.length)
    }
    if (newString.endsWith(path.sep)){
        newString = newString.substring(0,newString.length-1)
    }
    return newString
}

function unnumber(string: string){
    let numberStop
    let i = 0
    for (const char of string){
        let isNumber = parseInt(char).toString() == char
        if (!numberStop && !isNumber){
            numberStop = i
            break
        }
        i++
    }
    if (!numberStop) { return undefined }
    return string.substring(numberStop, string.length)
}

class CommandNotFoundError extends Error {
    constructor(unfoundcommand: any){
        super(unfoundcommand)
    }
}

folders = fs.readdirSync(programLocation)
folders.sort()

let workingValue: any
let stack: any[] = []

function runCode(folders: any, root: any){
    let run = true
    let i = 0 
    try {
        while (run){
            const command = folders[i]
            switch (unnumber(command)){
                case "SetValueStr":
                    var sub = fs.readdirSync(path.join(root, command)).sort()
                    workingValue = sub[0]
                    break
                case "SetValueNum":
                    var sub = fs.readdirSync(path.join(root, command)).sort()
                    workingValue = parseInt(sub[0])
                    break
                case "Print":
                    process.stdout.write(String(workingValue))
                    break
                case "NewLine":
                    process.stdout.write("\n")
                    break
                case "Input":
                    workingValue = readlineSync.question("")
                    break
                case "InputNum":
                    workingValue = parseInt(readlineSync.question(""))
                    break
                case "If":
                    if (!(workingValue <= 0)){
                        runCode(fs.readdirSync(path.join(root, command)), path.join(root, command))
                    }
                    break
                case "IfSkip":
                    if (!(workingValue <= 0)){
                        i++
                    }
                    break
                case "Goto":
                    const gotoValue = fs.readdirSync(path.join(root, command)).sort()[0]
                    let f = 0
                    for (const file of fs.readdirSync(root)){
                        if (file.startsWith(gotoValue)){
                            i = f-1
                            break
                        }
                        f++
                    }
                    break
                case "Push":
                    stack.push(workingValue)
                    workingValue = null
                    break
                case "Pop":
                    workingValue = stack.pop()
                    break
                case "Delete":
                    stack.pop()
                    break
                case "Copy":
                    stack.push(workingValue)
                    break
                case "PrintAscii":
                    process.stdout.write(String.fromCharCode(workingValue))
                    break
                case "Add":
                    workingValue = stack.pop() + stack.pop()
                    break
                case "Subtract":
                    workingValue = stack.pop() - stack.pop()
                    break
                case "Multiply":
                    workingValue = stack.pop() * stack.pop()
                    break
                case "Divide":
                    workingValue = stack.pop() / stack.pop()
                    break
                case "Modulo":
                    workingValue = stack.pop() % stack.pop()
                    break
                case "Shift":
                    stack.push(stack.shift())
                    break
                case "End":
                    process.exit(0)
                default:
                    throw new CommandNotFoundError(unnumber(command))
            }
            i++
            if (i >= folders.length){
                run = false
            }
        }
    } catch (e) {
        console.error(e)
    }
}

runCode(folders, programLocation)

// (async () => {
//     await runCode(folders)
// })()