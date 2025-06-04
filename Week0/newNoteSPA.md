sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: enter note and click save
    activate browser
    browser->>browser: updates the notes in the dom with the new note

    browser->>server: POST note https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    deactivate browser
    activate server
    server-->>browser: 201 new note created
    deactivate server