# Supabase database

The database for this project is hosted on https://supabase.com.

## Tables

The following tables are used in the database.

### svorms

- `id` : `number` (primary key)
- `created_at` : `string`
- `title` : `string`

### simple_questions

- `id` : `number` (primary key)
- `created_at` : `string`
- `required` : `boolean`
- `question` : `string`
- `index` : `number`
- `svorm_id` : `number` (foreign key, refers to `svorms` table)

### multiple_choices

- `id` : `number` (primary key)
- `created_at` : `string`
- `required` : `boolean`
- `question` : `string`
- `choices` : `string[]`
- `index` : `number`
- `svorm_id` : `number` (foreign key, refers to `svorms` table)

### simple_questions_answers

- `id` : `number` (primary key)
- `created_at` : `string`
- `answer` : `string`
- `question_id` : `number` (foreign key, refers to `simple_questions` table)

### multiple_choices_answers

- `id` : `number` (primary key)
- `created_at` : `string`
- `choice` : `number`
- `question_id` : `number` (foreign key, refers to `simple_questions` table)

You can generate the corresponding types for the Supabase client, see the instructions at https://supabase.com/docs/guides/database/api/generating-types.

## Delete old svorms

### cascade delete

The svorms which are older than 30 days are deleted regularly from the database.

First, we need to enable the `cascade delete` option so that also the corresponding simple questions, multiple choices and their corresponding answers are deleted as well. (Otherwise, we would get an error.) Currently (March 2023), this cannot be enabled with the Supabase UI, but you can run a SQL query in Supabase's SQL editor to achieve this. See https://index.garden/a/supabase-cascade/ for instructions.

### create function

Next, create a supabase trigger function in the SQL editor:

```sql
create or replace function delete_old_svorms() returns trigger
language plpgsql
as $$
  begin
    delete from svorms where created_at < now() - interval '30 days';
    return new;
  end
$$;
```

Then, install a trigger (Supabase -> Database -> Triggers) which runs this trigger function every time a new insert operation in the svorms table happened (for example).
