## Использование
1. npm install
2. 'node index.js' OR 'node ./'
3. open localhost:1500 in browser


## Роуты 

1. Роут:  `GET /api`. Получить полный список сообщений, пользователей, а также массив, состоящий из id пользователей. 
Пример: 
```
    GET /api HTTP/1.1
```

2. Роут  `GET /api/username`. Получить всю информацию о пользователе (username), в том числе список пользователей, с которыми он общался вместе с их данными тоже. Кроме того,  при данном запросе также отсылается список со всеми пользователями для лучшего отображения окна с потенциальными собеседниками на фронт-енде (отдельно общий список, отдельно список с уже состоявшимися собеседниками). 
Пример: 
```
    GET /api/jumbo HTTP/1.1
```

3. Роут  `GET /api/username/receiverUsername` Предполагаемое окно открытого чата одного пользователя (username) с каким-либо другим пользователем (receiverUsername). Получить всю информацию о собеседниках (username и receiverUsername), а также всю историю их сообщений, отфильтрованную по дате (от старых сообщений к более новым).
Пример: 
```
    GET /api/jumbo/silly HTTP/1.1
```

4. Роут  `POST /api/username/receiverUsername`. Отправка сообщений от одного пользователя (username) другому (receiverUsername). Формат присылаемых сообщений: application/x-www-form-urlencoded или application/json с обязательным полем message.
Пример: 
```
    POST /api/jumbo/silly HTTP/1.1
    message=hello+world
```

5. Роут  `PUT /api/username`. Создание нового пользователя с никнеймом username. Формат присылаемых сообщений: application/x-www-form-urlencoded или application/json с обязательным полем email.
Пример: 
```
    PUT /api/denyskuts HTTP/1.1
    email=denyskuts%40gmail.com
```

6. Роут `DELETE /api/username`. Удаление существующего пользователя из базы данных, а также удаление ссылок на него с профилей других пользователей.
Пример: 
```
    DELETE /api/denyskuts HTTP/1.1
```

7. Роут `DELETE /api/username/receiverUsername`. Удаление конкретного сообщения в разговоре между отправителем (username) и получателем (receiverUsername). Сообщение идентифицируется по id отправителя, получателя, и дате создания сообщения.  Формат присылаемых сообщений: application/x-www-form-urlencoded или application/json с обязательным полем createdAt.
Пример:
```
    DELETE /api/jumbo/silly HTTP/1.1
    createdAt=1500031478184
```