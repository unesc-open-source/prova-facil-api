module.exports = class Response {
    constructor(paramSucess, paramMessage, paramObject) {
        this.sucess = paramSucess;
        this.message = paramMessage;
        this.object = paramObject;
    }
}