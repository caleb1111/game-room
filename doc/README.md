# Web Gallary REST API Documentation

## Image API

### Create

- description: create a new image
- request: `POST /api/images/`
    - content-type: `application/json`
    - body: object
      - title: (string) the title of the image
      - author: (string) the authors username
      - picture: (file) the file of the image
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the image id
      - title: (string) the title of the image
      - author: (string) the authors username
      - picture: (file) the file of the image
      - date: (string) the date when the image is uploaded
- response: 500
    - body: Internal server error

``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"title":"tree","author":"liu ","picture": -F 'picture=@/data/smily_face.png'} 
       http://localhsot:3000/api/images/'
```


- description: retrieve the image before the current image
- request: `GET /api/images/previmage/`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the image id
      - title: (string) the title of the image
      - author: (string) the authors username
      - picture: (file) the file of the image
      - date: (string) the date when the image is uploaded
- response: 404
    - body: Image id does not exists
- response: 500
    - body: Internal server error

``` 
$ curl -c cookie.txt http://localhsot:3000/api/images/previmage/
``` 

- description: retrieve the image after the current image
- request: `GET /api/images/nextimage/`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the image id
      - title: (string) the title of the image
      - author: (string) the authors username
      - picture: (file) the file of the image
      - date: (string) the date when the image is uploaded
- response: 404
    - body: Image id does not exists
- response: 500
    - body: Internal server error

``` 
$ curl -c cookie.txt http://localhsot:3000/api/images/nextimage/
``` 

- description: retrieves the current image with id stored in cookie
- request: `GET /api/image/`
- response: 200
    - content-type: `application/json`
    - body: null if there is no image for current gallery
      otherwise object
      - _id: (string) the image id
      - title: (string) the title of the image
      - author: (string) the authors username
      - picture: (file) the file of the image
      - date: (string) the date when the image is uploaded
- response: 404
    - body: Image id does not exists
- response: 500
    - body: Internal server error

``` 
$ curl -c cookie.txt http://localhsot:3000/api/images/jed5672jd90xg4awo789/
``` 

- description: retrieve the image's file with id
- request: `GET /api/images/:imageId/picture/`
- response: 200
    - content-type: `file.mimetype`
    - body: object representing the file
- response: 404
    - body: Image is does not exists
- response: 500
    - body: Internal server error

``` 
$ curl http://localhsot:3000/api/images/jed5672jd90xg4awo789/picture/
``` 

### Delete
  
- description: delete the current image
- request: `DELETE /api/image/`
- response: 200
    - content-type: `application/json`
    - body: null if no more images in the current gallery
      otherwise, object
      - _id: (string) the image id
      - title: (string) the title of the image
      - author: (string) the authors username
      - picture: (file) the file of the image
      - date: (string) the date when the image is uploaded
- response: 404
    - body: image id does not exists
- response: 500
    - body: Internal server error
``` 
$ curl -X DELETE
       -C cookie.txt
       http://localhsot:3000/api/images/jed5672jd90xg4awo789/
``` 

## Comment API

### Create

- description: create a new comment
- request: `POST /api/comments/`
    - content-type: `application/json`
    - body: object
      - content: (string) the content of the comment
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the comment id
      - imageId: (string) the current image id
      - author: (string) the authors username
      - content: (string) the content of the comment
      - date: (string) the date when the comment is sent
- response: 500
    - body: Internal server error
``` 
$ curl -X POST 
       -C cookie.txt
       -H "Content-Type: `application/json`" 
       -d '{"imageId":"jed5672jd90xg4awo789","author":"liu ","content":"hello world"} 
       http://localhsot:3000/api/comments/'
