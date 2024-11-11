# FoldersAndFiles!  
Esolang that takes in input of a folder that has folders and files in it (which makes up the program)

- First numbers of command names are ignored 
    - Both "000001CommandName" and "1CommandName" will run as the first command (I mean that the number length doesnt matter not that you should do this in your program)
- Runs in numarical order (see above point)

## Commands
0 Args means use as a file or empty folder
| Command | Description | Args (files/folders) |
|---------|-------------|----------------------|
|Print|Prints the working value|0|
|PrintAscii|Gets the working values ascii character and prints it|0|
|Input|Takes input and sets the working value to the result|0|
|InputNum|Takes input and sets the working value to the result (As number)|0|
|Pop|Pop most recent item in stack and sets it as the working value|0|
|Push|Push the working value to the top of the stack and emptys the working value|0|
|Delete|Same as Pop command but doesn't set the working value|0|
|Copy|Same as Push command but doesn't empty the working value|0|
|Duplicate|Duplicate the top value on the stack|0|
|Add|Pop and Add top 2 values on stack and sets the working value to the result|0|
|Subtract|Pop and Subtract top 2 values on stack and sets the working value to the result|0|
|Multiply|Pop and Multiply top 2 values on stack and sets the working value to the result|0|
|Divide|Pop and Divide top 2 values on stack and sets the working value to the result|0|
|Modulo|Pop and Modulo top 2 values on stack and sets the working value to the result|0|
|IfSkip|Skips past the next command unless the working value is negitave or 0|Infinite|
|If|Runs code inside folder unless the working value is negitave or 0|Infinite|
|Goto|Gets the number in the file then goes to the folder/file with that number|1|
|End|Ends program|0|
|SetValueStr|Sets working value to the file (As string)|1|
|SetValueNum|Sets working value to the file (As number)|1|
|Shift|Pops the top value of the stack and pushes to the bottom|0|
|NewLine|New line in console|0|

## Examples
### Hello World
- 1SetValueStr
    - Hello World
- 2Print
### Truth Machine
- 1Input
- 2If
    - 3Print
    - 4Goto
        - 3
- 6Print

