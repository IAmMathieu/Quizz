-- -----------------------------------------------------
-- Schema oquiz
-- -----------------------------------------------------
-- Par convention on va nommer toutes les tables au singulier, en minuscule et en anglais.
-- Chaque table contiendra un champs created_at contenant la date de création d'un enregistrement
-- Et un champ updated_at contenant la date de mise à jour de cet enregistrement
-- Création d'une transaction (BEGIN), c'est un groupe d' instruction SQL (jusqu'au COMMIT)
-- qui rends celles-ci dépéndantes les unes des autres. 
-- Si au moins une des instructions génère une erreur, 
-- alors toutes les commandes sont invalidés (ROLLBACK)

BEGIN;

-- Comme c'est un script de création de tables ont s'assure que celles-ci
-- Soit supprimées avant de les créées.
-- On peut supprimer plusieurs tables en même temps
-- Si on veut utiliser ce script pour remettre notre BDD d'aplomb on vire ce qu'il y avait avant pour pouvoir recreer proprement
-- A utiliser seulement lorosque l'on developpe le projet
-- TRES DANGEREUX
DROP TABLE IF EXISTS "level",
"answer",
"user",
"quiz",
"question",
"tag",
"quiz_has_tag";

-- -----------------------------------------------------
-- Table "level"
-- -----------------------------------------------------
CREATE TABLE "level" (
    -- une clé primaire est automatiquement NOT NULL. Pas besoin de le préciser.
    -- 
    -- On spécifie que la colonne sera généré automatiquement par la BDD en suivant une séquence numérique prédéfinie de 1 en 1
    -- On peut définir BY DEFAULT (surcharge de la valeur possible) ou ALWAYS (surcharge de la valeur impossible)
    -- Ici on utilise BY DEFAULT car on défini nous même les valeurs des clé primaires dans les insertions du fichier import_data.sql
    -- Mais on utilisera plus généralement ALWAYS afin de sécurisé l'incrémentation des valeurs du champ
    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "user"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "firstname" text NOT NULL,
  "lastname" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "quiz"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "quiz" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NULL,
  -- Ici REFERENCES indique au moteur de BDD (pg) que cette colonne ne peut contenir qu'une valeur qui éxiste déjà dans la colonne id de la table user
  "user_id" integer NOT NULL REFERENCES "user" ("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "answer"
-- -----------------------------------------------------
-- On ne peut pas référencé le champ id de la table question ici, car la table n'existe pas encore. On fera une modification à la fin du script pour ajouter la référence.
CREATE TABLE IF NOT EXISTS "answer" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "description" text NOT NULL,
  "question_id" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);


-- -----------------------------------------------------
-- Table "question"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "question" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "question" text NOT NULL,
  "anecdote" text NULL,
  "wiki" text NULL,
  "level_id" integer NOT NULL REFERENCES "level" ("id"),
  -- 'Good answer',
  "answer_id" integer NOT NULL REFERENCES "answer" ("id"),
  "quiz_id" integer NOT NULL REFERENCES "quiz" ("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- Maintenant on peut créer la référence vers la table question pour le champ "question_id" dans la table "answer" afin de réprésenter notre clé étrangère.
-- On remarquera ici la présence de l'instruction FOREIGN KEY qui dit explicitement que ceette colonne sert de clé étrangère faisaint référence à la colonne question de la table question
-- Lors de la création d'une table ce détail est implicite
ALTER TABLE "answer"
  ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");

-- -----------------------------------------------------
-- Table "tag" en fait c'est notre "subject"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "tag" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "quiz_has_tag" c'est notre "quizSubject" dans le MDL
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "quiz_has_tag" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "quiz_id" integer NOT NULL REFERENCES "quiz"("id"),
  "tag_id" integer NOT NULL REFERENCES "tag" ("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz, -- normalement on ne fera jamais de mise à jour, mais on sait jamais cette table peu évoluer et on pourrait lui rajouter des qualificatif d'association
  -- cette contrainte UNIQUE permet au moteur de base de donnée de me renvoyer une erreur si par megarde j'ajoute 2 fois la meme relation entre un quiz et un tag
  UNIQUE ("quiz_id", "tag_id")
);


COMMIT;