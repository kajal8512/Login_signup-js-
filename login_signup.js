console.log("Welcome to login and signup page") 
const fs =require("fs")
let data=require("readline-sync")

function password(password1){
    special_char=/[!@#$%^&*()_+<>?/]/, number=/[0-9]/, upper_case=/[A-z]/, lower_case=/[a-z]/
    if (special_char.test(password1) && number.test(password1) && upper_case.test(password1) && lower_case.test(password1)){
        return true
    }
    else{
        return false
    }
}


function file_exits(fileName){
    const file_path="/home/khushigondhale/Desktop/javascript/json/login_signup.js"+fileName
    console.log(file_path,"fgh");
    var exist=fs.existsSync(fileName)
    return exist
}

function read_file(fileName){
    var readFile=fs.readFileSync(fileName);
    converted_data=JSON.parse(readFile)
    return converted_data
}

function write_file(fileName,readfile){
    wrfile=fs.writeFileSync(fileName,readfile);
}

function checkId(id){
    var userId= read_file("DetailOfUser.json");
    for(i of converted_data){
        if(i["username"]===id){
            return true
        }
    }
    return false
}


function checkPsrwd(){
    var check = read_file("DetailOfUser.json");
    console.log(check)
    for(i of converted_data){
        if(i["password"]===password){
            return true
        }
    }
    return false
}


const choose_option = data.question("Enter the option,login or signup:")
if (choose_option=="login"){
    log_in()
}
else{
    sign_up()
}

function sign_up(){
        var username=data.question("Enter your name :-");
        var pwd=data.question("Enter your password:-");
        var fileexist=file_exits("DetailOfUser.json");
        console.log(fileexist);
        if(fileexist==true){
            var readingData=read_file("DetailOfUser.json")
            if(checkId(username)==true){
                console.log(username,"already Exists.\n Please choose a new Username.")
            }else{
                var checkingPwd = checkPsrwd(pwd)
                if(checkingPwd === true){
                    var designation=data.question("Enter your description:-")
                    var date_of_birth=data.question("Enter your DateOfBirth:-")
                    var Hobbies=data.question("Enter your hobbies:-")
                    var Gender=data.question("Enter your gender f/m:-")
                    dic=readingData.push({username: username, password: pwd, Designation:designation, DOB: date_of_birth, hobbies:Hobbies, Gender: Gender})
                    console.log(readingData)
                    write_file("DetailOfUser.json",JSON.stringify(readingData,null,3))
                }
                else{
                    console.log("This password already exists.\n Please Enter the strong password:");
                    sign_up();
                }
            }
        }
        else{
            emp_arr = []
            // readingData = readAfile(data.json)
            a=write_file("DetailOfUser.json",JSON.stringify(emp_arr,readingData))
            sign_up()
        }
}


function log_in(){
    var login_name=data.question("Enter your ur_name :-")
    var pwd=data.question("Enter your password :-")
    const readfile=read_file("DetailOfUser.json")
    const fileexits=file_exits("DetailOfUser.json")
    // console.log(buf_data);
    // console.log(fileexits);
    if(fileexits === true){
        if(checkId(login_name) === true){
            var check_pwd = checkPsrwd(pwd)
            if(check_pwd === true){
                console.log(login_name,"is logged is succesfully");
                console.log("here are the details:");
                // response=showDetails()
                function showDetails(){
                    open_file=read_file("DetailOfUser.json")
                    for(i of open_file){
                        if(i["username"]=login_name){
                            return`your name is ${i["username"]}. and your date of birth is ${i["date_of_birth"]} and your hobbies are ${i["Hobbies"]} and your gender is ${i["Genger"]} your Designation is ${i["designation"]}`
                        }
                    }
                }
                response=showDetails()
                console.log(response)
            }else{
                console.log("Please Enter correct password.");
            }
        }else{
            console.log(login_name,"Account not found.")
        }
    }else{
        console.log("This File doesn't exit Please create your account.")
    }

}
