# Frontend

### Dependencies
- Typescript, React, Nextjs
- React Query, React Hook Form
- Emotion, React Modal
- Axios, Universal Cookie

## Getting Started

First, install the dependencies and start development server:

```bash
yarn && yarn dev
```

## Layout

Only the header is shared between pages, and it has a logo and a `logout` button depending on the authentication state.


## Routes

The frontend is impletemented in mainly two routes: `/login` and `/employee`.

Using `middleware` and `cookies`, if a user doesn't have `access_token` in their cookies, they will be redirected to `/login` for authentication. With the same logic, a user will be redirected to `/employee`, if `access_token` presents in their cookies.

When the token expires or if it is corrupted, i.e. `axios interceptor` catches `401` error, the current `access_token` will be removed and the user will be redirected to `/login`.

### `/login`

This page demonstrates a simple login form.

Both username and password are required to proceed, and using `react-hook-form`, it validates the form state and shows error messages accordingly.

### `/employee`

This page consists of two parts: `Recognition Form Modal`, and `Recognition List`.

`RecognitionFormModal` pops up when `Click to Applaude` button is pressed. There are 4 sections in the modal.
1. Choose an employee from the list.
2. Choose values to be recognized.
    - There are 8 values to be chosen, and the next form is directly affected by these selection.
3. Describe the details why those values are recognized.
    - The form changes dynamically with respect to the values chosen in `step 2`.
    - every field is required to be submitted.
    - The submission button will be disabled after the initial submission to prevent duplications.
4. Complete.
    - After submitting, `Recognition List` will be refetched to reflect the latest submissions.

`Recognition List` has three tabs: `sent`, `received`, and `team`.
Each card only shows the values of the recognition, and the user can check the details by clicking on each card.

- `sent` tab: a list of recognitions that the current user has submitted.
- `received` tab: a list of recognitions sent for the current user.
- `team` tab: only accessible for managers. a list of recognitions for the manager's team.