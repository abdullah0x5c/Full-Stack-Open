sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: input abc and click save
    browser->>server: POST [{ "content": "abc", "date": "2023-1-1" }, ... ] to https://studies.cs.helsinki.fi/new_note
    activate server
    Note right of server: server saves the new notes
    server-->>browser: Redirect to https://studies.cs.helsinki.fi/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "abc", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes