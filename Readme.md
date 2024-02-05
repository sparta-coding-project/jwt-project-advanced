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
