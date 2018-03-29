const getAuthToken = async (event) => {
  event.preventDefault();
  const email = $('#email-input').val();
  const appName = $('#app-input').val();

  const response = await fetch('/authenticate', {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json'}, 
    body: JSON.stringify({ email, appName })
  })
  const token = await response.json()
  console.log(token)
}

$('form').on('submit', getAuthToken);

// bad token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmJpZUBhb2wuY29tIiwiYXBwTmFtZSI6IlBva2VyIEZhY2UiLCJpYXQiOjE1MjIyODkyODN9.zb7fXkibUAvnEXzzdNqxGHnVYqplnH-4q0Hl8Jbybdw"
// good token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmJpZUB0dXJpbmcuaW8iLCJhcHBOYW1lIjoiUG9rZXIgRmFjZSIsImlhdCI6MTUyMjI4OTI5M30.KgP4MkUQA7pH5rPzOLgh2xZGANBSNJJBU-r5n2wMdUY"
