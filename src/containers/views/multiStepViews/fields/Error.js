const ErrorMessage = ({error,touched}) => {
    return (
        <div>
            {error && touched ? (
            <div className="text-xs text-RED-_500">
              {error}
            </div>
          ) : null}
        </div>
    )
}

export default ErrorMessage
