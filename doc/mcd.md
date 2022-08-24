# MCD

http://mocodo.wingi.net/

```
LEVEL: level
IS, 11 QUESTION, 0N> LEVEL

HAS, 1N QUIZ, 11> QUESTION
QUESTION: question, information
RESPOND, 11 ANSWER, 11> QUESTION

:
CONTAINS, 0N QUESTION, 11> ANSWER
ANSWER: answer

QUIZ: title, theme
AUTHORED, 0N USER, 11> QUIZ
USER: first_name, last_name, email, password

IS ABOUT, 0N QUIZ, 0N> SUBJECT
SUBJECT: title
```