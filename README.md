# Solution

## Set-up

- run `yarn` to install depedencies
- run `yarn start` to run application in browser
- run `yarn test` to run tests

## Media Data Store

This is the mobx store where we interact with the media service (a mock API), use RxJs to handle these mock async calls using observables, and maintain state around these actions.

I decided to use makeAutoObservable to keep the store clean and I didn't need any special overrides.

For the read/get action of getting media data, I decided to persist a subscription by converting a mobx observable into an RxJs observable stream. I store this subscription to mobx state so I can trigger it again later. I made sure to clean up this if the store becomes unobserved.

For all write/post actions, I created reuseable subscription logic. Once finished, it calls an action to update mobx state which can be used by the consuming react components.

## Mock API

I decided to mock a REST API using the MediaService and persisting with Local Storage. This seemed like the simpliest way to mock API data responses, but also persist the data so we had a working application. Should local storage normally be used as a database like this? Absolutely not. For the sake of this project it fit my needs.

## OOP

Much of the application design uses OOP patterns. This includes the store, the media content model, and most type definitions (using interfaces instead of types). I beleive a good application incorporates both OOP and functional patterns and chooses which one is best for the particular situation.

## Form Validation

The media form comes complete with form validation powered by react hook form. If you leave an input blank, input an invalid year, or an invalid rating it block saving the data and show inline errors.

## User Interface

Most of the user interface are made with custom built components: input fields, buttons, cards, modals, chips, etc. For the selector dropdowns (filter, type input, and genre input), I decided to save time and use radix-ui for this.

## Reset

I built some reset functionality for the application that will reset the mock data to its initial state. Just click the reset icon on the bottom left corner.
