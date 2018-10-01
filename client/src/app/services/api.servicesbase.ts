import { Injectable } from "@angular/core";

@Injectable()
export class ServiceBaseConfiguration {
  constructor(
    //load services
  ) {
  }
}

@Injectable()
export class ServiceBase {

  constructor(
    private serviceBaseConfiguration: ServiceBaseConfiguration
  ) {
  }
}
