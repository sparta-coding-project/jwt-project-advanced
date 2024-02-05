# JWT PROJECT

## Skills

- express
- jsonwebtoken
- redis
- mysql
- prisma
- bcrypt
- joi

## Server
[http://35.199.172.246:3002](http://35.199.172.246:3002)

## ERD
- Users
    |Name|Type|Not Null|Default|Primary Key|Unique|Auto Increment|
    |---|---|:---:|---|:---:|:---:|:---:|
    |userId|Int|✅||✅|✅|✅|
    |id|varChar|✅|||✅||
    |email|varChar|✅|||✅||
    |password|varChar|✅|||||
    |role|varChar||||||
    |createdAt|dateTime|✅|now()||||
    |updatedAt|dateTime|✅|now()||||
    
- Resume
    |Name|Type|Not Null|Default|Primary Key|Unique|Auto Increment|
    |---|---|:---:|---|:---:|:---:|:---:|
    |resumeId|Int|✅||✅||✅|
    |userId|Int|✅|||||
    |title|varChar|✅|||||
    |content|varChar|✅|||||
    |status|enum<details><summary>타입</summary><div>APPLY</div><div>DROP</div><div>PASS</div><div>INTERVIEW1</div><div>INTERVIEW2</div><div>FINAL_PASS</div></details>|✅|APPLY||||
    |createdAt|dateTime|✅|now()||||
    |updatedAt|dateTime|✅|now()||||

## API 명세서

- 회원가입 - `POST` /api/signup

  - request
    ```json
    { id, email, password }
    ```
  - response
    ```json
    { userId, id, email, password, createdAt, updatedAt }
    ```

- 로그인 - `POST` /api/login

  - request
    ```json
    { id, password }
    ```
  - response

    ```js
    // cookie
    { accessToken, refreshToken }
    ```

- 내 정보 조회 - `GET` /api/user

  - request

    ```js
    // headers.cookie
    { accessToken, refreshToken }
    ```

  - response
    ```js
    { userId, id, email, password, createdAt, updatedAt }
    ```

- 이력서 생성 - `POST` /api/resume

  - request
    ```js
    // headers.cookie
    { accessToken, refreshToken }

    // body
    { title, content, status }
    ```
  - response
    ```js
    { message: “이력서 생성이 완료되었습니다” }
    ```

- 이력서 목록 조회 - `GET` /api/resume

  - request
    ```js

    ```
  - response
    ```js
    { resumeId, title, content, status, createdAt, updatedAt }
    ```

- 이력서 수정 - `PATCH` /api/resume

  - request
    ```js
    // headers.cookie
    { accessToken, refreshToken }
    // body
    { title, content }
    ```
  - response
    ```js
    [{ resumeId, title, content, status, createdAt, updatedAt }]
    ```

- 이력서 상세 조회 - `GET` /api/resume/:resumeId

  - request
    ```js
    //headers.cookie
    { accessToken, refreshToken }
    ```
  - response
    ```js
    { resumeId, title, content, status, createdAt, updatedAt }
    ```

- 이력서 삭제 - `DELETE` /api/resume/:resumeId
  - request
    ```js
    //headers.cookie
    { accessToken, refreshToken }
    ```
  - response
    ```js
    { message: “이력서 삭제가 완료되었습니다” }
    ```
