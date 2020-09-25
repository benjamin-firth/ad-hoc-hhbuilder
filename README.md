# Notes from homework submitter

This application can be opened by opening the html file in your default 
browser. I added some styling for better usability, as well as additional 
buttons for modifying a house once submitted. I wouldn't usually create a css 
link tag in javascript, but since the directions said not to modify the html 
that's how I connected the css file in this case.


THIS WAS THE RUBRIC

-----------

# Hhbuilder

Your application needs a way to capture information about a household applying
for health insurance coverage. Develop a UI for building a household up from
individual people.

## Task

You have been given an HTML page with a form and a placeholder for displaying
a household.

In the given index.js file, replace the "Your code goes here" comment with JavaScript that can:

- Validate data entry (age is required and > 0, relationship is required)
- Add people to a growing household list
- Reset the entry form after each addition
- Remove a previously added person from the list
- Display the household list in the HTML as it is modified
- Serialize the household as JSON upon form submission as a fake trip to the server

## Notes

Don't modify the given index.html file in any way. You're of course still allowed to modify the DOM through Javascript.

You must write JavaScript, not a language that compiles down to JavaScript. You must only use features from the ES5 standard. No 3rd party libraries — i.e., no jQuery, no React.

The display of the household list is up to you.

On submission, put the serialized JSON in the provided "debug" DOM element and display that element.

After submission, the user should be able to make changes and submit the household again.

You don't need to add validations around anything other than the age and relationship requirements described above. It's ok for someone to add 35 parents.

The focus here is on the quality of your JavaScript, not the beauty of your design. The controls you add around viewing and deleting
household members should be usable but need not be much to look at.
