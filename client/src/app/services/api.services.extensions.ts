import { FamilyService, ParentDto, API_BASE_URL } from "./api.services";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { ServiceBaseConfiguration } from "./api.servicesbase";

export class FamilyServiceExtensions extends FamilyService {

  private _http: HttpClient;
  private _baseUrl: string;

  constructor(@Inject(ServiceBaseConfiguration) configuration: ServiceBaseConfiguration,
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super(configuration, http, baseUrl);
    this._http = http;
    this._baseUrl = baseUrl ? baseUrl : "";

  }

  public post(dto: ParentDto | null | undefined): Observable<ParentDto | null> {
    let url_ = this._baseUrl + "/api/Family";
    url_ = url_.replace(/[?&]$/, "");

    let content_ = this.objectToFormData(dto);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    };

    return this._http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processPost(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processPost(<any>response_);
        } catch (e) {
          return <Observable<ParentDto | null>><any>_observableThrow(e);
        }
      } else
        return <Observable<ParentDto | null>><any>_observableThrow(response_);
    }));
  }

  objectToFormData(obj) {
    var formData = new FormData();
    this.appendFormData(formData, obj);
    return formData;
  }

  appendFormData(formData, data, root = null) {
    root = root || '';
    if (data instanceof File) {
      formData.append(root, data);
    } else if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        this.appendFormData(formData, data[i], root + '[' + i + ']');
      }
    } else if (typeof data === 'object' && data) {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if (root === '') {
            this.appendFormData(formData, data[key], key);
          } else {
            this.appendFormData(formData, data[key], root + '.' + key);
          }
        }
      }
    } else {
      if (data !== null && typeof data !== 'undefined') {
        formData.append(root, data);
      }
    }
  }
}
