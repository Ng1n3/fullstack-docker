import './ErrorAlert.css'

function ErrorAlert({errorText}) {
  return (
    <section className='error-alert'>
      <h2>Something went wrong!</h2>
      <p>{errorText}</p>
    </section>
  );
}

export default ErrorAlert;
