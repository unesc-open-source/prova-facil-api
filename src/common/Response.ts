export class Response{
    sucess: Boolean;
    message: String;
    object: any;

    constructor(sucess,message,object){
        this.sucess = sucess;
        this.message = message;
        this.object = object;
    }
}