import { errorNotification, successNotification } from './toastNotification';

function handleSuccessResponse(response){
    if(response.status == "success"){
        return response.data ? response.data : ''
    }
    return response;
}

function handleErrorResponse(error){
    let errorMessage = 'Network connection error'
    if(error){
        if(error.status && error.status === 401){
            errorNotification(error.data.message)
            localStorage.removeItem('user')
            window.location = '/';
            return;
        }
        let errorData = error.data
        if(errorData){
            if(errorData){
                if(errorData.message) errorMessage = errorData.message
                if(errorData.description) errorMessage = errorData.description
            }
        }else{
            if(error.message){
                errorMessage = error.message
            }
        }
        console.log('error', error)

        errorNotification(errorMessage, 'Error')
        return errorData;
    }
    
    errorNotification(errorMessage, 'Error')     
}

export {handleSuccessResponse, handleErrorResponse}