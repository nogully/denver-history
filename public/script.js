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