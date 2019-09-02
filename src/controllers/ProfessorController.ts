import {
    Authenticated,
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Required,
    Status
  } from "@tsed/common";
  import {NotFound} from "ts-httpexceptions";

  @Controller("/professor")
  export class CalendarsCtrl {
  
    constructor() {
  
    }
  
    @Get("/")
    async get() {
        return 'Hello World'
    }
  }
  