```

### Read

- description: retrieve the list of comment objects within the current image, current page
- request: `GET /api/comments/`
- response: 200
    - content-type: `application/json`
    - body: null if there are no signed in user or not viewing any gallery
      otherwise list of objects
      - _id: (string) the comment id
      - imageId: (string) the current image id
      - author: (string) the authors username
      - content: (string) the content of the comment
      - date: (string) the date when the comment is sent
- response: 500
    - body: Internal server error

``` 
$ curl -C cookie.txt http://localhsot:3000/api/comments/
``` 

### Update

- description: decrease comment pagination number
- request: `PATCH /api/comments/prevpage/`
- response: 200
    - content-type: `application/json`
    - body: Going previous page comment
``` 
$ curl -X PATCH 
       -C cookie.txt
       http://localhsot:3000/api/comments/prevpage/'
```

- description: increase comment pagination number
- request: `PATCH /api/comments/nextpage/`
- response: 200
    - content-type: `application/json`
    - body: Going next page comment
- response: 500
    - body: Internal server error
``` 
$ curl -X PATCH 
       -C cookie.txt
       http://localhsot:3000/api/comments/nextpage/'
```

### Delete

- description: delete the comment with id
- request: `DELETE /api/comments/:id/`
- response: 200
    - content-type: `application/json`
    - body: object
        - _id: (string) the message id
        - imageId: (string) the image's id that this comment belongs to
        - author: (string) the authors username
        - content: (string) the content of the comment
        - date: (string) the date when this comment was created
- response: 404
    - body: message :id does not exists
- respond: 500
    - body: Internal server error
``` 
$ curl -X DELETE
       http://localhsot:3000/api/comments/jed5672jd90xg4awo789/
``` 

## User API

### Create

- description: user sign up
- request: `POST /api/signup/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username of the account
      - password: (string) the password of the account
- response: 200
    - content-type: `application/json`
    - body: user signed up
- response: 400
    if username is missing:
    - body: username is missing
    if password is missing:
    - body: password is missing
- response: 409
    - body: username already exists
- response: 500
    - body: Internal server error
``` 
// curl -H "Content-Type: application/json" 
        -X POST 
        -d '{"username":"alice","password":"alice"}' 
        -c cookie.txt 
        localhost:3000/signup/
```

- description: user sign in
- request: `POST /api/signin/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username of the account
      - password: (string) the password of the account
- response: 200
    - content-type: `application/json`
    - body: user signed in
- response: 400
    if username is missing:
    - body: username is missing
    if password is missing:
    - body: password is missing
- response: 401
    - body: access denied
- response: 500
    - body: Internal server error
``` 
// curl -H "Content-Type: application/json" 
        -X POST 
        -d '{"username":"alice","password":"alice"}' 
        -c cookie.txt 
        localhost:3000/signin/
```

### Read

- description: retrieve the list of user objects within the current page
- request: `GET /api/users/`
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - _id: (string) the username
      - hash: (string) the hashed password
      - salt: (string) the added salt for password

- response: 500
    - body: Internal server error

``` 
$ curl http://localhsot:3000/api/users/
``` 

- description: signout the current user
- request: `GET /api/signout/`
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - _id: (string) the username
      - hash: (string) the hashed password
      - salt: (string) the added salt for password

- response: 500
    - body: Internal server error

``` 
$ curl -C cookie.txt http://localhsot:3000/api/signout/
``` 

### Update

- description: decrease the number of pagination for user list
- request: `PATCH /api/userList/prevpage/`
- response: 200
    - content-type: `application/json`
    - body: Going to the previous page of user list
``` 
$ curl -X PATCH 
       -C cookie.txt
       http://localhsot:3000/api/userList/prevpage/'
```

- description: increase the number of pagination for user list
- request: `PATCH /api/userList/nextpage/`
- response: 200
    - content-type: `application/json`
    - body: Going to the next page of user list
- response: 500
    - body: Internal server error
``` 
$ curl -X PATCH 
       -C cookie.txt
       http://localhsot:3000/api/userList/nextpage/'
```

## Gallery API

### Update

- description: views the gallery of username
- request: `PATCH /api/gallery/:username/`
- response: 200
    - content-type: `application/json`
    - body: Visiting user
- response: 500
    - body: Internal server error
``` 
$ curl -X PATCH 
       -C cookie.txt
       http://localhsot:3000/api/gallery/alex/'
```
