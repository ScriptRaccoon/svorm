# Supabase database

The following tables are used in the Supabase database connected to this project.

## svorms

- `id` : `number` (primary)
- `created_at` : `string`
- `title` : `string`

## simple_questions

- `id` : `number` (primary)
- `created_at` : `string`
- `required` : `boolean`
- `question` : `string`
- `index` : `number`
- `svorm_id` : `number` (refers to `svorms` table)

## multiple_choices

- `id` : `number` (primary)
- `created_at` : `string`
- `required` : `boolean`
- `question` : `string`
- `choices` : `string[]`
- `index` : `number`
- `svorm_id` : `number` (refers to `svorms` table)

## simple_questions_answers

- `id` : `number` (primary)
- `created_at` : `string`
- `answer` : `string`
- `question_id` : `number` (refers to `simple_questions` table)

## multiple_choices_answers

- `id` : `number` (primary)
- `created_at` : `string`
- `choice` : `number`
- `question_id` : `number` (refers to `simple_questions` table)
