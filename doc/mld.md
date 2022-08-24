# MLD

https://kourou.oclock.io/ressources/fiche-recap/mld/

```
level(id, name)
question(id, question, information, #level(id), #answer(id) as correctAnswer, #quiz(id))
answer(id, answer, #question(id))
user(id, firstName, lastName, email, password)
quiz(id, title, description, #user(id))
subject(id, title)
quizSubject(#quiz(id), #subject(id))
```
