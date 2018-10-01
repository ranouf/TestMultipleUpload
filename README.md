# TestMultipleUpload
Test multi file upload for a complex object from an Angular App to .Net Core Application

- open the solution
- launch the web api
- launch `npm install` in src/client
- then `npm run start`

NOTE:
-  to generate the client api services, I use NSWAG (https://github.com/RSuter/NSwag), the configuration is included in the repo.

Currently, when I submit the form, Files are not correctly binding to the DTO, but they are in the HttpRequest. 
I reported a bug here https://github.com/dotnet/core/issues/1967. 

Any help, will be welcome :)

